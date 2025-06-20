import React, { useState, useEffect } from 'react';
import { FLAGS_DATA } from '../data/flags';
import { playSound, preloadAudio } from '../utils/audio';

const BASE_MODES = [
  { value: 'flag-country', label: 'Flags', reverse: 'country-flag', reverseLabel: 'Country → Flag' },
  { value: 'country-continent', label: 'Continent', reverse: 'continent-country', reverseLabel: 'Continent → Country' },
  { value: 'country-capital', label: 'Capital', reverse: 'capital-country', reverseLabel: 'Capital → Country' },
];

// Add a mapping for continent normalization
const CONTINENT_MAP = {
  'Asia': 'Asia',
  'Africa': 'Africa',
  'North America': 'North America',
  'South America': 'South America',
  'Europe': 'Europe',
  'Australia': 'Australia',
  'Oceania': 'Australia', // Map Oceania to Australia
};
const CONTINENT_LIST = [
  'Asia', 'Africa', 'North America', 'South America', 'Europe', 'Australia'
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

// Audio player hook
function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const play = (src, onEnded) => {
    if (!src) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new window.Audio(src);
    setIsPlaying(true);
    audioRef.current.onended = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };
    audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return { play, stop, isPlaying };
}

export default function FlagQuiz() {
  const [quizMode, setQuizMode] = useState('flag-country');
  const [current, setCurrent] = useState(() => getRandomCountry());
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState(() => getOptionsForMode('flag-country', getRandomCountry()));
  const [showNext, setShowNext] = useState(false);
  // Global audio state
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem('isMuted');
    return stored ? JSON.parse(stored) : false;
  });
  const [malayalamEnabled, setMalayalamEnabled] = useState(() => {
    const stored = localStorage.getItem('malayalamEnabled');
    return stored ? JSON.parse(stored) : false;
  });

  const audioBase = '/audio_assets/flags';
  const { play, stop, isPlaying } = useAudioPlayer();

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);
  useEffect(() => {
    localStorage.setItem('malayalamEnabled', JSON.stringify(malayalamEnabled));
  }, [malayalamEnabled]);

  function getOptionsForMode(mode, country) {
    switch (mode) {
      case 'flag-country':
        return getRandomOptions(FLAGS_DATA, country, 'name', 3);
      case 'country-flag':
        return getRandomOptions(FLAGS_DATA, country, 'flag', 3);
      case 'country-continent': {
        // Use normalized continent names, unique, and not repeated
        const correctContinent = CONTINENT_MAP[country.continent] || country.continent;
        const incorrect = CONTINENT_LIST.filter(cont => cont !== correctContinent);
        const shuffled = incorrect.sort(() => 0.5 - Math.random());
        const options = [correctContinent, ...shuffled].slice(0, 3);
        // Ensure unique
        return Array.from(new Set(options)).sort(() => 0.5 - Math.random());
      }
      case 'continent-country': {
        // Pick a random continent
        const allContinents = CONTINENT_LIST;
        const continent = allContinents[Math.floor(Math.random() * allContinents.length)];
        // Pick one country from that continent (correct)
        const correctCountries = FLAGS_DATA.filter(c => (CONTINENT_MAP[c.continent] || c.continent) === continent);
        const correctCountry = correctCountries[Math.floor(Math.random() * correctCountries.length)];
        // Pick two countries from other continents (incorrect)
        const incorrectCountries = FLAGS_DATA.filter(c => (CONTINENT_MAP[c.continent] || c.continent) !== continent);
        // Ensure unique incorrect options
        const shuffledIncorrect = incorrectCountries.sort(() => 0.5 - Math.random());
        const options = [correctCountry, ...shuffledIncorrect.slice(0, 2)];
        // Shuffle options
        return options.sort(() => 0.5 - Math.random());
      }
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
        return { prompt: <span className="text-xl font-bold text-violet-700 flex items-center gap-2"><span className="text-4xl">{country.flag}</span> {country.name}</span>, options };
      case 'continent-country': {
        // The prompt should be the continent of the correct answer
        const correctOption = options.find(o => o && (CONTINENT_MAP[o.continent] || o.continent) && CONTINENT_LIST.includes(CONTINENT_MAP[o.continent] || o.continent));
        const continentPrompt = correctOption ? (CONTINENT_MAP[correctOption.continent] || correctOption.continent) : '';
        return {
          prompt: <span className="text-xl font-bold text-violet-700">{continentPrompt}</span>,
          options: options.map(o => ({ name: o.name, flag: o.flag, continent: CONTINENT_MAP[o.continent] || o.continent })),
          continentPrompt
        };
      }
      case 'country-capital':
        return { prompt: <span className="text-xl font-bold text-violet-700 flex items-center gap-2"><span className="text-4xl">{country.flag}</span> {country.name}</span>, options: options.map(o => o.capital) };
      case 'capital-country':
        return {
          prompt: <span className="text-xl font-bold text-violet-700">{country.capital}</span>,
          options: options.map(o => ({ name: o.name, flag: o.flag }))
        };
      default:
        return { prompt: '', options: [] };
    }
  }

  const questionData = getQuestionForMode(quizMode, current, options);
  const prompt = questionData.prompt;
  const displayOptions = questionData.options;
  const continentPromptValue = questionData.continentPrompt;

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    // If feedback is showing and answer was wrong, allow retry (apply to all modes)
    if (showFeedback && !isCorrect) {
      setShowFeedback(false);
      setIsCorrect(null);
      setShowNext(false);
    }
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    let correct = false;
    switch (quizMode) {
      case 'flag-country':
        correct = displayOptions[selectedIdx] === current.name;
        break;
      case 'country-flag':
        correct = displayOptions[selectedIdx] === current.flag;
        break;
      case 'country-continent': {
        const correctContinent = CONTINENT_MAP[current.continent] || current.continent;
        correct = displayOptions[selectedIdx] === correctContinent;
        break;
      }
      case 'continent-country': {
        const selected = displayOptions[selectedIdx];
        const selectedContinent = CONTINENT_MAP[selected.continent] || selected.continent;
        correct = selectedContinent === continentPromptValue;
        break;
      }
      case 'country-capital':
        correct = displayOptions[selectedIdx] === current.capital;
        break;
      case 'capital-country':
        correct = displayOptions[selectedIdx].name === current.name;
        break;
      default:
        break;
    }
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setShowNext(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedIdx(null);
    setIsCorrect(null);
    setShowNext(false);
    const newCountry = getRandomCountry();
    const newOptions = getOptionsForMode(quizMode, newCountry);
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

  // Play audio for option (country, continent, capital)
  const handleOptionAudio = (opt, mode) => {
    if (isMuted) return;
    if (opt === undefined || opt === null) {
      console.warn('handleOptionAudio called with undefined or null opt:', opt, 'mode:', mode);
      return;
    }
    let name, type;
    if (mode === 'flag-country') {
      if (typeof opt === 'string') {
        name = opt;
        type = 'country';
      } else if (typeof opt === 'object' && opt.name) {
        name = opt.name;
        type = 'country';
      } else {
        console.warn('Expected string or object with name for country name in flag-country mode, but got:', opt);
        return;
      }
    } else if (mode === 'country-flag') {
      // opt is a flag string, need to find the country by flag
      const country = FLAGS_DATA.find(c => c.flag === opt);
      if (country) {
        name = country.name;
        type = 'country';
      } else {
        console.warn('Could not find country for flag in country-flag mode:', opt);
        return;
      }
    } else if (mode === 'country-continent') {
      if (typeof opt === 'string') {
        name = opt;
        type = 'continent';
      } else {
        console.warn('Expected string for continent in mode', mode, 'but got:', opt);
        return;
      }
    } else if (mode === 'continent-country') {
      if (typeof opt === 'object' && opt.name) {
        name = opt.name;
        type = 'country';
      } else {
        console.warn('Expected country object with name for mode', mode, 'but got:', opt);
        return;
      }
    } else if (mode === 'country-capital') {
      if (typeof opt === 'string') {
        name = opt;
        type = 'capital';
      } else {
        console.warn('Expected string for capital in mode', mode, 'but got:', opt);
        return;
      }
    } else if (mode === 'capital-country') {
      if (typeof opt === 'object' && opt.name) {
        name = opt.name;
        type = 'country';
      } else {
        console.warn('Expected country object with name for mode', mode, 'but got:', opt);
        return;
      }
    }
    playSound(name, 'en', type, isMuted);
  };

  // Play fun fact audio after correct answer
  useEffect(() => {
    if (showFeedback && isCorrect && !isMuted) {
      const name = quizMode === 'continent-country' && correctCountry ? correctCountry.name : current.name;
      playSound(name, malayalamEnabled ? 'both' : 'en', 'fact', isMuted);
    }
  }, [showFeedback, isCorrect, malayalamEnabled, isMuted, quizMode, correctCountry, current]);

  // Play button for quiz prompt in reverse modes
  const handlePromptAudio = () => {
    if (isMuted) return;
    let name, type;
    if (quizMode === 'country-flag' || quizMode === 'country-continent' || quizMode === 'country-capital') {
      name = current.name;
      type = 'country';
    } else if (quizMode === 'flag-country') {
      name = current.name;
      type = 'country';
    } else if (quizMode === 'capital-country') {
      name = current.capital;
      type = 'capital';
    } else if (quizMode === 'continent-country' && correctCountry) {
      name = correctCountry.name;
      type = 'country';
    }
    if (name) playSound(name, 'en', type, isMuted);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#fffbe6] p-2 sm:p-6">
      <div className="w-full max-w-xl max-h-[700px] h-full bg-[#fffbe6] rounded-2xl shadow-xl flex flex-col gap-3 p-4 overflow-visible border-4 border-[#f7f3d7]">
        {/* Global Audio Controls */}
        <div className="flex flex-row gap-4 items-center justify-end mb-2">
          <button
            className={`px-3 py-1 rounded-full font-semibold border-2 flex items-center gap-2 transition-colors ${isMuted ? 'bg-gray-200 border-gray-400 text-gray-500' : 'bg-green-100 border-green-400 text-green-700'}`}
            onClick={() => setIsMuted(m => !m)}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <span role="img" aria-label="Muted">🔇</span> : <span role="img" aria-label="Unmuted">🔊</span>}
            {isMuted ? 'Muted' : 'Sound On'}
          </button>
          <button
            className={`px-3 py-1 rounded-full font-semibold border-2 flex items-center gap-2 transition-colors ${malayalamEnabled ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-500'}`}
            onClick={() => setMalayalamEnabled(m => !m)}
            aria-label={malayalamEnabled ? 'Disable Malayalam' : 'Enable Malayalam'}
          >
            <span role="img" aria-label="Malayalam">🌐</span>
            {malayalamEnabled ? 'Malayalam ON' : 'Malayalam OFF'}
          </button>
        </div>
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
                  const newOptions = getOptionsForMode(mode.value, newCountry);
                  setCurrent(newCountry);
                  setOptions(newOptions);
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
                    key={typeof opt === 'object' && opt.name ? opt.name : opt || idx}
                    className={`rounded-xl font-extrabold shadow transition-all duration-100 border-2 w-36 max-w-full flex flex-col items-center justify-center px-2 py-2 whitespace-normal break-words
                      ${isFlagOptionMode ? 'text-7xl sm:text-8xl py-6' : 'text-lg sm:text-xl'}
                      ${selectedIdx === idx ? 'bg-violet-300 border-violet-600' : 'bg-violet-50 border-violet-100 hover:bg-violet-100 hover:border-violet-300'}
                      ${showFeedback && idx === displayOptions.findIndex(o => {
                        if (quizMode === 'country-continent') {
                          const correctContinent = CONTINENT_MAP[current.continent] || current.continent;
                          return o === correctContinent;
                        }
                        if (quizMode === 'continent-country') return (o.name || o) === correctCountry.name;
                        if (quizMode === 'country-capital') return o === current.capital;
                        if (quizMode === 'capital-country') return (o.name || o) === current.name;
                        return o === (quizMode === 'country-flag' ? current.flag : current.name);
                      }) && isCorrect ? 'bg-green-100 border-green-500' : ''}
                      ${showFeedback && idx === selectedIdx && !isCorrect ? 'bg-red-100 border-red-500' : ''}`}
                    onClick={() => {
                      handleSelect(idx);
                      handleOptionAudio(opt, quizMode);
                    }}
                    disabled={isCorrect}
                    aria-label={`Select option ${typeof opt === 'string' ? opt : idx}`}
                  >
                    {/* For country-flag and capital-country, show flag only or flag+name */}
                    {quizMode === 'country-flag' && <span className="text-4xl mb-1">{opt}</span>}
                    {quizMode === 'capital-country' && <span className="text-4xl mb-1">{opt.flag}</span>}
                    {quizMode === 'continent-country' && <span className="text-4xl mb-1">{opt.flag}</span>}
                    {/* For all modes, show name or capital as appropriate */}
                    <span className="text-center w-full whitespace-normal break-words">
                      {quizMode === 'flag-country' && opt}
                      {quizMode === 'country-flag' && ''}
                      {quizMode === 'country-continent' && opt}
                      {quizMode === 'continent-country' && opt.name}
                      {quizMode === 'country-capital' && opt}
                      {quizMode === 'capital-country' && opt.name}
                    </span>
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
          {/* Play button for quiz prompt in reverse modes */}
          {['country-flag', 'country-continent', 'country-capital', 'capital-country', 'continent-country'].includes(quizMode) && (
            <div className="flex justify-center mt-2">
              <button
                className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-yellow-700 font-semibold flex items-center gap-2"
                onClick={handlePromptAudio}
                aria-label="Play question audio"
                disabled={isMuted}
              >
                <span role="img" aria-label="Play">🔊</span> Play Question Audio
              </button>
            </div>
          )}
          {/* Fun Fact and Details after correct answer */}
          {showFunFact && (
            <div className="mt-3 p-3 bg-violet-50 rounded-xl shadow text-center max-w-full w-full flex flex-col items-center justify-center">
              <div className="font-bold text-violet-700 mb-1 text-lg sm:text-xl">Fun Fact:</div>
              <div className="text-base text-violet-800 mb-1 break-words max-w-[90vw] w-full sm:max-w-xl mx-auto">{(quizMode === 'continent-country' ? correctCountry.funFactEn : current.funFactEn)}</div>
              {malayalamEnabled && (
                <div className="text-base text-violet-700 italic break-words max-w-[90vw] w-full sm:max-w-xl mx-auto">{(quizMode === 'continent-country' ? correctCountry.funFactMl : current.funFactMl)}</div>
              )}
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