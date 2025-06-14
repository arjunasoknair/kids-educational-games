import React, { useState, useEffect } from 'react';
import TopicSelector from './components/TopicSelector';
import LanguageSelector from './components/LanguageSelector';
import MemoryGame from './components/MemoryGame';
import { getAvailableTopics } from './data/topics';
import './App.css';

function getBestKey(topic, language) {
  return `bestScore_${topic}_${language}`;
}

function App() {
  // Load from localStorage or use default
  const getInitialTopic = () => localStorage.getItem('selectedTopic') || 'animals';
  const getInitialLanguage = () => localStorage.getItem('language') || 'en';

  const [selectedTopic, setSelectedTopic] = useState(getInitialTopic());
  const [language, setLanguage] = useState(getInitialLanguage());
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(null);

  // Load best score on topic/language change
  useEffect(() => {
    const bestKey = getBestKey(selectedTopic, language);
    const bestScore = localStorage.getItem(bestKey);
    setBest(bestScore ? parseInt(bestScore, 10) : null);
    setMoves(0); // reset moves on topic/language change
  }, [selectedTopic, language]);

  useEffect(() => {
    localStorage.setItem('selectedTopic', selectedTopic);
  }, [selectedTopic]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const topics = getAvailableTopics();
  console.log('Available topics:', topics);

  const handleTopicChange = (newTopic) => {
    console.log('Topic selected:', newTopic);
    setSelectedTopic(newTopic);
  };

  // Called when the game is completed
  const handleGameComplete = (finalMoves) => {
    const bestKey = getBestKey(selectedTopic, language);
    if (best === null || finalMoves < best) {
      setBest(finalMoves);
      localStorage.setItem(bestKey, finalMoves);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 500,
          padding: '0.5rem',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          position: 'relative',
        }}
      >
        {/* Back Button */}
        <a 
          href={window.location.pathname.includes('memory-flashcard-game') ? '../' : './'}
          style={{
            alignSelf: 'flex-start',
            background: '#e0f7fa',
            color: '#6c63ff',
            borderRadius: 8,
            padding: '0.3rem 0.9rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 1px 4px #0001',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#b2ebf2'}
          onMouseLeave={e => e.currentTarget.style.background = '#e0f7fa'}
        >
          ← Back
        </a>

        {/* Title */}
        <h1 style={{ 
          textAlign: 'center', 
          color: '#6c63ff', 
          fontFamily: 'Fredoka, sans-serif', 
          fontWeight: 700, 
          fontSize: 'clamp(1.3rem, 5vw, 2rem)', 
          margin: '0',
          lineHeight: 1.2,
        }}>
          Memory Game
        </h1>

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          flexWrap: 'wrap', 
        }}>
          <TopicSelector 
            topics={topics} 
            selectedTopic={selectedTopic} 
            onSelect={handleTopicChange}
            style={{ flex: '1', minWidth: '120px', maxWidth: '180px' }}
          />
          <LanguageSelector 
            language={language} 
            onChange={setLanguage}
            style={{ flex: '1', minWidth: '120px', maxWidth: '180px' }}
          />
        </div>

        {/* Moves and Best Score */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#444',
          margin: '0.5rem 0 0.2rem 0',
        }}>
          <span>Turns: {moves}</span>
          <span>Best: {best !== null ? best : '-'}</span>
        </div>

        {/* Game Area */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MemoryGame 
            topic={selectedTopic} 
            language={language} 
            onMove={() => setMoves(m => m + 1)}
            onComplete={handleGameComplete}
          />
        </div>
        
        {/* Reset Button */}
        <button 
          onClick={() => {
            setMoves(0);
            window.location.reload();
          }}
          style={{
            background: '#6c63ff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.4rem 1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            alignSelf: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#5b52ff'}
          onMouseLeave={e => e.currentTarget.style.background = '#6c63ff'}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
