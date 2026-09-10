<script setup>
import { useQwen } from '../composables/useQwen.js';
import { useAudioPlayer } from '../composables/useAudioPlayer.js';

const props = defineProps({
  showFurigana: {
    type: Boolean,
    default: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:showFurigana', 'update:searchQuery', 'open-ai-config', 'start-walkman']);

const { config, isConfigured } = useQwen();
const { state: audioState, setRate, toggleRepeat } = useAudioPlayer();

const rates = [0.8, 1.0, 1.2, 1.5];
function handleCycleRate() {
  const currentIdx = rates.indexOf(audioState.playbackRate);
  const nextRate = rates[(currentIdx + 1) % rates.length];
  setRate(nextRate);
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="brand-area">
        <div class="brand-icon">対日</div>
        <div class="brand-text-group">
          <h1 class="brand-title">Japanese Learning Hub</h1>
          <div class="brand-subtitle">
            <span>对日软件需求定义与分析设计</span> · <span>智能场景精进</span>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <div class="search-box-wrapper">
          <input
            type="text"
            placeholder="搜索语法 / 假名 / 词汇..."
            class="header-search-input"
            :value="searchQuery"
            @input="emit('update:searchQuery', $event.target.value)"
          />
        </div>

        <div class="audio-controls-cluster">
          <button
            class="speed-pill-btn"
            @click="handleCycleRate"
            title="点击切换全局播放语速 (0.8x 慢速精听 / 1.0x 标准 / 1.2x 挑战快速)"
          >
            <span>⚡ {{ audioState.playbackRate }}x</span>
          </button>
          <button
            class="loop-pill-btn"
            @click="toggleRepeat"
            title="点击切换单句循环复读模式 (1遍 / 2遍 / 3遍 / 5遍)"
          >
            <span>🔁 {{ audioState.repeatCount }}遍</span>
          </button>
          <button
            class="walkman-launch-btn"
            :class="{ active: audioState.isPlaying && audioState.isWalkmanActive }"
            @click="emit('start-walkman')"
            :title="audioState.isPlaying && audioState.isWalkmanActive ? '停止当前连续播报' : '开启通勤磨耳朵连续播放整篇对话'"
          >
            <span>🎧 {{ audioState.isPlaying && audioState.isWalkmanActive ? '停止' : '随身听' }}</span>
          </button>
        </div>

        <button
          :class="['toggle-chip', { active: showFurigana }]"
          @click="emit('update:showFurigana', !showFurigana)"
          title="开启或隐藏汉字上方的平假名注音"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12h20M12 2v20"></path>
          </svg>
          <span>假名注音：{{ showFurigana ? '已开启' : '已隐藏' }}</span>
        </button>

        <button
          id="btn-ai-config"
          class="btn-ai-config"
          @click="emit('open-ai-config')"
          title="配置通义千问 Qwen AI 助手 (输入API Key与模型设置)"
        >
          <span :class="['ai-status-dot', { 'dot-active': isConfigured }]"></span>
          <span class="ai-btn-text">🤖 AI私教: {{ isConfigured ? (config.model || 'qwen3.7-plus') : '未配置' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
