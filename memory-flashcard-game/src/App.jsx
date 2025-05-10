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
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        background: '#cce0ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '1rem',
        margin: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          minWidth: 320,
          margin: 0,
          padding: '1rem',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          minHeight: '90vh',
          height: '90vh',
          position: 'relative',
        }}
      >
        {/* Back Button */}
        <div style={{ 
          flex: '0 0 auto',
          marginBottom: '1rem',
        }}>
          <a href={window.location.pathname.includes('memory-flashcard-game') ? '../' : './'}
            style={{
              display: 'inline-block',
              background: '#e0f7fa',
              color: '#6c63ff',
              borderRadius: 8,
              padding: '0.4rem 1.1rem',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 1px 4px #0001',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b2ebf2'}
            onMouseLeave={e => e.currentTarget.style.background = '#e0f7fa'}
          >
            ← Back
          </a>
        </div>

        {/* Title */}
        <h1 style={{ 
          textAlign: 'center', 
          color: '#6c63ff', 
          fontFamily: 'Fredoka, sans-serif', 
          fontWeight: 700, 
          fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
          margin: '0 0 1.5rem 0',
        }}>
          Animal Memory Game
        </h1>

        {/* Controls */}
        <div style={{ 
          flex: '0 0 auto', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.2rem', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap', 
          width: '100%' 
        }}>
          <TopicSelector topics={topics} selectedTopic={selectedTopic} onSelect={() => {}} disabled />
          <LanguageSelector language={language} onChange={setLanguage} />
        </div>

        {/* Game Area */}
        <div style={{ 
          flex: '1 1 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
          overflow: 'auto',
          padding: '0.5rem',
        }}>
          {/* Moves Counter */}
          <div style={{ 
            textAlign: 'center', 
            fontWeight: 600, 
            fontSize: '1.1rem', 
            color: '#6c63ff',
            padding: '0.5rem 1rem',
            background: '#f0f7ff',
            borderRadius: 8,
            boxShadow: '0 1px 4px #0001'
          }}>
            Moves: {moves}
          </div>
          
          <MemoryGame 
            topic={selectedTopic} 
            language={language} 
            onMove={() => setMoves(m => m + 1)}
          />
          
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
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 1px 4px #0001',
              marginTop: 'auto',
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
