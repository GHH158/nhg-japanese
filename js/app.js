/**
 * Japanese Learning Hub - Multi-Scene & Intelligent Learning Engine
 * Powered by window.JAPANESE_KNOWLEDGE_BASE
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.JAPANESE_KNOWLEDGE_BASE;
  if (!data || !data.scenes || !data.scenes.length) {
    console.error("Knowledge base data not loaded properly!");
    return;
  }

  // 状态管理
  let currentSceneIndex = 0; // 默认展示场景 1（可随时切换至 场景 2, 11, 12, 21）
  let currentPassageIndex = 0; // 当前选中的短文序号 (0 ~ 4)
  let isFuriganaVisible = true;
  let activeTab = "all";

  // 演播室级神经网络音频 + 智能 TTS 混合控制器
  const AudioController = {
    currentAudio: null,
    currentUtterance: null,
    speakingBtn: null,
    activeCard: null,
    playlistQueue: [],
    playlistIndex: 0,
    isPlaylistPlaying: false,
    playbackRate: 1.0,
    repeatCount: 1,
    loopTimer: null,

    // 停止所有音频播放与重置状态
    stop() {
      if (this.loopTimer) {
        clearTimeout(this.loopTimer);
        this.loopTimer = null;
      }
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.currentUtterance = null;
      this.isPlaylistPlaying = false;
      this.playlistQueue = [];
      this.resetSpeakingState();
    },

    resetSpeakingState() {
      if (this.speakingBtn) {
        this.speakingBtn.classList.remove("playing");
        this.speakingBtn = null;
      }
      if (this.activeCard) {
        this.activeCard.classList.remove("audio-active");
        this.activeCard = null;
      }
    },

    // 播放单句（支持语速调节、单句复读、优先静态 MP3 ➜ 次选 Cloudflare 动态语音接口 /api/tts ➜ 最终平滑回退系统 TTS）
    speak(text, buttonElement = null, audioUrl = null, onFinished = null, voice = "ja-JP-NanamiNeural", loopOverride = null) {
      const isCurrentlyPlaying = this.currentAudio || (window.speechSynthesis && window.speechSynthesis.speaking);
      if (this.speakingBtn === buttonElement && isCurrentlyPlaying) {
        this.stop();
        return;
      }

      this.stop();

      if (buttonElement) {
        this.speakingBtn = buttonElement;
        buttonElement.classList.add("playing");
        const card = buttonElement.closest(".dialogue-turn");
        if (card) {
          this.activeCard = card;
          card.classList.add("audio-active");
        }
      }

      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const targetLoops = (loopOverride !== null) ? loopOverride : this.repeatCount;
      let remainingLoops = targetLoops;

      const handleRoundFinished = () => {
        remainingLoops--;
        if (remainingLoops > 0) {
          this.loopTimer = setTimeout(() => {
            playSingleRound();
          }, 260);
        } else {
          this.resetSpeakingState();
          if (typeof onFinished === "function") onFinished();
        }
      };

      // 云端 /api/tts 动态生成与边缘缓存回退
      const tryCloudflareTtsOrFallback = () => {
        const cfUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(voice)}`;
        const dynamicAudio = new Audio(cfUrl);
        dynamicAudio.playbackRate = this.playbackRate;
        this.currentAudio = dynamicAudio;

        dynamicAudio.onended = () => {
          this.currentAudio = null;
          handleRoundFinished();
        };

        let cfFallbackDone = false;
        const doCfFallback = () => {
          if (cfFallbackDone) return;
          cfFallbackDone = true;
          this.currentAudio = null;
          this.speakTTS(cleanText, handleRoundFinished, "ja-JP");
        };

        dynamicAudio.onerror = doCfFallback;

        const cfPromise = dynamicAudio.play();
        if (cfPromise !== undefined) {
          cfPromise.catch(doCfFallback);
        }
      };

      const playSingleRound = () => {
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.playbackRate = this.playbackRate;
          this.currentAudio = audio;

          audio.onended = () => {
            this.currentAudio = null;
            handleRoundFinished();
          };

          let fallbackDone = false;
          const doFallback = () => {
            if (fallbackDone) return;
            fallbackDone = true;
            this.currentAudio = null;
            this.speakTTS(cleanText, handleRoundFinished, "ja-JP");
          };

          audio.onerror = doFallback;

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(doFallback);
          }
        } else {
          // 没有预制静态音频时，在用户点击手势内同步调用原生语音发音（确保移动端不被安全策略拦截）
          this.speakTTS(cleanText, handleRoundFinished, "ja-JP");
        }
      };

      playSingleRound();
    },

    // 浏览器原生 TTS 朗读核心（支持多语言与动态语速）
    speakTTS(text, doneCallback = null, lang = "ja-JP") {
      if (!('speechSynthesis' in window)) {
        if (doneCallback) doneCallback();
        return;
      }

      // 强制取消可能残留的阻塞状态
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = (lang === "zh-CN") ? 1.0 : (0.92 * this.playbackRate);

      const voices = window.speechSynthesis.getVoices();
      if (lang === "ja-JP") {
        const jpVoice = voices.find(v => v.lang === "ja-JP" || v.lang === "ja_JP" || (v.lang && v.lang.toLowerCase().startsWith("ja"))) || null;
        if (jpVoice) utterance.voice = jpVoice;
      } else if (lang === "zh-CN") {
        const zhVoice = voices.find(v => v.lang === "zh-CN" || v.lang === "zh_CN" || (v.lang && v.lang.toLowerCase().startsWith("zh"))) || null;
        if (zhVoice) utterance.voice = zhVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (doneCallback) doneCallback();
      };
      utterance.onerror = () => {
        this.currentUtterance = null;
        if (doneCallback) doneCallback();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    // 顺序连播整篇对白（多角色拟真交替演播，应用实时倍速）
    playSequence(items, masterBtnElement) {
      if (this.isPlaylistPlaying && this.speakingBtn === masterBtnElement) {
        this.stop();
        return;
      }

      this.stop();
      if (!items || !items.length) return;

      this.isPlaylistPlaying = true;
      this.playlistQueue = items;
      this.playlistIndex = 0;
      this.speakingBtn = masterBtnElement;
      if (masterBtnElement) masterBtnElement.classList.add("playing");

      const playNext = () => {
        if (!this.isPlaylistPlaying) return;
        if (this.playlistIndex >= this.playlistQueue.length) {
          this.stop();
          return;
        }

        const currentItem = this.playlistQueue[this.playlistIndex];
        this.playlistIndex++;

        // 激活当前句卡片高亮与平滑跟随
        if (this.activeCard) {
          this.activeCard.classList.remove("audio-active");
        }
        if (currentItem.cardElement) {
          this.activeCard = currentItem.cardElement;
          currentItem.cardElement.classList.add("audio-active");
          currentItem.cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        const onFinished = () => {
          if (!this.isPlaylistPlaying) return;
          // 对话角色交替之间自然停顿 360ms
          setTimeout(playNext, 360);
        };

        if (currentItem.audioUrl) {
          const audio = new Audio(currentItem.audioUrl);
          audio.playbackRate = this.playbackRate;
          this.currentAudio = audio;
          audio.onended = () => {
            this.currentAudio = null;
            onFinished();
          };
          audio.onerror = () => {
            this.currentAudio = null;
            this.speakTTS(currentItem.text, onFinished, "ja-JP");
          };
          audio.play().catch(() => {
            this.currentAudio = null;
            this.speakTTS(currentItem.text, onFinished, "ja-JP");
          });
        } else {
          this.speakTTS(currentItem.text, onFinished, "ja-JP");
        }
      };

      playNext();
    }
  };

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }

  // ==========================================
  // 通义千问 Qwen AI 引擎与轻量 Markdown 渲染器
  // ==========================================
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMarkdown(md) {
    if (!md) return "";
    let html = escapeHtml(md);

    // 代码块 ```lang ... ```
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="ai-code-block"><code class="language-${lang}">${code}</code></pre>`;
    });

    // 标题
    html = html.replace(/^#### (.*$)/gim, '<h5 class="ai-h5">$1</h5>');
    html = html.replace(/^### (.*$)/gim, '<h4 class="ai-h4">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="ai-h3">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="ai-h2">$1</h2>');

    // 粗体 & 斜体 & 行内代码
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');

    // 无序列表项
    html = html.replace(/^[\s]*[-*]\s+(.*$)/gim, '<li class="ai-li">$1</li>');
    html = html.replace(/(<li class="ai-li">.*<\/li>(?:\n|$))+/g, '<ul class="ai-ul">$&</ul>');

    // 引用
    html = html.replace(/^>\s+(.*$)/gim, '<blockquote class="ai-quote">$1</blockquote>');

    // 段落换行
    const blocks = html.split(/\n\n+/);
    html = blocks.map(block => {
      const b = block.trim();
      if (!b) return '';
      if (b.startsWith('<h') || b.startsWith('<ul') || b.startsWith('<pre') || b.startsWith('<blockquote')) {
        return b;
      }
      return `<p class="ai-p">${b.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
  }

  const QwenAIEngine = {
    STORAGE_KEY: "nhg_qwen_config",

    getConfig() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // 若原配置是旧版默认 qwen-plus 或未设置，自动平滑升级为 qwen3.7-plus
          if (parsed && (parsed.model === "qwen-plus" || !parsed.model)) {
            parsed.model = "qwen3.7-plus";
          }
          return parsed;
        }
      } catch (e) {
        console.error("加载 Qwen 配置失败", e);
      }
      return {
        apiKey: "",
        model: "qwen3.7-plus",
        baseUrl: "/api/chat"
      };
    },

    saveConfig(cfg) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cfg));
    },

    isConfigured() {
      const cfg = this.getConfig();
      return !!(cfg && cfg.apiKey && cfg.apiKey.trim().length > 5);
    },

    resolveEndpoint(baseUrl) {
      let ep = (baseUrl && baseUrl.trim()) ? baseUrl.trim() : "/api/chat";
      // 容错：如果用户直接填写了阿里云官方地址，提示并自动转为本地/线上代理
      if (ep.includes("dashscope.aliyuncs.com")) {
        ep = "/api/chat";
      }
      // 容错：如果用户通过本地文件 (file://) 直接双击网页打开，自动路由至本地运行的 server.py 端口
      if (window.location.protocol === "file:" && ep.startsWith("/")) {
        ep = `http://localhost:8080${ep}`;
      }
      return ep;
    },

    async callChatCompletions(messages, options = {}) {
      const cfg = this.getConfig();
      if (!cfg.apiKey || !cfg.apiKey.trim()) {
        throw new Error("请先点击右上角【🤖 AI私教设置】配置您的通义千问 API Key！");
      }

      const endpoint = this.resolveEndpoint(cfg.baseUrl);
      const model = (cfg.model && cfg.model.trim()) ? cfg.model.trim() : "qwen3.7-plus";

      const payload = {
        model: model,
        messages: messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1500
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cfg.apiKey.trim()}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errDetail = "";
        try {
          const errJson = await res.json();
          errDetail = errJson.error?.message || JSON.stringify(errJson);
        } catch (e) {
          errDetail = `HTTP ${res.status} ${res.statusText}`;
        }
        throw new Error(`AI 服务响应错误: ${errDetail}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (!reply) {
        throw new Error("AI 返回了空响应，请重试。");
      }
      return reply;
    },

    async testConnection(apiKey, model, baseUrl) {
      const endpoint = this.resolveEndpoint(baseUrl);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: model || "qwen3.7-plus",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "请只回复两个字：【成功】" }
          ],
          max_tokens: 15
        })
      });

      if (!res.ok) {
        let errDetail = `HTTP ${res.status}`;
        try {
          const errJson = await res.json();
          errDetail = errJson.error?.message || errDetail;
        } catch (e) {}
        throw new Error(errDetail);
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || "连接成功";
    },

    async reviewRoleplay({ userText, standardJp, standardZh, speaker, promptZh, scene }) {
      const systemPrompt = `你是一位在日本一线对日IT咨询企业拥有15年项目管理经验的资深总监（PM/Director）兼中日商务礼仪考官。
你的任务是严谨、专业、透彻地评审学员（赴日/离岸IT工程师）在与日本客户会谈中的日文发言。
请按以下结构使用清晰优美的 Markdown 格式输出评审报告：

### 🎯 综合评级：【S / A / B / C】
（S: 顶级商务顾问 / A: 合格商务IT员工 / B: 语法尚可但有敬语失礼或中式日语痕迹 / C: 表达错误或严重商务失礼）

### 🧐 敬语与礼貌诊断
指出发言中的敬语得失（尊敬语/谦让语/郑重语是否准确、有无内外不分、是否过于随意或生硬）。

### 💼 商务情商与心理博弈
站在日本客户高管的心理学视角分析：该发言是否体现了“倾听受容（クッション言葉）”、“为客户着想（相手目線）”、“控制风险（リスクヘッジ）”的高情商？

### 🛡️ IT技术严密性与避坑
从式样书、纳期、品质、责任边界等对日IT开发实践角度，评估此回答是否稳妥严密。

### 💎 大师级地道改写范例
提供1~2段最地道、最让日本客户安心的满分日文范例（标注假名与中文翻译），并说明改写亮点。`;

      const userPrompt = `【当前业务场景】: ${scene ? scene.title : '商务会谈'}
【会谈上文/背景】: ${promptZh || standardZh}
【学员扮演角色】: ${speaker}
【教材标准范例】:
日文：${standardJp}
中文：${standardZh}

【学员输入的日文发言】:
"""
${userText}
"""

请为学员进行深度诊断并给出专业评审与改写建议。`;

      return await this.callChatCompletions([
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ], { temperature: 0.6, max_tokens: 1800 });
    },

    async askTutor({ question, turn, scene, history = [] }) {
      const systemPrompt = `你是一位精通日本IT外包、赴日软件开发、日企商务礼仪与实战日语的高级AI私教。
你的受众是正在学习《新编日企商务日语》与备战对日IT项目现场的中国工程师或项目经理。
请针对学员提出的关于对白、潜台词、语法、敬语或实战演练的问题，给出深入浅出、切中要害的专业解答。
风格要求：
- 敏锐深刻，透彻解析日本客户思维（本音与建前）。
- 结合对日IT真实开发背景（如定例会、障害报告、变更要求、测试验收等）。
- 格式清晰，重点突出，使用 Markdown 格式。`;

      let contextDesc = `【当前场景】: ${scene ? scene.title : ''}\n`;
      if (turn) {
        contextDesc += `【锚定句子信息】:
- 说话人: ${turn.speaker}
- 日文原句: ${turn.jp}
- 中文释义: ${turn.zh || ''}
${turn.keyNote ? `- 关键备考要点: ${turn.keyNote}\n` : ''}`;
      }

      const cleanHistory = history.map(item => ({
        role: item.role,
        content: item.content
      }));

      const messages = [
        { role: "system", content: systemPrompt },
        ...cleanHistory,
        { role: "user", content: `${contextDesc}\n【学员提问】: ${question}` }
      ];

      return await this.callChatCompletions(messages, { temperature: 0.7, max_tokens: 1500 });
    }
  };

  // DOM 容器
  const mainContainer = document.getElementById("main-app-container");
  const scenePillsContainer = document.getElementById("scene-pills-container");
  const heroBadgeTag = document.getElementById("hero-badge-tag");
  const heroTitleText = document.getElementById("hero-title-text");
  const heroDescText = document.getElementById("hero-desc-text");
  
  const textbookDialogueFlow = document.getElementById("textbook-dialogue-flow");
  const playFullTextbookBtn = document.getElementById("play-full-textbook-btn");
  const tokenChipsContainer = document.getElementById("token-chips-container");

  const passageTabsContainer = document.getElementById("passage-tabs-container");
  const currentPassageTitle = document.getElementById("current-passage-title");
  const currentPassageFocus = document.getElementById("current-passage-focus");
  const playPassageBtn = document.getElementById("play-passage-btn");
  const passageDialogueFlow = document.getElementById("passage-dialogue-flow");

  const grammarCardsContainer = document.getElementById("grammar-cards-container");
  const vocabCardsContainer = document.getElementById("vocab-cards-container");
  const quizListContainer = document.getElementById("quiz-list-container") || document.getElementById("arena-question-container");

  const toggleFuriganaBtn = document.getElementById("toggle-furigana-btn");
  const tabButtons = document.querySelectorAll(".tab-btn");

  const moduleSections = {
    "textbook": document.getElementById("section-textbook"),
    "practice": document.getElementById("section-practice"),
    "grammar": document.getElementById("section-grammar"),
    "vocab": document.getElementById("section-vocab"),
    "quiz": document.getElementById("section-quiz")
  };

  // 背诵演练与知识抽屉状态与 DOM 引用
  let tbMode = 'full'; // 'full' | 'cloze' | 'prompt' | 'roleplay'
  let pMode = 'full';  // 'full' | 'cloze' | 'prompt' | 'roleplay'
  let tbFilter = 'all'; // 'all' | 'weakness' | 'unmastered'
  let pFilter = 'all';  // 'all' | 'weakness' | 'unmastered'
  let tbMyRole = '李';
  let pMyRole = '李';
  let tbClozeAllRevealed = false;
  let pClozeAllRevealed = false;
  let roleplayMeetingActive = false;
  let roleplayMeetingTimer = null;
  let advanceMeetingTurn = null;

  const tbDrillToolbar = document.getElementById("tb-drill-toolbar");
  const pDrillToolbar = document.getElementById("p-drill-toolbar");
  const tbClozeToggleAllBtn = document.getElementById("tb-cloze-toggle-all");
  const pClozeToggleAllBtn = document.getElementById("p-cloze-toggle-all");
  const tbMasteredStat = document.getElementById("tb-mastered-stat");
  const tbTotalStat = document.getElementById("tb-total-stat");
  const pMasteredStat = document.getElementById("p-mastered-stat");
  const pTotalStat = document.getElementById("p-total-stat");

  const drawerOverlay = document.getElementById("knowledge-drawer-overlay");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerBadge = document.getElementById("drawer-badge");
  const drawerPos = document.getElementById("drawer-pos");
  const drawerMeaning = document.getElementById("drawer-meaning");
  const drawerSubtext = document.getElementById("drawer-subtext");
  const drawerSubtextSection = document.getElementById("drawer-subtext-section");
  const drawerExamples = document.getElementById("drawer-examples");
  const drawerExamplesSection = document.getElementById("drawer-examples-section");
  const drawerSpeakBtn = document.getElementById("drawer-speak-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  // 🎓 单句名师精讲与记忆锦囊抽屉 DOM 引用
  const pedagogyOverlay = document.getElementById("pedagogy-drawer-overlay");
  const pedagogyCloseBtn = document.getElementById("pedagogy-drawer-close-btn");
  const pedagogySpeakerBadge = document.getElementById("pedagogy-speaker-badge");
  const pedagogySentenceJp = document.getElementById("pedagogy-sentence-jp");
  const pedagogySentenceZh = document.getElementById("pedagogy-sentence-zh");
  const pedagogySpeakBtn = document.getElementById("pedagogy-speak-btn");
  const pedagogyPatternFormula = document.getElementById("pedagogy-pattern-formula");
  const pedagogyPatternMeaning = document.getElementById("pedagogy-pattern-meaning");
  const pedagogyGrammarList = document.getElementById("pedagogy-grammar-list");
  const pedagogyVocabList = document.getElementById("pedagogy-vocab-list");
  const pedagogyMnemonic = document.getElementById("pedagogy-mnemonic");
  const pedagogyRhythm = document.getElementById("pedagogy-rhythm");
  const pedagogyAssociation = document.getElementById("pedagogy-association");
  const pedagogyNuance = document.getElementById("pedagogy-nuance");
  const pedagogyPitfall = document.getElementById("pedagogy-pitfall");
  const pedagogyAlternative = document.getElementById("pedagogy-alternative");

  // 轻量级全局 Toast 提醒
  function showToast(message, duration = 2200) {
    let toast = document.getElementById("nhg-app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "nhg-app-toast";
      toast.style.cssText = `
        position: fixed;
        top: 1.25rem;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 23, 42, 0.94);
        color: #fff;
        padding: 0.6rem 1.25rem;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-20px)";
    }, duration);
  }

  // 背诵掌握度本地持久化追踪器 (Mastery Tracker)
  const MasteryTracker = {
    storageKey: "NHG_RECITE_MASTERY_V1",
    getMasteredSet() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? new Set(JSON.parse(raw)) : new Set();
      } catch (e) {
        return new Set();
      }
    },
    isMastered(key) {
      return this.getMasteredSet().has(key);
    },
    toggle(key) {
      const set = this.getMasteredSet();
      if (set.has(key)) set.delete(key);
      else set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
      return set.has(key);
    },
    markMastered(key, state = true) {
      const set = this.getMasteredSet();
      if (state) set.add(key);
      else set.delete(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    }
  };

  // 重点生疏本与抗遗忘过滤追踪器 (Weakness Tracker)
  const WeaknessTracker = {
    storageKey: "NHG_WEAKNESS_SET_V1",
    getWeaknessSet() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? new Set(JSON.parse(raw)) : new Set();
      } catch (e) {
        return new Set();
      }
    },
    isWeakness(key) {
      return this.getWeaknessSet().has(key);
    },
    add(key) {
      const set = this.getWeaknessSet();
      set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    },
    remove(key) {
      const set = this.getWeaknessSet();
      set.delete(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    },
    toggle(key) {
      const set = this.getWeaknessSet();
      if (set.has(key)) set.delete(key);
      else set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
      return set.has(key);
    },
    countInScope(scene, scope = 'tb', passageIdx = 0) {
      if (!scene) return 0;
      const set = this.getWeaknessSet();
      let count = 0;
      if (scope === 'tb' && scene.textbookText && scene.textbookText.dialogue) {
        scene.textbookText.dialogue.forEach((_, idx) => {
          if (set.has(`s${scene.sceneNumber}-tb-${idx}`)) count++;
        });
      } else if (scope === 'p' && scene.practiceTexts && scene.practiceTexts[passageIdx] && scene.practiceTexts[passageIdx].dialogue) {
        const p = scene.practiceTexts[passageIdx];
        p.dialogue.forEach((_, idx) => {
          if (set.has(`s${scene.sceneNumber}-p${p.pNum}-${idx}`)) count++;
        });
      }
      return count;
    }
  };

  // 核心 IT 商务与客户心理潜台词字典 (Curated IT Business & Workplace Nuance Dictionary)
  const IT_KNOWLEDGE_DICT = {
    "要件定義": {
      term: "要件定義（ようけんていぎ）",
      badge: "IT上流工程",
      pos: "名词 / 核心阶段",
      meaning: "需求定义。对日开发中软件生命周期的关键上流工程。将客户业务痛点梳理为系统应具备的功能（機能要件）与性能/安全指标（非機能要件）。",
      subtext: "【职场情商与客户潜台词】日本客户常说「要件定義が固まった（需求已敲定/冻结）」，意味着之后若有新想法必须走追加开发流程。若中途变更，切忌口头答应，必须书面确认影响（影響範囲）。",
      examples: [
        { jp: "来週までに要件定義書を取りまとめて提示いたします。", zh: "下周前我们会汇总好需求定义书并向您提交。" },
        { jp: "要件定義の段階で認識齟齬を潰しておくことが不可欠です。", zh: "在需求定义阶段彻底消除理解偏差是必不可少的。" }
      ]
    },
    "見積もり": {
      term: "見積もり（みつもり）",
      badge: "商务谈判",
      pos: "名词 / 商业测算",
      meaning: "估价单、报价单、工数估算。在对日业务中分为「概算見積もり（粗估）」与「確定見積もり（正式报价）」。",
      subtext: "【职场避坑】在需求未明确前，客户常口头试探“大概多少人月”，此时绝不可报定死数字，必须使用「現時点では概算となりますが…」「要件確定後に正式な見積もりを提出いたします」等缓冲用语留有余地。",
      examples: [
        { jp: "現在見積もりの作成には平均してどのくらいの時間をおかけですか。", zh: "目前制作一份报价单，平均要花费各位多长时间呢？" },
        { jp: "追加要件に伴い、工数の再見積もりが必要となります。", zh: "随着追加需求产生，需要对工数进行重新估算。" }
      ]
    },
    "伺わせていただきます": {
      term: "伺わせていただきます（うかがわせていただきます）",
      badge: "商务最高敬语",
      pos: "使役谦让表现",
      meaning: "请允许我向您请教/听取意见。「伺う（听/问的谦让语）」＋「させて（使役形）」＋「いただきます（得到对方许可/受惠）」。",
      subtext: "【职场修养】比普通的「伺います」更加恭敬温和。在首次与日本部长、客户决策层开会，或探询敏感业务课题时使用，能瞬间建立专业有礼的信赖感。",
      examples: [
        { jp: "本日は田中部長のIT化のご要件について伺わせていただきます。", zh: "今天由我来向田中部长请教IT化改造的具体需求。" }
      ]
    },
    "商談履歴": {
      term: "商談履歴（しょうだんりれき）",
      badge: "SFA核心概念",
      pos: "名词 / 业务数据",
      meaning: "商务洽谈历史记录。SFA（营业支援系统）最核心的模块，记录客户拜访、商谈进展、提案内诺与报价状态。",
      subtext: "【痛点背景】传统日企销售往往把商谈笔记记在个人记事本上，一旦员工离职或请假，案件进展完全失联（属人化）。SFA的核心价值正是将商谈履历一元化共享。",
      examples: [
        { jp: "過去の商談履歴をチーム内で一元化して共有したいと考えています。", zh: "我们希望能将过去的商谈履历在团队内部集中共享。" }
      ]
    },
    "一元化": {
      term: "一元化（いちげんか）",
      badge: "DX系统目标",
      pos: "名・サ変动词",
      meaning: "集中统一管理。将分散在各处、各人的数据与业务流程集中于一个系统平台。",
      subtext: "【提案技巧】向日本客户提案时，用「データの分散（数据离散混乱）」反衬「一元管理による業務効率化（通过一元化提升效率）」，是极其有说服力的王道叙事。",
      examples: [
        { jp: "顧客情報と商談履歴の一元化を図る必要があります。", zh: "有必要实现客户信息与商谈履历的集中统一管理。" }
      ]
    },
    "ばらつき": {
      term: "ばらつき（ばらつき）",
      badge: "业务痛点词",
      pos: "名词 / 统计离散",
      meaning: "参差不齐、离散度、因人而异。常用于表达质量不均、耗时不一等业务波动。",
      subtext: "【痛点表达】搭配动词「ばらつきがある（参差不齐）」「ばらつきを抑える（平抑波动/标准化）」。日本制造与IT文化极重标准化（標準化），发现ばらつき就是系统改造的最佳切入点。",
      examples: [
        { jp: "営業担当者によってスキルのばらつきがあるのが実情です。", zh: "实际情况是各销售代表之间的能力存在参差不齐。" }
      ]
    },
    "あたり": {
      term: "〜あたり（あたり）",
      badge: "IT指标计算",
      pos: "接尾词",
      meaning: "平均每……、按每……基准计算。接在数量词或单位名词后。",
      subtext: "【工数与性能标准】对日开发中必用的计算基准，如「1人月あたり」「1日あたり」「1画面あたり」「1件あたり」。必须熟练表达指标口径。",
      examples: [
        { jp: "平均して1件あたり2時間程度かかっています。", zh: "平均每单大概要耗费2小时左右。" },
        { jp: "1日あたりの処理件数を大幅に引き上げることができます。", zh: "能够大幅提升单日的处理单量。" }
      ]
    },
    "スコープ": {
      term: "スコープ（Scope）",
      badge: "项目管理PM",
      pos: "IT外来语",
      meaning: "项目范围、实施范围。界定本次系统开发包含什么、明确排除什么（スコープ外）。",
      subtext: "【PM核心防御】日本客户追加小需求时经常说「ついでにこれも（顺便把这个也做了）」。合格的BSE/PM必须敢于委婉指出「本フェーズのスコープ外となります」，守住交付底线。",
      examples: [
        { jp: "まずはフェーズ1のスコープを明確に絞り込みましょう。", zh: "首先让我们明确收敛第一阶段的开发范围。" }
      ]
    },
    "フェーズ": {
      term: "フェーズ（Phase）",
      badge: "分期交付",
      pos: "IT外来语",
      meaning: "开发阶段、实施分期。如フェーズ1（Phase 1，最小可用MVP）、フェーズ2。",
      subtext: "【交付策略】面对客户预算不足或工期紧迫时，最佳应对句型：「フェーズ分けをご提案させていただけますでしょうか（容我向您提议分期实施策略）」。",
      examples: [
        { jp: "優先度の高い機能からフェーズ1で先行リリースします。", zh: "从优先级最高的功能开始在第一阶段先行发布上线。" }
      ]
    },
    "プロトタイプ": {
      term: "プロトタイプ（Prototype）",
      badge: "UI/UX原型",
      pos: "IT外来语",
      meaning: "原型系统、模型机。在需求分析阶段用可交互界面与客户拉齐认知。",
      subtext: "【避雷指南】原型虽好，但日本客户看了高保真原型后常误以为“系统已经做好了大部分”，必须澄清「本モックアップは画面イメージ確認用となります」。",
      examples: [
        { jp: "要件確認用のプロトタイプをご用意しましたので、操作感をご確認ください。", zh: "我们准备了用于确认需求的原型，请您体验一下操作手感。" }
      ]
    },
    "棚卸し": {
      term: "棚卸し（たなおろし）",
      badge: "业务整理",
      pos: "名・サ変动词",
      meaning: "盘点、系统性梳理。原为仓库盘点货物，在IT项目中引申为对现有业务、数据、接口进行全面大摸底与清洗整理。",
      subtext: "【常用搭配】「業務の棚卸し」「現行画面の棚卸し」「データの棚卸し」。",
      examples: [
        { jp: "システム設計に入る前に、まずは現行業務の棚卸しを実施します。", zh: "在进入系统设计之前，首先对现有业务开展全面盘点梳理。" }
      ]
    },
    "ボトルネック": {
      term: "ボトルネック（Bottleneck）",
      badge: "系统瓶颈",
      pos: "IT外来语",
      meaning: "瓶颈、阻碍业务通畅的狭窄症结点。",
      subtext: "【表达习惯】日本客户喜欢用「どこがボトルネックになっているか（哪里卡脖子成了瓶颈）」来寻找优化方向。",
      examples: [
        { jp: "承認プロセスが業務フロー全体のボトルネックになっています。", zh: "审批环节成了整个业务流程的最大瓶颈。" }
      ]
    },
    "属人化": {
      term: "属人化（ぞくじんか）",
      badge: "管理痛点",
      pos: "名词 / 风险概念",
      meaning: "个人化依赖。指特定业务只有某一个人懂，其他人无法接手或替代的危险状态。反义词是「標準化（ひょうじゅんか）」。",
      subtext: "【共情利器】聊到系统升级原因，几乎100%的日本客户领导都会对「業務の属人化を防ぎたい」产生强烈共鸣。",
      examples: [
        { jp: "担当者の退職に伴う属人化リスクを解消します。", zh: "彻底消除因员工离职带来的业务属人化风险。" }
      ]
    },
    "代替案": {
      term: "代替案（だいたいあん）",
      badge: "商务博弈",
      pos: "名词 / 解决方案",
      meaning: "替代方案、备选折中案。",
      subtext: "【商务黄金法则】对日开发中绝对不能直接对客户说「出来ません（做不到）」，那是严重缺乏商业素养的体现。正确姿态是：「ご要望の仕様ですと工期に影響が生じますため、代替案として〇〇をご提案したく存じます（若按该规格将影响工期，因此我们提议将XX作为替代方案）」。",
      examples: [
        { jp: "工期短縮に向けた代替案を2案ご用意いたしました。", zh: "为了缩短工期，我们准备了2套替代方案供您选择。" }
      ]
    },
    "検討させていただきます": {
      term: "検討させていただきます（けんとうさせていただきます）",
      badge: "客户潜台词",
      pos: "常用商务应答",
      meaning: "我们会讨论/考虑一下。",
      subtext: "【⚠️ 高危潜台词警告】在对日商务中，当客户说「持ち帰って検討します」或「社内で検討させていただきます」时，在80%以上的情境下其实代表「委婉拒绝或存在巨大顾虑」！切忌干等，应适时跟进「ご検討にあたり、追加で必要な資料や懸念点はございますか」主动打消顾虑。",
      examples: [
        { jp: "ご提案の件、社内で一度検討させていただきます。", zh: "关于您提议的方案，我们内部会先商讨一下（实务潜台词：存在顾虑，需继续跟进）。" }
      ]
    }
  };

  // 知识点预制原声 MP3 映射表
  const TERM_AUDIO_MAP = {
    "自然言語処理": "audio/terms/38bfa4204013.mp3",
    "第1フェーズ": "audio/terms/0d8983a23ea6.mp3",
    "ばらつきがある": "audio/terms/edc495805d94.mp3",
    "あたり": "audio/terms/fe6770b44136.mp3",
    "一元化": "audio/terms/96db16ec69eb.mp3",
    "振り分け": "audio/terms/a0672469864c.mp3",
    "配車": "audio/terms/5c4beffe8292.mp3",
    "検討させていただきます": "audio/terms/7bb55d89b242.mp3",
    "フェーズ": "audio/terms/ca2e4d459d76.mp3",
    "1件あたり": "audio/terms/d8bf2cc4b289.mp3",
    "スコープ": "audio/terms/57b6ca0c5185.mp3",
    "可視化": "audio/terms/70d66e57c7fd.mp3",
    "頼っている": "audio/terms/3c08181583de.mp3",
    "見積もり": "audio/terms/7c13dcd4e523.mp3",
    "伺わせていただきます": "audio/terms/d591c7c206bd.mp3",
    "期間を要する": "audio/terms/d4b346ab568b.mp3",
    "初回回答": "audio/terms/ea566b1ab91e.mp3",
    "頻出質問": "audio/terms/f170b1bd13f8.mp3",
    "想定しています": "audio/terms/02bf33a99e70.mp3",
    "商談履歴": "audio/terms/bf67b425b860.mp3",
    "〜というのは、〜ということですか": "audio/terms/4c11ebdb59b4.mp3",
    "できず": "audio/terms/da310c028b93.mp3",
    "プロトタイプ": "audio/terms/7a8eb05e7a11.mp3",
    "〜に基づき": "audio/terms/b5ae77613b41.mp3",
    "属人化": "audio/terms/951534d1bf76.mp3",
    "代替案": "audio/terms/b3c0149e767a.mp3",
    "できておらず": "audio/terms/92b1e34cf8a4.mp3",
    "改めてお伺いします": "audio/terms/7329cb359577.mp3",
    "ばらつき": "audio/terms/1b8731175cc5.mp3",
    "一元管理": "audio/terms/d69f015c704d.mp3",
    "整備されておらず": "audio/terms/21735ec7ebb2.mp3",
    "ボトルネック": "audio/terms/a7e38ac73dca.mp3",
    "要件定義": "audio/terms/da708fd88ba1.mp3",
    "棚卸し": "audio/terms/9b88e9664388.mp3",
    "ことです": "audio/terms/5bc8a83771f4.mp3",
    "〜ではないかと見ています": "audio/terms/0da90dbc6e75.mp3"
  };

  // 打开知识点底部抽屉 (Bottom Sheet Drawer)
  function openKnowledgeDrawer(termKey, scene) {
    let cardData = IT_KNOWLEDGE_DICT[termKey];
    if (!cardData && scene) {
      // 检查词性切片 tokens
      if (scene.textbookText && scene.textbookText.tokens) {
        const tok = scene.textbookText.tokens.find(t => t.surface === termKey || t.surface.includes(termKey));
        if (tok) {
          cardData = {
            term: `${tok.surface}（${tok.reading}）`,
            badge: "课文核心词",
            pos: tok.pos,
            meaning: tok.meaning,
            subtext: `【对日实务提示】在当前场景中属于关键表达，用于拉齐双方认知与需求定义口径。`,
            examples: []
          };
        }
      }
      // 检查语法图鉴
      if (!cardData && scene.grammarPoints) {
        const gp = scene.grammarPoints.find(g => g.title.includes(termKey) || termKey.includes(g.badge));
        if (gp) {
          cardData = {
            term: gp.title,
            badge: gp.badge,
            pos: gp.level,
            meaning: gp.concept,
            subtext: `【详细接续法则】${gp.formula}`,
            examples: (gp.businessExamples || []).map(e => ({ jp: e.jp, zh: e.zh }))
          };
        }
      }
      // 检查词汇
      if (!cardData && scene.vocabulary) {
        const v = scene.vocabulary.find(item => item.kanji === termKey || item.reading === termKey);
        if (v) {
          cardData = {
            term: `${v.kanji}（${v.reading}）`,
            badge: v.level,
            pos: v.pos,
            meaning: v.zh,
            subtext: `【高频词组搭配】${v.phrase || '对日工程常用业务词汇'}`,
            examples: []
          };
        }
      }
    }

    if (!cardData) {
      cardData = {
        term: termKey,
        badge: "IT业务要点",
        pos: "商务表达",
        meaning: `对日软件需求定义与分析设计中的核心词汇/句型。`,
        subtext: `【实战修养】在需求会谈与式样书确认中准确使用，能有效提升沟通专业度。`,
        examples: []
      };
    }

    drawerTitle.textContent = cardData.term.replace(/（.*）/, '');
    drawerBadge.textContent = cardData.badge || "IT业务词";
    drawerPos.textContent = cardData.pos || "商务实务";
    drawerMeaning.textContent = cardData.meaning || "";

    if (cardData.subtext) {
      drawerSubtextSection.style.display = "block";
      drawerSubtext.textContent = cardData.subtext;
    } else {
      drawerSubtextSection.style.display = "none";
    }

    if (cardData.examples && cardData.examples.length) {
      drawerExamplesSection.style.display = "block";
      drawerExamples.innerHTML = cardData.examples.map(ex => `
        <div class="drawer-eg-item">
          <div class="drawer-eg-jp">${ex.jp}</div>
          <div class="drawer-eg-zh">${ex.zh}</div>
        </div>
      `).join("");
    } else {
      drawerExamplesSection.style.display = "none";
    }

    const cleanAudioText = cardData.term.replace(/（[^）]+）/g, '').trim();
    const termAudioUrl = TERM_AUDIO_MAP[cleanAudioText] || TERM_AUDIO_MAP[termKey] || null;
    drawerSpeakBtn.onclick = () => {
      AudioController.speak(cleanAudioText, drawerSpeakBtn, termAudioUrl, null, "ja-JP-NanamiNeural");
    };

    drawerOverlay.classList.add("active");
  }

  function closeKnowledgeDrawer() {
    drawerOverlay.classList.remove("active");
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeKnowledgeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", (e) => {
      if (e.target === drawerOverlay) closeKnowledgeDrawer();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeKnowledgeDrawer();
  });

  // 🎓 单句名师精讲与记忆锦囊抽屉逻辑
  function openPedagogyDrawer(turn, scene, audioUrl, spkMeta) {
    if (!pedagogyOverlay || !turn) return;

    // 填充发言角色与原句
    if (pedagogySpeakerBadge) {
      pedagogySpeakerBadge.textContent = `${turn.speaker}（${spkMeta ? spkMeta.roleLabel : '角色'}）`;
    }
    if (pedagogySentenceJp) {
      pedagogySentenceJp.innerHTML = turn.jpWithRuby || turn.jp;
    }
    if (pedagogySentenceZh) {
      pedagogySentenceZh.textContent = turn.zh || '';
    }

    // 绑定整句原声播放
    if (pedagogySpeakBtn) {
      pedagogySpeakBtn.onclick = () => {
        AudioController.speak(turn.jp, pedagogySpeakBtn, audioUrl, null, spkMeta ? spkMeta.voice : 'ja-JP-NanamiNeural');
      };
    }

    const p = turn.pedagogy;
    if (p) {
      // 1. 核心句型骨架
      if (pedagogyPatternFormula) pedagogyPatternFormula.innerHTML = p.patternWithRuby || p.pattern || '通用商务表达句型';
      if (pedagogyPatternMeaning) pedagogyPatternMeaning.textContent = p.patternMeaning || '';

      // 2. 核心语法解析
      if (pedagogyGrammarList) {
        if (p.grammar && p.grammar.length) {
          pedagogyGrammarList.innerHTML = p.grammar.map(g => `
            <div class="pedagogy-grammar-item">
              <div class="grammar-item-header">
                <span class="grammar-name">${g.nameWithRuby || g.name}</span>
                <span class="grammar-rule">${g.rule}</span>
              </div>
              <div class="grammar-desc">${g.desc}</div>
            </div>
          `).join("");
        } else {
          pedagogyGrammarList.innerHTML = '<div style="font-size:0.82rem; color:#64748b;">本句采用标准职场敬语表达。</div>';
        }
      }

      // 3. 重点词汇与商务搭配
      if (pedagogyVocabList) {
        if (p.vocabulary && p.vocabulary.length) {
          pedagogyVocabList.innerHTML = p.vocabulary.map(v => `
            <div class="pedagogy-vocab-item">
              <div class="vocab-word-row">
                <span class="vocab-word">${v.word}</span>
                <span class="vocab-reading">（${v.reading}）</span>
                <span class="vocab-pos">${v.pos}</span>
              </div>
              <div class="vocab-meaning">${v.meaning}</div>
              ${v.collocation ? `<div class="vocab-collocation">💡 ${v.collocationWithRuby || v.collocation}</div>` : ''}
            </div>
          `).join("");
        } else {
          pedagogyVocabList.innerHTML = '<div style="font-size:0.82rem; color:#64748b;">本句词汇为常规职场基础用语。</div>';
        }
      }

      // 4. 名师速记心法与口诀
      const mt = p.memoryTips || {};
      if (pedagogyMnemonic) pedagogyMnemonic.textContent = mt.mnemonic || '意群模块化组合记忆。';
      if (pedagogyRhythm) pedagogyRhythm.innerHTML = mt.rhythmWithRuby || mt.rhythm || turn.jpWithRuby || turn.jp;
      if (pedagogyAssociation) pedagogyAssociation.textContent = mt.association || '结合上下文痛点与IT方案联想。';

      // 5. 职场情商指引与避雷指南
      const wt = p.workplaceTips || {};
      if (pedagogyNuance) pedagogyNuance.textContent = wt.nuance || '遵循严谨、谦逊、以客户为中心的对日商务礼仪。';
      if (pedagogyPitfall) pedagogyPitfall.textContent = wt.pitfall || '切忌直译或使用非正式口语表达。';
      if (pedagogyAlternative) pedagogyAlternative.textContent = wt.alternatives || '可根据会议正式程度适度微调敬语层级。';
    }

    pedagogyOverlay.classList.add("active");
  }

  function closePedagogyDrawer() {
    if (pedagogyOverlay) pedagogyOverlay.classList.remove("active");
  }

  if (pedagogyCloseBtn) pedagogyCloseBtn.addEventListener("click", closePedagogyDrawer);
  if (pedagogyOverlay) {
    pedagogyOverlay.addEventListener("click", (e) => {
      if (e.target === pedagogyOverlay) closePedagogyDrawer();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePedagogyDrawer();
  });

  // 提取单句对白中的核心关键词
  function findKeyTermsInTurn(jpText, scene) {
    const terms = [];
    const allCandidates = Object.keys(IT_KNOWLEDGE_DICT);
    if (scene.textbookText && scene.textbookText.tokens) {
      scene.textbookText.tokens.forEach(t => {
        if (t.isKey && !allCandidates.includes(t.surface)) allCandidates.push(t.surface);
      });
    }
    if (scene.vocabulary) {
      scene.vocabulary.forEach(v => {
        if (!allCandidates.includes(v.kanji)) allCandidates.push(v.kanji);
      });
    }

    allCandidates.sort((a, b) => b.length - a.length);

    allCandidates.forEach(term => {
      const cleanTerm = term.replace(/^[〜~]/, '').trim();
      if (cleanTerm.length >= 2 && jpText.includes(cleanTerm)) {
        if (!terms.includes(cleanTerm)) terms.push(cleanTerm);
      }
    });

    return terms.slice(0, 3); // 每句最多展示3个重点知识胶囊，保证界面清爽
  }

  // 生成挖空背诵 HTML
  function generateClozeHtml(jpWithRuby, keyTerms) {
    let result = jpWithRuby;
    keyTerms.forEach(term => {
      const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(<ruby>[^<]*${safeTerm}[^<]*<rt>[^<]*<\/rt><\/ruby>|${safeTerm})`, 'g');
      result = result.replace(regex, (match) => {
        if (match.startsWith('<span class="cloze-mask"')) return match;
        return `<span class="cloze-mask"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
      });
    });

    // 如果未命中特定术语，则挖空句末核心助动词或敬语
    if (!result.includes('cloze-mask')) {
      result = result.replace(/(伺わせていただきます|いらっしゃいます|頼っている|短縮したい|かかっています|承知しました|ございます|ですね)/, (match) => {
        return `<span class="cloze-mask"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
      });
    }

    return result;
  }

  // 日语输入智能容错与逐字 Diff 比对核心算法
  function computeJapaneseDiff(userInput, targetJp, targetRuby = null) {
    const rawInput = (userInput || "").trim();
    // 基础清洗：移除标点符号、空格与常见括号
    const cleanInput = rawInput.replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
    const cleanTarget = (targetJp || "").replace(/[。、！？\s\.,!?・「」『』（）()]/g, '').trim();

    // 从 Ruby 中提取纯平假名发音流
    let cleanKanaTarget = "";
    if (targetRuby) {
      const kanaStr = targetRuby.replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, '$1')
                                .replace(/<[^>]+>/g, '')
                                .replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
      cleanKanaTarget = kanaStr.trim();
    }

    if (!cleanInput) {
      return {
        score: 0,
        scoreBadgeClass: "score-low",
        tipHtml: "⚠️ 尚未输入内容，请在输入框键入日语或点击直接揭晓",
        userDiffHtml: '<span style="color:#94a3b8;">（未输入内容）</span>',
        isKanaPerfect: false
      };
    }

    // Levenshtein 距离算法
    function getLevenshtein(s1, s2) {
      const m = s1.length;
      const n = s2.length;
      const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (s1[i - 1] === s2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1];
          } else {
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1,
              dp[i - 1][j - 1] + 1
            );
          }
        }
      }
      return dp[m][n];
    }

    const distKanji = getLevenshtein(cleanInput, cleanTarget);
    const distKana = cleanKanaTarget ? getLevenshtein(cleanInput, cleanKanaTarget) : 999;

    const maxLenKanji = Math.max(cleanTarget.length, cleanInput.length) || 1;
    const maxLenKana = cleanKanaTarget ? Math.max(cleanKanaTarget.length, cleanInput.length) : 1;

    const scoreKanji = Math.max(0, Math.round((1 - distKanji / maxLenKanji) * 100));
    const scoreKana = cleanKanaTarget ? Math.max(0, Math.round((1 - distKana / maxLenKana) * 100)) : 0;

    // 判定是否以平假名形式达成完美发音匹配
    const isKanaPerfect = (scoreKana === 100 && scoreKanji < 100);
    const isKanaDominant = (scoreKana > scoreKanji);
    const finalScore = Math.max(scoreKanji, scoreKana);
    const refForDiff = (isKanaDominant && cleanKanaTarget) ? cleanKanaTarget : cleanTarget;

    // 最长公共子序列 (LCS) 回溯生成视觉 Diff
    const m = cleanInput.length;
    const n = refForDiff.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (cleanInput[i - 1] === refForDiff[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = m, j = n;
    const matchedIndices = new Set();
    while (i > 0 && j > 0) {
      if (cleanInput[i - 1] === refForDiff[j - 1]) {
        matchedIndices.add(i - 1);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    let userDiffHtml = "";
    for (let k = 0; k < m; k++) {
      const ch = cleanInput[k];
      if (matchedIndices.has(k)) {
        userDiffHtml += `<span class="diff-char-match">${ch}</span>`;
      } else {
        userDiffHtml += `<span class="diff-char-mismatch" title="与范例存在出入">${ch}</span>`;
      }
    }

    // 评级与建议
    let scoreBadgeClass = "score-low";
    let tipHtml = "";

    if (finalScore === 100) {
      scoreBadgeClass = "score-perfect";
      if (isKanaPerfect) {
        tipHtml = `🌟 <b>发音100%完全吻合！</b><span class="kana-tip-pill">💡 假名读音完全正确，建议结合下方汉字标准写法进阶巩固</span>`;
      } else {
        tipHtml = `🌟 <b>完美契合！</b>字词、敬语与拼写无可挑剔！`;
      }
    } else if (finalScore >= 85) {
      scoreBadgeClass = "score-high";
      tipHtml = `👏 <b>极高准确度！</b>仅存在极少数假名或助词细微出入（见红色划线标注）`;
    } else if (finalScore >= 60) {
      scoreBadgeClass = "score-medium";
      tipHtml = `💡 <b>大意已表达！</b>请对照标准范例核对格助词（に/で/を）与动词变形`;
    } else {
      scoreBadgeClass = "score-low";
      tipHtml = `🔄 <b>存在较多偏差！</b>建议点击标准范例原声反复跟读，再试一次`;
    }

    return {
      score: finalScore,
      scoreBadgeClass,
      tipHtml,
      userDiffHtml,
      isKanaPerfect
    };
  }

  // 统一构建对白卡片 (适配精读全览、挖空背诵、译日盲背、模拟开会四模式，支持实战默写输入与智能核对)
  function createDialogueTurnElement({ turn, turnId, scope, scene, mode, audioUrl = null }) {
    const isMastered = MasteryTracker.isMastered(turnId);
    const isWeak = WeaknessTracker.isWeakness(turnId);
    const spkMeta = getSpeakerMeta(turn.speaker);
    const keyTerms = findKeyTermsInTurn(turn.jp, scene);

    const card = document.createElement("div");
    card.className = `dialogue-turn ${isMastered ? 'is-mastered' : ''} ${isWeak ? 'is-weakness' : ''}`;
    card.setAttribute("data-turn-id", turnId);

    // 知识点透镜微标签
    const tagsHtml = keyTerms.length ? `
      <div class="turn-knowledge-tags">
        ${keyTerms.map(t => `<button class="k-tag-btn" data-term="${t}" title="点击查看【${t}】业务释义与客户潜台词">💡 ${t}</button>`).join("")}
      </div>
    ` : '';

    let bubbleBodyHtml = '';

    if (mode === 'roleplay') {
      // 模式 4：模拟开会实战模式 (角色扮演交替对答，支持输入作答与智能核对)
      const myRole = (scope === 'tb') ? tbMyRole : pMyRole;
      const isMyTurn = (turn.speaker === myRole);

      if (isMyTurn) {
        card.classList.add("is-my-turn");
        bubbleBodyHtml = `
          <div class="turn-zh" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">${turn.zh || ''}</div>
          ${turn.keyNote ? `<div class="turn-note" style="margin-bottom: 0.6rem;">${turn.keyNote}</div>` : ''}
          ${tagsHtml}
          <div class="rp-prompt-box">
            <div class="rp-prompt-title">
              <span>🎤 轮到您发言（角色：${turn.speaker}）</span>
            </div>
            <div class="rp-zh-text">请看中文诉求，在此输入您的回答并核对 ➜ 系统将实时比对并播放范例：</div>
            <div style="margin-top: 0.5rem;">
              <textarea class="user-rp-input" rows="2" placeholder="在此输入您的日文发言（支持手机语音转文字，回车即提交）..."></textarea>
              <div class="rp-input-actions">
                <button class="btn-rp-submit-check">
                  <span>🚀 提交发言并核对</span>
                </button>
                <button class="btn-skip-input btn-rp-skip-input">直接看范例 👁️</button>
                <button type="button" class="btn-skip-input btn-rp-ai-eval" title="请资深对日IT总监 AI 深度诊断您的发言（敬语/情商/IT方案）">
                  <span>🤖 AI 导师点评</span>
                </button>
              </div>
            </div>
            <div class="rp-check-result" style="display: none;">
              <div class="check-score-bar">
                <span class="check-score-badge score-perfect">
                  <span class="score-num">0%</span> 实时匹配
                </span>
                <span class="check-score-tip">✍️ 实时匹配中（敲击回车或点击提交核对）</span>
              </div>
              <div class="diff-box">
                <div class="diff-line diff-user-row">
                  <span class="diff-label">您的作答：</span>
                  <span class="user-diff-content"></span>
                </div>
                <div class="diff-line diff-standard-row" style="display: none;">
                  <span class="diff-label">标准范例：</span>
                  <span class="standard-diff-content">${turn.jpWithRuby || turn.jp}</span>
                  <button class="btn-speak-standard" title="手动播放原声">🔊 听原声</button>
                </div>
              </div>
              <div class="rp-eval-actions" style="margin-top: 0.75rem; display: none;">
                <button class="btn-rp-pass">👍 我答对了（记为背熟）</button>
                <button class="btn-rp-retry">🔄 还要再练（记入生疏本）</button>
              </div>
            </div>
            <div class="rp-ai-eval-container" style="display: none; margin-top: 1rem;"></div>
          </div>
        `;
      } else {
        bubbleBodyHtml = `
          <div class="turn-jp">${turn.jpWithRuby || turn.jp}</div>
          <div class="turn-zh">${turn.zh || ''}</div>
          ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
          ${tagsHtml}
        `;
      }
    } else if (mode === 'prompt') {
      // 模式 3：译日盲背模式 (支持实时打字比对 + 最终核对揭晓标准范例)
      bubbleBodyHtml = `
        <div class="turn-zh" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">${turn.zh || ''}</div>
        ${turn.keyNote ? `<div class="turn-note" style="margin-bottom: 0.6rem;">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
        <div class="input-check-box">
          <div class="input-check-header">
            <span class="input-check-label">✍️ 默写实战（输入日文原句，支持语音转文字）：</span>
            <button class="btn-skip-input btn-prompt-skip-input" title="直接看答案">直接揭晓范例 👁️</button>
          </div>
          <div class="input-field-wrap">
            <textarea class="user-jp-input" rows="2" placeholder="请在此输入日语对白（输入中实时比对，回车即核对）..."></textarea>
            <button class="btn-submit-check" title="核对答案">
              <span>核对 ⚡</span>
            </button>
          </div>
          <div class="check-result-panel" style="display: none;">
            <div class="check-score-bar">
              <span class="check-score-badge score-perfect">
                <span class="score-num">0%</span> 实时匹配
              </span>
              <span class="check-score-tip">✍️ 实时匹配中（敲击回车或点击核对揭晓范例）</span>
            </div>
            <div class="diff-box">
              <div class="diff-line diff-user-row">
                <span class="diff-label">您的输入：</span>
                <span class="user-diff-content"></span>
              </div>
              <div class="diff-line diff-standard-row" style="display: none;">
                <span class="diff-label">标准范例：</span>
                <span class="standard-diff-content">${turn.jpWithRuby || turn.jp}</span>
                <button class="btn-speak-standard" title="手动播放原声">🔊 听原声</button>
              </div>
            </div>
            <div class="prompt-action-bar" style="margin-top: 0.75rem; display: none;">
              <button class="btn-prompt-pass">👍 我背对了（标记熟练）</button>
              <button class="btn-prompt-retry">🔄 还要再练（加入生疏本）</button>
            </div>
          </div>
        </div>
      `;
    } else if (mode === 'cloze') {
      // 模式 2：挖空背诵模式 (核心词汇/敬语挖空遮挡，点击揭晓)
      const clozeJp = generateClozeHtml(turn.jpWithRuby || turn.jp, keyTerms);
      bubbleBodyHtml = `
        <div class="turn-jp">${clozeJp}</div>
        <div class="turn-zh">${turn.zh || ''}</div>
        ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
      `;
    } else {
      // 模式 1：精读全览模式 (完整日文正文 + 假名注音 + 知识透镜)
      bubbleBodyHtml = `
        <div class="turn-jp">${turn.jpWithRuby || turn.jp}</div>
        <div class="turn-zh">${turn.zh || ''}</div>
        ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
      `;
    }

    card.innerHTML = `
      <div class="speaker-col">
        <div class="speaker-avatar-circle ${spkMeta.className}">${spkMeta.avatar}</div>
        <div class="speaker-meta-wrap">
          <div class="speaker-label-name">${turn.speaker}</div>
          <div class="speaker-label-role">${spkMeta.roleLabel}</div>
        </div>
      </div>
      <div class="dialogue-bubble-col">
        <div class="dialogue-top-line">
          <div class="turn-header-actions">
            <button class="btn-turn-mastery ${isMastered ? 'mastered' : ''}" title="点击切换背熟状态">
              <span class="star-icon">${isMastered ? '★' : '☆'}</span>
              <span class="star-label">${isMastered ? '已背熟' : '记为背熟'}</span>
            </button>
            ${turn.pedagogy ? `
            <button class="btn-turn-pedagogy" title="点击查看本句名师剖析、语法、词汇与记忆口诀">
              <span>🎓 句型与记忆法</span>
            </button>
            ` : ''}
            <button class="btn-turn-ai-tutor" title="向AI私教深度提问本句用法、客户潜台词或敬语升级">
              <span>🤖 问AI私教</span>
            </button>
          </div>
          <button class="btn-speak-clause" title="点击朗读原声" data-text="${turn.jp}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>
        ${bubbleBodyHtml}
      </div>
    `;

    // 绑定朗读
    const speakBtn = card.querySelector(".btn-speak-clause");
    speakBtn.addEventListener("click", () => {
      AudioController.speak(turn.jp, speakBtn, audioUrl, null, spkMeta.voice);
    });

    // 绑定单句背熟打卡
    const masteryBtn = card.querySelector(".btn-turn-mastery");
    masteryBtn.addEventListener("click", () => {
      const nowMastered = MasteryTracker.toggle(turnId);
      if (nowMastered) {
        WeaknessTracker.remove(turnId);
      }
      masteryBtn.classList.toggle("mastered", nowMastered);
      card.classList.toggle("is-mastered", nowMastered);
      masteryBtn.querySelector(".star-icon").textContent = nowMastered ? "★" : "☆";
      masteryBtn.querySelector(".star-label").textContent = nowMastered ? "已背熟" : "记为背熟";
      updateMasteryStats();
      updateWeaknessBadges();
      if ((scope === 'tb' ? tbFilter : pFilter) !== 'all') {
        applyFilter(scope);
      }
    });

    // 绑定单句名师句型与记忆法弹窗
    const pedagogyBtn = card.querySelector(".btn-turn-pedagogy");
    if (pedagogyBtn) {
      pedagogyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openPedagogyDrawer(turn, scene, audioUrl, spkMeta);
      });
    }

    // 绑定单句问AI私教抽屉
    const aiTutorBtn = card.querySelector(".btn-turn-ai-tutor");
    if (aiTutorBtn) {
      aiTutorBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openAiTutorDrawer(turn, scene, spkMeta);
      });
    }

    // 绑定知识透镜微标签点击弹窗
    card.querySelectorAll(".k-tag-btn").forEach(tagBtn => {
      tagBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openKnowledgeDrawer(tagBtn.getAttribute("data-term"), scene);
      });
    });

    // 挖空模式交互：点击遮挡块原地揭晓答案
    if (mode === 'cloze') {
      card.querySelectorAll(".cloze-mask").forEach(mask => {
        mask.addEventListener("click", () => {
          const isRevealed = mask.classList.toggle("revealed");
          const placeholder = mask.querySelector(".mask-placeholder");
          const answer = mask.querySelector(".mask-answer");
          if (placeholder && answer) {
            placeholder.style.display = isRevealed ? "none" : "inline";
            answer.style.display = isRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 盲背模式交互：输入日语并智能 Diff 核对
    if (mode === 'prompt') {
      const inputEl = card.querySelector(".user-jp-input");
      const submitBtn = card.querySelector(".btn-submit-check");
      const skipBtn = card.querySelector(".btn-prompt-skip-input");
      const resultPanel = card.querySelector(".check-result-panel");
      const scoreBadge = card.querySelector(".check-score-badge");
      const scoreTip = card.querySelector(".check-score-tip");
      const userDiffContent = card.querySelector(".user-diff-content");
      const standardRow = card.querySelector(".diff-standard-row");
      const speakStandardBtn = card.querySelector(".btn-speak-standard");
      const actionBar = card.querySelector(".prompt-action-bar");
      const passBtn = card.querySelector(".btn-prompt-pass");
      const retryBtn = card.querySelector(".btn-prompt-retry");

      // 实时打字比对（仅展示匹配率与用户输入高亮，保持标准答案与操作按钮隐藏）
      const updateRealtimePromptPreview = () => {
        const text = inputEl ? inputEl.value : "";
        if (!text.trim()) {
          if (resultPanel && (!standardRow || standardRow.style.display === "none")) {
            resultPanel.style.display = "none";
          }
          return;
        }

        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (scoreBadge && scoreTip && userDiffContent) {
          scoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          scoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 实时匹配`;
          scoreTip.innerHTML = `✍️ 实时匹配中（敲击回车或点击核对揭晓范例）`;
          userDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (resultPanel) resultPanel.style.display = "block";
        if (standardRow && standardRow.style.display !== "flex") {
          standardRow.style.display = "none";
        }
        if (actionBar && actionBar.style.display !== "flex") {
          actionBar.style.display = "none";
        }
      };

      // 最终确认核对（揭晓标准答案与熟练度评判按钮，办公室静音环境不自动朗读音频）
      const doVerification = () => {
        const text = inputEl ? inputEl.value : "";
        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (scoreBadge && scoreTip && userDiffContent) {
          scoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          scoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 匹配度`;
          scoreTip.innerHTML = diff.tipHtml;
          userDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (resultPanel) resultPanel.style.display = "block";
        if (standardRow) standardRow.style.display = "flex";
        if (actionBar) actionBar.style.display = "flex";

        // 注意：用户在办公室等安静环境使用，不自动播放音频，按需点击“🔊 听原声”

        if (diff.score >= 85) {
          if (passBtn) passBtn.style.boxShadow = "0 0 0 2px #10b981";
          if (retryBtn) retryBtn.style.boxShadow = "none";
        } else {
          if (retryBtn) retryBtn.style.boxShadow = "0 0 0 2px #ef4444";
          if (passBtn) passBtn.style.boxShadow = "none";
        }
      };

      if (submitBtn) {
        submitBtn.addEventListener("click", doVerification);
      }

      if (speakStandardBtn) {
        speakStandardBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          AudioController.speak(turn.jp, speakStandardBtn, audioUrl, null, spkMeta.voice);
        });
      }

      if (inputEl) {
        let isComposing = false;
        inputEl.addEventListener("compositionstart", () => {
          isComposing = true;
        });
        inputEl.addEventListener("compositionend", () => {
          isComposing = true;
          setTimeout(() => {
            isComposing = false;
          }, 80);
          setTimeout(updateRealtimePromptPreview, 30);
        });

        inputEl.addEventListener("input", updateRealtimePromptPreview);

        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // 如果处于日语输入法汉字转换中（未確定/候補選択中），回车仅用于确认汉字转换，不触发核对提交
            if (e.isComposing || isComposing || e.keyCode === 229) {
              return;
            }
            e.preventDefault();
            doVerification();
          }
        });
      }

      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          if (scoreBadge && scoreTip && userDiffContent) {
            scoreBadge.className = "check-score-badge score-high";
            scoreBadge.innerHTML = `<span>对照学习</span>`;
            scoreTip.innerHTML = `👁️ 已直接为您揭晓标准范例对白`;
            userDiffContent.innerHTML = `<span style="color:#94a3b8;">（已跳过手动输入）</span>`;
          }
          if (resultPanel) resultPanel.style.display = "block";
          if (standardRow) standardRow.style.display = "flex";
          if (actionBar) actionBar.style.display = "flex";
          // 揭晓范例不自动播放音频
        });
      }

      if (passBtn) {
        passBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          MasteryTracker.markMastered(turnId, true);
          WeaknessTracker.remove(turnId);
          masteryBtn.classList.add("mastered");
          card.classList.add("is-mastered");
          card.classList.remove("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "★";
          masteryBtn.querySelector(".star-label").textContent = "已背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已背对！标记熟练并移出生疏本 👍");
          if ((scope === 'tb' ? tbFilter : pFilter) === 'weakness') {
            applyFilter(scope);
          }
        });
      }

      if (retryBtn) {
        retryBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          WeaknessTracker.add(turnId);
          MasteryTracker.markMastered(turnId, false);
          masteryBtn.classList.remove("mastered");
          card.classList.remove("is-mastered");
          card.classList.add("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "☆";
          masteryBtn.querySelector(".star-label").textContent = "记为背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已加入重点生疏本，稍后巩固 ⚡");
        });
      }
    }

    // 角色扮演模式交互：输入作答与智能核对
    if (mode === 'roleplay') {
      const rpInputEl = card.querySelector(".user-rp-input");
      const rpSubmitBtn = card.querySelector(".btn-rp-submit-check");
      const rpSkipBtn = card.querySelector(".btn-rp-skip-input");
      const rpResultPanel = card.querySelector(".rp-check-result");
      const rpScoreBadge = card.querySelector(".rp-check-result .check-score-badge");
      const rpScoreTip = card.querySelector(".rp-check-result .check-score-tip");
      const rpUserDiffContent = card.querySelector(".rp-check-result .user-diff-content");
      const rpStandardRow = card.querySelector(".rp-check-result .diff-standard-row");
      const rpSpeakStandardBtn = card.querySelector(".rp-check-result .btn-speak-standard");
      const rpActionBar = card.querySelector(".rp-eval-actions");
      const passBtn = card.querySelector(".btn-rp-pass");
      const retryBtn = card.querySelector(".btn-rp-retry");

      // 实时打字比对
      const updateRealtimeRpPreview = () => {
        const text = rpInputEl ? rpInputEl.value : "";
        if (!text.trim()) {
          if (rpResultPanel && (!rpStandardRow || rpStandardRow.style.display === "none")) {
            rpResultPanel.style.display = "none";
          }
          return;
        }

        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
          rpScoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          rpScoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 实时匹配`;
          rpScoreTip.innerHTML = `✍️ 实时发言比对中（按回车或点击提交揭晓范例）`;
          rpUserDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (rpResultPanel) rpResultPanel.style.display = "block";
        if (rpStandardRow && rpStandardRow.style.display !== "flex") {
          rpStandardRow.style.display = "none";
        }
        if (rpActionBar && rpActionBar.style.display !== "flex") {
          rpActionBar.style.display = "none";
        }
      };

      // 最终确认核对（揭晓标准发言与评判按钮，不自动播放音频）
      const doRpVerification = () => {
        const text = rpInputEl ? rpInputEl.value : "";
        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
          rpScoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          rpScoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 匹配度`;
          rpScoreTip.innerHTML = diff.tipHtml;
          rpUserDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (rpResultPanel) rpResultPanel.style.display = "block";
        if (rpStandardRow) rpStandardRow.style.display = "flex";
        if (rpActionBar) rpActionBar.style.display = "flex";

        // 不自动播放音频，用户可按需点击“🔊 听原声”

        if (diff.score >= 85) {
          if (passBtn) passBtn.style.boxShadow = "0 0 0 2px #10b981";
          if (retryBtn) retryBtn.style.boxShadow = "none";
        } else {
          if (retryBtn) retryBtn.style.boxShadow = "0 0 0 2px #ef4444";
          if (passBtn) passBtn.style.boxShadow = "none";
        }
      };

      if (rpSubmitBtn) {
        rpSubmitBtn.addEventListener("click", doRpVerification);
      }

      if (rpSpeakStandardBtn) {
        rpSpeakStandardBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          AudioController.speak(turn.jp, rpSpeakStandardBtn, audioUrl, null, spkMeta.voice, 1);
        });
      }

      if (rpInputEl) {
        let isComposing = false;
        rpInputEl.addEventListener("compositionstart", () => {
          isComposing = true;
        });
        rpInputEl.addEventListener("compositionend", () => {
          isComposing = true;
          setTimeout(() => {
            isComposing = false;
          }, 80);
          setTimeout(updateRealtimeRpPreview, 30);
        });

        rpInputEl.addEventListener("input", updateRealtimeRpPreview);

        rpInputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // 如果处于日语输入法汉字转换中，回车仅用于确认候选词，不触发核对提交
            if (e.isComposing || isComposing || e.keyCode === 229) {
              return;
            }
            e.preventDefault();
            doRpVerification();
          }
        });
      }

      if (rpSkipBtn) {
        rpSkipBtn.addEventListener("click", () => {
          if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
            rpScoreBadge.className = "check-score-badge score-high";
            rpScoreBadge.innerHTML = `<span>对照学习</span>`;
            rpScoreTip.innerHTML = `👁️ 已直接为您揭晓标准会议发言`;
            rpUserDiffContent.innerHTML = `<span style="color:#94a3b8;">（已跳过手动输入）</span>`;
          }
          if (rpResultPanel) rpResultPanel.style.display = "block";
          if (rpStandardRow) rpStandardRow.style.display = "flex";
          if (rpActionBar) rpActionBar.style.display = "flex";
          // 不自动播放音频
        });
      }

      if (passBtn) {
        passBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          MasteryTracker.markMastered(turnId, true);
          WeaknessTracker.remove(turnId);
          masteryBtn.classList.add("mastered");
          card.classList.add("is-mastered");
          card.classList.remove("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "★";
          masteryBtn.querySelector(".star-label").textContent = "已背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已攻克！标记熟练并移出生疏本 🎯");
          if (roleplayMeetingActive && typeof advanceMeetingTurn === "function") {
            advanceMeetingTurn();
          }
        });
      }

      if (retryBtn) {
        retryBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          WeaknessTracker.add(turnId);
          MasteryTracker.markMastered(turnId, false);
          masteryBtn.classList.remove("mastered");
          card.classList.remove("is-mastered");
          card.classList.add("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "☆";
          masteryBtn.querySelector(".star-label").textContent = "记为背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已加入重点生疏本 📌");
          if (roleplayMeetingActive && typeof advanceMeetingTurn === "function") {
            advanceMeetingTurn();
          }
        });
      }

      // 角色扮演 AI 导师深度点评
      const rpAiEvalBtn = card.querySelector(".btn-rp-ai-eval");
      const rpAiEvalContainer = card.querySelector(".rp-ai-eval-container");

      if (rpAiEvalBtn && rpAiEvalContainer) {
        rpAiEvalBtn.addEventListener("click", async () => {
          if (!QwenAIEngine.isConfigured()) {
            showToast("请先在右上角【🤖 AI私教设置】中配置 Qwen API Key 🔑");
            openAiConfigModal();
            return;
          }
          const userText = rpInputEl ? rpInputEl.value.trim() : "";
          if (!userText) {
            showToast("请先在文本框中输入您的发言作答，AI导师将为您全方位诊断！✍️");
            if (rpInputEl) rpInputEl.focus();
            return;
          }

          rpAiEvalContainer.style.display = "block";
          rpAiEvalContainer.innerHTML = `
            <div class="ai-eval-loading-box">
              <div class="ai-spinner"></div>
              <div class="ai-eval-loading-text">
                <div style="font-weight: 700; color: #312e81; font-size: 0.95rem;">资深对日IT总监 AI 正在全方位深度诊断您的发言...</div>
                <div style="font-size: 0.8rem; color: #4338ca; margin-top: 0.2rem;">正在多维度评估：敬语规范度 · 商务情商与潜台词 · IT方案严谨度 · 地道母语润色</div>
              </div>
            </div>
          `;

          try {
            const reviewMd = await QwenAIEngine.reviewRoleplay({
              userText: userText,
              standardJp: turn.jp,
              standardZh: turn.zh || '',
              speaker: turn.speaker,
              promptZh: turn.zh || '',
              scene: scene
            });

            rpAiEvalContainer.innerHTML = `
              <div class="ai-eval-card">
                <div class="ai-eval-header">
                  <div class="ai-eval-title-wrap">
                    <span class="ai-eval-icon">🎖️</span>
                    <div>
                      <h4 class="ai-eval-title">资深对日IT总监 · AI 深度评审报告</h4>
                      <div class="ai-eval-subtitle">模型：${QwenAIEngine.getConfig().model || 'qwen-plus'} · 针对「${turn.speaker}」发言的综合诊断</div>
                    </div>
                  </div>
                  <button type="button" class="btn-close-ai-eval" title="收起点评">✕</button>
                </div>
                <div class="ai-eval-content">
                  ${renderMarkdown(reviewMd)}
                </div>
              </div>
            `;

            const closeBtn = rpAiEvalContainer.querySelector(".btn-close-ai-eval");
            if (closeBtn) {
              closeBtn.addEventListener("click", () => {
                rpAiEvalContainer.style.display = "none";
              });
            }
          } catch (err) {
            rpAiEvalContainer.innerHTML = `
              <div class="ai-eval-error">
                <span style="font-size: 1.25rem;">⚠️</span>
                <div style="flex:1;">
                  <strong>AI 点评获取失败：</strong> ${escapeHtml(err.message || '网络连接超时')}
                  <div style="margin-top: 0.35rem; font-size: 0.78rem; color: #64748b;">若使用本地代理，请确认终端已运行 <code>python3 server.py</code> 并开启默认 <code>/api/chat</code></div>
                </div>
                <button type="button" class="btn-retry-eval">重试</button>
              </div>
            `;
            const retryEvalBtn = rpAiEvalContainer.querySelector(".btn-retry-eval");
            if (retryEvalBtn) {
              retryEvalBtn.addEventListener("click", () => {
                rpAiEvalBtn.click();
              });
            }
          }
        });
      }
    }

    return card;
  }

  // 重点生疏本与待背熟过滤器
  function applyFilter(scope) {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    const isTb = (scope === 'tb');
    const filter = isTb ? tbFilter : pFilter;
    const container = isTb ? textbookDialogueFlow : passageDialogueFlow;
    const cards = container.querySelectorAll(".dialogue-turn");

    let visibleCount = 0;
    cards.forEach(card => {
      const turnId = card.getAttribute("data-turn-id");
      let visible = true;
      if (filter === 'weakness') {
        visible = WeaknessTracker.isWeakness(turnId);
      } else if (filter === 'unmastered') {
        visible = !MasteryTracker.isMastered(turnId);
      }
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    let emptyNotice = container.querySelector(".filter-empty-alert");
    if (visibleCount === 0) {
      if (!emptyNotice) {
        emptyNotice = document.createElement("div");
        emptyNotice.className = "filter-empty-alert";
        emptyNotice.style.cssText = `
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 1.75rem 1rem;
          text-align: center;
          color: #64748b;
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 1rem 0;
        `;
        container.appendChild(emptyNotice);
      }
      if (filter === 'weakness') {
        emptyNotice.innerHTML = `🎉 <b>太棒了！当前对话暂无生疏句！</b><br><span style="font-size:0.78rem;color:#94a3b8;">在盲背或模拟开会中点击【还要再练】，句子将自动收录至此集中突击。</span>`;
      } else if (filter === 'unmastered') {
        emptyNotice.innerHTML = `🏆 <b>太优秀了！当前对话所有句子已全部背熟！</b><br><span style="font-size:0.78rem;color:#94a3b8;">点击上方【全部】随时回听复习。</span>`;
      }
      emptyNotice.style.display = "block";
    } else if (emptyNotice) {
      emptyNotice.style.display = "none";
    }
  }

  // 更新重点生疏角标数字
  function updateWeaknessBadges() {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;
    const tbWeaknessBadge = document.getElementById("tb-weakness-badge");
    const pWeaknessBadge = document.getElementById("p-weakness-badge");
    if (tbWeaknessBadge) {
      tbWeaknessBadge.textContent = WeaknessTracker.countInScope(scene, 'tb');
    }
    if (pWeaknessBadge) {
      pWeaknessBadge.textContent = WeaknessTracker.countInScope(scene, 'p', currentPassageIndex);
    }
  }

  // 停止交互式模拟会议
  function stopRoleplayMeeting() {
    roleplayMeetingActive = false;
    clearTimeout(roleplayMeetingTimer);
    roleplayMeetingTimer = null;
    advanceMeetingTurn = null;
    AudioController.stop();

    const tbStartBtn = document.getElementById("tb-start-roleplay-btn");
    const pStartBtn = document.getElementById("p-start-roleplay-btn");
    if (tbStartBtn) {
      tbStartBtn.classList.remove("playing");
      tbStartBtn.querySelector("span").textContent = "▶ 开始模拟会议";
    }
    if (pStartBtn) {
      pStartBtn.classList.remove("playing");
      pStartBtn.querySelector("span").textContent = "▶ 开始模拟会议";
    }
    document.querySelectorAll(".dialogue-turn.rp-current-step").forEach(el => {
      el.classList.remove("rp-current-step");
    });
  }

  // 启动全真交互式模拟会议流程 (角色交替拟真对答)
  function startRoleplayMeeting(scope) {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    const isTb = (scope === 'tb');
    const startBtn = isTb ? document.getElementById("tb-start-roleplay-btn") : document.getElementById("p-start-roleplay-btn");
    const container = isTb ? textbookDialogueFlow : passageDialogueFlow;
    const turns = isTb ? scene.textbookText.dialogue : (scene.practiceTexts[currentPassageIndex] ? scene.practiceTexts[currentPassageIndex].dialogue : []);
    const myRole = isTb ? tbMyRole : pMyRole;

    if (roleplayMeetingActive) {
      stopRoleplayMeeting();
      showToast("已结束模拟会议");
      return;
    }

    if (!turns.length) return;

    AudioController.stop();
    roleplayMeetingActive = true;
    if (startBtn) {
      startBtn.classList.add("playing");
      startBtn.querySelector("span").textContent = "⏹ 结束模拟会议";
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll(".dialogue-turn");

    function runCurrentStep() {
      if (!roleplayMeetingActive) return;
      if (currentIndex >= turns.length) {
        stopRoleplayMeeting();
        showToast("🎉 模拟会议圆满结束！所有对答环节已完成！");
        return;
      }

      cards.forEach(c => c.classList.remove("rp-current-step"));
      const currentCard = cards[currentIndex];
      const turn = turns[currentIndex];
      const spkMeta = getSpeakerMeta(turn.speaker);
      const isMyTurn = (turn.speaker === myRole);

      if (currentCard) {
        currentCard.classList.add("rp-current-step");
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (isMyTurn) {
        // 轮到用户发言：暂停自动连播，自动聚焦输入框，等待用户键入作答与核对
        showToast(`👉 轮到您发言（${myRole}），请在输入框键入日文并核对`);
        const myInput = currentCard ? currentCard.querySelector(".user-rp-input") : null;
        if (myInput) {
          setTimeout(() => myInput.focus(), 350);
        }
        advanceMeetingTurn = () => {
          advanceMeetingTurn = null;
          currentIndex++;
          roleplayMeetingTimer = setTimeout(runCurrentStep, 500);
        };
      } else {
        // 对方发言：自动原声播报
        const audioUrl = isTb
          ? `audio/scene-${scene.sceneNumber}/tb-${currentIndex}.mp3`
          : `audio/scene-${scene.sceneNumber}/p${scene.practiceTexts[currentPassageIndex].pNum}/p${scene.practiceTexts[currentPassageIndex].pNum}-${currentIndex}.mp3`;

        const speakBtn = currentCard ? currentCard.querySelector(".btn-speak-clause") : null;
        AudioController.speak(turn.jp, speakBtn, audioUrl, () => {
          if (!roleplayMeetingActive) return;
          currentIndex++;
          roleplayMeetingTimer = setTimeout(runCurrentStep, 550);
        }, spkMeta.voice, 1);
      }
    }

    runCurrentStep();
  }

  // 更新背熟进度统计
  function updateMasteryStats() {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    // 教材对话统计
    if (scene.textbookText && scene.textbookText.dialogue) {
      const tbTotal = scene.textbookText.dialogue.length;
      let tbMastered = 0;
      for (let i = 0; i < tbTotal; i++) {
        if (MasteryTracker.isMastered(`s${scene.sceneNumber}-tb-${i}`)) tbMastered++;
      }
      if (tbMasteredStat) tbMasteredStat.textContent = tbMastered;
      if (tbTotalStat) tbTotalStat.textContent = tbTotal;
    }

    // 短文对话统计
    const p = scene.practiceTexts && scene.practiceTexts[currentPassageIndex];
    if (p && p.dialogue) {
      const pTotal = p.dialogue.length;
      let pMastered = 0;
      for (let i = 0; i < pTotal; i++) {
        if (MasteryTracker.isMastered(`s${scene.sceneNumber}-p${p.pNum}-${i}`)) pMastered++;
      }
      if (pMasteredStat) pMasteredStat.textContent = pMastered;
      if (pTotalStat) pTotalStat.textContent = pTotal;
    }

    updateWeaknessBadges();
  }

  // 初始化背诵与演练工具栏事件
  function setupDrillToolbars() {
    // 教材工具栏模式切换
    const tbBtns = document.querySelectorAll('#tb-drill-toolbar .drill-mode-btn');
    const tbRoleplayBanner = document.getElementById("tb-roleplay-banner");

    tbBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stopRoleplayMeeting();
        tbBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tbMode = btn.getAttribute("data-mode");

        if (tbClozeToggleAllBtn) {
          tbClozeToggleAllBtn.style.display = (tbMode === "cloze") ? "inline-flex" : "none";
        }
        if (tbRoleplayBanner) {
          tbRoleplayBanner.style.display = (tbMode === "roleplay") ? "flex" : "none";
        }

        renderTextbook(data.scenes[currentSceneIndex]);
      });
    });

    if (tbClozeToggleAllBtn) {
      tbClozeToggleAllBtn.addEventListener("click", () => {
        tbClozeAllRevealed = !tbClozeAllRevealed;
        tbClozeToggleAllBtn.querySelector("span").textContent = tbClozeAllRevealed ? "🔒 全部遮挡" : "👁️ 揭晓全部";
        textbookDialogueFlow.querySelectorAll(".cloze-mask").forEach(mask => {
          mask.classList.toggle("revealed", tbClozeAllRevealed);
          const p = mask.querySelector(".mask-placeholder");
          const a = mask.querySelector(".mask-answer");
          if (p && a) {
            p.style.display = tbClozeAllRevealed ? "none" : "inline";
            a.style.display = tbClozeAllRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 教材过滤器 (全部 / 重点生疏 / 待背熟)
    const tbFilterChips = document.querySelectorAll('#tb-drill-toolbar .filter-chip');
    tbFilterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        tbFilterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        tbFilter = chip.getAttribute("data-filter");
        applyFilter('tb');
      });
    });

    // 教材模拟会议启动按钮
    const tbStartRoleplayBtn = document.getElementById("tb-start-roleplay-btn");
    if (tbStartRoleplayBtn) {
      tbStartRoleplayBtn.addEventListener("click", () => {
        startRoleplayMeeting('tb');
      });
    }

    // 短文工具栏模式切换
    const pBtns = document.querySelectorAll('#p-drill-toolbar .drill-mode-btn');
    const pRoleplayBanner = document.getElementById("p-roleplay-banner");

    pBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stopRoleplayMeeting();
        pBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        pMode = btn.getAttribute("data-mode");

        if (pClozeToggleAllBtn) {
          pClozeToggleAllBtn.style.display = (pMode === "cloze") ? "inline-flex" : "none";
        }
        if (pRoleplayBanner) {
          pRoleplayBanner.style.display = (pMode === "roleplay") ? "flex" : "none";
        }

        loadActivePassage(data.scenes[currentSceneIndex]);
      });
    });

    if (pClozeToggleAllBtn) {
      pClozeToggleAllBtn.addEventListener("click", () => {
        pClozeAllRevealed = !pClozeAllRevealed;
        pClozeToggleAllBtn.querySelector("span").textContent = pClozeAllRevealed ? "🔒 全部遮挡" : "👁️ 揭晓全部";
        passageDialogueFlow.querySelectorAll(".cloze-mask").forEach(mask => {
          mask.classList.toggle("revealed", pClozeAllRevealed);
          const p = mask.querySelector(".mask-placeholder");
          const a = mask.querySelector(".mask-answer");
          if (p && a) {
            p.style.display = pClozeAllRevealed ? "none" : "inline";
            a.style.display = pClozeAllRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 短文过滤器 (全部 / 重点生疏 / 待背熟)
    const pFilterChips = document.querySelectorAll('#p-drill-toolbar .filter-chip');
    pFilterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        pFilterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        pFilter = chip.getAttribute("data-filter");
        applyFilter('p');
      });
    });

    // 短文模拟会议启动按钮
    const pStartRoleplayBtn = document.getElementById("p-start-roleplay-btn");
    if (pStartRoleplayBtn) {
      pStartRoleplayBtn.addEventListener("click", () => {
        startRoleplayMeeting('p');
      });
    }
  }

  // 1. 渲染场景切换药丸导航 (Scene Pills)
  function renderScenePills() {
    scenePillsContainer.innerHTML = "";
    data.scenes.forEach((scene, index) => {
      const btn = document.createElement("button");
      btn.className = `scene-pill-btn ${index === currentSceneIndex ? 'active' : ''}`;
      btn.innerHTML = `
        <span>场景 ${scene.sceneNumber}</span>
        <span class="scene-pill-badge">${scene.badge}</span>
      `;
      btn.addEventListener("click", () => {
        if (currentSceneIndex !== index) {
          AudioController.stop();
          currentSceneIndex = index;
          currentPassageIndex = 0; // 切换场景时重置短文选择为第1篇
          renderCurrentScene();
        }
      });
      scenePillsContainer.appendChild(btn);
    });
  }

  // 2. 渲染顶部 Hero 简介
  function renderHero(scene) {
    heroBadgeTag.innerHTML = `<span>💼 ${scene.domain}</span>`;
    heroTitleText.textContent = scene.title;
    heroDescText.textContent = scene.background;
  }

  // 获取发言人对应头像、CSS 类与专属声线
  function getSpeakerMeta(speakerName) {
    if (speakerName.includes("李")) {
      return { avatar: "👨‍💻", className: "avatar-li", roleLabel: "SE / PM", voice: "ja-JP-NanamiNeural" };
    } else if (speakerName.includes("田中")) {
      return { avatar: "👔", className: "avatar-tanaka", roleLabel: "客户方部长", voice: "ja-JP-KeitaNeural" };
    } else if (speakerName.includes("山田")) {
      return { avatar: "📊", className: "avatar-yamada", roleLabel: "业务主管", voice: "ja-JP-KeitaNeural" };
    } else if (speakerName.includes("佐藤")) {
      return { avatar: "👩‍💼", className: "avatar-li", roleLabel: "业务负责", voice: "ja-JP-NanamiNeural" };
    } else if (speakerName.includes("小林")) {
      return { avatar: "👨‍💼", className: "avatar-tanaka", roleLabel: "技术经理", voice: "ja-JP-KeitaNeural" };
    }
    return { avatar: "🗣️", className: "avatar-li", roleLabel: "会话成员", voice: "ja-JP-NanamiNeural" };
  }

  // 3. 渲染教材核心课文
  function renderTextbook(scene) {
    const tb = scene.textbookText;
    textbookDialogueFlow.innerHTML = "";

    // 动态渲染教材模拟开会角色选项
    const uniqueSpeakers = [...new Set(tb.dialogue.map(d => d.speaker))];
    if (!uniqueSpeakers.includes(tbMyRole)) {
      tbMyRole = uniqueSpeakers[0] || "李";
    }
    const tbRolePillsContainer = document.getElementById("tb-role-pills");
    if (tbRolePillsContainer) {
      tbRolePillsContainer.innerHTML = uniqueSpeakers.map(spk => {
        const meta = getSpeakerMeta(spk);
        const isActive = (spk === tbMyRole);
        return `<button class="role-pill ${isActive ? 'active' : ''}" data-role="${spk}">${meta.avatar} ${spk} (${meta.roleLabel})</button>`;
      }).join("");

      tbRolePillsContainer.querySelectorAll(".role-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          tbMyRole = pill.getAttribute("data-role");
          tbRolePillsContainer.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          renderTextbook(scene);
        });
      });
    }

    const sequenceItems = [];
    tb.dialogue.forEach((turn, idx) => {
      const turnId = `s${scene.sceneNumber}-tb-${idx}`;
      const audioUrl = `audio/scene-${scene.sceneNumber}/tb-${idx}.mp3`;
      const card = createDialogueTurnElement({
        turn,
        turnId,
        scope: 'tb',
        scene,
        mode: tbMode,
        audioUrl
      });
      textbookDialogueFlow.appendChild(card);
      sequenceItems.push({
        text: `${turn.speaker}。${turn.jp}`,
        audioUrl,
        cardElement: card,
        btnElement: card.querySelector(".btn-speak-clause")
      });
    });

    // 绑定全文朗读按钮（高拟真多角色交替演播）
    playFullTextbookBtn.onclick = () => {
      AudioController.playSequence(sequenceItems, playFullTextbookBtn);
    };

    // 渲染词性切片（点击切片也可直达知识抽屉）
    tokenChipsContainer.innerHTML = "";
    if (tb.tokens && tb.tokens.length) {
      tb.tokens.forEach(tok => {
        const chip = document.createElement("div");
        chip.className = `token-chip ${tok.isKey ? 'key-token' : ''}`;
        chip.style.cursor = "pointer";
        chip.title = "点击查看该要件详细实战解析";
        chip.innerHTML = `
          <div class="token-surface">${tok.surface} <span class="token-pos">${tok.pos}</span></div>
          <div class="token-meaning">${tok.reading} · ${tok.meaning}</div>
        `;
        chip.addEventListener("click", () => {
          openKnowledgeDrawer(tok.surface, scene);
        });
        tokenChipsContainer.appendChild(chip);
      });
    }

    applyFilter('tb');
    updateMasteryStats();
  }

  // 4. 渲染配套练习·5篇短文精读
  function renderPractice(scene) {
    const passages = scene.practiceTexts;
    if (!passages || !passages.length) {
      moduleSections.practice.style.display = "none";
      return;
    }

    // 渲染短文选择按钮 (短文 1 ～ 短文 5)
    passageTabsContainer.innerHTML = "";
    passages.forEach((p, idx) => {
      const btn = document.createElement("button");
      btn.className = `passage-tab-btn ${idx === currentPassageIndex ? 'active' : ''}`;
      btn.textContent = `短文 ${p.pNum}`;
      btn.addEventListener("click", () => {
        AudioController.stop();
        currentPassageIndex = idx;
        loadActivePassage(scene);
      });
      passageTabsContainer.appendChild(btn);
    });

    loadActivePassage(scene);
  }

  function loadActivePassage(scene) {
    const p = scene.practiceTexts[currentPassageIndex];
    if (!p) return;

    // 更新按钮激活状态
    passageTabsContainer.querySelectorAll(".passage-tab-btn").forEach((btn, idx) => {
      if (idx === currentPassageIndex) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    currentPassageTitle.textContent = p.title || `短文 ${p.pNum || ''}`;
    currentPassageFocus.innerHTML = `
      <div>🎯 <b>训练目标：</b>${p.theme || p.objective || ''}</div>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.2rem;">📖 出处：${p.sourceBook || '《对日软件需求定义分析设计场景对话训练教材配套练习》'} (${p.sourcePages || '配套练习'})</div>
    `;

    // 动态渲染短文模拟开会角色选项
    const uniqueSpeakers = [...new Set(p.dialogue.map(d => d.speaker))];
    if (!uniqueSpeakers.includes(pMyRole)) {
      pMyRole = uniqueSpeakers[0] || "李";
    }
    const pRolePillsContainer = document.getElementById("p-role-pills");
    if (pRolePillsContainer) {
      pRolePillsContainer.innerHTML = uniqueSpeakers.map(spk => {
        const meta = getSpeakerMeta(spk);
        const isActive = (spk === pMyRole);
        return `<button class="role-pill ${isActive ? 'active' : ''}" data-role="${spk}">${meta.avatar} ${spk} (${meta.roleLabel})</button>`;
      }).join("");

      pRolePillsContainer.querySelectorAll(".role-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          pMyRole = pill.getAttribute("data-role");
          pRolePillsContainer.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          loadActivePassage(scene);
        });
      });
    }

    passageDialogueFlow.innerHTML = "";
    const sequenceItems = [];
    p.dialogue.forEach((d, idx) => {
      const turnId = `s${scene.sceneNumber}-p${p.pNum}-${idx}`;
      const audioUrl = `audio/scene-${scene.sceneNumber}/p${p.pNum}/p${p.pNum}-${idx}.mp3`;
      const card = createDialogueTurnElement({
        turn: d,
        turnId,
        scope: 'p',
        scene,
        mode: pMode,
        audioUrl
      });
      passageDialogueFlow.appendChild(card);
      sequenceItems.push({
        text: `${d.speaker}。${d.jp}`,
        audioUrl,
        cardElement: card,
        btnElement: card.querySelector(".btn-speak-clause")
      });
    });

    // 绑定短文朗读按钮（高拟真多角色交替演播）
    playPassageBtn.onclick = () => {
      AudioController.playSequence(sequenceItems, playPassageBtn);
    };

    applyFilter('p');
    updateMasteryStats();
  }

  // 5. 渲染深度语法图鉴
  function renderGrammar(scene) {
    grammarCardsContainer.innerHTML = "";
    scene.grammarPoints.forEach(gp => {
      const card = document.createElement("div");
      card.className = "grammar-card";
      card.id = gp.id;

      let rulesHtml = "";
      if (gp.rules && gp.rules.length) {
        gp.rules.forEach(r => {
          if (typeof r === 'string') {
            const parts = r.split(/[:：]/);
            const rType = parts.length > 1 ? parts[0].trim() : '接续要点';
            const rRule = parts.length > 1 ? parts.slice(1).join('：').trim() : r;
            rulesHtml += `
              <div class="rule-item">
                <div class="rule-type">${rType}</div>
                <div class="rule-summary">${rRule}</div>
              </div>
            `;
          } else if (r && typeof r === 'object') {
            let egItems = (r.examples && r.examples.length) ? r.examples.map(e => `<li><strong>${e.jpWithRuby || e.jp}</strong> — ${e.desc || ''}</li>`).join("") : "";
            rulesHtml += `
              <div class="rule-item">
                <div class="rule-type">${r.type || '接续要点'}</div>
                <div class="rule-summary">${r.rule || ''}</div>
                ${egItems ? `<ul class="rule-examples">${egItems}</ul>` : ''}
              </div>
            `;
          }
        });
      }

      let egHtml = "";
      if (gp.businessExamples && gp.businessExamples.length) {
        let items = gp.businessExamples.map(eg => `
          <div class="eg-item">
            <div style="flex:1;">
              <div class="eg-content-jp">${eg.jpWithRuby || eg.jp}</div>
              <div class="eg-content-zh">${eg.zh}</div>
            </div>
            <button class="btn-speak-clause" title="朗读例句" data-text="${eg.audio || eg.jp}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
        `).join("");
        egHtml = `
          <div class="examples-subcard">
            <div class="subcard-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              对日商务实战地道例句
            </div>
            <div class="eg-list">${items}</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="grammar-header">
          <div>
            <div class="grammar-meta">
              <span class="grammar-badge">${gp.badge}</span>
              <span class="grammar-level">${gp.level}</span>
            </div>
            <h3 class="grammar-title">${gp.title}</h3>
          </div>
        </div>

        <div class="formula-box">
          <div class="formula-label">接续与语法公式</div>
          <div class="formula-text">${gp.formula}</div>
        </div>

        <div class="concept-box">${gp.concept}</div>

        ${rulesHtml ? `<h4 style="font-size:1rem; font-weight:700; margin-bottom:0.85rem; color:var(--text-main);">📌 详细接续法则</h4><div class="rules-grid">${rulesHtml}</div>` : ''}

        ${egHtml}
      `;

      card.querySelectorAll(".btn-speak-clause").forEach(btn => {
        btn.addEventListener("click", () => {
          AudioController.speak(btn.getAttribute("data-text"), btn);
        });
      });

      grammarCardsContainer.appendChild(card);
    });
  }

  // 6. 渲染 3D 翻转智能词汇闪卡
  function renderVocab(scene) {
    vocabCardsContainer.innerHTML = "";
    scene.vocabulary.forEach((v, vIndex) => {
      const card = document.createElement("div");
      card.className = "flashcard-3d";
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <span class="vocab-level-tag">${v.level}</span>
              <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">${v.pos}</span>
            </div>
            <div>
              <div class="vocab-kanji">${v.kanji}</div>
              <div class="vocab-reading">${v.reading}</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <button class="btn-speak-clause" title="朗读" data-text="${v.audio || v.kanji}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <div class="card-hint-flip">点击翻转卡片 🔄</div>
            </div>
          </div>
          <div class="flashcard-back">
            <div>
              <div style="font-size: 1.1rem; font-weight:700; color: var(--primary); margin-bottom: 0.35rem;">${v.kanji}</div>
              <div class="vocab-zh">${v.zh}</div>
              <div class="vocab-phrase" style="text-align:left; margin-top:0.75rem;">
                <strong>搭配：</strong>${v.phraseWithRuby || v.phrase}
              </div>
            </div>
            <div>
              <div class="card-hint-flip" style="margin-bottom: 0.4rem;">标记掌握程度：</div>
              <div class="card-mastery-btns">
                <button class="btn-mastery btn-known">已掌握 ✅</button>
                <button class="btn-mastery btn-review">需复习 ⏳</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // 3D 翻转交互
      card.addEventListener("click", (e) => {
        // 如果点击的是朗读按钮或掌握度按钮，不触发翻转
        if (e.target.closest(".btn-speak-clause") || e.target.closest(".btn-mastery")) return;
        card.classList.toggle("flipped");
      });

      // 朗读
      const speakBtn = card.querySelector(".btn-speak-clause");
      const vocabAudioUrl = `audio/scene-${scene.sceneNumber}/vocab-${vIndex}.mp3`;
      speakBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        AudioController.speak(speakBtn.getAttribute("data-text"), speakBtn, vocabAudioUrl);
      });

      // 掌握度标记
      const knownBtn = card.querySelector(".btn-known");
      const reviewBtn = card.querySelector(".btn-review");
      knownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.style.opacity = "0.6";
        knownBtn.textContent = "已标为掌握 ✓";
      });
      reviewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.style.opacity = "1";
        card.style.border = "2px solid #ef4444";
        reviewBtn.textContent = "已归入复习本 📌";
      });

      vocabCardsContainer.appendChild(card);
    });
  }

  // =========================================================================
  // 8. 跨课全场景实战刷题对决引擎 (Battle Quiz Engine)
  // =========================================================================
  const BattleQuizEngine = {
    storageKeyWeakness: "NHG_BATTLE_QUIZ_WEAKNESS_V1",
    storageKeyHistory: "NHG_BATTLE_QUIZ_HISTORY_V1",

    currentMode: "quick10", // 'quick10' | 'exam20' | 'weakness' | 'all50'
    currentCategory: "all",  // 'all' | 'objection' | 'pitfall' | 'elicitation' | 'scope' | 'keigo'

    questions: [],
    currentIndex: 0,
    userAnswers: {}, // { [index]: { selectedIndex, isCorrect, answeredAt } }
    sessionScore: 0,
    sessionStreak: 0,
    maxSessionStreak: 0,
    examTimer: null,
    examRemainingSeconds: 900, // 15 min

    // Weakness & History Storage
    getWeaknessIds() {
      try {
        const raw = localStorage.getItem(this.storageKeyWeakness);
        return raw ? new Set(JSON.parse(raw)) : new Set();
      } catch (e) {
        return new Set();
      }
    },
    hasWeakness(id) {
      return this.getWeaknessIds().has(id);
    },
    addWeakness(id) {
      const set = this.getWeaknessIds();
      set.add(id);
      try {
        localStorage.setItem(this.storageKeyWeakness, JSON.stringify([...set]));
      } catch (e) {}
      this.updateTopStats();
    },
    removeWeakness(id) {
      const set = this.getWeaknessIds();
      if (set.has(id)) {
        set.delete(id);
        try {
          localStorage.setItem(this.storageKeyWeakness, JSON.stringify([...set]));
        } catch (e) {}
      }
      this.updateTopStats();
    },
    toggleBookmark(id) {
      if (this.hasWeakness(id)) {
        this.removeWeakness(id);
        showToast("⭐ 已从重点错题本中移除");
        return false;
      } else {
        this.addWeakness(id);
        showToast("⭐ 已成功收藏至重点错题本！");
        return true;
      }
    },
    getHistory() {
      try {
        const raw = localStorage.getItem(this.storageKeyHistory);
        return raw ? JSON.parse(raw) : { totalAnswered: 0, totalCorrect: 0, dimensions: {} };
      } catch (e) {
        return { totalAnswered: 0, totalCorrect: 0, dimensions: {} };
      }
    },
    recordAnswer(qId, catId, isCorrect) {
      const history = this.getHistory();
      history.totalAnswered = (history.totalAnswered || 0) + 1;
      if (isCorrect) {
        history.totalCorrect = (history.totalCorrect || 0) + 1;
      }
      if (!history.dimensions) history.dimensions = {};
      if (!history.dimensions[catId]) history.dimensions[catId] = { answered: 0, correct: 0 };
      history.dimensions[catId].answered += 1;
      if (isCorrect) history.dimensions[catId].correct += 1;

      try {
        localStorage.setItem(this.storageKeyHistory, JSON.stringify(history));
      } catch (e) {}
      this.updateTopStats();
    },

    updateTopStats() {
      const statTotal = document.getElementById("stat-total-answered");
      const statAcc = document.getElementById("stat-accuracy");
      const statWeak = document.getElementById("stat-weak-count");
      const weakBadge = document.getElementById("weakness-badge-pill");

      const hist = this.getHistory();
      const weakIds = this.getWeaknessIds();

      if (statTotal) statTotal.textContent = hist.totalAnswered || 0;
      if (statAcc) {
        const pct = hist.totalAnswered ? Math.round((hist.totalCorrect / hist.totalAnswered) * 100) : 0;
        statAcc.textContent = `${pct}%`;
      }
      if (statWeak) statWeak.textContent = weakIds.size;
      if (weakBadge) weakBadge.textContent = weakIds.size;
    },

    // Shuffle helper (Fisher-Yates)
    shuffle(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },

    // Start a new session
    startSession(mode = this.currentMode, cat = this.currentCategory) {
      this.currentMode = mode;
      this.currentCategory = cat;

      if (this.examTimer) {
        clearInterval(this.examTimer);
        this.examTimer = null;
      }

      // 1. Get raw pool
      const allQuestions = window.BATTLE_QUIZ_DATA?.questions || [];
      let pool = [...allQuestions];

      // 2. Filter by category if not 'all'
      if (cat !== "all") {
        pool = pool.filter(q => q.category === cat);
      }

      // 3. Filter/Slice by mode
      if (mode === "weakness") {
        const weakIds = this.getWeaknessIds();
        pool = pool.filter(q => weakIds.has(q.id));
      } else if (mode === "quick10") {
        pool = this.shuffle(pool).slice(0, Math.min(10, pool.length));
      } else if (mode === "exam20") {
        pool = this.shuffle(pool).slice(0, Math.min(20, pool.length));
      } else if (mode === "all50") {
        pool = this.shuffle(pool);
      }

      this.questions = pool;
      this.currentIndex = 0;
      this.userAnswers = {};
      this.sessionScore = 0;
      this.sessionStreak = 0;
      this.maxSessionStreak = 0;

      // Mode tag
      const modeTag = document.getElementById("battle-mode-indicator-tag");
      if (modeTag) {
        const modeLabels = {
          "quick10": "⚡ 10题日常速刷",
          "exam20": "⏱️ 20题限时全真模考",
          "weakness": "📕 错题消消乐",
          "all50": "🔥 50题全真死斗"
        };
        modeTag.textContent = modeLabels[mode] || "🎯 实战对决";
      }

      // Timer for exam20
      const timerPill = document.getElementById("battle-timer-pill");
      if (mode === "exam20") {
        if (timerPill) timerPill.style.display = "inline-flex";
        this.examRemainingSeconds = 900; // 15 mins
        this.updateTimerDisplay();
        this.examTimer = setInterval(() => {
          this.examRemainingSeconds--;
          this.updateTimerDisplay();
          if (this.examRemainingSeconds <= 0) {
            clearInterval(this.examTimer);
            this.examTimer = null;
            showToast("⏱️ 模考时间到！自动提交并生成战力诊断报告！");
            this.finishSession();
          }
        }, 1000);
      } else {
        if (timerPill) timerPill.style.display = "none";
      }

      // Toggle UI cards
      const arenaCard = document.getElementById("battle-arena");
      const scorecardCard = document.getElementById("battle-scorecard");
      if (arenaCard) arenaCard.style.display = "block";
      if (scorecardCard) scorecardCard.style.display = "none";

      this.updateModeAndCatButtons();
      this.updateTopStats();
      this.renderQuestion();
    },

    updateTimerDisplay() {
      const timerVal = document.getElementById("battle-timer-val");
      if (!timerVal) return;
      const m = Math.floor(this.examRemainingSeconds / 60);
      const s = this.examRemainingSeconds % 60;
      timerVal.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    updateModeAndCatButtons() {
      document.querySelectorAll(".battle-mode-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-mode") === this.currentMode);
      });
      document.querySelectorAll(".cat-filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-cat") === this.currentCategory);
      });
    },

    renderQuestion() {
      const container = document.getElementById("arena-question-container");
      if (!container) return;

      if (!this.questions.length) {
        let emptyHtml = "";
        if (this.currentMode === "weakness") {
          emptyHtml = `
            <div style="text-align: center; padding: 4rem 1.5rem;">
              <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
              <h4 style="font-size: 1.3rem; font-weight: 800; color: #065f46; margin-bottom: 0.5rem;">恭喜！错题本空空如也！</h4>
              <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 460px; margin: 0 auto 1.5rem;">
                您目前在所选维度下没有待消除的错题。建议开启「10题日常速刷」或「20题全真模考」检验战力！
              </p>
              <button class="battle-nav-btn primary" onclick="BattleQuizEngine.startSession('quick10', 'all')">
                ⚡ 开启10题日常速刷
              </button>
            </div>
          `;
        } else {
          emptyHtml = `
            <div style="text-align: center; padding: 4rem 1.5rem;">
              <div style="font-size: 3.5rem; margin-bottom: 1rem;">📭</div>
              <h4 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">未找到匹配题目</h4>
              <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                当前分类下暂无题目，请切换其他维度或返回全部。
              </p>
              <button class="battle-nav-btn primary" onclick="BattleQuizEngine.startSession('quick10', 'all')">
                查看全部维度题目
              </button>
            </div>
          `;
        }
        container.innerHTML = emptyHtml;
        this.updateNavButtons();
        return;
      }

      const q = this.questions[this.currentIndex];
      const answeredState = this.userAnswers[this.currentIndex];
      const isAnswered = !!answeredState;

      // Progress bar & indicators
      const progressText = document.getElementById("battle-progress-text");
      const progressFill = document.getElementById("battle-progress-fill");
      const streakVal = document.getElementById("battle-streak-val");
      const scoreVal = document.getElementById("battle-score-val");

      if (progressText) progressText.textContent = `第 ${this.currentIndex + 1} / ${this.questions.length} 题`;
      if (progressFill) progressFill.style.width = `${((this.currentIndex + 1) / this.questions.length) * 100}%`;
      if (streakVal) streakVal.textContent = this.sessionStreak;
      if (scoreVal) scoreVal.textContent = this.sessionScore;

      // Bookmark status
      this.updateBookmarkButton(q.id);

      const correctIdx = typeof q.correct === 'number' ? q.correct : ({"A":0,"B":1,"C":2,"D":3}[q.correctAnswer] !== undefined ? {"A":0,"B":1,"C":2,"D":3}[q.correctAnswer] : 0);
      const correctLabel = (q.options && q.options[correctIdx]) ? q.options[correctIdx].label : 'B';

      // Render question content
      let optionsHtml = q.options.map((opt, optIndex) => {
        let extraClasses = "";
        let statusTag = "";

        if (isAnswered) {
          if (optIndex === correctIdx) {
            extraClasses = "opt-correct";
            statusTag = `<span class="opt-status-tag">✅ 最佳对策</span>`;
          } else if (optIndex === answeredState.selectedIndex) {
            extraClasses = "opt-wrong";
            statusTag = `<span class="opt-status-tag">❌ 触雷选项</span>`;
          }
        }

        return `
          <button class="battle-opt-btn ${extraClasses}" data-optindex="${optIndex}" ${isAnswered ? "disabled" : ""}>
            <div class="opt-letter-badge">${opt.label}</div>
            <div class="opt-text-wrap">
              <div class="opt-sentence-jp">${opt.textWithRuby || opt.text}</div>
            </div>
            ${statusTag}
          </button>
        `;
      }).join("");

      let explanationHtml = "";
      if (isAnswered) {
        const isUserCorrect = answeredState.isCorrect;
        const verdictBanner = isUserCorrect ? `
          <div class="exp-verdict-banner verdict-correct">
            <span class="verdict-icon">🎉</span>
            <div>
              <div class="verdict-title">策略满分！完全契合日企商务期待与商谈常识</div>
              <div class="verdict-desc">不仅展现了高阶商务得体度，更精准切中客户心理防线。</div>
            </div>
          </div>
        ` : `
          <div class="exp-verdict-banner verdict-wrong">
            <span class="verdict-icon">⚠️</span>
            <div>
              <div class="verdict-title">失策避雷！该应答容易引发客户反感或风控风险</div>
              <div class="verdict-desc">已自动为您收录至「错题本」，请认真品味下方最佳对策与心理拆解。</div>
            </div>
          </div>
        `;

        const trapsHtml = q.options.map(o => `
          <div class="exp-trap-item ${o.label === correctLabel ? 'correct-opt-analysis' : ''}">
            <strong>【选项 ${o.label}】</strong>${o.analysis || ''}
          </div>
        `).join("");

        const exp = q.explanation || {
          strategy: q.analysis || '深入把握客户心理诉求，以专业顾问姿态提出可控对策。',
          clientSubtext: '客户关注业务平稳性与风险可控性，切忌推卸责任或空洞许诺。',
          keyPhrases: [],
          referenceDialogue: q.sceneTag || ''
        };

        const phrasesHtml = (exp.keyPhrases && exp.keyPhrases.length) ? `
          <div class="exp-section-item">
            <div class="exp-section-title">💡 关键高频表达与句式</div>
            <div class="exp-phrases-pills">
              ${exp.keyPhrases.map(p => `
                <div class="exp-phrase-chip">
                  <strong>${p.jpWithRuby || p.jp}</strong>
                  <span>(${p.zh || ''})</span>
                </div>
              `).join("")}
            </div>
          </div>
        ` : "";

        const refHtml = exp.referenceDialogue ? `
          <div class="exp-section-item">
            <div class="exp-section-title">📖 教材课文溯源联动</div>
            <div class="exp-ref-badge">
              <span>🔗 ${exp.referenceDialogue}</span>
            </div>
          </div>
        ` : "";

        explanationHtml = `
          <div class="battle-explanation-card">
            ${verdictBanner}
            <div class="exp-sections-grid">
              <div class="exp-section-item">
                <div class="exp-section-title">🎯 最佳对策与商务战略</div>
                <div class="exp-section-body">${exp.strategy || ''}</div>
              </div>

              <div class="exp-section-item">
                <div class="exp-section-title">🧠 日本客户心理暗语与潜台词</div>
                <div class="exp-section-body">${exp.clientSubtext || ''}</div>
              </div>

              <div class="exp-section-item">
                <div class="exp-section-title">❌ 选项逐个剖析与避雷指南</div>
                <div class="exp-traps-list">${trapsHtml}</div>
              </div>

              ${phrasesHtml}
              ${refHtml}
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="battle-q-box">
          <div class="battle-q-meta-badges">
            <span class="q-category-pill cat-${q.category}">${q.categoryName}</span>
            <span class="q-scene-pill">📍 ${q.sceneTag}</span>
            <span class="q-difficulty-pill diff-${q.difficulty}">${q.difficulty}</span>
          </div>

          <div class="scenario-bubble-card">
            <div class="scenario-speaker-header">
              <span class="scenario-speaker-avatar">${q.speakerAvatar || '👨‍💼'}</span>
              <div class="scenario-speaker-info">
                <span class="scenario-speaker-name">${q.speaker}</span>
                <span class="scenario-speaker-role">${q.speakerRole}</span>
              </div>
            </div>
            <div class="scenario-context-text">${q.context}</div>
            <div class="scenario-quote-box">
              <div class="scenario-quote-text">${q.dialogueWithRuby || q.dialogue}</div>
            </div>
          </div>

          <div class="battle-prompt-box">
            <span class="battle-prompt-icon">⚡</span>
            <span class="battle-prompt-text">${q.prompt}</span>
          </div>

          <div class="battle-options-list" id="current-options-list">
            ${optionsHtml}
          </div>

          ${explanationHtml}
        </div>
      `;

      // Attach option click listeners
      if (!isAnswered) {
        container.querySelectorAll(".battle-opt-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const selectedOpt = parseInt(btn.getAttribute("data-optindex"), 10);
            this.handleOptionSelect(selectedOpt);
          });
        });
      }

      this.updateNavButtons();
    },

    handleOptionSelect(selectedOpt) {
      const q = this.questions[this.currentIndex];
      const isCorrect = (selectedOpt === q.correct);

      this.userAnswers[this.currentIndex] = {
        selectedIndex: selectedOpt,
        isCorrect: isCorrect,
        answeredAt: Date.now()
      };

      if (isCorrect) {
        this.sessionScore += 1;
        this.sessionStreak += 1;
        this.maxSessionStreak = Math.max(this.maxSessionStreak, this.sessionStreak);

        // If previously in weakness, remove it
        if (this.hasWeakness(q.id)) {
          this.removeWeakness(q.id);
          showToast("🎯 答对！该题已从错题本中成功消除！");
        }
      } else {
        this.sessionStreak = 0;
        this.addWeakness(q.id);
        showToast("❌ 回答失策，已自动收录进错题本！");
      }

      this.recordAnswer(q.id, q.category, isCorrect);
      this.renderQuestion();
    },

    updateNavButtons() {
      const prevBtn = document.getElementById("battle-prev-btn");
      const nextBtn = document.getElementById("battle-next-btn");
      const nextBtnText = document.getElementById("battle-next-btn-text");

      const isAnswered = !!this.userAnswers[this.currentIndex];
      const isLast = (this.currentIndex === this.questions.length - 1);

      if (prevBtn) {
        prevBtn.disabled = (this.currentIndex === 0);
      }

      if (nextBtn) {
        nextBtn.disabled = !isAnswered;
        if (nextBtnText) {
          nextBtnText.textContent = isLast ? "🏁 查看战力诊断报告" : "下一题";
        }
      }
    },

    updateBookmarkButton(qId) {
      const btn = document.getElementById("battle-bookmark-btn");
      const lbl = document.getElementById("bookmark-label-text");
      if (!btn) return;

      const isBookmarked = this.hasWeakness(qId);
      btn.classList.toggle("bookmarked", isBookmarked);
      if (lbl) {
        lbl.textContent = isBookmarked ? "已在错题本" : "收藏生疏题";
      }
    },

    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.renderQuestion();
      }
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.renderQuestion();
      } else {
        this.finishSession();
      }
    },

    finishSession() {
      if (this.examTimer) {
        clearInterval(this.examTimer);
        this.examTimer = null;
      }

      const total = this.questions.length;
      const score = this.sessionScore;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

      // Determine rank
      let rank = "C";
      let rankTitle = "⚠️ 预警级 · 存在踩坑死角，需重点复盘";
      let rankDesc = "在日企商务沟通中仍有部分直球拒绝或失礼表达，建议结合课文深挖客户真实心理，规避合规与关系风险。";

      if (accuracy >= 90) {
        rank = "S";
        rankTitle = "👑 殿堂级 · 对日IT金牌顾问 (Master)";
        rankDesc = "兼备卓越的技术判断力与神级商务情商！对日式商业心理、非功能下钻、范围冻结与高阶敬语游刃有余！";
      } else if (accuracy >= 80) {
        rank = "A";
        rankTitle = "💎 卓越级 · 资深对日SE/PM (Senior)";
        rankDesc = "具备扎实的对日IT实战交锋素养，在绝大多数场景下能够得体应对日本客户质疑并推动共识达成！";
      } else if (accuracy >= 70) {
        rank = "B";
        rankTitle = "⚔️ 熟练级 · 合格对日工程师 (Qualified)";
        rankDesc = "掌握基础对日敬语与规范流程，但在复杂的突发阻力与范围谈判中仍偶有踩坑，需强化避雷意识。";
      } else if (accuracy < 60) {
        rank = "D";
        rankTitle = "🚨 危险级 · 高频职场失礼预警 (Review Needed)";
        rankDesc = "暴露出较多中国工程师常见直男式NG回答（直接拒绝、甩锅他责、模糊承诺），建议立即回炉精读5大场景核心对话！";
      }

      // 5 Dimensions breakdown
      const categories = [
        { id: "objection", name: "🛡️ 异议化解力", barColor: "linear-gradient(90deg, #f59e0b, #d97706)" },
        { id: "pitfall", name: "🚫 避坑防雷力", barColor: "linear-gradient(90deg, #ef4444, #b91c1c)" },
        { id: "elicitation", name: "🔍 需求下钻力", barColor: "linear-gradient(90deg, #6366f1, #4338ca)" },
        { id: "scope", name: "📐 范围把控力", barColor: "linear-gradient(90deg, #0ea5e9, #0369a1)" },
        { id: "keigo", name: "👔 高阶敬语力", barColor: "linear-gradient(90deg, #a855f7, #7e22ce)" }
      ];

      const dimBreakdown = categories.map(cat => {
        let catTotal = 0;
        let catCorrect = 0;
        this.questions.forEach((q, idx) => {
          if (q.category === cat.id) {
            catTotal++;
            const ans = this.userAnswers[idx];
            if (ans && ans.isCorrect) catCorrect++;
          }
        });
        const pct = catTotal > 0 ? Math.round((catCorrect / catTotal) * 100) : 100;
        return {
          ...cat,
          total: catTotal,
          correct: catCorrect,
          pct: pct
        };
      });

      // Find lowest category
      const activeDims = dimBreakdown.filter(d => d.total > 0);
      activeDims.sort((a, b) => a.pct - b.pct);
      const lowestDim = activeDims.length ? activeDims[0] : null;

      let adviceHtml = "";
      if (lowestDim && lowestDim.pct < 80) {
        adviceHtml = `
          <div style="background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1.5rem; text-align: left;">
            <div style="font-weight: 800; color: #92400e; font-size: 0.92rem; margin-bottom: 0.35rem;">
              💡 战力进阶针对性教练建言：
            </div>
            <div style="font-size: 0.86rem; color: #78350f; line-height: 1.5;">
              您在<strong>「${lowestDim.name}」</strong>维度的正确率为 <strong>${lowestDim.pct}%</strong>。建议重点回炉精读对应场景课文及【职场实战诊所】，掌握日式商务沟通的缓冲语（クッション言葉）与责任分界（デマケーション）思维！
            </div>
          </div>
        `;
      }

      const barsHtml = dimBreakdown.map(d => `
        <div class="radar-dim-row">
          <div class="radar-dim-header">
            <span>${d.name} ${d.total > 0 ? `(${d.correct}/${d.total})` : ''}</span>
            <span style="color: ${d.pct >= 80 ? '#059669' : (d.pct >= 60 ? '#d97706' : '#dc2626')};">
              ${d.pct}% · ${d.pct >= 90 ? '卓越' : (d.pct >= 75 ? '良好' : (d.pct >= 60 ? '及格' : '薄弱'))}
            </span>
          </div>
          <div class="radar-bar-bg">
            <div class="radar-bar-fill" style="width: ${d.pct}%; background: ${d.barColor};"></div>
          </div>
        </div>
      `).join("");

      const arenaCard = document.getElementById("battle-arena");
      const scorecardCard = document.getElementById("battle-scorecard");
      if (arenaCard) arenaCard.style.display = "none";
      if (!scorecardCard) return;

      scorecardCard.style.display = "block";
      scorecardCard.innerHTML = `
        <div class="scorecard-rank-badge rank-${rank}">${rank}</div>
        <h3 class="scorecard-title">${rankTitle}</h3>
        <p class="scorecard-subtitle">${rankDesc}</p>

        <div class="scorecard-metrics-grid">
          <div class="score-metric-box">
            <div class="score-metric-val" style="color: ${accuracy >= 80 ? '#059669' : '#d97706'};">${accuracy}%</div>
            <div class="score-metric-lbl">综合正确率</div>
          </div>
          <div class="score-metric-box">
            <div class="score-metric-val">${score} / ${total}</div>
            <div class="score-metric-lbl">答对真题数</div>
          </div>
          <div class="score-metric-box">
            <div class="score-metric-val">🔥 ${this.maxSessionStreak}</div>
            <div class="score-metric-lbl">最高连胜</div>
          </div>
          <div class="score-metric-box">
            <div class="score-metric-val" style="color: #dc2626;">${this.getWeaknessIds().size}</div>
            <div class="score-metric-lbl">错题本待消</div>
          </div>
        </div>

        <div class="radar-bars-card">
          <div class="radar-bars-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <span>5大对日IT核心实战维度诊断</span>
          </div>
          ${barsHtml}
          ${adviceHtml}
        </div>

        <div class="scorecard-actions">
          <button class="scorecard-act-btn primary" onclick="BattleQuizEngine.startSession('quick10', 'all')">
            ⚡ 换一套10题速刷
          </button>
          <button class="scorecard-act-btn secondary" onclick="BattleQuizEngine.startSession('weakness', 'all')">
            📕 专攻错题消消乐 (${this.getWeaknessIds().size})
          </button>
          <button class="scorecard-act-btn secondary" onclick="window.switchTab ? window.switchTab('textbook') : null">
            📘 查看教材课文精读
          </button>
        </div>
      `;
    },

    init() {
      // Bind mode buttons
      document.querySelectorAll(".battle-mode-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const mode = btn.getAttribute("data-mode");
          this.startSession(mode, this.currentCategory);
        });
      });

      // Bind category buttons
      document.querySelectorAll(".cat-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const cat = btn.getAttribute("data-cat");
          this.startSession(this.currentMode, cat);
        });
      });

      // Bind nav buttons
      const prevBtn = document.getElementById("battle-prev-btn");
      const nextBtn = document.getElementById("battle-next-btn");
      const bookmarkBtn = document.getElementById("battle-bookmark-btn");

      if (prevBtn) {
        prevBtn.addEventListener("click", () => this.prevQuestion());
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => this.nextQuestion());
      }
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener("click", () => {
          if (!this.questions.length) return;
          const q = this.questions[this.currentIndex];
          this.toggleBookmark(q.id);
          this.updateBookmarkButton(q.id);
        });
      }

      this.updateTopStats();
      this.startSession("quick10", "all");
    }
  };

  // 场景切换时的随堂测验桥接函数
  function renderQuiz(scene) {
    if (BattleQuizEngine && BattleQuizEngine.updateTopStats) {
      BattleQuizEngine.updateTopStats();
    }
  }

  // 剪贴板复制工具函数
  function copyToClipboard(text, btnElement, successMsg = "已复制到剪贴板 📋") {
    const doFeedback = () => {
      if (btnElement) {
        btnElement.classList.add("copied");
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = `<span>已复制 ✅</span>`;
        setTimeout(() => {
          btnElement.classList.remove("copied");
          btnElement.innerHTML = originalHtml;
        }, 1800);
      }
      showToast(successMsg);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(doFeedback).catch(() => {
        fallbackCopy(text);
        doFeedback();
      });
    } else {
      fallbackCopy(text);
      doFeedback();
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  // 🎧 通勤磨耳朵 / 锁屏随身听控制器 (Walkman Controller with MediaSession)
  const WalkmanController = {
    isOpen: false,
    isPlaying: false,
    mode: 'pure', // 'pure' | 'echo'
    queue: [],
    index: 0,
    timer: null,

    init() {
      const launchBtn = document.getElementById("launch-walkman-btn");
      const dock = document.getElementById("walkman-dock");
      const playBtn = document.getElementById("wm-play-btn");
      const prevBtn = document.getElementById("wm-prev-btn");
      const nextBtn = document.getElementById("wm-next-btn");
      const closeBtn = document.getElementById("wm-close-btn");
      const modePureBtn = document.getElementById("wm-mode-pure");
      const modeEchoBtn = document.getElementById("wm-mode-echo");

      if (launchBtn) {
        launchBtn.addEventListener("click", () => {
          this.open();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.close();
        });
      }

      if (playBtn) {
        playBtn.addEventListener("click", () => {
          if (this.isPlaying) this.pause();
          else this.play();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          this.prev();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.next();
        });
      }

      if (modePureBtn) {
        modePureBtn.addEventListener("click", () => {
          this.mode = 'pure';
          modePureBtn.classList.add("active");
          if (modeEchoBtn) modeEchoBtn.classList.remove("active");
          showToast("随身听：纯日文多角色磨耳朵 🎧");
        });
      }

      if (modeEchoBtn) {
        modeEchoBtn.addEventListener("click", () => {
          this.mode = 'echo';
          modeEchoBtn.classList.add("active");
          if (modePureBtn) modePureBtn.classList.remove("active");
          showToast("随身听：日文 ➜ 留白跟读 ➜ 中文释义 🗣️");
        });
      }
    },

    buildQueue() {
      const scene = data.scenes[currentSceneIndex];
      if (!scene) return [];
      const q = [];

      // 1. 教材课文对白
      if (scene.textbookText && scene.textbookText.dialogue) {
        scene.textbookText.dialogue.forEach((turn, idx) => {
          const spkMeta = getSpeakerMeta(turn.speaker);
          q.push({
            speaker: turn.speaker,
            avatar: spkMeta.avatar,
            voice: spkMeta.voice,
            jp: turn.jp,
            zh: turn.zh,
            sectionTitle: `${scene.title} · 教材正文`,
            audioUrl: `audio/scene-${scene.sceneNumber}/tb-${idx}.mp3`
          });
        });
      }

      // 2. 配套练习 5 篇短文对白
      if (scene.practiceTexts && scene.practiceTexts.length) {
        scene.practiceTexts.forEach(p => {
          if (p.dialogue) {
            p.dialogue.forEach((turn, idx) => {
              const spkMeta = getSpeakerMeta(turn.speaker);
              q.push({
                speaker: turn.speaker,
                avatar: spkMeta.avatar,
                voice: spkMeta.voice,
                jp: turn.jp,
                zh: turn.zh,
                sectionTitle: `${scene.title} · 短文${p.pNum} ${p.title}`,
                audioUrl: `audio/scene-${scene.sceneNumber}/p${p.pNum}/p${p.pNum}-${idx}.mp3`
              });
            });
          }
        });
      }

      return q;
    },

    open() {
      const dock = document.getElementById("walkman-dock");
      if (dock) dock.style.display = "block";
      this.isOpen = true;
      this.queue = this.buildQueue();
      if (!this.isPlaying) {
        this.index = 0;
        this.play();
      }
      showToast("随身听已启动，支持手机锁屏与后台后台巡回播报 🎧");
    },

    close() {
      const dock = document.getElementById("walkman-dock");
      if (dock) dock.style.display = "none";
      this.isOpen = false;
      this.pause();
    },

    updateUI() {
      const item = this.queue[this.index];
      if (!item) return;

      const avatarEl = document.getElementById("wm-avatar");
      const titleEl = document.getElementById("wm-title");
      const subEl = document.getElementById("wm-sub");
      const playBtn = document.getElementById("wm-play-btn");

      if (avatarEl) avatarEl.textContent = item.avatar;
      if (titleEl) titleEl.textContent = `${item.speaker}: ${item.jp}`;
      if (subEl) subEl.textContent = `${item.sectionTitle} (${this.index + 1}/${this.queue.length})`;
      if (playBtn) playBtn.textContent = this.isPlaying ? "⏸" : "▶";

      // 手机锁屏与媒体通知栏中心 MediaSession
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.jp,
          artist: `${item.speaker} · ${item.zh}`,
          album: item.sectionTitle,
          artwork: [
            { src: 'https://img.icons8.com/color/192/japan.png', sizes: '192x192', type: 'image/png' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => this.play());
        navigator.mediaSession.setActionHandler('pause', () => this.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
        navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
      }
    },

    play() {
      if (!this.queue.length) {
        this.queue = this.buildQueue();
      }
      if (!this.queue.length) return;

      clearTimeout(this.timer);
      this.isPlaying = true;
      this.updateUI();

      const item = this.queue[this.index];

      const proceedNext = () => {
        if (!this.isPlaying) return;
        this.index = (this.index + 1) % this.queue.length;
        this.timer = setTimeout(() => this.play(), 400);
      };

      // 播放日文原句
      AudioController.speak(item.jp, null, item.audioUrl, () => {
        if (!this.isPlaying) return;
        if (this.mode === 'echo') {
          // 留白 2.2 秒供开口跟读
          this.timer = setTimeout(() => {
            if (!this.isPlaying) return;
            // 中文释义播报
            AudioController.speakTTS(item.zh, () => {
              if (!this.isPlaying) return;
              this.timer = setTimeout(proceedNext, 800);
            }, "zh-CN");
          }, 2200);
        } else {
          // 纯日文连续磨耳朵：间隔 500ms 继续下一句
          this.timer = setTimeout(proceedNext, 500);
        }
      }, item.voice, 1);
    },

    pause() {
      this.isPlaying = false;
      clearTimeout(this.timer);
      AudioController.stop();
      this.updateUI();
    },

    prev() {
      clearTimeout(this.timer);
      AudioController.stop();
      if (!this.queue.length) return;
      this.index = (this.index - 1 + this.queue.length) % this.queue.length;
      if (this.isPlaying) this.play();
      else this.updateUI();
    },

    next() {
      clearTimeout(this.timer);
      AudioController.stop();
      if (!this.queue.length) return;
      this.index = (this.index + 1) % this.queue.length;
      if (this.isPlaying) this.play();
      else this.updateUI();
    }
  };

  // 顶栏语速与复读交互绑定
  const speedBtn = document.getElementById("audio-speed-btn");
  const loopBtn = document.getElementById("audio-loop-btn");

  const speeds = [0.8, 1.0, 1.2];
  let speedIdx = 1; // 默认 1.0x

  if (speedBtn) {
    speedBtn.addEventListener("click", () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      const newSpeed = speeds[speedIdx];
      AudioController.playbackRate = newSpeed;
      speedBtn.querySelector("span").textContent = `⚡ ${newSpeed}x`;
      if (AudioController.currentAudio) {
        AudioController.currentAudio.playbackRate = newSpeed;
      }
      showToast(`播放语速已设为 ${newSpeed}x ${newSpeed === 0.8 ? '（慢速精听）' : newSpeed === 1.2 ? '（快速挑战）' : '（标准原速）'}`);
    });
  }

  const loops = [1, 3];
  let loopIdx = 0; // 默认 1遍

  if (loopBtn) {
    loopBtn.addEventListener("click", () => {
      loopIdx = (loopIdx + 1) % loops.length;
      const newLoop = loops[loopIdx];
      AudioController.repeatCount = newLoop;
      loopBtn.querySelector("span").textContent = `🔁 ${newLoop}遍`;
      showToast(`单句复读已设为：${newLoop}遍循环 🔁`);
    });
  }

  // 渲染当前选中的整个场景
  function renderCurrentScene() {
    const scene = data.scenes[currentSceneIndex];
    renderScenePills();
    renderHero(scene);
    renderTextbook(scene);
    renderPractice(scene);
    renderGrammar(scene);
    renderVocab(scene);
    renderQuiz(scene);
    updateWeaknessBadges();
    switchTab(activeTab);
  }

  // 假名注音显示/隐藏
  toggleFuriganaBtn.addEventListener("click", () => {
    isFuriganaVisible = !isFuriganaVisible;
    if (isFuriganaVisible) {
      mainContainer.classList.remove("hide-furigana");
      toggleFuriganaBtn.classList.add("active");
      toggleFuriganaBtn.querySelector("span").textContent = "假名注音：已开启";
    } else {
      mainContainer.classList.add("hide-furigana");
      toggleFuriganaBtn.classList.remove("active");
      toggleFuriganaBtn.querySelector("span").textContent = "假名注音：已隐藏";
    }
  });

  // Tab 标签切换
  function switchTab(targetTab) {
    AudioController.stop();
    stopRoleplayMeeting();
    activeTab = targetTab;
    tabButtons.forEach(btn => {
      if (btn.getAttribute("data-tab") === targetTab) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    if (targetTab === "all") {
      Object.values(moduleSections).forEach(sec => { if (sec) sec.style.display = "block"; });
    } else {
      Object.keys(moduleSections).forEach(key => {
        if (moduleSections[key]) {
          moduleSections[key].style.display = (key === targetTab) ? "block" : "none";
        }
      });
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // 实时搜索
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const kw = e.target.value.trim().toLowerCase();
      if (!kw) {
        switchTab(activeTab);
        return;
      }
      Object.values(moduleSections).forEach(sec => { if (sec) sec.style.display = "block"; });
      document.querySelectorAll(".dialogue-turn, .grammar-card, .flashcard-3d").forEach(card => {
        const txt = card.innerText.toLowerCase();
        card.style.display = txt.includes(kw) ? "" : "none";
      });
    });
  }

  // ==========================================
  // AI 设置与 AI 私教抽屉交互逻辑
  // ==========================================
  let tutorCurrentTurn = null;
  let tutorCurrentScene = null;
  let tutorHistory = [];

  function updateAiHeaderBtn() {
    const btn = document.getElementById("btn-ai-config");
    if (!btn) return;
    const cfg = QwenAIEngine.getConfig();
    const isConfigured = QwenAIEngine.isConfigured();
    const dot = btn.querySelector(".ai-status-dot");
    const text = btn.querySelector(".ai-btn-text");

    if (dot) {
      dot.className = `ai-status-dot ${isConfigured ? 'dot-active' : 'dot-inactive'}`;
    }
    if (text) {
      text.textContent = isConfigured ? `🤖 AI私教: ${cfg.model || 'qwen3.7-plus'}` : "🤖 AI私教: 未配置";
    }
  }

  function openAiConfigModal() {
    const modal = document.getElementById("ai-config-modal");
    if (!modal) return;
    const cfg = QwenAIEngine.getConfig();
    const keyInput = document.getElementById("ai-api-key-input");
    const modelSelect = document.getElementById("ai-model-select");
    const endpointInput = document.getElementById("ai-endpoint-input");
    const testResult = document.getElementById("ai-test-result");

    if (keyInput) keyInput.value = cfg.apiKey || "";
    if (modelSelect) modelSelect.value = cfg.model || "qwen3.7-plus";
    if (endpointInput) endpointInput.value = cfg.baseUrl || "/api/chat";
    if (testResult) {
      testResult.style.display = "none";
      testResult.textContent = "";
    }

    modal.style.display = "flex";
    if (keyInput) keyInput.focus();
  }

  function closeAiConfigModal() {
    const modal = document.getElementById("ai-config-modal");
    if (!modal) return;
    modal.style.display = "none";
  }

  function setupAiConfigModal() {
    const openBtn = document.getElementById("btn-ai-config");
    const closeBtn = document.getElementById("ai-modal-close-btn");
    const cancelBtn = document.getElementById("btn-cancel-ai-config");
    const saveBtn = document.getElementById("btn-save-ai-config");
    const testBtn = document.getElementById("btn-test-ai-connection");
    const visBtn = document.getElementById("btn-toggle-key-vis");
    const keyInput = document.getElementById("ai-api-key-input");
    const modelSelect = document.getElementById("ai-model-select");
    const endpointInput = document.getElementById("ai-endpoint-input");
    const testResult = document.getElementById("ai-test-result");
    const modal = document.getElementById("ai-config-modal");

    if (openBtn) {
      openBtn.addEventListener("click", openAiConfigModal);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeAiConfigModal);
    }
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeAiConfigModal);
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeAiConfigModal();
      });
    }

    if (visBtn && keyInput) {
      visBtn.addEventListener("click", () => {
        if (keyInput.type === "password") {
          keyInput.type = "text";
          visBtn.textContent = "🙈";
        } else {
          keyInput.type = "password";
          visBtn.textContent = "👁️";
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const apiKey = keyInput ? keyInput.value.trim() : "";
        const model = modelSelect ? modelSelect.value : "qwen3.7-plus";
        const baseUrl = endpointInput ? endpointInput.value.trim() : "/api/chat";

        QwenAIEngine.saveConfig({ apiKey, model, baseUrl });
        updateAiHeaderBtn();
        showToast("Qwen AI 配置已成功保存！🎉");
        closeAiConfigModal();
      });
    }

    if (testBtn) {
      testBtn.addEventListener("click", async () => {
        const apiKey = keyInput ? keyInput.value.trim() : "";
        const model = modelSelect ? modelSelect.value : "qwen3.7-plus";
        const baseUrl = endpointInput ? endpointInput.value.trim() : "/api/chat";

        if (!apiKey) {
          testResult.style.display = "block";
          testResult.className = "ai-test-result error";
          testResult.textContent = "请先填写 DashScope API Key！";
          return;
        }

        testBtn.disabled = true;
        testBtn.innerHTML = "<span>测试连接中... ⏳</span>";
        testResult.style.display = "block";
        testResult.className = "ai-test-result loading";
        testResult.textContent = "正在连接 Qwen 模型，请稍候...";

        try {
          const reply = await QwenAIEngine.testConnection(apiKey, model, baseUrl);
          testResult.className = "ai-test-result success";
          testResult.innerHTML = `✅ 连接测试成功！模型返回：<code>${escapeHtml(reply)}</code>`;
        } catch (err) {
          testResult.className = "ai-test-result error";
          testResult.innerHTML = `❌ 连接失败: ${escapeHtml(err.message)}<br><small style="margin-top:0.35rem; display:block; color:#475569;">提示：若在浏览器直接请求遇到 CORS，请使用本地代理（在终端运行 <code>python3 server.py</code> 并设置端点为默认的 <code>/api/chat</code>）。</small>`;
        } finally {
          testBtn.disabled = false;
          testBtn.innerHTML = "<span>⚡ 测试连接</span>";
        }
      });
    }
  }

  function openAiTutorDrawer(turn, scene, spkMeta) {
    tutorCurrentTurn = turn;
    tutorCurrentScene = scene;
    tutorHistory = [];

    const drawer = document.getElementById("ai-tutor-drawer");
    if (!drawer) return;

    const sceneContext = document.getElementById("ai-tutor-scene-context");
    const anchorSpeaker = document.getElementById("ai-anchor-speaker");
    const anchorJp = document.getElementById("ai-anchor-jp");
    const anchorZh = document.getElementById("ai-anchor-zh");
    const messagesBox = document.getElementById("ai-chat-messages");
    const inputEl = document.getElementById("ai-tutor-input");

    if (sceneContext) {
      sceneContext.textContent = `场景 ${scene.id} · ${scene.title}`;
    }
    if (anchorSpeaker) {
      anchorSpeaker.textContent = `${turn.speaker} (${spkMeta ? spkMeta.roleLabel : '对白'})`;
    }
    if (anchorJp) {
      anchorJp.innerHTML = turn.jpWithRuby || turn.jp;
    }
    if (anchorZh) {
      anchorZh.textContent = turn.zh || "";
    }

    if (messagesBox) {
      messagesBox.innerHTML = `
        <div class="ai-msg ai-msg-bot">
          <div class="ai-msg-avatar">🤖</div>
          <div class="ai-msg-bubble">
            您好！我是您的对日软件架构与商务沟通 AI 私教。正在研读当前对白：<br>
            <div style="margin: 0.4rem 0; padding: 0.4rem 0.6rem; background: #e0e7ff; border-radius: 6px; color: #1e1b4b; font-size: 0.85rem;">
              <strong>${turn.speaker}</strong>: 「${turn.jp}」
            </div>
            您可以直接点击上方的快捷分析胶囊，或在下方输入您的疑问，我将为您深度剖析客户本音、敬语细节与对日开发避坑点！
          </div>
        </div>
      `;
    }

    drawer.style.display = "flex";
    if (inputEl) {
      inputEl.value = "";
      setTimeout(() => inputEl.focus(), 150);
    }
  }

  function closeAiTutorDrawer() {
    const drawer = document.getElementById("ai-tutor-drawer");
    if (drawer) drawer.style.display = "none";
  }

  async function sendAiTutorQuestion(questionText) {
    const text = (questionText || "").trim();
    if (!text) return;

    if (!QwenAIEngine.isConfigured()) {
      showToast("请先在右上角【🤖 AI私教设置】中配置 Qwen API Key 🔑");
      openAiConfigModal();
      return;
    }

    const messagesBox = document.getElementById("ai-chat-messages");
    const inputEl = document.getElementById("ai-tutor-input");
    const sendBtn = document.getElementById("btn-ai-tutor-send");

    if (inputEl) inputEl.value = "";

    // 用户消息气泡
    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "ai-msg ai-msg-user";
    userMsgDiv.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text)}</div>`;
    messagesBox.appendChild(userMsgDiv);

    // 私教思考气泡
    const botMsgDiv = document.createElement("div");
    botMsgDiv.className = "ai-msg ai-msg-bot";
    botMsgDiv.innerHTML = `
      <div class="ai-msg-avatar">🤖</div>
      <div class="ai-msg-bubble ai-bubble-loading">
        <div class="ai-typing-dots"><span></span><span></span><span></span></div>
        <span style="font-size: 0.85rem; color: #4338ca; margin-left: 0.4rem; font-weight:600;">AI 私教正在深度推演中...</span>
      </div>
    `;
    messagesBox.appendChild(botMsgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    if (sendBtn) sendBtn.disabled = true;

    try {
      const answer = await QwenAIEngine.askTutor({
        question: text,
        turn: tutorCurrentTurn,
        scene: tutorCurrentScene,
        history: tutorHistory
      });

      tutorHistory.push({ role: "user", content: text });
      tutorHistory.push({ role: "assistant", content: answer });

      const bubble = botMsgDiv.querySelector(".ai-msg-bubble");
      bubble.className = "ai-msg-bubble";
      bubble.innerHTML = renderMarkdown(answer);
    } catch (err) {
      const bubble = botMsgDiv.querySelector(".ai-msg-bubble");
      bubble.className = "ai-msg-bubble ai-bubble-error";
      bubble.innerHTML = `⚠️ <strong>私教解答出现异常：</strong>${escapeHtml(err.message || '网络连接超时')}<br><small style="margin-top:0.35rem; display:block; color:#64748b;">提示：请确认终端已运行 <code>python3 server.py</code> 本地代理服务并配置了有效 API Key。</small>`;
    } finally {
      if (sendBtn) sendBtn.disabled = false;
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }

  function setupAiTutorDrawer() {
    const closeBtn = document.getElementById("ai-tutor-close-btn");
    const drawer = document.getElementById("ai-tutor-drawer");
    const sendBtn = document.getElementById("btn-ai-tutor-send");
    const inputEl = document.getElementById("ai-tutor-input");
    const quickChips = document.querySelectorAll(".ai-quick-chip");

    if (closeBtn) {
      closeBtn.addEventListener("click", closeAiTutorDrawer);
    }
    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) closeAiTutorDrawer();
      });
    }

    quickChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        if (prompt) {
          sendAiTutorQuestion(prompt);
        }
      });
    });

    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        if (inputEl) sendAiTutorQuestion(inputEl.value);
      });
    }

    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          if (e.isComposing || e.keyCode === 229) return;
          e.preventDefault();
          sendAiTutorQuestion(inputEl.value);
        }
      });
    }
  }

  // 初始化随身听、背诵控制栏、跨场景对决刷题引擎、AI模块并默认启动渲染
  window.switchTab = switchTab;
  window.BattleQuizEngine = BattleQuizEngine;
  window.QwenAIEngine = QwenAIEngine;
  WalkmanController.init();
  setupDrillToolbars();
  BattleQuizEngine.init();
  setupAiConfigModal();
  setupAiTutorDrawer();
  updateAiHeaderBtn();
  renderCurrentScene();
});
