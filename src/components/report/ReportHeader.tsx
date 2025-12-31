'use client';

import { motion } from 'framer-motion';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { ReportTier } from '@/types';

interface ReportHeaderProps {
  userName: string;
  tier: ReportTier;
  generatedAt: Date;
  onDownload?: () => void;
  onShare?: () => void;
}

const TIER_LABELS = {
  essential: 'Essential Report',
  complete: 'Complete Roadmap',
  professional: 'Professional Accelerator'
};

const TIER_COLORS = {
  essential: 'from-[var(--color-primary)] to-[var(--color-teal)]',
  complete: 'from-[var(--color-purple)] to-[var(--color-primary)]',
  professional: 'from-[var(--color-warning)] to-[var(--color-error)]'
};

export default function ReportHeader({
  userName,
  tier,
  generatedAt,
  onDownload,
  onShare
}: ReportHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[28px] mb-8"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${TIER_COLORS[tier]} opacity-10`}
      />

      <div className="relative glass p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${TIER_COLORS[tier]} flex items-center justify-center`}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${TIER_COLORS[tier]} text-white`}
                >
                  {TIER_LABELS[tier].toUpperCase()}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--label-primary)]">
                {userName}&apos;s Career Assessment
              </h1>
              <p className="text-sm text-[var(--label-secondary)]">
                Generated {generatedAt.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Share
              </Button>
            )}
            {onDownload && (
              <Button
                variant="primary"
                size="sm"
                onClick={onDownload}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
