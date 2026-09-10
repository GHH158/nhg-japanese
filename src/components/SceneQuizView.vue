<script setup>
import { ref, computed, watch } from 'vue';
import { useQuizGenerator } from '../composables/useQuizGenerator.js';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';

const props = defineProps({
  scene: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['ask-ai', 'go-universal']);

const { speak } = useAudioPlayer();
const { isGenerating, getSeedSceneQuiz, generateSceneQuiz } = useQuizGenerator();

// 当前轮次的 3 道题
const questions = ref([]);
const currentIndex = ref(0);
const userAnswers = ref({}); // { [qId]: { selectedIndex?, userOrder?, isCorrect, answered: true } }
const orderingDrafts = ref({}); // { [qId]: string[] } 正在作答槽里的词块
const sessionScore = ref(0);

// 初始化或者切换场景时重置
function initQuiz(forceAi = false) {
  currentIndex.value = 0;
  userAnswers.value = {};
  orderingDrafts.value = {};
  sessionScore.value = 0;

  if (forceAi) {
    loadAiQuestions();
  } else {
    questions.value = getSeedSceneQuiz(props.scene);
  }
}

async function loadAiQuestions() {
  currentIndex.value = 0;
  userAnswers.value = {};
  orderingDrafts.value = {};
  sessionScore.value = 0;
  const newQuestions = await generateSceneQuiz(props.scene);
  if (newQuestions && newQuestions.length > 0) {
    questions.value = newQuestions;
  }
}

// 监听 scene 切换
watch(() => props.scene.id, () => {
  initQuiz(false);
}, { immediate: true });

const currentQuestion = computed(() => questions.value[currentIndex.value] || null);

// 选择题作答
function handleSelectChoice(q, optIndex) {
  if (userAnswers.value[q.id]) return;
  const isCorrect = (optIndex === q.correct);
  userAnswers.value[q.id] = {
    selectedIndex: optIndex,
    isCorrect,
    answered: true
  };
  if (isCorrect) {
    sessionScore.value += 10;
  }
}

// 排序题：获取当前已放入作答槽的词块
function getDraftTokens(qId) {
  if (!orderingDrafts.value[qId]) {
    orderingDrafts.value[qId] = [];
  }
  return orderingDrafts.value[qId];
}

// 排序题：获取未选入的词块池（保持索引以防同名词块）
function getAvailableTokens(q) {
  const drafted = getDraftTokens(q.id);
  // 从原始 tokens 中剔除已选词块（考虑重复项）
  const remaining = [...q.tokens];
  for (const item of drafted) {
    const idx = remaining.indexOf(item);
    if (idx !== -1) {
      remaining.splice(idx, 1);
    }
  }
  return remaining;
}

// 排序题：点击放入作答槽
function handleAddToken(q, token) {
  if (userAnswers.value[q.id]) return;
  const drafted = getDraftTokens(q.id);
  drafted.push(token);
}

// 排序题：点击作答槽词块取回
function handleRemoveToken(q, index) {
  if (userAnswers.value[q.id]) return;
  const drafted = getDraftTokens(q.id);
  drafted.splice(index, 1);
}

// 排序题：重置词块
function handleResetOrdering(q) {
  if (userAnswers.value[q.id]) return;
  orderingDrafts.value[q.id] = [];
}

// 排序题：核对检查
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
  }
}

function handlePrev() {
  if (currentIndex.value > 0) currentIndex.value--;
}

function handleNext() {
  if (currentIndex.value < questions.value.length - 1) currentIndex.value++;
}

function handleAskAi(q) {
  emit('ask-ai', {
    speaker: `本课测验 · ${q.category}`,
    jp: q.question,
    zh: `【题目考点】: ${q.category}\n【参考解析】: ${q.explanation || ''}`,
    keyNote: `出自课程：${props.scene.title}`
  });
}

const isRoundCompleted = computed(() => {
  return questions.value.length > 0 && questions.value.every(q => userAnswers.value[q.id]?.answered);
});

const correctCount = computed(() => {
  return questions.value.filter(q => userAnswers.value[q.id]?.isCorrect).length;
});
</script>

<template>
  <div class="scene-quiz-container" style="margin-top: 1rem;">
    <!-- 顶栏标题与微测元信息 -->
    <div class="battle-title-area" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
            <span style="background: rgba(255,255,255,0.2); color: #fff; font-weight: 800; font-size: 0.75rem; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px;">
              🎯 本课课后靶向测验
            </span>
            <span style="font-size: 0.82rem; opacity: 0.9;">每次精炼 3 题 · 沉浸巩固</span>
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0; color: #ffffff;">
            {{ scene.title }}
          </h3>
        </div>

        <!-- 刷新/AI出题按钮 -->
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button
            class="play-full-btn"
            style="background: #ffffff; color: #1e3a8a; font-weight: 700; border: none; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"
            :disabled="isGenerating"
            @click="loadAiQuestions"
          >
            <span v-if="isGenerating" style="display: inline-block; animation: spin 1s linear infinite;">⏳</span>
            <span v-else>🤖</span>
            <span>{{ isGenerating ? 'AI 正在针对本课出题...' : 'AI 再出3道本课新题 (换一批)' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 进度条与得分指示 -->
    <div v-if="questions.length" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">
        <span>题目 {{ currentIndex + 1 }} / {{ questions.length }}</span>
        <span style="color: #059669;">✨ 本轮得分：{{ sessionScore }} 分 (已答 {{ Object.keys(userAnswers).length }}/{{ questions.length }})</span>
      </div>
      <div style="height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
        <div
          :style="{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)',
            transition: 'width 0.3s ease'
          }"
        ></div>
      </div>
    </div>

    <!-- 答题主卡片 -->
    <div
      v-if="currentQuestion"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);"
    >
      <!-- 题头元信息 -->
      <div class="battle-q-meta-badges" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="q-category-pill" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 0.76rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px;">
          {{ currentQuestion.category || '课文要点' }}
        </span>
        <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">
          {{ currentQuestion.type === 'ordering' ? '🧩 词块排序题' : '🔘 业务单选题' }}
        </span>

        <button
          class="btn-turn-ai-tutor"
          style="margin-left: auto; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.3rem 0.65rem; font-size: 0.78rem; font-weight: 600; color: #1e3a8a; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;"
          @click="handleAskAi(currentQuestion)"
        >
          <span>🤖 问AI私教此题</span>
        </button>
      </div>

      <!-- 题干描述 -->
      <div class="battle-prompt-box" style="margin-bottom: 1.25rem;">
        <span class="battle-prompt-icon">🎯</span>
        <div class="battle-prompt-text" style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.6;">
          {{ currentQuestion.question }}
        </div>
      </div>

      <!-- 题型 A：四选一单选题 -->
      <div v-if="currentQuestion.type === 'choice'" class="battle-options-list">
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
          @click="handleSelectChoice(currentQuestion, optIdx)"
        >
          <div class="opt-letter-badge">{{ ['A', 'B', 'C', 'D'][optIdx] }}</div>
          <div style="flex: 1;">
            <div class="opt-sentence-jp" style="font-size: 0.96rem; line-height: 1.5;">{{ opt }}</div>
          </div>
          <span
            v-if="userAnswers[currentQuestion.id] && optIdx === currentQuestion.correct"
            class="opt-status-tag"
          >
            ✅ 正确范例
          </span>
          <span
            v-else-if="userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].selectedIndex === optIdx"
            class="opt-status-tag"
          >
            ❌ 选项有误
          </span>
        </button>
      </div>

      <!-- 题型 B：词块点击排序题 -->
      <div v-else-if="currentQuestion.type === 'ordering'" class="ordering-puzzle-box" style="margin-top: 1rem;">
        <!-- 作答槽区 -->
        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center;">
            <span>📥 您的拼装顺序：</span>
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
            style="min-height: 56px; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 0.6rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; background: #f8fafc;"
            :style="{
              borderColor: userAnswers[currentQuestion.id]
                ? (userAnswers[currentQuestion.id].isCorrect ? '#10b981' : '#ef4444')
                : '#cbd5e1'
            }"
          >
            <div
              v-if="getDraftTokens(currentQuestion.id).length === 0"
              style="color: #94a3b8; font-size: 0.86rem; font-style: italic; width: 100%; text-align: center;"
            >
              （请点击下方备选词块，按顺序填入此处）
            </div>

            <button
              v-for="(token, tIdx) in getDraftTokens(currentQuestion.id)"
              :key="tIdx"
              style="display: inline-flex; align-items: center; gap: 0.35rem; background: #1e3a8a; color: white; border: none; border-radius: 6px; padding: 0.45rem 0.75rem; font-size: 0.92rem; font-weight: 600; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
              :disabled="userAnswers[currentQuestion.id] !== undefined"
              @click="handleRemoveToken(currentQuestion, tIdx)"
              title="点击移回待选池"
            >
              <span style="opacity: 0.7; font-size: 0.75rem;">{{ tIdx + 1 }}.</span>
              <span>{{ token }}</span>
              <span v-if="!userAnswers[currentQuestion.id]" style="font-size: 0.7rem; opacity: 0.8;">✕</span>
            </button>
          </div>
        </div>

        <!-- 候选词块池 -->
        <div v-if="!userAnswers[currentQuestion.id]" style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 0.4rem;">
            🧩 备选词块池（点击添加）：
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button
              v-for="(token, tIdx) in getAvailableTokens(currentQuestion)"
              :key="tIdx"
              style="background: white; border: 1.5px solid #94a3b8; border-radius: 6px; padding: 0.45rem 0.75rem; font-size: 0.92rem; font-weight: 600; color: #1e293b; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
              @click="handleAddToken(currentQuestion, token)"
            >
              ➕ {{ token }}
            </button>
          </div>
        </div>

        <!-- 提交核对按钮 -->
        <div v-if="!userAnswers[currentQuestion.id]" style="margin-top: 1rem;">
          <button
            class="battle-nav-btn primary"
            style="width: 100%; justify-content: center; padding: 0.65rem;"
            :disabled="getDraftTokens(currentQuestion.id).length !== currentQuestion.tokens.length"
            @click="handleCheckOrdering(currentQuestion)"
          >
            ⚡ 核对拼装顺序
          </button>
        </div>
      </div>

      <!-- 解析反馈卡片 -->
      <div
        v-if="userAnswers[currentQuestion.id]"
        class="battle-explanation-card"
        style="margin-top: 1.5rem; background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem;"
      >
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span
            :style="{
              fontSize: '0.85rem',
              fontWeight: '800',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: userAnswers[currentQuestion.id].isCorrect ? '#d1fae5' : '#fee2e2',
              color: userAnswers[currentQuestion.id].isCorrect ? '#065f46' : '#991b1b'
            }"
          >
            {{ userAnswers[currentQuestion.id].isCorrect ? '🎉 作答正确 (+10分)' : '💡 深入点拨' }}
          </span>
          <span style="font-weight: 800; font-size: 1rem; color: #1e3a8a;">名师精辟解析</span>
        </div>

        <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin: 0;">
          {{ currentQuestion.explanation }}
        </p>

        <!-- 如果是排序题且答错了，显示标准答案 -->
        <div
          v-if="currentQuestion.type === 'ordering' && !userAnswers[currentQuestion.id].isCorrect"
          style="margin-top: 0.75rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.6rem 0.85rem;"
        >
          <div style="font-size: 0.8rem; font-weight: 700; color: #991b1b; margin-bottom: 0.25rem;">标准正确语序：</div>
          <div style="font-size: 0.92rem; font-weight: 600; color: #1e293b;">
            {{ currentQuestion.correctOrder.join(' ➔ ') }}
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
          第 {{ currentIndex + 1 }} / {{ questions.length }} 题
        </span>
        <button
          class="battle-nav-btn primary"
          :disabled="currentIndex >= questions.length - 1"
          @click="handleNext"
        >
          下一题 →
        </button>
      </div>
    </div>

    <!-- 本轮 3 题完成通关大总结卡片 -->
    <div
      v-if="isRoundCompleted"
      class="battle-scorecard-card"
      style="margin-top: 1.5rem; background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); border: 2px solid #86efac; border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; box-shadow: var(--shadow-md);"
    >
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">
        {{ correctCount === questions.length ? '🏆' : '🎯' }}
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; color: #065f46; margin-bottom: 0.35rem;">
        {{ correctCount === questions.length ? '太棒了！本轮 3 题满分通关！' : '本轮 3 题练习顺利完成！' }}
      </h3>
      <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.25rem;">
        答对 <strong>{{ correctCount }}</strong> / {{ questions.length }} 题 · 累计获得 <strong>{{ sessionScore }}</strong> 积分
      </p>

      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <button
          class="battle-nav-btn"
          style="background: white; border: 1px solid #cbd5e1;"
          @click="initQuiz(false)"
        >
          🔄 重新刷本轮题
        </button>
        <button
          class="play-full-btn"
          style="background: #1e3a8a; color: white;"
          :disabled="isGenerating"
          @click="loadAiQuestions"
        >
          <span>🤖 AI 再出3道本课新题</span>
        </button>
        <button
          class="battle-nav-btn"
          style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;"
          @click="emit('go-universal')"
        >
          ⚔️ 前往全场景综合竞技场
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
