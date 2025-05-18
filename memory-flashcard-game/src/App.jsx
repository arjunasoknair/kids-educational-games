import React, { useState } from 'react';
import TopicSelector from './components/TopicSelector';
import LanguageSelector from './components/LanguageSelector';
import MemoryGame from './components/MemoryGame';
import './App.css';

const topics = [
  { value: 'animals', label: 'Animals' },
  // Other topics can be added later
];

function App() {
  const [selectedTopic] = useState('animals');
  const [language, setLanguage] = useState('en');
  const [moves, setMoves] = useState(0);

  return (
    <div
      style={{
        minHeight: '100dvh',
        height: '100dvh',
        width: '100vw',
        background: '#cce0ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 500,
          height: '100%',
          maxHeight: '100dvh',
          margin: 0,
          padding: '0.5rem',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          overflow: 'hidden',
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
          Animal Memory Game
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
            onSelect={() => {}} 
            disabled 
            style={{ flex: '1', minWidth: '120px', maxWidth: '180px' }}
          />
          <LanguageSelector 
            language={language} 
            onChange={setLanguage}
            style={{ flex: '1', minWidth: '120px', maxWidth: '180px' }}
          />
        </div>

        {/* Game Area */}
        <div style={{ 
          flex: '1 1 0',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          overflow: 'hidden',
        }}>
          {/* Moves Counter */}
          <div style={{ 
            textAlign: 'center', 
            fontWeight: 600, 
            fontSize: '1rem', 
            color: '#6c63ff',
            padding: '0.3rem 0.7rem',
            background: '#f0f7ff',
            borderRadius: 8,
            alignSelf: 'center',
          }}>
            Moves: {moves}
          </div>
          
          {/* Game Grid */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <MemoryGame 
              topic={selectedTopic} 
              language={language} 
              onMove={() => setMoves(m => m + 1)}
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
    </div>
  );
}

export default App;
