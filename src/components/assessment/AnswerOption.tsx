'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { QuestionOption } from '@/types';

interface AnswerOptionProps {
  option: QuestionOption;
  isSelected: boolean;
  isRevealed?: boolean;
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

export default function AnswerOption({
  option,
  isSelected,
  isRevealed = false,
  onClick,
  disabled = false,
  index
}: AnswerOptionProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getBackgroundClass = () => {
    if (isRevealed) {
      if (option.correct) {
        return 'bg-[var(--color-success)]/10 border-[var(--color-success)]';
      }
      if (isSelected && !option.correct) {
        return 'bg-[var(--color-error)]/10 border-[var(--color-error)]';
      }
    }
    if (isSelected) {
      return 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]';
    }
    return 'bg-[var(--fill-quaternary)] border-transparent hover:bg-[var(--fill-tertiary)] hover:border-[var(--fill-secondary)]';
  };

  const getTextClass = () => {
    if (isRevealed && option.correct) {
      return 'text-[var(--color-success)]';
    }
    if (isRevealed && isSelected && !option.correct) {
      return 'text-[var(--color-error)]';
    }
    if (isSelected) {
      return 'text-[var(--color-primary)]';
    }
    return 'text-[var(--label-primary)]';
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200
        flex items-center gap-4 text-left
        ${getBackgroundClass()}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      {/* Letter indicator */}
      <div
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm
          ${isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--fill-secondary)] text-[var(--label-secondary)]'}
          ${isRevealed && option.correct ? 'bg-[var(--color-success)] text-white' : ''}
          ${isRevealed && isSelected && !option.correct ? 'bg-[var(--color-error)] text-white' : ''}
        `}
      >
        {isRevealed && option.correct ? (
          <Check className="w-4 h-4" />
        ) : (
          letters[index]
        )}
      </div>

      {/* Option text */}
      <span className={`flex-1 font-medium ${getTextClass()}`}>
        {option.text}
      </span>

      {/* Selection indicator */}
      {isSelected && !isRevealed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}
