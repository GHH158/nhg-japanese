import { ref } from 'vue';
import { useQwen } from './useQwen.js';

// 4 档能力分层体系定义
export const INTERVIEW_LEVELS = [
  {
    id: 'n5_n4',
    name: '🐣 N5~N4 零基础小白',
    badge: 'N5~N4',
    shortDesc: '基础破冰 · 擅长语言 · 礼貌应答',
    desc: '适合零基础或IT初学者。提问浅显易懂，提供填空句型模板，消除开口恐惧。',
    promptGuide: '候选人为零基础或IT初学者（N5~N4水准）。考官提问请使用简单基础的短句与日常敬语（丁寧語），重点考查自我介绍、学习经历、擅长语言与积极态度。必须为候选人提供简单易套用的填空式应答骨架（templateScaffold）。点评以鼓励包容为主。'
  },
  {
    id: 'n3',
    name: '🥉 N3 初级实务',
    badge: 'N3',
    shortDesc: '日常开发 · 基础报联相 · 技术栈说明',
    desc: '适合1-2年经验初级程序员。考察开发进展、日常“报联相”与请教姿态。',
    promptGuide: '候选人为对日开发初级程序员（N3水准）。考官提问围绕开发进展汇报、遇到不懂时的求助与日常报联相（報告・連絡・相談）。考查基础敬语规范与条理性。'
  },
  {
    id: 'n2_n1',
    name: '🥈 N2~N1 熟练即战力',
    badge: 'N2~N1',
    shortDesc: '式样下钻 · 内外有别 · 风险预警',
    desc: '适合2-4年经验熟练SE。考察需求复述确认、规范谦让语与工期风险预警。',
    promptGuide: '候选人为熟练对日SE（N2~N1水准）。考官提问侧重上流要件下钻确认（つまり...ですね）、工期风险主动预警、内外有别（ウチ・ソト）与规范谦让语。考察商务沟通地道度与成熟度。'
  },
  {
    id: 'n1_plus',
    name: '🥇 N1+ 高阶卓越',
    badge: 'N1+',
    shortDesc: '商业博弈 · 边界防雷 · 危机公关',
    desc: '适合5年以上BSE/PM/架构师。考察需求推回、分期交付代替案与高规格谈判。',
    promptGuide: '候选人为资深开发骨干/BSE/现场PM（N1+水准）。考官提问极具深度与博弈挑战，涵盖客户无理追加需求委婉推回、分期交付（Phase分割）替代案协商、重大生产故障公关。考查最高级敬语与管理层大局观。'
  }
];

// 全场景面试赛道定义
export const UNIVERSAL_TRACKS = [
  {
    id: 'entry',
    name: '🏢 现场入场面试 (現場入場面接)',
    desc: '对日外包/赴日现场必考。技术栈经验、报联相习惯、团队规约与自驱力'
  },
  {
    id: 'technical',
    name: '💻 技术栈与要件定义面 (テクニカル面談)',
    desc: '架构设计、需求下钻探寻本音、技术选型辩护与代码质量规范'
  },
  {
    id: 'stress',
    name: '⚡ 突发危机与谈判折冲面 (トラブル・納期交渉)',
    desc: '生产重大事故紧急应对、客户情绪受容、工期延误协商与防再发闭环'
  },
  {
    id: 'custom',
    name: '🌟 学员自由定制面试 (Custom Interview)',
    desc: '自由输入目标公司（如野村综研/NTT/乐天）与岗位，AI 实时定制专属考官'
  }
];

// 鲁棒 JSON 提取器
function extractJson(reply) {
  if (!reply) throw new Error('AI 回复内容为空');
  let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

export function useInterviewManager() {
  const { callChatCompletions, isConfigured } = useQwen();
  const isLoading = ref(false);

  // 1. 纯 AI 动态生成单课专属 3 道现场对谈面试题（支持 4 档级别）
  async function generateSceneInterview(scene, level = 'n2_n1') {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const currentLevel = INTERVIEW_LEVELS.find(l => l.id === level) || INTERVIEW_LEVELS[2];
      const dialogueSnippet = scene.textbookText?.dialogue
        ? scene.textbookText.dialogue.slice(0, 5).map(t => `${t.speaker}: ${t.jp}`).join('\n')
        : '';

      const systemPrompt = `你是一位日本头部大型IT商社的项目统括总监兼现场面试官。
现在请针对学员正在学习的特定商务日语课程，为学员量身定制一场【3问递进式现场双向角色扮演对谈面试】。

【候选人当前级别要求】：
${currentLevel.name}：${currentLevel.promptGuide}

必须严格输出纯合法 JSON（严禁在外部包裹任何其他文字）：
{
  "interviewer": {
    "name": "考官名字（如：田中 部長 / 佐藤 PM / 吉田 役員）",
    "role": "职务头衔（如：大手SIer 現場統括責任者）",
    "avatar": "👔",
    "greeting": "初次见面的开场白日语句子（体现考官风范、点明本次对谈目标）"
  },
  "level": "${currentLevel.id}",
  "questions": [
    {
      "id": "sq-1",
      "stage": "第1問：初動ヒアリングと自己紹介",
      "questionJp": "考官日语原题提问...",
      "questionZh": "提问的清晰中文含义...",
      "intentHint": "考官为什么这么问（透传考官背后的潜台词与真实考察目的）",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...；3. ...（清晰具体地指导候选人需要向考官阐述什么业务方案、态度或诉求）",
      "templateScaffold": "针对该级别的可直接填空的日语句型骨架（例如：「〇〇部長、ご質問ありがとうございます。私は...」）",
      "keyPhrases": ["推荐表达1", "推荐表达2", "推荐表达3"]
    },
    {
      "id": "sq-2",
      "stage": "第2問：本課コアスキルと仕様確認",
      "questionJp": "考官日语原题提问...",
      "questionZh": "提问的清晰中文含义...",
      "intentHint": "考官潜台词与真实考察目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    },
    {
      "id": "sq-3",
      "stage": "第3問：突発状況と相手目線の折衝",
      "questionJp": "考官日语原题提问...",
      "questionZh": "提问的清晰中文含义...",
      "intentHint": "考官潜台词与真实考察目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    }
  ]
}`;

      const userPrompt = `【课程背景】:
- 课程标题: ${scene.title}
- 业务情境: ${scene.background}
- 核心参考对话:
${dialogueSnippet}

【目标级别】: ${currentLevel.name}
请为该级别生成 3 道环环相扣的现场对谈面试题，输出纯合法 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.7, max_tokens: 2400 });

      return extractJson(reply);
    } finally {
      isLoading.value = false;
    }
  }

  // 2. 纯 AI 动态生成全场景终面 / 现场入场面试（支持 4 大赛道 + 自由定制 + 4 档级别）
  async function generateUniversalInterview(trackType = 'entry', level = 'n2_n1', customGoal = '') {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const currentLevel = INTERVIEW_LEVELS.find(l => l.id === level) || INTERVIEW_LEVELS[2];
      const trackObj = UNIVERSAL_TRACKS.find(t => t.id === trackType) || UNIVERSAL_TRACKS[0];

      let trackTitle = trackObj.name;
      let trackFocus = trackObj.desc;
      if (trackType === 'custom' && customGoal.trim()) {
        trackTitle = `定制专场：${customGoal.trim()}`;
        trackFocus = `针对学员定制的目标企业/职位（${customGoal.trim()}）进行实战针对性考核`;
      }

      const systemPrompt = `你是一位日本顶级大型IT商社（如野村综研、NTT DATA、日立等）的现场统括负责人兼面试官。
请为学员动态命制一套涵盖完整对日软件开发全生命周期的【4阶段现场对谈模拟面试】。

【候选人当前级别要求】：
${currentLevel.name}：${currentLevel.promptGuide}

必须严格输出纯合法 JSON：
{
  "interviewer": {
    "name": "鈴木 現場統括総括PM",
    "role": "大手SIer 現場統括責任者 / 採用総括部長",
    "avatar": "💼",
    "greeting": "本日は面接にお越しいただきありがとうございます。現場を想定した実践的な質問をさせていただきます。"
  },
  "trackTitle": "${trackTitle}",
  "level": "${currentLevel.id}",
  "questions": [
    {
      "id": "uq-1",
      "stage": "第1問：自己PRと対日IT実績",
      "questionJp": "考官日语提问...",
      "questionZh": "提问中文翻译...",
      "intentHint": "考官潜台词与深层考查目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "可直接套用的填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    },
    {
      "id": "uq-2",
      "stage": "第2問：上流要件定義・仕様境界折衝",
      "questionJp": "考官日语提问...",
      "questionZh": "提问中文翻译...",
      "intentHint": "考官潜台词与深层考查目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "可直接套用的填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    },
    {
      "id": "uq-3",
      "stage": "第3問：突発トラブル・納期逼迫への対応",
      "questionJp": "考官日语提问...",
      "questionZh": "提问中文翻译...",
      "intentHint": "考官潜台词与深层考查目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "可直接套用的填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    },
    {
      "id": "uq-4",
      "stage": "第4問：逆質問（クライアントへの問いかけ）",
      "questionJp": "考官日语提问...",
      "questionZh": "提问中文翻译...",
      "intentHint": "考官潜台词与深层考查目的...",
      "responseGuideZh": "【本题作答指引 · 请在回答中表达如下核心含义】：1. ...；2. ...",
      "templateScaffold": "可直接套用的填空句型骨架...",
      "keyPhrases": ["推荐表达1", "推荐表达2"]
    }
  ]
}`;

      const userPrompt = `【面试赛道】：${trackTitle}
【考核侧重点】：${trackFocus}
【目标难度级别】：${currentLevel.name}
请生成4道环环相扣的高水准面试题，输出纯合法 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.75, max_tokens: 2500 });

      return extractJson(reply);
    } finally {
      isLoading.value = false;
    }
  }

  // 3. AI 考官对学员逐题作答进行 5 维度深度诊断点评（100% 简体中文输出 + 精华提炼记忆卡）
  async function evaluateTurnResponse({ interviewerName, questionJp, candidateAnswer, contextInfo, level = 'n2_n1' }) {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const currentLevel = INTERVIEW_LEVELS.find(l => l.id === level) || INTERVIEW_LEVELS[2];

      const systemPrompt = `你是一位严谨而富有导师风范的日本IT商社现场面试官（姓名：${interviewerName || '考官'}）。
请对候选人在面试现场针对您提问的日文应答进行严格、专业、具建设性的深度多维点评。

【候选人当前级别要求】：
${currentLevel.name}（${currentLevel.desc}）

【重要语言输出规则（严格执行）】：
1. 【必须 100% 全部使用简体中文输出的字段】：
   - reaction: 考官现场第一反应与口头评价（必须使用地道亲切、专业的中文短评！严禁输出日文！例如：“回答思路非常沉稳，开篇致谢与垫句非常得体...”）
   - feedback.politeness: 敬语与礼仪规范深度中文点评（挑出用词或内外不分问题）
   - feedback.eq: 相手目线与商务情商深度中文分析（是否体谅客户、有无安心感）
   - feedback.logic: 逻辑严密性与方案落地深度中文分析（有无推诿、是否形成闭环）
   - masterpieceHighlights: 满分范例的精妙亮点点拨（中文解析）
   - goldenRule: 【一句话黄金沟通法则】（通俗易懂的中文沟通口诀，方便记忆）
   - pitfall: 【避坑提醒】（日企现场最忌讳的 1 个核心扣分雷区）
2. 【唯一必须使用纯正高级日文的字段】：
   - masterpiece: 考官针对该级别亲自示范的满分日文范例句子（必须是地道、纯正的高水准商务日语）
   - memoryPhrase: 核心必背日文金句（极简短精悍、可以直接拿来套用的高分日文短句，如「持ち帰って影響範囲を調査のうえ、ご相談させていただきます。」）

必须严格输出纯合法 JSON：
{
  "grade": "S",
  "gradeBadge": "S级 · 卓越顾问水准",
  "reaction": "考官现场第一反应与口头点评（必须全中文，亲切专业）",
  "feedback": {
    "politeness": "敬语规范度评价（全中文，分析敬语/谦让语/礼貌体是否得体）",
    "eq": "相手目线与情商（全中文，分析是否体谅对方、垫句是否到位）",
    "logic": "逻辑闭环与方案落地（全中文，分析方案可行性与风险意识）"
  },
  "masterpiece": "考官亲自示范的满分日文范例句子（高水准纯日文）...",
  "masterpieceHighlights": "满分范例亮点点拨（全中文）...",
  "goldenRule": "面对此类场景的一句话黄金沟通法则（通俗中文口诀，方便学员背诵）",
  "memoryPhrase": "核心必背日文金句（纯正精悍日文短句）",
  "pitfall": "日企现场最忌讳的1个核心避坑雷区（全中文说明）"
}

【评级参考】:
- S: 无懈可击，完美契合该级别要求，情商极高，给出闭环方案。
- A: 优秀合格，满足日企现场标准，表达清楚得体。
- B: 基本合格，但有少量语法瑕疵或表达略显生硬、缺少垫句。
- C: 触雷失礼，出现敬语混淆、轻率承诺或推卸责任风险。`;

      const userPrompt = `【面试背景】: ${contextInfo || '对日IT现场面试'}
【考核级别】: ${currentLevel.name}
【考官提问内容】:
${questionJp}

【候选人现场日文应答】:
"""
${candidateAnswer}
"""

请依据考官视角，给出纯合法 JSON 诊断评审报告。除 masterpiece 与 memoryPhrase 必须为高水准日文外，其余所有评析、提炼字段必须 100% 全部使用简体中文！`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.6, max_tokens: 2000 });

      return extractJson(reply);
    } finally {
      isLoading.value = false;
    }
  }

  // 4. 生成整场面试的日本商社标准录用判定书与实战速记手册
  async function generateFinalReport({ title, interviewer, questions, answers, evaluations, level = 'n2_n1' }) {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const currentLevel = INTERVIEW_LEVELS.find(l => l.id === level) || INTERVIEW_LEVELS[2];
      const turnsSummary = questions.map((q, idx) => {
        const ans = answers[q.id] || '(未作答)';
        const ev = evaluations[q.id] || {};
        return `[第${idx + 1}问 - ${q.stage}]\n考官提问: ${q.questionJp}\n候选人回答: ${ans}\n得分评级: ${ev.grade || 'B'}\n考官中文短评: ${ev.reaction || ''}`;
      }).join('\n---\n');

      const systemPrompt = `你是一位日本大手商社的IT统括人事总监。
请根据候选人在整场面试中的全部对谈表现，出具一份标准的【日本IT企业现场入场录用判定书】与【整场实战速记手册】。

【候选人考核级别】：${currentLevel.name}

【语言输出规则（严格执行）】：
- finalDecision: 保留日企录用标准汉字术语（如“内定・即戦力合格”）
- overallVerdict: 综合总评，必须全部使用流畅深刻的简体中文！
- strengths: 优势亮点列表，每条必须全部为简体中文！
- improvements: 待提升建议列表，每条必须全部为简体中文！
- distilledCheatSheet: 汇总每道题提炼出来的实战速记条目！

必须严格输出纯合法 JSON：
{
  "finalDecision": "内定・即戦力合格",
  "score": 93,
  "radar": {
    "politeness": 95,
    "empathy": 92,
    "logic": 90,
    "execution": 94
  },
  "overallVerdict": "考官综合总评（全中文，深入分析其商务风范与可靠度）...",
  "strengths": ["优势亮点1", "优势亮点2", "优势亮点3"],
  "improvements": ["待提升点1", "待提升点2"],
  "distilledCheatSheet": [
    {
      "stage": "题目阶段名称",
      "goldenRule": "该题一句话黄金法则",
      "memoryPhrase": "该题核心必背日文金句",
      "pitfall": "该题避坑雷区"
    }
  ]
}

【判定可能选项】:
- "内定・即戦力合格" (90~100分)
- "条件付き合格・現場配属可" (80~89分)
- "努力圏・要事前研修" (70~79分)
- "見送り・不採用" (70分以下)`;

      const userPrompt = `【面试类别】: ${title}
【考官】: ${interviewer?.name || '考官'} (${interviewer?.role || ''})
【考核级别】: ${currentLevel.name}
【对谈问答记录】:
${turnsSummary}

请出具终局综合录用判定书与实战速记卡片集，输出纯合法 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.6, max_tokens: 2200 });

      return extractJson(reply);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    isConfigured,
    INTERVIEW_LEVELS,
    UNIVERSAL_TRACKS,
    generateSceneInterview,
    generateUniversalInterview,
    evaluateTurnResponse,
    generateFinalReport
  };
}
