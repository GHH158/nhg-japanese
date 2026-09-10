import { ref } from 'vue';

const MASTERY_KEY = 'NHG_RECITE_MASTERY_V1';
const WEAKNESS_KEY = 'NHG_WEAKNESS_SET_V1';

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function saveSet(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// Global reactive state shared across components
const masteredSet = ref(loadSet(MASTERY_KEY));
const weaknessSet = ref(loadSet(WEAKNESS_KEY));

export function useMastery() {
  function isMastered(key) {
    return masteredSet.value.has(key);
  }

  function toggleMastered(key) {
    const next = new Set(masteredSet.value);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    masteredSet.value = next;
    saveSet(MASTERY_KEY, next);
    return next.has(key);
  }

  function markMastered(key, state = true) {
    const next = new Set(masteredSet.value);
    if (state) {
      next.add(key);
    } else {
      next.delete(key);
    }
    masteredSet.value = next;
    saveSet(MASTERY_KEY, next);
  }

  function isWeakness(key) {
    return weaknessSet.value.has(key);
  }

  function toggleWeakness(key) {
    const next = new Set(weaknessSet.value);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    weaknessSet.value = next;
    saveSet(WEAKNESS_KEY, next);
    return next.has(key);
  }

  function addWeakness(key) {
    if (weaknessSet.value.has(key)) return;
    const next = new Set(weaknessSet.value);
    next.add(key);
    weaknessSet.value = next;
    saveSet(WEAKNESS_KEY, next);
  }

  function removeWeakness(key) {
    if (!weaknessSet.value.has(key)) return;
    const next = new Set(weaknessSet.value);
    next.delete(key);
    weaknessSet.value = next;
    saveSet(WEAKNESS_KEY, next);
  }

  return {
    masteredSet,
    weaknessSet,
    isMastered,
    toggleMastered,
    markMastered,
    isWeakness,
    toggleWeakness,
    addWeakness,
    removeWeakness
  };
}
