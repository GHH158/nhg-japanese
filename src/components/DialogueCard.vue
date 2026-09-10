<script setup>
import { ref, computed, watch } from 'vue';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';
import { useMastery } from '../composables/useMastery.js';
import { useQwen } from '../composables/useQwen.js';
import { computeJapaneseDiff, generateClozeHtml } from '../composables/useJapaneseDiff.js';

const props = defineProps({
  turn: {
    type: Object,
    required: true
  },
  turnId: {
    type: String,
    required: true
  },
  scene: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'full' // 'full' | 'cloze' | 'prompt' | 'roleplay'
  },
  audioUrl: {
    type: String,
    default: null
  },
  showFurigana: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['ask-ai', 'edit-turn']);

const { state: audioState, speak, stop } = useAudioPlayer();
const { isMastered, toggleMastered, markMastered, isWeakness, toggleWeakness } = useMastery();
const { isConfigured, reviewRoleplay, renderMarkdown } = useQwen();

const mastered = computed(() => isMastered(props.turnId));
const weak = computed(() => isWeakness(props.turnId));
const isCurrentlyPlaying = computed(() => audioState.isPlaying && audioState.currentTurnId === props.turnId);

function getSpeakerMeta(speakerName) {
  if (!speakerName) return { avatar: '🗣️', className: 'avatar-li', roleLabel: '会话成员', voice: 'ja-JP-NanamiNeural' };
  if (speakerName.includes('李')) {
    return { avatar: '👨‍💻', className: 'avatar-li', roleLabel: 'SE / PM', voice: 'ja-JP-NanamiNeural' };
  } else if (speakerName.includes('田中')) {
    return { avatar: '👔', className: 'avatar-tanaka', roleLabel: '客户方部长', voice: 'ja-JP-KeitaNeural' };
  } else if (speakerName.includes('山田')) {
    return { avatar: '📊', className: 'avatar-yamada', roleLabel: '业务主管', voice: 'ja-JP-KeitaNeural' };
  } else if (speakerName.includes('佐藤')) {
    return { avatar: '👩‍💼', className: 'avatar-li', roleLabel: '业务负责', voice: 'ja-JP-NanamiNeural' };
  } else if (speakerName.includes('小林')) {
    return { avatar: '👨‍💼', className: 'avatar-tanaka', roleLabel: '技术经理', voice: 'ja-JP-KeitaNeural' };
  }
  return { avatar: '🗣️', className: 'avatar-li', roleLabel: '会话成员', voice: 'ja-JP-NanamiNeural' };
}

const spkMeta = computed(() => getSpeakerMeta(props.turn.speaker));

// 挖空状态
const keyTerms = computed(() => {
  const terms = [];
  if (props.scene.textbookText && props.scene.textbookText.tokens) {
    props.scene.textbookText.tokens.forEach(t => {
      if (t.isKey && !terms.includes(t.surface)) terms.push(t.surface);
    });
  }
  if (props.scene.vocabulary) {
    props.scene.vocabulary.forEach(v => {
      if (!terms.includes(v.kanji)) terms.push(v.kanji);
    });
  }
  terms.sort((a, b) => b.length - a.length);
  return terms.filter(t => props.turn.jp.includes(t)).slice(0, 3);
});

const clozeHtml = computed(() => {
  return generateClozeHtml(props.turn.jpWithRuby || props.turn.jp, keyTerms.value);
});

// 默写 / 角色扮演
const userInput = ref('');
const diffResult = ref(null);
const isStandardRevealed = ref(false);

// AI 诊断
const aiReviewResult = ref(null);
const isAiReviewing = ref(false);

function handlePlayAudio() {
  if (isCurrentlyPlaying.value) {
    stop();
  } else {
    const audioTarget = props.turn._isCustom ? null : props.audioUrl;
    speak(props.turn.jp, audioTarget, props.turnId, null, spkMeta.value.voice);
  }
}

function handleToggleMastery() {
  toggleMastered(props.turnId);
}

function handleToggleWeakness() {
  toggleWeakness(props.turnId);
}

function handleClozeClick(e) {
  const mask = e.target.closest('.cloze-mask');
  if (mask) {
    const placeholder = mask.querySelector('.mask-placeholder');
    const answer = mask.querySelector('.mask-answer');
    if (placeholder && answer) {
      if (placeholder.style.display !== 'none') {
        placeholder.style.display = 'none';
        answer.style.display = 'inline';
        mask.classList.add('revealed');
      } else {
        placeholder.style.display = 'inline';
        answer.style.display = 'none';
        mask.classList.remove('revealed');
      }
    }
  }
}

// 实时监测输入内容：打字时实时计算匹配度并高亮已输入字词，但全对前绝不泄露标准范例
watch(userInput, (newVal) => {
  const text = (newVal || '').trim();
  if (!text) {
    diffResult.value = null;
    isStandardRevealed.value = false;
    return;
  }

  // 只要有输入，实时计算 Diff、匹配率与视觉高亮（实时监测面板立即呈现）
  const res = computeJapaneseDiff(text, props.turn.jp, props.turn.jpWithRuby);
  diffResult.value = res;

  // 如果全部输对（100%），自动揭晓标准范例原句并标记熟练
  if (res.score === 100) {
    isStandardRevealed.value = true;
    markMastered(props.turnId, true);
  }
});

// 切换台词时重置状态
watch(() => props.turnId, () => {
  userInput.value = '';
  diffResult.value = null;
  isStandardRevealed.value = false;
  aiReviewResult.value = null;
});

function handleCheckDiff() {
  if (!userInput.value.trim()) {
    return;
  }
  const res = computeJapaneseDiff(userInput.value, props.turn.jp, props.turn.jpWithRuby);
  diffResult.value = res;
  isStandardRevealed.value = true;
  if (res.score === 100) {
    markMastered(props.turnId, true);
  }
}

async function handleAiReview() {
  if (!userInput.value.trim()) {
    alert('请先输入您的日文发言，再请求 AI 导师诊断！');
    return;
  }
  if (!isConfigured.value) {
    alert('请先点击右上角【🤖 AI私教】配置通义千问 API Key！');
    return;
  }

  isAiReviewing.value = true;
  try {
    const review = await reviewRoleplay({
      userText: userInput.value,
      standardJp: props.turn.jp,
      standardZh: props.turn.zh,
      speaker: props.turn.speaker,
      scene: props.scene
    });
    aiReviewResult.value = review;
  } catch (err) {
    alert(`AI 导师诊断失败: ${err.message || '网络连接异常'}`);
  } finally {
    isAiReviewing.value = false;
  }
}
</script>

<template>
  <div
    :class="[
      'dialogue-turn',
      {
        'is-mastered': mastered,
        'is-weakness': weak,
        'audio-active': isCurrentlyPlaying
      }
    ]"
    :data-turn-id="turnId"
  >
    <!-- 左侧发言人头像列 -->
    <div class="speaker-col">
      <div :class="['speaker-avatar-circle', spkMeta.className]">
        {{ spkMeta.avatar }}
      </div>
      <div class="speaker-meta-wrap">
        <div class="speaker-label-name">{{ turn.speaker }}</div>
        <div class="speaker-label-role">{{ spkMeta.roleLabel }}</div>
      </div>
    </div>

    <!-- 右侧气泡列 -->
    <div class="dialogue-bubble-col">
      <div class="dialogue-top-line">
        <div class="turn-header-actions">
          <!-- 熟练度标记 -->
          <button
            :class="['btn-turn-mastery', { 'mastered': mastered }]"
            @click="handleToggleMastery"
            title="点击切换背熟状态"
          >
            <span class="star-icon">{{ mastered ? '★' : '☆' }}</span>
            <span class="star-label">{{ mastered ? '已背熟' : '记为背熟' }}</span>
          </button>

          <!-- 问AI私教 (唤起从底部升起的抽屉) -->
          <button
            class="btn-turn-ai-tutor"
            @click="emit('ask-ai', turn)"
            title="向AI私教深度提问本句用法、客户潜台词或敬语升级"
          >
            <span>🤖 问AI私教</span>
          </button>

          <!-- 快速校对本句 -->
          <button
            class="btn-turn-ai-tutor"
            style="background: #f8fafc; color: #475569; border-color: #cbd5e1;"
            @click="emit('edit-turn', turn)"
            title="点击快速校对或修改课文内容"
          >
            <span>✏️ 校对</span>
          </button>
        </div>

        <!-- 发音朗读按钮 -->
        <button
          class="btn-speak-clause"
          :class="{ 'playing': isCurrentlyPlaying }"
          @click="handlePlayAudio"
          title="点击朗读原声"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>

      <!-- 模式 1：精读全览模式 -->
      <template v-if="mode === 'full'">
        <div class="turn-jp" v-html="turn.jpWithRuby || turn.jp"></div>
        <div class="turn-zh">{{ turn.zh }}</div>
        <div v-if="turn.keyNote" class="turn-note">{{ turn.keyNote }}</div>
      </template>

      <!-- 模式 2：挖空背诵模式 -->
      <template v-else-if="mode === 'cloze'">
        <div class="turn-jp" @click="handleClozeClick" v-html="clozeHtml"></div>
        <div class="turn-zh">{{ turn.zh }}</div>
        <div v-if="turn.keyNote" class="turn-note">{{ turn.keyNote }}</div>
      </template>

      <!-- 模式 3：译日盲背模式 (支持打字比对与揭晓) -->
      <template v-else-if="mode === 'prompt'">
        <div class="turn-zh" style="font-size: 0.96rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">
          {{ turn.zh }}
        </div>
        <div v-if="turn.keyNote" class="turn-note" style="margin-bottom: 0.6rem;">
          {{ turn.keyNote }}
        </div>

        <div class="input-check-box">
          <div class="input-check-header">
            <span class="input-check-label">✍️ 默写实战（输入日文原句，支持语音转文字）：</span>
            <button class="btn-skip-input" @click="isStandardRevealed = !isStandardRevealed">
              {{ isStandardRevealed ? '隐藏范例 🙈' : '直接揭晓范例 👁️' }}
            </button>
          </div>

          <div class="input-field-wrap">
            <textarea
              v-model="userInput"
              class="user-jp-input"
              rows="2"
              placeholder="请在此输入日语对白（全部输对将自动通过，或点击「核对」查看）..."
              @keydown.enter.ctrl="handleCheckDiff"
              @keydown.enter.meta="handleCheckDiff"
            ></textarea>
            <button class="btn-submit-check" @click="handleCheckDiff" title="核对答案 (可按 Ctrl/Cmd+Enter)">
              <span>核对 ⚡</span>
            </button>
          </div>

          <div v-if="diffResult" class="check-result-panel" style="margin-top: 0.75rem;">
            <div class="check-score-bar">
              <span :class="['check-score-badge', diffResult.scoreBadgeClass]">
                <span class="score-num">{{ diffResult.score }}%</span> 实时匹配
              </span>
              <span class="check-score-tip" v-html="diffResult.tipHtml"></span>
            </div>
            <div class="diff-box">
              <div class="diff-line diff-user-row">
                <span class="diff-label">您的输入：</span>
                <span class="user-diff-content" v-html="diffResult.userDiffHtml"></span>
              </div>
              <div v-if="isStandardRevealed" class="diff-line diff-standard-row">
                <span class="diff-label">标准范例：</span>
                <span class="standard-diff-content" v-html="turn.jpWithRuby || turn.jp"></span>
                <button class="btn-speak-standard" @click="handlePlayAudio">🔊 听原声</button>
              </div>
            </div>
            <div class="prompt-action-bar" style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
              <button class="btn-prompt-pass" @click="markMastered(turnId, true)">👍 我背对了（标记熟练）</button>
              <button class="btn-prompt-retry" @click="toggleWeakness(turnId)">🔄 还要再练（加入生疏本）</button>
            </div>
          </div>
          <div v-else-if="isStandardRevealed" class="diff-line diff-standard-row" style="margin-top: 0.75rem; padding: 0.6rem 0.85rem; background: #f0fdf4; border-radius: 8px;">
            <span class="diff-label" style="font-weight: 700; color: #166534;">标准范例：</span>
            <span class="standard-diff-content" v-html="turn.jpWithRuby || turn.jp"></span>
            <button class="btn-speak-standard" @click="handlePlayAudio">🔊 听原声</button>
          </div>
        </div>
      </template>

      <!-- 模式 4：模拟开会实战模式 -->
      <template v-else-if="mode === 'roleplay'">
        <div class="turn-zh" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">
          {{ turn.zh }}
        </div>
        <div v-if="turn.keyNote" class="turn-note" style="margin-bottom: 0.6rem;">
          {{ turn.keyNote }}
        </div>

        <div class="rp-prompt-box">
          <div class="rp-prompt-title">
            <span>🎤 轮到您发言（角色：{{ turn.speaker }}）</span>
          </div>
          <div class="rp-zh-text">请看中文诉求，在此输入您的回答并核对 ➜ 系统将实时比对并播放范例：</div>
          <div style="margin-top: 0.5rem;">
            <textarea
              v-model="userInput"
              class="user-rp-input"
              rows="2"
              placeholder="在此输入您的日文发言（全部输对将自动通过，或点击下方提交核对）..."
              @keydown.enter.ctrl="handleCheckDiff"
              @keydown.enter.meta="handleCheckDiff"
            ></textarea>
            <div class="rp-input-actions">
              <button class="btn-rp-submit-check" @click="handleCheckDiff">
                <span>🚀 提交发言并核对</span>
              </button>
              <button class="btn-skip-input btn-rp-skip-input" @click="isStandardRevealed = !isStandardRevealed">
                {{ isStandardRevealed ? '隐藏范例 🙈' : '直接看范例 👁️' }}
              </button>
              <button
                type="button"
                class="btn-skip-input btn-rp-ai-eval"
                :disabled="isAiReviewing"
                @click="handleAiReview"
              >
                <span>{{ isAiReviewing ? '🤖 导师诊断中...' : '🤖 AI 导师点评' }}</span>
              </button>
            </div>
          </div>

          <div v-if="diffResult" class="check-result-panel" style="margin-top: 0.75rem;">
            <div class="check-score-bar">
              <span :class="['check-score-badge', diffResult.scoreBadgeClass]">
                <span class="score-num">{{ diffResult.score }}%</span> 教材吻合度
              </span>
              <span class="check-score-tip" v-html="diffResult.tipHtml"></span>
            </div>
            <div class="diff-box">
              <div class="diff-line diff-user-row">
                <span class="diff-label">您的作答：</span>
                <span class="user-diff-content" v-html="diffResult.userDiffHtml"></span>
              </div>
              <div v-if="isStandardRevealed" class="diff-line diff-standard-row">
                <span class="diff-label">标准范例：</span>
                <span class="standard-diff-content" v-html="turn.jpWithRuby || turn.jp"></span>
                <button class="btn-speak-standard" @click="handlePlayAudio">🔊 听原声</button>
              </div>
            </div>
          </div>

          <!-- AI 导师5维诊断卡片 -->
          <div v-if="aiReviewResult" class="rp-ai-eval-container" style="margin-top: 1rem; padding: 1rem 1.25rem; background: #faf5ff; border: 1.5px solid #d8b4fe; border-radius: 12px;">
            <div style="font-weight: 800; color: #6b21a8; font-size: 0.95rem; margin-bottom: 0.5rem; border-bottom: 1px dashed #e9d5ff; padding-bottom: 0.35rem;">
              🏆 资深对日IT总监 · 5维度实战诊断报告
            </div>
            <div class="markdown-body" v-html="renderMarkdown(aiReviewResult)"></div>
          </div>
        </div>
      </template>

      <!-- 知识点透镜微标签 -->
      <div v-if="keyTerms.length" class="turn-knowledge-tags" style="margin-top: 0.5rem;">
        <span
          v-for="t in keyTerms"
          :key="t"
          class="k-tag-btn"
          style="display: inline-block; margin-right: 0.35rem; margin-bottom: 0.25rem; padding: 0.15rem 0.5rem; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 999px; font-size: 0.72rem; color: #1e40af; font-weight: 600;"
        >
          💡 {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>
