<script setup>
import { ref, watch } from 'vue';
import { useQwen, QWEN_MODELS } from '../composables/useQwen.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'saved']);

const { config, saveConfig, testConnection } = useQwen();

const formApiKey = ref('');
const formModel = ref('qwen3.7-plus');
const formBaseUrl = ref('/api/chat');
const showKey = ref(false);

const isTesting = ref(false);
const testResult = ref(null); // { success: boolean, msg: string }

watch(() => props.isOpen, (open) => {
  if (open) {
    formApiKey.value = config.value.apiKey || '';
    formModel.value = config.value.model || 'qwen3.7-plus';
    formBaseUrl.value = config.value.baseUrl || '/api/chat';
    testResult.value = null;
  }
});

async function handleTest() {
  if (!formApiKey.value.trim()) {
    testResult.value = { success: false, msg: '请先填入 API Key 才能进行连通性测试' };
    return;
  }
  isTesting.value = true;
  testResult.value = null;
  try {
    const res = await testConnection(formApiKey.value, formModel.value, formBaseUrl.value);
    testResult.value = { success: true, msg: `连接成功！模型应答: "${res}"` };
  } catch (err) {
    testResult.value = { success: false, msg: `连接失败: ${err.message || '网络异常'}` };
  } finally {
    isTesting.value = false;
  }
}

function handleSave() {
  saveConfig({
    apiKey: formApiKey.value,
    model: formModel.value,
    baseUrl: formBaseUrl.value
  });
  emit('saved');
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-backdrop" @click="emit('close')"></div>
    </Transition>

    <Transition name="scale">
      <div v-if="isOpen" class="modal-dialog" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">🤖</span>
            <h3 class="modal-title">通义千问 Qwen AI 私教设置</h3>
          </div>
          <button class="btn-close" @click="emit('close')">✕</button>
        </div>

        <div class="modal-body">
          <!-- API Key Input -->
          <div class="form-group">
            <label class="form-label">
              <span>阿里云 DashScope API Key</span>
              <a href="https://bailian.console.aliyun.com/" target="_blank" rel="noopener" class="link-bailian">获取免费 Key ↗</a>
            </label>
            <div class="input-with-action">
              <input
                :type="showKey ? 'text' : 'password'"
                v-model="formApiKey"
                class="form-control"
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <button class="btn-toggle-eye" type="button" @click="showKey = !showKey">
                {{ showKey ? '🙈' : '👁️' }}
              </button>
            </div>
            <p class="form-help">密钥将仅存储在您的浏览器本地 LocalStorage 中，不会泄露给第三方。</p>
          </div>

          <!-- Model Selection -->
          <div class="form-group">
            <label class="form-label">首选大语言模型</label>
            <select v-model="formModel" class="form-control form-select">
              <option v-for="m in QWEN_MODELS" :key="m.id" :value="m.id">
                {{ m.name }}
              </option>
            </select>
            <p class="form-help">默认推荐 <b>qwen3.7-plus</b>：具备强大的中日跨文化语境推理与高情商商务礼仪诊断能力。</p>
          </div>

          <!-- Base URL (Proxy/Endpoint) -->
          <div class="form-group">
            <label class="form-label">API 代理端点 (Base URL)</label>
            <input
              type="text"
              v-model="formBaseUrl"
              class="form-control"
              placeholder="/api/chat"
            />
            <p class="form-help">保持默认 <code>/api/chat</code> 即可自动适配 Cloudflare Pages 边缘函数与本地代理服务。</p>
          </div>

          <!-- Test Feedback -->
          <div v-if="testResult" :class="['test-alert', testResult.success ? 'is-success' : 'is-error']">
            {{ testResult.msg }}
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn-test"
            :disabled="isTesting"
            @click="handleTest"
          >
            {{ isTesting ? '正在测试...' : '⚡ 测试连通性' }}
          </button>
          <div class="footer-actions">
            <button type="button" class="btn-cancel" @click="emit('close')">取消</button>
            <button type="button" class="btn-save" @click="handleSave">保存配置</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
}

.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid #e2e8f0;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-icon {
  font-size: 1.4rem;
}

.modal-title {
  margin: 0;
  font-size: 1.12rem;
  font-weight: 700;
  color: #0f172a;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
}
.btn-close:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.modal-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  font-weight: 600;
  color: #334155;
}

.link-bailian {
  font-size: 0.8rem;
  color: #4f46e5;
  text-decoration: none;
}
.link-bailian:hover {
  text-decoration: underline;
}

.input-with-action {
  display: flex;
  position: relative;
  align-items: center;
}

.form-control {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.92rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-select {
  background-color: #ffffff;
  cursor: pointer;
}

.btn-toggle-eye {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.7;
}
.btn-toggle-eye:hover {
  opacity: 1;
}

.form-help {
  margin: 0;
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.4;
}

.test-alert {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.test-alert.is-success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.test-alert.is-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
}

.btn-test {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-test:hover:not(:disabled) {
  background: #e0e7ff;
}

.footer-actions {
  display: flex;
  gap: 10px;
}

.btn-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #f1f5f9;
}

.btn-save {
  border: none;
  background: #4f46e5;
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-save:hover {
  background: #4338ca;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: translate(-50%, -46%) scale(0.96);
  opacity: 0;
}
</style>
