'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui';

interface InterstitialScreenProps {
  progress: number; // 25, 50, 75, or 100
  onContinue: () => void;
}

const INTERSTITIAL_CONTENT = {
  25: {
    icon: Brain,
    title: 'Great start!',
    message:
      "Your verbal patterns are emerging. Most people score between 40-60 on verbal reasoning. Let's see where you land...",
    color: 'var(--color-primary)'
  },
  50: {
    icon: Sparkles,
    title: 'Halfway there!',
    message:
      "We're seeing something interesting in your spatial abilities. Only 12% of people show this combination of strengths. Keep going—the best insights are still ahead.",
    color: 'var(--color-purple)'
  },
  75: {
    icon: Target,
    title: 'Almost done!',
    message:
      "Your profile is becoming clear. We've identified 3 surprising career matches you probably haven't considered. Just a few more questions to finalize your results...",
    color: 'var(--color-success)'
  },
  100: {
    icon: Trophy,
    title: 'Assessment Complete!',
    message:
      'Excellent work! Your cognitive profile is ready. Get ready to discover careers that perfectly match your unique combination of aptitudes.',
    color: 'var(--color-warning)'
  }
};

export default function InterstitialScreen({
  progress,
  onContinue
}: InterstitialScreenProps) {
  const content = INTERSTITIAL_CONTENT[progress as keyof typeof INTERSTITIAL_CONTENT];
  const Icon = content.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[var(--bg-primary)] z-50 flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full text-center">
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="mb-8"
        >
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${content.color}20` }}
          >
            <Icon
              className="w-12 h-12"
              style={{ color: content.color }}
            />
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {[25, 50, 75, 100].map((step) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + step * 0.01 }}
                className={`w-3 h-3 rounded-full ${
                  step <= progress
                    ? 'bg-[var(--color-primary)]'
                    : 'bg-[var(--fill-secondary)]'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium" style={{ color: content.color }}>
            {progress}% Complete
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-title-medium text-[var(--label-primary)] mb-4"
        >
          {content.title}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-body text-[var(--label-secondary)] mb-8"
        >
          {content.message}
        </motion.p>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button onClick={onContinue} size="lg">
            {progress === 100 ? 'See My Results' : 'Continue'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
