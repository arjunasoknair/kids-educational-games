// Audio utility functions
let audioCache = {};

// Get the base URL for assets
const getBaseUrl = () => {
  return import.meta.env.DEV 
    ? '/kids-educational-games/memory-flashcard-game'
    : '/kids-educational-games/memory-flashcard-game';
};

export const getAudioPath = (item, language, topic) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/audio_assets/${language}/${topic}/${topic}_${item.en.toLowerCase()}_${language}.wav`;
};

export const loadAudio = (item, language, topic) => {
  const path = getAudioPath(item, language, topic);
  if (!audioCache[path]) {
    audioCache[path] = new Audio(path);
  }
  return audioCache[path];
};

export const playSound = async (item, language, topic, isMuted = false) => {
  if (isMuted) return;
  
  try {
    if (language === 'both') {
      // Play English first, then Malayalam
      const enAudio = loadAudio(item, 'en', topic);
      const mlAudio = loadAudio(item, 'ml', topic);
      
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
      const audio = loadAudio(item, language, topic);
      audio.currentTime = 0;
      await audio.play();
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const preloadAudio = (items, language, topic) => {
  if (language === 'both') {
    // Preload both English and Malayalam audio
    items.forEach(item => {
      loadAudio(item, 'en', topic);
      loadAudio(item, 'ml', topic);
    });
  } else {
    // Preload single language
    items.forEach(item => {
      loadAudio(item, language, topic);
    });
  }
}; 