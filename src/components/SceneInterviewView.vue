<script setup>
import { ref, watch, computed } from 'vue';
import { useInterviewManager } from '../composables/useInterviewManager.js';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';

const props = defineProps({
  scene: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['ask-ai', 'open-config', 'go-universal']);

const { speak } = useAudioPlayer();
const { isConfigured, isLoading, generateSceneInterview, evaluateTurnResponse, generateFinalReport } = useInterviewManager();

const interviewData = ref(null);
const hasStarted = ref(false);
const currentIndex = ref(0);
const answers = ref({});
const evaluations = ref({});
const isEvaluating = ref(false);
const showZh = ref({});
const showHint = ref({});
const finalReport = ref(null);
const isGeneratingReport = ref(false);
const startError = ref('');

// 启动或刷新当前课的 AI 面试
async function startInterview() {
  if (!isConfigured.value) return;
  hasStarted.value = true;
  startError.value = '';
  currentIndex.value = 0;
  answers.value = {};
  evaluations.value = {};
  showZh.value = {};
  showHint.value = {};
  finalReport.value = null;

  try {
    const data = await generateSceneInterview(props.scene);
    interviewData.value = data;
  } catch (err) {
    console.error('生成单课面试失败:', err);
    startError.value = err.message || '生成面试题目失败，请检查网络或配置';
  }
}

function handleResetToBrief() {
  hasStarted.value = false;
  interviewData.value = null;
  startError.value = '';
}

// 切换场景时仅重置状态，不自动请求 AI 生成题目
watch(() => props.scene.id, () => {
  hasStarted.value = false;
  interviewData.value = null;
  startError.value = '';
});

const currentQuestion = computed(() => {
  return interviewData.value?.questions?.[currentIndex.value] || null;
});

const isAllAnswered = computed(() => {
  if (!interviewData.value?.questions) return false;
  return interviewData.value.questions.every(q => evaluations.value[q.id]);
});

// 朗读日语文本
function playVoice(text) {
  speak(text, null, null);
}

// 提交当前题作答
async function handleSubmitAnswer(q) {
  const text = (answers.value[q.id] || '').trim();
  if (!text || isEvaluating.value) return;

  isEvaluating.value = true;
  try {
    const res = await evaluateTurnResponse({
      interviewerName: interviewData.value?.interviewer?.name,
      questionJp: q.questionJp,
      candidateAnswer: text,
      contextInfo: `${props.scene.title} - ${props.scene.background}`
    });
    evaluations.value[q.id] = res;

    // 如果全部完成，自动生成综合判定书
    if (currentIndex.value === interviewData.value.questions.length - 1) {
      generateReport();
    }
  } catch (err) {
    alert(`点评失败: ${err.message || '网络异常'}`);
  } finally {
    isEvaluating.value = false;
  }
}

async function generateReport() {
  isGeneratingReport.value = true;
  try {
    const rep = await generateFinalReport({
      title: `${props.scene.title} 现场角色扮演面试`,
      interviewer: interviewData.value?.interviewer,
      questions: interviewData.value.questions,
      answers: answers.value,
      evaluations: evaluations.value
    });
    finalReport.value = rep;
  } catch (err) {
    console.error('生成终局报告失败:', err);
  } finally {
    isGeneratingReport.value = false;
  }
}

function handleNext() {
  if (currentIndex.value < (interviewData.value?.questions?.length || 0) - 1) {
    currentIndex.value++;
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>

<template>
  <div class="scene-interview-container" style="margin-top: 1rem;">
    <!-- 未配置 API Key 引导卡片 -->
    <div
      v-if="!isConfigured"
      class="battle-arena-card"
      style="background: white; border: 2px dashed #93c5fd; border-radius: var(--radius-lg); padding: 2.5rem 1.5rem; text-align: center;"
    >
      <div style="font-size: 3rem; margin-bottom: 0.75rem;">🎙️</div>
      <h3 style="font-size: 1.3rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.5rem;">
        开启专属本课的 纯 AI 现场角色扮演面试
      </h3>
      <p style="color: #64748b; font-size: 0.92rem; max-width: 540px; margin: 0 auto 1.5rem; line-height: 1.6;">
        AI 将化身为本课的日本客户高管（如田中部长、现场PM），根据课文要件与沟通重点向您提出 3 问递进式现场考题，并从敬语礼貌、相手目线、方案落地 5 维度对您的发言进行深度评审。
      </p>
      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.65rem 1.5rem; font-size: 0.95rem; margin: 0 auto;"
        @click="emit('open-config')"
      >
        <span>⚙️ 一键配置通义千问 API Key</span>
      </button>
    </div>

    <!-- 已就绪未开始：显示考前简报卡片（点击后才开始准备考题） -->
    <div
      v-else-if="!hasStarted"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem 1.75rem; text-align: center; box-shadow: var(--shadow-sm);"
    >
      <div style="font-size: 3.2rem; margin-bottom: 0.75rem;">🎙️</div>
      <div style="display: inline-block; background: #eff6ff; color: #1e40af; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.75rem;">
        第 {{ props.scene.id }} 场景 · 现场角色扮演面试
      </div>
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.6rem;">
        {{ props.scene.title }}
      </h3>
      <p style="color: #475569; font-size: 0.92rem; max-width: 580px; margin: 0 auto 1.5rem; line-height: 1.65;">
        {{ props.scene.background || '结合本课业务对话、需求确认、边界防雷与商务礼仪，由 AI 考官对您发起实战多轮提问。' }}
      </p>

      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #334155; text-align: left;">
          <span style="font-weight: 700; color: #1e3a8a;">① 初动破冰</span>：自介与对日开发背景
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #334155; text-align: left;">
          <span style="font-weight: 700; color: #0284c7;">② 式样确认</span>：下钻探寻客户本音
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #334155; text-align: left;">
          <span style="font-weight: 700; color: #059669;">③ 现场折冲</span>：相手目线化解危机
        </div>
      </div>

      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.8rem 2.2rem; font-size: 1.05rem; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25); margin: 0 auto; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;"
        @click="startInterview"
      >
        <span>🚀 开始本课模拟面试</span>
      </button>
    </div>

    <!-- 加载中指示（点击开始后才显示） -->
    <div
      v-else-if="!interviewData && isLoading"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3.5rem 1.5rem; text-align: center;"
    >
      <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;">🤖</div>
      <h4 style="font-size: 1.15rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem;">
        AI 考官正在研读本课业务背景与核心对白...
      </h4>
      <p style="color: #64748b; font-size: 0.88rem;">
        正在为您量身定制 3 问递进式现场角色扮演考题，请稍候片刻
      </p>
    </div>

    <!-- 错误重试 -->
    <div
      v-else-if="startError"
      class="battle-arena-card"
      style="background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-lg); padding: 2rem 1.5rem; text-align: center;"
    >
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
      <h4 style="font-size: 1.1rem; color: #991b1b; font-weight: 700; margin-bottom: 0.4rem;">生成面试失败</h4>
      <p style="color: #b91c1c; font-size: 0.88rem; margin-bottom: 1.25rem;">{{ startError }}</p>
      <div style="display: flex; justify-content: center; gap: 0.75rem;">
        <button class="battle-nav-btn secondary" @click="handleResetToBrief">
          ← 返回简报
        </button>
        <button class="battle-nav-btn primary" @click="startInterview">
          🔄 重新生成考题
        </button>
      </div>
    </div>

    <!-- 主面试舞台 -->
    <div v-else-if="interviewData" class="interview-flow-area">
      <!-- 考官档案卡 -->
      <div
        class="scenario-bubble-card"
        style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 46px; height: 46px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              {{ interviewData.interviewer?.avatar || '👔' }}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                <span style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">
                  {{ interviewData.interviewer?.name }}
                </span>
                <span style="background: rgba(255,255,255,0.25); font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 600;">
                  {{ interviewData.interviewer?.role }}
                </span>
              </div>
              <div style="font-size: 0.85rem; opacity: 0.9; font-style: italic;">
                「{{ interviewData.interviewer?.greeting }}」
              </div>
            </div>
          </div>

            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <button
                class="battle-nav-btn"
                style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); font-size: 0.82rem; padding: 0.45rem 0.85rem;"
                @click="handleResetToBrief"
              >
                ← 返回考前简报
              </button>
              <button
                class="play-full-btn"
                style="background: white; color: #1e3a8a; font-size: 0.82rem; border: none;"
                :disabled="isLoading"
                @click="startInterview"
              >
                <span>{{ isLoading ? 'AI 正在重新命制...' : '🤖 换一套本课 AI 新面试' }}</span>
              </button>
            </div>
        </div>
      </div>

      <!-- 问答进度指示 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div style="display: flex; gap: 0.4rem;">
          <button
            v-for="(q, idx) in interviewData.questions"
            :key="q.id"
            :class="[
              'filter-chip',
              {
                active: currentIndex === idx,
                'chip-weakness': evaluations[q.id]
              }
            ]"
            style="font-size: 0.8rem; padding: 0.35rem 0.75rem;"
            @click="currentIndex = idx"
          >
            <span v-if="evaluations[q.id]">✅</span>
            <span>第 {{ idx + 1 }} 问</span>
          </button>
        </div>

        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">
          已完成 {{ Object.keys(evaluations).length }} / {{ interviewData.questions.length }} 问
        </span>
      </div>

      <!-- 当前考题主卡片 -->
      <div
        v-if="currentQuestion"
        class="battle-arena-card"
        style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); margin-bottom: 1.25rem;"
      >
        <!-- 阶段徽章与发问 -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem;">
          <span style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 0.78rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px;">
            {{ currentQuestion.stage }}
          </span>

          <div style="display: flex; gap: 0.4rem;">
            <button
              class="btn-speak-clause"
              @click="playVoice(currentQuestion.questionJp)"
              title="考官语音朗读"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span style="font-size: 0.78rem; margin-left: 0.2rem;">听考官提问</span>
            </button>
          </div>
        </div>

        <!-- 考官提问文本 -->
        <div style="font-size: 1.12rem; font-weight: 700; color: #0f172a; line-height: 1.6; margin-bottom: 0.85rem;">
          {{ currentQuestion.questionJp }}
        </div>

        <!-- 辅助开关折叠 -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <button
            class="filter-chip"
            style="font-size: 0.76rem; padding: 0.2rem 0.55rem;"
            @click="showZh[currentQuestion.id] = !showZh[currentQuestion.id]"
          >
            {{ showZh[currentQuestion.id] ? '🙈 隐藏中文释义' : '👁️ 中文考题释义' }}
          </button>
          <button
            class="filter-chip"
            style="font-size: 0.76rem; padding: 0.2rem 0.55rem; background: #fffbeb; color: #92400e; border-color: #fde68a;"
            @click="showHint[currentQuestion.id] = !showHint[currentQuestion.id]"
          >
            {{ showHint[currentQuestion.id] ? '🙈 隐藏考查提示' : '💡 考官考察重点与提示' }}
          </button>
        </div>

        <div
          v-if="showZh[currentQuestion.id]"
          style="background: #f8fafc; border-left: 3px solid #64748b; padding: 0.55rem 0.85rem; font-size: 0.88rem; color: #475569; margin-bottom: 0.85rem; border-radius: 0 6px 6px 0;"
        >
          {{ currentQuestion.questionZh }}
        </div>

        <div
          v-if="showHint[currentQuestion.id]"
          style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 0.55rem 0.85rem; font-size: 0.88rem; color: #92400e; margin-bottom: 1rem; border-radius: 0 6px 6px 0;"
        >
          <strong>考查核心：</strong>{{ currentQuestion.intentHint }}
        </div>

        <!-- 学员现场发言输入框 -->
        <div style="margin-top: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.4rem;">
            ✍️ 候选人现场日文应答（请直接输入日语进行回答）：
          </label>
          <textarea
            v-model="answers[currentQuestion.id]"
            rows="4"
            placeholder="例：〇〇部長、ご質問ありがとうございます。…（键入您的现场发言，建议体现礼貌谦让语与相手目线）"
            style="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; font-size: 0.95rem; line-height: 1.55; outline: none; font-family: inherit; resize: vertical;"
            :disabled="isEvaluating || evaluations[currentQuestion.id] !== undefined"
          ></textarea>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted);">
              已输入 {{ (answers[currentQuestion.id] || '').length }} 字符
            </span>

            <button
              v-if="!evaluations[currentQuestion.id]"
              class="battle-nav-btn primary"
              style="padding: 0.55rem 1.25rem;"
              :disabled="!(answers[currentQuestion.id] && answers[currentQuestion.id].trim()) || isEvaluating"
              @click="handleSubmitAnswer(currentQuestion)"
            >
              <span>{{ isEvaluating ? '🤖 考官正在综合评审中...' : '🤖 提交回答并请考官深度点评' }}</span>
            </button>
            <span v-else style="font-size: 0.85rem; color: #059669; font-weight: 700;">
              ✅ 本问已由考官评审完成
            </span>
          </div>
        </div>

        <!-- 考官评审气泡 -->
        <div
          v-if="evaluations[currentQuestion.id]"
          class="ai-review-report-card"
          style="margin-top: 1.5rem; background: #ffffff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 1.25rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);"
        >
          <!-- 评级抬头 -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; padding-bottom: 0.6rem; border-bottom: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span
                :style="{
                  fontSize: '1rem',
                  fontWeight: '800',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  background: evaluations[currentQuestion.id].grade === 'S' ? '#d1fae5' : (evaluations[currentQuestion.id].grade === 'A' ? '#dbeafe' : '#fef3c7'),
                  color: evaluations[currentQuestion.id].grade === 'S' ? '#065f46' : (evaluations[currentQuestion.id].grade === 'A' ? '#1e40af' : '#92400e')
                }"
              >
                {{ evaluations[currentQuestion.id].gradeBadge || `【${evaluations[currentQuestion.id].grade} 级】` }}
              </span>
              <span style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a;">考官现场回馈</span>
            </div>
          </div>

          <!-- 考官口头反应 -->
          <div style="font-size: 0.95rem; font-weight: 600; color: #1e293b; background: #eff6ff; border-left: 3px solid #3b82f6; padding: 0.6rem 0.85rem; border-radius: 0 6px 6px 0; margin-bottom: 0.85rem;">
            「{{ evaluations[currentQuestion.id].reaction }}」
          </div>

          <!-- 3 维严谨拆解 -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">🧐 敬语规范度：</div>
              <div style="font-size: 0.84rem; color: #334155; line-height: 1.5;">{{ evaluations[currentQuestion.id].feedback?.politeness }}</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #059669; margin-bottom: 0.25rem;">💼 相手目线与情商：</div>
              <div style="font-size: 0.84rem; color: #334155; line-height: 1.5;">{{ evaluations[currentQuestion.id].feedback?.eq }}</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #d97706; margin-bottom: 0.25rem;">🛡️ 逻辑与闭环落地：</div>
              <div style="font-size: 0.84rem; color: #334155; line-height: 1.5;">{{ evaluations[currentQuestion.id].feedback?.logic }}</div>
            </div>
          </div>

          <!-- 考官示范大师级满分日文范例 -->
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 0.85rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="font-size: 0.85rem; font-weight: 800; color: #065f46;">💎 考官示范大师级满分日文表达：</span>
              <button class="btn-speak-clause" @click="playVoice(evaluations[currentQuestion.id].masterpiece)" title="朗读范例">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
            </div>
            <div style="font-size: 0.98rem; font-weight: 600; color: #064e3b; line-height: 1.6; margin-bottom: 0.4rem;">
              {{ evaluations[currentQuestion.id].masterpiece }}
            </div>
            <div style="font-size: 0.8rem; color: #047857; line-height: 1.5;">
              <strong>亮点点拨：</strong>{{ evaluations[currentQuestion.id].masterpieceHighlights }}
            </div>
          </div>
        </div>

        <!-- 题目翻页栏 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f1f5f9;">
          <button class="battle-nav-btn" :disabled="currentIndex === 0" @click="handlePrev">
            ← 上一问
          </button>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            第 {{ currentIndex + 1 }} / {{ interviewData.questions.length }} 问
          </span>
          <button
            class="battle-nav-btn primary"
            :disabled="currentIndex >= interviewData.questions.length - 1"
            @click="handleNext"
          >
            下一问 →
          </button>
        </div>
      </div>

      <!-- 整场 3 问完成：终局日本商社现场入场判定书 -->
      <div
        v-if="isAllAnswered"
        class="battle-scorecard-card"
        style="background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); border: 2px solid #86efac; border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; box-shadow: var(--shadow-md); margin-top: 1.5rem;"
      >
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
        <h3 style="font-size: 1.45rem; font-weight: 800; color: #065f46; margin-bottom: 0.35rem;">
          {{ finalReport?.finalDecision || '本课现场模拟面试完成！' }}
        </h3>
        <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.25rem;">
          综合评分：<strong style="color: #059669; font-size: 1.25rem;">{{ finalReport?.score || 90 }}</strong> / 100 分 · {{ finalReport?.overallVerdict || '顺利通过本课业务现场考察' }}
        </p>

        <!-- 亮点与待提升点 -->
        <div v-if="finalReport" style="text-align: left; max-width: 600px; margin: 0 auto 1.5rem; background: white; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #065f46; margin-bottom: 0.35rem;">🌟 考官点赞的优势亮点：</div>
          <ul style="margin: 0 0 0.75rem 1.2rem; font-size: 0.84rem; color: #334155; line-height: 1.5;">
            <li v-for="(s, sIdx) in finalReport.strengths" :key="sIdx">{{ s }}</li>
          </ul>
          <div style="font-size: 0.85rem; font-weight: 700; color: #92400e; margin-bottom: 0.35rem;">🎯 建议强化的提升点：</div>
          <ul style="margin: 0 0 0 1.2rem; font-size: 0.84rem; color: #78350f; line-height: 1.5;">
            <li v-for="(imp, iIdx) in finalReport.improvements" :key="iIdx">{{ imp }}</li>
          </ul>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button class="battle-nav-btn secondary" @click="handleResetToBrief">
            ← 返回考前简报
          </button>
          <button class="battle-nav-btn" style="background: white; border: 1px solid #cbd5e1;" @click="startInterview">
            🔄 重新由 AI 出一套本课新题
          </button>
          <button
            class="play-full-btn"
            style="background: #1e3a8a; color: white;"
            @click="emit('go-universal')"
          >
            👔 挑战全场景终面模拟
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
}
</style>
