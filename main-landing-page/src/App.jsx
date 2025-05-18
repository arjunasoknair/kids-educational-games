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

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-[#f0f7ff] to-[#e6f3ff] dark:from-[#e6f3ff] dark:to-[#f0f7ff] overflow-x-hidden text-gray-700 dark:text-gray-200">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-0">
        <h1
          className="text-[#6c63ff] font-fredoka font-extrabold flex items-center gap-2 text-[clamp(2.2rem,7vw,3.5rem)] leading-tight mb-8 drop-shadow-sm"
          style={{ fontFamily: 'Fredoka, sans-serif' }}
        >
          <span>✨</span>
          <span>Kids Educational Games</span>
          <span>✨</span>
        </h1>
        <h2 className="font-semibold mb-8 leading-snug text-[clamp(1.1rem,3.5vw,1.5rem)]">
          Welcome! Choose a game to play:
        </h2>
        <div className="flex flex-col items-center gap-8 w-full">
          <a
            href="./memory-flashcard-game/"
            className="bg-[#fff1f5] rounded-xl p-4 no-underline text-inherit shadow-[0_2px_12px_rgba(0,0,0,0.1)] transition-transform transition-shadow duration-200 flex flex-col items-center gap-1 w-full max-w-[400px] mx-auto"
          >
            <span className="text-[2.2rem]">🧠</span>
            <h3 className="text-[#6c63ff] text-xl sm:text-2xl font-fredoka font-extrabold text-center" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Memory Flash Card Game
            </h3>
            <p className="m-0 leading-snug text-base sm:text-lg text-gray-600 text-center">
              A fun, educational memory game for kids with multiple topics and languages.
            </p>
          </a>
        </div>
      </div>
      <footer className="w-full max-w-xl mx-auto mt-auto py-8 pb-4 text-sm flex flex-col items-center gap-2">
        <div>
          <a href="#" className="text-[#6c63ff] no-underline mr-2 font-medium">Contact</a>
          {' | '}
          <span className="ml-2">About</span>
        </div>
        <div>© 2025 Kids Educational Games <span className="text-red-500">❤️</span></div>
      </footer>
    </div>
  );
}

export default App;
