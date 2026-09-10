<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useQwen } from '../composables/useQwen.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  anchorTurn: {
    type: Object,
    default: null
  },
  currentScene: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'open-config']);

const { config, isConfigured, askTutor, renderMarkdown } = useQwen();

const messages = ref([]);
const inputText = ref('');
const isLoading = ref(false);
const chatListRef = ref(null);

const quickChips = [
  { label: '💡 客户潜台词', prompt: '请深入剖析这句话背后日本客户的心理、本音与建前（真实顾虑）。' },
  { label: '🛡️ 职场避坑', prompt: '在对日IT开发或商务会谈中，使用这句话有什么必须注意的避坑防雷要点？' },
  { label: '🧐 敬语语法', prompt: '请详细拆解本句中用到的敬语类型、动词变形及语法知识点。' },
  { label: '💎 满分改写', prompt: '请给出1-2种在日本头部商社或外包现场更显成熟老练的地道日文改写范例。' }
];

function scrollToBottom() {
  nextTick(() => {
    if (chatListRef.value) {
      chatListRef.value.scrollTop = chatListRef.value.scrollHeight;
    }
  });
}

watch(() => props.isOpen, (val) => {
  if (val) {
    if (messages.value.length === 0) {
      messages.value.push({
        role: 'assistant',
        content: `👋 **您好！我是您的对日IT商务日语AI私教。**\n\n已为您自动锚定当前对白句子。您可以点击下方快捷问题，或在输入框自由提问！`
      });
    }
    scrollToBottom();
  }
});

async function handleSend(customText = null) {
  const query = (customText || inputText.value || '').trim();
  if (!query) return;

  if (!isConfigured.value) {
    messages.value.push({
      role: 'assistant',
      content: '⚠️ **请先配置 API Key**：点击右上角【🤖 AI私教】填入您的通义千问 API Key 即可畅享专属私教辅导。'
    });
    scrollToBottom();
    return;
  }

  messages.value.push({
    role: 'user',
    content: query
  });
  inputText.value = '';
  isLoading.value = true;
  scrollToBottom();

  try {
    const history = messages.value.slice(0, -1);
    const reply = await askTutor({
      question: query,
      turn: props.anchorTurn,
      scene: props.currentScene,
      history
    });
    messages.value.push({
      role: 'assistant',
      content: reply
    });
  } catch (err) {
    messages.value.push({
      role: 'assistant',
      content: `❌ **获取回答失败**: ${err.message || '网络异常，请重试'}`
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

function handleGlobalKey(e) {
  if (props.isOpen && e.key === 'Escape') {
    emit('close');
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKey);
});
</script>

<template>
  <Teleport to="body">
    <div :class="['drawer-overlay', { 'active': isOpen }]" @click.self="emit('close')">
      <div class="drawer-content" style="max-width: 680px; padding-bottom: 1.5rem;">
        <!-- 抽屉顶部把手 -->
        <div class="drawer-handle-bar" @click="emit('close')" style="cursor: pointer;">
          <div class="drawer-handle"></div>
        </div>

        <!-- 抽屉标题头 -->
        <div class="drawer-header" style="margin-bottom: 0.85rem; padding-bottom: 0.75rem;">
          <div>
            <div class="drawer-badge-row">
              <span class="drawer-badge">🤖 Qwen Private Tutor</span>
              <span class="drawer-pos">{{ config.model || 'qwen3.7-plus' }}</span>
            </div>
            <div class="drawer-title-row">
              <h3 class="drawer-title" style="font-size: 1.25rem;">AI 私教专属深度答疑</h3>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button
              class="btn-skip-input"
              style="font-size: 0.8rem; text-decoration: none; padding: 0.3rem 0.6rem; background: #f1f5f9; border-radius: 6px;"
              @click="emit('open-config')"
            >
              ⚙️ 设置
            </button>
            <button
              class="btn-close-drawer"
              style="border: none; background: #f1f5f9; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #64748b;"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- 锚定对白上下文卡片 -->
        <div
          v-if="anchorTurn"
          style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #1e3a8a; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 0.85rem;"
        >
          <div style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.25rem;">
            🎙️ 当前对白：{{ anchorTurn.speaker }} <span v-if="currentScene" style="color: #64748b; font-weight: normal;">({{ currentScene.badge }})</span>
          </div>
          <div style="font-size: 1rem; font-weight: 600; color: #0f172a; line-height: 1.5;">{{ anchorTurn.jp }}</div>
          <div v-if="anchorTurn.zh" style="font-size: 0.82rem; color: #475569; margin-top: 0.25rem;">{{ anchorTurn.zh }}</div>
        </div>

        <!-- 快捷提问胶囊 -->
        <div style="display: flex; gap: 0.4rem; overflow-x: auto; margin-bottom: 0.85rem; padding-bottom: 0.25rem;">
          <button
            v-for="chip in quickChips"
            :key="chip.label"
            class="filter-chip"
            style="white-space: nowrap; font-size: 0.76rem; padding: 0.3rem 0.65rem; border-color: #c7d2fe; background: #f5f3ff; color: #5b21b6; font-weight: 600;"
            :disabled="isLoading"
            @click="handleSend(chip.prompt)"
          >
            {{ chip.label }}
          </button>
        </div>

        <!-- 聊天流区域 -->
        <div
          ref="chatListRef"
          style="max-height: 40vh; overflow-y: auto; padding: 0.5rem 0.25rem; display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 0.85rem;"
        >
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            :style="{
              display: 'flex',
              gap: '0.6rem',
              maxWidth: '92%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }"
          >
            <div
              :style="{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
                background: msg.role === 'user' ? '#dbeafe' : '#f1f5f9'
              }"
            >
              {{ msg.role === 'user' ? '🧑‍💻' : '🤖' }}
            </div>
            <div
              :style="{
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                fontSize: '0.88rem',
                lineHeight: '1.6',
                background: msg.role === 'user' ? '#1e3a8a' : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#1e293b',
                border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }"
            >
              <div
                v-if="msg.role === 'assistant'"
                class="markdown-body"
                v-html="renderMarkdown(msg.content)"
              ></div>
              <div v-else style="white-space: pre-wrap;">
                {{ msg.content }}
              </div>
            </div>
          </div>

          <!-- 加载思考指示 -->
          <div v-if="isLoading" style="display: flex; gap: 0.6rem; align-self: flex-start;">
            <div style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #f1f5f9;">🤖</div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.65rem 0.95rem; font-size: 0.85rem; color: #64748b; font-style: italic;">
              AI 私教正在深入剖析中...
            </div>
          </div>
        </div>

        <!-- 输入栏 -->
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <input
            v-model="inputText"
            type="text"
            class="header-search-input"
            style="flex: 1; width: auto; border-radius: 10px; padding: 0.6rem 0.85rem; font-size: 0.9rem;"
            placeholder="向AI私教提问本句用法、客户潜台词或敬语升级（回车发送）..."
            :disabled="isLoading"
            @keydown="handleKeydown"
          />
          <button
            class="btn-submit-check"
            style="height: 42px; border-radius: 10px; padding: 0 1.25rem;"
            :disabled="isLoading || !inputText.trim()"
            @click="() => handleSend()"
          >
            <span v-if="isLoading">...</span>
            <span v-else>提问 🚀</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
