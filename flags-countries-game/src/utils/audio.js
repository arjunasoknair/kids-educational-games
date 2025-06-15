// Audio utility for Flags Game
const audioCache = {};

function getBaseUrl() {
  return import.meta.env.DEV
    ? '/kids-educational-games/flags-countries-game'
    : '/kids-educational-games/flags-countries-game';
}

export function getAudioPath(name, language, type = 'country') {
  const baseUrl = getBaseUrl();
  // For fact audio, append _fact to the name
  const suffix = type === 'fact' ? '_fact' : '';
  return `${baseUrl}/audio_assets/flags/${language}/${name.toLowerCase().replace(/\s+/g, '')}${suffix}_${language}.wav`;
}

export function loadAudio(name, language, type = 'country') {
  const path = getAudioPath(name, language, type);
  if (!audioCache[path]) {
    audioCache[path] = new Audio(path);
  }
  return audioCache[path];
}

export async function playSound(name, language, type = 'country', isMuted = false) {
  if (isMuted) return;
  try {
    if (language === 'both') {
      // Play English first, then Malayalam
      const enAudio = loadAudio(name, 'en', type);
      const mlAudio = loadAudio(name, 'ml', type);
      
      // Play English audio
      enAudio.currentTime = 0;
      await enAudio.play();
      
      // Wait for English audio to finish plus a small pause
      await new Promise(resolve => {
        enAudio.onended = () => {
          setTimeout(() => {
            // Play Malayalam audio
            mlAudio.currentTime = 0;
            mlAudio.play();
            resolve();
          }, 250); // 250ms pause between languages
        };
      });
    } else {
      // Play single language
      const audio = loadAudio(name, language, type);
      audio.currentTime = 0;
      await audio.play();
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

export function preloadAudio(names, language, type = 'country') {
  if (language === 'both') {
    // Preload both English and Malayalam audio
    names.forEach(name => {
      loadAudio(name, 'en', type);
      loadAudio(name, 'ml', type);
    });
  } else {
    // Preload single language
    names.forEach(name => {
      loadAudio(name, language, type);
    });
  }
} 