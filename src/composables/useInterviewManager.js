import { ref } from 'vue';
import { useQwen } from './useQwen.js';

export function useInterviewManager() {
  const { callChatCompletions, isConfigured } = useQwen();
  const isLoading = ref(false);

  // 1. 纯 AI 动态生成单课专属 3 道面试题
  async function generateSceneInterview(scene) {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const dialogueSnippet = scene.textbookText?.dialogue
        ? scene.textbookText.dialogue.slice(0, 5).map(t => `${t.speaker}: ${t.jp}`).join('\n')
        : '';
      const grammarSnippet = scene.grammarPoints
        ? scene.grammarPoints.map(g => g.title).join(', ')
        : '敬语与需求定义';

      const systemPrompt = `你是一位拥有15年经验的日本IT商社项目总监（兼任现场面试官）。
现在请针对学员正在学习的特定商务日语课程，为学员定制一场【3问递进式现场角色扮演模拟面试】。
请按以下规范输出纯合法的 JSON 格式（严禁在外部包裹任何其他文字）：
{
  "interviewer": {
    "name": "考官名字（如：田中部長 / 佐藤課長 / 吉田PM）",
    "role": "职务设定（契合当前课文客户或现场长官背景）",
    "avatar": "👔",
    "greeting": "初次见面的开场白日语句子（礼貌恭谨、点明今日会谈或面试主题）"
  },
  "questions": [
    {
      "id": "sq-1",
      "stage": "第1問：初動ヒアリングと自己紹介",
      "questionJp": "考官日文发问句子...",
      "questionZh": "中文考题含义解释...",
      "intentHint": "考查意图与核心点提示（如：重点考察能否运用最高级谦让语进行业务自介并切入业务痛点）"
    },
    {
      "id": "sq-2",
      "stage": "第2問：本課コアスキルと仕様確認",
      "questionJp": "考官日文发问句子...",
      "questionZh": "中文考题含义解释...",
      "intentHint": "考查意图与核心点提示（如：重点考察需求确认复述句型 つまり... ですね）"
    },
    {
      "id": "sq-3",
      "stage": "第3問：突発状況と相手目線の折衝",
      "questionJp": "考官日文发问句子...",
      "questionZh": "中文考题含义解释...",
      "intentHint": "考查意图与核心点提示（如：当客户提出超出式样范围的要求时，如何委婉使用クッション言葉带回评估）"
    }
  ]
}`;

      const userPrompt = `【当前课程背景】:
- 课程标题: ${scene.title}
- 业务背景: ${scene.background}
- 核心对白参考片段:
${dialogueSnippet}
- 语法重点: ${grammarSnippet}

请为本课生成一套专属的 3 题递进式 AI 角色扮演面试题目。输出纯合法 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.7, max_tokens: 2200 });

      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } finally {
      isLoading.value = false;
    }
  }

  // 2. 纯 AI 动态生成全场景终面 / 现场入场面试
  async function generateUniversalInterview(trackType = 'entry') {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const trackThemes = {
        entry: {
          name: '现场入场面试 (現場入場面接・スキルシート面談)',
          focus: '注重对日外包开发经验、报联相（報連相）沟通习惯、上流要件理解度与自驱力'
        },
        executive: {
          name: '高级SE/PM商务终面 (上級SE・PM役員面接)',
          focus: '注重客户博弈谈判、需求边界防雷、商业ROI价值提炼与高层信赖构建'
        },
        stress: {
          name: '突发危机压力面 (障害・納期トラブル対応面接)',
          focus: '注重生产事故应对流程、客户怒火情绪受容、分期交付协商（フェーズ分割）与防再发对策'
        }
      };

      const track = trackThemes[trackType] || trackThemes.entry;

      const systemPrompt = `你是一位日本头部大型SIer（如野村综研、NTT DATA级别）的现场统括部长兼终面主考官。
请为学员动态命制一套涵盖整个对日软件开发全生命周期的【4问全流程综合实战模拟面试】。
必须输出纯合法的 JSON 格式：
{
  "interviewer": {
    "name": "鈴木 統括PM",
    "role": "大手SIer 現場統括責任者 / 採用総括部長",
    "avatar": "💼",
    "greeting": "本日は面接のお時間をいただきありがとうございます。スキルシートを拝見しながら、実際のプロジェクト現場を想定した実践的な質問をさせていただきます。"
  },
  "trackTitle": "${track.name}",
  "questions": [
    {
      "id": "uq-1",
      "stage": "第1問：自己PRと対日IT実績",
      "questionJp": "日文提问...",
      "questionZh": "中文翻译...",
      "intentHint": "考查重点..."
    },
    {
      "id": "uq-2",
      "stage": "第2問：上流要件定義・仕様境界折衝",
      "questionJp": "日文提问...",
      "questionZh": "中文翻译...",
      "intentHint": "考查重点..."
    },
    {
      "id": "uq-3",
      "stage": "第3問：突発トラブル・納期逼迫への対応",
      "questionJp": "日文提问...",
      "questionZh": "中文翻译...",
      "intentHint": "考查重点..."
    },
    {
      "id": "uq-4",
      "stage": "第4問：逆質問（クライアントへの問いかけ）",
      "questionJp": "日文提问...",
      "questionZh": "中文翻译...",
      "intentHint": "考查重点..."
    }
  ]
}`;

      const userPrompt = `面试方向：${track.name}。重点要求：${track.focus}。请生成4道环环相扣的高水准面试题，输出纯 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.75, max_tokens: 2200 });

      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } finally {
      isLoading.value = false;
    }
  }

  // 3. AI 考官对学员逐题作答进行 5 维度深度诊断点评
  async function evaluateTurnResponse({ interviewerName, questionJp, candidateAnswer, contextInfo }) {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const systemPrompt = `你是一位日本资深IT商社现场面试官（姓名：${interviewerName || '考官'}）。
请对候选人在面试现场针对您提问的日文应答进行严格、专业、具建设性的深度多维点评。
必须输出纯合法的 JSON 格式（严禁外围包裹其他文字）：
{
  "grade": "S",
  "gradeBadge": "S级 · 顶级顾问水准",
  "reaction": "考官现场第一反应与点评（日语简述，体现日本考官的严谨与礼貌）",
  "feedback": {
    "politeness": "敬语规范度评价（尊敬语/谦让语是否得体，有无中式生硬表达）",
    "eq": "相手目线与商务情商（是否体谅对方处境、有无垫句、能否给人安心感）",
    "logic": "逻辑严密性与方案落地（有无清晰结构、代替案、风险闭环）"
  },
  "masterpiece": "考官亲自示范的满分日文范例句子...",
  "masterpieceHighlights": "满分范例的精妙亮点提炼..."
}

【评级标准参考】：
- S: 无懈可击，敬语极其地道自然，情商极高，给出双赢或闭环代替案。
- A: 优秀合格，满足日本现场标准，表达清楚得体。
- B: 基本合格，但有少量语法小瑕疵、语气略直白生硬或缺少缓冲垫。
- C: 触雷失礼，出现敬语混淆、轻率口头承诺或推卸责任风险。`;

      const userPrompt = `【面试情境背景】: ${contextInfo || '对日IT现场面试'}
【考官提问内容】:
${questionJp}

【候选人现场日文应答】:
"""
${candidateAnswer}
"""

请依据考官视角，给出纯 JSON 诊断评审报告。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.6, max_tokens: 1800 });

      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } finally {
      isLoading.value = false;
    }
  }

  // 4. 生成整场面试的日本商社标准终局综合判定书
  async function generateFinalReport({ title, interviewer, questions, answers, evaluations }) {
    if (!isConfigured.value) {
      throw new Error('NOT_CONFIGURED');
    }

    isLoading.value = true;
    try {
      const turnsSummary = questions.map((q, idx) => {
        const ans = answers[q.id] || '(未作答)';
        const ev = evaluations[q.id] || {};
        return `[第${idx + 1}问] 考官提问: ${q.questionJp}\n候选人回答: ${ans}\n得分评级: ${ev.grade || 'B'}`;
      }).join('\n---\n');

      const systemPrompt = `你是一位日本大手商社IT统括人事总监。
请根据候选人在整场面试中的全部问答表现，出具一份标准的【日本IT企业现场入场录用判定书】。
必须输出纯合法的 JSON 格式：
{
  "finalDecision": "内定・即戦力合格",
  "score": 93,
  "radar": {
    "politeness": 95,
    "empathy": 92,
    "logic": 90,
    "execution": 94
  },
  "overallVerdict": "考官综合总评（分析其整体商务风范、现场可靠度）...",
  "strengths": ["优势亮点1", "优势亮点2", "优势亮点3"],
  "improvements": ["待提升点1", "待提升点2"]
}

【判定可能选项】:
- "内定・即戦力合格" (90~100分)
- "条件付き合格・現場配属可" (80~89分)
- "努力圏・要事前研修" (70~79分)
- "見送り・不採用" (70分以下)`;

      const userPrompt = `【面试类别】: ${title}
【考官】: ${interviewer?.name || '考官'} (${interviewer?.role || ''})
【问答记录】:
${turnsSummary}

请出具终局综合判定书，输出合法 JSON。`;

      const reply = await callChatCompletions([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], { temperature: 0.6, max_tokens: 1600 });

      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    isConfigured,
    generateSceneInterview,
    generateUniversalInterview,
    evaluateTurnResponse,
    generateFinalReport
  };
}
