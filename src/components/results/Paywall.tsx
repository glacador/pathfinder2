'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, Sparkles, BarChart3, Target, Calendar } from 'lucide-react';
import { CareerMatch, AptitudeId } from '@/types';
import CareerCard from './CareerCard';
import TierSelector from './TierSelector';

interface PaywallProps {
  topCareers: CareerMatch[];
  aptitudeScores: Record<AptitudeId, number>;
  onSelectTier: (tier: 'essential' | 'complete' | 'professional') => void;
}

export default function Paywall({
  topCareers,
  onSelectTier
}: PaywallProps) {
  // Show top 3 careers free, blur the rest
  const freePreview = topCareers.slice(0, 3);
  const lockedCount = Math.max(0, topCareers.length - 3);

  return (
    <div className="space-y-8">
      {/* Free Preview Section */}
      <div className="glass p-6 rounded-[28px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--label-primary)]">
            Your Top Career Matches
          </h2>
          <span className="text-sm text-[var(--color-success)] font-medium">
            Free Preview
          </span>
        </div>

        {/* Show top 3 free */}
        <div className="space-y-3 mb-4">
          {freePreview.map((match, i) => (
            <CareerCard
              key={match.career.id}
              careerMatch={match}
              rank={i + 1}
              showDetails={i === 0}
            />
          ))}
        </div>

        {/* Blurred preview of more */}
        <div className="relative mt-6">
          <div className="space-y-3 blur-sm opacity-40 pointer-events-none">
            {[4, 5, 6].map((rank) => (
              <div
                key={rank}
                className="glass-subtle p-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--fill-secondary)] flex items-center justify-center">
                    <span className="font-bold text-[var(--label-tertiary)]">
                      #{rank}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-[var(--fill-secondary)] rounded w-40 mb-2" />
                    <div className="h-3 bg-[var(--fill-tertiary)] rounded w-24" />
                  </div>
                  <div className="h-6 w-12 bg-[var(--fill-secondary)] rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] rounded-full shadow-lg border border-[var(--fill-secondary)]"
            >
              <Lock className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--label-primary)]">
                +{lockedCount} more careers in full report
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What's Locked */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 rounded-[28px]"
      >
        <div className="text-center mb-6">
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-[var(--color-primary)]" />
          <h3 className="text-xl font-semibold text-[var(--label-primary)] mb-2">
            Unlock Your Complete Career Roadmap
          </h3>
          <p className="text-[var(--label-secondary)]">
            Your assessment data is ready. Get the full insights.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl">
            <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-[var(--label-primary)]">Full aptitude breakdown</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl">
            <Target className="w-5 h-5 text-[var(--color-success)]" />
            <span className="text-[var(--label-primary)]">Salary & growth data</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl">
            <Lock className="w-5 h-5 text-[var(--color-purple)]" />
            <span className="text-[var(--label-primary)]">Skills gap analysis</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl">
            <Calendar className="w-5 h-5 text-[var(--color-warning)]" />
            <span className="text-[var(--label-primary)]">90-day action plan</span>
          </div>
        </div>
      </motion.div>

      {/* Tier Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TierSelector onSelectTier={onSelectTier} />
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--label-tertiary)]"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Trusted by 50,000+ users</span>
        </div>
      </motion.div>
    </div>
  );
}
