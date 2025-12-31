'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Target,
  Sparkles,
  Clock,
  ChevronRight,
  BarChart3,
  Users,
  Star
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useAssessment } from '@/contexts/AssessmentContext';

const FEATURES = [
  {
    icon: Brain,
    title: '12 Cognitive Aptitudes',
    description: 'Measure verbal, numerical, spatial, and 9 more core abilities'
  },
  {
    icon: Target,
    title: '150+ Career Matches',
    description: 'Get personalized career recommendations based on your profile'
  },
  {
    icon: Clock,
    title: '15 Minutes',
    description: 'Quick but comprehensive assessment designed by experts'
  },
  {
    icon: BarChart3,
    title: 'Detailed Reports',
    description: 'In-depth analysis with actionable career guidance'
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Career Changer',
    text: "PathFinder helped me discover I was perfectly suited for UX design. I'm now 6 months into my new career and loving it!",
    rating: 5
  },
  {
    name: 'James K.',
    role: 'Recent Graduate',
    text: "I was lost after college. This assessment gave me clarity on what careers would actually fit my strengths. Game changer.",
    rating: 5
  },
  {
    name: 'Maria L.',
    role: 'Professional',
    text: 'The 90-day action plan in the Complete report was incredibly helpful. Very practical and specific to my goals.',
    rating: 5
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { setUserInfo, startAssessment } = useAssessment();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      setUserInfo(name.trim(), email.trim());
      startAssessment();
      router.push('/assessment');
    } else {
      setShowForm(true);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[var(--color-primary)]/10"
            >
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                PATHFINDER
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--label-primary)] mb-6">
              Discover What You Were
              <br />
              <span className="gradient-text">Born to Do</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[var(--label-secondary)] max-w-2xl mx-auto mb-10">
              Take our scientifically-designed aptitude assessment and uncover
              careers that perfectly match your unique cognitive profile.
            </p>

            {/* CTA or Form */}
            {!showForm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => setShowForm(true)}
                  size="lg"
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Start Free Assessment
                </Button>
                <p className="mt-4 text-sm text-[var(--label-tertiary)]">
                  Takes about 15 minutes • No signup required
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handleSubmitForm}
                className="max-w-sm mx-auto glass p-6 rounded-[28px]"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-primary)] mb-2">
                      Email{' '}
                      <span className="text-[var(--label-tertiary)]">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-[var(--fill-quaternary)] rounded-xl border border-[var(--fill-secondary)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--label-primary)]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                  >
                    Begin Assessment
                  </Button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--label-primary)] mb-4">
              How It Works
            </h2>
            <p className="text-[var(--label-secondary)]">
              Our assessment measures 12 cognitive aptitudes to find your ideal
              career path
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}
                  >
                    <feature.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--label-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--label-secondary)]">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-20 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                TRUSTED BY 50,000+ USERS
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[var(--label-primary)]">
              What Our Users Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full">
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[var(--color-warning)] fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-[var(--label-primary)] mb-4">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="text-sm">
                    <span className="font-semibold text-[var(--label-primary)]">
                      {testimonial.name}
                    </span>
                    <span className="text-[var(--label-tertiary)]">
                      {' '}
                      • {testimonial.role}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--label-primary)] mb-6">
              Ready to Find Your Path?
            </h2>
            <p className="text-lg text-[var(--label-secondary)] mb-8">
              Join thousands of people who&apos;ve discovered careers they love
              using PathFinder
            </p>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              rightIcon={<ChevronRight className="w-5 h-5" />}
            >
              Start Your Free Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--fill-tertiary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--label-primary)]">
                PathFinder
              </span>
            </div>
            <p className="text-sm text-[var(--label-tertiary)]">
              © {new Date().getFullYear()} PathFinder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
