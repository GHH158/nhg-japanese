import { reactive, ref } from 'vue';

// 全局唯一的音频与随身听状态
const state = reactive({
  isPlaying: false,
  currentTurnId: null,
  playbackRate: 1.0,
  repeatCount: 1,
  currentRepeatIndex: 0,
  playlist: [],
  playlistIndex: 0,
  isWalkmanActive: false
});

let audioInstance = null;
let loopTimer = null;

export function useAudioPlayer() {
  function stop() {
    if (loopTimer) {
      clearTimeout(loopTimer);
      loopTimer = null;
    }
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      audioInstance = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    state.isPlaying = false;
    state.currentTurnId = null;
  }

  function speakTTS(text, onFinished = null, lang = 'ja-JP', preferredVoice = null) {
    if (!('speechSynthesis' in window)) {
      if (onFinished) onFinished();
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<rt>.*?<\/rt>/g, '').replace(/<[^>]+>/g, '');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = lang;
    utter.rate = state.playbackRate;

    const voices = window.speechSynthesis.getVoices();
    if (preferredVoice) {
      const found = voices.find(v => v.name === preferredVoice || (v.lang === lang && v.name.includes(preferredVoice)));
      if (found) utter.voice = found;
    } else {
      const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
      if (jaVoice) utter.voice = jaVoice;
    }

    utter.onend = () => {
      if (onFinished) onFinished();
    };
    utter.onerror = () => {
      if (onFinished) onFinished();
    };

    window.speechSynthesis.speak(utter);
  }

  function speak(text, audioUrl = null, turnId = null, onFinished = null, preferredVoice = null) {
    stop();
    state.isPlaying = true;
    state.currentTurnId = turnId;

    let currentRepeat = 0;
    const maxRepeat = state.repeatCount;

    const playOnce = () => {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.playbackRate = state.playbackRate;
        audioInstance = audio;

        audio.onended = () => {
          currentRepeat++;
          if (currentRepeat < maxRepeat) {
            loopTimer = setTimeout(playOnce, 450);
          } else {
            stop();
            if (onFinished) onFinished();
          }
        };

        audio.onerror = () => {
          // 降级使用云端 TTS 接口
          const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(preferredVoice || 'ja-JP-NanamiNeural')}`;
          const ttsAudio = new Audio(ttsUrl);
          ttsAudio.playbackRate = state.playbackRate;
          audioInstance = ttsAudio;

          ttsAudio.onended = () => {
            currentRepeat++;
            if (currentRepeat < maxRepeat) {
              loopTimer = setTimeout(playOnce, 450);
            } else {
              stop();
              if (onFinished) onFinished();
            }
          };

          ttsAudio.onerror = () => {
            speakTTS(text, () => {
              currentRepeat++;
              if (currentRepeat < maxRepeat) {
                loopTimer = setTimeout(playOnce, 450);
              } else {
                stop();
                if (onFinished) onFinished();
              }
            }, 'ja-JP', preferredVoice);
          };

          ttsAudio.play().catch(() => {
            speakTTS(text, () => {
              stop();
              if (onFinished) onFinished();
            });
          });
        };

        audio.play().catch(() => {
          speakTTS(text, () => {
            stop();
            if (onFinished) onFinished();
          });
        });
      } else {
        speakTTS(text, () => {
          currentRepeat++;
          if (currentRepeat < maxRepeat) {
            loopTimer = setTimeout(playOnce, 450);
          } else {
            stop();
            if (onFinished) onFinished();
          }
        }, 'ja-JP', preferredVoice);
      }
    };

    playOnce();
  }

  // 随身听连续队列控制
  function startWalkman(items, startIndex = 0) {
    stop();
    if (!items || !items.length) return;
    state.playlist = items;
    state.playlistIndex = startIndex;
    state.isWalkmanActive = true;
    playWalkmanTrack(startIndex);
  }

  function playWalkmanTrack(index) {
    if (index < 0 || index >= state.playlist.length) {
      stop();
      state.isWalkmanActive = false;
      return;
    }
    state.playlistIndex = index;
    const item = state.playlist[index];
    speak(item.jp, item.audioUrl, item.id, () => {
      if (state.isWalkmanActive) {
        if (state.playlistIndex + 1 < state.playlist.length) {
          playWalkmanTrack(state.playlistIndex + 1);
        } else {
          // 循环播放整篇
          playWalkmanTrack(0);
        }
      }
    }, item.speakerVoice);
  }

  function toggleWalkman(items) {
    if (state.isPlaying && state.isWalkmanActive) {
      stop();
      state.isWalkmanActive = false;
    } else {
      startWalkman(items, state.playlistIndex || 0);
    }
  }

  function nextTrack() {
    if (!state.playlist.length) return;
    const nextIdx = (state.playlistIndex + 1) % state.playlist.length;
    playWalkmanTrack(nextIdx);
  }

  function prevTrack() {
    if (!state.playlist.length) return;
    const prevIdx = (state.playlistIndex - 1 + state.playlist.length) % state.playlist.length;
    playWalkmanTrack(prevIdx);
  }

  function setRate(rate) {
    state.playbackRate = rate;
    if (audioInstance) {
      audioInstance.playbackRate = rate;
    }
  }

  function toggleRepeat() {
    const options = [1, 2, 3, 5];
    const currentIdx = options.indexOf(state.repeatCount);
    state.repeatCount = options[(currentIdx + 1) % options.length];
  }

  return {
    state,
    speak,
    stop,
    startWalkman,
    toggleWalkman,
    nextTrack,
    prevTrack,
    setRate,
    toggleRepeat
  };
}
