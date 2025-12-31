'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types';
import { Timer, Button } from '@/components/ui';

interface TimedTaskProps {
  question: Question;
  onComplete: (score: number) => void;
}

// Number comparison task for processing speed
function NumberComparisonTask({ onScore }: { onScore: (correct: boolean) => void }) {
  const [numbers, setNumbers] = useState<[number, number]>([0, 0]);

  const generateNumbers = useCallback(() => {
    const a = Math.floor(Math.random() * 100) + 1;
    let b = Math.floor(Math.random() * 100) + 1;
    // Ensure they're different
    while (b === a) {
      b = Math.floor(Math.random() * 100) + 1;
    }
    setNumbers([a, b]);
  }, []);

  useEffect(() => {
    generateNumbers();
  }, [generateNumbers]);

  const handleClick = (index: number) => {
    const larger = numbers[0] > numbers[1] ? 0 : 1;
    onScore(index === larger);
    generateNumbers();
  };

  return (
    <div className="flex gap-4 justify-center">
      {numbers.map((num, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(i)}
          className="w-32 h-32 sm:w-40 sm:h-40 bg-[var(--fill-tertiary)] rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-bold text-[var(--label-primary)] hover:bg-[var(--fill-secondary)] transition-colors"
        >
          {num}
        </motion.button>
      ))}
    </div>
  );
}

// Stroop test for processing speed
function StroopTask({ onScore }: { onScore: (correct: boolean) => void }) {
  const colors = [
    { name: 'RED', hex: '#FF3B30' },
    { name: 'BLUE', hex: '#007AFF' },
    { name: 'GREEN', hex: '#34C759' },
    { name: 'YELLOW', hex: '#FFCC00' }
  ];

  const [currentWord, setCurrentWord] = useState({ text: '', color: '' });

  const generateWord = useCallback(() => {
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    let displayColor = colors[Math.floor(Math.random() * colors.length)];
    // Make it incongruent 70% of the time
    if (Math.random() > 0.3) {
      while (displayColor.name === textColor.name) {
        displayColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }
    setCurrentWord({ text: textColor.name, color: displayColor.hex });
  }, []);

  useEffect(() => {
    generateWord();
  }, [generateWord]);

  const handleClick = (colorHex: string) => {
    onScore(colorHex === currentWord.color);
    generateWord();
  };

  return (
    <div className="text-center">
      <motion.div
        key={currentWord.text + currentWord.color}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl sm:text-8xl font-bold mb-8"
        style={{ color: currentWord.color }}
      >
        {currentWord.text}
      </motion.div>
      <p className="text-sm text-[var(--label-secondary)] mb-4">
        Tap the COLOR of the word, not what it says
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {colors.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(color.hex)}
            className="w-20 h-20 rounded-xl"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}

// Symbol matching task
function SymbolMatchTask({ onScore }: { onScore: (correct: boolean) => void }) {
  const symbols = ['★', '◆', '●', '■', '▲', '♦', '♠', '♣'];
  const [targetSymbol, setTargetSymbol] = useState('');
  const [grid, setGrid] = useState<string[]>([]);

  const generatePuzzle = useCallback(() => {
    const target = symbols[Math.floor(Math.random() * symbols.length)];
    setTargetSymbol(target);

    const newGrid = Array(9)
      .fill('')
      .map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    // Ensure at least one target
    const targetIndex = Math.floor(Math.random() * 9);
    newGrid[targetIndex] = target;
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

  const handleClick = (symbol: string) => {
    onScore(symbol === targetSymbol);
    generatePuzzle();
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-sm text-[var(--label-secondary)]">Find: </span>
        <span className="text-4xl">{targetSymbol}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {grid.map((symbol, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(symbol)}
            className="w-20 h-20 bg-[var(--fill-tertiary)] rounded-xl flex items-center justify-center text-3xl hover:bg-[var(--fill-secondary)] transition-colors"
          >
            {symbol}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function TimedTask({ question, onComplete }: TimedTaskProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleScore = (correct: boolean) => {
    if (correct) {
      setScore((s) => s + 1);
    }
    setAttempts((a) => a + 1);
  };

  const handleTimeUp = () => {
    setIsFinished(true);
    // Calculate score as percentage, weighted by accuracy and speed
    const accuracy = attempts > 0 ? (score / attempts) * 100 : 0;
    const speedBonus = Math.min(attempts, 20) * 2; // Bonus for more attempts
    const finalScore = Math.round((accuracy * 0.7) + (speedBonus * 0.3));
    onComplete(finalScore);
  };

  const getTaskComponent = () => {
    switch (question.id) {
      case 'PS1':
        return <NumberComparisonTask onScore={handleScore} />;
      case 'PS3':
        return <StroopTask onScore={handleScore} />;
      case 'PS2':
      case 'PS4':
      default:
        return <SymbolMatchTask onScore={handleScore} />;
    }
  };

  if (!isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-[28px] max-w-lg mx-auto text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">{question.question}</h2>
        <p className="text-[var(--label-secondary)] mb-6">
          You have {question.timeLimit} seconds. Complete as many as you can!
        </p>
        <Button onClick={() => setIsStarted(true)} size="lg">
          Start Task
        </Button>
      </motion.div>
    );
  }

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-[28px] max-w-lg mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-6xl mb-4"
        >
          ⏱️
        </motion.div>
        <h2 className="text-2xl font-semibold mb-2">Time&apos;s Up!</h2>
        <p className="text-[var(--label-secondary)]">
          You completed {score} out of {attempts} correctly
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 rounded-[28px] max-w-2xl mx-auto"
    >
      {/* Header with timer and score */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="text-sm text-[var(--label-secondary)]">
            Score: <span className="font-bold text-[var(--color-success)]">{score}</span>
          </div>
          <div className="text-sm text-[var(--label-secondary)]">
            Attempts: <span className="font-bold">{attempts}</span>
          </div>
        </div>
        <Timer
          duration={question.timeLimit || 30}
          onComplete={handleTimeUp}
          size="lg"
        />
      </div>

      {/* Task */}
      <AnimatePresence mode="wait">
        {getTaskComponent()}
      </AnimatePresence>
    </motion.div>
  );
}
