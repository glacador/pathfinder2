'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  Check,
  Sparkles
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ReportTier } from '@/types';

const TIER_DETAILS = {
  essential: {
    name: 'Essential Report',
    price: 29.99,
    features: [
      'Complete aptitude scores (12 dimensions)',
      'Top 10 career matches',
      'Cognitive profile summary',
      'Strengths & blindspots analysis',
      '"You think like..." famous mind match',
      '15-page downloadable PDF report',
      'Shareable results card'
    ]
  },
  complete: {
    name: 'Complete Roadmap',
    price: 59.99,
    features: [
      'Everything in Essential, plus:',
      'Top 25 career matches with detailed profiles',
      'Salary data and growth outlook for each career',
      'Education requirements and certifications',
      'Skills gap analysis',
      '90-day personalized action plan',
      'Recommended courses and resources',
      '45+ page comprehensive PDF report'
    ]
  },
  professional: {
    name: 'Professional Accelerator',
    price: 99.99,
    features: [
      'Everything in Complete, plus:',
      'Resume bullets customized for top 5 careers',
      'LinkedIn profile optimization templates',
      'Cover letter frameworks for each target role',
      'Interview questions with sample answers',
      'Salary negotiation scripts',
      'Networking outreach templates',
      '75+ page professional PDF report',
      'Editable Word document templates'
    ]
  }
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPurchasedTier } = useAssessment();

  const tierParam = searchParams.get('tier') as ReportTier;
  const tier = tierParam && TIER_DETAILS[tierParam] ? tierParam : 'essential';
  const tierInfo = TIER_DETAILS[tier];

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Set the purchased tier
    setPurchasedTier(tier);

    // Redirect to report
    router.push(`/report/${tier}`);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Header */}
      <header className="bg-[var(--bg-primary)] border-b border-[var(--fill-quaternary)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--color-success)]" />
              <span className="text-sm text-[var(--label-secondary)]">
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-6">
                Order Summary
              </h2>

              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[var(--fill-tertiary)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--label-primary)]">
                    {tierInfo.name}
                  </h3>
                  <p className="text-sm text-[var(--label-secondary)]">
                    PathFinder Career Assessment Report
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[var(--label-primary)]">
                    ${tierInfo.price}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-[var(--label-primary)]">
                  What&apos;s included:
                </h4>
                {tierInfo.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--label-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--fill-tertiary)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--label-secondary)]">Subtotal</span>
                  <span className="text-[var(--label-primary)]">
                    ${tierInfo.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-[var(--label-primary)]">Total</span>
                  <span className="text-[var(--label-primary)]">
                    ${tierInfo.price}
                  </span>
                </div>
              </div>
            </Card>

            {/* Trust signals */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[var(--label-tertiary)]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>30-day money-back</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>256-bit encryption</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="elevated" className="p-6">
              <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-6">
                Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                  />
                  <p className="mt-1 text-xs text-[var(--label-tertiary)]">
                    We&apos;ll send your report to this email
                  </p>
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardNumber: formatCardNumber(e.target.value)
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)] pr-12"
                    />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--label-tertiary)]" />
                  </div>
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={formData.expiry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expiry: formatExpiry(e.target.value)
                        })
                      }
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={formData.cvc}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cvc: e.target.value.replace(/\D/g, '')
                        })
                      }
                      placeholder="123"
                      className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                    />
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                  />
                </div>

                {/* Submit */}
                <Button
                  variant="glass"
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isProcessing}
                  leftIcon={isProcessing ? undefined : <Lock className="w-4 h-4" />}
                >
                  {isProcessing ? 'Processing...' : `Pay $${tierInfo.price}`}
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-[var(--label-tertiary)]">
                By completing this purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
        />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
