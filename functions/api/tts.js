/**
 * Cloudflare Pages Function: /api/tts
 * 随时随地动态生成真人级日语神经网络发音 + Cloudflare 边缘全球自动永久缓存 (Edge Cache)
 * 支持双模：
 * 1. 若配置了环境变量 AZURE_SPEECH_KEY，自动走微软官方高可用 REST API
 * 2. 若未配置 Key，自动走开源 Edge-TTS WebSocket 协议合成（0成本、无需注册Key）
 */

const DEFAULT_VOICE = "ja-JP-NanamiNeural";
const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const SYNTHESIS_URL = "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
const CHROMIUM_FULL_VERSION = "143.0.3650.75";
const SEC_MS_GEC_VERSION = `1-${CHROMIUM_FULL_VERSION}`;

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function removeInvalidXmlCharacters(text) {
  return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, " ");
}

function timestamp() {
  return new Date().toISOString().replace(/[-:.]/g, "").slice(0, -1);
}

function makeConnectionId() {
  return crypto.randomUUID().replace(/-/g, "");
}

function makeMuid() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

async function makeSecMsGec() {
  const winEpoch = 11644473600;
  const secondsToNs = 1e9;
  let ticks = Date.now() / 1000;
  ticks += winEpoch;
  ticks -= ticks % 300;
  ticks *= secondsToNs / 100;
  const payload = `${ticks.toFixed(0)}${TRUSTED_CLIENT_TOKEN}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function buildSynthesisUrl(secMsGec, connectionId) {
  const url = new URL(SYNTHESIS_URL);
  url.searchParams.set("trustedclienttoken", TRUSTED_CLIENT_TOKEN);
  url.searchParams.set("Sec-MS-GEC", secMsGec);
  url.searchParams.set("Sec-MS-GEC-Version", SEC_MS_GEC_VERSION);
  url.searchParams.set("ConnectionId", connectionId);
  return url.toString();
}

function buildSpeechConfigMessage() {
  return (
    `X-Timestamp:${timestamp()}\r\n` +
    "Content-Type:application/json; charset=utf-8\r\n" +
    "Path:speech.config\r\n\r\n" +
    '{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n'
  );
}

function buildSsmlMessage(requestId, voice, text) {
  const ssml =
    "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='ja-JP'>" +
    `<voice name='${voice}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${escapeXml(
      removeInvalidXmlCharacters(text)
    )}</prosody></voice></speak>`;

  return (
    `X-RequestId:${requestId}\r\n` +
    "Content-Type:application/ssml+xml\r\n" +
    `X-Timestamp:${timestamp()}Z\r\n` +
    "Path:ssml\r\n\r\n" +
    ssml
  );
}

function parseBinaryAudioFrame(data) {
  if (data.length < 2) return null;
  const headerLength = (data[0] << 8) | data[1];
  if (data.length < 2 + headerLength) return null;

  const headerText = new TextDecoder().decode(data.slice(2, 2 + headerLength));
  const headers = {};
  for (const line of headerText.split("\r\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      headers[line.slice(0, colonIndex)] = line.slice(colonIndex + 1).trim();
    }
  }
  return {
    headers,
    body: data.slice(2 + headerLength),
  };
}

async function synthesizeEdgeTts(text, voice) {
  const secMsGec = await makeSecMsGec();
  const connectionId = makeConnectionId();
  const websocketUrl = buildSynthesisUrl(secMsGec, connectionId);

  const upgradeHeaders = {
    "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0`,
    "Accept-Language": "ja,en-US;q=0.9",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Sec-WebSocket-Version": "13",
    Upgrade: "websocket",
    Cookie: `muid=${makeMuid()};`,
  };

  const response = await fetch(websocketUrl, { headers: upgradeHeaders });
  if (response.status !== 101 || !response.webSocket) {
    throw new Error(`Edge TTS WebSocket upgrade failed with status ${response.status}`);
  }

  const socket = response.webSocket;
  socket.accept();

  return new Promise((resolve, reject) => {
    const chunks = [];
    const requestId = makeConnectionId();

    const timeout = setTimeout(() => {
      try { socket.close(); } catch (e) {}
      reject(new Error("Edge TTS synthesis timed out (15s)"));
    }, 15000);

    socket.addEventListener("message", async (event) => {
      const data = event.data;
      if (typeof data === "string") {
        if (data.includes("Path:turn.end")) {
          clearTimeout(timeout);
          try { socket.close(); } catch (e) {}
          const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
          const result = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
          }
          resolve(result);
        }
        return;
      }

      let arrayBuffer;
      if (data instanceof ArrayBuffer) {
        arrayBuffer = data;
      } else if (data instanceof Blob) {
        arrayBuffer = await data.arrayBuffer();
      } else if (data instanceof Uint8Array) {
        arrayBuffer = data.buffer;
      }

      if (arrayBuffer) {
        const uint8 = new Uint8Array(arrayBuffer);
        const frame = parseBinaryAudioFrame(uint8);
        if (frame && frame.headers.Path === "audio" && frame.body.length > 0) {
          chunks.push(frame.body);
        }
      }
    });

    socket.addEventListener("error", (e) => {
      clearTimeout(timeout);
      reject(new Error("WebSocket error during TTS synthesis"));
    });

    socket.addEventListener("close", () => {
      clearTimeout(timeout);
      if (chunks.length > 0) {
        const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          result.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(result);
      } else {
        reject(new Error("WebSocket closed before audio received"));
      }
    });

    socket.send(buildSpeechConfigMessage());
    socket.send(buildSsmlMessage(requestId, voice, text));
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  // 跨域预检
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const url = new URL(request.url);
  const text = url.searchParams.get("text");
  const voice = url.searchParams.get("voice") || DEFAULT_VOICE;

  if (!text || !text.trim()) {
    return new Response(JSON.stringify({ error: "Missing 'text' query parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // 1. Cloudflare 边缘高速缓存匹配（二次访问毫秒级秒开，不耗任何 API）
  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: "GET" });
  let cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    let audioBytes;

    // 2. 如果配置了 Azure 官方 Key，优先走官方 REST API
    if (env && env.AZURE_SPEECH_KEY) {
      const region = env.AZURE_SPEECH_REGION || "eastasia";
      const ssml = `<speak version='1.0' xml:lang='ja-JP'><voice name='${voice}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${escapeXml(
        text
      )}</prosody></voice></speak>`;
      const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          "User-Agent": "NHG-Cloudflare-Pages",
        },
        body: ssml,
      });
      if (!res.ok) {
        throw new Error(`Azure API error: ${res.status} ${res.statusText}`);
      }
      audioBytes = await res.arrayBuffer();
    } else {
      // 3. 否则走免费 Edge-TTS 原生 WebSocket 合成
      audioBytes = await synthesizeEdgeTts(text, voice);
    }

    // 4. 构建 Response 并写入 Cloudflare 边缘缓存 1 年
    const response = new Response(audioBytes, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "X-TTS-Engine": env && env.AZURE_SPEECH_KEY ? "Azure-Official" : "Edge-Neural",
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
