import React, { useState, useEffect } from 'react';

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

const MemoryGame = ({ language }) => {
  // Prepare pairs and shuffle
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices
  const [matched, setMatched] = useState([]); // indices
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
    setAttempts(0);
    setIsComplete(false);
  }, [language]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setIsComplete(true);
    }
  }, [matched, cards]);

  const handleFlip = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    setFlipped((prev) => [...prev, idx]);
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
      setAttempts((a) => a + 1);
    }
  }, [flipped, cards]);

  const handleReset = () => {
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setIsComplete(false);
    // Re-trigger useEffect to reshuffle
    setTimeout(() => setCards(shuffle(
      shuffle(ANIMALS)
        .slice(0, 6)
        .flatMap((animal) => [
          { ...animal, id: `${animal.en}-1` },
          { ...animal, id: `${animal.en}-2` },
        ])
    )), 10);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '60vh',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      maxWidth: 500,
      margin: '0 auto',
    }}>
      {/* Back to Games button */}
      <div style={{ marginBottom: '1.2rem', alignSelf: 'flex-start' }}>
        <a href={getBackLink()} style={{
          display: 'inline-block',
          background: '#e0f7fa',
          color: '#6c63ff',
          borderRadius: 8,
          padding: '0.4rem 1.1rem',
          fontWeight: 600,
          fontSize: '1rem',
          textDecoration: 'none',
          boxShadow: '0 1px 4px #0001',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#b2ebf2'}
        onMouseLeave={e => e.currentTarget.style.background = '#e0f7fa'}
        >
          ← Back to Games
        </a>
      </div>
      {/* Moves/Attempts Counter */}
      <div style={{ textAlign: 'center', marginBottom: '0.7rem', fontWeight: 600, fontSize: '1.1rem', color: '#6c63ff' }}>
        Moves: {attempts}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gap: '1.2rem',
        justifyItems: 'center',
        marginBottom: '1.2rem',
        width: '100%',
        maxWidth: 440,
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
                width: 'min(22vw, 110px)',
                height: 'min(28vw, 140px)',
                maxWidth: 110,
                maxHeight: 140,
                minWidth: 70,
                minHeight: 90,
                background: isFlipped ? '#fffbe7' : '#cce0ff',
                border: '2.5px solid #b3b3b3',
                borderRadius: 16,
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
                fontSize: '1.1rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isFlipped ? (
                <>
                  <span style={{ fontSize: '2.5rem', marginBottom: '0.2rem', display: 'block' }}>{emoji}</span>
                  <span style={{ fontSize: '1.1rem', color: '#333', fontWeight: 700 }}>{text}</span>
                </>
              ) : (
                <span style={{ fontSize: '2.2rem', color: '#6c63ff' }}>❓</span>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '0.7rem' }}>
        <span style={{ fontWeight: 500 }}>Matches:</span> {matched.length / 2} / 6
      </div>
      {isComplete && (
        <div style={{ textAlign: 'center', color: '#43a047', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
          🎉 Congratulations! You found all pairs!
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: 0 }}>
        <button onClick={handleReset} style={{
          background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 1px 4px #0001',
        }}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default MemoryGame; 