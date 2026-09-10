import { ref, computed } from 'vue';

const STORAGE_KEY = 'nhg_qwen_config';

export const QWEN_MODELS = [
  { id: 'qwen3.7-plus', name: 'Qwen 3.7 Plus (默认·强推理·高情商)', desc: '推荐：对日IT商务礼仪诊断与私教答疑最佳体验' },
  { id: 'qwen3.8-max', name: 'Qwen 3.8 Max (最新旗舰大模型)', desc: '最强综合能力与复杂指令遵循' },
  { id: 'qwen3.8-max-0902', name: 'Qwen 3.8 Max (0902稳定版)', desc: '专项对齐稳定微调版本' },
  { id: 'qwen-plus', name: 'Qwen Plus (经典平稳)', desc: '性价比均衡' },
  { id: 'qwen-turbo', name: 'Qwen Turbo (极速响应)', desc: '轻量快速' }
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderMarkdown(md) {
  if (!md) return '';
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

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.model === 'qwen-plus' || !parsed.model)) {
        parsed.model = 'qwen3.7-plus';
      }
      let bUrl = (parsed.baseUrl || '/api/chat').trim();
      if (bUrl.includes('dashscope.aliyuncs.com') || bUrl.includes('pages.dev')) {
        bUrl = '/api/chat';
      }
      return {
        apiKey: parsed.apiKey || '',
        model: parsed.model || 'qwen3.7-plus',
        baseUrl: bUrl
      };
    }
  } catch (e) {
    console.error('加载 Qwen 配置失败', e);
  }
  return {
    apiKey: '',
    model: 'qwen3.7-plus',
    baseUrl: '/api/chat'
  };
}

// 全局响应式配置对象
const config = ref(loadConfig());
const isPlatformReady = ref(false);

async function checkPlatformStatus() {
  try {
    // 始终直接探测当前托管域名的 /api/chat 端点，不受本地任何历史脏数据干扰
    let endpoint = '/api/chat';
    if (window.location.protocol === 'file:') {
      endpoint = 'http://localhost:8080/api/chat';
    }
    const res = await fetch(endpoint, { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.hasPlatformKey) {
        isPlatformReady.value = true;
      }
    }
  } catch (e) {}
}

// 页面初始化时静默探测云端公共 Key
checkPlatformStatus();

export function useQwen() {
  const hasPersonalKey = computed(() => {
    return !!(config.value.apiKey && config.value.apiKey.trim().length > 5);
  });

  const isConfigured = computed(() => {
    return isPlatformReady.value || hasPersonalKey.value;
  });

  function saveConfig(newConfig) {
    config.value = {
      apiKey: (newConfig.apiKey || '').trim(),
      model: newConfig.model || 'qwen3.7-plus',
      baseUrl: (newConfig.baseUrl || '/api/chat').trim()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value));
    } catch (e) {
      console.error('保存 Qwen 配置失败', e);
    }
  }

  function resolveEndpoint(baseUrl) {
    let ep = (baseUrl && baseUrl.trim()) ? baseUrl.trim() : '/api/chat';

    // 1. 如果用户输入了阿里云 DashScope 官方地址，自动使用本地或边缘反向代理，规避浏览器 CORS 跨域限制
    if (ep.includes('dashscope.aliyuncs.com')) {
      ep = '/api/chat';
    }

    // 2. 智能容错：如果用户输入了网站根地址（如 https://xxx.pages.dev），自动补全为 /api/chat，防止 POST 静态根目录爆 405
    if (ep.startsWith('http://') || ep.startsWith('https://')) {
      try {
        const u = new URL(ep);
        if (!u.pathname || u.pathname === '/' || u.pathname === '') {
          u.pathname = '/api/chat';
          ep = u.toString();
        }
      } catch (e) {}
    }

    // 3. 去除末尾冗余斜杠，杜绝 301/308 重定向导致浏览器将 POST 自动降级为 GET 产生 405
    if (ep.endsWith('/') && ep.length > 1) {
      ep = ep.replace(/\/+$/, '');
    }

    // 4. 本地直接以 file:// 协议打开时，自动路由到本地运行的 Python 代理端口
    if (window.location.protocol === 'file:' && ep.startsWith('/')) {
      ep = `http://localhost:8080${ep}`;
    }
    return ep;
  }

  async function callChatCompletions(messages, options = {}) {
    if (!isConfigured.value) {
      throw new Error('AI 私教服务尚未就绪。请先点击右上角【🤖 AI私教】配置您的通义千问 API Key！');
    }

    const endpoint = resolveEndpoint(config.value.baseUrl);
    const model = (config.value.model && config.value.model.trim()) ? config.value.model.trim() : 'qwen3.7-plus';

    const payload = {
      model: model,
      messages: messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1500
    };

    const headers = {
      'Content-Type': 'application/json'
    };
    if (config.value.apiKey && config.value.apiKey.trim()) {
      headers['Authorization'] = `Bearer ${config.value.apiKey.trim()}`;
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errDetail = '';
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
      throw new Error('AI 返回了空响应，请重试。');
    }
    return reply;
  }

  async function testConnection(apiKey, model, baseUrl) {
    const endpoint = resolveEndpoint(baseUrl);
    const headers = {
      'Content-Type': 'application/json'
    };
    if (apiKey && apiKey.trim()) {
      headers['Authorization'] = `Bearer ${apiKey.trim()}`;
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: model || 'qwen3.7-plus',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: '请只回复两个字：【成功】' }
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
    return data.choices?.[0]?.message?.content || '连接成功';
  }

  async function reviewRoleplay({ userText, standardJp, standardZh, speaker, promptZh, scene }) {
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

    return await callChatCompletions([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], { temperature: 0.6, max_tokens: 1800 });
  }

  async function askTutor({ question, turn, scene, history = [] }) {
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
      { role: 'system', content: systemPrompt },
      ...cleanHistory,
      { role: 'user', content: `${contextDesc}\n【学员提问】: ${question}` }
    ];

    return await callChatCompletions(messages, { temperature: 0.7, max_tokens: 1500 });
  }

  return {
    config,
    isConfigured,
    saveConfig,
    testConnection,
    isPlatformReady,
    hasPersonalKey,
    checkPlatformStatus,
    callChatCompletions,
    reviewRoleplay,
    askTutor,
    renderMarkdown,
    QWEN_MODELS
  };
}
