import React, { useState, useEffect } from 'react';
import { playAnimalSound, preloadAudio } from '../utils/audio';

const ANIMALS = [
  { emoji: '🐶', en: 'Dog', ml: 'നായ' },
  { emoji: '🐱', en: 'Cat', ml: 'പൂച്ച' },
  { emoji: '🐘', en: 'Elephant', ml: 'ആന' },
  { emoji: '🦁', en: 'Lion', ml: 'സിംഹം' },
  { emoji: '🐯', en: 'Tiger', ml: 'കടുവ' },
  { emoji: '🐮', en: 'Cow', ml: 'പശു' },
  { emoji: '🐵', en: 'Monkey', ml: 'കുരങ്ങൻ' },
  { emoji: '🐰', en: 'Rabbit', ml: 'മുയല്‍' },
];

function getCardContent(animal, language) {
  if (language === 'en') return { emoji: animal.emoji, text: animal.en };
  if (language === 'ml') return { emoji: animal.emoji, text: animal.ml };
  return { emoji: animal.emoji, text: `${animal.en} / ${animal.ml}` };
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getBackLink() {
  // Use relative path for local and deployed
  if (window.location.pathname.includes('memory-flashcard-game')) {
    return '../';
  }
  return './';
}

const MemoryGame = ({ language, onMove }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices
  const [matched, setMatched] = useState([]); // indices
  const [isComplete, setIsComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Create pairs and shuffle
    const pairs = shuffle(
      shuffle(ANIMALS)
        .slice(0, 6) // 6 pairs for a 12-card game
        .flatMap((animal) => [
          { ...animal, id: `${animal.en}-1` },
          { ...animal, id: `${animal.en}-2` },
        ])
    );
    setCards(pairs);
    setFlipped([]);
    setMatched([]);
    setIsComplete(false);

    // Preload audio for current language
    const animals = pairs.map(card => card.en.toLowerCase());
    preloadAudio(animals, language);
  }, [language]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setIsComplete(true);
    }
  }, [matched, cards]);

  const handleFlip = async (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    
    // Play sound for the flipped card
    const animal = cards[idx].en.toLowerCase();
    await playAnimalSound(animal, language, isMuted);
    
    // Only count a move when the second card is flipped
    if (newFlipped.length === 2) {
      onMove();
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [i, j] = flipped;
      if (cards[i].en === cards[j].en) {
        setTimeout(() => {
          setMatched((prev) => [...prev, i, j]);
          setFlipped([]);
        }, 700);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }, [flipped, cards]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
    }}>
      {/* Mute Toggle Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        style={{
          alignSelf: 'flex-end',
          background: isMuted ? '#ff6b6b' : '#6c63ff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.4rem 1rem',
          fontWeight: 600,
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 1px 4px #0001',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </button>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'min(2vw, 1rem)',
        width: '100%',
        maxWidth: '100%',
        aspectRatio: '1',
        padding: '0.5rem',
        boxSizing: 'border-box',
      }}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          const { emoji, text } = getCardContent(card, language);
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(idx)}
              disabled={isFlipped || flipped.length === 2 || isComplete}
              style={{
                width: '100%',
                aspectRatio: '1',
                padding: '0.2rem',
                background: isFlipped ? '#fffbe7' : '#cce0ff',
                border: '2px solid #b3b3b3',
                borderRadius: '12px',
                boxShadow: isFlipped ? '0 2px 12px #0002' : '0 1px 2px #0001',
                cursor: isFlipped ? 'default' : 'pointer',
                transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                outline: isFlipped ? '2px solid #ffd700' : 'none',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.8rem, 3vw, 1.1rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isFlipped ? (
                <>
                  <span style={{ 
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
                    marginBottom: '0.2rem', 
                    display: 'block' 
                  }}>
                    {emoji}
                  </span>
                  <span style={{ 
                    fontSize: 'clamp(0.7rem, 2vw, 1.1rem)', 
                    color: '#333', 
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '0 0.2rem'
                  }}>
                    {text}
                  </span>
                </>
              ) : (
                <span style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', 
                  color: '#6c63ff' 
                }}>
                  ❓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame; 