import { ref, computed } from 'vue';
import { KNOWLEDGE_BASE } from '../data/scenes.js';
import { useQwen } from './useQwen.js';

const STORAGE_KEY = 'nhg_scene_corrections_v1';

function loadStoredCorrections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('加载课文校正配置失败:', e);
  }
  return {};
}

function persistCorrections(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('保存课文校正数据失败:', e);
  }
}

// 全局唯一的响应式校正字典
const corrections = ref(loadStoredCorrections());

export function useSceneCorrection() {
  const { callQwen, isConfigured } = useQwen();

  // 将官方课文与用户本地校正合并后的响应式课文集合
  const scenes = computed(() => {
    const baseScenes = KNOWLEDGE_BASE.scenes || [];
    return baseScenes.map(origScene => {
      const corr = corrections.value[origScene.id];
      if (!corr) return origScene;

      // 深度克隆合并
      const merged = JSON.parse(JSON.stringify(origScene));
      merged._hasCustomCorrection = true;
      merged._correctionUpdatedAt = corr.updatedAt;

      if (corr.textbookDialogue && Array.isArray(corr.textbookDialogue)) {
        if (!merged.textbookText) merged.textbookText = {};
        merged.textbookText.dialogue = corr.textbookDialogue;
        // 同步更新全文检索 audioText
        merged.textbookText.audioText = corr.textbookDialogue.map(d => d.jp).join(' ');
      }

      if (corr.practicePassages && Array.isArray(corr.practicePassages)) {
        merged.practicePassages = corr.practicePassages;
      }

      return merged;
    });
  });

  function hasCorrection(sceneId) {
    return !!corrections.value[sceneId];
  }

  function getSceneCorrection(sceneId) {
    return corrections.value[sceneId] || null;
  }

  // 保存教材核心对话校对
  function saveTextbookDialogue(sceneId, dialogueList) {
    const updated = {
      ...(corrections.value[sceneId] || {}),
      textbookDialogue: dialogueList.map(turn => ({
        speaker: (turn.speaker || '李').trim(),
        jp: (turn.jp || '').trim(),
        zh: (turn.zh || '').trim(),
        jpWithRuby: turn.jpWithRuby || turn.jp,
        keyNote: turn.keyNote || '',
        _isCustom: true
      })),
      updatedAt: new Date().toISOString()
    };

    corrections.value = {
      ...corrections.value,
      [sceneId]: updated
    };
    persistCorrections(corrections.value);
  }

  // 保存配套演练短文校对
  function savePracticePassages(sceneId, passagesList) {
    const updated = {
      ...(corrections.value[sceneId] || {}),
      practicePassages: passagesList,
      updatedAt: new Date().toISOString()
    };

    corrections.value = {
      ...corrections.value,
      [sceneId]: updated
    };
    persistCorrections(corrections.value);
  }

  // 一键清空单课校对，恢复官方预设
  function resetSceneCorrection(sceneId) {
    if (!corrections.value[sceneId]) return;
    const next = { ...corrections.value };
    delete next[sceneId];
    corrections.value = next;
    persistCorrections(corrections.value);
  }

  // 导出单课校对完整 JSON 片段（可用于直接覆盖进源码）
  function exportSceneJson(sceneId) {
    const target = scenes.value.find(s => s.id === sceneId);
    if (!target) return '';
    return JSON.stringify(target.textbookText?.dialogue || [], null, 2);
  }

  // 导入单课 JSON
  function importSceneJson(sceneId, jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        saveTextbookDialogue(sceneId, parsed);
        return { success: true, count: parsed.length };
      } else if (parsed.textbookText?.dialogue) {
        saveTextbookDialogue(sceneId, parsed.textbookText.dialogue);
        return { success: true, count: parsed.textbookText.dialogue.length };
      }
      throw new Error('未识别到有效的对话数组格式');
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // AI 智能一键解析未排版的教材原文/OCR文本
  async function aiParseDialogue(rawText, sceneContext = '') {
    if (!isConfigured.value) {
      throw new Error('请先在顶部或设置中配置通义千问 API Key');
    }
    if (!rawText || !rawText.trim()) {
      throw new Error('请输入待校对的课文原文文本');
    }

    const systemPrompt = `你是一位精通对日IT业务对话与教材编纂的专家。
任务：将用户提供的教材课文或未结构化对白文本，清洗、角色切分并对齐为高质量结构化对话轮次。
输出要求：
1. 必须输出严格合法的 JSON 数组，不要包裹在 markdown 代码块之外，也不要有任何其他文字说明。
2. 每个对象包含字段：
   - "speaker": 说话人姓名（如 "李"、"田中部長"、"山田課長"、"佐藤"、"小林" 等；尽量从对话中推断真实角色，若无则用实际名称）
   - "jp": 纯日文原句（标点完整，保留专业IT术语）
   - "jpWithRuby": 带有 HTML <ruby> 振假名标签的日文（每个汉字词组标注平假名，如 "<ruby>初めまして<rt>はじめまして</rt></ruby>"）
   - "zh": 严谨、高情商且地道的对日商务中文翻译
   - "keyNote": 核心句型、商务礼节或防雷点缀简析（1句）
3. 严格保留原文意旨，不得擅自遗漏任何一句话。`;

    const userPrompt = `【所属场景业务背景】：${sceneContext || '对日IT商务沟通与需求调研'}
【待校对的教材原文】：
${rawText.trim()}

请立即输出规范的 JSON 数组：`;

    const reply = await callQwen([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      temperature: 0.2, // 低温保真实
      max_tokens: 2500
    });

    let jsonStr = reply.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      throw new Error('AI 返回数据不是有效的数组格式');
    } catch (err) {
      console.error('解析 AI 校对结果失败:', err, jsonStr);
      throw new Error(`AI 输出解析失败: ${err.message}`);
    }
  }

  return {
    scenes,
    hasCorrection,
    getSceneCorrection,
    saveTextbookDialogue,
    savePracticePassages,
    resetSceneCorrection,
    exportSceneJson,
    importSceneJson,
    aiParseDialogue
  };
}
