import React, { useState } from 'react';
import { FLAGS_DATA } from '../data/flags';

const BASE_MODES = [
  { value: 'flag-country', label: 'Flags', reverse: 'country-flag', reverseLabel: 'Country → Flag' },
  { value: 'country-continent', label: 'Continent', reverse: 'continent-country', reverseLabel: 'Continent → Country' },
  { value: 'country-capital', label: 'Capital', reverse: 'capital-country', reverseLabel: 'Capital → Country' },
];

function getRandomOptions(data, correct, field = 'name', count = 3) {
  // Always include the correct answer, then fill with unique incorrect options
  const incorrect = data.filter(item => item[field] !== correct[field]);
  const shuffled = incorrect.sort(() => 0.5 - Math.random());
  const options = [correct, ...shuffled].slice(0, count);
  // Ensure correct is present
  if (!options.some(o => o[field] === correct[field])) {
    options[0] = correct;
  }
  return options.sort(() => 0.5 - Math.random());
}

function getRandomCountry() {
  return FLAGS_DATA[Math.floor(Math.random() * FLAGS_DATA.length)];
}

function getRandomCountryByContinent(continent) {
  const filtered = FLAGS_DATA.filter(c => c.continent === continent);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function FlagQuiz() {
  const [quizMode, setQuizMode] = useState('flag-country');
  const [current, setCurrent] = useState(() => getRandomCountry());
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState(() => getOptionsForMode('flag-country', getRandomCountry()));
  const [showNext, setShowNext] = useState(false);

  function getOptionsForMode(mode, country) {
    switch (mode) {
      case 'flag-country':
        return getRandomOptions(FLAGS_DATA, country, 'name', 3);
      case 'country-flag':
        return getRandomOptions(FLAGS_DATA, country, 'flag', 3);
      case 'country-continent':
        const uniqueContinents = Array.from(new Set(FLAGS_DATA.map(c => c.continent)));
        const correctContinent = country.continent;
        const incorrect = uniqueContinents.filter(cont => cont !== correctContinent);
        const shuffled = incorrect.sort(() => 0.5 - Math.random());
        const options = [correctContinent, ...shuffled].slice(0, 3);
        if (!options.includes(correctContinent)) options[0] = correctContinent;
        return options.sort(() => 0.5 - Math.random());
      case 'continent-country':
        const allContinents = Array.from(new Set(FLAGS_DATA.map(c => c.continent)));
        const continent = allContinents[Math.floor(Math.random() * allContinents.length)];
        const correctCountry = getRandomCountryByContinent(continent);
        return getRandomOptions(FLAGS_DATA, correctCountry, 'name', 3);
      case 'country-capital':
        return getRandomOptions(FLAGS_DATA, country, 'capital', 3);
      case 'capital-country':
        return getRandomOptions(FLAGS_DATA, country, 'name', 3);
      default:
        return [];
    }
  }

  function getQuestionForMode(mode, country, options) {
    switch (mode) {
      case 'flag-country':
        return { prompt: <span className="text-9xl sm:text-[10rem]" aria-label={`Flag of ${country.name}`}>{country.flag}</span>, options: options.map(o => o.name) };
      case 'country-flag':
        return { prompt: <span className="text-xl font-bold text-violet-700">{country.name}</span>, options: options.map(o => o.flag) };
      case 'country-continent':
        return { prompt: <span className="text-xl font-bold text-violet-700">{country.name}</span>, options };
      case 'continent-country':
        const continent = options.find(o => o.continent === o.continent)?.continent || '';
        return { prompt: <span className="text-xl font-bold text-violet-700">{continent}</span>, options: options.map(o => o.name) };
      case 'country-capital':
        return { prompt: <span className="text-xl font-bold text-violet-700">{country.name}</span>, options: options.map(o => o.capital) };
      case 'capital-country':
        return { prompt: <span className="text-xl font-bold text-violet-700">{country.capital}</span>, options: options.map(o => o.name) };
      default:
        return { prompt: '', options: [] };
    }
  }

  const { prompt, options: displayOptions } = getQuestionForMode(quizMode, current, options);

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    let correct = false;
    switch (quizMode) {
      case 'flag-country':
        correct = options[selectedIdx].name === current.name;
        break;
      case 'country-flag':
        correct = options[selectedIdx].flag === current.flag;
        break;
      case 'country-continent':
        correct = displayOptions[selectedIdx] === current.continent;
        break;
      case 'continent-country':
        correct = options[selectedIdx].name === options.find(o => o.continent === o.continent).name;
        break;
      case 'country-capital':
        correct = options[selectedIdx].capital === current.capital;
        break;
      case 'capital-country':
        correct = options[selectedIdx].name === current.name;
        break;
      default:
        break;
    }
    setIsCorrect(correct);
    setShowFeedback(true);
    setShowNext(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedIdx(null);
    setIsCorrect(null);
    setShowNext(false);
    let newCountry = getRandomCountry();
    let newOptions = getOptionsForMode(quizMode, newCountry);
    if (quizMode === 'continent-country') {
      const allContinents = Array.from(new Set(FLAGS_DATA.map(c => c.continent)));
      const continent = allContinents[Math.floor(Math.random() * allContinents.length)];
      newCountry = getRandomCountryByContinent(continent);
      newOptions = getRandomOptions(FLAGS_DATA, newCountry, 'name', 3);
    }
    setCurrent(newCountry);
    setOptions(newOptions);
  };

  const showFunFact = showFeedback && isCorrect && [
    'flag-country',
    'country-flag',
    'country-continent',
    'continent-country',
    'country-capital',
    'capital-country',
  ].includes(quizMode);

  const correctCountry = quizMode === 'continent-country' && isCorrect
    ? options.find(o => o.continent === o.continent)
    : current;

  // Find the current base mode and if it can be reversed
  const baseMode = BASE_MODES.find(m => m.value === quizMode || m.reverse === quizMode);
  const isReversed = baseMode && baseMode.reverse === quizMode;
  const canReverse = !!baseMode;
  const reverseMode = baseMode ? (isReversed ? baseMode.value : baseMode.reverse) : null;
  const reverseLabel = baseMode ? (isReversed ? baseMode.label : baseMode.reverseLabel) : '';

  // Helper to determine if current mode is a flag option mode
  const isFlagOptionMode = quizMode === 'country-flag';

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#fffbe6] p-2 sm:p-6">
      <div className="w-full max-w-xl max-h-[700px] h-full bg-[#fffbe6] rounded-2xl shadow-xl flex flex-col gap-3 p-4 overflow-visible border-4 border-[#f7f3d7]">
        {/* Back Button */}
        <a
          href="/kids-educational-games/"
          className="self-start bg-cyan-100 text-violet-600 rounded px-3 py-1 font-semibold text-sm no-underline shadow hover:bg-cyan-200 transition-colors mb-1"
        >
          ← Back
        </a>
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 text-center mb-1 font-[Comic Sans MS,Comic Sans,cursive] drop-shadow">Guess the Flag</h1>
        {/* Mode Options Row */}
        <div className="flex flex-row flex-wrap gap-2 justify-center mb-2 w-full">
          {BASE_MODES.map(mode => {
            const selected = quizMode === mode.value || quizMode === mode.reverse;
            return (
              <button
                key={mode.value}
                className={`flex-1 min-w-[100px] px-3 py-2 rounded-lg font-semibold text-lg border-2 transition-colors duration-150 ${selected ? 'bg-violet-600 text-white border-violet-700 shadow-md' : 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50'}`}
                onClick={() => {
                  setQuizMode(mode.value);
                  const newCountry = getRandomCountry();
                  setCurrent(newCountry);
                  setOptions(getOptionsForMode(mode.value, newCountry));
                  setSelectedIdx(null);
                  setShowFeedback(false);
                  setIsCorrect(null);
                  setShowNext(false);
                }}
                disabled={selected}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
        {/* Reverse Mode Row */}
        <div className="flex flex-row justify-center mb-4 w-full">
          {canReverse && (
            <button
              className={`px-4 py-2 rounded-lg font-semibold text-lg border-2 transition-colors duration-150 flex items-center gap-2 ${isReversed ? 'bg-violet-600 text-white border-violet-700 shadow-md' : 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50'}`}
              onClick={() => {
                setQuizMode(reverseMode);
                const newCountry = getRandomCountry();
                setCurrent(newCountry);
                setOptions(getOptionsForMode(reverseMode, newCountry));
                setSelectedIdx(null);
                setShowFeedback(false);
                setIsCorrect(null);
                setShowNext(false);
              }}
              aria-pressed={isReversed}
            >
              <span role="img" aria-label="reverse">🔄</span> Reverse Mode {isReversed && <span className="ml-1">✔️</span>}
            </button>
          )}
        </div>
        {/* Quiz Content */}
        <div className="flex flex-col items-center gap-3 mt-2 w-full">
          {/* Only show question/options/submit if not correct yet */}
          {!(showFeedback && isCorrect) && (
            <>
              <div>{prompt}</div>
              <div className="flex flex-row flex-wrap gap-3 justify-center mt-2 w-full">
                {displayOptions.map((opt, idx) => (
                  <button
                    key={typeof opt === 'string' ? opt : idx}
                    className={`rounded-xl font-extrabold shadow transition-all duration-100 border-2 w-32 flex items-center justify-center
                      ${isFlagOptionMode ? 'text-7xl sm:text-8xl py-6' : 'px-4 py-2 text-lg sm:text-xl'}
                      ${selectedIdx === idx ? 'bg-violet-300 border-violet-600' : 'bg-violet-50 border-violet-100 hover:bg-violet-100 hover:border-violet-300'}
                      ${showFeedback && idx === displayOptions.findIndex(o => {
                        if (quizMode === 'country-continent') return o === current.continent;
                        if (quizMode === 'continent-country') return o === correctCountry.name;
                        if (quizMode === 'country-capital') return o === current.capital;
                        if (quizMode === 'capital-country') return o === current.name;
                        return o === (quizMode === 'country-flag' ? current.flag : current.name);
                      }) && isCorrect ? 'bg-green-100 border-green-500' : ''}
                      ${showFeedback && idx === selectedIdx && !isCorrect ? 'bg-red-100 border-red-500' : ''}`}
                    onClick={() => handleSelect(idx)}
                    disabled={showFeedback}
                    aria-label={`Select option ${typeof opt === 'string' ? opt : idx}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                className="mt-3 px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
                onClick={handleSubmit}
                disabled={selectedIdx === null || showFeedback}
              >
                Submit
              </button>
              {showFeedback && (
                <div className={`text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'} mt-2`}>
                  {isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}
                </div>
              )}
            </>
          )}
          {/* Fun Fact and Details after correct answer */}
          {showFunFact && (
            <div className="mt-3 p-3 bg-violet-50 rounded-xl shadow text-center max-w-full w-full flex flex-col items-center justify-center">
              <div className="font-bold text-violet-700 mb-1 text-lg sm:text-xl">Fun Fact:</div>
              <div className="text-base text-violet-800 mb-1 break-words max-w-[90vw] w-full sm:max-w-xl mx-auto">{(quizMode === 'continent-country' ? correctCountry.funFactEn : current.funFactEn)}</div>
              <div className="text-base text-violet-700 italic break-words max-w-[90vw] w-full sm:max-w-xl mx-auto">{(quizMode === 'continent-country' ? correctCountry.funFactMl : current.funFactMl)}</div>
              <div className="mt-2 text-sm text-gray-600">Continent: <span className="font-semibold text-violet-700">{(quizMode === 'continent-country' ? correctCountry.continent : current.continent)}</span></div>
              <div className="text-sm text-gray-600">Capital: <span className="font-semibold text-violet-700">{(quizMode === 'continent-country' ? correctCountry.capital : current.capital)}</span></div>
            </div>
          )}
          {/* Next Button after feedback/fun fact */}
          {showNext && (
            <button
              className="mt-4 px-6 py-2 rounded-lg bg-blue-400 text-white font-bold text-lg shadow hover:bg-blue-500 transition-colors"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 