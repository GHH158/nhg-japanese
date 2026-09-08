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

  // Web Speech API 音频控制器
  const AudioController = {
    currentUtterance: null,
    speakingBtn: null,

    speak(text, buttonElement = null) {
      if (!('speechSynthesis' in window)) {
        alert("您的浏览器暂不支持语音合成，建议使用 Chrome / Edge / Safari 等现代浏览器。");
        return;
      }

      if (window.speechSynthesis.speaking && this.speakingBtn === buttonElement) {
        window.speechSynthesis.cancel();
        this.resetSpeakingState();
        return;
      }

      window.speechSynthesis.cancel();
      this.resetSpeakingState();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;

      const voices = window.speechSynthesis.getVoices();
      const jpVoice = voices.find(v => v.lang === "ja-JP" || v.lang.startsWith("ja")) || null;
      if (jpVoice) utterance.voice = jpVoice;

      if (buttonElement) {
        this.speakingBtn = buttonElement;
        buttonElement.classList.add("playing");
      }

      utterance.onend = () => { this.resetSpeakingState(); };
      utterance.onerror = () => { this.resetSpeakingState(); };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    resetSpeakingState() {
      if (this.speakingBtn) {
        this.speakingBtn.classList.remove("playing");
        this.speakingBtn = null;
      }
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
    "quiz": document.getElementById("section-quiz")
  };

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

  // 获取发言人对应头像和 CSS 类
  function getSpeakerMeta(speakerName) {
    if (speakerName.includes("李")) {
      return { avatar: "👨‍💻", className: "avatar-li", roleLabel: "软件设计师" };
    } else if (speakerName.includes("田中")) {
      return { avatar: "👔", className: "avatar-tanaka", roleLabel: "客户方决策者" };
    } else if (speakerName.includes("山田")) {
      return { avatar: "📊", className: "avatar-yamada", roleLabel: "业务负责人" };
    }
    return { avatar: "🗣️", className: "avatar-li", roleLabel: "会话成员" };
  }

  // 3. 渲染教材核心课文
  function renderTextbook(scene) {
    const tb = scene.textbookText;
    textbookDialogueFlow.innerHTML = "";

    tb.dialogue.forEach(turn => {
      const spkMeta = getSpeakerMeta(turn.speaker);
      const card = document.createElement("div");
      card.className = "dialogue-turn";
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
            <div class="turn-jp">${turn.jpWithRuby}</div>
            <button class="btn-speak-clause" title="点击朗读" data-text="${turn.jpWithRuby.replace(/<[^>]+>/g, '')}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
          <div class="turn-zh">${turn.zh}</div>
          ${turn.keyNote ? `<div class="turn-note">${turn.keyNote}</div>` : ''}
        </div>
      `;

      const btn = card.querySelector(".btn-speak-clause");
      btn.addEventListener("click", () => {
        AudioController.speak(btn.getAttribute("data-text"), btn);
      });

      textbookDialogueFlow.appendChild(card);
    });

    // 绑定全文朗读按钮
    playFullTextbookBtn.onclick = () => {
      AudioController.speak(tb.audioText, playFullTextbookBtn);
    };

    // 渲染词性切片
    tokenChipsContainer.innerHTML = "";
    if (tb.tokens && tb.tokens.length) {
      tb.tokens.forEach(tok => {
        const chip = document.createElement("div");
        chip.className = `token-chip ${tok.isKey ? 'key-token' : ''}`;
        chip.innerHTML = `
          <div class="token-surface">${tok.surface} <span class="token-pos">${tok.pos}</span></div>
          <div class="token-meaning">${tok.reading} · ${tok.meaning}</div>
        `;
        tokenChipsContainer.appendChild(chip);
      });
    }
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

    // 生成该短文的朗读全文
    const passageFullAudio = p.dialogue.map(d => `${d.speaker}。${d.jp}`).join(" ");
    playPassageBtn.onclick = () => {
      AudioController.speak(passageFullAudio, playPassageBtn);
    };

    passageDialogueFlow.innerHTML = "";
    p.dialogue.forEach(d => {
      const spkMeta = getSpeakerMeta(d.speaker);
      const card = document.createElement("div");
      card.className = "dialogue-turn";
      card.innerHTML = `
        <div class="speaker-col">
          <div class="speaker-avatar-circle ${spkMeta.className}">${spkMeta.avatar}</div>
          <div class="speaker-meta-wrap">
            <div class="speaker-label-name">${d.speaker}</div>
            <div class="speaker-label-role">${spkMeta.roleLabel}</div>
          </div>
        </div>
        <div class="dialogue-bubble-col">
          <div class="dialogue-top-line">
            <div class="turn-jp">${d.jpWithRuby || d.jp}</div>
            <button class="btn-speak-clause" title="朗读" data-text="${d.jp}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
          ${d.zh ? `<div class="turn-zh">${d.zh}</div>` : ''}
        </div>
      `;

      const btn = card.querySelector(".btn-speak-clause");
      btn.addEventListener("click", () => {
        AudioController.speak(btn.getAttribute("data-text"), btn);
      });

      passageDialogueFlow.appendChild(card);
    });
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
      document.querySelectorAll(".dialogue-turn, .grammar-card, .flashcard-3d").forEach(card => {
        const txt = card.innerText.toLowerCase();
        card.style.display = txt.includes(kw) ? "" : "none";
      });
    });
  }

  // 默认启动渲染
  renderCurrentScene();
});
