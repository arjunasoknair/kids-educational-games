import React from 'react';

const GameStats = ({ attempts, matches, totalPairs, isComplete }) => {
  return (
    <div className="game-stats">
      <p>Attempts: {attempts}</p>
      <p>Matches: {matches} / {totalPairs}</p>
      {isComplete && <p>Congratulations! You found all pairs!</p>}
    </div>
  );
};

export default GameStats; 