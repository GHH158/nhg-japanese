<script setup>
import { ref, computed } from 'vue';
import { BATTLE_QUIZ_DATA } from '../data/battle-quiz.js';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';
import { useQuizGenerator } from '../composables/useQuizGenerator.js';
import { useQwen } from '../composables/useQwen.js';

const emit = defineEmits(['ask-ai']);

const { speak } = useAudioPlayer();
const { renderMarkdown } = useQwen();
const { isGenerating, getUniversalSeedQuiz, generateUniversalQuiz, gradeEssayAnswer } = useQuizGenerator();

const allQuestions = BATTLE_QUIZ_DATA.questions || [];
const categories = BATTLE_QUIZ_DATA.metadata?.categories || [];

const selectedCategory = ref('all');
const currentMode = ref('quick10'); // 'quick10' | 'exam20' | 'all60' | 'weakness' | 'ai3'
const currentIndex = ref(0);
const userAnswers = ref({}); // { [qId]: { selectedIndex?, userOrder?, isCorrect, answered: true } }
const weaknessIds = ref(new Set());
const sessionScore = ref(0);
const sessionStreak = ref(0);

// AI 跨场景自生题库 (3题一轮)
const aiQuestionList = ref([]);

// 排序题草稿
const orderingDrafts = ref({}); // { [qId]: string[] }

// 简答题状态
const essayInputs = ref({}); // { [qId]: string }
const essayReports = ref({}); // { [qId]: string (markdown) }
const essayGrading = ref({}); // { [qId]: boolean }
const showEssaySample = ref({}); // { [qId]: boolean }

const activeQuestionPool = computed(() => {
  if (currentMode.value === 'ai3') {
    return aiQuestionList.value;
  }
  let list = [...allQuestions];
  if (selectedCategory.value !== 'all') {
    list = list.filter(q => q.category === selectedCategory.value);
  }
  if (currentMode.value === 'weakness') {
    list = list.filter(q => weaknessIds.value.has(q.id));
  } else if (currentMode.value === 'quick10') {
    list = list.slice(0, 10);
  } else if (currentMode.value === 'exam20') {
    list = list.slice(0, 20);
  }
  return list;
});

const currentQuestion = computed(() => activeQuestionPool.value[currentIndex.value] || null);

function setMode(mode) {
  currentMode.value = mode;
  currentIndex.value = 0;
  userAnswers.value = {};
  orderingDrafts.value = {};
  essayInputs.value = {};
  essayReports.value = {};
  showEssaySample.value = {};
  sessionScore.value = 0;
  sessionStreak.value = 0;

  if (mode === 'ai3' && aiQuestionList.value.length === 0) {
    aiQuestionList.value = getUniversalSeedQuiz();
  }
}

async function handleRefreshUniversalAi() {
  currentIndex.value = 0;
  userAnswers.value = {};
  orderingDrafts.value = {};
  essayInputs.value = {};
  essayReports.value = {};
  showEssaySample.value = {};
  sessionScore.value = 0;
  sessionStreak.value = 0;

  const res = await generateUniversalQuiz();
  if (res && res.length > 0) {
    aiQuestionList.value = res;
  }
}

function setCategory(catId) {
  selectedCategory.value = catId;
  currentIndex.value = 0;
}

// 选择题选项点击
function handleSelectOpt(q, optIndex) {
  if (userAnswers.value[q.id] !== undefined) return;
  const isCorrect = (optIndex === q.correct);
  userAnswers.value[q.id] = { selectedIndex: optIndex, isCorrect, answered: true };

  if (isCorrect) {
    sessionScore.value += 10;
    sessionStreak.value += 1;
    weaknessIds.value.delete(q.id);
  } else {
    sessionStreak.value = 0;
    weaknessIds.value.add(q.id);
  }
}

// 排序题交互
function getDraftTokens(qId) {
  if (!orderingDrafts.value[qId]) {
    orderingDrafts.value[qId] = [];
  }
  return orderingDrafts.value[qId];
}

function getAvailableTokens(q) {
  const drafted = getDraftTokens(q.id);
  const remaining = [...q.tokens];
  for (const item of drafted) {
    const idx = remaining.indexOf(item);
    if (idx !== -1) {
      remaining.splice(idx, 1);
    }
  }
  return remaining;
}

function handleAddToken(q, token) {
  if (userAnswers.value[q.id]) return;
  getDraftTokens(q.id).push(token);
}

function handleRemoveToken(q, index) {
  if (userAnswers.value[q.id]) return;
  getDraftTokens(q.id).splice(index, 1);
}

function handleResetOrdering(q) {
  if (userAnswers.value[q.id]) return;
  orderingDrafts.value[q.id] = [];
}

function handleCheckOrdering(q) {
  if (userAnswers.value[q.id]) return;
  const drafted = getDraftTokens(q.id);
  if (drafted.length !== q.tokens.length) return;

  const isCorrect = JSON.stringify(drafted) === JSON.stringify(q.correctOrder);
  userAnswers.value[q.id] = {
    userOrder: [...drafted],
    isCorrect,
    answered: true
  };
  if (isCorrect) {
    sessionScore.value += 10;
    sessionStreak.value += 1;
  } else {
    sessionStreak.value = 0;
  }
}

// 简答题 AI 诊断评审
async function handleSubmitEssay(q) {
  const text = (essayInputs.value[q.id] || '').trim();
  if (!text || essayGrading.value[q.id]) return;

  essayGrading.value[q.id] = true;
  try {
    const report = await gradeEssayAnswer({
      question: q.prompt || q.question,
      situation: q.context || q.situation,
      userText: text,
      sampleAnswer: q.sampleAnswer,
      rubric: q.rubric
    });
    essayReports.value[q.id] = report;
    userAnswers.value[q.id] = {
      userText: text,
      isCorrect: true,
      answered: true
    };
    sessionScore.value += 10;
    sessionStreak.value += 1;
  } catch (err) {
    essayReports.value[q.id] = `⚠️ AI 诊断调用超时或失败，请检查设置。您可直接参考下方标准范例。`;
    userAnswers.value[q.id] = { answered: true, isCorrect: true };
  } finally {
    essayGrading.value[q.id] = false;
  }
}

function handlePrev() {
  if (currentIndex.value > 0) currentIndex.value--;
}

function handleNext() {
  if (currentIndex.value < activeQuestionPool.value.length - 1) currentIndex.value++;
}

function handlePlayDialogue(q) {
  if (q.dialogue) {
    speak(q.dialogue, null, `q-${q.id}`);
  }
}

function handlePlayKeyPhrase(phrase) {
  if (phrase?.jp) {
    speak(phrase.jp, null, null);
  }
}

function handleAskAi(q) {
  emit('ask-ai', {
    speaker: q.speaker || '日本客户 / 实战考题情境',
    jp: q.dialogue || q.prompt || q.question,
    zh: `${q.prompt || q.question}\n【对战考点分类】: ${q.categoryName || q.categoryBadge || q.category || ''}\n【标准策略】: ${typeof q.explanation === 'object' ? (q.explanation.strategy || '') : (q.explanation || '')}`,
    keyNote: `情境：${q.context || q.situation || q.sceneTag || '跨场景实战综合'}`
  });
}

function hasOptionAnalysis(q) {
  return q.options && q.options.some(o => typeof o === 'object' && o.analysis);
}
</script>

<template>
  <div class="battle-arena-section" style="margin-top: 1rem;">
    <!-- 顶栏标题 -->
    <div class="battle-title-area">
      <div class="battle-main-badge">
        <span class="battle-badge-tag">⚔️ BATTLE DRILL</span>
        <span>对日IT全场景实战刷题大竞技场</span>
      </div>
      <p class="battle-subtitle">
        跨越所有课文边界 · 覆盖5大实战战力维度 · 模拟日本客户现场交锋与心理拆解 · AI无限动态出题
      </p>
    </div>

    <!-- 模式与分类筛选栏 -->
    <div class="battle-toolbar">
      <div class="battle-mode-group">
        <button
          :class="['battle-mode-btn', { active: currentMode === 'quick10' }]"
          @click="setMode('quick10')"
        >
          ⚡ 10题速刷
        </button>
        <button
          :class="['battle-mode-btn', { active: currentMode === 'exam20' }]"
          @click="setMode('exam20')"
        >
          📝 20题模考
        </button>
        <button
          :class="['battle-mode-btn', { active: currentMode === 'all60' }]"
          @click="setMode('all60')"
        >
          🔥 全部60题
        </button>
        <button
          :class="['battle-mode-btn', { active: currentMode === 'weakness' }]"
          @click="setMode('weakness')"
        >
          ❌ 错题消消乐 ({{ weaknessIds.size }})
        </button>
        <button
          :class="['battle-mode-btn', { active: currentMode === 'ai3' }]"
          style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; border: none; font-weight: 800;"
          @click="setMode('ai3')"
        >
          🤖 AI 跨场景无限出题 (3题/轮)
        </button>
      </div>

      <!-- AI 模式下的刷新出题工具条 -->
      <div v-if="currentMode === 'ai3'" style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 0.6rem 1rem;">
        <span style="font-size: 0.85rem; color: #1e40af; font-weight: 600;">
          💡 AI 每次融合全书知识点跨场景生成 3 道硬核实战题（含危机对决、流程排序与主观简答）
        </span>
        <button
          class="play-full-btn"
          style="background: #1e3a8a; color: white; padding: 0.35rem 0.8rem; font-size: 0.82rem;"
          :disabled="isGenerating"
          @click="handleRefreshUniversalAi"
        >
          <span>{{ isGenerating ? 'AI 正在跨场景命题...' : '🤖 换一批 AI 跨场景新题 (3题)' }}</span>
        </button>
      </div>

      <!-- 维度分类筛选（常规刷题模式） -->
      <div v-else class="battle-category-group" style="margin-top: 0.6rem; display: flex; gap: 0.4rem; overflow-x: auto;">
        <button
          :class="['filter-chip', { active: selectedCategory === 'all' }]"
          @click="setCategory('all')"
        >
          全部维度
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter-chip', { active: selectedCategory === cat.id }]"
          @click="setCategory(cat.id)"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- 进度条与对决数据 -->
    <div v-if="activeQuestionPool.length" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem;">
        <span>第 {{ currentIndex + 1 }} / {{ activeQuestionPool.length }} 题</span>
        <span style="color: #059669;">🔥 连对：{{ sessionStreak }} · 得分：{{ sessionScore }}</span>
      </div>
      <div style="height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
        <div
          :style="{ width: `${((currentIndex + 1) / activeQuestionPool.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', transition: 'width 0.3s' }"
        ></div>
      </div>
    </div>

    <!-- 题目卡片容器 -->
    <div class="battle-arena-card" style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
      <div v-if="!currentQuestion" style="text-align: center; padding: 3rem 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">🎉</div>
        <h4 style="font-size: 1.2rem; font-weight: 700; color: #065f46;">暂无待攻克的题目！</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
          {{ currentMode === 'weakness' ? '恭喜！您的错题本已全部清空！' : '当前题库暂无题目，建议切换其他模式或点击AI出题。' }}
        </p>
      </div>

      <div v-else class="battle-q-box">
        <!-- 标签行 -->
        <div class="battle-q-meta-badges">
          <span :class="['q-category-pill', `cat-${currentQuestion.category || 'general'}`]">
            {{ currentQuestion.categoryName || currentQuestion.categoryBadge || currentQuestion.category || '综合对战' }}
          </span>
          <span v-if="currentQuestion.sceneTag" class="q-scene-pill">
            📍 {{ currentQuestion.sceneTag }}
          </span>
          <span v-else class="q-scene-pill">
            {{ currentQuestion.type === 'essay' ? '✍️ 开放简答题' : (currentQuestion.type === 'ordering' ? '🧩 流程排序题' : '🔘 现场选择题') }}
          </span>
          <span v-if="currentQuestion.difficulty" :class="['q-difficulty-pill', `diff-${currentQuestion.difficulty}`]">
            {{ currentQuestion.difficulty }}
          </span>
          <button
            class="btn-turn-ai-tutor"
            style="margin-left: auto;"
            @click="handleAskAi(currentQuestion)"
            title="向AI私教深入提问此考题背景与客户心理"
          >
            <span>🤖 问AI私教此题</span>
          </button>
        </div>

        <!-- 场景发言气泡（如果存在角色、情境或对白） -->
        <div v-if="currentQuestion.context || currentQuestion.dialogue || currentQuestion.situation" class="scenario-bubble-card">
          <div class="scenario-speaker-header">
            <span class="scenario-speaker-avatar">{{ currentQuestion.speakerAvatar || '👨‍💼' }}</span>
            <div class="scenario-speaker-info">
              <span class="scenario-speaker-name">{{ currentQuestion.speaker || '日本客户现场交锋' }}</span>
              <span class="scenario-speaker-role">{{ currentQuestion.speakerRole || currentQuestion.situation || '' }}</span>
            </div>
            <button
              v-if="currentQuestion.dialogue"
              class="btn-speak-clause"
              style="margin-left: auto;"
              @click="handlePlayDialogue(currentQuestion)"
              title="听客户原声"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
          <div v-if="currentQuestion.context" class="scenario-context-text" style="font-size: 0.88rem; color: #475569; margin: 0.5rem 0; line-height: 1.5;">
            {{ currentQuestion.context }}
          </div>
          <div v-if="currentQuestion.dialogue" class="scenario-quote-box">
            <div class="scenario-quote-text" v-html="currentQuestion.dialogueWithRuby || currentQuestion.dialogue"></div>
          </div>
        </div>

        <!-- 提问指令 -->
        <div class="battle-prompt-box">
          <span class="battle-prompt-icon">⚡</span>
          <div class="battle-prompt-text">{{ currentQuestion.prompt || currentQuestion.question }}</div>
        </div>

        <!-- 题型 1：选择题 (Choice) -->
        <div v-if="!currentQuestion.type || currentQuestion.type === 'choice'" class="battle-options-list">
          <button
            v-for="(opt, optIdx) in currentQuestion.options"
            :key="optIdx"
            :class="[
              'battle-opt-btn',
              {
                'opt-correct': userAnswers[currentQuestion.id] && optIdx === currentQuestion.correct,
                'opt-wrong': userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].selectedIndex === optIdx && optIdx !== currentQuestion.correct
              }
            ]"
            :disabled="userAnswers[currentQuestion.id] !== undefined"
            @click="handleSelectOpt(currentQuestion, optIdx)"
          >
            <div class="opt-letter-badge">
              {{ typeof opt === 'object' && opt.label ? opt.label : ['A', 'B', 'C', 'D'][optIdx] }}
            </div>
            <div class="opt-text-wrap" style="flex: 1;">
              <div
                class="opt-sentence-jp"
                v-html="typeof opt === 'object' ? (opt.textWithRuby || opt.text) : opt"
              ></div>
            </div>
            <span
              v-if="userAnswers[currentQuestion.id] && optIdx === currentQuestion.correct"
              class="opt-status-tag"
            >
              ✅ 最佳对策
            </span>
            <span
              v-else-if="userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].selectedIndex === optIdx"
              class="opt-status-tag"
            >
              ❌ 触雷选项
            </span>
          </button>
        </div>

        <!-- 题型 2：词块/流程排序题 (Ordering) -->
        <div v-else-if="currentQuestion.type === 'ordering'" class="ordering-puzzle-box" style="margin-top: 1rem;">
          <!-- 作答槽区 -->
          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center;">
              <span>📥 您的流程顺序：</span>
              <button
                v-if="!userAnswers[currentQuestion.id] && getDraftTokens(currentQuestion.id).length > 0"
                class="btn-skip-input"
                style="font-size: 0.76rem; padding: 0.2rem 0.5rem; background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer;"
                @click="handleResetOrdering(currentQuestion)"
              >
                🔄 清空重排
              </button>
            </div>

            <div
              style="min-height: 56px; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; background: #f8fafc;"
              :style="{
                borderColor: userAnswers[currentQuestion.id]
                  ? (userAnswers[currentQuestion.id].isCorrect ? '#10b981' : '#ef4444')
                  : '#cbd5e1'
              }"
            >
              <div
                v-if="getDraftTokens(currentQuestion.id).length === 0"
                style="color: #94a3b8; font-size: 0.86rem; font-style: italic; padding: 0.8rem; text-align: center;"
              >
                （请点击下方备选步骤，按顺序填入此处）
              </div>

              <button
                v-for="(token, tIdx) in getDraftTokens(currentQuestion.id)"
                :key="tIdx"
                style="display: flex; align-items: center; justify-content: space-between; background: #1e3a8a; color: white; border: none; border-radius: 6px; padding: 0.5rem 0.85rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; text-align: left;"
                :disabled="userAnswers[currentQuestion.id] !== undefined"
                @click="handleRemoveToken(currentQuestion, tIdx)"
                title="点击取回"
              >
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <span style="background: rgba(255,255,255,0.25); border-radius: 4px; padding: 0.1rem 0.4rem; font-size: 0.75rem;">步骤 {{ tIdx + 1 }}</span>
                  <span>{{ token }}</span>
                </div>
                <span v-if="!userAnswers[currentQuestion.id]" style="font-size: 0.75rem; opacity: 0.8;">✕</span>
              </button>
            </div>
          </div>

          <!-- 备选步骤池 -->
          <div v-if="!userAnswers[currentQuestion.id]" style="margin-bottom: 1.25rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 0.4rem;">
              🧩 待排步骤池（点击填入）：
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <button
                v-for="(token, tIdx) in getAvailableTokens(currentQuestion)"
                :key="tIdx"
                style="background: white; border: 1.5px solid #94a3b8; border-radius: 6px; padding: 0.5rem 0.85rem; font-size: 0.9rem; font-weight: 600; color: #1e293b; cursor: pointer; text-align: left;"
                @click="handleAddToken(currentQuestion, token)"
              >
                ➕ {{ token }}
              </button>
            </div>
          </div>

          <!-- 提交核对 -->
          <div v-if="!userAnswers[currentQuestion.id]" style="margin-top: 1rem;">
            <button
              class="battle-nav-btn primary"
              style="width: 100%; justify-content: center; padding: 0.65rem;"
              :disabled="getDraftTokens(currentQuestion.id).length !== currentQuestion.tokens.length"
              @click="handleCheckOrdering(currentQuestion)"
            >
              ⚡ 核对流程顺序
            </button>
          </div>
        </div>

        <!-- 题型 3：开放式实战简答题 (Essay) -->
        <div v-else-if="currentQuestion.type === 'essay'" class="essay-arena-box" style="margin-top: 1rem;">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.4rem;">
              ✍️ 请在下方键入您的日文商务发言对策：
            </label>
            <textarea
              v-model="essayInputs[currentQuestion.id]"
              rows="4"
              placeholder="例：〇〇様、ご連絡ありがとうございます。…（输入您的日文回复，AI私教将从情商、敬语、风险对策4大维度为您诊断）"
              style="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; font-size: 0.92rem; line-height: 1.5; outline: none; font-family: inherit; resize: vertical;"
              :disabled="essayGrading[currentQuestion.id] || userAnswers[currentQuestion.id] !== undefined"
            ></textarea>
          </div>

          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <button
              class="battle-nav-btn primary"
              style="padding: 0.6rem 1.25rem;"
              :disabled="!(essayInputs[currentQuestion.id] && essayInputs[currentQuestion.id].trim()) || essayGrading[currentQuestion.id]"
              @click="handleSubmitEssay(currentQuestion)"
            >
              <span>{{ essayGrading[currentQuestion.id] ? '🤖 AI 项目总监正在诊断打分中...' : '🤖 提交 AI 诊断打分' }}</span>
            </button>

            <button
              class="battle-nav-btn"
              style="background: #f8fafc; border: 1px solid #cbd5e1;"
              @click="showEssaySample[currentQuestion.id] = !showEssaySample[currentQuestion.id]"
            >
              <span>{{ showEssaySample[currentQuestion.id] ? '🙈 隐藏满分范例' : '👁️ 对照满分范例与评分要点' }}</span>
            </button>
          </div>

          <!-- AI 评审报告 -->
          <div
            v-if="essayReports[currentQuestion.id]"
            class="ai-review-report-card"
            style="margin-top: 1.25rem; background: #ffffff; border: 2px solid #93c5fd; border-radius: 10px; padding: 1.25rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);"
          >
            <div style="font-size: 1.05rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>🤖 AI 项目总监 · 5维实战诊断报告</span>
            </div>
            <div
              class="markdown-body"
              v-html="renderMarkdown(essayReports[currentQuestion.id])"
            ></div>
          </div>

          <!-- 满分范例揭晓 -->
          <div
            v-if="showEssaySample[currentQuestion.id]"
            class="sample-answer-card"
            style="margin-top: 1.25rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 1rem;"
          >
            <div style="font-size: 0.88rem; font-weight: 800; color: #065f46; margin-bottom: 0.4rem;">💎 满分标杆日文表达：</div>
            <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a; line-height: 1.6; margin-bottom: 0.6rem;">
              {{ currentQuestion.sampleAnswer }}
            </div>
            <div style="font-size: 0.82rem; color: #334155; line-height: 1.5; border-top: 1px dashed #bbf7d0; padding-top: 0.5rem;">
              <strong>🎯 评分要点：</strong>{{ currentQuestion.rubric }}
            </div>
          </div>
        </div>

        <!-- 详细解析卡片（针对非简答题已作答状态） -->
        <div
          v-if="userAnswers[currentQuestion.id] && currentQuestion.type !== 'essay'"
          class="battle-explanation-card"
          style="margin-top: 1.5rem;"
        >
          <!-- 判定横幅 (Verdict Banner) -->
          <div :class="['exp-verdict-banner', userAnswers[currentQuestion.id].isCorrect ? 'verdict-correct' : 'verdict-wrong']">
            <span class="verdict-icon">{{ userAnswers[currentQuestion.id].isCorrect ? '🎉' : '⚠️' }}</span>
            <div>
              <div class="verdict-title">
                {{ userAnswers[currentQuestion.id].isCorrect ? '策略满分！完全契合日企商务期待与商谈常识' : '失策避雷！该应答容易引发客户反感或风控风险' }}
              </div>
              <div class="verdict-desc">
                {{ userAnswers[currentQuestion.id].isCorrect ? '不仅展现了高阶商务得体度，更精准切中客户心理防线。' : '已自动为您收录至「错题本」，请认真品味下方最佳对策与心理拆解。' }}
              </div>
            </div>
          </div>

          <!-- 解析分块网格 -->
          <div class="exp-sections-grid">
            <!-- 战略策略 -->
            <div v-if="typeof currentQuestion.explanation === 'object' && currentQuestion.explanation.strategy" class="exp-section-item">
              <div class="exp-section-title">🎯 最佳对策与商务战略</div>
              <div class="exp-section-body">{{ currentQuestion.explanation.strategy }}</div>
            </div>
            <!-- 纯字符串解析 -->
            <div v-else-if="typeof currentQuestion.explanation === 'string'" class="exp-section-item">
              <div class="exp-section-title">🎯 最佳对策与商务战略</div>
              <div class="exp-section-body">{{ currentQuestion.explanation }}</div>
            </div>

            <!-- 客户心理潜台词 -->
            <div v-if="typeof currentQuestion.explanation === 'object' && currentQuestion.explanation.clientSubtext" class="exp-section-item">
              <div class="exp-section-title">🧠 日本客户心理暗语与潜台词</div>
              <div class="exp-section-body">{{ currentQuestion.explanation.clientSubtext }}</div>
            </div>

            <!-- 选项逐个剖析与避雷指南 (Traps list) -->
            <div v-if="hasOptionAnalysis(currentQuestion)" class="exp-section-item">
              <div class="exp-section-title">❌ 选项逐个剖析与避雷指南</div>
              <div class="exp-traps-list">
                <div
                  v-for="(o, oIdx) in currentQuestion.options"
                  :key="oIdx"
                  :class="['exp-trap-item', { 'correct-opt-analysis': oIdx === currentQuestion.correct }]"
                >
                  <strong>【选项 {{ o.label || ['A','B','C','D'][oIdx] }}】</strong>
                  <span>{{ o.analysis }}</span>
                </div>
              </div>
            </div>

            <!-- 满分例句金句 (Key Phrases) -->
            <div v-if="currentQuestion.explanation?.keyPhrases && currentQuestion.explanation.keyPhrases.length" class="exp-section-item">
              <div class="exp-section-title">💡 关键高频表达与句式</div>
              <div class="exp-phrases-pills" style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div
                  v-for="(p, pIdx) in currentQuestion.explanation.keyPhrases"
                  :key="pIdx"
                  style="display: flex; align-items: flex-start; gap: 0.5rem; background: white; border: 1px solid #d1fae5; border-radius: 8px; padding: 0.6rem 0.85rem;"
                >
                  <button class="btn-speak-clause" @click="handlePlayKeyPhrase(p)" title="朗读">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </button>
                  <div>
                    <div style="font-size: 0.98rem; font-weight: 600; color: #0f172a;" v-html="p.jpWithRuby || p.jp"></div>
                    <div style="font-size: 0.82rem; color: #64748b; margin-top: 0.2rem;">{{ p.zh }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 溯源联动 -->
            <div v-if="currentQuestion.explanation?.referenceDialogue" class="exp-section-item">
              <div class="exp-section-title">📖 教材课文溯源联动</div>
              <div class="exp-ref-badge" style="display: inline-block; background: #eff6ff; color: #1e40af; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600;">
                <span>🔗 {{ currentQuestion.explanation.referenceDialogue }}</span>
              </div>
            </div>

            <!-- 排序题答错时的正确答案展示 -->
            <div
              v-if="currentQuestion.type === 'ordering' && !userAnswers[currentQuestion.id].isCorrect"
              style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.6rem 0.85rem;"
            >
              <div style="font-size: 0.8rem; font-weight: 700; color: #991b1b; margin-bottom: 0.25rem;">标准正确流程：</div>
              <div style="font-size: 0.92rem; font-weight: 600; color: #1e293b;">
                {{ currentQuestion.correctOrder.join(' ➔ ') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 题目导航切换栏 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #f1f5f9;">
          <button
            class="battle-nav-btn"
            :disabled="currentIndex === 0"
            @click="handlePrev"
          >
            ← 上一题
          </button>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            已作答 {{ Object.keys(userAnswers).length }} / {{ activeQuestionPool.length }}
          </span>
          <button
            class="battle-nav-btn primary"
            :disabled="currentIndex >= activeQuestionPool.length - 1"
            @click="handleNext"
          >
            下一题 →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
