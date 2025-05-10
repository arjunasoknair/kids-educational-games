import React from 'react';

const games = [
  {
    name: 'Memory Flash Card Game',
    path: '/kids-educational-games/memory-flashcard-game/',
    description: 'A fun, educational memory game for kids with multiple topics and languages.'
  },
  // Add more games here as you build them
];

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Kids Educational Games</h1>
      <p>Welcome! Choose a game to play:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {games.map(game => (
          <li key={game.name} style={{ margin: '1.5rem 0' }}>
            <a href={game.path} style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0077cc', textDecoration: 'none' }}>
              {game.name}
            </a>
            <div style={{ fontSize: '0.95rem', color: '#444', marginTop: '0.3rem' }}>{game.description}</div>
          </li>
        ))}
      </ul>
      <footer style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
        &copy; {new Date().getFullYear()} Kids Educational Games
      </footer>
    </div>
  );
}

export default App;
