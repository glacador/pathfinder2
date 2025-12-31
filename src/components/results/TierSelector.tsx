'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { ReportTier } from '@/types';

interface TierSelectorProps {
  onSelectTier: (tier: ReportTier) => void;
  selectedTier?: ReportTier;
}

const TIERS = [
  {
    id: 'essential' as ReportTier,
    name: 'Essential Report',
    price: 29.99,
    icon: Star,
    features: [
      'Complete aptitude scores (12 dimensions)',
      'Top 10 career matches',
      'Cognitive profile summary',
      'Strengths & blindspots',
      '"You think like..." famous mind',
      '15-page PDF report',
      'Shareable results card'
    ],
    cta: 'Get Essential'
  },
  {
    id: 'complete' as ReportTier,
    name: 'Complete Roadmap',
    price: 59.99,
    icon: Zap,
    popular: true,
    features: [
      'Everything in Essential, plus:',
      'Top 25 career matches',
      'Salary data for each career',
      'Growth outlook & job availability',
      'Education requirements',
      'Skills gap analysis',
      '90-day action plan',
      'Recommended courses',
      '45+ page PDF report'
    ],
    cta: 'Get Complete'
  },
  {
    id: 'professional' as ReportTier,
    name: 'Professional Accelerator',
    price: 99.99,
    icon: Crown,
    features: [
      'Everything in Complete, plus:',
      'Resume bullets for top 5 careers',
      'LinkedIn optimization templates',
      'Cover letter frameworks',
      'Interview questions & answers',
      'Salary negotiation scripts',
      'Networking outreach templates',
      '75+ page PDF report',
      'Editable Word templates'
    ],
    cta: 'Get Professional'
  }
];

export default function TierSelector({
  onSelectTier,
  selectedTier
}: TierSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {TIERS.map((tier, index) => {
        const Icon = tier.icon;
        const isSelected = selectedTier === tier.id;

        return (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              glass p-6 rounded-[28px] relative
              ${tier.popular ? 'ring-2 ring-[var(--color-primary)]' : ''}
              ${isSelected ? 'ring-2 ring-[var(--color-success)]' : ''}
            `}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <div className="text-center mb-6">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: tier.popular
                    ? 'var(--color-primary)'
                    : 'var(--fill-tertiary)'
                }}
              >
                <Icon
                  className={`w-7 h-7 ${
                    tier.popular
                      ? 'text-white'
                      : 'text-[var(--label-primary)]'
                  }`}
                />
              </div>
              <h3 className="text-lg font-semibold text-[var(--label-primary)]">
                {tier.name}
              </h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-[var(--label-primary)]">
                  ${tier.price}
                </span>
                <span className="text-sm text-[var(--label-secondary)]">
                  {' '}
                  one-time
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      i === 0 && tier.id !== 'essential'
                        ? 'text-[var(--label-tertiary)]'
                        : 'text-[var(--color-success)]'
                    }`}
                  />
                  <span
                    className={
                      i === 0 && tier.id !== 'essential'
                        ? 'text-[var(--label-secondary)] italic'
                        : 'text-[var(--label-primary)]'
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelectTier(tier.id)}
              className="w-full py-3.5 font-semibold glass-button-component"
            >
              {tier.cta}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
