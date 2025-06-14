import React, { useState, useEffect } from 'react';
import RangeSelector from './components/RangeSelector';
import NumberGrid from './components/NumberGrid';
import QuizMode from './components/QuizMode';
import { NUMBER_RANGES } from './data/ranges';
import { playNumberAudio } from './utils/audio';

export default function App() {
  // State for selected range
  const [selectedRangeId, setSelectedRangeId] = useState(NUMBER_RANGES[0].id);
  const selectedRange = NUMBER_RANGES.find(r => r.id === selectedRangeId);

  // State for language and mute
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('numbersGameLanguage') || 'en';
  });
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('numbersGameMuted') === 'true';
  });
  const [selectedNumber, setSelectedNumber] = useState(null);

  // Quiz mode state
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Persist language and mute settings
  useEffect(() => {
    localStorage.setItem('numbersGameLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('numbersGameMuted', isMuted);
  }, [isMuted]);

  // Handle number click
  const handleNumberClick = (num) => {
    setSelectedNumber(num);
    playNumberAudio(num, language, isMuted);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#e6edff]">
      <div className="w-full max-w-xl max-h-[700px] h-full bg-white rounded-2xl shadow-lg flex flex-col gap-3 p-4 overflow-visible">
        {/* Back Button */}
        <a 
          href="/kids-educational-games/"
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
            marginBottom: '0.2rem',
            marginLeft: '0.1rem',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#b2ebf2'}
          onMouseLeave={e => e.currentTarget.style.background = '#e0f7fa'}
        >
          ← Back
        </a>

        {/* Title */}
        <h1 className="text-3xl font-bold text-violet-600 text-center mb-1">Numbers Game</h1>

        {/* Range Selector Row */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-2">
          <RangeSelector
            ranges={NUMBER_RANGES}
            selectedRangeId={selectedRangeId}
            onSelect={setSelectedRangeId}
          />
        </div>
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center items-center mb-2 w-full">
          {/* Language Selector */}
          <div className="flex gap-2 items-center w-full sm:w-auto justify-center">
            <label className="font-semibold text-violet-600">Language:</label>
            <select
              className="rounded-lg border border-violet-200 px-2 py-1 text-base bg-white text-violet-700 w-36 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-colors"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
              <option value="both">Both</option>
            </select>
          </div>
          {/* Mute Button */}
          <div className="w-full sm:w-auto flex justify-center">
            <button
              className={`px-3 py-1 rounded-lg font-semibold text-base transition-colors duration-150 ${isMuted ? 'bg-red-400 text-white' : 'bg-violet-100 text-violet-600'}`}
              style={{ minWidth: '6.5rem' }}
              onClick={() => setIsMuted(m => !m)}
            >
              {isMuted ? '🔊 Unmute' : '🔇 Mute'}
            </button>
          </div>
          {/* Quiz Mode Toggle */}
          <div className="w-full sm:w-auto flex justify-center">
            <button
              className={`px-3 py-1 rounded-lg font-semibold text-base transition-colors duration-150 ${isQuizMode ? 'bg-green-400 text-white' : 'bg-violet-100 text-violet-600'}`}
              style={{ minWidth: '8rem' }}
              onClick={() => setIsQuizMode(m => !m)}
            >
              {isQuizMode ? '📝 Exit Quiz' : '🎯 Quiz Mode'}
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          {isQuizMode ? (
            <QuizMode
              numbers={selectedRange.numbers}
              language={language}
              isMuted={isMuted}
              onExit={() => setIsQuizMode(false)}
            />
          ) : (
            <NumberGrid
              numbers={selectedRange.numbers}
              onNumberClick={handleNumberClick}
              selectedNumber={selectedNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
} 