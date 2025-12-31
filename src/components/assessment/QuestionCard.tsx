'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types';
import { Timer } from '@/components/ui';
import AnswerOption from './AnswerOption';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string, isCorrect: boolean) => void;
  showExplanation?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showExplanation = false
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (optionId: string) => {
    if (selectedAnswer || isRevealed) return;

    setSelectedAnswer(optionId);
    const option = question.options?.find((o) => o.id === optionId);
    const isCorrect = option?.correct || false;

    if (showExplanation) {
      setIsRevealed(true);
      // Delay before moving to next question
      setTimeout(() => {
        onAnswer(optionId, isCorrect);
      }, 2000);
    } else {
      onAnswer(optionId, isCorrect);
    }
  };

  const handleTimeUp = () => {
    if (!selectedAnswer) {
      onAnswer('', false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass p-6 sm:p-8 rounded-[28px] max-w-2xl w-full mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[var(--label-secondary)]">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.timeLimit && (
          <Timer
            duration={question.timeLimit}
            onComplete={handleTimeUp}
            size="md"
          />
        )}
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-semibold text-[var(--label-primary)] tracking-tight mb-8">
        {question.question}
      </h2>

      {/* Options */}
      {question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={option.id}
              option={option}
              isSelected={selectedAnswer === option.id}
              isRevealed={isRevealed}
              onClick={() => handleSelect(option.id)}
              disabled={!!selectedAnswer}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Explanation */}
      {isRevealed && showExplanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-[var(--fill-quaternary)] rounded-xl"
        >
          <p className="text-sm text-[var(--label-secondary)]">
            <span className="font-semibold text-[var(--label-primary)]">
              Explanation:{' '}
            </span>
            {question.explanation}
          </p>
        </motion.div>
      )}

      {/* Difficulty indicator */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-xs text-[var(--label-tertiary)]">Difficulty:</span>
        <div className="flex gap-1">
          {['easy', 'medium', 'hard'].map((level, i) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                i <=
                ['easy', 'medium', 'hard'].indexOf(question.difficulty)
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[var(--fill-secondary)]'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
