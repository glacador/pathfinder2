'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { AptitudeRadar, Paywall, ScoreReveal } from '@/components/results';
import { useAssessment } from '@/contexts/AssessmentContext';
import { AptitudeId, CareerMatch, FamousMind } from '@/types';
import { findFamousMindMatch, generateCognitiveProfileSummary } from '@/data/careers';

interface StoredResults {
  results: {
    aptitudeScores: Record<AptitudeId, number>;
    userName: string;
  };
  careerMatches: CareerMatch[];
  famousMind: FamousMind;
  cognitiveProfile: string;
  topStrengths: AptitudeId[];
  developmentAreas: AptitudeId[];
}

export default function ResultsPage() {
  const router = useRouter();
  const { results, careerMatches, setPurchasedTier, purchasedTier } = useAssessment();

  const [showScoreReveal, setShowScoreReveal] = useState(true);
  const [storedData, setStoredData] = useState<StoredResults | null>(null);

  // Try to load from localStorage if context is empty
  useEffect(() => {
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
  }, [results, router]);

  const aptitudeScores = results?.aptitudeScores || storedData?.results?.aptitudeScores;
  const matches = careerMatches.length > 0 ? careerMatches : storedData?.careerMatches || [];
  const userName = results?.userName || storedData?.results?.userName || 'User';

  const famousMind = aptitudeScores
    ? findFamousMindMatch(aptitudeScores)
    : storedData?.famousMind;
  const cognitiveProfile = aptitudeScores
    ? generateCognitiveProfileSummary(aptitudeScores)
    : storedData?.cognitiveProfile;

  const handleSelectTier = (tier: 'essential' | 'complete' | 'professional') => {
    setPurchasedTier(tier);
    router.push('/checkout?tier=' + tier);
  };

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

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Header */}
      <header className="bg-[var(--bg-primary)] border-b border-[var(--fill-quaternary)]">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-[var(--label-primary)]">
                  PathFinder Results
                </h1>
                <p className="text-sm text-[var(--label-secondary)]">
                  for {userName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Score Reveal Animation */}
        {showScoreReveal && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8"
          >
            <ScoreReveal
              scores={aptitudeScores}
              onComplete={() => {
                setTimeout(() => setShowScoreReveal(false), 1500);
              }}
            />
          </motion.div>
        )}

        {/* Main Results Section (after reveal) */}
        {!showScoreReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Radar Chart */}
              <Card variant="glass" className="p-6">
                <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4 text-center">
                  Your Aptitude Profile
                </h2>
                <AptitudeRadar scores={aptitudeScores} size="lg" />
              </Card>

              {/* Right Column - Famous Mind Match */}
              <Card variant="glass" className="p-6">
                <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4">
                  You Think Like...
                </h2>
                {famousMind && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center text-4xl"
                    >
                      {famousMind.name[0]}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[var(--label-primary)] mb-1">
                      {famousMind.name}
                    </h3>
                    <p className="text-[var(--color-primary)] font-medium mb-3">
                      {famousMind.title}
                    </p>
                    <p className="text-[var(--label-secondary)]">
                      {famousMind.description}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Cognitive Profile Summary */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4">
                Cognitive Profile Summary
              </h2>
              <p className="text-[var(--label-secondary)] leading-relaxed">
                {cognitiveProfile}
              </p>
            </Card>

            {/* Paywall Section */}
            <Paywall
              topCareers={matches}
              aptitudeScores={aptitudeScores}
              onSelectTier={handleSelectTier}
            />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-[var(--label-tertiary)]">
          Results generated on {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  );
}
