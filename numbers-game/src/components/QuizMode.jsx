import React, { useState, useEffect } from 'react';
import { playNumberAudio, playFeedbackAudio } from '../utils/audio';

const QUIZ_TYPES = [
  { value: 'audio-to-number', label: 'Audio → Number' },
  { value: 'number-to-audio', label: 'Number → Audio' },
];

function getRandomOptions(numbers, correct, count = 3) {
  const incorrect = numbers.filter(n => n !== correct);
  const shuffled = incorrect.sort(() => 0.5 - Math.random());
  const options = [correct, ...shuffled.slice(0, count - 1)];
  // Shuffle the final options array
  return options.sort(() => 0.5 - Math.random());
}

export default function QuizMode({ numbers, language, isMuted, onExit }) {
  // Quiz state
  const [quizType, setQuizType] = useState('audio-to-number');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  // For number-to-audio mode
  const [selectedAudioIdx, setSelectedAudioIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  // For audio-to-number mode
  const [selectedNumberIdx, setSelectedNumberIdx] = useState(null);

  // Initialize quiz
  useEffect(() => {
    if (numbers.length > 0) {
      generateNewQuestion();
      setTotalQuestions(numbers.length);
    }
  }, [numbers, quizType]);

  // Generate a new random question and options
  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const question = numbers[randomIndex];
    setCurrentQuestion(question);
    setIsCorrect(null);
    setShowFeedback(false);
    setOptions(getRandomOptions(numbers, question, 3));
    setSelectedAudioIdx(null);
    setSelectedNumberIdx(null);
    setSubmitted(false);
    if (quizType === 'audio-to-number') {
      setTimeout(() => {
        playNumberAudio(question, language, isMuted);
      }, 300);
    }
  };

  // Handle answer selection for audio-to-number
  const handleAnswer = (selected) => {
    let correct = selected === currentQuestion;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(prev => prev + 1);
      if (quizType === 'number-to-audio') {
        playNumberAudio(currentQuestion, language, isMuted);
      }
    }
    setTimeout(() => {
      if (score + 1 >= totalQuestions) {
        setIsComplete(true);
      } else {
        generateNewQuestion();
      }
    }, 1500);
  };

  // Handle submit for audio-to-number
  const handleNumberSubmit = () => {
    if (selectedNumberIdx === null) return;
    const selected = options[selectedNumberIdx];
    let correct = selected === currentQuestion;
    setIsCorrect(correct);
    setShowFeedback(true);
    setSubmitted(true);
    playFeedbackAudio(correct, language);
    const delay = language === 'both' ? 3000 : 1500;
    if (correct) {
      setTimeout(() => {
        generateNewQuestion();
        setSubmitted(false);
        setSelectedNumberIdx(null);
      }, delay);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSubmitted(false);
      }, 1200);
    }
  };

  // Handle submit for number-to-audio
  const handleAudioSubmit = () => {
    if (selectedAudioIdx === null) return;
    const selected = options[selectedAudioIdx];
    let correct = selected === currentQuestion;
    setIsCorrect(correct);
    setShowFeedback(true);
    setSubmitted(true);
    playFeedbackAudio(correct, language);
    const delay = language === 'both' ? 3000 : 1500;
    if (correct) {
      setTimeout(() => {
        generateNewQuestion();
        setSubmitted(false);
        setSelectedAudioIdx(null);
      }, delay);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSubmitted(false);
      }, 1200);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setScore(0);
    setIsComplete(false);
    generateNewQuestion();
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2 className="text-2xl font-bold text-violet-600">Quiz Complete!</h2>
        <p className="text-lg">Your score: {score} out of {totalQuestions}</p>
        <div className="flex gap-2">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
      {/* Quiz Type Toggle */}
      <div className="flex gap-2 mb-2">
        {QUIZ_TYPES.map(type => (
          <button
            key={type.value}
            className={`px-3 py-1 rounded-lg font-semibold text-base transition-colors duration-150 border-2
              ${quizType === type.value ? 'bg-violet-600 text-white border-violet-700' : 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50'}`}
            onClick={() => setQuizType(type.value)}
            disabled={quizType === type.value}
          >
            {type.label}
          </button>
        ))}
      </div>
      {/* Quiz Content */}
      {quizType === 'audio-to-number' ? (
        // Audio → Number: Play audio, select number, then submit
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-violet-600 mb-2">Which number did you hear?</h2>
            <div className="mb-2">
              <button
                className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-semibold hover:bg-violet-200 transition-colors"
                onClick={() => playNumberAudio(currentQuestion, language, isMuted)}
              >
                🔊 Play Again
              </button>
            </div>
          </div>
          {showFeedback && (
            <div className={`text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}</div>
          )}
          <div className="flex flex-row gap-3 justify-center w-full max-w-md mb-2">
            {options.map((num, idx) => (
              <button
                key={idx}
                type="button"
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl font-extrabold shadow transition-all duration-100 border-2 w-20 h-20
                  ${selectedNumberIdx === idx ? 'bg-violet-300 border-violet-600' : 'bg-violet-50 border-violet-100 hover:bg-violet-100 hover:border-violet-300'}
                  ${showFeedback && idx === options.indexOf(currentQuestion) && isCorrect ? 'bg-green-100 border-green-500' : ''}
                  ${showFeedback && idx === selectedNumberIdx && !isCorrect ? 'bg-red-100 border-red-500' : ''}`}
                onClick={() => setSelectedNumberIdx(idx)}
                disabled={showFeedback}
                aria-label={`Select number option ${idx + 1}`}
              >
                <span className="text-violet-700">{num}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3 justify-center w-full max-w-md">
            <button
              className="px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              onClick={handleNumberSubmit}
              disabled={selectedNumberIdx === null || showFeedback}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        // Number → Audio: Show number, play buttons only, then submit
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-violet-600 mb-2">Which audio matches this number?</h2>
            <div className="text-6xl font-extrabold text-violet-800 drop-shadow mb-2">{currentQuestion}</div>
          </div>
          {showFeedback && (
            <div className={`text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}</div>
          )}
          <div className="flex flex-row gap-3 justify-center w-full max-w-md mb-2">
            {options.map((num, idx) => (
              <button
                key={idx}
                type="button"
                className={`px-6 py-4 rounded-full bg-violet-100 text-violet-700 shadow hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-colors text-2xl ${selectedAudioIdx === idx ? 'ring-4 ring-violet-400' : ''}`}
                onClick={() => setSelectedAudioIdx(idx) || playNumberAudio(num, language, isMuted)}
                tabIndex={0}
                aria-label={`Play option ${idx + 1}`}
              >
                <span role="img" aria-label="audio">🔊</span>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-3 justify-center w-full max-w-md">
            <button
              className="px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              onClick={handleAudioSubmit}
              disabled={selectedAudioIdx === null || showFeedback}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
} 