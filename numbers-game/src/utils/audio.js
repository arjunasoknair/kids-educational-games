// Audio utility for Numbers Game

const audioCache = {};

function getBaseUrl() {
  return import.meta.env.DEV
    ? '/kids-educational-games/numbers-game'
    : '/kids-educational-games/numbers-game';
}

function padNumber(num) {
  if (num === 1000) return '1000';
  return num.toString().padStart(3, '0');
}

export function getAudioPath(number, language) {
  const padded = padNumber(number);
  const baseUrl = getBaseUrl();
  const path = `${baseUrl}/audio_assets/${language}/numbers/numbers_${padded}_${language}.wav`;
  console.log(`Audio path for ${number} (${language}):`, path);
  return path;
}

export function loadAudio(number, language) {
  const path = getAudioPath(number, language);
  if (!audioCache[path]) {
    audioCache[path] = new Audio(path);
  }
  return audioCache[path];
}

export async function playNumberAudio(number, language, isMuted = false) {
  if (isMuted) return;
  try {
    if (language === 'both') {
      // Play English, then Malayalam
      const enAudio = loadAudio(number, 'en');
      const mlAudio = loadAudio(number, 'ml');
      enAudio.currentTime = 0;
      await enAudio.play();
      await new Promise(resolve => {
        enAudio.onended = () => {
          setTimeout(() => {
            mlAudio.currentTime = 0;
            mlAudio.play();
            resolve();
          }, 250);
        };
      });
    } else {
      const audio = loadAudio(number, language);
      audio.currentTime = 0;
      await audio.play();
    }
  } catch (err) {
    // Fail silently for now
    console.error('Audio error:', err);
  }
}

export function playFeedbackAudio(isCorrect, language) {
  const baseUrl = getBaseUrl();
  if (language === 'both') {
    const type = isCorrect ? 'correct' : 'wrong';
    const enPath = `${baseUrl}/audio_assets/en/feedback/feedback_${type}_en.wav`;
    const mlPath = `${baseUrl}/audio_assets/ml/feedback/feedback_${type}_ml.wav`;
    try {
      const enAudio = new Audio(enPath);
      const mlAudio = new Audio(mlPath);
      enAudio.play();
      enAudio.onended = () => {
        setTimeout(() => {
          mlAudio.play();
        }, 200);
      };
    } catch (err) {
      // Fail silently
    }
    return;
  }
  let lang = language;
  const type = isCorrect ? 'correct' : 'wrong';
  const path = `${baseUrl}/audio_assets/${lang}/feedback/feedback_${type}_${lang}.wav`;
  try {
    const audio = new Audio(path);
    audio.play();
  } catch (err) {
    // Fail silently
  }
} 