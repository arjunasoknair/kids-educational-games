import React from 'react';

const Card = ({ card, isFlipped, onClick }) => {
  return (
    <button className="card" onClick={onClick} disabled={isFlipped}>
      {isFlipped ? (
        <span>{card.content}</span>
      ) : (
        <span>?</span>
      )}
    </button>
  );
};

export default Card; 