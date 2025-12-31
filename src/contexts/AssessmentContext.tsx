'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from 'react';
import { Answer, AptitudeId, AssessmentResults, CareerMatch } from '@/types';
import { QUESTIONS } from '@/data/questions';
import { matchCareers, calculatePercentiles, findFamousMindMatch, generateCognitiveProfileSummary } from '@/data/careers';

interface AssessmentState {
  // User info
  userName: string;
  email: string;

  // Assessment progress
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date | null;

  // Results
  isComplete: boolean;
  results: AssessmentResults | null;
  careerMatches: CareerMatch[];

  // Purchased tier
  purchasedTier: 'essential' | 'complete' | 'professional' | null;
}

interface AssessmentContextType extends AssessmentState {
  setUserInfo: (name: string, email?: string) => void;
  startAssessment: () => void;
  submitAnswer: (answer: Answer) => void;
  calculateResults: () => void;
  setPurchasedTier: (tier: 'essential' | 'complete' | 'professional') => void;
  resetAssessment: () => void;
  getProgress: () => number;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

const initialState: AssessmentState = {
  userName: '',
  email: '',
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  isComplete: false,
  results: null,
  careerMatches: [],
  purchasedTier: null
};

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initialState);

  const setUserInfo = useCallback((name: string, email?: string) => {
    setState((prev) => ({
      ...prev,
      userName: name,
      email: email || ''
    }));
  }, []);

  const startAssessment = useCallback(() => {
    setState((prev) => ({
      ...prev,
      startTime: new Date(),
      currentQuestionIndex: 0,
      answers: [],
      isComplete: false
    }));
  }, []);

  const submitAnswer = useCallback((answer: Answer) => {
    setState((prev) => ({
      ...prev,
      answers: [...prev.answers, answer],
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  }, []);

  const calculateResults = useCallback(() => {
    // Calculate aptitude scores based on answers
    const aptitudeScores: Partial<Record<AptitudeId, { correct: number; total: number }>> = {};

    state.answers.forEach((answer) => {
      const aptitude = answer.aptitude;
      if (!aptitudeScores[aptitude]) {
        aptitudeScores[aptitude] = { correct: 0, total: 0 };
      }
      aptitudeScores[aptitude]!.total++;
      if (answer.isCorrect) {
        aptitudeScores[aptitude]!.correct++;
      }
    });

    // Convert to percentage scores (0-100)
    const scores: Record<AptitudeId, number> = {} as Record<AptitudeId, number>;
    Object.entries(aptitudeScores).forEach(([aptitude, data]) => {
      // Base score from correctness
      const baseScore = (data.correct / data.total) * 100;
      // Add some variance to make it more interesting (between -10 and +10)
      const variance = (Math.random() - 0.5) * 20;
      scores[aptitude as AptitudeId] = Math.round(
        Math.min(100, Math.max(0, baseScore + variance))
      );
    });

    // Fill in any missing aptitudes with random scores (for demo purposes)
    const allAptitudes: AptitudeId[] = [
      'verbal', 'numerical', 'spatial', 'pattern',
      'processing', 'memory', 'mechanical', 'idea',
      'sequential', 'interpersonal', 'detail', 'risk'
    ];
    allAptitudes.forEach((apt) => {
      if (!(apt in scores)) {
        scores[apt] = Math.round(40 + Math.random() * 40);
      }
    });

    const percentiles = calculatePercentiles(scores);
    const careerMatches = matchCareers(scores);

    // Find top strengths and development areas
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const topStrengths = sortedScores.slice(0, 3).map(([id]) => id as AptitudeId);
    const developmentAreas = sortedScores.slice(-2).map(([id]) => id as AptitudeId);

    const results: AssessmentResults = {
      userName: state.userName,
      email: state.email,
      completedAt: new Date(),
      answers: state.answers,
      aptitudeScores: scores,
      percentiles
    };

    setState((prev) => ({
      ...prev,
      isComplete: true,
      results,
      careerMatches
    }));

    // Store in localStorage for persistence
    try {
      localStorage.setItem('pathfinder_results', JSON.stringify({
        results,
        careerMatches,
        famousMind: findFamousMindMatch(scores),
        cognitiveProfile: generateCognitiveProfileSummary(scores),
        topStrengths,
        developmentAreas
      }));
    } catch (e) {
      console.error('Failed to save results to localStorage', e);
    }
  }, [state.answers, state.userName, state.email]);

  const setPurchasedTier = useCallback(
    (tier: 'essential' | 'complete' | 'professional') => {
      setState((prev) => ({
        ...prev,
        purchasedTier: tier
      }));
      try {
        localStorage.setItem('pathfinder_tier', tier);
      } catch (e) {
        console.error('Failed to save tier to localStorage', e);
      }
    },
    []
  );

  const resetAssessment = useCallback(() => {
    setState(initialState);
    try {
      localStorage.removeItem('pathfinder_results');
      localStorage.removeItem('pathfinder_tier');
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  }, []);

  const getProgress = useCallback(() => {
    return Math.round((state.currentQuestionIndex / QUESTIONS.length) * 100);
  }, [state.currentQuestionIndex]);

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
        setUserInfo,
        startAssessment,
        submitAnswer,
        calculateResults,
        setPurchasedTier,
        resetAssessment,
        getProgress
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
