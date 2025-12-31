'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APTITUDES } from '@/data/aptitudes';
import { AptitudeId } from '@/types';
import { getIcon } from '@/lib/icons';

interface ScoreRevealProps {
  scores: Record<AptitudeId, number>;
  onComplete?: () => void;
}

export default function ScoreReveal({ scores, onComplete }: ScoreRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Sort aptitudes by score descending
  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
  );

  useEffect(() => {
    if (currentIndex < sortedAptitudes.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, sortedAptitudes.length, onComplete]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--color-success)';
    if (score >= 60) return 'var(--color-primary)';
    if (score >= 40) return 'var(--color-warning)';
    return 'var(--label-secondary)';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-center mb-8 text-[var(--label-primary)]"
      >
        Your Aptitude Profile
      </motion.h2>

      <div className="space-y-3">
        {sortedAptitudes.map((aptitude, index) => {
          const score = scores[aptitude.id] || 0;
          const isRevealed = index < currentIndex;
          const IconComponent = getIcon(aptitude.icon);

          return (
            <motion.div
              key={aptitude.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isRevealed ? 1 : 0.3,
                x: isRevealed ? 0 : -20
              }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${aptitude.color}20` }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: aptitude.color }}
                  />
                </div>

                {/* Name and bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--label-primary)]">
                      {aptitude.name}
                    </span>
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="font-mono font-bold"
                          style={{ color: getScoreColor(score) }}
                        >
                          {score}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-[var(--fill-tertiary)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: aptitude.color }}
                      initial={{ width: 0 }}
                      animate={{ width: isRevealed ? `${score}%` : 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[var(--label-secondary)]">
            Your top strength:{' '}
            <span className="font-semibold text-[var(--color-primary)]">
              {sortedAptitudes[0]?.name}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
