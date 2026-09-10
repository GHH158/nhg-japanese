<script setup>
import { ref, watch, computed } from 'vue';
import { useSceneCorrection } from '../composables/useSceneCorrection.js';
import { useQwen } from '../composables/useQwen.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  scene: {
    type: Object,
    required: true
  },
  initialTurnIndex: {
    type: Number,
    default: -1
  }
});

const emit = defineEmits(['close', 'saved']);

const {
  hasCorrection,
  saveTextbookDialogue,
  savePracticePassages,
  resetSceneCorrection,
  aiParseDialogue
} = useSceneCorrection();

const { isConfigured } = useQwen();

const activeTab = ref('textbook'); // 'textbook' | 'practice'
const editedTurns = ref([]);
const editedPassages = ref([]);
const selectedPassageIdx = ref(0);

// AI 速录抽屉状态
const isAiPanelOpen = ref(false);
const rawInputText = ref('');
const isAiParsing = ref(false);
const aiError = ref('');
const aiParsedList = ref(null);

// 消息提示
const toastText = ref('');
function showToast(msg) {
  toastText.value = msg;
  setTimeout(() => {
    toastText.value = '';
  }, 2500);
}

// 快速填入角色预设
const commonSpeakers = computed(() => {
  const list = ['李', '田中部長', '山田課長', '佐藤', '小林'];
  if (props.scene?.participants) {
    props.scene.participants.forEach(p => {
      const shortName = p.name.split('（')[0].trim();
      if (!list.includes(shortName)) list.unshift(shortName);
    });
  }
  return list;
});

// 初始化数据
function initData() {
  if (!props.scene) return;
  // 克隆课文对话
  const tb = props.scene.textbookText?.dialogue || [];
  editedTurns.value = JSON.parse(JSON.stringify(tb));

  // 克隆演练短文
  const p = props.scene.practicePassages || [];
  editedPassages.value = JSON.parse(JSON.stringify(p));

  isAiPanelOpen.value = false;
  rawInputText.value = '';
  aiParsedList.value = null;
  aiError.value = '';
}

watch(() => props.isOpen, (open) => {
  if (open) {
    initData();
  }
});

watch(() => props.scene?.id, () => {
  if (props.isOpen) {
    initData();
  }
});

// 插入新句
function handleInsertTurn(index) {
  const newTurn = {
    speaker: editedTurns.value[index]?.speaker || '李',
    jp: '',
    zh: '',
    keyNote: '',
    _isCustom: true
  };
  editedTurns.value.splice(index + 1, 0, newTurn);
  showToast(`已在第 ${index + 2} 句位置插入新对话框`);
}

// 追加新句
function handleAppendTurn() {
  editedTurns.value.push({
    speaker: '李',
    jp: '',
    zh: '',
    keyNote: '',
    _isCustom: true
  });
  showToast('已追加一句新对话');
}

// 删除句子
function handleRemoveTurn(index) {
  if (editedTurns.value.length <= 1) {
    alert('对话至少需保留一句！');
    return;
  }
  editedTurns.value.splice(index, 1);
  showToast('已删除该句');
}

// 移动顺序
function handleMoveTurn(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= editedTurns.value.length) return;
  const item = editedTurns.value.splice(index, 1)[0];
  editedTurns.value.splice(target, 0, item);
}

// AI 智能一键对齐与解析
async function handleTriggerAiParse() {
  if (!rawInputText.value.trim()) {
    aiError.value = '请先在上方输入或粘贴需要校对的教材原文';
    return;
  }
  isAiParsing.value = true;
  aiError.value = '';
  aiParsedList.value = null;

  try {
    const list = await aiParseDialogue(
      rawInputText.value,
      `${props.scene.title} · ${props.scene.background || ''}`
    );
    aiParsedList.value = list;
    showToast(`AI 成功切分并注音 ${list.length} 句对话！`);
  } catch (err) {
    aiError.value = err.message || 'AI 解析失败，请检查网络或配置';
  } finally {
    isAiParsing.value = false;
  }
}

// 采用 AI 解析结果
function applyAiResult(strategy = 'replace') {
  if (!aiParsedList.value || !aiParsedList.value.length) return;

  if (strategy === 'replace') {
    if (confirm(`确定要用 AI 提取的 ${aiParsedList.value.length} 句对话完全替换当前的 ${editedTurns.value.length} 句对话吗？`)) {
      editedTurns.value = JSON.parse(JSON.stringify(aiParsedList.value));
      isAiPanelOpen.value = false;
      aiParsedList.value = null;
      rawInputText.value = '';
      showToast('已完全替换为 AI 校对结果！');
    }
  } else if (strategy === 'append') {
    editedTurns.value.push(...JSON.parse(JSON.stringify(aiParsedList.value)));
    isAiPanelOpen.value = false;
    aiParsedList.value = null;
    rawInputText.value = '';
    showToast(`已将 AI 提取的 ${aiParsedList.value?.length || 0} 句对白追加至文末！`);
  }
}

// 保存并立即应用生效
function handleSave() {
  if (activeTab.value === 'textbook') {
    // 过滤掉完全为空的行
    const valid = editedTurns.value.filter(t => (t.jp && t.jp.trim()) || (t.zh && t.zh.trim()));
    if (valid.length === 0) {
      alert('请至少输入一句有效的对话内容！');
      return;
    }
    saveTextbookDialogue(props.scene.id, valid);
    showToast('🎉 课文校对保存成功！页面已即时热更新！');
  } else {
    savePracticePassages(props.scene.id, editedPassages.value);
    showToast('🎉 演练短文校对保存成功！页面已即时热更新！');
  }

  emit('saved');
  setTimeout(() => {
    emit('close');
  }, 350);
}

// 恢复官方原版
function handleResetDefault() {
  if (confirm(`确定清空本场景【第 ${props.scene.sceneNumber} 课】的所有自定义校对修改，恢复为教材官方原始版本吗？`)) {
    resetSceneCorrection(props.scene.id);
    initData();
    showToast('已恢复为官方预设课文！');
    emit('saved');
  }
}

// 复制 JSON 补丁代码
function handleCopyJson() {
  const data = activeTab.value === 'textbook' ? editedTurns.value : editedPassages.value;
  const jsonStr = JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(jsonStr).then(() => {
    showToast('📋 校对数据 JSON 已复制到剪贴板！可发给开发者永久入库');
  }).catch(() => {
    alert('复制失败，请手动在控制台查看');
  });
}
</script>

<template>
  <div v-if="isOpen" class="correction-modal-backdrop" @click.self="emit('close')">
    <div class="correction-modal-window">
      <!-- 顶栏 -->
      <div class="correction-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.8rem;">📝</div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #1e3a8a;">
                课文内容实时校对与补齐工作台
              </h3>
              <span
                v-if="hasCorrection(scene.id)"
                style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 0.72rem; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 9999px;"
              >
                ✨ 已应用本地校正
              </span>
            </div>
            <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: #64748b;">
              第 {{ scene.sceneNumber }} 场景 · {{ scene.title }} · 随时补正遗漏对话，即时热更新页面与发音
            </p>
          </div>
        </div>

        <button
          class="btn-icon-close"
          style="background: transparent; border: none; font-size: 1.4rem; color: #94a3b8; cursor: pointer; padding: 0.25rem 0.5rem;"
          @click="emit('close')"
          title="关闭窗口"
        >
          ✕
        </button>
      </div>

      <!-- 标签切换与工具条 -->
      <div class="correction-subnav">
        <div style="display: flex; gap: 0.5rem;">
          <button
            :class="['tab-pill', { active: activeTab === 'textbook' }]"
            @click="activeTab = 'textbook'"
          >
            📘 核心课文对话 (共 {{ editedTurns.length }} 句)
          </button>
          <button
            :class="['tab-pill', { active: activeTab === 'practice' }]"
            @click="activeTab = 'practice'"
          >
            📝 配套演练短文 (共 {{ editedPassages.length }} 篇)
          </button>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button
            class="action-pill-btn"
            style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe;"
            @click="isAiPanelOpen = !isAiPanelOpen"
          >
            <span>{{ isAiPanelOpen ? '🙈 收起 AI 快速速录' : '🤖 AI 智能结构化速录' }}</span>
          </button>
        </div>
      </div>

      <!-- AI 智能结构化速录抽屉 -->
      <div v-if="isAiPanelOpen" class="ai-fast-import-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #1e3a8a;">
            🤖 通义千问 · 教材原文快速提取与自动注音
          </span>
          <span style="font-size: 0.78rem; color: #64748b;">
            直接粘贴教材整段日文，AI 将自动识别角色、切分轮次、标注振假名并翻译中文
          </span>
        </div>

        <textarea
          v-model="rawInputText"
          rows="4"
          placeholder="例如粘贴教材整段对话：&#10;李：初めまして、〇〇社の李と申します。本日はお忙しい中、お時間をいただき誠にありがとうございます。&#10;田中：初めまして、田中です。よろしくお願いします。..."
          class="correction-textarea"
          style="margin-bottom: 0.75rem; font-size: 0.88rem;"
        ></textarea>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <button
            class="play-full-btn"
            style="background: #1e3a8a; color: white; padding: 0.45rem 1.2rem; font-size: 0.85rem;"
            :disabled="isAiParsing || !rawInputText.trim()"
            @click="handleTriggerAiParse"
          >
            <span>{{ isAiParsing ? '🤖 正在深度分析角色并注音中...' : '🚀 AI 智能解析并提取对话' }}</span>
          </button>

          <span v-if="aiError" style="font-size: 0.8rem; color: #dc2626; font-weight: 600;">
            ⚠️ {{ aiError }}
          </span>
        </div>

        <!-- AI 提取结果确认卡片 -->
        <div v-if="aiParsedList && aiParsedList.length" style="margin-top: 1rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: #065f46;">
              ✨ 成功解析得到 {{ aiParsedList.length }} 句对话（预览）：
            </span>
            <div style="display: flex; gap: 0.5rem;">
              <button
                class="action-pill-btn"
                style="background: #059669; color: white; border: none; font-size: 0.78rem;"
                @click="applyAiResult('replace')"
              >
                🔄 完全替换当前对话列表
              </button>
              <button
                class="action-pill-btn"
                style="background: white; color: #059669; border: 1px solid #86efac; font-size: 0.78rem;"
                @click="applyAiResult('append')"
              >
                ➕ 追加到末尾
              </button>
            </div>
          </div>
          <div style="max-height: 140px; overflow-y: auto; font-size: 0.82rem; color: #334155; line-height: 1.5; background: white; padding: 0.5rem; border-radius: 6px;">
            <div v-for="(turn, tIdx) in aiParsedList" :key="tIdx" style="margin-bottom: 0.35rem; border-bottom: 1px dashed #e2e8f0; padding-bottom: 0.25rem;">
              <strong style="color: #1e40af;">{{ turn.speaker }}:</strong> {{ turn.jp }}
              <div style="color: #64748b; font-size: 0.75rem;">{{ turn.zh }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心编辑主体区 -->
      <div class="correction-body">
        <!-- 标签 1：教材核心对话 -->
        <div v-if="activeTab === 'textbook'">
          <div
            v-for="(turn, index) in editedTurns"
            :key="index"
            class="turn-edit-card"
          >
            <!-- 轮次序号与角色选择 -->
            <div class="turn-edit-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="turn-seq-badge">#{{ index + 1 }}</span>
                <span style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a;">说话人:</span>
                <input
                  v-model="turn.speaker"
                  type="text"
                  placeholder="角色名"
                  class="speaker-input"
                />
                <!-- 快捷角色标签 -->
                <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                  <button
                    v-for="spk in commonSpeakers"
                    :key="spk"
                    type="button"
                    class="role-quick-btn"
                    :class="{ active: turn.speaker === spk }"
                    @click="turn.speaker = spk"
                  >
                    {{ spk }}
                  </button>
                </div>
              </div>

              <!-- 操作按钮：上移、下移、插入、删除 -->
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                <button
                  class="turn-op-btn"
                  title="上移此句"
                  :disabled="index === 0"
                  @click="handleMoveTurn(index, -1)"
                >
                  ↑
                </button>
                <button
                  class="turn-op-btn"
                  title="下移此句"
                  :disabled="index === editedTurns.length - 1"
                  @click="handleMoveTurn(index, 1)"
                >
                  ↓
                </button>
                <button
                  class="turn-op-btn insert-btn"
                  title="在此句后插入遗漏的句子"
                  @click="handleInsertTurn(index)"
                >
                  ➕ 下方插句
                </button>
                <button
                  class="turn-op-btn delete-btn"
                  title="删除此句"
                  @click="handleRemoveTurn(index)"
                >
                  🗑️
                </button>
              </div>
            </div>

            <!-- 日文原句输入框 -->
            <div style="margin-bottom: 0.6rem;">
              <label style="display: block; font-size: 0.78rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">
                🇯🇵 日文对白原文：
              </label>
              <textarea
                v-model="turn.jp"
                rows="2"
                placeholder="请输入日文对白..."
                class="correction-textarea jp-textarea"
              ></textarea>
            </div>

            <!-- 中文翻译输入框 -->
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 0.25rem;">
                🇨🇳 商务中文精准释义：
              </label>
              <textarea
                v-model="turn.zh"
                rows="2"
                placeholder="请输入地道中文翻译..."
                class="correction-textarea"
              ></textarea>
            </div>
          </div>

          <!-- 底部追加按钮 -->
          <div style="text-align: center; margin: 1.25rem 0;">
            <button
              class="play-full-btn"
              style="background: #eff6ff; color: #1e40af; border: 1.5px dashed #93c5fd; padding: 0.6rem 2rem; font-size: 0.9rem;"
              @click="handleAppendTurn"
            >
              <span>➕ 追加一句新对话到末尾</span>
            </button>
          </div>
        </div>

        <!-- 标签 2：配套演练短文 -->
        <div v-else-if="activeTab === 'practice'">
          <div v-if="editedPassages.length === 0" style="text-align: center; padding: 3rem 1rem; color: #94a3b8;">
            本课暂无配套演练短文
          </div>
          <div v-else>
            <!-- 短文切换器 -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; overflow-x: auto;">
              <button
                v-for="(p, pIdx) in editedPassages"
                :key="pIdx"
                :class="['filter-chip', { active: selectedPassageIdx === pIdx }]"
                @click="selectedPassageIdx = pIdx"
              >
                短文 {{ pIdx + 1 }}: {{ p.title || `练习篇章 ${pIdx + 1}` }}
              </button>
            </div>

            <div v-if="editedPassages[selectedPassageIdx]" class="turn-edit-card">
              <div style="margin-bottom: 0.75rem;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.3rem;">
                  篇章标题：
                </label>
                <input
                  v-model="editedPassages[selectedPassageIdx].title"
                  type="text"
                  class="speaker-input"
                  style="width: 100%;"
                />
              </div>

              <div style="margin-bottom: 0.75rem;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.3rem;">
                  篇章对白列表（共 {{ editedPassages[selectedPassageIdx].dialogue?.length || 0 }} 句）：
                </label>
                <div
                  v-for="(t, tIdx) in editedPassages[selectedPassageIdx].dialogue"
                  :key="tIdx"
                  style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.5rem;"
                >
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="turn-seq-badge">#{{ tIdx + 1 }}</span>
                      <input
                        v-model="t.speaker"
                        type="text"
                        placeholder="角色"
                        class="speaker-input"
                        style="width: 90px;"
                      />
                    </div>
                    <button
                      class="turn-op-btn delete-btn"
                      @click="editedPassages[selectedPassageIdx].dialogue.splice(tIdx, 1)"
                    >
                      🗑️
                    </button>
                  </div>
                  <textarea
                    v-model="t.jp"
                    rows="2"
                    placeholder="日文..."
                    class="correction-textarea jp-textarea"
                    style="margin-bottom: 0.4rem;"
                  ></textarea>
                  <textarea
                    v-model="t.zh"
                    rows="2"
                    placeholder="中文..."
                    class="correction-textarea"
                  ></textarea>
                </div>

                <button
                  class="action-pill-btn"
                  style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; margin-top: 0.5rem;"
                  @click="editedPassages[selectedPassageIdx].dialogue.push({ speaker: '李', jp: '', zh: '' })"
                >
                  ➕ 为本短文追加一句对白
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="correction-footer">
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button
            class="action-pill-btn"
            style="background: white; color: #dc2626; border: 1px solid #fca5a5;"
            title="清空当前课的所有本地修改，恢复为官方预设教材"
            @click="handleResetDefault"
          >
            🔄 恢复官方教材原版
          </button>
          <button
            class="action-pill-btn"
            style="background: white; color: #475569; border: 1px solid #cbd5e1;"
            title="复制干净的 JSON 补丁，可直接提供给开发者合并进源代码永久沉淀"
            @click="handleCopyJson"
          >
            📋 复制校对补丁 (JSON)
          </button>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <button
            class="battle-nav-btn secondary"
            style="padding: 0.5rem 1.25rem; font-size: 0.9rem;"
            @click="emit('close')"
          >
            取消
          </button>
          <button
            class="battle-nav-btn primary"
            style="padding: 0.55rem 1.6rem; font-size: 0.95rem; font-weight: 800;"
            @click="handleSave"
          >
            💾 保存并立即生效 (热更新)
          </button>
        </div>
      </div>
    </div>

    <!-- 浮动 Toast 消息 -->
    <div v-if="toastText" class="correction-toast">
      {{ toastText }}
    </div>
  </div>
</template>

<style scoped>
.correction-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.correction-modal-window {
  max-width: 980px;
  width: 100%;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  animation: modalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.correction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.correction-subnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tab-pill {
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background: white;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-pill.active {
  background: #1e3a8a;
  color: white;
  border-color: #1e3a8a;
}

.action-pill-btn {
  padding: 0.38rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.action-pill-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.ai-fast-import-box {
  background: #eff6ff;
  border-bottom: 2px solid #bfdbfe;
  padding: 1.25rem 1.5rem;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.correction-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
}

.turn-edit-card {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.15rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.15s ease;
}

.turn-edit-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
}

.turn-edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.turn-seq-badge {
  background: #1e3a8a;
  color: white;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
}

.speaker-input {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e3a8a;
  width: 110px;
  outline: none;
}

.speaker-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.role-quick-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #475569;
  padding: 0.2rem 0.45rem;
  cursor: pointer;
}

.role-quick-btn.active {
  background: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
  font-weight: 700;
}

.turn-op-btn {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.25rem 0.55rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}

.turn-op-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #94a3b8;
}

.turn-op-btn.insert-btn {
  background: #f0fdf4;
  color: #166534;
  border-color: #bbf7d0;
}

.turn-op-btn.delete-btn {
  color: #dc2626;
  border-color: #fecaca;
}

.turn-op-btn.delete-btn:hover {
  background: #fef2f2;
}

.correction-textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.92rem;
  line-height: 1.5;
  outline: none;
  font-family: inherit;
  resize: vertical;
}

.correction-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.jp-textarea {
  font-weight: 600;
  color: #0f172a;
}

.correction-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.correction-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: white;
  padding: 0.65rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  z-index: 1100;
  animation: toastFade 0.2s ease;
}

@keyframes toastFade {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
