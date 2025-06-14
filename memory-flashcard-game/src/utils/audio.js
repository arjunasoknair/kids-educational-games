// Audio utility for memory game
const audioCache = new Map();

const getAudioPath = (animal, language) => {
  const basePath = import.meta.env.DEV 
    ? '/kids-educational-games/memory-flashcard-game/audio_assets'
    : '/kids-educational-games/memory-flashcard-game/audio_assets';
  return `${basePath}/${language}/animals/animals_${animal}_${language}.wav`;
};

const loadAudio = async (animal, language) => {
  const key = `${animal}_${language}`;
  if (audioCache.has(key)) {
    console.log(`Using cached audio for ${key}`);
    return audioCache.get(key);
  }

  try {
    const audioPath = getAudioPath(animal, language);
    console.log(`Loading audio from: ${audioPath}`);
    const audio = new Audio(audioPath);
    
    // Add event listeners for debugging
    audio.addEventListener('canplaythrough', () => {
      console.log(`Audio loaded successfully: ${audioPath}`);
    });
    
    audio.addEventListener('error', (e) => {
      console.error(`Error loading audio ${audioPath}:`, e);
    });
    
    await audio.load();
    audioCache.set(key, audio);
    return audio;
  } catch (error) {
    console.error(`Failed to load audio for ${animal} in ${language}:`, error);
    return null;
  }
};

export const playAnimalSound = async (animal, language, isMuted = false) => {
  if (isMuted) {
    console.log('Audio is muted, skipping playback');
    return;
  }

  console.log(`Playing sound for ${animal} in ${language}`);
  
  if (language === 'both') {
    // Play English first, then Malayalam
    const enAudio = await loadAudio(animal, 'en');
    const mlAudio = await loadAudio(animal, 'ml');
    
    if (enAudio) {
      console.log('Playing English audio');
      enAudio.play();
      // Wait for English audio to finish plus a small pause
      await new Promise(resolve => {
        enAudio.onended = () => {
          console.log('English audio finished');
          setTimeout(() => {
            if (mlAudio) {
              console.log('Playing Malayalam audio');
              mlAudio.play();
            }
            resolve();
          }, 250); // 250ms pause between languages
        };
      });
    }
  } else {
    // Play single language
    const audio = await loadAudio(animal, language);
    if (audio) {
      console.log(`Playing ${language} audio`);
      audio.play();
    }
  }
};

export const preloadAudio = async (animals, language) => {
  console.log(`Preloading audio for ${animals.length} animals in ${language}`);
  if (language === 'both') {
    await Promise.all([
      ...animals.map(animal => loadAudio(animal, 'en')),
      ...animals.map(animal => loadAudio(animal, 'ml'))
    ]);
  } else {
    await Promise.all(animals.map(animal => loadAudio(animal, language)));
  }
  console.log('Audio preloading complete');
}; 