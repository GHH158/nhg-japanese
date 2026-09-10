// 日语输入智能容错与逐字 Diff 比对核心算法
export function computeJapaneseDiff(userInput, targetJp, targetRuby = null) {
  const rawInput = (userInput || '').trim();
  const cleanInput = rawInput.replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
  const cleanTarget = (targetJp || '').replace(/[。、！？\s\.,!?・「」『』（）()]/g, '').trim();

  // 从 Ruby 中提取纯平假名发音流
  let cleanKanaTarget = '';
  if (targetRuby) {
    const kanaStr = targetRuby
      .replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/[。、！？\s\.,!?・「」『』（）()]/g, '');
    cleanKanaTarget = kanaStr.trim();
  }

  if (!cleanInput) {
    return {
      score: 0,
      scoreBadgeClass: 'score-low',
      tipHtml: '⚠️ 尚未输入内容，请在输入框键入日语或点击直接揭晓',
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

  let userDiffHtml = '';
  for (let k = 0; k < m; k++) {
    const ch = cleanInput[k];
    if (matchedIndices.has(k)) {
      userDiffHtml += `<span class="diff-char-match">${ch}</span>`;
    } else {
      userDiffHtml += `<span class="diff-char-mismatch" title="与范例存在出入">${ch}</span>`;
    }
  }

  // 评级与建议
  let scoreBadgeClass = 'score-low';
  let tipHtml = '';

  if (finalScore === 100) {
    scoreBadgeClass = 'score-perfect';
    if (isKanaPerfect) {
      tipHtml = `🌟 <b>发音100%完全吻合！</b><span class="kana-tip-pill">💡 假名读音完全正确，建议结合下方汉字标准写法进阶巩固</span>`;
    } else {
      tipHtml = `🌟 <b>完美契合！</b>字词、敬语与拼写无可挑剔！`;
    }
  } else if (finalScore >= 85) {
    scoreBadgeClass = 'score-high';
    tipHtml = `👏 <b>极高准确度！</b>仅存在极少数假名或助词细微出入（见红色划线标注）`;
  } else if (finalScore >= 60) {
    scoreBadgeClass = 'score-medium';
    tipHtml = `💡 <b>大意已表达！</b>请对照标准范例核对格助词（に/で/を）与动词变形`;
  } else {
    scoreBadgeClass = 'score-low';
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

// 生成挖空背诵 HTML
export function generateClozeHtml(jpWithRuby, keyTerms = []) {
  let result = jpWithRuby;
  keyTerms.forEach(term => {
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(<ruby>[^<]*${safeTerm}[^<]*<rt>[^<]*<\\/rt><\\/ruby>|${safeTerm})`, 'g');
    result = result.replace(regex, (match) => {
      if (match.startsWith('<span class="cloze-mask"')) return match;
      return `<span class="cloze-mask" data-cloze="true"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
    });
  });

  // 如果未命中特定术语，则挖空句末核心助动词或敬语
  if (!result.includes('cloze-mask')) {
    result = result.replace(/(伺わせていただきます|いらっしゃいます|頼っている|短縮したい|かかっています|承知しました|ございます|ですね|進めたい|存じます)/, (match) => {
      return `<span class="cloze-mask" data-cloze="true"><span class="mask-placeholder">❓ 点我揭晓</span><span class="mask-answer" style="display:none;">${match}</span></span>`;
    });
  }

  return result;
}
