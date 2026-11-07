import React, { useState, useEffect, useRef } from 'react';
import { FlashcardDeck, Flashcard } from '../../types/student';
import { sampleFlashcards } from '../../data/mockData';
import { playChime } from '../../utils/audio';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  CheckCircle2,
  Eye,
  EyeOff,
  Flame,
  Award,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyToolsTabProps {
  decks: FlashcardDeck[];
}

export const StudyToolsTab: React.FC<StudyToolsTabProps> = ({ decks }) => {
  const [activeTool, setActiveTool] = useState<'pomodoro' | 'flashcards' | 'recall'>('pomodoro');

  // Pomodoro State
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 mins in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedSessions, setCompletedSessions] = useState<number>(3);
  const [ambientSound, setAmbientSound] = useState<string>('none');
  const timerRef = useRef<number | null>(null);

  // Flashcards State
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0]?.id || 'deck-1');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [deckCards, setDeckCards] = useState<Flashcard[]>(sampleFlashcards['deck-1'] || []);
  const [activeRecallRevealed, setActiveRecallRevealed] = useState<boolean>(false);
  const [userRecallGuess, setUserRecallGuess] = useState<string>('');

  // Switch cards when deck changes
  useEffect(() => {
    const cards = sampleFlashcards[selectedDeckId] || [];
    setDeckCards(cards);
    setCardIndex(0);
    setIsFlipped(false);
    setActiveRecallRevealed(false);
    setUserRecallGuess('');
  }, [selectedDeckId]);

  // Pomodoro Tick Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer expired
            if (sessionType === 'work') {
              if (soundEnabled) playChime('workComplete');
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
              setCompletedSessions(c => c + 1);
              setSessionType('break');
              return 5 * 60; // 5 min break
            } else {
              if (soundEnabled) playChime('breakComplete');
              setSessionType('work');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, sessionType, soundEnabled]);

  const toggleTimer = () => {
    if (soundEnabled) playChime('tap');
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentCard = deckCards[cardIndex];

  const handleRateCard = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    if (soundEnabled) playChime('tap');
    setIsFlipped(false);
    setActiveRecallRevealed(false);
    setUserRecallGuess('');

    if (difficulty === 'easy' || difficulty === 'good') {
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
    }

    if (cardIndex < deckCards.length - 1) {
      setCardIndex(prev => prev + 1);
    } else {
      // Completed deck cycle
      setCardIndex(0);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Segmented Control Header */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1">
        <button
          onClick={() => setActiveTool('pomodoro')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTool === 'pomodoro'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Pomodoro Focus
        </button>
        <button
          onClick={() => setActiveTool('flashcards')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTool === 'flashcards'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setActiveTool('recall')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTool === 'recall'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Active Recall
        </button>
      </div>

      {/* 1. POMODORO TIMER MODULE */}
      {activeTool === 'pomodoro' && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-indigo-900/40 text-center relative overflow-hidden shadow-sm">
            {/* Top mode indicator */}
            <div className="flex items-center justify-between text-xs text-indigo-300 font-mono mb-4">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {sessionType === 'work' ? 'Deep Work Interval' : 'Restorative Break'}
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1 text-indigo-300 hover:text-white transition-colors"
                title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Giant Tabular Timer Display */}
            <div className="my-6">
              <div className="text-6xl font-extrabold tracking-tighter font-mono tabular-nums text-white">
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-indigo-300/80 mt-2 font-medium">
                {sessionType === 'work' ? 'Target: CS 106B Balanced Binary Trees' : 'Stand up, hydrate, and stretch.'}
              </p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetTimer}
                className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-all"
                title="Reset Session"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTimer}
                className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-bold rounded-full shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    Pause Focus
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Start Session
                  </>
                )}
              </button>
            </div>

            {/* Streak & Today's Completed Sessions */}
            <div className="mt-6 pt-4 border-t border-indigo-900/60 flex items-center justify-around text-xs text-indigo-200">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="font-mono">{completedSessions} Sessions Today</span>
              </div>
              <span className="text-indigo-800">|</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">75 mins Focused</span>
              </div>
            </div>
          </div>

          {/* Ambient Sound Selector */}
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Ambient Focus Sound</h4>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'none', label: 'Silent' },
                { id: 'lofi', label: 'Lo-Fi Chill' },
                { id: 'rain', label: 'Rainy Quad' },
                { id: 'library', label: 'Library Hum' },
              ].map(sound => (
                <button
                  key={sound.id}
                  onClick={() => setAmbientSound(sound.id)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg text-center transition-all ${
                    ambientSound === sound.id
                      ? 'bg-slate-900 text-white dark:bg-indigo-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {sound.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. FLASHCARD GENERATOR & SPACED REPETITION */}
      {activeTool === 'flashcards' && (
        <div className="space-y-3">
          {/* Deck Selector Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {decks.map(deck => (
              <button
                key={deck.id}
                onClick={() => setSelectedDeckId(deck.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedDeckId === deck.id
                    ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {deck.title} ({deck.cardCount})
              </button>
            ))}
          </div>

          {/* Flashcard 3D Interactive Card */}
          {currentCard ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Card {cardIndex + 1} of {deckCards.length}</span>
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tap to flip
                </span>
              </div>

              {/* Flip Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[220px] p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                    {isFlipped ? 'Answer & Explanation' : 'Prompt / Concept'}
                  </span>
                  <p className="text-base font-semibold text-slate-900 dark:text-white mt-3 leading-relaxed whitespace-pre-line">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                </div>

                {currentCard.hint && !isFlipped && (
                  <p className="text-xs text-slate-400 italic mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    Hint: {currentCard.hint}
                  </p>
                )}

                <div className="text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span>Level: {currentCard.repetitionLevel}/5</span>
                  <span className="text-indigo-500 font-medium">
                    {isFlipped ? 'Click to show front' : 'Click to reveal'}
                  </span>
                </div>
              </div>

              {/* SM-2 Spaced Repetition Response Bar */}
              {isFlipped ? (
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button
                    onClick={() => handleRateCard('again')}
                    className="py-2.5 px-2 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold text-xs rounded-xl hover:bg-rose-100 transition-colors"
                  >
                    Again (&lt;1d)
                  </button>
                  <button
                    onClick={() => handleRateCard('hard')}
                    className="py-2.5 px-2 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-semibold text-xs rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    Hard (2d)
                  </button>
                  <button
                    onClick={() => handleRateCard('good')}
                    className="py-2.5 px-2 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-semibold text-xs rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Good (4d)
                  </button>
                  <button
                    onClick={() => handleRateCard('easy')}
                    className="py-2.5 px-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold text-xs rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    Easy (7d)
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsFlipped(true)}
                  className="w-full py-3 bg-slate-900 text-white dark:bg-indigo-600 rounded-xl font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  Reveal Solution
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium">No cards in this deck.</p>
            </div>
          )}
        </div>
      )}

      {/* 3. ACTIVE RECALL STUDY MODE */}
      {activeTool === 'recall' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                Cognitive Retrieval Drill
              </span>
              <span className="text-xs text-slate-500 font-mono">1 concept / 2 mins</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Prompt: {currentCard?.front || 'What are the two invariant properties of a Max-Heap?'}
            </h4>

            <p className="text-xs text-slate-500">
              Before viewing the canonical answer, force your brain to retrieve and type the explanation below. Active recall yields up to 50% higher long-term retention than passive re-reading.
            </p>

            <textarea
              value={userRecallGuess}
              onChange={e => setUserRecallGuess(e.target.value)}
              placeholder="Type your explanation or formulas here from memory..."
              rows={3}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveRecallRevealed(!activeRecallRevealed)}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
              >
                {activeRecallRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {activeRecallRevealed ? 'Hide Benchmark' : 'Compare with Benchmark'}
              </button>

              <button
                onClick={() => {
                  if (cardIndex < deckCards.length - 1) {
                    setCardIndex(c => c + 1);
                    setUserRecallGuess('');
                    setActiveRecallRevealed(false);
                  } else {
                    setCardIndex(0);
                  }
                }}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 font-medium"
              >
                Next Drill →
              </button>
            </div>

            {activeRecallRevealed && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 mt-3 whitespace-pre-line">
                <span className="font-bold block mb-1">Standard Reference Answer:</span>
                {currentCard?.back}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
