'use client';

import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'gradient' | 'success';
  className?: string;
}

export default function Progress({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  variant = 'default',
  className = ''
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const variants = {
    default: 'bg-[var(--color-primary)]',
    gradient: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-teal)]',
    success: 'bg-[var(--color-success)]'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-[var(--label-secondary)]">Progress</span>
          <span className="font-medium text-[var(--label-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`w-full ${sizes[size]} bg-[var(--fill-tertiary)] rounded-full overflow-hidden`}
      >
        <motion.div
          className={`h-full ${variants[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        />
      </div>
    </div>
  );
}
