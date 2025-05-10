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
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f9f9ff 0%, #e0f7fa 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem 0',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: '2.5rem', color: '#6c63ff', marginBottom: '1rem', letterSpacing: '1px', textAlign: 'center' }}>
          <span role="img" aria-label="sparkles">✨</span> Kids Educational Games <span role="img" aria-label="sparkles">✨</span>
        </h1>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          Welcome! Choose a game to play:
        </p>
        <ul style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          padding: 0,
          listStyle: 'none',
          margin: 0,
        }}>
          {games.map(game => (
            <li key={game.name} style={{
              background: game.color,
              border: '2px solid #cce0ff',
              borderRadius: '18px',
              boxShadow: '0 2px 12px #0001',
              width: cardWidth,
              padding: cardPadding,
              textAlign: 'center',
              transition: 'transform 0.18s, box-shadow 0.18s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flex: '1 1 220px',
              maxWidth: 320,
              minWidth: 180,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 4px 24px #0002';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px #0001';
            }}
            >
              <a href={game.path} style={{ textDecoration: 'none', color: '#6c63ff', display: 'block' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.7rem' }}>{game.icon || '🎮'}</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Fredoka, sans-serif' }}>{game.name}</div>
                <div style={{ fontSize: '1rem', color: '#555', marginTop: '0.3rem' }}>{game.description}</div>
              </a>
            </li>
          ))}
        </ul>
        <footer style={{ marginTop: '3rem', fontSize: '1rem', color: '#888', textAlign: 'center', width: '100%' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <a href="mailto:parent@example.com" style={{ color: '#6c63ff', textDecoration: 'underline', fontWeight: 500 }}>Contact</a> | <span>About</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Kids Educational Games &nbsp; <span role="img" aria-label="heart">❤️</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
