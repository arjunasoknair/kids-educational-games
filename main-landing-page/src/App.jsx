import React from 'react';

const games = [
  {
    name: 'Memory Flash Card Game',
    path: '/kids-educational-games/memory-flashcard-game/',
    description: 'A fun, educational memory game for kids with multiple topics and languages.',
    icon: '🧠',
    color: '#ffe4ec',
  },
  // Add more games here as you build them
];

function App() {
  React.useEffect(() => {
    // Dynamically load a playful Google Font for the heading
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Responsive card width and layout
  const cardWidth = 'min(90vw, 260px)';
  const cardPadding = 'clamp(1rem, 4vw, 2rem)';

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100vw',
      overflowX: 'hidden',
      padding: '1rem 0',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: 520,
        width: '100%',
        margin: '0 auto',
        padding: '0 0.5rem',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          color: '#6c63ff',
          fontSize: 'clamp(2rem, 8vw, 3.5rem)',
          lineHeight: '1.2',
          margin: '0 0 2rem 0',
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
        }}>
          <span>✨ Kids</span>
          <span>Educational Games</span>
          <span>✨</span>
        </h1>
        <h2 style={{
          color: '#666',
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
          fontWeight: 500,
          margin: '0 0 2rem 0',
          lineHeight: '1.4',
        }}>
          Welcome! Choose a game to play:
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: 500,
          width: '100%',
          margin: '0 auto',
          padding: 0,
        }}>
          <a href="./memory-flashcard-game/" style={{
            background: '#fff1f5',
            borderRadius: 16,
            padding: '1rem',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.7rem',
            width: '100%',
            maxWidth: 400,
            margin: '0 auto',
          }}>
            <span style={{ fontSize: '2.2rem' }}>🧠</span>
            <div>
              <h3 style={{
                color: '#6c63ff',
                fontSize: '1.2rem',
                margin: '0 0 0.3rem 0',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600,
              }}>
                Memory Flash Card Game
              </h3>
              <p style={{
                margin: 0,
                color: '#666',
                lineHeight: '1.4',
                fontSize: '0.98rem',
              }}>
                A fun, educational memory game for kids with multiple topics and languages.
              </p>
            </div>
          </a>
        </div>
      </div>
      <footer style={{
        marginTop: 'auto',
        padding: '2rem 0 1rem 0',
        color: '#666',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        maxWidth: 520,
      }}>
        <div>
          <a href="#" style={{ color: '#6c63ff', textDecoration: 'none', marginRight: '0.5rem' }}>Contact</a>
          |
          <span style={{ marginLeft: '0.5rem' }}>About</span>
        </div>
        <div>© 2025 Kids Educational Games ❤️</div>
      </footer>
    </div>
  );
}

export default App;
