'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Brain,
  Star
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { AptitudeRadar, CareerCard } from '@/components/results';
import ReportHeader from '@/components/report/ReportHeader';
import { useAssessment } from '@/contexts/AssessmentContext';
import { APTITUDES } from '@/data/aptitudes';
import { findFamousMindMatch, generateCognitiveProfileSummary } from '@/data/careers';
import { AptitudeId, CareerMatch, FamousMind } from '@/types';
import { getIcon } from '@/lib/icons';

interface StoredResults {
  results: {
    aptitudeScores: Record<AptitudeId, number>;
    percentiles: Record<AptitudeId, number>;
    userName: string;
  };
  careerMatches: CareerMatch[];
  famousMind: FamousMind;
  cognitiveProfile: string;
  topStrengths: AptitudeId[];
  developmentAreas: AptitudeId[];
}

export default function EssentialReportPage() {
  const router = useRouter();
  const { results, careerMatches, purchasedTier } = useAssessment();
  const [storedData, setStoredData] = useState<StoredResults | null>(null);

  useEffect(() => {
    // Check if user has purchased this tier
    const tier = localStorage.getItem('pathfinder_tier');
    if (!tier) {
      router.push('/results');
      return;
    }

    // Load stored results
    if (!results) {
      try {
        const stored = localStorage.getItem('pathfinder_results');
        if (stored) {
          setStoredData(JSON.parse(stored));
        } else {
          router.push('/');
        }
      } catch {
        router.push('/');
      }
    }
  }, [results, router, purchasedTier]);

  const aptitudeScores = results?.aptitudeScores || storedData?.results?.aptitudeScores;
  const percentiles = results?.percentiles || storedData?.results?.percentiles;
  const matches = careerMatches.length > 0 ? careerMatches : storedData?.careerMatches || [];
  const userName = results?.userName || storedData?.results?.userName || 'User';

  const famousMind = aptitudeScores
    ? findFamousMindMatch(aptitudeScores)
    : storedData?.famousMind;
  const cognitiveProfile = aptitudeScores
    ? generateCognitiveProfileSummary(aptitudeScores)
    : storedData?.cognitiveProfile;

  if (!aptitudeScores) {
    return (
      <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Sort aptitudes for display
  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (aptitudeScores[b.id] || 0) - (aptitudeScores[a.id] || 0)
  );
  const topStrengths = sortedAptitudes.slice(0, 3);
  const developmentAreas = sortedAptitudes.slice(-2);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Report Header */}
        <ReportHeader
          userName={userName}
          tier="essential"
          generatedAt={new Date()}
          onDownload={() => alert('PDF download would start here')}
        />

        {/* Cognitive Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-3">
                  Your Cognitive Profile
                </h2>
                <p className="text-[var(--label-secondary)] leading-relaxed">
                  {cognitiveProfile}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Aptitude Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" className="p-6 h-full">
              <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4 text-center">
                Aptitude Profile
              </h2>
              <AptitudeRadar scores={aptitudeScores} size="lg" />
            </Card>
          </motion.div>

          {/* Famous Mind Match */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="glass" className="p-6 h-full">
              <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4">
                You Think Like...
              </h2>
              {famousMind && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center text-4xl font-bold text-white"
                  >
                    {famousMind.name[0]}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--label-primary)] mb-1">
                    {famousMind.name}
                  </h3>
                  <p className="text-[var(--color-primary)] font-medium mb-4">
                    {famousMind.title}
                  </p>
                  <p className="text-[var(--label-secondary)]">
                    {famousMind.description}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Strengths and Development Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
                <h3 className="text-lg font-semibold text-[var(--label-primary)]">
                  Top Strengths
                </h3>
              </div>
              <div className="space-y-3">
                {topStrengths.map((apt, i) => {
                  const IconComponent = getIcon(apt.icon);
                  const score = aptitudeScores[apt.id] || 0;
                  const percentile = percentiles?.[apt.id] || 50;

                  return (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${apt.color}20` }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: apt.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[var(--label-primary)]">
                            {apt.name}
                          </span>
                          <span className="font-mono font-bold text-[var(--color-success)]">
                            {score}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--label-tertiary)]">
                          Top {100 - percentile}% of test takers
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Development Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-[var(--color-warning)]" />
                <h3 className="text-lg font-semibold text-[var(--label-primary)]">
                  Growth Opportunities
                </h3>
              </div>
              <div className="space-y-3">
                {developmentAreas.map((apt) => {
                  const IconComponent = getIcon(apt.icon);
                  const score = aptitudeScores[apt.id] || 0;

                  return (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${apt.color}20` }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: apt.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-[var(--label-primary)]">
                          {apt.name}
                        </span>
                        <p className="text-xs text-[var(--label-tertiary)]">
                          {apt.description}
                        </p>
                      </div>
                      <span className="font-mono text-[var(--label-secondary)]">
                        {score}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-[var(--label-tertiary)]">
                These aren&apos;t weaknesses—they&apos;re areas where targeted development
                could expand your career options.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* All Aptitude Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-6">
              Complete Aptitude Breakdown
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAptitudes.map((apt) => {
                const IconComponent = getIcon(apt.icon);
                const score = aptitudeScores[apt.id] || 0;
                const percentile = percentiles?.[apt.id] || 50;

                return (
                  <div
                    key={apt.id}
                    className="p-4 bg-[var(--fill-quaternary)] rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${apt.color}20` }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: apt.color }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[var(--label-primary)]">
                          {apt.shortName}
                        </h4>
                        <span className="text-xs text-[var(--label-tertiary)]">
                          {percentile}th percentile
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[var(--fill-tertiary)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: apt.color }}
                        />
                      </div>
                      <span className="font-mono font-bold text-sm" style={{ color: apt.color }}>
                        {score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Top 10 Career Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-[var(--color-warning)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Top 10 Career Matches
              </h2>
            </div>
            <div className="space-y-4">
              {matches.slice(0, 10).map((match, i) => (
                <CareerCard
                  key={match.career.id}
                  careerMatch={match}
                  rank={i + 1}
                  showDetails={i < 3}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card variant="elevated" className="p-6 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-[var(--color-primary)]" />
            <h3 className="text-xl font-semibold text-[var(--label-primary)] mb-2">
              Want More Detailed Insights?
            </h3>
            <p className="text-[var(--label-secondary)] mb-6 max-w-lg mx-auto">
              Upgrade to Complete Roadmap for salary data, education paths, skills gap
              analysis, and a 90-day action plan.
            </p>
            <Button variant="glass" onClick={() => router.push('/checkout?tier=complete')}>
              Upgrade to Complete ($59.99)
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
