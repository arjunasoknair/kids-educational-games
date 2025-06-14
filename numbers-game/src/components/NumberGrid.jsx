import React from 'react';

export default function NumberGrid({ numbers, onNumberClick, selectedNumber }) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 w-full max-w-md mx-auto">
      {numbers.map(num => (
        <button
          key={num}
          className={`aspect-square rounded-xl flex items-center justify-center text-2xl font-extrabold shadow transition-all duration-100 border-2
            ${selectedNumber === num ? 'bg-violet-200 border-violet-500 scale-105' : 'bg-violet-50 border-violet-100 hover:bg-violet-100 hover:border-violet-300'}`}
          onClick={() => onNumberClick(num)}
          aria-label={`Number ${num}`}
        >
          <span className="text-violet-700">{num}</span>
        </button>
      ))}
    </div>
  );
} 