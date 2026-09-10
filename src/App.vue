<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useMastery } from './composables/useMastery.js';
import { useAudioPlayer } from './composables/useAudioPlayer.js';
import { useSceneCorrection } from './composables/useSceneCorrection.js';

import HeaderNav from './components/HeaderNav.vue';
import DialogueCard from './components/DialogueCard.vue';
import BattleQuizView from './components/BattleQuizView.vue';
import SceneQuizView from './components/SceneQuizView.vue';
import SceneInterviewView from './components/SceneInterviewView.vue';
import UniversalInterviewView from './components/UniversalInterviewView.vue';
import AiBottomSheet from './components/AiBottomSheet.vue';
import AiConfigModal from './components/AiConfigModal.vue';
import SceneCorrectionModal from './components/SceneCorrectionModal.vue';

const { scenes, hasCorrection, resetSceneCorrection } = useSceneCorrection();
const { isMastered, isWeakness } = useMastery();
const { startWalkman, speak, stop, state: audioState } = useAudioPlayer();

// 播放全文时，自动平滑将当前朗读对白卡片滚动至页面正中央
watch(() => audioState.currentTurnId, (newTurnId) => {
  if (!newTurnId) return;
  nextTick(() => {
    setTimeout(() => {
      const cardEl = document.querySelector(`[data-turn-id="${newTurnId}"]`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  });
});

// 全局状态
const showFurigana = ref(true);
const searchQuery = ref('');
const currentSceneIndex = ref(0);
const activeNavTab = ref('all'); // 'all' | 'textbook' | 'practice' | 'vocab' | 'quiz_scene' | 'interview_scene'
const activePassageIndex = ref(0);

// 教材背诵演练模式与过滤
const tbMode = ref('full'); // 'full' | 'cloze' | 'prompt' | 'roleplay'
const tbFilter = ref('all'); // 'all' | 'weakness' | 'unmastered'
const isTbClozeRevealed = ref(false);

// 练习短文背诵演练模式与过滤
const pMode = ref('full'); // 'full' | 'cloze' | 'prompt' | 'roleplay'
const pFilter = ref('all'); // 'all' | 'weakness' | 'unmastered'
const isPClozeRevealed = ref(false);

// 词汇 3D 翻转状态集
const flippedVocabCards = ref(new Set());

// AI 弹层
const isAiSheetOpen = ref(false);
const anchorTurn = ref(null);
const isAiConfigOpen = ref(false);

// 课文内容校正工作台弹层
const isCorrectionModalOpen = ref(false);
const initialCorrectionTurnIndex = ref(-1);

function handleOpenCorrection(turn = null) {
  if (turn && turn.turnId) {
    const idx = tbTurns.value.findIndex(t => t.turnId === turn.turnId);
    initialCorrectionTurnIndex.value = idx >= 0 ? idx : -1;
  } else {
    initialCorrectionTurnIndex.value = -1;
  }
  isCorrectionModalOpen.value = true;
}

const currentScene = computed(() => scenes.value[currentSceneIndex.value] || scenes.value[0]);

// 教材对话队列
const tbTurns = computed(() => {
  const scene = currentScene.value;
  if (!scene?.textbookText?.dialogue) return [];
  return scene.textbookText.dialogue.map((turn, idx) => ({
    ...turn,
    turnId: `s${scene.sceneNumber}-tb-${idx}`,
    audioUrl: `/audio/scene-${scene.sceneNumber}/tb-${idx}.mp3`
  }));
});

const filteredTbTurns = computed(() => {
  return tbTurns.value.filter(turn => {
    if (tbFilter.value === 'weakness') return isWeakness(turn.turnId);
    if (tbFilter.value === 'unmastered') return !isMastered(turn.turnId);
    return true;
  });
});

const tbMasteredCount = computed(() => tbTurns.value.filter(t => isMastered(t.turnId)).length);
const tbWeaknessCount = computed(() => tbTurns.value.filter(t => isWeakness(t.turnId)).length);

// 短篇对话队列
const currentPassage = computed(() => {
  const list = currentScene.value?.practiceTexts || [];
  return list[activePassageIndex.value] || list[0] || null;
});

const passageTurns = computed(() => {
  const scene = currentScene.value;
  const p = currentPassage.value;
  if (!scene || !p?.dialogue) return [];
  return p.dialogue.map((turn, idx) => ({
    ...turn,
    turnId: `s${scene.sceneNumber}-p${p.pNum}-${idx}`,
    audioUrl: `/audio/scene-${scene.sceneNumber}/p${p.pNum}/p${p.pNum}-${idx}.mp3`
  }));
});

const filteredPassageTurns = computed(() => {
  return passageTurns.value.filter(turn => {
    if (pFilter.value === 'weakness') return isWeakness(turn.turnId);
    if (pFilter.value === 'unmastered') return !isMastered(turn.turnId);
    return true;
  });
});

const pMasteredCount = computed(() => passageTurns.value.filter(t => isMastered(t.turnId)).length);
const pWeaknessCount = computed(() => passageTurns.value.filter(t => isWeakness(t.turnId)).length);

// 连播整篇教材
function handlePlayFullTextbook() {
  if (audioState.isPlaying && audioState.isWalkmanActive) {
    stop();
    return;
  }
  const playlist = tbTurns.value.map(t => ({
    id: t.turnId,
    speaker: t.speaker,
    jp: t.jp,
    audioUrl: t.audioUrl,
    speakerVoice: t.speakerVoice
  }));
  startWalkman(playlist, 0);
}

// 连播整篇短文
function handlePlayFullPassage() {
  if (audioState.isPlaying && audioState.isWalkmanActive) {
    stop();
    return;
  }
  const playlist = passageTurns.value.map(t => ({
    id: t.turnId,
    speaker: t.speaker,
    jp: t.jp,
    audioUrl: t.audioUrl,
    speakerVoice: t.speakerVoice
  }));
  startWalkman(playlist, 0);
}

// 唤起随身听 / 停止播放
function handleStartWalkman() {
  if (audioState.isPlaying && audioState.isWalkmanActive) {
    stop();
    return;
  }
  if (activeNavTab.value === 'practice') {
    handlePlayFullPassage();
  } else {
    handlePlayFullTextbook();
  }
}

// 唤起从底部升起的 AI 私教抽屉
function handleOpenAiTutor(turn) {
  anchorTurn.value = turn;
  isAiSheetOpen.value = true;
}

// 翻转 3D 词汇卡
function toggleVocabFlip(idx) {
  const next = new Set(flippedVocabCards.value);
  if (next.has(idx)) next.delete(idx);
  else next.add(idx);
  flippedVocabCards.value = next;
}

function handlePlayVocabAudio(v, idx, e) {
  e.stopPropagation();
  const audioUrl = `/audio/scene-${currentScene.value.sceneNumber}/vocab-${idx}.mp3`;
  speak(v.audio || v.kanji, audioUrl);
}


// 一键揭晓教材全部挖空
function toggleAllTbCloze() {
  isTbClozeRevealed.value = !isTbClozeRevealed.value;
  const container = document.getElementById('textbook-dialogue-flow');
  if (!container) return;
  const masks = container.querySelectorAll('.cloze-mask');
  masks.forEach(mask => {
    const placeholder = mask.querySelector('.mask-placeholder');
    const answer = mask.querySelector('.mask-answer');
    if (placeholder && answer) {
      if (isTbClozeRevealed.value) {
        placeholder.style.display = 'none';
        answer.style.display = 'inline';
        mask.classList.add('revealed');
      } else {
        placeholder.style.display = 'inline';
        answer.style.display = 'none';
        mask.classList.remove('revealed');
      }
    }
  });
}

// 一键揭晓短篇全部挖空
function toggleAllPCloze() {
  isPClozeRevealed.value = !isPClozeRevealed.value;
  const container = document.getElementById('passage-dialogue-flow');
  if (!container) return;
  const masks = container.querySelectorAll('.cloze-mask');
  masks.forEach(mask => {
    const placeholder = mask.querySelector('.mask-placeholder');
    const answer = mask.querySelector('.mask-answer');
    if (placeholder && answer) {
      if (isPClozeRevealed.value) {
        placeholder.style.display = 'none';
        answer.style.display = 'inline';
        mask.classList.add('revealed');
      } else {
        placeholder.style.display = 'inline';
        answer.style.display = 'none';
        mask.classList.remove('revealed');
      }
    }
  });
}
</script>

<template>
  <div id="main-app-container" :class="{ 'hide-furigana': !showFurigana }">
    <!-- 顶部固定导航 Header -->
    <HeaderNav
      v-model:show-furigana="showFurigana"
      v-model:search-query="searchQuery"
      @open-ai-config="isAiConfigOpen = true"
      @open-correction="handleOpenCorrection()"
      @start-walkman="handleStartWalkman"
    />

    <!-- 场景选择器 (Scene Selector - 仅在单课相关学习模式显示) -->
    <div
      v-if="activeNavTab !== 'quiz' && activeNavTab !== 'interview_universal'"
      class="scene-nav-wrapper"
    >
      <div class="scene-nav-inner">
        <div class="scene-label-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>学习场景：</span>
        </div>
        <div id="scene-pills-container" class="scene-pills-list">
          <button
            v-for="(s, idx) in scenes"
            :key="s.id"
            :class="['scene-pill-btn', { active: currentSceneIndex === idx }]"
            @click="currentSceneIndex = idx"
          >
            <span class="scene-pill-badge">S{{ s.sceneNumber }}</span>
            <span>{{ s.badge }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <main class="main-layout">
      <!-- 场景 Hero 简介横幅 (仅在单课相关学习模式显示) -->
      <section
        v-if="activeNavTab !== 'quiz' && activeNavTab !== 'interview_universal'"
        class="hero-card"
        id="scene-hero-banner"
      >
        <div class="hero-badge" id="hero-badge-tag">
          <span>💼 {{ currentScene.domain || '需求定义领域' }}</span>
        </div>
        <h2 class="hero-title" id="hero-title-text">{{ currentScene.title }}</h2>
        <p class="hero-desc" id="hero-desc-text">
          {{ currentScene.background }}
        </p>
      </section>

      <!-- 模块筛选标签栏 -->
      <nav class="nav-tabs" aria-label="学习模块切换">
        <button :class="['tab-btn', { active: activeNavTab === 'all' }]" @click="activeNavTab = 'all'">
          <span>全部</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'textbook' }]" @click="activeNavTab = 'textbook'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>📘 核心课文</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'practice' }]" @click="activeNavTab = 'practice'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          <span>📝 配套短文</span>
          <span class="counter-pill">{{ currentScene.practiceTexts?.length || 5 }}篇</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'vocab' }]" @click="activeNavTab = 'vocab'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>🗂️ 词汇闪卡</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'quiz_scene' }]" @click="activeNavTab = 'quiz_scene'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>🎯 课后测验</span>
          <span class="counter-pill" style="background:#e0e7ff;color:#3730a3;border-color:#c7d2fe;">3题</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'interview_scene' }]" @click="activeNavTab = 'interview_scene'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <span>🎙️ 课后面试</span>
          <span class="counter-pill" style="background:#fef3c7;color:#92400e;border-color:#fde68a;">角色扮演</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'quiz' }]" @click="activeNavTab = 'quiz'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>⚔️ 综合竞技场</span>
          <span class="counter-pill" style="background:#fee2e2;color:#991b1b;border-color:#fecaca;">60题</span>
        </button>
        <button :class="['tab-btn', { active: activeNavTab === 'interview_universal' }]" @click="activeNavTab = 'interview_universal'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>👔 综合模拟面接</span>
          <span class="counter-pill" style="background:#dbeafe;color:#1e40af;border-color:#bfdbfe;">入场终面</span>
        </button>
      </nav>

      <!-- 模块 1：教材核心课文精读区 -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'textbook'"
        id="section-textbook"
        class="module-section"
      >
        <div class="section-header">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <h3 class="section-title">📘 教材核心课文：全景商务研讨</h3>
            <span
              v-if="hasCorrection(currentScene.id)"
              style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.4rem;"
            >
              <span>✨ 已应用本地校对</span>
              <button
                style="background: none; border: none; color: #b45309; text-decoration: underline; cursor: pointer; font-size: 0.75rem; padding: 0;"
                title="清空本课自定义修改，恢复官方预设课文"
                @click="resetSceneCorrection(currentScene.id)"
              >
                恢复原版
              </button>
            </span>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <!-- 课文校对工作台入口 -->
            <button
              class="play-full-btn"
              style="background: white; color: #1e3a8a; border: 1px solid #cbd5e1;"
              title="校对本课课文、修改错误、补齐遗漏对话或使用AI一键提取"
              @click="handleOpenCorrection()"
            >
              <span>✏️ 校对/补全课文</span>
            </button>

            <button
              class="play-full-btn"
              :class="{ active: audioState.isPlaying && audioState.isWalkmanActive }"
              @click="handlePlayFullTextbook"
              :title="audioState.isPlaying && audioState.isWalkmanActive ? '停止当前连续播报' : '朗读教材完整课文（多角色拟真连播）'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon v-if="!(audioState.isPlaying && audioState.isWalkmanActive)" points="5 3 19 12 5 21 5 3"></polygon>
                <rect v-if="audioState.isPlaying && audioState.isWalkmanActive" x="6" y="4" width="4" height="16"></rect>
                <rect v-if="audioState.isPlaying && audioState.isWalkmanActive" x="14" y="4" width="4" height="16"></rect>
              </svg>
              <span>{{ audioState.isPlaying && audioState.isWalkmanActive ? '停止播报' : '连播整篇对话' }}</span>
              <span class="voice-badge-tag">🎙️ 拟真配音</span>
            </button>
          </div>
        </div>

        <div class="sentence-container">
          <!-- 背诵演练控制栏 -->
          <div class="drill-toolbar" id="tb-drill-toolbar">
            <div class="drill-modes">
              <button :class="['drill-mode-btn', { active: tbMode === 'full' }]" @click="tbMode = 'full'">
                <span>📖 精读全览</span>
              </button>
              <button :class="['drill-mode-btn', { active: tbMode === 'cloze' }]" @click="tbMode = 'cloze'">
                <span>🧩 挖空背诵</span>
              </button>
              <button :class="['drill-mode-btn', { active: tbMode === 'prompt' }]" @click="tbMode = 'prompt'">
                <span>🎯 译日盲背</span>
              </button>
              <button :class="['drill-mode-btn', { active: tbMode === 'roleplay' }]" @click="tbMode = 'roleplay'">
                <span>🎭 模拟开会</span>
              </button>
            </div>
            <div class="drill-extra">
              <button
                v-if="tbMode === 'cloze'"
                class="cloze-toggle-all-btn"
                @click="toggleAllTbCloze"
                title="一键全部揭晓或重新遮挡"
              >
                <span>{{ isTbClozeRevealed ? '🙈 重新遮挡' : '👁️ 揭晓全部' }}</span>
              </button>
              <div class="drill-filter-group">
                <button :class="['filter-chip', { active: tbFilter === 'all' }]" @click="tbFilter = 'all'">全部</button>
                <button
                  :class="['filter-chip', 'chip-weakness', { active: tbFilter === 'weakness' }]"
                  @click="tbFilter = 'weakness'"
                >
                  <span>⚡ 重点生疏</span>
                  <span class="weakness-badge">{{ tbWeaknessCount }}</span>
                </button>
                <button :class="['filter-chip', { active: tbFilter === 'unmastered' }]" @click="tbFilter = 'unmastered'">☆ 待背熟</button>
              </div>
              <div class="mastery-stat-chip">
                <span>背熟: <strong>{{ tbMasteredCount }}</strong>/<span>{{ tbTurns.length }}</span></span>
              </div>
            </div>
          </div>

          <!-- 对话流 -->
          <div id="textbook-dialogue-flow">
            <DialogueCard
              v-for="turn in filteredTbTurns"
              :key="turn.turnId"
              :turn="turn"
              :turn-id="turn.turnId"
              :scene="currentScene"
              :mode="tbMode"
              :audio-url="turn.audioUrl"
              :show-furigana="showFurigana"
              @ask-ai="handleOpenAiTutor"
              @edit-turn="handleOpenCorrection"
            />
          </div>
        </div>
      </section>

      <!-- 模块 2：配套练习·5篇短文精读区 -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'practice'"
        id="section-practice"
        class="module-section"
      >
        <div class="section-header">
          <h3 class="section-title">📝 配套练习：5篇短文拓展闯关</h3>
          <button
            class="play-full-btn"
            style="background: white; color: #1e3a8a; border: 1px solid #cbd5e1;"
            title="校对本课配套练习短文内容"
            @click="handleOpenCorrection()"
          >
            <span>✏️ 校对短文内容</span>
          </button>
        </div>

        <div class="practice-container-card">
          <div class="passage-selector-header">
            <div class="passage-selector-label">
              <span>练习短文选择：</span>
            </div>
            <div id="passage-tabs-container" class="passage-tabs">
              <button
                v-for="(p, pIdx) in currentScene.practiceTexts"
                :key="p.pNum"
                :class="['passage-tab-btn', { active: activePassageIndex === pIdx }]"
                @click="activePassageIndex = pIdx"
              >
                短文 {{ p.pNum }}：{{ p.title }}
              </button>
            </div>
          </div>

          <div v-if="currentPassage" class="passage-body">
            <div class="passage-meta-banner">
              <div>
                <div class="passage-title-text">{{ currentPassage.title }}</div>
                <div class="passage-focus-text">{{ currentPassage.theme }} · {{ currentPassage.objective }}</div>
              </div>
              <button
                class="play-full-btn"
                :class="{ active: audioState.isPlaying && audioState.isWalkmanActive }"
                @click="handlePlayFullPassage"
                :title="audioState.isPlaying && audioState.isWalkmanActive ? '停止当前连续播报' : '朗读该篇短文（多角色拟真连播）'"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon v-if="!(audioState.isPlaying && audioState.isWalkmanActive)" points="5 3 19 12 5 21 5 3"></polygon>
                  <rect v-if="audioState.isPlaying && audioState.isWalkmanActive" x="6" y="4" width="4" height="16"></rect>
                  <rect v-if="audioState.isPlaying && audioState.isWalkmanActive" x="14" y="4" width="4" height="16"></rect>
                </svg>
                <span>{{ audioState.isPlaying && audioState.isWalkmanActive ? '停止播报' : '连播本篇短文' }}</span>
                <span class="voice-badge-tag">🎙️ 拟真配音</span>
              </button>
            </div>

            <div class="sentence-container">
              <!-- 短文背诵演练控制栏 -->
              <div class="drill-toolbar" id="p-drill-toolbar">
                <div class="drill-modes">
                  <button :class="['drill-mode-btn', { active: pMode === 'full' }]" @click="pMode = 'full'">
                    <span>📖 精读全览</span>
                  </button>
                  <button :class="['drill-mode-btn', { active: pMode === 'cloze' }]" @click="pMode = 'cloze'">
                    <span>🧩 挖空背诵</span>
                  </button>
                  <button :class="['drill-mode-btn', { active: pMode === 'prompt' }]" @click="pMode = 'prompt'">
                    <span>🎯 译日盲背</span>
                  </button>
                  <button :class="['drill-mode-btn', { active: pMode === 'roleplay' }]" @click="pMode = 'roleplay'">
                    <span>🎭 模拟开会</span>
                  </button>
                </div>
                <div class="drill-extra">
                  <button
                    v-if="pMode === 'cloze'"
                    class="cloze-toggle-all-btn"
                    @click="toggleAllPCloze"
                    title="一键全部揭晓或重新遮挡"
                  >
                    <span>{{ isPClozeRevealed ? '🙈 重新遮挡' : '👁️ 揭晓全部' }}</span>
                  </button>
                  <div class="drill-filter-group">
                    <button :class="['filter-chip', { active: pFilter === 'all' }]" @click="pFilter = 'all'">全部</button>
                    <button
                      :class="['filter-chip', 'chip-weakness', { active: pFilter === 'weakness' }]"
                      @click="pFilter = 'weakness'"
                    >
                      <span>⚡ 重点生疏</span>
                      <span class="weakness-badge">{{ pWeaknessCount }}</span>
                    </button>
                    <button :class="['filter-chip', { active: pFilter === 'unmastered' }]" @click="pFilter = 'unmastered'">☆ 待背熟</button>
                  </div>
                  <div class="mastery-stat-chip">
                    <span>背熟: <strong>{{ pMasteredCount }}</strong>/<span>{{ passageTurns.length }}</span></span>
                  </div>
                </div>
              </div>

              <!-- 短文对话流 -->
              <div id="passage-dialogue-flow">
                <DialogueCard
                  v-for="turn in filteredPassageTurns"
                  :key="turn.turnId"
                  :turn="turn"
                  :turn-id="turn.turnId"
                  :scene="currentScene"
                  :mode="pMode"
                  :audio-url="turn.audioUrl"
                  :show-furigana="showFurigana"
                  @ask-ai="handleOpenAiTutor"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- 模块 4：智能 3D 词汇闪卡 -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'vocab'"
        id="section-vocab"
        class="module-section"
      >
        <div class="section-header">
          <h3 class="section-title">🗂️ 智能 3D 词汇闪卡：立体记忆</h3>
        </div>
        <div class="flashcards-grid">
          <div
            v-for="(v, vIdx) in currentScene.vocabulary"
            :key="v.kanji"
            :class="['flashcard-3d', { flipped: flippedVocabCards.has(vIdx) }]"
            @click="toggleVocabFlip(vIdx)"
          >
            <div class="flashcard-inner">
              <!-- 正面 -->
              <div class="flashcard-front">
                <div class="flashcard-badge">{{ v.level }} · {{ v.pos }}</div>
                <div>
                  <div class="vocab-kanji">{{ v.kanji }}</div>
                  <div class="vocab-reading">{{ v.reading }}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button
                    class="btn-speak-clause"
                    title="朗读"
                    @click="handlePlayVocabAudio(v, vIdx, $event)"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </button>
                  <div class="card-hint-flip">点击翻转卡片 🔄</div>
                </div>
              </div>

              <!-- 背面 -->
              <div class="flashcard-back">
                <div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary); margin-bottom: 0.35rem;">{{ v.kanji }}</div>
                  <div class="vocab-zh">{{ v.zh }}</div>
                  <div class="vocab-phrase" style="text-align: left; margin-top: 0.75rem;">
                    <strong>搭配：</strong><span v-html="v.phraseWithRuby || v.phrase"></span>
                  </div>
                </div>
                <div>
                  <div class="card-hint-flip" style="margin-bottom: 0.4rem;">点击再次翻回 🔄</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块 5：本课课后靶向测验 (专属当前课 3 题精练) -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'quiz_scene'"
        id="section-scene-quiz"
        class="module-section"
      >
        <SceneQuizView
          :scene="currentScene"
          @ask-ai="handleOpenAiTutor"
          @go-universal="activeNavTab = 'quiz'"
        />
      </section>

      <!-- 模块 6：本课 AI 角色扮演模拟面试 (纯AI现场 3 问) -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'interview_scene'"
        id="section-scene-interview"
        class="module-section"
      >
        <SceneInterviewView
          :scene="currentScene"
          @ask-ai="handleOpenAiTutor"
          @open-config="isAiConfigOpen = true"
          @go-universal="activeNavTab = 'interview_universal'"
        />
      </section>

      <!-- 模块 7：跨场景全能大竞技场 (不属于任何一课，跨场景综合挑战) -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'quiz'"
        id="section-quiz"
        class="module-section"
      >
        <BattleQuizView @ask-ai="handleOpenAiTutor" />
      </section>

      <!-- 模块 8：全场景实战模拟面试 (日企现场入场·终面全流程) -->
      <section
        v-if="activeNavTab === 'all' || activeNavTab === 'interview_universal'"
        id="section-universal-interview"
        class="module-section"
      >
        <UniversalInterviewView
          @ask-ai="handleOpenAiTutor"
          @open-config="isAiConfigOpen = true"
        />
      </section>
    </main>

    <!-- 从底部升起的 AI 私教专属答疑抽屉 (Bottom Sheet) -->
    <AiBottomSheet
      :is-open="isAiSheetOpen"
      :anchor-turn="anchorTurn"
      :current-scene="currentScene"
      @close="isAiSheetOpen = false"
      @open-config="isAiConfigOpen = true"
    />

    <!-- AI 配置模态框 -->
    <AiConfigModal
      :is-open="isAiConfigOpen"
      @close="isAiConfigOpen = false"
    />

    <!-- 课文内容实时校对与补齐工作台 -->
    <SceneCorrectionModal
      :is-open="isCorrectionModalOpen"
      :scene="currentScene"
      :initial-turn-index="initialCorrectionTurnIndex"
      @close="isCorrectionModalOpen = false"
      @saved="isCorrectionModalOpen = false"
    />
  </div>
</template>
