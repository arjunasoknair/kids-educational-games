import React from 'react';

export default function RangeSelector({ ranges, selectedRangeId, onSelect }) {
  return (
    <div className="w-full relative overflow-x-auto py-2">
      {/* Right fade for scroll hint */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/90 to-transparent z-10" />
      <div className="flex gap-2 min-w-max pr-8">
        {ranges.map(range => (
          <button
            key={range.id}
            onClick={() => onSelect(range.id)}
            className={`px-3 py-1 rounded-lg font-semibold text-base whitespace-nowrap transition-colors duration-150
              ${selectedRangeId === range.id
                ? 'bg-violet-500 text-white shadow'
                : 'bg-white text-violet-600 border border-violet-200 hover:bg-violet-100'}`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
} 