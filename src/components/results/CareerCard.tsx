'use client';

import { motion } from 'framer-motion';
import { TrendingUp, GraduationCap, DollarSign, ChevronRight } from 'lucide-react';
import { CareerMatch } from '@/types';

interface CareerCardProps {
  careerMatch: CareerMatch;
  rank: number;
  showDetails?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}

export default function CareerCard({
  careerMatch,
  rank,
  showDetails = false,
  isLocked = false,
  onClick
}: CareerCardProps) {
  const { career, matchScore } = careerMatch;

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'var(--color-success)';
    if (score >= 70) return 'var(--color-primary)';
    if (score >= 55) return 'var(--color-warning)';
    return 'var(--label-secondary)';
  };

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-subtle p-4 rounded-xl opacity-60"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--fill-secondary)] flex items-center justify-center">
            <span className="font-bold text-[var(--label-tertiary)]">#{rank}</span>
          </div>
          <div className="flex-1">
            <div className="h-4 bg-[var(--fill-secondary)] rounded w-32 mb-2" />
            <div className="h-3 bg-[var(--fill-tertiary)] rounded w-24" />
          </div>
          <div className="h-6 w-12 bg-[var(--fill-secondary)] rounded" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      onClick={onClick}
      className={`glass p-4 sm:p-5 rounded-xl ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Rank */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: `${getMatchColor(matchScore)}15`
          }}
        >
          <span
            className="font-bold text-lg sm:text-xl"
            style={{ color: getMatchColor(matchScore) }}
          >
            #{rank}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-[var(--label-primary)] text-lg">
                {career.title}
              </h3>
              <p className="text-sm text-[var(--label-secondary)]">
                {career.category}
              </p>
            </div>
            <div
              className="flex items-center gap-1 px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${getMatchColor(matchScore)}15`
              }}
            >
              <span
                className="font-mono font-bold"
                style={{ color: getMatchColor(matchScore) }}
              >
                {matchScore}%
              </span>
            </div>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-[var(--fill-tertiary)]"
            >
              <p className="text-sm text-[var(--label-secondary)] mb-4">
                {career.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[var(--color-success)]" />
                  <span className="text-sm">{career.avgSalary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                  <span className="text-sm">{career.growth}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--color-purple)]" />
                  <span className="text-sm">{career.education}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {onClick && (
          <ChevronRight className="w-5 h-5 text-[var(--label-tertiary)] flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );
}
