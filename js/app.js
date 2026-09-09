/**
 * Japanese Learning Hub - Multi-Scene & Intelligent Learning Engine
 * Powered by window.JAPANESE_KNOWLEDGE_BASE
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.JAPANESE_KNOWLEDGE_BASE;
  if (!data || !data.scenes || !data.scenes.length) {
    console.error("Knowledge base data not loaded properly!");
    return;
  }

  // 状态管理
  let currentSceneIndex = 0; // 默认展示场景 1（可随时切换至 场景 2, 11, 12, 21）
  let currentPassageIndex = 0; // 当前选中的短文序号 (0 ~ 4)
  let isFuriganaVisible = true;
  let activeTab = "all";

  // 演播室级神经网络音频 + 智能 TTS 混合控制器
  const AudioController = {
    currentAudio: null,
    currentUtterance: null,
    speakingBtn: null,
    activeCard: null,
    playlistQueue: [],
    playlistIndex: 0,
    isPlaylistPlaying: false,
    playbackRate: 1.0,
    repeatCount: 1,
    loopTimer: null,

    // 停止所有音频播放与重置状态
    stop() {
      if (this.loopTimer) {
        clearTimeout(this.loopTimer);
        this.loopTimer = null;
      }
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.currentUtterance = null;
      this.isPlaylistPlaying = false;
      this.playlistQueue = [];
      this.resetSpeakingState();
    },

    resetSpeakingState() {
      if (this.speakingBtn) {
        this.speakingBtn.classList.remove("playing");
        this.speakingBtn = null;
      }
      if (this.activeCard) {
        this.activeCard.classList.remove("audio-active");
        this.activeCard = null;
      }
    },

    // 播放单句（支持语速调节、单句复读、优先静态 MP3 ➜ 次选 Cloudflare 动态语音接口 /api/tts ➜ 最终平滑回退系统 TTS）
    speak(text, buttonElement = null, audioUrl = null, onFinished = null, voice = "ja-JP-NanamiNeural", loopOverride = null) {
      const isCurrentlyPlaying = this.currentAudio || (window.speechSynthesis && window.speechSynthesis.speaking);
      if (this.speakingBtn === buttonElement && isCurrentlyPlaying) {
        this.stop();
        return;
      }

      this.stop();

      if (buttonElement) {
        this.speakingBtn = buttonElement;
        buttonElement.classList.add("playing");
        const card = buttonElement.closest(".dialogue-turn");
        if (card) {
          this.activeCard = card;
          card.classList.add("audio-active");
        }
      }

      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const targetLoops = (loopOverride !== null) ? loopOverride : this.repeatCount;
      let remainingLoops = targetLoops;

      const handleRoundFinished = () => {
        remainingLoops--;
        if (remainingLoops > 0) {
          this.loopTimer = setTimeout(() => {
            playSingleRound();
          }, 260);
        } else {
          this.resetSpeakingState();
          if (typeof onFinished === "function") onFinished();
        }
      };

      // 云端 /api/tts 动态生成与边缘缓存回退
      const tryCloudflareTtsOrFallback = () => {
        const cfUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(voice)}`;
        const dynamicAudio = new Audio(cfUrl);
        dynamicAudio.playbackRate = this.playbackRate;
        this.currentAudio = dynamicAudio;

        dynamicAudio.onended = () => {
          this.currentAudio = null;
          handleRoundFinished();
        };

        dynamicAudio.onerror = () => {
          // 若在本地未挂载 Worker 或网络离线，自动无缝降级到浏览器 Web Speech
          this.currentAudio = null;
          this.speakTTS(cleanText, handleRoundFinished, "ja-JP");
        };

        const cfPromise = dynamicAudio.play();
        if (cfPromise !== undefined) {
          cfPromise.catch(() => {
            this.currentAudio = null;
            this.speakTTS(cleanText, handleRoundFinished, "ja-JP");
          });
        }
      };

      const playSingleRound = () => {
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.playbackRate = this.playbackRate;
          this.currentAudio = audio;

          audio.onended = () => {
            this.currentAudio = null;
            handleRoundFinished();
          };

          audio.onerror = () => {
            this.currentAudio = null;
            tryCloudflareTtsOrFallback();
          };

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              this.currentAudio = null;
              tryCloudflareTtsOrFallback();
            });
          }
        } else {
          tryCloudflareTtsOrFallback();
        }
      };

      playSingleRound();
    },

    // 浏览器原生 TTS 朗读核心（支持多语言与动态语速）
    speakTTS(text, doneCallback = null, lang = "ja-JP") {
      if (!('speechSynthesis' in window)) {
        if (doneCallback) doneCallback();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = (lang === "zh-CN") ? 1.0 : (0.92 * this.playbackRate);

      const voices = window.speechSynthesis.getVoices();
      if (lang === "ja-JP") {
        const jpVoice = voices.find(v => v.lang === "ja-JP" || v.lang.startsWith("ja")) || null;
        if (jpVoice) utterance.voice = jpVoice;
      } else if (lang === "zh-CN") {
        const zhVoice = voices.find(v => v.lang === "zh-CN" || v.lang.startsWith("zh")) || null;
        if (zhVoice) utterance.voice = zhVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (doneCallback) doneCallback();
      };
      utterance.onerror = () => {
        this.currentUtterance = null;
        if (doneCallback) doneCallback();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    // 顺序连播整篇对白（多角色拟真交替演播，应用实时倍速）
    playSequence(items, masterBtnElement) {
      if (this.isPlaylistPlaying && this.speakingBtn === masterBtnElement) {
        this.stop();
        return;
      }

      this.stop();
      if (!items || !items.length) return;

      this.isPlaylistPlaying = true;
      this.playlistQueue = items;
      this.playlistIndex = 0;
      this.speakingBtn = masterBtnElement;
      if (masterBtnElement) masterBtnElement.classList.add("playing");

      const playNext = () => {
        if (!this.isPlaylistPlaying) return;
        if (this.playlistIndex >= this.playlistQueue.length) {
          this.stop();
          return;
        }

        const currentItem = this.playlistQueue[this.playlistIndex];
        this.playlistIndex++;

        // 激活当前句卡片高亮与平滑跟随
        if (this.activeCard) {
          this.activeCard.classList.remove("audio-active");
        }
        if (currentItem.cardElement) {
          this.activeCard = currentItem.cardElement;
          currentItem.cardElement.classList.add("audio-active");
          currentItem.cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        const onFinished = () => {
          if (!this.isPlaylistPlaying) return;
          // 对话角色交替之间自然停顿 360ms
          setTimeout(playNext, 360);
        };

        if (currentItem.audioUrl) {
          const audio = new Audio(currentItem.audioUrl);
          audio.playbackRate = this.playbackRate;
          this.currentAudio = audio;
          audio.onended = () => {
            this.currentAudio = null;
            onFinished();
          };
          audio.onerror = () => {
            this.currentAudio = null;
            this.speakTTS(currentItem.text, onFinished, "ja-JP");
          };
          audio.play().catch(() => {
            this.currentAudio = null;
            this.speakTTS(currentItem.text, onFinished, "ja-JP");
          });
        } else {
          this.speakTTS(currentItem.text, onFinished, "ja-JP");
        }
      };

      playNext();
    }
  };

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }

  // DOM 容器
  const mainContainer = document.getElementById("main-app-container");
  const scenePillsContainer = document.getElementById("scene-pills-container");
  const heroBadgeTag = document.getElementById("hero-badge-tag");
  const heroTitleText = document.getElementById("hero-title-text");
  const heroDescText = document.getElementById("hero-desc-text");
  
  const textbookDialogueFlow = document.getElementById("textbook-dialogue-flow");
  const playFullTextbookBtn = document.getElementById("play-full-textbook-btn");
  const tokenChipsContainer = document.getElementById("token-chips-container");

  const passageTabsContainer = document.getElementById("passage-tabs-container");
  const currentPassageTitle = document.getElementById("current-passage-title");
  const currentPassageFocus = document.getElementById("current-passage-focus");
  const playPassageBtn = document.getElementById("play-passage-btn");
  const passageDialogueFlow = document.getElementById("passage-dialogue-flow");

  const grammarCardsContainer = document.getElementById("grammar-cards-container");
  const clinicContainer = document.getElementById("clinic-container");
  const vocabCardsContainer = document.getElementById("vocab-cards-container");
  const quizListContainer = document.getElementById("quiz-list-container");

  const toggleFuriganaBtn = document.getElementById("toggle-furigana-btn");
  const tabButtons = document.querySelectorAll(".tab-btn");

  const moduleSections = {
    "textbook": document.getElementById("section-textbook"),
    "practice": document.getElementById("section-practice"),
    "grammar": document.getElementById("section-grammar"),
    "clinic": document.getElementById("section-clinic"),
    "vocab": document.getElementById("section-vocab"),
    "quiz": document.getElementById("section-quiz"),
    "email": document.getElementById("section-email")
  };

  // 背诵演练与知识抽屉状态与 DOM 引用
  let tbMode = 'full'; // 'full' | 'cloze' | 'prompt' | 'roleplay'
  let pMode = 'full';  // 'full' | 'cloze' | 'prompt' | 'roleplay'
  let tbFilter = 'all'; // 'all' | 'weakness' | 'unmastered'
  let pFilter = 'all';  // 'all' | 'weakness' | 'unmastered'
  let tbMyRole = '李';
  let pMyRole = '李';
  let tbClozeAllRevealed = false;
  let pClozeAllRevealed = false;
  let roleplayMeetingActive = false;
  let roleplayMeetingTimer = null;
  let advanceMeetingTurn = null;

  const tbDrillToolbar = document.getElementById("tb-drill-toolbar");
  const pDrillToolbar = document.getElementById("p-drill-toolbar");
  const tbClozeToggleAllBtn = document.getElementById("tb-cloze-toggle-all");
  const pClozeToggleAllBtn = document.getElementById("p-cloze-toggle-all");
  const tbMasteredStat = document.getElementById("tb-mastered-stat");
  const tbTotalStat = document.getElementById("tb-total-stat");
  const pMasteredStat = document.getElementById("p-mastered-stat");
  const pTotalStat = document.getElementById("p-total-stat");

  const drawerOverlay = document.getElementById("knowledge-drawer-overlay");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerBadge = document.getElementById("drawer-badge");
  const drawerPos = document.getElementById("drawer-pos");
  const drawerMeaning = document.getElementById("drawer-meaning");
  const drawerSubtext = document.getElementById("drawer-subtext");
  const drawerSubtextSection = document.getElementById("drawer-subtext-section");
  const drawerExamples = document.getElementById("drawer-examples");
  const drawerExamplesSection = document.getElementById("drawer-examples-section");
  const drawerSpeakBtn = document.getElementById("drawer-speak-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  // 轻量级全局 Toast 提醒
  function showToast(message, duration = 2200) {
    let toast = document.getElementById("nhg-app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "nhg-app-toast";
      toast.style.cssText = `
        position: fixed;
        top: 1.25rem;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 23, 42, 0.94);
        color: #fff;
        padding: 0.6rem 1.25rem;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-20px)";
    }, duration);
  }

  // 背诵掌握度本地持久化追踪器 (Mastery Tracker)
  const MasteryTracker = {
    storageKey: "NHG_RECITE_MASTERY_V1",
    getMasteredSet() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? new Set(JSON.parse(raw)) : new Set();
      } catch (e) {
        return new Set();
      }
    },
    isMastered(key) {
      return this.getMasteredSet().has(key);
    },
    toggle(key) {
      const set = this.getMasteredSet();
      if (set.has(key)) set.delete(key);
      else set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
      return set.has(key);
    },
    markMastered(key, state = true) {
      const set = this.getMasteredSet();
      if (state) set.add(key);
      else set.delete(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    }
  };

  // 重点生疏本与抗遗忘过滤追踪器 (Weakness Tracker)
  const WeaknessTracker = {
    storageKey: "NHG_WEAKNESS_SET_V1",
    getWeaknessSet() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? new Set(JSON.parse(raw)) : new Set();
      } catch (e) {
        return new Set();
      }
    },
    isWeakness(key) {
      return this.getWeaknessSet().has(key);
    },
    add(key) {
      const set = this.getWeaknessSet();
      set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    },
    remove(key) {
      const set = this.getWeaknessSet();
      set.delete(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
    },
    toggle(key) {
      const set = this.getWeaknessSet();
      if (set.has(key)) set.delete(key);
      else set.add(key);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...set]));
      } catch (e) {}
      return set.has(key);
    },
    countInScope(scene, scope = 'tb', passageIdx = 0) {
      if (!scene) return 0;
      const set = this.getWeaknessSet();
      let count = 0;
      if (scope === 'tb' && scene.textbookText && scene.textbookText.dialogue) {
        scene.textbookText.dialogue.forEach((_, idx) => {
          if (set.has(`s${scene.sceneNumber}-tb-${idx}`)) count++;
        });
      } else if (scope === 'p' && scene.practiceTexts && scene.practiceTexts[passageIdx] && scene.practiceTexts[passageIdx].dialogue) {
        const p = scene.practiceTexts[passageIdx];
        p.dialogue.forEach((_, idx) => {
          if (set.has(`s${scene.sceneNumber}-p${p.pNum}-${idx}`)) count++;
        });
      }
      return count;
    }
  };

  // 核心 IT 商务与客户心理潜台词字典 (Curated IT Business & Workplace Nuance Dictionary)
  const IT_KNOWLEDGE_DICT = {
    "要件定義": {
      term: "要件定義（ようけんていぎ）",
      badge: "IT上流工程",
      pos: "名词 / 核心阶段",
      meaning: "需求定义。对日开发中软件生命周期的关键上流工程。将客户业务痛点梳理为系统应具备的功能（機能要件）与性能/安全指标（非機能要件）。",
      subtext: "【职场情商与客户潜台词】日本客户常说「要件定義が固まった（需求已敲定/冻结）」，意味着之后若有新想法必须走追加开发流程。若中途变更，切忌口头答应，必须书面确认影响（影響範囲）。",
      examples: [
        { jp: "来週までに要件定義書を取りまとめて提示いたします。", zh: "下周前我们会汇总好需求定义书并向您提交。" },
        { jp: "要件定義の段階で認識齟齬を潰しておくことが不可欠です。", zh: "在需求定义阶段彻底消除理解偏差是必不可少的。" }
      ]
    },
    "見積もり": {
      term: "見積もり（みつもり）",
      badge: "商务谈判",
      pos: "名词 / 商业测算",
      meaning: "估价单、报价单、工数估算。在对日业务中分为「概算見積もり（粗估）」与「確定見積もり（正式报价）」。",
      subtext: "【职场避坑】在需求未明确前，客户常口头试探“大概多少人月”，此时绝不可报定死数字，必须使用「現時点では概算となりますが…」「要件確定後に正式な見積もりを提出いたします」等缓冲用语留有余地。",
      examples: [
        { jp: "現在見積もりの作成には平均してどのくらいの時間をおかけですか。", zh: "目前制作一份报价单，平均要花费各位多长时间呢？" },
        { jp: "追加要件に伴い、工数の再見積もりが必要となります。", zh: "随着追加需求产生，需要对工数进行重新估算。" }
      ]
    },
    "伺わせていただきます": {
      term: "伺わせていただきます（うかがわせていただきます）",
      badge: "商务最高敬语",
      pos: "使役谦让表现",
      meaning: "请允许我向您请教/听取意见。「伺う（听/问的谦让语）」＋「させて（使役形）」＋「いただきます（得到对方许可/受惠）」。",
      subtext: "【职场修养】比普通的「伺います」更加恭敬温和。在首次与日本部长、客户决策层开会，或探询敏感业务课题时使用，能瞬间建立专业有礼的信赖感。",
      examples: [
        { jp: "本日は田中部長のIT化のご要件について伺わせていただきます。", zh: "今天由我来向田中部长请教IT化改造的具体需求。" }
      ]
    },
    "商談履歴": {
      term: "商談履歴（しょうだんりれき）",
      badge: "SFA核心概念",
      pos: "名词 / 业务数据",
      meaning: "商务洽谈历史记录。SFA（营业支援系统）最核心的模块，记录客户拜访、商谈进展、提案内诺与报价状态。",
      subtext: "【痛点背景】传统日企销售往往把商谈笔记记在个人记事本上，一旦员工离职或请假，案件进展完全失联（属人化）。SFA的核心价值正是将商谈履历一元化共享。",
      examples: [
        { jp: "過去の商談履歴をチーム内で一元化して共有したいと考えています。", zh: "我们希望能将过去的商谈履历在团队内部集中共享。" }
      ]
    },
    "一元化": {
      term: "一元化（いちげんか）",
      badge: "DX系统目标",
      pos: "名・サ変动词",
      meaning: "集中统一管理。将分散在各处、各人的数据与业务流程集中于一个系统平台。",
      subtext: "【提案技巧】向日本客户提案时，用「データの分散（数据离散混乱）」反衬「一元管理による業務効率化（通过一元化提升效率）」，是极其有说服力的王道叙事。",
      examples: [
        { jp: "顧客情報と商談履歴の一元化を図る必要があります。", zh: "有必要实现客户信息与商谈履历的集中统一管理。" }
      ]
    },
    "ばらつき": {
      term: "ばらつき（ばらつき）",
      badge: "业务痛点词",
      pos: "名词 / 统计离散",
      meaning: "参差不齐、离散度、因人而异。常用于表达质量不均、耗时不一等业务波动。",
      subtext: "【痛点表达】搭配动词「ばらつきがある（参差不齐）」「ばらつきを抑える（平抑波动/标准化）」。日本制造与IT文化极重标准化（標準化），发现ばらつき就是系统改造的最佳切入点。",
      examples: [
        { jp: "営業担当者によってスキルのばらつきがあるのが実情です。", zh: "实际情况是各销售代表之间的能力存在参差不齐。" }
      ]
    },
    "あたり": {
      term: "〜あたり（あたり）",
      badge: "IT指标计算",
      pos: "接尾词",
      meaning: "平均每……、按每……基准计算。接在数量词或单位名词后。",
      subtext: "【工数与性能标准】对日开发中必用的计算基准，如「1人月あたり」「1日あたり」「1画面あたり」「1件あたり」。必须熟练表达指标口径。",
      examples: [
        { jp: "平均して1件あたり2時間程度かかっています。", zh: "平均每单大概要耗费2小时左右。" },
        { jp: "1日あたりの処理件数を大幅に引き上げることができます。", zh: "能够大幅提升单日的处理单量。" }
      ]
    },
    "スコープ": {
      term: "スコープ（Scope）",
      badge: "项目管理PM",
      pos: "IT外来语",
      meaning: "项目范围、实施范围。界定本次系统开发包含什么、明确排除什么（スコープ外）。",
      subtext: "【PM核心防御】日本客户追加小需求时经常说「ついでにこれも（顺便把这个也做了）」。合格的BSE/PM必须敢于委婉指出「本フェーズのスコープ外となります」，守住交付底线。",
      examples: [
        { jp: "まずはフェーズ1のスコープを明確に絞り込みましょう。", zh: "首先让我们明确收敛第一阶段的开发范围。" }
      ]
    },
    "フェーズ": {
      term: "フェーズ（Phase）",
      badge: "分期交付",
      pos: "IT外来语",
      meaning: "开发阶段、实施分期。如フェーズ1（Phase 1，最小可用MVP）、フェーズ2。",
      subtext: "【交付策略】面对客户预算不足或工期紧迫时，最佳应对句型：「フェーズ分けをご提案させていただけますでしょうか（容我向您提议分期实施策略）」。",
      examples: [
        { jp: "優先度の高い機能からフェーズ1で先行リリースします。", zh: "从优先级最高的功能开始在第一阶段先行发布上线。" }
      ]
    },
    "プロトタイプ": {
      term: "プロトタイプ（Prototype）",
      badge: "UI/UX原型",
      pos: "IT外来语",
      meaning: "原型系统、模型机。在需求分析阶段用可交互界面与客户拉齐认知。",
      subtext: "【避雷指南】原型虽好，但日本客户看了高保真原型后常误以为“系统已经做好了大部分”，必须澄清「本モックアップは画面イメージ確認用となります」。",
      examples: [
        { jp: "要件確認用のプロトタイプをご用意しましたので、操作感をご確認ください。", zh: "我们准备了用于确认需求的原型，请您体验一下操作手感。" }
      ]
    },
    "棚卸し": {
      term: "棚卸し（たなおろし）",
      badge: "业务整理",
      pos: "名・サ変动词",
      meaning: "盘点、系统性梳理。原为仓库盘点货物，在IT项目中引申为对现有业务、数据、接口进行全面大摸底与清洗整理。",
      subtext: "【常用搭配】「業務の棚卸し」「現行画面の棚卸し」「データの棚卸し」。",
      examples: [
        { jp: "システム設計に入る前に、まずは現行業務の棚卸しを実施します。", zh: "在进入系统设计之前，首先对现有业务开展全面盘点梳理。" }
      ]
    },
    "ボトルネック": {
      term: "ボトルネック（Bottleneck）",
      badge: "系统瓶颈",
      pos: "IT外来语",
      meaning: "瓶颈、阻碍业务通畅的狭窄症结点。",
      subtext: "【表达习惯】日本客户喜欢用「どこがボトルネックになっているか（哪里卡脖子成了瓶颈）」来寻找优化方向。",
      examples: [
        { jp: "承認プロセスが業務フロー全体のボトルネックになっています。", zh: "审批环节成了整个业务流程的最大瓶颈。" }
      ]
    },
    "属人化": {
      term: "属人化（ぞくじんか）",
      badge: "管理痛点",
      pos: "名词 / 风险概念",
      meaning: "个人化依赖。指特定业务只有某一个人懂，其他人无法接手或替代的危险状态。反义词是「標準化（ひょうじゅんか）」。",
      subtext: "【共情利器】聊到系统升级原因，几乎100%的日本客户领导都会对「業務の属人化を防ぎたい」产生强烈共鸣。",
      examples: [
        { jp: "担当者の退職に伴う属人化リスクを解消します。", zh: "彻底消除因员工离职带来的业务属人化风险。" }
      ]
    },
    "代替案": {
      term: "代替案（だいたいあん）",
      badge: "商务博弈",
      pos: "名词 / 解决方案",
      meaning: "替代方案、备选折中案。",
      subtext: "【商务黄金法则】对日开发中绝对不能直接对客户说「出来ません（做不到）」，那是严重缺乏商业素养的体现。正确姿态是：「ご要望の仕様ですと工期に影響が生じますため、代替案として〇〇をご提案したく存じます（若按该规格将影响工期，因此我们提议将XX作为替代方案）」。",
      examples: [
        { jp: "工期短縮に向けた代替案を2案ご用意いたしました。", zh: "为了缩短工期，我们准备了2套替代方案供您选择。" }
      ]
    },
    "検討させていただきます": {
      term: "検討させていただきます（けんとうさせていただきます）",
      badge: "客户潜台词",
      pos: "常用商务应答",
      meaning: "我们会讨论/考虑一下。",
      subtext: "【⚠️ 高危潜台词警告】在对日商务中，当客户说「持ち帰って検討します」或「社内で検討させていただきます」时，在80%以上的情境下其实代表「委婉拒绝或存在巨大顾虑」！切忌干等，应适时跟进「ご検討にあたり、追加で必要な資料や懸念点はございますか」主动打消顾虑。",
      examples: [
        { jp: "ご提案の件、社内で一度検討させていただきます。", zh: "关于您提议的方案，我们内部会先商讨一下（实务潜台词：存在顾虑，需继续跟进）。" }
      ]
    }
  };

  // 打开知识点底部抽屉 (Bottom Sheet Drawer)
  function openKnowledgeDrawer(termKey, scene) {
    let cardData = IT_KNOWLEDGE_DICT[termKey];
    if (!cardData && scene) {
      // 检查词性切片 tokens
      if (scene.textbookText && scene.textbookText.tokens) {
        const tok = scene.textbookText.tokens.find(t => t.surface === termKey || t.surface.includes(termKey));
        if (tok) {
          cardData = {
            term: `${tok.surface}（${tok.reading}）`,
            badge: "课文核心词",
            pos: tok.pos,
            meaning: tok.meaning,
            subtext: `【对日实务提示】在当前场景中属于关键表达，用于拉齐双方认知与需求定义口径。`,
            examples: []
          };
        }
      }
      // 检查语法图鉴
      if (!cardData && scene.grammarPoints) {
        const gp = scene.grammarPoints.find(g => g.title.includes(termKey) || termKey.includes(g.badge));
        if (gp) {
          cardData = {
            term: gp.title,
            badge: gp.badge,
            pos: gp.level,
            meaning: gp.concept,
            subtext: `【详细接续法则】${gp.formula}`,
            examples: (gp.businessExamples || []).map(e => ({ jp: e.jp, zh: e.zh }))
          };
        }
      }
      // 检查词汇
      if (!cardData && scene.vocabulary) {
        const v = scene.vocabulary.find(item => item.kanji === termKey || item.reading === termKey);
        if (v) {
          cardData = {
            term: `${v.kanji}（${v.reading}）`,
            badge: v.level,
            pos: v.pos,
            meaning: v.zh,
            subtext: `【高频词组搭配】${v.phrase || '对日工程常用业务词汇'}`,
            examples: []
          };
        }
      }
    }

    if (!cardData) {
      cardData = {
        term: termKey,
        badge: "IT业务要点",
        pos: "商务表达",
        meaning: `对日软件需求定义与分析设计中的核心词汇/句型。`,
        subtext: `【实战修养】在需求会谈与式样书确认中准确使用，能有效提升沟通专业度。`,
        examples: []
      };
    }

    drawerTitle.textContent = cardData.term.replace(/（.*）/, '');
    drawerBadge.textContent = cardData.badge || "IT业务词";
    drawerPos.textContent = cardData.pos || "商务实务";
    drawerMeaning.textContent = cardData.meaning || "";

    if (cardData.subtext) {
      drawerSubtextSection.style.display = "block";
      drawerSubtext.textContent = cardData.subtext;
    } else {
      drawerSubtextSection.style.display = "none";
    }

    if (cardData.examples && cardData.examples.length) {
      drawerExamplesSection.style.display = "block";
      drawerExamples.innerHTML = cardData.examples.map(ex => `
        <div class="drawer-eg-item">
          <div class="drawer-eg-jp">${ex.jp}</div>
          <div class="drawer-eg-zh">${ex.zh}</div>
        </div>
      `).join("");
    } else {
      drawerExamplesSection.style.display = "none";
    }

    const cleanAudioText = cardData.term.replace(/（[^）]+）/g, '').trim();
    drawerSpeakBtn.onclick = () => {
      AudioController.speak(cleanAudioText, drawerSpeakBtn, null, null, "ja-JP-NanamiNeural");
    };

    drawerOverlay.classList.add("active");
  }

  function closeKnowledgeDrawer() {
    drawerOverlay.classList.remove("active");
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeKnowledgeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", (e) => {
      if (e.target === drawerOverlay) closeKnowledgeDrawer();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeKnowledgeDrawer();
  });

  // 提取单句对白中的核心关键词
  function findKeyTermsInTurn(jpText, scene) {
    const terms = [];
    const allCandidates = Object.keys(IT_KNOWLEDGE_DICT);
    if (scene.textbookText && scene.textbookText.tokens) {
      scene.textbookText.tokens.forEach(t => {
        if (t.isKey && !allCandidates.includes(t.surface)) allCandidates.push(t.surface);
      });
    }
    if (scene.vocabulary) {
      scene.vocabulary.forEach(v => {
        if (!allCandidates.includes(v.kanji)) allCandidates.push(v.kanji);
      });
    }

    allCandidates.sort((a, b) => b.length - a.length);

    allCandidates.forEach(term => {
      const cleanTerm = term.replace(/^[〜~]/, '').trim();
      if (cleanTerm.length >= 2 && jpText.includes(cleanTerm)) {
        if (!terms.includes(cleanTerm)) terms.push(cleanTerm);
      }
    });

    return terms.slice(0, 3); // 每句最多展示3个重点知识胶囊，保证界面清爽
  }

  // 生成挖空背诵 HTML
  function generateClozeHtml(jpWithRuby, keyTerms) {
    let result = jpWithRuby;
    keyTerms.forEach(term => {
      const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(<ruby>[^<]*${safeTerm}[^<]*<rt>[^<]*<\/rt><\/ruby>|${safeTerm})`, 'g');
      result = result.replace(regex, (match) => {
        if (match.startsWith('<span class="cloze-mask"')) return match;
        return `<span class="cloze-mask"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
      });
    });

    // 如果未命中特定术语，则挖空句末核心助动词或敬语
    if (!result.includes('cloze-mask')) {
      result = result.replace(/(伺わせていただきます|いらっしゃいます|頼っている|短縮したい|かかっています|承知しました|ございます|ですね)/, (match) => {
        return `<span class="cloze-mask"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
      });
    }

    return result;
  }

  // 日语输入智能容错与逐字 Diff 比对核心算法
  function computeJapaneseDiff(userInput, targetJp, targetRuby = null) {
    const rawInput = (userInput || "").trim();
    // 基础清洗：移除标点符号、空格与常见括号
    const cleanInput = rawInput.replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
    const cleanTarget = (targetJp || "").replace(/[。、！？\s\.,!?・「」『』（）()]/g, '').trim();

    // 从 Ruby 中提取纯平假名发音流
    let cleanKanaTarget = "";
    if (targetRuby) {
      const kanaStr = targetRuby.replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, '$1')
                                .replace(/<[^>]+>/g, '')
                                .replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
      cleanKanaTarget = kanaStr.trim();
    }

    if (!cleanInput) {
      return {
        score: 0,
        scoreBadgeClass: "score-low",
        tipHtml: "⚠️ 尚未输入内容，请在输入框键入日语或点击直接揭晓",
        userDiffHtml: '<span style="color:#94a3b8;">（未输入内容）</span>',
        isKanaPerfect: false
      };
    }

    // Levenshtein 距离算法
    function getLevenshtein(s1, s2) {
      const m = s1.length;
      const n = s2.length;
      const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (s1[i - 1] === s2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1];
          } else {
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1,
              dp[i - 1][j - 1] + 1
            );
          }
        }
      }
      return dp[m][n];
    }

    const distKanji = getLevenshtein(cleanInput, cleanTarget);
    const distKana = cleanKanaTarget ? getLevenshtein(cleanInput, cleanKanaTarget) : 999;

    const maxLenKanji = Math.max(cleanTarget.length, cleanInput.length) || 1;
    const maxLenKana = cleanKanaTarget ? Math.max(cleanKanaTarget.length, cleanInput.length) : 1;

    const scoreKanji = Math.max(0, Math.round((1 - distKanji / maxLenKanji) * 100));
    const scoreKana = cleanKanaTarget ? Math.max(0, Math.round((1 - distKana / maxLenKana) * 100)) : 0;

    // 判定是否以平假名形式达成完美发音匹配
    const isKanaPerfect = (scoreKana === 100 && scoreKanji < 100);
    const isKanaDominant = (scoreKana > scoreKanji);
    const finalScore = Math.max(scoreKanji, scoreKana);
    const refForDiff = (isKanaDominant && cleanKanaTarget) ? cleanKanaTarget : cleanTarget;

    // 最长公共子序列 (LCS) 回溯生成视觉 Diff
    const m = cleanInput.length;
    const n = refForDiff.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (cleanInput[i - 1] === refForDiff[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = m, j = n;
    const matchedIndices = new Set();
    while (i > 0 && j > 0) {
      if (cleanInput[i - 1] === refForDiff[j - 1]) {
        matchedIndices.add(i - 1);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    let userDiffHtml = "";
    for (let k = 0; k < m; k++) {
      const ch = cleanInput[k];
      if (matchedIndices.has(k)) {
        userDiffHtml += `<span class="diff-char-match">${ch}</span>`;
      } else {
        userDiffHtml += `<span class="diff-char-mismatch" title="与范例存在出入">${ch}</span>`;
      }
    }

    // 评级与建议
    let scoreBadgeClass = "score-low";
    let tipHtml = "";

    if (finalScore === 100) {
      scoreBadgeClass = "score-perfect";
      if (isKanaPerfect) {
        tipHtml = `🌟 <b>发音100%完全吻合！</b><span class="kana-tip-pill">💡 假名读音完全正确，建议结合下方汉字标准写法进阶巩固</span>`;
      } else {
        tipHtml = `🌟 <b>完美契合！</b>字词、敬语与拼写无可挑剔！`;
      }
    } else if (finalScore >= 85) {
      scoreBadgeClass = "score-high";
      tipHtml = `👏 <b>极高准确度！</b>仅存在极少数假名或助词细微出入（见红色划线标注）`;
    } else if (finalScore >= 60) {
      scoreBadgeClass = "score-medium";
      tipHtml = `💡 <b>大意已表达！</b>请对照标准范例核对格助词（に/で/を）与动词变形`;
    } else {
      scoreBadgeClass = "score-low";
      tipHtml = `🔄 <b>存在较多偏差！</b>建议点击标准范例原声反复跟读，再试一次`;
    }

    return {
      score: finalScore,
      scoreBadgeClass,
      tipHtml,
      userDiffHtml,
      isKanaPerfect
    };
  }

  // 统一构建对白卡片 (适配精读全览、挖空背诵、译日盲背、模拟开会四模式，支持实战默写输入与智能核对)
  function createDialogueTurnElement({ turn, turnId, scope, scene, mode, audioUrl = null }) {
    const isMastered = MasteryTracker.isMastered(turnId);
    const isWeak = WeaknessTracker.isWeakness(turnId);
    const spkMeta = getSpeakerMeta(turn.speaker);
    const keyTerms = findKeyTermsInTurn(turn.jp, scene);

    const card = document.createElement("div");
    card.className = `dialogue-turn ${isMastered ? 'is-mastered' : ''} ${isWeak ? 'is-weakness' : ''}`;
    card.setAttribute("data-turn-id", turnId);

    // 知识点透镜微标签
    const tagsHtml = keyTerms.length ? `
      <div class="turn-knowledge-tags">
        ${keyTerms.map(t => `<button class="k-tag-btn" data-term="${t}" title="点击查看【${t}】业务释义与客户潜台词">💡 ${t}</button>`).join("")}
      </div>
    ` : '';

    let bubbleBodyHtml = '';

    if (mode === 'roleplay') {
      // 模式 4：模拟开会实战模式 (角色扮演交替对答，支持输入作答与智能核对)
      const myRole = (scope === 'tb') ? tbMyRole : pMyRole;
      const isMyTurn = (turn.speaker === myRole);

      if (isMyTurn) {
        card.classList.add("is-my-turn");
        bubbleBodyHtml = `
          <div class="turn-zh" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">${turn.zh}</div>
          ${turn.keyNote ? `<div class="turn-note" style="margin-bottom: 0.6rem;">${turn.keyNote}</div>` : ''}
          ${tagsHtml}
          <div class="rp-prompt-box">
            <div class="rp-prompt-title">
              <span>🎤 轮到您发言（角色：${turn.speaker}）</span>
            </div>
            <div class="rp-zh-text">请看中文诉求，在此输入您的回答并核对 ➜ 系统将实时比对并播放范例：</div>
            <div style="margin-top: 0.5rem;">
              <textarea class="user-rp-input" rows="2" placeholder="在此输入您的日文发言（支持手机语音转文字，回车即提交）..."></textarea>
              <div class="rp-input-actions">
                <button class="btn-rp-submit-check">
                  <span>🚀 提交发言并核对</span>
                </button>
                <button class="btn-skip-input btn-rp-skip-input">直接看范例 👁️</button>
              </div>
            </div>
            <div class="rp-check-result" style="display: none;">
              <div class="check-score-bar">
                <span class="check-score-badge score-perfect">
                  <span class="score-num">0%</span> 实时匹配
                </span>
                <span class="check-score-tip">✍️ 实时匹配中（敲击回车或点击提交核对）</span>
              </div>
              <div class="diff-box">
                <div class="diff-line diff-user-row">
                  <span class="diff-label">您的作答：</span>
                  <span class="user-diff-content"></span>
                </div>
                <div class="diff-line diff-standard-row" style="display: none;">
                  <span class="diff-label">标准范例：</span>
                  <span class="standard-diff-content">${turn.jpWithRuby || turn.jp}</span>
                  <button class="btn-speak-standard" title="手动播放原声">🔊 听原声</button>
                </div>
              </div>
              <div class="rp-eval-actions" style="margin-top: 0.75rem; display: none;">
                <button class="btn-rp-pass">👍 我答对了（记为背熟）</button>
                <button class="btn-rp-retry">🔄 还要再练（记入生疏本）</button>
              </div>
            </div>
          </div>
        `;
      } else {
        bubbleBodyHtml = `
          <div class="turn-jp">${turn.jpWithRuby || turn.jp}</div>
          <div class="turn-zh">${turn.zh}</div>
          ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
          ${tagsHtml}
        `;
      }
    } else if (mode === 'prompt') {
      // 模式 3：译日盲背模式 (支持实时打字比对 + 最终核对揭晓标准范例)
      bubbleBodyHtml = `
        <div class="turn-zh" style="font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.6rem;">${turn.zh}</div>
        ${turn.keyNote ? `<div class="turn-note" style="margin-bottom: 0.6rem;">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
        <div class="input-check-box">
          <div class="input-check-header">
            <span class="input-check-label">✍️ 默写实战（输入日文原句，支持语音转文字）：</span>
            <button class="btn-skip-input btn-prompt-skip-input" title="直接看答案">直接揭晓范例 👁️</button>
          </div>
          <div class="input-field-wrap">
            <textarea class="user-jp-input" rows="2" placeholder="请在此输入日语对白（输入中实时比对，回车即核对）..."></textarea>
            <button class="btn-submit-check" title="核对答案">
              <span>核对 ⚡</span>
            </button>
          </div>
          <div class="check-result-panel" style="display: none;">
            <div class="check-score-bar">
              <span class="check-score-badge score-perfect">
                <span class="score-num">0%</span> 实时匹配
              </span>
              <span class="check-score-tip">✍️ 实时匹配中（敲击回车或点击核对揭晓范例）</span>
            </div>
            <div class="diff-box">
              <div class="diff-line diff-user-row">
                <span class="diff-label">您的输入：</span>
                <span class="user-diff-content"></span>
              </div>
              <div class="diff-line diff-standard-row" style="display: none;">
                <span class="diff-label">标准范例：</span>
                <span class="standard-diff-content">${turn.jpWithRuby || turn.jp}</span>
                <button class="btn-speak-standard" title="手动播放原声">🔊 听原声</button>
              </div>
            </div>
            <div class="prompt-action-bar" style="margin-top: 0.75rem; display: none;">
              <button class="btn-prompt-pass">👍 我背对了（标记熟练）</button>
              <button class="btn-prompt-retry">🔄 还要再练（加入生疏本）</button>
            </div>
          </div>
        </div>
      `;
    } else if (mode === 'cloze') {
      // 模式 2：挖空背诵模式 (核心词汇/敬语挖空遮挡，点击揭晓)
      const clozeJp = generateClozeHtml(turn.jpWithRuby || turn.jp, keyTerms);
      bubbleBodyHtml = `
        <div class="turn-jp">${clozeJp}</div>
        <div class="turn-zh">${turn.zh}</div>
        ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
      `;
    } else {
      // 模式 1：精读全览模式 (完整日文正文 + 假名注音 + 知识透镜)
      bubbleBodyHtml = `
        <div class="turn-jp">${turn.jpWithRuby || turn.jp}</div>
        <div class="turn-zh">${turn.zh}</div>
        ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
        ${tagsHtml}
      `;
    }

    card.innerHTML = `
      <div class="speaker-col">
        <div class="speaker-avatar-circle ${spkMeta.className}">${spkMeta.avatar}</div>
        <div class="speaker-meta-wrap">
          <div class="speaker-label-name">${turn.speaker}</div>
          <div class="speaker-label-role">${spkMeta.roleLabel}</div>
        </div>
      </div>
      <div class="dialogue-bubble-col">
        <div class="dialogue-top-line">
          <div class="turn-header-actions">
            <button class="btn-turn-mastery ${isMastered ? 'mastered' : ''}" title="点击切换背熟状态">
              <span class="star-icon">${isMastered ? '★' : '☆'}</span>
              <span class="star-label">${isMastered ? '已背熟' : '记为背熟'}</span>
            </button>
          </div>
          <button class="btn-speak-clause" title="点击朗读原声" data-text="${turn.jp}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>
        ${bubbleBodyHtml}
      </div>
    `;

    // 绑定朗读
    const speakBtn = card.querySelector(".btn-speak-clause");
    speakBtn.addEventListener("click", () => {
      AudioController.speak(turn.jp, speakBtn, audioUrl, null, spkMeta.voice);
    });

    // 绑定单句背熟打卡
    const masteryBtn = card.querySelector(".btn-turn-mastery");
    masteryBtn.addEventListener("click", () => {
      const nowMastered = MasteryTracker.toggle(turnId);
      if (nowMastered) {
        WeaknessTracker.remove(turnId);
      }
      masteryBtn.classList.toggle("mastered", nowMastered);
      card.classList.toggle("is-mastered", nowMastered);
      masteryBtn.querySelector(".star-icon").textContent = nowMastered ? "★" : "☆";
      masteryBtn.querySelector(".star-label").textContent = nowMastered ? "已背熟" : "记为背熟";
      updateMasteryStats();
      updateWeaknessBadges();
      if ((scope === 'tb' ? tbFilter : pFilter) !== 'all') {
        applyFilter(scope);
      }
    });

    // 绑定知识透镜微标签点击弹窗
    card.querySelectorAll(".k-tag-btn").forEach(tagBtn => {
      tagBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openKnowledgeDrawer(tagBtn.getAttribute("data-term"), scene);
      });
    });

    // 挖空模式交互：点击遮挡块原地揭晓答案
    if (mode === 'cloze') {
      card.querySelectorAll(".cloze-mask").forEach(mask => {
        mask.addEventListener("click", () => {
          const isRevealed = mask.classList.toggle("revealed");
          const placeholder = mask.querySelector(".mask-placeholder");
          const answer = mask.querySelector(".mask-answer");
          if (placeholder && answer) {
            placeholder.style.display = isRevealed ? "none" : "inline";
            answer.style.display = isRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 盲背模式交互：输入日语并智能 Diff 核对
    if (mode === 'prompt') {
      const inputEl = card.querySelector(".user-jp-input");
      const submitBtn = card.querySelector(".btn-submit-check");
      const skipBtn = card.querySelector(".btn-prompt-skip-input");
      const resultPanel = card.querySelector(".check-result-panel");
      const scoreBadge = card.querySelector(".check-score-badge");
      const scoreTip = card.querySelector(".check-score-tip");
      const userDiffContent = card.querySelector(".user-diff-content");
      const standardRow = card.querySelector(".diff-standard-row");
      const speakStandardBtn = card.querySelector(".btn-speak-standard");
      const actionBar = card.querySelector(".prompt-action-bar");
      const passBtn = card.querySelector(".btn-prompt-pass");
      const retryBtn = card.querySelector(".btn-prompt-retry");

      // 实时打字比对（仅展示匹配率与用户输入高亮，保持标准答案与操作按钮隐藏）
      const updateRealtimePromptPreview = () => {
        const text = inputEl ? inputEl.value : "";
        if (!text.trim()) {
          if (resultPanel && (!standardRow || standardRow.style.display === "none")) {
            resultPanel.style.display = "none";
          }
          return;
        }

        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (scoreBadge && scoreTip && userDiffContent) {
          scoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          scoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 实时匹配`;
          scoreTip.innerHTML = `✍️ 实时匹配中（敲击回车或点击核对揭晓范例）`;
          userDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (resultPanel) resultPanel.style.display = "block";
        if (standardRow && standardRow.style.display !== "flex") {
          standardRow.style.display = "none";
        }
        if (actionBar && actionBar.style.display !== "flex") {
          actionBar.style.display = "none";
        }
      };

      // 最终确认核对（揭晓标准答案与熟练度评判按钮，办公室静音环境不自动朗读音频）
      const doVerification = () => {
        const text = inputEl ? inputEl.value : "";
        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (scoreBadge && scoreTip && userDiffContent) {
          scoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          scoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 匹配度`;
          scoreTip.innerHTML = diff.tipHtml;
          userDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (resultPanel) resultPanel.style.display = "block";
        if (standardRow) standardRow.style.display = "flex";
        if (actionBar) actionBar.style.display = "flex";

        // 注意：用户在办公室等安静环境使用，不自动播放音频，按需点击“🔊 听原声”

        if (diff.score >= 85) {
          if (passBtn) passBtn.style.boxShadow = "0 0 0 2px #10b981";
          if (retryBtn) retryBtn.style.boxShadow = "none";
        } else {
          if (retryBtn) retryBtn.style.boxShadow = "0 0 0 2px #ef4444";
          if (passBtn) passBtn.style.boxShadow = "none";
        }
      };

      if (submitBtn) {
        submitBtn.addEventListener("click", doVerification);
      }

      if (speakStandardBtn) {
        speakStandardBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          AudioController.speak(turn.jp, speakStandardBtn, audioUrl, null, spkMeta.voice);
        });
      }

      if (inputEl) {
        let isComposing = false;
        inputEl.addEventListener("compositionstart", () => {
          isComposing = true;
        });
        inputEl.addEventListener("compositionend", () => {
          isComposing = true;
          setTimeout(() => {
            isComposing = false;
          }, 80);
          setTimeout(updateRealtimePromptPreview, 30);
        });

        inputEl.addEventListener("input", updateRealtimePromptPreview);

        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // 如果处于日语输入法汉字转换中（未確定/候補選択中），回车仅用于确认汉字转换，不触发核对提交
            if (e.isComposing || isComposing || e.keyCode === 229) {
              return;
            }
            e.preventDefault();
            doVerification();
          }
        });
      }

      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          if (scoreBadge && scoreTip && userDiffContent) {
            scoreBadge.className = "check-score-badge score-high";
            scoreBadge.innerHTML = `<span>对照学习</span>`;
            scoreTip.innerHTML = `👁️ 已直接为您揭晓标准范例对白`;
            userDiffContent.innerHTML = `<span style="color:#94a3b8;">（已跳过手动输入）</span>`;
          }
          if (resultPanel) resultPanel.style.display = "block";
          if (standardRow) standardRow.style.display = "flex";
          if (actionBar) actionBar.style.display = "flex";
          // 揭晓范例不自动播放音频
        });
      }

      if (passBtn) {
        passBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          MasteryTracker.markMastered(turnId, true);
          WeaknessTracker.remove(turnId);
          masteryBtn.classList.add("mastered");
          card.classList.add("is-mastered");
          card.classList.remove("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "★";
          masteryBtn.querySelector(".star-label").textContent = "已背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已背对！标记熟练并移出生疏本 👍");
          if ((scope === 'tb' ? tbFilter : pFilter) === 'weakness') {
            applyFilter(scope);
          }
        });
      }

      if (retryBtn) {
        retryBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          WeaknessTracker.add(turnId);
          MasteryTracker.markMastered(turnId, false);
          masteryBtn.classList.remove("mastered");
          card.classList.remove("is-mastered");
          card.classList.add("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "☆";
          masteryBtn.querySelector(".star-label").textContent = "记为背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已加入重点生疏本，稍后巩固 ⚡");
        });
      }
    }

    // 角色扮演模式交互：输入作答与智能核对
    if (mode === 'roleplay') {
      const rpInputEl = card.querySelector(".user-rp-input");
      const rpSubmitBtn = card.querySelector(".btn-rp-submit-check");
      const rpSkipBtn = card.querySelector(".btn-rp-skip-input");
      const rpResultPanel = card.querySelector(".rp-check-result");
      const rpScoreBadge = card.querySelector(".rp-check-result .check-score-badge");
      const rpScoreTip = card.querySelector(".rp-check-result .check-score-tip");
      const rpUserDiffContent = card.querySelector(".rp-check-result .user-diff-content");
      const rpStandardRow = card.querySelector(".rp-check-result .diff-standard-row");
      const rpSpeakStandardBtn = card.querySelector(".rp-check-result .btn-speak-standard");
      const rpActionBar = card.querySelector(".rp-eval-actions");
      const passBtn = card.querySelector(".btn-rp-pass");
      const retryBtn = card.querySelector(".btn-rp-retry");

      // 实时打字比对
      const updateRealtimeRpPreview = () => {
        const text = rpInputEl ? rpInputEl.value : "";
        if (!text.trim()) {
          if (rpResultPanel && (!rpStandardRow || rpStandardRow.style.display === "none")) {
            rpResultPanel.style.display = "none";
          }
          return;
        }

        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
          rpScoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          rpScoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 实时匹配`;
          rpScoreTip.innerHTML = `✍️ 实时发言比对中（按回车或点击提交揭晓范例）`;
          rpUserDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (rpResultPanel) rpResultPanel.style.display = "block";
        if (rpStandardRow && rpStandardRow.style.display !== "flex") {
          rpStandardRow.style.display = "none";
        }
        if (rpActionBar && rpActionBar.style.display !== "flex") {
          rpActionBar.style.display = "none";
        }
      };

      // 最终确认核对（揭晓标准发言与评判按钮，不自动播放音频）
      const doRpVerification = () => {
        const text = rpInputEl ? rpInputEl.value : "";
        const diff = computeJapaneseDiff(text, turn.jp, turn.jpWithRuby);

        if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
          rpScoreBadge.className = `check-score-badge ${diff.scoreBadgeClass}`;
          rpScoreBadge.innerHTML = `<span class="score-num">${diff.score}%</span> 匹配度`;
          rpScoreTip.innerHTML = diff.tipHtml;
          rpUserDiffContent.innerHTML = diff.userDiffHtml;
        }

        if (rpResultPanel) rpResultPanel.style.display = "block";
        if (rpStandardRow) rpStandardRow.style.display = "flex";
        if (rpActionBar) rpActionBar.style.display = "flex";

        // 不自动播放音频，用户可按需点击“🔊 听原声”

        if (diff.score >= 85) {
          if (passBtn) passBtn.style.boxShadow = "0 0 0 2px #10b981";
          if (retryBtn) retryBtn.style.boxShadow = "none";
        } else {
          if (retryBtn) retryBtn.style.boxShadow = "0 0 0 2px #ef4444";
          if (passBtn) passBtn.style.boxShadow = "none";
        }
      };

      if (rpSubmitBtn) {
        rpSubmitBtn.addEventListener("click", doRpVerification);
      }

      if (rpSpeakStandardBtn) {
        rpSpeakStandardBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          AudioController.speak(turn.jp, rpSpeakStandardBtn, audioUrl, null, spkMeta.voice, 1);
        });
      }

      if (rpInputEl) {
        let isComposing = false;
        rpInputEl.addEventListener("compositionstart", () => {
          isComposing = true;
        });
        rpInputEl.addEventListener("compositionend", () => {
          isComposing = true;
          setTimeout(() => {
            isComposing = false;
          }, 80);
          setTimeout(updateRealtimeRpPreview, 30);
        });

        rpInputEl.addEventListener("input", updateRealtimeRpPreview);

        rpInputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // 如果处于日语输入法汉字转换中，回车仅用于确认候选词，不触发核对提交
            if (e.isComposing || isComposing || e.keyCode === 229) {
              return;
            }
            e.preventDefault();
            doRpVerification();
          }
        });
      }

      if (rpSkipBtn) {
        rpSkipBtn.addEventListener("click", () => {
          if (rpScoreBadge && rpScoreTip && rpUserDiffContent) {
            rpScoreBadge.className = "check-score-badge score-high";
            rpScoreBadge.innerHTML = `<span>对照学习</span>`;
            rpScoreTip.innerHTML = `👁️ 已直接为您揭晓标准会议发言`;
            rpUserDiffContent.innerHTML = `<span style="color:#94a3b8;">（已跳过手动输入）</span>`;
          }
          if (rpResultPanel) rpResultPanel.style.display = "block";
          if (rpStandardRow) rpStandardRow.style.display = "flex";
          if (rpActionBar) rpActionBar.style.display = "flex";
          // 不自动播放音频
        });
      }

      if (passBtn) {
        passBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          MasteryTracker.markMastered(turnId, true);
          WeaknessTracker.remove(turnId);
          masteryBtn.classList.add("mastered");
          card.classList.add("is-mastered");
          card.classList.remove("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "★";
          masteryBtn.querySelector(".star-label").textContent = "已背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已攻克！标记熟练并移出生疏本 🎯");
          if (roleplayMeetingActive && typeof advanceMeetingTurn === "function") {
            advanceMeetingTurn();
          }
        });
      }

      if (retryBtn) {
        retryBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          WeaknessTracker.add(turnId);
          MasteryTracker.markMastered(turnId, false);
          masteryBtn.classList.remove("mastered");
          card.classList.remove("is-mastered");
          card.classList.add("is-weakness");
          masteryBtn.querySelector(".star-icon").textContent = "☆";
          masteryBtn.querySelector(".star-label").textContent = "记为背熟";
          updateMasteryStats();
          updateWeaknessBadges();
          showToast("已加入重点生疏本 📌");
          if (roleplayMeetingActive && typeof advanceMeetingTurn === "function") {
            advanceMeetingTurn();
          }
        });
      }
    }

    return card;
  }

  // 重点生疏本与待背熟过滤器
  function applyFilter(scope) {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    const isTb = (scope === 'tb');
    const filter = isTb ? tbFilter : pFilter;
    const container = isTb ? textbookDialogueFlow : passageDialogueFlow;
    const cards = container.querySelectorAll(".dialogue-turn");

    let visibleCount = 0;
    cards.forEach(card => {
      const turnId = card.getAttribute("data-turn-id");
      let visible = true;
      if (filter === 'weakness') {
        visible = WeaknessTracker.isWeakness(turnId);
      } else if (filter === 'unmastered') {
        visible = !MasteryTracker.isMastered(turnId);
      }
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    let emptyNotice = container.querySelector(".filter-empty-alert");
    if (visibleCount === 0) {
      if (!emptyNotice) {
        emptyNotice = document.createElement("div");
        emptyNotice.className = "filter-empty-alert";
        emptyNotice.style.cssText = `
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 1.75rem 1rem;
          text-align: center;
          color: #64748b;
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 1rem 0;
        `;
        container.appendChild(emptyNotice);
      }
      if (filter === 'weakness') {
        emptyNotice.innerHTML = `🎉 <b>太棒了！当前对话暂无生疏句！</b><br><span style="font-size:0.78rem;color:#94a3b8;">在盲背或模拟开会中点击【还要再练】，句子将自动收录至此集中突击。</span>`;
      } else if (filter === 'unmastered') {
        emptyNotice.innerHTML = `🏆 <b>太优秀了！当前对话所有句子已全部背熟！</b><br><span style="font-size:0.78rem;color:#94a3b8;">点击上方【全部】随时回听复习。</span>`;
      }
      emptyNotice.style.display = "block";
    } else if (emptyNotice) {
      emptyNotice.style.display = "none";
    }
  }

  // 更新重点生疏角标数字
  function updateWeaknessBadges() {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;
    const tbWeaknessBadge = document.getElementById("tb-weakness-badge");
    const pWeaknessBadge = document.getElementById("p-weakness-badge");
    if (tbWeaknessBadge) {
      tbWeaknessBadge.textContent = WeaknessTracker.countInScope(scene, 'tb');
    }
    if (pWeaknessBadge) {
      pWeaknessBadge.textContent = WeaknessTracker.countInScope(scene, 'p', currentPassageIndex);
    }
  }

  // 停止交互式模拟会议
  function stopRoleplayMeeting() {
    roleplayMeetingActive = false;
    clearTimeout(roleplayMeetingTimer);
    roleplayMeetingTimer = null;
    advanceMeetingTurn = null;
    AudioController.stop();

    const tbStartBtn = document.getElementById("tb-start-roleplay-btn");
    const pStartBtn = document.getElementById("p-start-roleplay-btn");
    if (tbStartBtn) {
      tbStartBtn.classList.remove("playing");
      tbStartBtn.querySelector("span").textContent = "▶ 开始模拟会议";
    }
    if (pStartBtn) {
      pStartBtn.classList.remove("playing");
      pStartBtn.querySelector("span").textContent = "▶ 开始模拟会议";
    }
    document.querySelectorAll(".dialogue-turn.rp-current-step").forEach(el => {
      el.classList.remove("rp-current-step");
    });
  }

  // 启动全真交互式模拟会议流程 (角色交替拟真对答)
  function startRoleplayMeeting(scope) {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    const isTb = (scope === 'tb');
    const startBtn = isTb ? document.getElementById("tb-start-roleplay-btn") : document.getElementById("p-start-roleplay-btn");
    const container = isTb ? textbookDialogueFlow : passageDialogueFlow;
    const turns = isTb ? scene.textbookText.dialogue : (scene.practiceTexts[currentPassageIndex] ? scene.practiceTexts[currentPassageIndex].dialogue : []);
    const myRole = isTb ? tbMyRole : pMyRole;

    if (roleplayMeetingActive) {
      stopRoleplayMeeting();
      showToast("已结束模拟会议");
      return;
    }

    if (!turns.length) return;

    AudioController.stop();
    roleplayMeetingActive = true;
    if (startBtn) {
      startBtn.classList.add("playing");
      startBtn.querySelector("span").textContent = "⏹ 结束模拟会议";
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll(".dialogue-turn");

    function runCurrentStep() {
      if (!roleplayMeetingActive) return;
      if (currentIndex >= turns.length) {
        stopRoleplayMeeting();
        showToast("🎉 模拟会议圆满结束！所有对答环节已完成！");
        return;
      }

      cards.forEach(c => c.classList.remove("rp-current-step"));
      const currentCard = cards[currentIndex];
      const turn = turns[currentIndex];
      const spkMeta = getSpeakerMeta(turn.speaker);
      const isMyTurn = (turn.speaker === myRole);

      if (currentCard) {
        currentCard.classList.add("rp-current-step");
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (isMyTurn) {
        // 轮到用户发言：暂停自动连播，自动聚焦输入框，等待用户键入作答与核对
        showToast(`👉 轮到您发言（${myRole}），请在输入框键入日文并核对`);
        const myInput = currentCard ? currentCard.querySelector(".user-rp-input") : null;
        if (myInput) {
          setTimeout(() => myInput.focus(), 350);
        }
        advanceMeetingTurn = () => {
          advanceMeetingTurn = null;
          currentIndex++;
          roleplayMeetingTimer = setTimeout(runCurrentStep, 500);
        };
      } else {
        // 对方发言：自动原声播报
        const audioUrl = isTb
          ? `audio/scene-${scene.sceneNumber}/tb-${currentIndex}.mp3`
          : `audio/scene-${scene.sceneNumber}/p${scene.practiceTexts[currentPassageIndex].pNum}/p${scene.practiceTexts[currentPassageIndex].pNum}-${currentIndex}.mp3`;

        const speakBtn = currentCard ? currentCard.querySelector(".btn-speak-clause") : null;
        AudioController.speak(turn.jp, speakBtn, audioUrl, () => {
          if (!roleplayMeetingActive) return;
          currentIndex++;
          roleplayMeetingTimer = setTimeout(runCurrentStep, 550);
        }, spkMeta.voice, 1);
      }
    }

    runCurrentStep();
  }

  // 更新背熟进度统计
  function updateMasteryStats() {
    const scene = data.scenes[currentSceneIndex];
    if (!scene) return;

    // 教材对话统计
    if (scene.textbookText && scene.textbookText.dialogue) {
      const tbTotal = scene.textbookText.dialogue.length;
      let tbMastered = 0;
      for (let i = 0; i < tbTotal; i++) {
        if (MasteryTracker.isMastered(`s${scene.sceneNumber}-tb-${i}`)) tbMastered++;
      }
      if (tbMasteredStat) tbMasteredStat.textContent = tbMastered;
      if (tbTotalStat) tbTotalStat.textContent = tbTotal;
    }

    // 短文对话统计
    const p = scene.practiceTexts && scene.practiceTexts[currentPassageIndex];
    if (p && p.dialogue) {
      const pTotal = p.dialogue.length;
      let pMastered = 0;
      for (let i = 0; i < pTotal; i++) {
        if (MasteryTracker.isMastered(`s${scene.sceneNumber}-p${p.pNum}-${i}`)) pMastered++;
      }
      if (pMasteredStat) pMasteredStat.textContent = pMastered;
      if (pTotalStat) pTotalStat.textContent = pTotal;
    }

    updateWeaknessBadges();
  }

  // 初始化背诵与演练工具栏事件
  function setupDrillToolbars() {
    // 教材工具栏模式切换
    const tbBtns = document.querySelectorAll('#tb-drill-toolbar .drill-mode-btn');
    const tbRoleplayBanner = document.getElementById("tb-roleplay-banner");

    tbBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stopRoleplayMeeting();
        tbBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tbMode = btn.getAttribute("data-mode");

        if (tbClozeToggleAllBtn) {
          tbClozeToggleAllBtn.style.display = (tbMode === "cloze") ? "inline-flex" : "none";
        }
        if (tbRoleplayBanner) {
          tbRoleplayBanner.style.display = (tbMode === "roleplay") ? "flex" : "none";
        }

        renderTextbook(data.scenes[currentSceneIndex]);
      });
    });

    if (tbClozeToggleAllBtn) {
      tbClozeToggleAllBtn.addEventListener("click", () => {
        tbClozeAllRevealed = !tbClozeAllRevealed;
        tbClozeToggleAllBtn.querySelector("span").textContent = tbClozeAllRevealed ? "🔒 全部遮挡" : "👁️ 揭晓全部";
        textbookDialogueFlow.querySelectorAll(".cloze-mask").forEach(mask => {
          mask.classList.toggle("revealed", tbClozeAllRevealed);
          const p = mask.querySelector(".mask-placeholder");
          const a = mask.querySelector(".mask-answer");
          if (p && a) {
            p.style.display = tbClozeAllRevealed ? "none" : "inline";
            a.style.display = tbClozeAllRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 教材过滤器 (全部 / 重点生疏 / 待背熟)
    const tbFilterChips = document.querySelectorAll('#tb-drill-toolbar .filter-chip');
    tbFilterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        tbFilterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        tbFilter = chip.getAttribute("data-filter");
        applyFilter('tb');
      });
    });

    // 教材模拟会议启动按钮
    const tbStartRoleplayBtn = document.getElementById("tb-start-roleplay-btn");
    if (tbStartRoleplayBtn) {
      tbStartRoleplayBtn.addEventListener("click", () => {
        startRoleplayMeeting('tb');
      });
    }

    // 短文工具栏模式切换
    const pBtns = document.querySelectorAll('#p-drill-toolbar .drill-mode-btn');
    const pRoleplayBanner = document.getElementById("p-roleplay-banner");

    pBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stopRoleplayMeeting();
        pBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        pMode = btn.getAttribute("data-mode");

        if (pClozeToggleAllBtn) {
          pClozeToggleAllBtn.style.display = (pMode === "cloze") ? "inline-flex" : "none";
        }
        if (pRoleplayBanner) {
          pRoleplayBanner.style.display = (pMode === "roleplay") ? "flex" : "none";
        }

        loadActivePassage(data.scenes[currentSceneIndex]);
      });
    });

    if (pClozeToggleAllBtn) {
      pClozeToggleAllBtn.addEventListener("click", () => {
        pClozeAllRevealed = !pClozeAllRevealed;
        pClozeToggleAllBtn.querySelector("span").textContent = pClozeAllRevealed ? "🔒 全部遮挡" : "👁️ 揭晓全部";
        passageDialogueFlow.querySelectorAll(".cloze-mask").forEach(mask => {
          mask.classList.toggle("revealed", pClozeAllRevealed);
          const p = mask.querySelector(".mask-placeholder");
          const a = mask.querySelector(".mask-answer");
          if (p && a) {
            p.style.display = pClozeAllRevealed ? "none" : "inline";
            a.style.display = pClozeAllRevealed ? "inline" : "none";
          }
        });
      });
    }

    // 短文过滤器 (全部 / 重点生疏 / 待背熟)
    const pFilterChips = document.querySelectorAll('#p-drill-toolbar .filter-chip');
    pFilterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        pFilterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        pFilter = chip.getAttribute("data-filter");
        applyFilter('p');
      });
    });

    // 短文模拟会议启动按钮
    const pStartRoleplayBtn = document.getElementById("p-start-roleplay-btn");
    if (pStartRoleplayBtn) {
      pStartRoleplayBtn.addEventListener("click", () => {
        startRoleplayMeeting('p');
      });
    }
  }

  // 1. 渲染场景切换药丸导航 (Scene Pills)
  function renderScenePills() {
    scenePillsContainer.innerHTML = "";
    data.scenes.forEach((scene, index) => {
      const btn = document.createElement("button");
      btn.className = `scene-pill-btn ${index === currentSceneIndex ? 'active' : ''}`;
      btn.innerHTML = `
        <span>场景 ${scene.sceneNumber}</span>
        <span class="scene-pill-badge">${scene.badge}</span>
      `;
      btn.addEventListener("click", () => {
        if (currentSceneIndex !== index) {
          AudioController.stop();
          currentSceneIndex = index;
          currentPassageIndex = 0; // 切换场景时重置短文选择为第1篇
          renderCurrentScene();
        }
      });
      scenePillsContainer.appendChild(btn);
    });
  }

  // 2. 渲染顶部 Hero 简介
  function renderHero(scene) {
    heroBadgeTag.innerHTML = `<span>💼 ${scene.domain}</span>`;
    heroTitleText.textContent = scene.title;
    heroDescText.textContent = scene.background;
  }

  // 获取发言人对应头像、CSS 类与专属声线
  function getSpeakerMeta(speakerName) {
    if (speakerName.includes("李")) {
      return { avatar: "👨‍💻", className: "avatar-li", roleLabel: "SE / PM", voice: "ja-JP-NanamiNeural" };
    } else if (speakerName.includes("田中")) {
      return { avatar: "👔", className: "avatar-tanaka", roleLabel: "客户方部长", voice: "ja-JP-KeitaNeural" };
    } else if (speakerName.includes("山田")) {
      return { avatar: "📊", className: "avatar-yamada", roleLabel: "业务主管", voice: "ja-JP-KeitaNeural" };
    } else if (speakerName.includes("佐藤")) {
      return { avatar: "👩‍💼", className: "avatar-li", roleLabel: "业务负责", voice: "ja-JP-NanamiNeural" };
    } else if (speakerName.includes("小林")) {
      return { avatar: "👨‍💼", className: "avatar-tanaka", roleLabel: "技术经理", voice: "ja-JP-KeitaNeural" };
    }
    return { avatar: "🗣️", className: "avatar-li", roleLabel: "会话成员", voice: "ja-JP-NanamiNeural" };
  }

  // 3. 渲染教材核心课文
  function renderTextbook(scene) {
    const tb = scene.textbookText;
    textbookDialogueFlow.innerHTML = "";

    // 动态渲染教材模拟开会角色选项
    const uniqueSpeakers = [...new Set(tb.dialogue.map(d => d.speaker))];
    if (!uniqueSpeakers.includes(tbMyRole)) {
      tbMyRole = uniqueSpeakers[0] || "李";
    }
    const tbRolePillsContainer = document.getElementById("tb-role-pills");
    if (tbRolePillsContainer) {
      tbRolePillsContainer.innerHTML = uniqueSpeakers.map(spk => {
        const meta = getSpeakerMeta(spk);
        const isActive = (spk === tbMyRole);
        return `<button class="role-pill ${isActive ? 'active' : ''}" data-role="${spk}">${meta.avatar} ${spk} (${meta.roleLabel})</button>`;
      }).join("");

      tbRolePillsContainer.querySelectorAll(".role-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          tbMyRole = pill.getAttribute("data-role");
          tbRolePillsContainer.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          renderTextbook(scene);
        });
      });
    }

    const sequenceItems = [];
    tb.dialogue.forEach((turn, idx) => {
      const turnId = `s${scene.sceneNumber}-tb-${idx}`;
      const audioUrl = `audio/scene-${scene.sceneNumber}/tb-${idx}.mp3`;
      const card = createDialogueTurnElement({
        turn,
        turnId,
        scope: 'tb',
        scene,
        mode: tbMode,
        audioUrl
      });
      textbookDialogueFlow.appendChild(card);
      sequenceItems.push({
        text: `${turn.speaker}。${turn.jp}`,
        audioUrl,
        cardElement: card,
        btnElement: card.querySelector(".btn-speak-clause")
      });
    });

    // 绑定全文朗读按钮（高拟真多角色交替演播）
    playFullTextbookBtn.onclick = () => {
      AudioController.playSequence(sequenceItems, playFullTextbookBtn);
    };

    // 渲染词性切片（点击切片也可直达知识抽屉）
    tokenChipsContainer.innerHTML = "";
    if (tb.tokens && tb.tokens.length) {
      tb.tokens.forEach(tok => {
        const chip = document.createElement("div");
        chip.className = `token-chip ${tok.isKey ? 'key-token' : ''}`;
        chip.style.cursor = "pointer";
        chip.title = "点击查看该要件详细实战解析";
        chip.innerHTML = `
          <div class="token-surface">${tok.surface} <span class="token-pos">${tok.pos}</span></div>
          <div class="token-meaning">${tok.reading} · ${tok.meaning}</div>
        `;
        chip.addEventListener("click", () => {
          openKnowledgeDrawer(tok.surface, scene);
        });
        tokenChipsContainer.appendChild(chip);
      });
    }

    applyFilter('tb');
    updateMasteryStats();
  }

  // 4. 渲染配套练习·5篇短文精读
  function renderPractice(scene) {
    const passages = scene.practiceTexts;
    if (!passages || !passages.length) {
      moduleSections.practice.style.display = "none";
      return;
    }

    // 渲染短文选择按钮 (短文 1 ～ 短文 5)
    passageTabsContainer.innerHTML = "";
    passages.forEach((p, idx) => {
      const btn = document.createElement("button");
      btn.className = `passage-tab-btn ${idx === currentPassageIndex ? 'active' : ''}`;
      btn.textContent = `短文 ${p.pNum}`;
      btn.addEventListener("click", () => {
        AudioController.stop();
        currentPassageIndex = idx;
        loadActivePassage(scene);
      });
      passageTabsContainer.appendChild(btn);
    });

    loadActivePassage(scene);
  }

  function loadActivePassage(scene) {
    const p = scene.practiceTexts[currentPassageIndex];
    if (!p) return;

    // 更新按钮激活状态
    passageTabsContainer.querySelectorAll(".passage-tab-btn").forEach((btn, idx) => {
      if (idx === currentPassageIndex) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    currentPassageTitle.textContent = p.title;
    currentPassageFocus.innerHTML = `
      <div>🎯 <b>训练目标：</b>${p.theme}</div>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.2rem;">📖 出处：${p.sourceBook} (${p.sourcePages})</div>
    `;

    // 动态渲染短文模拟开会角色选项
    const uniqueSpeakers = [...new Set(p.dialogue.map(d => d.speaker))];
    if (!uniqueSpeakers.includes(pMyRole)) {
      pMyRole = uniqueSpeakers[0] || "李";
    }
    const pRolePillsContainer = document.getElementById("p-role-pills");
    if (pRolePillsContainer) {
      pRolePillsContainer.innerHTML = uniqueSpeakers.map(spk => {
        const meta = getSpeakerMeta(spk);
        const isActive = (spk === pMyRole);
        return `<button class="role-pill ${isActive ? 'active' : ''}" data-role="${spk}">${meta.avatar} ${spk} (${meta.roleLabel})</button>`;
      }).join("");

      pRolePillsContainer.querySelectorAll(".role-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          pMyRole = pill.getAttribute("data-role");
          pRolePillsContainer.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          loadActivePassage(scene);
        });
      });
    }

    passageDialogueFlow.innerHTML = "";
    const sequenceItems = [];
    p.dialogue.forEach((d, idx) => {
      const turnId = `s${scene.sceneNumber}-p${p.pNum}-${idx}`;
      const audioUrl = `audio/scene-${scene.sceneNumber}/p${p.pNum}/p${p.pNum}-${idx}.mp3`;
      const card = createDialogueTurnElement({
        turn: d,
        turnId,
        scope: 'p',
        scene,
        mode: pMode,
        audioUrl
      });
      passageDialogueFlow.appendChild(card);
      sequenceItems.push({
        text: `${d.speaker}。${d.jp}`,
        audioUrl,
        cardElement: card,
        btnElement: card.querySelector(".btn-speak-clause")
      });
    });

    // 绑定短文朗读按钮（高拟真多角色交替演播）
    playPassageBtn.onclick = () => {
      AudioController.playSequence(sequenceItems, playPassageBtn);
    };

    applyFilter('p');
    updateMasteryStats();
  }

  // 5. 渲染深度语法图鉴
  function renderGrammar(scene) {
    grammarCardsContainer.innerHTML = "";
    scene.grammarPoints.forEach(gp => {
      const card = document.createElement("div");
      card.className = "grammar-card";
      card.id = gp.id;

      let rulesHtml = "";
      if (gp.rules && gp.rules.length) {
        gp.rules.forEach(r => {
          let egItems = r.examples ? r.examples.map(e => `<li><strong>${e.jp}</strong> — ${e.desc}</li>`).join("") : "";
          rulesHtml += `
            <div class="rule-item">
              <div class="rule-type">${r.type}</div>
              <div class="rule-summary">${r.rule}</div>
              ${egItems ? `<ul class="rule-examples">${egItems}</ul>` : ''}
            </div>
          `;
        });
      }

      let egHtml = "";
      if (gp.businessExamples && gp.businessExamples.length) {
        let items = gp.businessExamples.map(eg => `
          <div class="eg-item">
            <div style="flex:1;">
              <div class="eg-content-jp">${eg.jp}</div>
              <div class="eg-content-zh">${eg.zh}</div>
            </div>
            <button class="btn-speak-clause" title="朗读例句" data-text="${eg.audio || eg.jp}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
        `).join("");
        egHtml = `
          <div class="examples-subcard">
            <div class="subcard-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              对日商务实战地道例句
            </div>
            <div class="eg-list">${items}</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="grammar-header">
          <div>
            <div class="grammar-meta">
              <span class="grammar-badge">${gp.badge}</span>
              <span class="grammar-level">${gp.level}</span>
            </div>
            <h3 class="grammar-title">${gp.title}</h3>
          </div>
        </div>

        <div class="formula-box">
          <div class="formula-label">接续与语法公式</div>
          <div class="formula-text">${gp.formula}</div>
        </div>

        <div class="concept-box">${gp.concept}</div>

        ${rulesHtml ? `<h4 style="font-size:1rem; font-weight:700; margin-bottom:0.85rem; color:var(--text-main);">📌 详细接续法则</h4><div class="rules-grid">${rulesHtml}</div>` : ''}

        ${egHtml}
      `;

      card.querySelectorAll(".btn-speak-clause").forEach(btn => {
        btn.addEventListener("click", () => {
          AudioController.speak(btn.getAttribute("data-text"), btn);
        });
      });

      grammarCardsContainer.appendChild(card);
    });
  }

  // 6. 渲染职场实战诊所
  function renderClinic(scene) {
    const c = scene.businessClinic;
    if (!c) {
      moduleSections.clinic.style.display = "none";
      return;
    }

    let compHtml = c.comparisons.map(item => `
      <div class="clinic-item">
        <div class="clinic-point-header">${item.point}</div>
        <div class="clinic-comparison">
          <div class="side-box side-casual">
            <div class="side-label">⚠️ 及格普通口语（不建议汇报）</div>
            <div class="side-text">${item.casual}</div>
          </div>
          <div class="side-box side-pro">
            <div class="side-label">✅ 对日咨询高阶满分表达</div>
            <div class="side-text">${item.pro}</div>
          </div>
        </div>
      </div>
    `).join("");

    clinicContainer.innerHTML = `
      <div class="clinic-card">
        <h4 style="font-size: 1.15rem; font-weight:800; color: var(--text-main); margin-bottom: 1.25rem;">${c.title}</h4>
        <div class="clinic-grid">${compHtml}</div>
        ${c.template ? `
          <div class="template-card">
            <h4>📌 本场景通用沟通话术模板</h4>
            <div class="template-code">${c.template}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // 7. 渲染 3D 翻转智能词汇闪卡
  function renderVocab(scene) {
    vocabCardsContainer.innerHTML = "";
    scene.vocabulary.forEach((v, vIndex) => {
      const card = document.createElement("div");
      card.className = "flashcard-3d";
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <span class="vocab-level-tag">${v.level}</span>
              <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">${v.pos}</span>
            </div>
            <div>
              <div class="vocab-kanji">${v.kanji}</div>
              <div class="vocab-reading">${v.reading}</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <button class="btn-speak-clause" title="朗读" data-text="${v.audio || v.kanji}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <div class="card-hint-flip">点击翻转卡片 🔄</div>
            </div>
          </div>
          <div class="flashcard-back">
            <div>
              <div style="font-size: 1.1rem; font-weight:700; color: var(--primary); margin-bottom: 0.35rem;">${v.kanji}</div>
              <div class="vocab-zh">${v.zh}</div>
              <div class="vocab-phrase" style="text-align:left; margin-top:0.75rem;">
                <strong>搭配：</strong>${v.phrase}
              </div>
            </div>
            <div>
              <div class="card-hint-flip" style="margin-bottom: 0.4rem;">标记掌握程度：</div>
              <div class="card-mastery-btns">
                <button class="btn-mastery btn-known">已掌握 ✅</button>
                <button class="btn-mastery btn-review">需复习 ⏳</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // 3D 翻转交互
      card.addEventListener("click", (e) => {
        // 如果点击的是朗读按钮或掌握度按钮，不触发翻转
        if (e.target.closest(".btn-speak-clause") || e.target.closest(".btn-mastery")) return;
        card.classList.toggle("flipped");
      });

      // 朗读
      const speakBtn = card.querySelector(".btn-speak-clause");
      speakBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        AudioController.speak(speakBtn.getAttribute("data-text"), speakBtn);
      });

      // 掌握度标记
      const knownBtn = card.querySelector(".btn-known");
      const reviewBtn = card.querySelector(".btn-review");
      knownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.style.opacity = "0.6";
        knownBtn.textContent = "已标为掌握 ✓";
      });
      reviewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.style.opacity = "1";
        card.style.border = "2px solid #ef4444";
        reviewBtn.textContent = "已归入复习本 📌";
      });

      vocabCardsContainer.appendChild(card);
    });
  }

  // 8. 渲染随堂自测互动答题
  function renderQuiz(scene) {
    quizListContainer.innerHTML = "";
    scene.quizzes.forEach((q, qIndex) => {
      const item = document.createElement("div");
      item.className = "quiz-item";

      let optionsHtml = q.options.map((opt, optIndex) => `
        <button class="quiz-option-btn" data-qindex="${qIndex}" data-optindex="${optIndex}">
          <span>${opt}</span>
          <span class="quiz-check-icon"></span>
        </button>
      `).join("");

      item.innerHTML = `
        <div class="quiz-q-text">
          <span class="quiz-q-num">第 ${qIndex + 1} 题</span>
          <span>${q.question}</span>
        </div>
        <div class="quiz-options">${optionsHtml}</div>
        <div class="quiz-explanation" id="quiz-exp-${q.id}">${q.explanation}</div>
      `;

      item.querySelectorAll(".quiz-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const optIndex = parseInt(btn.getAttribute("data-optindex"), 10);
          const expBox = item.querySelector(`#quiz-exp-${q.id}`);
          const allOptions = item.querySelectorAll(".quiz-option-btn");

          allOptions.forEach(b => {
            b.disabled = true;
            b.style.cursor = "default";
          });

          if (optIndex === q.correct) {
            btn.classList.add("selected-correct");
            btn.querySelector(".quiz-check-icon").innerHTML = "✅ 正确！";
          } else {
            btn.classList.add("selected-wrong");
            btn.querySelector(".quiz-check-icon").innerHTML = "❌ 错误";
            allOptions[q.correct].classList.add("selected-correct");
            allOptions[q.correct].querySelector(".quiz-check-icon").innerHTML = "👈 正确答案";
          }

          expBox.classList.add("show");
        });
      });

      quizListContainer.appendChild(item);
    });
  }

  // 9. 渲染对日实战商务邮件模板库 (Business Email & Report Templates)
  function renderEmailSection(scene) {
    const container = document.getElementById("email-templates-container");
    if (!container) return;

    const allTemplates = window.JAPANESE_EMAIL_TEMPLATES || [];
    // 优先匹配当前场景，若无专属邮件则展示高频通用邮件
    let sceneTemplates = allTemplates.filter(t => t.sceneId === scene.id);
    if (!sceneTemplates.length) {
      sceneTemplates = allTemplates;
    }

    container.innerHTML = "";

    sceneTemplates.forEach(tpl => {
      const card = document.createElement("div");
      card.className = "email-card";

      const keyPhrasesHtml = (tpl.keyPhrases && tpl.keyPhrases.length) ? `
        <div class="email-phrases-box">
          <div class="email-phrases-title">💡 邮件高频敬语与金句搭配</div>
          <div class="email-phrases-list">
            ${tpl.keyPhrases.map(p => `
              <div class="email-phrase-item">
                <strong>${p.jp}</strong> — <span>${p.zh}</span>
              </div>
            `).join("")}
          </div>
        </div>
      ` : "";

      card.innerHTML = `
        <div class="email-meta-header">
          <div class="email-title-group">
            <div class="email-badges-row">
              <span class="email-cat-badge">📁 ${tpl.category}</span>
              <span class="email-tag-badge">🏷️ ${tpl.badge}</span>
            </div>
            <h4 class="email-title-h4">${tpl.title}</h4>
            <p class="email-purpose-text">${tpl.purpose}</p>
          </div>
        </div>

        <div class="email-subject-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <div class="email-subject-label">件名（遵循日企规约，自带业务与自社名标签）：</div>
            <button class="btn-copy-email btn-copy-subject" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
              <span>复制件名 📋</span>
            </button>
          </div>
          <div class="email-subject-val">${tpl.subject}</div>
        </div>

        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 0.35rem;">
            宛名：<span style="color: #0f172a;">${tpl.recipient}</span>
          </div>
          <div class="email-body-box">${tpl.body}</div>
        </div>

        <div class="email-actions-bar">
          <div style="font-size: 0.75rem; color: #64748b;">
            💡 提示：点击复制后，可直接将【〇〇】处替换为您真实的客户名、系统名或姓名
          </div>
          <button class="btn-copy-email btn-copy-full">
            <span>复制完整邮件正文 📋</span>
          </button>
        </div>

        ${keyPhrasesHtml}

        <div class="email-etiquette-alert" style="margin-top: 1rem; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 0.85rem 1rem; font-size: 0.82rem; color: #92400e; line-height: 1.5;">
          ${tpl.etiquetteNotes}
        </div>
      `;

      // 复制件名
      const copySubBtn = card.querySelector(".btn-copy-subject");
      if (copySubBtn) {
        copySubBtn.addEventListener("click", () => {
          copyToClipboard(tpl.subject, copySubBtn, "邮件件名已复制 📋");
        });
      }

      // 复制正文
      const copyFullBtn = card.querySelector(".btn-copy-full");
      if (copyFullBtn) {
        copyFullBtn.addEventListener("click", () => {
          copyToClipboard(tpl.body, copyFullBtn, "完整邮件正文已复制 📋");
        });
      }

      container.appendChild(card);
    });
  }

  // 剪贴板复制工具函数
  function copyToClipboard(text, btnElement, successMsg = "已复制到剪贴板 📋") {
    const doFeedback = () => {
      if (btnElement) {
        btnElement.classList.add("copied");
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = `<span>已复制 ✅</span>`;
        setTimeout(() => {
          btnElement.classList.remove("copied");
          btnElement.innerHTML = originalHtml;
        }, 1800);
      }
      showToast(successMsg);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(doFeedback).catch(() => {
        fallbackCopy(text);
        doFeedback();
      });
    } else {
      fallbackCopy(text);
      doFeedback();
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  // 🎧 通勤磨耳朵 / 锁屏随身听控制器 (Walkman Controller with MediaSession)
  const WalkmanController = {
    isOpen: false,
    isPlaying: false,
    mode: 'pure', // 'pure' | 'echo'
    queue: [],
    index: 0,
    timer: null,

    init() {
      const launchBtn = document.getElementById("launch-walkman-btn");
      const dock = document.getElementById("walkman-dock");
      const playBtn = document.getElementById("wm-play-btn");
      const prevBtn = document.getElementById("wm-prev-btn");
      const nextBtn = document.getElementById("wm-next-btn");
      const closeBtn = document.getElementById("wm-close-btn");
      const modePureBtn = document.getElementById("wm-mode-pure");
      const modeEchoBtn = document.getElementById("wm-mode-echo");

      if (launchBtn) {
        launchBtn.addEventListener("click", () => {
          this.open();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.close();
        });
      }

      if (playBtn) {
        playBtn.addEventListener("click", () => {
          if (this.isPlaying) this.pause();
          else this.play();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          this.prev();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.next();
        });
      }

      if (modePureBtn) {
        modePureBtn.addEventListener("click", () => {
          this.mode = 'pure';
          modePureBtn.classList.add("active");
          if (modeEchoBtn) modeEchoBtn.classList.remove("active");
          showToast("随身听：纯日文多角色磨耳朵 🎧");
        });
      }

      if (modeEchoBtn) {
        modeEchoBtn.addEventListener("click", () => {
          this.mode = 'echo';
          modeEchoBtn.classList.add("active");
          if (modePureBtn) modePureBtn.classList.remove("active");
          showToast("随身听：日文 ➜ 留白跟读 ➜ 中文释义 🗣️");
        });
      }
    },

    buildQueue() {
      const scene = data.scenes[currentSceneIndex];
      if (!scene) return [];
      const q = [];

      // 1. 教材课文对白
      if (scene.textbookText && scene.textbookText.dialogue) {
        scene.textbookText.dialogue.forEach((turn, idx) => {
          const spkMeta = getSpeakerMeta(turn.speaker);
          q.push({
            speaker: turn.speaker,
            avatar: spkMeta.avatar,
            voice: spkMeta.voice,
            jp: turn.jp,
            zh: turn.zh,
            sectionTitle: `${scene.title} · 教材正文`,
            audioUrl: `audio/scene-${scene.sceneNumber}/tb-${idx}.mp3`
          });
        });
      }

      // 2. 配套练习 5 篇短文对白
      if (scene.practiceTexts && scene.practiceTexts.length) {
        scene.practiceTexts.forEach(p => {
          if (p.dialogue) {
            p.dialogue.forEach((turn, idx) => {
              const spkMeta = getSpeakerMeta(turn.speaker);
              q.push({
                speaker: turn.speaker,
                avatar: spkMeta.avatar,
                voice: spkMeta.voice,
                jp: turn.jp,
                zh: turn.zh,
                sectionTitle: `${scene.title} · 短文${p.pNum} ${p.title}`,
                audioUrl: `audio/scene-${scene.sceneNumber}/p${p.pNum}/p${p.pNum}-${idx}.mp3`
              });
            });
          }
        });
      }

      return q;
    },

    open() {
      const dock = document.getElementById("walkman-dock");
      if (dock) dock.style.display = "block";
      this.isOpen = true;
      this.queue = this.buildQueue();
      if (!this.isPlaying) {
        this.index = 0;
        this.play();
      }
      showToast("随身听已启动，支持手机锁屏与后台后台巡回播报 🎧");
    },

    close() {
      const dock = document.getElementById("walkman-dock");
      if (dock) dock.style.display = "none";
      this.isOpen = false;
      this.pause();
    },

    updateUI() {
      const item = this.queue[this.index];
      if (!item) return;

      const avatarEl = document.getElementById("wm-avatar");
      const titleEl = document.getElementById("wm-title");
      const subEl = document.getElementById("wm-sub");
      const playBtn = document.getElementById("wm-play-btn");

      if (avatarEl) avatarEl.textContent = item.avatar;
      if (titleEl) titleEl.textContent = `${item.speaker}: ${item.jp}`;
      if (subEl) subEl.textContent = `${item.sectionTitle} (${this.index + 1}/${this.queue.length})`;
      if (playBtn) playBtn.textContent = this.isPlaying ? "⏸" : "▶";

      // 手机锁屏与媒体通知栏中心 MediaSession
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.jp,
          artist: `${item.speaker} · ${item.zh}`,
          album: item.sectionTitle,
          artwork: [
            { src: 'https://img.icons8.com/color/192/japan.png', sizes: '192x192', type: 'image/png' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => this.play());
        navigator.mediaSession.setActionHandler('pause', () => this.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
        navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
      }
    },

    play() {
      if (!this.queue.length) {
        this.queue = this.buildQueue();
      }
      if (!this.queue.length) return;

      clearTimeout(this.timer);
      this.isPlaying = true;
      this.updateUI();

      const item = this.queue[this.index];

      const proceedNext = () => {
        if (!this.isPlaying) return;
        this.index = (this.index + 1) % this.queue.length;
        this.timer = setTimeout(() => this.play(), 400);
      };

      // 播放日文原句
      AudioController.speak(item.jp, null, item.audioUrl, () => {
        if (!this.isPlaying) return;
        if (this.mode === 'echo') {
          // 留白 2.2 秒供开口跟读
          this.timer = setTimeout(() => {
            if (!this.isPlaying) return;
            // 中文释义播报
            AudioController.speakTTS(item.zh, () => {
              if (!this.isPlaying) return;
              this.timer = setTimeout(proceedNext, 800);
            }, "zh-CN");
          }, 2200);
        } else {
          // 纯日文连续磨耳朵：间隔 500ms 继续下一句
          this.timer = setTimeout(proceedNext, 500);
        }
      }, item.voice, 1);
    },

    pause() {
      this.isPlaying = false;
      clearTimeout(this.timer);
      AudioController.stop();
      this.updateUI();
    },

    prev() {
      clearTimeout(this.timer);
      AudioController.stop();
      if (!this.queue.length) return;
      this.index = (this.index - 1 + this.queue.length) % this.queue.length;
      if (this.isPlaying) this.play();
      else this.updateUI();
    },

    next() {
      clearTimeout(this.timer);
      AudioController.stop();
      if (!this.queue.length) return;
      this.index = (this.index + 1) % this.queue.length;
      if (this.isPlaying) this.play();
      else this.updateUI();
    }
  };

  // 顶栏语速与复读交互绑定
  const speedBtn = document.getElementById("audio-speed-btn");
  const loopBtn = document.getElementById("audio-loop-btn");

  const speeds = [0.8, 1.0, 1.2];
  let speedIdx = 1; // 默认 1.0x

  if (speedBtn) {
    speedBtn.addEventListener("click", () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      const newSpeed = speeds[speedIdx];
      AudioController.playbackRate = newSpeed;
      speedBtn.querySelector("span").textContent = `⚡ ${newSpeed}x`;
      if (AudioController.currentAudio) {
        AudioController.currentAudio.playbackRate = newSpeed;
      }
      showToast(`播放语速已设为 ${newSpeed}x ${newSpeed === 0.8 ? '（慢速精听）' : newSpeed === 1.2 ? '（快速挑战）' : '（标准原速）'}`);
    });
  }

  const loops = [1, 3];
  let loopIdx = 0; // 默认 1遍

  if (loopBtn) {
    loopBtn.addEventListener("click", () => {
      loopIdx = (loopIdx + 1) % loops.length;
      const newLoop = loops[loopIdx];
      AudioController.repeatCount = newLoop;
      loopBtn.querySelector("span").textContent = `🔁 ${newLoop}遍`;
      showToast(`单句复读已设为：${newLoop}遍循环 🔁`);
    });
  }

  // 渲染当前选中的整个场景
  function renderCurrentScene() {
    const scene = data.scenes[currentSceneIndex];
    renderScenePills();
    renderHero(scene);
    renderTextbook(scene);
    renderPractice(scene);
    renderGrammar(scene);
    renderClinic(scene);
    renderVocab(scene);
    renderQuiz(scene);
    renderEmailSection(scene);
    updateWeaknessBadges();
    switchTab(activeTab);
  }

  // 假名注音显示/隐藏
  toggleFuriganaBtn.addEventListener("click", () => {
    isFuriganaVisible = !isFuriganaVisible;
    if (isFuriganaVisible) {
      mainContainer.classList.remove("hide-furigana");
      toggleFuriganaBtn.classList.add("active");
      toggleFuriganaBtn.querySelector("span").textContent = "假名注音：已开启";
    } else {
      mainContainer.classList.add("hide-furigana");
      toggleFuriganaBtn.classList.remove("active");
      toggleFuriganaBtn.querySelector("span").textContent = "假名注音：已隐藏";
    }
  });

  // Tab 标签切换
  function switchTab(targetTab) {
    AudioController.stop();
    stopRoleplayMeeting();
    activeTab = targetTab;
    tabButtons.forEach(btn => {
      if (btn.getAttribute("data-tab") === targetTab) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    if (targetTab === "all") {
      Object.values(moduleSections).forEach(sec => { if (sec) sec.style.display = "block"; });
    } else {
      Object.keys(moduleSections).forEach(key => {
        if (moduleSections[key]) {
          moduleSections[key].style.display = (key === targetTab) ? "block" : "none";
        }
      });
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // 实时搜索
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const kw = e.target.value.trim().toLowerCase();
      if (!kw) {
        switchTab(activeTab);
        return;
      }
      Object.values(moduleSections).forEach(sec => { if (sec) sec.style.display = "block"; });
      document.querySelectorAll(".dialogue-turn, .grammar-card, .flashcard-3d, .email-card").forEach(card => {
        const txt = card.innerText.toLowerCase();
        card.style.display = txt.includes(kw) ? "" : "none";
      });
    });
  }

  // 初始化随身听、背诵控制栏并默认启动渲染
  WalkmanController.init();
  setupDrillToolbars();
  renderCurrentScene();
});
