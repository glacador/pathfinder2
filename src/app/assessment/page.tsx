'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Progress, Button } from '@/components/ui';
import { QuestionCard, TimedTask, InterstitialScreen } from '@/components/assessment';
import { useAssessment } from '@/contexts/AssessmentContext';
import { QUESTIONS, shuffleQuestions } from '@/data/questions';
import { Question, Answer } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const {
    userName,
    currentQuestionIndex,
    submitAnswer,
    calculateResults,
    getProgress
  } = useAssessment();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialProgress, setInterstitialProgress] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize shuffled questions
  useEffect(() => {
    setQuestions(shuffleQuestions(QUESTIONS));
  }, []);

  // Redirect if no user name (not started properly)
  useEffect(() => {
    if (!userName && questions.length > 0) {
      router.push('/');
    }
  }, [userName, router, questions.length]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0
    ? Math.round((currentQuestionIndex / questions.length) * 100)
    : 0;

  // Check for interstitial screens at 25%, 50%, 75%
  useEffect(() => {
    const checkpoints = [25, 50, 75];
    const currentProgress = Math.round((currentQuestionIndex / questions.length) * 100);

    for (const checkpoint of checkpoints) {
      if (currentProgress >= checkpoint &&
          currentProgress < checkpoint + 5 &&
          interstitialProgress < checkpoint) {
        setInterstitialProgress(checkpoint);
        setShowInterstitial(true);
        break;
      }
    }
  }, [currentQuestionIndex, questions.length, interstitialProgress]);

  const handleAnswer = useCallback((optionId: string, isCorrect: boolean) => {
    if (!currentQuestion) return;

    const timeSpent = (Date.now() - questionStartTime) / 1000;

    const answer: Answer = {
      questionId: currentQuestion.id,
      aptitude: currentQuestion.aptitude,
      selectedOptionId: optionId,
      isCorrect,
      timeSpent
    };

    submitAnswer(answer);
    setQuestionStartTime(Date.now());

    // Check if assessment is complete
    if (currentQuestionIndex >= questions.length - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        calculateResults();
        router.push('/results');
      }, 3000);
    }
  }, [currentQuestion, questionStartTime, submitAnswer, currentQuestionIndex, questions.length, calculateResults, router]);

  const handleTimedTaskComplete = useCallback((score: number) => {
    if (!currentQuestion) return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      aptitude: currentQuestion.aptitude,
      isCorrect: score >= 50,
      timeSpent: currentQuestion.timeLimit || 30,
      timedTaskScore: score
    };

    submitAnswer(answer);
    setQuestionStartTime(Date.now());

    // Check if assessment is complete
    if (currentQuestionIndex >= questions.length - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        calculateResults();
        router.push('/results');
      }, 3000);
    }
  }, [currentQuestion, submitAnswer, currentQuestionIndex, questions.length, calculateResults, router]);

  const handleContinueFromInterstitial = () => {
    setShowInterstitial(false);
  };

  // Show interstitial screen
  if (showInterstitial) {
    return (
      <InterstitialScreen
        progress={interstitialProgress}
        onContinue={handleContinueFromInterstitial}
      />
    );
  }

  // Show analyzing animation
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-[var(--label-primary)] mb-2">
            Analyzing Your Results
          </h2>
          <p className="text-[var(--label-secondary)]">
            Matching your cognitive profile to careers...
          </p>
          <motion.div className="mt-6 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion || questions.length === 0) {
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
      <header className="sticky top-0 z-40 bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--fill-quaternary)]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                  router.push('/');
                }
              }}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Exit
            </Button>
            <span className="text-sm font-medium text-[var(--label-secondary)]">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} variant="gradient" size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentQuestion.type === 'timed_task' ? (
            <TimedTask
              key={currentQuestion.id}
              question={currentQuestion}
              onComplete={handleTimedTaskComplete}
            />
          ) : (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer with user name */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center">
        <p className="text-sm text-[var(--label-tertiary)]">
          Assessment for <span className="font-medium">{userName}</span>
        </p>
      </footer>
    </div>
  );
}
