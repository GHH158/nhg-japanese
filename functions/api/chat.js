/**
 * Cloudflare Pages Function: /api/chat
 * 阿里云通义千问 (DashScope) 兼容模式 API 边缘反向代理
 * 解决浏览器端直接调用 DashScope 的跨域 (CORS) 限制
 */

const DASHSCOPE_COMPLETION_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

// 预检请求响应
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

// 核心转发处理
export async function onRequestPost(context) {
  try {
    const request = context.request;

    // 1. 提取请求头中的 Authorization
    let authHeader = request.headers.get("Authorization") || "";
    let bodyText = await request.text();
    let payload = {};

    try {
      payload = JSON.parse(bodyText);
    } catch (e) {
      return new Response(JSON.stringify({ error: { message: "Invalid JSON body" } }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }

    // 兼容从 payload 中提取 apiKey
    let apiKey = "";
    if (authHeader.startsWith("Bearer ")) {
      apiKey = authHeader.replace(/^Bearer\s+/i, "").trim();
    } else if (payload.apiKey) {
      apiKey = payload.apiKey.trim();
      delete payload.apiKey;
    }

    // 也支持线上通过 Cloudflare Pages 环境变量 DASHSCOPE_API_KEY 作为备选兜底
    if (!apiKey && context.env && context.env.DASHSCOPE_API_KEY) {
      apiKey = context.env.DASHSCOPE_API_KEY.trim();
    }

    if (!apiKey) {
      return new Response(JSON.stringify({
        error: { message: "未检测到 API Key，请在前端「🤖 AI设置」中配置您的 DashScope API Key。" }
      }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" }
      });
    }

    // 2. 向 DashScope 上游发起请求
    const upstreamResponse = await fetch(DASHSCOPE_COMPLETION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const responseBody = await upstreamResponse.text();

    return new Response(responseBody, {
      status: upstreamResponse.status,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json; charset=utf-8"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: { message: `Edge Proxy Error: ${err.message || String(err)}` }
    }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" }
    });
  }
}
