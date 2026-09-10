<script setup>
import { ref, watch, computed } from 'vue';
import { useInterviewManager } from '../composables/useInterviewManager.js';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';

const emit = defineEmits(['ask-ai', 'open-config']);

const { speak } = useAudioPlayer();
const { isConfigured, isLoading, generateUniversalInterview, evaluateTurnResponse, generateFinalReport } = useInterviewManager();

const selectedTrack = ref('entry'); // 'entry' | 'executive' | 'stress'
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

const tracks = [
  {
    id: 'entry',
    name: '👔 现场入场面试 (現場入場面接)',
    desc: '对日外包开发经验、报联相（報連相）沟通规范、上流要件理解与自驱力'
  },
  {
    id: 'executive',
    name: '💼 上级SE/PM商务终面 (役員面接)',
    desc: '客户心理博弈、需求边界防雷、商业ROI价值提炼与信任构建'
  },
  {
    id: 'stress',
    name: '⚡ 突发危机压力面 (トラブル対応)',
    desc: '线上生产事故应对、客户情绪受容、分期交付协商与再发防止策'
  }
];

// 开启或刷新全场景综合面试
async function startUniversalInterview(trackId = selectedTrack.value) {
  if (!isConfigured.value) return;
  hasStarted.value = true;
  selectedTrack.value = trackId;
  startError.value = '';
  currentIndex.value = 0;
  answers.value = {};
  evaluations.value = {};
  showZh.value = {};
  showHint.value = {};
  finalReport.value = null;

  try {
    const data = await generateUniversalInterview(trackId);
    interviewData.value = data;
  } catch (err) {
    console.error('生成全场景面试失败:', err);
    startError.value = err.message || '生成面试题目失败，请检查网络或配置';
  }
}

function handleResetToLounge() {
  hasStarted.value = false;
  interviewData.value = null;
  startError.value = '';
}

const currentQuestion = computed(() => {
  return interviewData.value?.questions?.[currentIndex.value] || null;
});

const isAllAnswered = computed(() => {
  if (!interviewData.value?.questions) return false;
  return interviewData.value.questions.every(q => evaluations.value[q.id]);
});

function playVoice(text) {
  speak(text, null, null);
}

// 提交单问回答
async function handleSubmitAnswer(q) {
  const text = (answers.value[q.id] || '').trim();
  if (!text || isEvaluating.value) return;

  isEvaluating.value = true;
  try {
    const res = await evaluateTurnResponse({
      interviewerName: interviewData.value?.interviewer?.name,
      questionJp: q.questionJp,
      candidateAnswer: text,
      contextInfo: `全场景实战模拟面试 - ${interviewData.value?.trackTitle}`
    });
    evaluations.value[q.id] = res;

    // 若全部回答完毕，自动生成综合判定书
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
      title: interviewData.value?.trackTitle || '全场景综合实战模拟面试',
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
  <div class="universal-interview-section" style="margin-top: 1.5rem;">
    <!-- 顶栏标题 -->
    <div class="battle-title-area">
      <div class="battle-main-badge">
        <span class="battle-badge-tag">👔 AI INTERVIEW COCKPIT</span>
        <span>对日IT现场入场·全场景实战模拟面试</span>
      </div>
      <p class="battle-subtitle">
        跨越所有课文界限 · 模拟日本大手SIer与商社真实入场考核 · 纯 AI 实时动态命题与多维录用诊断
      </p>
    </div>

    <!-- 未配置 API Key 引导卡片 -->
    <div
      v-if="!isConfigured"
      class="battle-arena-card"
      style="background: white; border: 2px dashed #93c5fd; border-radius: var(--radius-lg); padding: 3rem 1.5rem; text-align: center; margin-top: 1rem;"
    >
      <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">👔</div>
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.5rem;">
        纯 AI 全场景模拟面试（无需预制题目 · 实时博弈）
      </h3>
      <p style="color: #64748b; font-size: 0.92rem; max-width: 580px; margin: 0 auto 1.5rem; line-height: 1.6;">
        AI 面试官将模拟日本知名商社的现场总监，提供【现场入场面试】、【上级SE商务终面】与【突发危机压力面】三大路线，涵盖自己PR、需求折冲、事故应对与逆质问全流程，并出具日企标准录用判定书。
      </p>
      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.7rem 1.8rem; font-size: 0.98rem; margin: 0 auto;"
        @click="emit('open-config')"
      >
        <span>⚙️ 一键配置通义千问 API Key 开启面试</span>
      </button>
    </div>

    <!-- 已就绪未开始：显示考场大厅与路线选择简报卡片（点击开始后才调用 AI 生成考题） -->
    <div
      v-else-if="!hasStarted"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem 1.75rem; text-align: center; box-shadow: var(--shadow-sm); margin-top: 1rem;"
    >
      <div style="font-size: 3.2rem; margin-bottom: 0.75rem;">👔</div>
      <div style="display: inline-block; background: #eff6ff; color: #1e40af; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.75rem;">
        对日IT现场入场 · 全场景综合实战考核
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 0.6rem;">
        日企现场总监 · 实战模拟面试入场大厅
      </h3>
      <p style="color: #475569; font-size: 0.92rem; max-width: 620px; margin: 0 auto 1.5rem; line-height: 1.65;">
        跨越所有课文界限，模拟日本知名商社与大手 SIer 的严苛现场入场考核。请先选择考核路线，准备好后点击【步入考场】，AI 现场总监将实时为您命题。
      </p>

      <!-- 考核路线单选卡片 -->
      <div style="font-size: 0.88rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.75rem; text-align: left; max-width: 680px; margin-left: auto; margin-right: auto;">
        🎯 请选择您要挑战的面试路线：
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem; max-width: 680px; margin: 0 auto 1.5rem;">
        <div
          v-for="track in tracks"
          :key="track.id"
          :style="{
            background: selectedTrack === track.id ? '#eff6ff' : '#ffffff',
            border: selectedTrack === track.id ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
            boxShadow: selectedTrack === track.id ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none',
            borderRadius: '10px',
            padding: '1rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            position: 'relative'
          }"
          @click="selectedTrack = track.id"
        >
          <div
            v-if="selectedTrack === track.id"
            style="position: absolute; top: 0.6rem; right: 0.6rem; background: #2563eb; color: white; font-size: 0.7rem; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 9999px;"
          >
            ✓ 已选择
          </div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.35rem; padding-right: 2rem;">
            {{ track.name }}
          </div>
          <div style="font-size: 0.8rem; color: #64748b; line-height: 1.5;">
            {{ track.desc }}
          </div>
        </div>
      </div>

      <!-- 4 阶段全流程概述 -->
      <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.8rem; color: #334155;">
          <span style="font-weight: 700; color: #1e3a8a;">① 自己PR与对日背景</span>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.8rem; color: #334155;">
          <span style="font-weight: 700; color: #0284c7;">② 上流要件与客户心理</span>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.8rem; color: #334155;">
          <span style="font-weight: 700; color: #d97706;">③ 现场故障与边界防雷</span>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.8rem; color: #334155;">
          <span style="font-weight: 700; color: #059669;">④ 逆质问与商业价值</span>
        </div>
      </div>

      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.85rem 2.4rem; font-size: 1.05rem; font-weight: 700; border-radius: 10px; box-shadow: 0 4px 14px rgba(30, 58, 138, 0.28); margin: 0 auto; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;"
        @click="startUniversalInterview(selectedTrack)"
      >
        <span>🚀 步入考场 · 开始全场景模拟面试</span>
      </button>
      <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 0.75rem;">
        💡 点击后 AI 现场总监将为您实时命制 4 阶段专属题目，考后将出具日本商社标准录用评定书
      </div>
    </div>

    <!-- 已开始面试流程交互容器 -->
    <div v-else class="interview-wrapper">
      <!-- 加载中指示（点击开始后才显示） -->
      <div
        v-if="!interviewData && isLoading"
        class="battle-arena-card"
        style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3.5rem 1.5rem; text-align: center; margin-top: 1rem;"
      >
        <div style="font-size: 2.8rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;">💼</div>
        <h4 style="font-size: 1.2rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem;">
          AI 现场总监正在组装此路线全流程面试题卷...
        </h4>
        <p style="color: #64748b; font-size: 0.88rem;">
          正在结合对日工程规范生成自己PR、上流折冲、故障应对与逆质问考题，请稍候
        </p>
      </div>

      <!-- 错误卡片 -->
      <div
        v-else-if="startError"
        class="battle-arena-card"
        style="background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-lg); padding: 2rem 1.5rem; text-align: center; margin-top: 1rem;"
      >
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
        <h4 style="font-size: 1.1rem; color: #991b1b; font-weight: 700; margin-bottom: 0.4rem;">生成面试失败</h4>
        <p style="color: #b91c1c; font-size: 0.88rem; margin-bottom: 1.25rem;">{{ startError }}</p>
        <div style="display: flex; justify-content: center; gap: 0.75rem;">
          <button class="battle-nav-btn secondary" @click="handleResetToLounge">
            ← 返回考场大厅
          </button>
          <button class="battle-nav-btn primary" @click="startUniversalInterview(selectedTrack)">
            🔄 重新生成此路线面试
          </button>
        </div>
      </div>

      <!-- 面试核心交互区 -->
      <div v-else-if="interviewData" style="margin-top: 1rem;">
        <!-- 考官档案卡 -->
        <div
          class="scenario-bubble-card"
          style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: white; border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 50px; height: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                {{ interviewData.interviewer?.avatar || '💼' }}
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span style="font-size: 1.2rem; font-weight: 800; color: #ffffff;">
                    {{ interviewData.interviewer?.name }}
                  </span>
                  <span style="background: rgba(255,255,255,0.2); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">
                    {{ interviewData.interviewer?.role }}
                  </span>
                  <span style="background: #3b82f6; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">
                    {{ interviewData.trackTitle }}
                  </span>
                </div>
                <div style="font-size: 0.85rem; opacity: 0.92; font-style: italic;">
                  「{{ interviewData.interviewer?.greeting }}」
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <button
                class="battle-nav-btn"
                style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); font-size: 0.82rem; padding: 0.45rem 0.85rem;"
                @click="handleResetToLounge"
              >
                ← 返回考场大厅
              </button>
              <button
                class="play-full-btn"
                style="background: white; color: #1e3a8a; font-size: 0.82rem; border: none;"
                :disabled="isLoading"
                @click="startUniversalInterview(selectedTrack)"
              >
                <span>{{ isLoading ? 'AI 正在命题...' : '🤖 换一套全新综合考题' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 流程步骤指示 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div style="display: flex; gap: 0.4rem; overflow-x: auto;">
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
              style="font-size: 0.8rem; padding: 0.35rem 0.75rem; white-space: nowrap;"
              @click="currentIndex = idx"
            >
              <span v-if="evaluations[q.id]">✅</span>
              <span>阶段 {{ idx + 1 }}</span>
            </button>
          </div>

          <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; white-space: nowrap;">
            已作答 {{ Object.keys(evaluations).length }} / {{ interviewData.questions.length }} 阶段
          </span>
        </div>

        <!-- 考题主卡片 -->
        <div
          v-if="currentQuestion"
          class="battle-arena-card"
          style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); margin-bottom: 1.25rem;"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 0.78rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px;">
              {{ currentQuestion.stage }}
            </span>

            <button
              class="btn-speak-clause"
              @click="playVoice(currentQuestion.questionJp)"
              title="考官原声朗读"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span style="font-size: 0.78rem; margin-left: 0.2rem;">听考官发问</span>
            </button>
          </div>

          <div style="font-size: 1.15rem; font-weight: 700; color: #0f172a; line-height: 1.6; margin-bottom: 0.85rem;">
            {{ currentQuestion.questionJp }}
          </div>

          <!-- 折叠辅助开关 -->
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
              {{ showHint[currentQuestion.id] ? '🙈 隐藏考察意图' : '💡 考官考察意图与重点' }}
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

          <!-- 学员回答输入框 -->
          <div style="margin-top: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.4rem;">
              ✍️ 候选人现场日文应答应答（键入日语）：
            </label>
            <textarea
              v-model="answers[currentQuestion.id]"
              rows="5"
              placeholder="ご質問いただきありがとうございます。私のこれまでの経験といたしましては…（建议先给出明确结论，再展开阐述技术/现场实例，最后落脚到客户价值）"
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
                style="padding: 0.55rem 1.35rem;"
                :disabled="!(answers[currentQuestion.id] && answers[currentQuestion.id].trim()) || isEvaluating"
                @click="handleSubmitAnswer(currentQuestion)"
              >
                <span>{{ isEvaluating ? '🤖 现场总监正在深度评审...' : '🤖 提交应答并请总监深度评审' }}</span>
              </button>
              <span v-else style="font-size: 0.85rem; color: #059669; font-weight: 700;">
                ✅ 该阶段应答已完成评审
              </span>
            </div>
          </div>

          <!-- 现场评审气泡 -->
          <div
            v-if="evaluations[currentQuestion.id]"
            class="ai-review-report-card"
            style="margin-top: 1.5rem; background: #ffffff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 1.25rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);"
          >
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

            <div style="font-size: 0.95rem; font-weight: 600; color: #1e293b; background: #eff6ff; border-left: 3px solid #3b82f6; padding: 0.6rem 0.85rem; border-radius: 0 6px 6px 0; margin-bottom: 0.85rem;">
              「{{ evaluations[currentQuestion.id].reaction }}」
            </div>

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

          <!-- 翻页控制 -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f1f5f9;">
            <button class="battle-nav-btn" :disabled="currentIndex === 0" @click="handlePrev">
              ← 上一阶段
            </button>
            <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
              阶段 {{ currentIndex + 1 }} / {{ interviewData.questions.length }}
            </span>
            <button
              class="battle-nav-btn primary"
              :disabled="currentIndex >= interviewData.questions.length - 1"
              @click="handleNext"
            >
              下一阶段 →
            </button>
          </div>
        </div>

        <!-- 最终日本商社录用判定书 (综合面接カルテ) -->
        <div
          v-if="isAllAnswered"
          class="battle-scorecard-card"
          style="background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); border: 2px solid #86efac; border-radius: var(--radius-lg); padding: 2rem 1.5rem; text-align: center; box-shadow: var(--shadow-md); margin-top: 1.5rem;"
        >
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">📜</div>
          <div style="display: inline-block; background: #dcfce7; color: #166534; font-size: 0.85rem; font-weight: 800; padding: 0.25rem 0.85rem; border-radius: 9999px; margin-bottom: 0.75rem;">
            日本商社・大手SIer 現場統括判定書
          </div>
          <h2 style="font-size: 1.7rem; font-weight: 800; color: #065f46; margin-bottom: 0.35rem;">
            {{ finalReport?.finalDecision || '现场直接内定・即戦力合格' }}
          </h2>
          <p style="color: #475569; font-size: 1rem; margin-bottom: 1.5rem;">
            综合考核得分：<strong style="color: #059669; font-size: 1.5rem;">{{ finalReport?.score || 93 }}</strong> / 100 分
          </p>

          <!-- 4 维能力分条 -->
          <div v-if="finalReport?.radar" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; max-width: 640px; margin: 0 auto 1.5rem;">
            <div style="background: white; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.78rem; color: #64748b; font-weight: 600;">敬语礼节与内外</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #1e3a8a; margin-top: 0.2rem;">{{ finalReport.radar.politeness }}分</div>
            </div>
            <div style="background: white; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.78rem; color: #64748b; font-weight: 600;">相手目线与倾听</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #059669; margin-top: 0.2rem;">{{ finalReport.radar.empathy }}分</div>
            </div>
            <div style="background: white; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.78rem; color: #64748b; font-weight: 600;">逻辑与风险意识</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #d97706; margin-top: 0.2rem;">{{ finalReport.radar.logic }}分</div>
            </div>
            <div style="background: white; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.78rem; color: #64748b; font-weight: 600;">现场交付执行力</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #2563eb; margin-top: 0.2rem;">{{ finalReport.radar.execution }}分</div>
            </div>
          </div>

          <!-- 考官寄语与复盘 -->
          <div v-if="finalReport" style="text-align: left; max-width: 640px; margin: 0 auto 1.75rem; background: white; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem;">
            <div style="font-size: 0.9rem; font-weight: 800; color: #065f46; margin-bottom: 0.4rem;">💬 考官综合总评：</div>
            <p style="font-size: 0.88rem; color: #334155; line-height: 1.6; margin: 0 0 1rem;">
              {{ finalReport.overallVerdict }}
            </p>

            <div style="font-size: 0.85rem; font-weight: 700; color: #065f46; margin-bottom: 0.3rem;">🌟 录用亮点：</div>
            <ul style="margin: 0 0 0.85rem 1.2rem; font-size: 0.84rem; color: #334155; line-height: 1.5;">
              <li v-for="(s, sIdx) in finalReport.strengths" :key="sIdx">{{ s }}</li>
            </ul>

            <div style="font-size: 0.85rem; font-weight: 700; color: #92400e; margin-bottom: 0.3rem;">🎯 后续提升建议：</div>
            <ul style="margin: 0 0 0 1.2rem; font-size: 0.84rem; color: #78350f; line-height: 1.5;">
              <li v-for="(imp, iIdx) in finalReport.improvements" :key="iIdx">{{ imp }}</li>
            </ul>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="battle-nav-btn secondary" @click="handleResetToLounge">
              ← 返回考场大厅
            </button>
            <button class="battle-nav-btn" style="background: white; border: 1px solid #cbd5e1;" @click="startUniversalInterview(selectedTrack)">
              🔄 重新模考此路线
            </button>
            <button
              class="play-full-btn"
              style="background: #1e3a8a; color: white;"
              @click="startUniversalInterview(selectedTrack === 'entry' ? 'executive' : (selectedTrack === 'executive' ? 'stress' : 'entry'))"
            >
              👔 挑战下一路线面试
            </button>
          </div>
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
