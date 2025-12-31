export type AptitudeId =
  | 'verbal'
  | 'numerical'
  | 'spatial'
  | 'pattern'
  | 'processing'
  | 'memory'
  | 'mechanical'
  | 'idea'
  | 'sequential'
  | 'interpersonal'
  | 'detail'
  | 'risk';

export interface Aptitude {
  id: AptitudeId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  predicts: string[];
}

export interface Question {
  id: string;
  aptitude: AptitudeId;
  type: 'multiple_choice' | 'timed_task' | 'sequence' | 'matching';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  question: string;
  options?: QuestionOption[];
  explanation: string;
  imageUrl?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface Answer {
  questionId: string;
  aptitude: AptitudeId;
  selectedOptionId?: string;
  isCorrect: boolean;
  timeSpent: number;
  timedTaskScore?: number;
}

export interface AssessmentResults {
  userName: string;
  email?: string;
  completedAt: Date;
  answers: Answer[];
  aptitudeScores: Record<AptitudeId, number>;
  percentiles: Record<AptitudeId, number>;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  avgSalary: string;
  growth: string;
  education: string;
  dayInLife: string;
  aptitudeProfile: Record<AptitudeId, number>;
}

export interface CareerMatch {
  career: Career;
  matchScore: number;
}

export interface FamousMind {
  id: string;
  name: string;
  title: string;
  description: string;
  profile: Partial<Record<AptitudeId, number>>;
  imageUrl?: string;
}

export type ReportTier = 'essential' | 'complete' | 'professional';

export interface EssentialReport {
  userName: string;
  completedAt: Date;
  aptitudeScores: Record<AptitudeId, number>;
  percentiles: Record<AptitudeId, number>;
  topStrengths: AptitudeId[];
  developmentAreas: AptitudeId[];
  topCareers: CareerMatch[];
  famousMindMatch: FamousMind;
  cognitiveProfile: string;
}

export interface CompleteReport extends EssentialReport {
  expandedCareers: Array<{
    career: Career;
    matchScore: number;
    salaryRange: { min: number; max: number; median: number };
    growthOutlook: string;
    educationPaths: string[];
    certifications: string[];
    dayInLife: string;
    whyItFits: string;
  }>;
  skillsGapAnalysis: Array<{
    skill: string;
    currentLevel: 'strong' | 'moderate' | 'developing';
    targetCareers: string[];
    developmentTips: string[];
  }>;
  actionPlan90Day: {
    week1_2: string[];
    week3_4: string[];
    month2: string[];
    month3: string[];
  };
  recommendedResources: Array<{
    type: 'course' | 'book' | 'certification' | 'website';
    title: string;
    provider: string;
    url?: string;
    relevantCareers: string[];
  }>;
}

export interface ProfessionalReport extends CompleteReport {
  resumeContent: {
    bulletsByCareer: Record<string, string[]>;
    skillsKeywords: string[];
    achievementFrameworks: string[];
  };
  linkedInOptimization: {
    headlineTemplates: string[];
    summaryTemplate: string;
    skillsToAdd: string[];
    keywordsToInclude: string[];
  };
  coverLetterFrameworks: Array<{
    type: 'traditional' | 'storytelling' | 'direct';
    template: string;
    whenToUse: string;
  }>;
  interviewPrep: {
    commonQuestions: Array<{
      question: string;
      category: 'behavioral' | 'technical' | 'situational';
      sampleAnswer: string;
      tips: string[];
    }>;
    questionsToAsk: string[];
    negotiationScripts: {
      initialResponse: string;
      counterOffer: string;
      benefits: string;
    };
  };
  networkingToolkit: {
    associations: Array<{ name: string; url: string; cost: string }>;
    outreachTemplates: {
      coldEmail: string;
      linkedInConnect: string;
      informationalInterview: string;
      followUp: string;
    };
  };
}
