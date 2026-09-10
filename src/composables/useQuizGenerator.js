import { ref } from 'vue';
import { useQwen } from './useQwen.js';

// 预制单课种子题库字典 (覆盖各课语法选择、词块排序与业务情境题)
export const SCENE_SEED_QUIZZES = {
  "scene-1": [
    {
      id: "s1-seed-1",
      type: "choice",
      category: "敬语与礼仪",
      question: "在首次与日本客户高管（田中部长）面谈时，向对方了解营业部门痛点，下列哪句表达最得体且具专业水准？",
      options: [
        "A. うちの営業部門の課題を教えてください。",
        "B. 田中部長のIT化のご要件について伺わせていただきます。",
        "C. どこが業務のボトルネックか聞きたいです。",
        "D. どんなシステムを作れば満足しますか。"
      ],
      correct: 1,
      explanation: "【答案是 B】运用「ご要件について伺わせていただきます（允许我向您请教需求）」，结合了最高级谦让意向与恭敬体，是初次面见客户决策层的标准满分范例。A、C过于直白生硬，D是毫无情商的菜鸟提问。"
    },
    {
      id: "s1-seed-2",
      type: "ordering",
      category: "词块排序",
      question: "【词块拼装】请将下列打散的商务名号自介片段排成正确顺序：",
      tokens: ["李と申します。", "ソフトウェア設計を", "担当しています。", "初めまして、〇〇社の"],
      correctOrder: ["初めまして、〇〇社の", "李と申します。", "ソフトウェア設計を", "担当しています。"],
      explanation: "【标准顺序】「初めまして、〇〇社の ➜ 李と申します。 ➜ ソフトウェア設計を ➜ 担当しています。」商务初次见面遵循【致意名号 ➜ 报姓名谦让 ➜ 表明具体职责】的标准递进结构。"
    },
    {
      id: "s1-seed-3",
      type: "choice",
      category: "定量需求挖掘",
      question: "「営業担当者によってばらつきがありますが、平均して1件＿＿2時間程度かかっています。」横线上应填入哪个助词/接尾词？",
      options: [
        "A. にて",
        "B. あたり",
        "C. くらい",
        "D. ほど"
      ],
      correct: 1,
      explanation: "【答案是 B】接在数量名词后表示基准平均耗时时使用「〜あたり」。「1件あたり2時間」即每件平均耗时2小时。"
    }
  ],
  "scene-2": [
    {
      id: "s2-seed-1",
      type: "choice",
      category: "要件确认",
      question: "向客户确认核心诉求时，使用哪种句型最能体现“倾听受容（相手目線）”并锁定关键目标？",
      options: [
        "A. おっしゃる通り、要件は以上ですね。",
        "B. つまり、見積もり作成時間の半减と商談履歴の一元化が最優先課題ですね。",
        "C. 本当に1時間で十分ですか。",
        "D. システムを作れば勝手に解決します。"
      ],
      correct: 1,
      explanation: "【答案是 B】用「つまり、〜が最優先課題ですね」将客户散碎的口头诉求抽象升华为高层指标（减半与一元化），既体现了高情商复述，又锁定了项目ROI。"
    },
    {
      id: "s2-seed-2",
      type: "ordering",
      category: "词块排序",
      question: "【词块拼装】请将后续工作安排的确认句按日企标准流程排好顺序：",
      tokens: ["要件確認書をお持ちしますが、", "整理し、来週までに", "本日お伺いした内容を", "よろしいでしょうか。"],
      correctOrder: ["本日お伺いした内容を", "整理し、来週までに", "要件確認書をお持ちしますが、", "よろしいでしょうか。"],
      explanation: "【标准顺序】「本日お伺いした内容を ➜ 整理し、来週までに ➜ 要件確認書をお持ちしますが、 ➜ よろしいでしょうか。」形成【梳理今日要点 ➜ 明确下周纳期 ➜ 提交书面确认书 ➜ 征求对方首肯】的闭环。"
    },
    {
      id: "s2-seed-3",
      type: "choice",
      category: "敬语辨析",
      question: "下周再次拜访客户办公室确认需求书时，李应该说哪句话？",
      options: [
        "A. 来週の水曜日にまた来ます。",
        "B. 来週の水曜日の同じ時間に改めてお伺いします。",
        "C. 水曜日に参上いたしますから待ってください。",
        "D. 来週書類を取りに行きます。"
      ],
      correct: 1,
      explanation: "【答案是 B】「改めてお伺いします」是再次拜访客户的标准礼貌表达；A太随意；C用参上过于陈旧生硬；D本末倒置。"
    }
  ],
  "scene-11": [
    {
      id: "s11-seed-1",
      type: "choice",
      category: "式样边界防雷",
      question: "当客户口头提出“这里能不能顺便加个导出Excel功能”时，对日IT工程师最严密的答复是？",
      options: [
        "A. はい、簡単ですからすぐやります。",
        "B. できかねます。仕様書にありません。",
        "C. ご要望として持ち帰り、影響範囲と追加工数を確認の上、ご相談させていただけますでしょうか。",
        "D. 別途お金がかかります。"
      ],
      correct: 2,
      explanation: "【答案是 C】绝对不能口头轻率答应（A），也不能生硬顶撞（B、D）。使用クッション言葉带回评估影响范围（影響範囲）和追加工数，是成熟SE的标准对策。"
    },
    {
      id: "s11-seed-2",
      type: "ordering",
      category: "词块排序",
      question: "【词块拼装】请组装向客户解释非功能性能指标重要性的句子：",
      tokens: ["システムの安定稼働には", "レスポンス速度の定義が", "不可欠でございます。", "ピーク時における"],
      correctOrder: ["システムの安定稼働には", "ピーク时における", "レスポンス速度の定義が", "不可欠でございます。"],
      explanation: "【标准顺序】「システムの安定稼働には ➜ ピーク時における ➜ レスポンス速度の定義が ➜ 不可欠でございます。」明确了业务稳定性与峰值响应速度的不可分割性。"
    },
    {
      id: "s11-seed-3",
      type: "choice",
      category: "术语理解",
      question: "日企客户常说的「要件が固まる」是指什么阶段状态？",
      options: [
        "A. 系统数据库发生死锁",
        "B. 需求定义已敲定/冻结，后续变更需走式样变更流程",
        "C. 客户预算被上级否决",
        "D. 双方关系僵持不下"
      ],
      correct: 1,
      explanation: "【答案是 B】「要件が固まる」指需求基线正式确定并冻结，意味着后续追加需求不可口头随意变更。"
    }
  ],
  "scene-23": [
    {
      id: "s23-seed-1",
      type: "choice",
      category: "交付风险化解",
      question: "在交付大限不可推迟的前提下，面临功能开发工数超标，最佳应对策略是？",
      options: [
        "A. 全员连续通宵加班赶工",
        "B. 暗中缩减测试工数提前上线",
        "C. 提出分期发布方案（フェーズ分割）：核心基础功能保首期，高级算法顺延第二期",
        "D. 告诉客户系统做不完，取消项目"
      ],
      correct: 2,
      explanation: "【答案是 C】两阶段上线（フェーズ分割リリース）既死守客户董事会的上线大限，又保住了软件品质与长远信任。"
    },
    {
      id: "s23-seed-2",
      type: "ordering",
      category: "词块排序",
      question: "【词块拼装】请拼出建议分期上线的提案句子：",
      tokens: ["機能をフェーズ分割し、", "ご提案いたします。", "段階的にリリースする方針を", "基本機能を先行して"],
      correctOrder: ["機能をフェーズ分割し、", "基本機能を先行して", "段階的にリリースする方針を", "ご提案いたします。"],
      explanation: "【标准顺序】「機能をフェーズ分割し、 ➜ 基本機能を先行して ➜ 段階的にリリースする方針を ➜ ご提案いたします。」"
    },
    {
      id: "s23-seed-3",
      type: "choice",
      category: "敬语与情商",
      question: "在向客户高层说明妥协方案时，开头使用哪句クッション言葉最能平息客户焦虑？",
      options: [
        "A. 言いにくいのですが…",
        "B. 納期厳守を最優先に考えました結果、一つの現実的なご提案がございます。",
        "C. 仕方がないのでこれにしてください。",
        "D. 御社の要求が高すぎるため…"
      ],
      correct: 1,
      explanation: "【答案是 B】表明“将守住客户交付大限作为最高优先级考虑”的前提下给出建设性方案，瞬间赢得客户高层尊重。"
    }
  ]
};

// 预制全场景实战综合竞技场种子题 (包含选择、逻辑排序与开放式简答题)
export const UNIVERSAL_SEED_QUIZZES = [
  {
    id: "univ-seed-1",
    type: "choice",
    category: "危机公关",
    situation: "验收测试阶段，日本客户部长发现某核心统计结果与旧系统有1分钱的舍入差异，在定例会上严厉质问：“这还怎么向财务交代？你们的测试到底怎么做的？！”",
    question: "作为对日IT项目经理（PM），以下哪种第一反应最具情商与专业度？",
    options: [
      "A. 「たった1円の差ですし、アルゴリズムの仕様上正常です。」",
      "B. 「ご不安な思いをおかけし大変申し訳ございません。直ちに旧システムの端数処理ロジックと突き合わせ、差異原因と修正影響範囲を本日中にご報告いたします。」",
      "C. 「仕様書に四捨五入と書いてあるので、そちらの設計ミスではないですか。」",
      "D. 「今から直すとお金がかかりますがよろしいですか。」"
    ],
    correct: 1,
    explanation: "【最佳对策是 B】面对日本客户财务相关敏感问题：①先真诚受容客户的不安情绪；②绝不推卸责任；③给出具体行动承诺（比对舍入ロジック、查清原因及影响范围、定死汇报时限【本日中】）。A极其敷衍；C甩锅客户；D火上浇油。"
  },
  {
    id: "univ-seed-2",
    type: "ordering",
    category: "事故汇报逻辑",
    question: "【业务流程排序】线上生产环境发生重大系统故障（障害発生）时，向日本客户提交障害报告的正确时间线顺序是：",
    tokens: [
      "③ 障害の暫定回避策の提示（临时规避策，先让业务恢复运转）",
      "① 事象の第一報と影響範囲の特定（初报现状与受损范围）",
      "④ 恒久対策と再発防止策の書面提出（根本修复与防再发对策）",
      "② 根本原因の究明（故障深层Root Cause分析）"
    ],
    correctOrder: [
      "① 事象の第一報と影響範囲の特定（初报现状与受损范围）",
      "③ 障害の暫定回避策の提示（临时规避策，先让业务恢复运转）",
      "② 根本原因の究明（故障深层Root Cause分析）",
      "④ 恒久対策と再発防止策の書面提出（根本修复与防再发对策）",
    ],
    explanation: "【对日IT危机处理铁律】①立即发第一报控制事态；②先做暂定回避（ワークアラウンド）让客户业务跑起来；③深入排查根本原因；④输出书面再发防止策并汇报社长。"
  },
  {
    id: "univ-seed-3",
    type: "essay",
    category: "实战简答挑战",
    situation: "【现场突发情境】：周五傍晚，日本客户担当佐藤小姐紧急私信您：“李桑，营业部董事突然要求下周一早会必须展示新增的销售预测图表，式样虽然还没确定，但能否请你们周末辛苦加班赶出来？”",
    question: "【开放式简答】作为SE李，既不能口头随意答应加班违规赶工（导致式样未定引发后续纠纷），又不能直接回绝伤害信任。请在输入框键入您的日文回复：",
    sampleAnswer: "佐藤様、緊急のご連絡をいただきありがとうございます。取締役会へのご報告という重要性は重々承知いたしました。ただ、仕様が未確定のまま実装いたしますと、週明けの数値に誤りが生じかえってご迷惑をおかけするリスクがございます。そこで、現時点で確定している実績データを用いたダミー画面を月曜朝用にご用意し、予測ロジックの詳細については月曜午前に確認させていただいた上で開発を進める方針はいかがでしょうか。",
    rubric: "评估要点：1. 体谅对方紧急处境；2. 理性指出未定式样强行上线的重大数据风险；3. 给出双赢替代方案（用确定数据做临时效果演示，避免周末盲目赶工）。",
    explanation: "【名师点拨】对日商务谈判精髓：“No”字绝不出口，用“为了客户的数据安全风险考虑（相手目線）”作为缓冲垫，同时奉上“次优替代方案（代替案）”。"
  }
];

export function useQuizGenerator() {
  const { callChatCompletions } = useQwen();
  const isGenerating = ref(false);

  // 获取某单课的预制种子题
  function getSeedSceneQuiz(scene) {
    const key = `scene-${scene.sceneNumber}`;
    if (SCENE_SEED_QUIZZES[key]) {
      return JSON.parse(JSON.stringify(SCENE_SEED_QUIZZES[key]));
    }
    // 兜底返回场景1的题目
    return JSON.parse(JSON.stringify(SCENE_SEED_QUIZZES["scene-1"]));
  }

  // 获取全场景综合竞技场预制种子题
  function getUniversalSeedQuiz() {
    return JSON.parse(JSON.stringify(UNIVERSAL_SEED_QUIZZES));
  }

  // AI 针对当前课动态无限生成 3 道题
  async function generateSceneQuiz(scene) {
    isGenerating.value = true;
    try {
      const systemPrompt = `你是一位严谨资深的对日IT外包软件工程培训专家与商务日语考官。
请根据提供的日企商务日语教材场景信息，为学员生成严格契合本课核心语境的【3道专项强化题】。
题型必须包含且仅包含以下3种，格式必须是纯严格的 JSON 数组（不要包含任何 markdown 代码块外部的多余文本）：
1. 语法/敬语辨析单选题 (type: "choice")
2. 词块点击排序题 (type: "ordering"，提供打散的4-5个短语 tokens 和 correctOrder 数组)
3. 业务对话与客户心理理解题 (type: "choice")

返回 JSON 格式规范：
[
  {
    "id": "ai-gen-1",
    "type": "choice",
    "category": "语法/敬语辨析",
    "question": "题干内容...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correct": 0,
    "explanation": "深度策略拆解..."
  },
  {
    "id": "ai-gen-2",
    "type": "ordering",
    "category": "词块结构排序",
    "question": "请将下列词块组装成符合本课商务规范的日语句子：",
    "tokens": ["片段1", "片段2", "片段3", "片段4"],
    "correctOrder": ["片段2", "片段1", "片段4", "片段3"],
    "explanation": "语序递进逻辑解析..."
  },
  {
    "id": "ai-gen-3",
    "type": "choice",
    "category": "商务对白与潜台词",
    "question": "题干内容...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correct": 1,
    "explanation": "解析..."
  }
]`;

      const userPrompt = `【当前课程信息】:
- 场景编号与标题: ${scene.title}
- 业务领域与背景: ${scene.background}
- 核心课文关键对白:
${scene.textbookText?.dialogue ? scene.textbookText.dialogue.slice(0, 5).map(t => `${t.speaker}: ${t.jp} (${t.zh})`).join('\n') : ''}
- 语法重点: ${scene.grammarPoints ? scene.grammarPoints.map(g => g.title).join(', ') : '敬语与要件定义'}

请基于上述内容，生成 3 道高质量题目，直接输出合法的 JSON 字符串。`;

      const reply = await callChatCompletions([
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ], { temperature: 0.7, max_tokens: 2000 });

      // 解析 JSON
      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 3);
      }
      return getSeedSceneQuiz(scene);
    } catch (err) {
      console.warn('AI 生成单课题目失败，自动优雅降级使用预制种子题:', err);
      return getSeedSceneQuiz(scene);
    } finally {
      isGenerating.value = false;
    }
  }

  // AI 跨场景综合无限生成 3 道题 (包含简答题)
  async function generateUniversalQuiz() {
    isGenerating.value = true;
    try {
      const systemPrompt = `你是一位拥有15年对日IT外包与离岸软件研发经验的项目总监兼中日商务礼仪高级考官。
请为正在备战对日IT现场的学员生成【3道跨场景高阶实战对决题目】。
3道题目类型固定为：
1. 现场危机应对/谈判博弈单选题 (type: "choice")
2. 商务突发流程排序题 (type: "ordering"，打散的4个步骤 tokens 与正确顺序 correctOrder)
3. 极高含金量的开放式简答题 (type: "essay"，给出尖锐的客户冲突情境 situation、指令 question、满分参考范例 sampleAnswer、评分要点 rubric)

直接输出合法 JSON 数组：
[
  {
    "id": "univ-gen-1",
    "type": "choice",
    "category": "跨场景对决",
    "situation": "场景描述...",
    "question": "提问...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correct": 0,
    "explanation": "解析..."
  },
  {
    "id": "univ-gen-2",
    "type": "ordering",
    "category": "流程逻辑排序",
    "question": "题干...",
    "tokens": ["① ...", "② ...", "③ ...", "④ ..."],
    "correctOrder": ["② ...", "① ...", "④ ...", "③ ..."],
    "explanation": "流程解析..."
  },
  {
    "id": "univ-gen-3",
    "type": "essay",
    "category": "实战简答挑战",
    "situation": "客户突然提出紧急诉求...",
    "question": "请用日语写出得体回答：",
    "sampleAnswer": "标准日文满分回答...",
    "rubric": "评分参考标准...",
    "explanation": "名师指点..."
  }
]`;

      const userPrompt = `请生成 3 道涵盖对日开发上流要件定义、变更要求、障害报告或纳期博弈的综合实战题目。输出合法 JSON。`;

      const reply = await callChatCompletions([
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ], { temperature: 0.75, max_tokens: 2200 });

      let cleaned = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 3);
      }
      return getUniversalSeedQuiz();
    } catch (err) {
      console.warn('AI 生成全场景题目失败，降级使用种子题:', err);
      return getUniversalSeedQuiz();
    } finally {
      isGenerating.value = false;
    }
  }

  // 评测简答题主观输入
  async function gradeEssayAnswer({ question, situation, userText, sampleAnswer, rubric }) {
    const systemPrompt = `你是一位日本一线IT商社高级总监兼中日商务日语考官。
请对学员针对客户提问做出的日文简答进行严谨、专业、多维度的评审诊断。
请按以下结构用清晰优美的 Markdown 格式输出诊断报告：

### 🎯 综合评级：【S / A / B / C】
（S: 顶级商务顾问，情商与策略无懈可击 / A: 合格商务IT员工 / B: 语法尚可但有中式日语痕迹或缺少缓冲 / C: 严重失礼或带来重大交付风险）

### 🧐 敬语与礼貌诊断
指出回答中的敬语准确度（内外分寸、尊敬语/谦让语是否混淆、有无轻率承诺）。

### 💼 客户心理与商务情商
分析站在日本客户立场：此回答能否让人安心（相手目線）？有无体现“倾听受容（クッション言葉）”与“控制风险（リスクヘッジ）”？

### 💎 大师级满分改写
给出一段最地道、最让日本客户折服的满分日文范例，并标出改写关键亮点。`;

    const userPrompt = `【业务冲突情境】: ${situation || '客户会谈'}
【考题指令要求】: ${question}
【满分参考依据】: ${sampleAnswer || ''}
【评分参考要点】: ${rubric || ''}

【学员输入的日文发言】:
"""
${userText}
"""

请对学员发言给出专业评分与诊断报告。`;

    return await callChatCompletions([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ], { temperature: 0.6, max_tokens: 1600 });
  }

  return {
    isGenerating,
    getSeedSceneQuiz,
    getUniversalSeedQuiz,
    generateSceneQuiz,
    generateUniversalQuiz,
    gradeEssayAnswer
  };
}
