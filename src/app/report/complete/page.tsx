'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  DollarSign,
  GraduationCap,
  Target,
  Calendar,
  BookOpen,
  Sparkles,
  Brain,
  CheckCircle
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { AptitudeRadar, CareerCard } from '@/components/results';
import ReportHeader from '@/components/report/ReportHeader';
import { useAssessment } from '@/contexts/AssessmentContext';
import { APTITUDES } from '@/data/aptitudes';
import { findFamousMindMatch, generateCognitiveProfileSummary, getSalaryData } from '@/data/careers';
import { AptitudeId, CareerMatch, FamousMind } from '@/types';

interface StoredResults {
  results: {
    aptitudeScores: Record<AptitudeId, number>;
    percentiles: Record<AptitudeId, number>;
    userName: string;
  };
  careerMatches: CareerMatch[];
  famousMind: FamousMind;
  cognitiveProfile: string;
}

export default function CompleteReportPage() {
  const router = useRouter();
  const { results, careerMatches } = useAssessment();
  const [storedData, setStoredData] = useState<StoredResults | null>(null);

  useEffect(() => {
    const tier = localStorage.getItem('pathfinder_tier');
    if (!tier || tier === 'essential') {
      router.push('/results');
      return;
    }

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

  const famousMind = aptitudeScores ? findFamousMindMatch(aptitudeScores) : storedData?.famousMind;
  const cognitiveProfile = aptitudeScores ? generateCognitiveProfileSummary(aptitudeScores) : storedData?.cognitiveProfile;

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

  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (aptitudeScores[b.id] || 0) - (aptitudeScores[a.id] || 0)
  );
  const topStrengths = sortedAptitudes.slice(0, 3);

  // Generate 90-day action plan
  const actionPlan = {
    week1_2: [
      'Research your top 3 career matches in depth',
      'Update your resume with skills keywords from this report',
      'Set up job alerts on LinkedIn and Indeed for target roles'
    ],
    week3_4: [
      'Reach out to 5 professionals in your target field',
      'Identify 2-3 skills gaps to address',
      'Enroll in one relevant online course'
    ],
    month2: [
      'Complete your first certification or course',
      'Apply to 10 positions aligned with your profile',
      'Practice interviewing with a friend or mentor'
    ],
    month3: [
      'Follow up on all applications',
      'Expand your network by attending industry events',
      'Refine your approach based on feedback'
    ]
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ReportHeader
          userName={userName}
          tier="complete"
          generatedAt={new Date()}
          onDownload={() => alert('PDF download would start here')}
        />

        {/* Cognitive Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-purple)]/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[var(--color-purple)]" />
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

        {/* Radar and Famous Mind */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4 text-center">
              Aptitude Profile
            </h2>
            <AptitudeRadar scores={aptitudeScores} size="lg" />
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-4">
              You Think Like...
            </h2>
            {famousMind && (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-primary)] flex items-center justify-center text-3xl font-bold text-white">
                  {famousMind.name[0]}
                </div>
                <h3 className="text-xl font-bold text-[var(--label-primary)] mb-1">
                  {famousMind.name}
                </h3>
                <p className="text-[var(--color-primary)] font-medium mb-3">
                  {famousMind.title}
                </p>
                <p className="text-sm text-[var(--label-secondary)]">
                  {famousMind.description}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Top 25 Career Matches with Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-[var(--color-success)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Top 25 Career Matches with Details
              </h2>
            </div>
            <div className="space-y-6">
              {matches.slice(0, 25).map((match, i) => {
                const salaryData = getSalaryData(match.career.id);
                return (
                  <div key={match.career.id} className="border-b border-[var(--fill-tertiary)] pb-6 last:border-0">
                    <CareerCard careerMatch={match} rank={i + 1} showDetails />

                    {/* Extended Details */}
                    <div className="mt-4 grid sm:grid-cols-3 gap-4 ml-14">
                      <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-[var(--color-success)]" />
                          <span className="text-sm font-medium text-[var(--label-primary)]">
                            Salary Range
                          </span>
                        </div>
                        <p className="text-sm text-[var(--label-secondary)]">
                          ${(salaryData.min / 1000).toFixed(0)}K - ${(salaryData.max / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-[var(--label-tertiary)]">
                          Median: ${(salaryData.median / 1000).toFixed(0)}K
                        </p>
                      </div>

                      <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                          <span className="text-sm font-medium text-[var(--label-primary)]">
                            Growth Outlook
                          </span>
                        </div>
                        <p className="text-sm text-[var(--label-secondary)]">
                          {match.career.growth}
                        </p>
                      </div>

                      <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap className="w-4 h-4 text-[var(--color-purple)]" />
                          <span className="text-sm font-medium text-[var(--label-primary)]">
                            Education
                          </span>
                        </div>
                        <p className="text-sm text-[var(--label-secondary)]">
                          {match.career.education}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Skills Gap Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-[var(--color-warning)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Skills Gap Analysis
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {topStrengths.map((apt) => (
                <div key={apt.id} className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--label-primary)]">
                      {apt.name}
                    </span>
                    <span className="text-xs px-2 py-1 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full">
                      Strong
                    </span>
                  </div>
                  <p className="text-sm text-[var(--label-secondary)]">
                    Continue leveraging this strength. Consider roles that emphasize {apt.predicts.slice(0, 2).join(' and ')}.
                  </p>
                </div>
              ))}
              {sortedAptitudes.slice(-2).map((apt) => (
                <div key={apt.id} className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--label-primary)]">
                      {apt.name}
                    </span>
                    <span className="text-xs px-2 py-1 bg-[var(--color-warning)]/10 text-[var(--color-warning)] rounded-full">
                      Developing
                    </span>
                  </div>
                  <p className="text-sm text-[var(--label-secondary)]">
                    Consider targeted practice or courses to strengthen this area if needed for your target career.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 90-Day Action Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                90-Day Action Plan
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[var(--label-primary)] mb-3">
                  Weeks 1-2
                </h4>
                <ul className="space-y-2">
                  {actionPlan.week1_2.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--label-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--label-primary)] mb-3">
                  Weeks 3-4
                </h4>
                <ul className="space-y-2">
                  {actionPlan.week3_4.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--label-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--label-primary)] mb-3">
                  Month 2
                </h4>
                <ul className="space-y-2">
                  {actionPlan.month2.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--label-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--label-primary)] mb-3">
                  Month 3
                </h4>
                <ul className="space-y-2">
                  {actionPlan.month3.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--label-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recommended Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[var(--color-indigo)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Recommended Resources
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                <span className="text-xs font-semibold text-[var(--color-primary)]">COURSE</span>
                <h4 className="font-medium text-[var(--label-primary)] mt-1">
                  LinkedIn Learning
                </h4>
                <p className="text-sm text-[var(--label-secondary)] mt-1">
                  Professional development courses aligned with your top career matches
                </p>
              </div>
              <div className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                <span className="text-xs font-semibold text-[var(--color-success)]">CERTIFICATION</span>
                <h4 className="font-medium text-[var(--label-primary)] mt-1">
                  Industry Certifications
                </h4>
                <p className="text-sm text-[var(--label-secondary)] mt-1">
                  Credentials that can boost your credibility in target roles
                </p>
              </div>
              <div className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                <span className="text-xs font-semibold text-[var(--color-purple)]">BOOK</span>
                <h4 className="font-medium text-[var(--label-primary)] mt-1">
                  Career Development Books
                </h4>
                <p className="text-sm text-[var(--label-secondary)] mt-1">
                  Recommended reading based on your cognitive profile
                </p>
              </div>
              <div className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                <span className="text-xs font-semibold text-[var(--color-warning)]">WEBSITE</span>
                <h4 className="font-medium text-[var(--label-primary)] mt-1">
                  Industry Job Boards
                </h4>
                <p className="text-sm text-[var(--label-secondary)] mt-1">
                  Specialized job boards for your target industries
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="elevated" className="p-6 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-[var(--color-warning)]" />
            <h3 className="text-xl font-semibold text-[var(--label-primary)] mb-2">
              Ready to Accelerate Your Career?
            </h3>
            <p className="text-[var(--label-secondary)] mb-6 max-w-lg mx-auto">
              Upgrade to Professional Accelerator for resume templates, interview prep,
              salary negotiation scripts, and networking outreach templates.
            </p>
            <Button variant="glass" onClick={() => router.push('/checkout?tier=professional')}>
              Upgrade to Professional ($99.99)
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
