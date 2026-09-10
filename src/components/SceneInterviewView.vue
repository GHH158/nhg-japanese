<script setup>
import { ref, watch, computed } from 'vue';
import { useInterviewManager, INTERVIEW_LEVELS } from '../composables/useInterviewManager.js';
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

const selectedLevel = ref('n2_n1');
const interviewData = ref(null);
const hasStarted = ref(false);
const currentIndex = ref(0);
const answers = ref({});
const evaluations = ref({});
const isEvaluating = ref(false);
const showZh = ref({});
const showScaffold = ref(true);
const finalReport = ref(null);
const isGeneratingReport = ref(false);
const startError = ref('');
const copySuccess = ref(false);

// 启动或刷新当前课的 AI 现场对谈面试
async function startInterview() {
  if (!isConfigured.value) return;
  hasStarted.value = true;
  startError.value = '';
  currentIndex.value = 0;
  answers.value = {};
  evaluations.value = {};
  showZh.value = {};
  finalReport.value = null;

  try {
    const data = await generateSceneInterview(props.scene, selectedLevel.value);
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

// 切换场景时重置
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

function playVoice(text, voice = 'ja-JP-KeitaNeural') {
  if (!text) return;
  speak(text, null, null, null, voice);
}

function isZhVisible(qId) {
  return showZh.value[qId] !== false; // 默认展开展示，清晰友好
}

function toggleZh(qId) {
  showZh.value[qId] = !isZhVisible(qId);
}

// 点击标签快速插入关键词句
function handleInsertPhrase(phrase) {
  if (!currentQuestion.value) return;
  const qId = currentQuestion.value.id;
  const oldText = answers.value[qId] || '';
  answers.value[qId] = oldText ? `${oldText} ${phrase}` : phrase;
}

// 一键应用填空模板
function handleApplyTemplate(template) {
  if (!currentQuestion.value || !template) return;
  const qId = currentQuestion.value.id;
  answers.value[qId] = template;
}

// 重新挑战当前题目（重新回答冲刺高分）
function handleRetryTurn(qId) {
  delete evaluations.value[qId];
  if (finalReport.value) finalReport.value = null;
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
      contextInfo: `${props.scene.title} - ${props.scene.background}`,
      level: selectedLevel.value
    });
    evaluations.value[q.id] = res;

    // 若全部完成，自动生成综合判定书与速记手册
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
      title: `${props.scene.title} 现场双向对谈面试`,
      interviewer: interviewData.value?.interviewer,
      questions: interviewData.value.questions,
      answers: answers.value,
      evaluations: evaluations.value,
      level: selectedLevel.value
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

// 一键复制整场面试速记手册
function copyCheatSheet() {
  if (!finalReport.value?.distilledCheatSheet?.length) return;
  const textLines = finalReport.value.distilledCheatSheet.map((item, idx) => {
    return `【${item.stage || `第${idx + 1}问`}】\n💡 黄金法则: ${item.goldenRule}\n🔑 必背金句: ${item.memoryPhrase}\n⚠️ 避坑雷区: ${item.pitfall}\n`;
  }).join('\n');

  navigator.clipboard.writeText(textLines).then(() => {
    copySuccess.value = true;
    setTimeout(() => { copySuccess.value = false; }, 2500);
  }).catch(() => {
    alert('复制失败，请手动选择复制');
  });
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
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.5rem;">
        开启专属本课的 纯 AI 现场双向对谈面试
      </h3>
      <p style="color: #64748b; font-size: 0.92rem; max-width: 560px; margin: 0 auto 1.5rem; line-height: 1.6;">
        AI 化身为日本现场项目统括总监，根据您指定的难度级别发起真实一问一答对谈。提供考官潜台词解读、建议表达意图、填空模板与全中文深度复盘，并自动提炼实战必背金句！
      </p>
      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.65rem 1.5rem; font-size: 0.95rem; margin: 0 auto;"
        @click="emit('open-config')"
      >
        <span>⚙️ 一键配置通义千问 API Key 开启面试</span>
      </button>
    </div>

    <!-- 考前简报与级别选择卡片 -->
    <div
      v-else-if="!hasStarted"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem 1.75rem; text-align: center; box-shadow: var(--shadow-sm);"
    >
      <div style="font-size: 3.2rem; margin-bottom: 0.75rem;">🎙️</div>
      <div style="display: inline-block; background: #eff6ff; color: #1e40af; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.8rem; border-radius: 9999px; margin-bottom: 0.75rem;">
        第 {{ props.scene.id }} 场景 · 现场双向对谈角色扮演
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 0.6rem;">
        {{ props.scene.title }}
      </h3>
      <p style="color: #475569; font-size: 0.92rem; max-width: 620px; margin: 0 auto 1.5rem; line-height: 1.65;">
        {{ props.scene.background || '结合本课业务对话、需求确认与边界折冲，由 AI 考官与您现场进行 3 轮递进式对谈演练。' }}
      </p>

      <!-- 难度级别四档选择栏 -->
      <div style="max-width: 680px; margin: 0 auto 1.5rem; text-align: left;">
        <div style="font-size: 0.88rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: space-between;">
          <span>🎯 请选择您的目标挑战级别：</span>
          <span style="font-size: 0.78rem; color: #64748b; font-weight: 500;">任何级别都能开口提升</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.65rem;">
          <div
            v-for="lvl in INTERVIEW_LEVELS"
            :key="lvl.id"
            :style="{
              background: selectedLevel === lvl.id ? '#eff6ff' : '#ffffff',
              border: selectedLevel === lvl.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
              boxShadow: selectedLevel === lvl.id ? '0 4px 10px rgba(37, 99, 235, 0.12)' : 'none',
              borderRadius: '8px',
              padding: '0.75rem 0.65rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }"
            @click="selectedLevel = lvl.id"
          >
            <div style="font-size: 0.92rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.25rem;">
              {{ lvl.name }}
            </div>
            <div style="font-size: 0.72rem; color: #64748b; line-height: 1.4;">
              {{ lvl.shortDesc }}
            </div>
          </div>
        </div>
      </div>

      <!-- 3 问对谈流程节点 -->
      <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.82rem; color: #334155;">
          <span style="font-weight: 700; color: #1e3a8a;">① 初动破冰</span>：自介与背景切入
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.82rem; color: #0284c7;">
          <span style="font-weight: 700; color: #0284c7;">② 本课核心</span>：式样确认与下钻
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.85rem; font-size: 0.82rem; color: #059669;">
          <span style="font-weight: 700; color: #059669;">③ 现场折冲</span>：突发应对与闭环
        </div>
      </div>

      <button
        class="play-full-btn"
        style="background: #1e3a8a; color: white; padding: 0.8rem 2.2rem; font-size: 1.05rem; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25); margin: 0 auto; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;"
        @click="startInterview"
      >
        <span>🚀 开启本级别现场对谈</span>
      </button>
    </div>

    <!-- 加载中 -->
    <div
      v-else-if="!interviewData && isLoading"
      class="battle-arena-card"
      style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3.5rem 1.5rem; text-align: center;"
    >
      <div style="font-size: 2.8rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;">🤖</div>
      <h4 style="font-size: 1.18rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem;">
        AI 考官正在研读本课业务背景，准备针对【{{ INTERVIEW_LEVELS.find(l => l.id === selectedLevel)?.name }}】发问...
      </h4>
      <p style="color: #64748b; font-size: 0.88rem;">
        正在生成潜台词解读、建议表达立场与填空骨架，请稍候片刻
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
        <button class="battle-nav-btn secondary" @click="handleResetToBrief">← 返回级别选择</button>
        <button class="battle-nav-btn primary" @click="startInterview">🔄 重新生成考题</button>
      </div>
    </div>

    <!-- 沉浸式双向对谈舞台 -->
    <div v-else-if="interviewData" class="interview-flow-area">
      <!-- 考官档案与级别栏 -->
      <div
        class="scenario-bubble-card"
        style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; border-radius: var(--radius-lg); padding: 1.2rem 1.5rem; margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              {{ interviewData.interviewer?.avatar || '👔' }}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                <span style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">
                  {{ interviewData.interviewer?.name }}
                </span>
                <span style="background: rgba(255,255,255,0.22); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">
                  {{ interviewData.interviewer?.role }}
                </span>
                <span style="background: #10b981; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
                  {{ INTERVIEW_LEVELS.find(l => l.id === selectedLevel)?.badge }}
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
              style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); font-size: 0.8rem; padding: 0.4rem 0.8rem;"
              @click="handleResetToBrief"
            >
              ← 切换级别
            </button>
            <button
              class="play-full-btn"
              style="background: white; color: #1e3a8a; font-size: 0.8rem; border: none; padding: 0.4rem 0.85rem;"
              :disabled="isLoading"
              @click="startInterview"
            >
              <span>{{ isLoading ? 'AI 正在重新出题...' : '🤖 换一套考题' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 问答步进指示胶囊 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; gap: 0.45rem;">
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
            style="font-size: 0.82rem; padding: 0.35rem 0.8rem; display: inline-flex; align-items: center; gap: 0.35rem;"
            @click="currentIndex = idx"
          >
            <span v-if="evaluations[q.id]">✅</span>
            <span>第 {{ idx + 1 }} 问</span>
          </button>
        </div>

        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">
          对谈进度：已完成 {{ Object.keys(evaluations).length }} / {{ interviewData.questions.length }} 问
        </span>
      </div>

      <!-- 对话主体：对方提问 -> 作答指引 -> 我方回答 -> 考官点评 -> 精华提炼 -->
      <div v-if="currentQuestion" class="dialogue-stage-wrapper">
        <!-- 1. 考官提问气泡 (对方提问) -->
        <div
          class="battle-arena-card"
          style="background: #ffffff; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.06);"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.2rem;">👔</span>
              <span style="font-size: 0.88rem; font-weight: 800; color: #1e3a8a;">
                {{ interviewData.interviewer?.name }} 发问
              </span>
              <span style="background: #eff6ff; color: #2563eb; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 9999px; font-weight: 700;">
                {{ currentQuestion.stage }}
              </span>
            </div>

            <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
              <!-- 听考官发问按钮 (接微软 EdgeTTS 神经网络纯正真人发音) -->
              <button
                class="btn-voice-pill"
                @click="playVoice(currentQuestion.questionJp, 'ja-JP-KeitaNeural')"
                title="播放考官真人级发音（微软神经网络语音）"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>🔊 听考官发问</span>
              </button>

              <!-- 中文翻译切换按钮 (醒目独立按钮) -->
              <button
                :class="['btn-trans-pill', { active: isZhVisible(currentQuestion.id) }]"
                @click="toggleZh(currentQuestion.id)"
                title="切换考题中文释义"
              >
                <span>{{ isZhVisible(currentQuestion.id) ? '🙈 隐藏中文释义' : '🇨🇳 查看中文释义' }}</span>
              </button>
            </div>
          </div>

          <!-- 考官日语发问 -->
          <div style="font-size: 1.18rem; font-weight: 700; color: #0f172a; line-height: 1.65; margin-bottom: 0.5rem;">
            {{ currentQuestion.questionJp }}
          </div>

          <!-- 考题中文释义 (默认展开展示，友好清晰) -->
          <div
            v-if="isZhVisible(currentQuestion.id)"
            style="font-size: 0.9rem; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; padding: 0.65rem 0.95rem; border-radius: 0 8px 8px 0; margin-top: 0.65rem; line-height: 1.6;"
          >
            <div style="font-size: 0.78rem; font-weight: 700; color: #1e40af; margin-bottom: 0.15rem;">
              🇨🇳 考官提问中文释义：
            </div>
            <div>{{ currentQuestion.questionZh }}</div>
          </div>
        </div>

        <!-- 2. 意图导航与作答脚手架 (重点：让学员清清楚楚知道考官想听什么，该表达什么意思) -->
        <div
          class="scaffold-guide-box"
          style="background: #fffdf5; border: 1px solid #fde68a; border-left: 5px solid #f59e0b; border-radius: var(--radius-lg); padding: 1.15rem 1.35rem; margin-bottom: 1.1rem; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.06);"
        >
          <!-- 潜台词 -->
          <div style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.65rem;">
            <span style="font-size: 1rem; line-height: 1.4;">💡</span>
            <div style="font-size: 0.88rem; color: #78350f; line-height: 1.55;">
              <strong style="color: #b45309;">考官潜台词与深层目的：</strong>{{ currentQuestion.intentHint }}
            </div>
          </div>

          <!-- 建议表达的核心业务立场清单 -->
          <div style="background: white; border: 1px solid #fef3c7; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 0.75rem;">
            <div style="font-size: 0.84rem; font-weight: 800; color: #92400e; margin-bottom: 0.35rem;">
              🎯 本题作答指引（请在回答中传达以下核心意思）：
            </div>
            <div style="font-size: 0.85rem; color: #451a03; line-height: 1.6; white-space: pre-line;">
              {{ currentQuestion.responseGuideZh }}
            </div>
          </div>

          <!-- 推荐句型与填空骨架 -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; font-weight: 700; color: #92400e;">🔤 推荐表达（点击插入）：</span>
              <button
                v-for="(phrase, pIdx) in currentQuestion.keyPhrases"
                :key="pIdx"
                class="filter-chip"
                style="font-size: 0.75rem; padding: 0.15rem 0.55rem; background: #fffbeb; border: 1px solid #fde68a; color: #b45309; cursor: pointer;"
                title="点击一键插入输入框"
                @click="handleInsertPhrase(phrase)"
              >
                + {{ phrase }}
              </button>
            </div>

            <!-- 填空骨架（尤其适合初学者） -->
            <button
              v-if="currentQuestion.templateScaffold"
              class="filter-chip"
              style="background: #fef3c7; color: #92400e; border: 1px solid #f59e0b; font-weight: 700; font-size: 0.76rem; padding: 0.2rem 0.6rem;"
              @click="handleApplyTemplate(currentQuestion.templateScaffold)"
            >
              📝 一键套用答题骨架
            </button>
          </div>
        </div>

        <!-- 3. 我方现场回答输入区 (我方回答) -->
        <div
          class="battle-arena-card"
          style="background: white; border: 1.5px solid #cbd5e1; border-radius: var(--radius-lg); padding: 1.35rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label style="font-size: 0.88rem; font-weight: 800; color: #1e3a8a; display: flex; align-items: center; gap: 0.35rem;">
              <span>✍️ 我方现场日文应答</span>
              <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">(请用日语输入您的现场发言)</span>
            </label>
            <span style="font-size: 0.78rem; color: #94a3b8;">
              已键入 {{ (answers[currentQuestion.id] || '').length }} 字
            </span>
          </div>

          <textarea
            v-model="answers[currentQuestion.id]"
            rows="4"
            placeholder="例：〇〇部長、ご質問ありがとうございます。…（可参考上方推荐表达与核心指引组织日语发言）"
            style="width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 0.85rem; font-size: 0.95rem; line-height: 1.6; outline: none; font-family: inherit; resize: vertical; transition: border-color 0.2s;"
            :disabled="isEvaluating || evaluations[currentQuestion.id] !== undefined"
            @focus="$event.target.style.borderColor = '#3b82f6'"
            @blur="$event.target.style.borderColor = '#e2e8f0'"
          ></textarea>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <button
                v-if="evaluations[currentQuestion.id]"
                class="filter-chip"
                style="font-size: 0.78rem; padding: 0.25rem 0.65rem; color: #2563eb; background: #eff6ff;"
                @click="handleRetryTurn(currentQuestion.id)"
              >
                🔄 修改回答重新提交点评
              </button>
            </div>

            <button
              v-if="!evaluations[currentQuestion.id]"
              class="battle-nav-btn primary"
              style="padding: 0.6rem 1.4rem; font-size: 0.92rem; font-weight: 700; border-radius: 8px;"
              :disabled="!(answers[currentQuestion.id] && answers[currentQuestion.id].trim()) || isEvaluating"
              @click="handleSubmitAnswer(currentQuestion)"
            >
              <span>{{ isEvaluating ? '🤖 考官现场聆听与深度评审中...' : '🎙️ 提交回答并请考官现场复盘' }}</span>
            </button>
            <span v-else style="font-size: 0.85rem; color: #059669; font-weight: 700;">
              ✅ 考官已完成本问现场评审
            </span>
          </div>
        </div>

        <!-- 4. 考官现场回馈气泡与 100% 简体中文深度复盘 -->
        <div
          v-if="evaluations[currentQuestion.id]"
          class="ai-review-report-card"
          style="background: #ffffff; border: 2px solid #bfdbfe; border-radius: var(--radius-lg); padding: 1.4rem; margin-bottom: 1.25rem; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);"
        >
          <!-- 评级抬头 -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <span
                :style="{
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  padding: '0.25rem 0.8rem',
                  borderRadius: '9999px',
                  background: evaluations[currentQuestion.id].grade === 'S' ? '#d1fae5' : (evaluations[currentQuestion.id].grade === 'A' ? '#dbeafe' : '#fef3c7'),
                  color: evaluations[currentQuestion.id].grade === 'S' ? '#065f46' : (evaluations[currentQuestion.id].grade === 'A' ? '#1e40af' : '#92400e')
                }"
              >
                {{ evaluations[currentQuestion.id].gradeBadge || `【${evaluations[currentQuestion.id].grade} 级】` }}
              </span>
              <span style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a;">考官现场回馈与深度复盘</span>
            </div>
            <span style="font-size: 0.78rem; color: #64748b;">评语全中文呈现</span>
          </div>

          <!-- 考官现场第一反应（纯中文语录气泡） -->
          <div style="font-size: 0.95rem; font-weight: 600; color: #1e293b; background: #eff6ff; border-left: 4px solid #2563eb; padding: 0.75rem 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1rem; line-height: 1.6;">
            <strong>考官现场直观评价：</strong>「{{ evaluations[currentQuestion.id].reaction }}」
          </div>

          <!-- 3 维度全中文严谨诊断网格 -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 1.1rem;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #1e40af; margin-bottom: 0.35rem;">🧐 敬语规范度：</div>
              <div style="font-size: 0.85rem; color: #334155; line-height: 1.55;">{{ evaluations[currentQuestion.id].feedback?.politeness }}</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #059669; margin-bottom: 0.35rem;">💼 相手目线与情商：</div>
              <div style="font-size: 0.85rem; color: #334155; line-height: 1.55;">{{ evaluations[currentQuestion.id].feedback?.eq }}</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #d97706; margin-bottom: 0.35rem;">🛡️ 逻辑与闭环落地：</div>
              <div style="font-size: 0.85rem; color: #334155; line-height: 1.55;">{{ evaluations[currentQuestion.id].feedback?.logic }}</div>
            </div>
          </div>

          <!-- 考官满分日文范例 -->
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 0.9rem 1.1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="font-size: 0.88rem; font-weight: 800; color: #065f46;">💎 考官示范满分日文表达：</span>
              <button class="btn-model-voice-pill" @click="playVoice(evaluations[currentQuestion.id].masterpiece, 'ja-JP-KeitaNeural')" title="朗读范例">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span style="margin-left: 0.2rem;">听示范</span>
              </button>
            </div>
            <div style="font-size: 1.02rem; font-weight: 700; color: #064e3b; line-height: 1.6; margin-bottom: 0.45rem;">
              {{ evaluations[currentQuestion.id].masterpiece }}
            </div>
            <div style="font-size: 0.82rem; color: #047857; line-height: 1.55;">
              <strong>亮点点拨：</strong>{{ evaluations[currentQuestion.id].masterpieceHighlights }}
            </div>
          </div>

          <!-- 5. 核心干货速记卡 (方便记忆) -->
          <div
            v-if="evaluations[currentQuestion.id].memoryPhrase || evaluations[currentQuestion.id].goldenRule"
            style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 0.85rem 1rem;"
          >
            <div style="font-size: 0.84rem; font-weight: 800; color: #92400e; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📌 本问核心干货提炼速记卡</span>
              <span style="font-size: 0.72rem; font-weight: normal; color: #b45309;">(方便记忆与背诵)</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem;">
              <div v-if="evaluations[currentQuestion.id].goldenRule" style="font-size: 0.82rem; color: #78350f;">
                <strong>💡 黄金法则:</strong> {{ evaluations[currentQuestion.id].goldenRule }}
              </div>
              <div v-if="evaluations[currentQuestion.id].memoryPhrase" style="font-size: 0.82rem; color: #1e3a8a;">
                <strong>🔑 必背金句:</strong>
                <span style="font-weight: 700; color: #1e40af; cursor: pointer; text-decoration: underline;" @click="playVoice(evaluations[currentQuestion.id].memoryPhrase)" title="点击发音">
                  {{ evaluations[currentQuestion.id].memoryPhrase }} 🔊
                </span>
              </div>
              <div v-if="evaluations[currentQuestion.id].pitfall" style="font-size: 0.82rem; color: #991b1b;">
                <strong>⚠️ 避坑雷区:</strong> {{ evaluations[currentQuestion.id].pitfall }}
              </div>
            </div>
          </div>
        </div>

        <!-- 翻页控制栏 -->
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

      <!-- 整场 3 问全部完成：日企录用判定书 + 实战速记手册 -->
      <div
        v-if="isAllAnswered"
        class="battle-scorecard-card"
        style="background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); border: 2px solid #86efac; border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; box-shadow: var(--shadow-md); margin-top: 1.5rem;"
      >
        <div style="font-size: 3.2rem; margin-bottom: 0.5rem;">🏆</div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: #065f46; margin-bottom: 0.35rem;">
          {{ finalReport?.finalDecision || '本课现场模拟对谈圆满完成！' }}
        </h3>
        <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.25rem;">
          综合评分：<strong style="color: #059669; font-size: 1.35rem;">{{ finalReport?.score || 90 }}</strong> / 100 分 ·
          {{ finalReport?.overallVerdict || '顺利通过本课业务现场考察' }}
        </p>

        <!-- 亮点与提升点 -->
        <div v-if="finalReport" style="text-align: left; max-width: 640px; margin: 0 auto 1.5rem; background: white; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.15rem;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #065f46; margin-bottom: 0.35rem;">🌟 考官点赞的优势亮点：</div>
          <ul style="margin: 0 0 0.85rem 1.2rem; font-size: 0.84rem; color: #334155; line-height: 1.55;">
            <li v-for="(s, sIdx) in finalReport.strengths" :key="sIdx">{{ s }}</li>
          </ul>
          <div style="font-size: 0.88rem; font-weight: 700; color: #92400e; margin-bottom: 0.35rem;">🎯 建议强化的提升点：</div>
          <ul style="margin: 0 0 0 1.2rem; font-size: 0.84rem; color: #78350f; line-height: 1.55;">
            <li v-for="(imp, iIdx) in finalReport.improvements" :key="iIdx">{{ imp }}</li>
          </ul>
        </div>

        <!-- 实战速记卡片集 (Cheat Sheet) -->
        <div
          v-if="finalReport?.distilledCheatSheet?.length"
          style="text-align: left; max-width: 640px; margin: 0 auto 1.5rem; background: #fffdf5; border: 1px solid #fde68a; border-radius: 10px; padding: 1.15rem;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div style="font-size: 0.9rem; font-weight: 800; color: #92400e;">
              📚 本场面试实战金句与速记宝典 (可背诵积累)
            </div>
            <button
              class="filter-chip"
              style="font-size: 0.75rem; padding: 0.2rem 0.6rem; background: white; border: 1px solid #f59e0b; color: #b45309;"
              @click="copyCheatSheet"
            >
              {{ copySuccess ? '✅ 已复制全部' : '📋 一键复制速记卡' }}
            </button>
          </div>

          <div
            v-for="(item, itmIdx) in finalReport.distilledCheatSheet"
            :key="itmIdx"
            style="background: white; border: 1px solid #fef3c7; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.6rem;"
          >
            <div style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.25rem;">
              {{ item.stage || `第 ${itmIdx + 1} 问` }}
            </div>
            <div style="font-size: 0.82rem; color: #334155; margin-bottom: 0.2rem;">
              <strong>💡 黄金法则:</strong> {{ item.goldenRule }}
            </div>
            <div style="font-size: 0.84rem; color: #065f46; font-weight: 600; margin-bottom: 0.2rem;">
              <strong>🔑 必背金句:</strong> {{ item.memoryPhrase }}
              <button class="btn-mini-voice" style="margin-left: 0.4rem;" @click="playVoice(item.memoryPhrase, 'ja-JP-KeitaNeural')" title="朗读金句">
                🔊 听发音
              </button>
            </div>
            <div style="font-size: 0.8rem; color: #991b1b;">
              <strong>⚠️ 避坑雷区:</strong> {{ item.pitfall }}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button class="battle-nav-btn secondary" @click="handleResetToBrief">
            ← 返回简报与切换级别
          </button>
          <button class="battle-nav-btn" style="background: white; border: 1px solid #cbd5e1;" @click="startInterview">
            🔄 换一套本课 AI 新题
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

.btn-voice-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #eff6ff;
  border: 1.5px solid #93c5fd;
  color: #1e40af;
  border-radius: 8px;
  padding: 0.42rem 0.9rem;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.08);
}
.btn-voice-pill:hover {
  background: #dbeafe;
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.btn-trans-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  color: #334155;
  border-radius: 8px;
  padding: 0.42rem 0.9rem;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.btn-trans-pill:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  color: #0f172a;
}
.btn-trans-pill.active {
  background: #f1f5f9;
  border-color: #64748b;
  color: #0f172a;
}

.btn-model-voice-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #ecfdf5;
  border: 1px solid #6ee7b7;
  color: #065f46;
  border-radius: 6px;
  padding: 0.32rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-model-voice-pill:hover {
  background: #d1fae5;
  border-color: #34d399;
}

.btn-mini-voice {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-mini-voice:hover {
  background: #dcfce7;
  border-color: #4ade80;
}
</style>
