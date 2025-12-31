import { Career, CareerMatch, AptitudeId, FamousMind } from '@/types';
import { APTITUDES } from './aptitudes';

export const CAREERS: Career[] = [
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    category: 'Technology',
    description: 'Design, develop, and maintain software applications',
    avgSalary: '$110,000',
    growth: '+25% (Much faster than average)',
    education: "Bachelor's in CS or related",
    dayInLife: 'Write code, debug issues, collaborate with team, review pull requests, attend standups',
    aptitudeProfile: {
      verbal: 5, numerical: 8, spatial: 6, pattern: 9,
      processing: 6, memory: 7, mechanical: 4, idea: 7,
      sequential: 9, interpersonal: 5, detail: 8, risk: 5
    }
  },
  {
    id: 'marketing_director',
    title: 'Marketing Director',
    category: 'Business',
    description: 'Lead marketing strategy and brand development',
    avgSalary: '$140,000',
    growth: '+10% (Faster than average)',
    education: "Bachelor's + MBA preferred",
    dayInLife: 'Strategy meetings, review campaigns, analyze metrics, manage team, present to executives',
    aptitudeProfile: {
      verbal: 9, numerical: 6, spatial: 5, pattern: 6,
      processing: 5, memory: 6, mechanical: 2, idea: 9,
      sequential: 7, interpersonal: 9, detail: 5, risk: 7
    }
  },
  {
    id: 'surgeon',
    title: 'Surgeon',
    category: 'Healthcare',
    description: 'Perform operations to treat injuries and diseases',
    avgSalary: '$400,000',
    growth: '+3% (Stable)',
    education: 'MD + Residency (12+ years)',
    dayInLife: 'Surgeries, patient consultations, rounds, review imaging, surgical planning',
    aptitudeProfile: {
      verbal: 6, numerical: 7, spatial: 10, pattern: 7,
      processing: 8, memory: 9, mechanical: 8, idea: 5,
      sequential: 9, interpersonal: 7, detail: 10, risk: 6
    }
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Extract insights from complex data sets',
    avgSalary: '$125,000',
    growth: '+35% (Much faster than average)',
    education: "Master's preferred",
    dayInLife: 'Build models, clean data, create visualizations, present findings, collaborate with stakeholders',
    aptitudeProfile: {
      verbal: 6, numerical: 10, spatial: 5, pattern: 10,
      processing: 6, memory: 8, mechanical: 3, idea: 7,
      sequential: 8, interpersonal: 5, detail: 8, risk: 5
    }
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    category: 'Business',
    description: 'Start and run your own business venture',
    avgSalary: 'Variable ($0-$1M+)',
    growth: 'Self-determined',
    education: 'Varied',
    dayInLife: 'Sales calls, product development, investor meetings, team management, problem solving',
    aptitudeProfile: {
      verbal: 7, numerical: 7, spatial: 4, pattern: 6,
      processing: 6, memory: 6, mechanical: 4, idea: 10,
      sequential: 7, interpersonal: 9, detail: 5, risk: 10
    }
  },
  {
    id: 'architect',
    title: 'Architect',
    category: 'Design',
    description: 'Design buildings and structures',
    avgSalary: '$90,000',
    growth: '+5% (Average)',
    education: "Bachelor's in Architecture",
    dayInLife: 'Design work, client meetings, site visits, coordinate with engineers, review plans',
    aptitudeProfile: {
      verbal: 6, numerical: 7, spatial: 10, pattern: 8,
      processing: 5, memory: 7, mechanical: 7, idea: 9,
      sequential: 8, interpersonal: 7, detail: 9, risk: 5
    }
  },
  {
    id: 'therapist',
    title: 'Therapist/Counselor',
    category: 'Healthcare',
    description: 'Help people manage mental health and life challenges',
    avgSalary: '$60,000',
    growth: '+22% (Much faster than average)',
    education: "Master's + License",
    dayInLife: 'Client sessions, treatment planning, documentation, supervision, continuing education',
    aptitudeProfile: {
      verbal: 9, numerical: 3, spatial: 2, pattern: 6,
      processing: 4, memory: 8, mechanical: 1, idea: 6,
      sequential: 6, interpersonal: 10, detail: 6, risk: 3
    }
  },
  {
    id: 'financial_analyst',
    title: 'Financial Analyst',
    category: 'Finance',
    description: 'Analyze financial data and guide investment decisions',
    avgSalary: '$85,000',
    growth: '+9% (Faster than average)',
    education: "Bachelor's in Finance",
    dayInLife: 'Build financial models, analyze reports, prepare presentations, meet with clients',
    aptitudeProfile: {
      verbal: 6, numerical: 10, spatial: 3, pattern: 8,
      processing: 7, memory: 7, mechanical: 2, idea: 5,
      sequential: 8, interpersonal: 6, detail: 9, risk: 7
    }
  },
  {
    id: 'ux_designer',
    title: 'UX Designer',
    category: 'Design',
    description: 'Design user experiences for digital products',
    avgSalary: '$95,000',
    growth: '+15% (Much faster than average)',
    education: "Bachelor's or Bootcamp",
    dayInLife: 'User research, wireframing, prototyping, usability testing, design reviews',
    aptitudeProfile: {
      verbal: 7, numerical: 4, spatial: 9, pattern: 8,
      processing: 5, memory: 6, mechanical: 3, idea: 9,
      sequential: 7, interpersonal: 8, detail: 8, risk: 5
    }
  },
  {
    id: 'attorney',
    title: 'Attorney',
    category: 'Law',
    description: 'Represent clients in legal matters',
    avgSalary: '$130,000',
    growth: '+6% (Average)',
    education: 'JD + Bar Exam',
    dayInLife: 'Legal research, client meetings, court appearances, document drafting, negotiations',
    aptitudeProfile: {
      verbal: 10, numerical: 6, spatial: 2, pattern: 7,
      processing: 6, memory: 9, mechanical: 1, idea: 6,
      sequential: 9, interpersonal: 8, detail: 9, risk: 6
    }
  },
  {
    id: 'product_manager',
    title: 'Product Manager',
    category: 'Technology',
    description: 'Guide product strategy and development',
    avgSalary: '$120,000',
    growth: '+12% (Faster than average)',
    education: "Bachelor's + MBA helpful",
    dayInLife: 'Roadmap planning, stakeholder meetings, user research, sprint planning, metrics analysis',
    aptitudeProfile: {
      verbal: 8, numerical: 7, spatial: 5, pattern: 7,
      processing: 6, memory: 7, mechanical: 3, idea: 8,
      sequential: 8, interpersonal: 9, detail: 6, risk: 7
    }
  },
  {
    id: 'nurse_practitioner',
    title: 'Nurse Practitioner',
    category: 'Healthcare',
    description: 'Provide advanced nursing care and prescribe treatments',
    avgSalary: '$115,000',
    growth: '+45% (Much faster than average)',
    education: "Master's in Nursing",
    dayInLife: 'Patient exams, diagnose conditions, prescribe medications, health education',
    aptitudeProfile: {
      verbal: 8, numerical: 6, spatial: 4, pattern: 6,
      processing: 7, memory: 8, mechanical: 5, idea: 5,
      sequential: 8, interpersonal: 9, detail: 8, risk: 4
    }
  },
  {
    id: 'investment_banker',
    title: 'Investment Banker',
    category: 'Finance',
    description: 'Advise on mergers, acquisitions, and capital raising',
    avgSalary: '$150,000+',
    growth: '+4% (Average)',
    education: "Bachelor's + MBA",
    dayInLife: 'Financial modeling, client pitches, due diligence, deal negotiations, market analysis',
    aptitudeProfile: {
      verbal: 8, numerical: 10, spatial: 3, pattern: 8,
      processing: 8, memory: 8, mechanical: 2, idea: 6,
      sequential: 8, interpersonal: 8, detail: 9, risk: 8
    }
  },
  {
    id: 'mechanical_engineer',
    title: 'Mechanical Engineer',
    category: 'Engineering',
    description: 'Design and develop mechanical systems and devices',
    avgSalary: '$95,000',
    growth: '+7% (Average)',
    education: "Bachelor's in Mechanical Engineering",
    dayInLife: 'CAD design, prototyping, testing, project coordination, technical documentation',
    aptitudeProfile: {
      verbal: 5, numerical: 9, spatial: 9, pattern: 8,
      processing: 5, memory: 7, mechanical: 10, idea: 7,
      sequential: 8, interpersonal: 5, detail: 9, risk: 5
    }
  },
  {
    id: 'teacher',
    title: 'Teacher',
    category: 'Education',
    description: 'Educate and inspire students in academic subjects',
    avgSalary: '$60,000',
    growth: '+4% (Average)',
    education: "Bachelor's + Teaching License",
    dayInLife: 'Lesson planning, classroom instruction, grading, parent meetings, student support',
    aptitudeProfile: {
      verbal: 9, numerical: 5, spatial: 4, pattern: 5,
      processing: 5, memory: 7, mechanical: 2, idea: 7,
      sequential: 7, interpersonal: 10, detail: 6, risk: 3
    }
  },
  {
    id: 'graphic_designer',
    title: 'Graphic Designer',
    category: 'Design',
    description: 'Create visual content for brands and marketing',
    avgSalary: '$55,000',
    growth: '+3% (Average)',
    education: "Bachelor's in Design",
    dayInLife: 'Create designs, client revisions, brand development, collaborate with marketing',
    aptitudeProfile: {
      verbal: 5, numerical: 3, spatial: 10, pattern: 8,
      processing: 5, memory: 5, mechanical: 3, idea: 10,
      sequential: 5, interpersonal: 6, detail: 8, risk: 5
    }
  },
  {
    id: 'accountant',
    title: 'Accountant',
    category: 'Finance',
    description: 'Prepare and examine financial records',
    avgSalary: '$75,000',
    growth: '+6% (Average)',
    education: "Bachelor's in Accounting",
    dayInLife: 'Financial statements, tax preparation, auditing, client consultations, compliance',
    aptitudeProfile: {
      verbal: 5, numerical: 10, spatial: 2, pattern: 6,
      processing: 6, memory: 7, mechanical: 1, idea: 3,
      sequential: 9, interpersonal: 5, detail: 10, risk: 3
    }
  },
  {
    id: 'sales_manager',
    title: 'Sales Manager',
    category: 'Business',
    description: 'Lead sales teams and develop revenue strategies',
    avgSalary: '$130,000',
    growth: '+5% (Average)',
    education: "Bachelor's degree",
    dayInLife: 'Team coaching, pipeline reviews, client meetings, strategy sessions, performance tracking',
    aptitudeProfile: {
      verbal: 9, numerical: 7, spatial: 3, pattern: 5,
      processing: 7, memory: 6, mechanical: 2, idea: 7,
      sequential: 6, interpersonal: 10, detail: 5, risk: 8
    }
  },
  {
    id: 'research_scientist',
    title: 'Research Scientist',
    category: 'Science',
    description: 'Conduct research to advance scientific knowledge',
    avgSalary: '$85,000',
    growth: '+8% (Faster than average)',
    education: 'PhD preferred',
    dayInLife: 'Design experiments, analyze data, write papers, grant applications, collaborate',
    aptitudeProfile: {
      verbal: 7, numerical: 9, spatial: 6, pattern: 10,
      processing: 5, memory: 9, mechanical: 6, idea: 9,
      sequential: 8, interpersonal: 5, detail: 9, risk: 6
    }
  },
  {
    id: 'hr_manager',
    title: 'HR Manager',
    category: 'Business',
    description: 'Oversee recruitment, employee relations, and policies',
    avgSalary: '$85,000',
    growth: '+7% (Average)',
    education: "Bachelor's in HR or Business",
    dayInLife: 'Interviews, policy development, employee issues, training programs, compliance',
    aptitudeProfile: {
      verbal: 9, numerical: 5, spatial: 2, pattern: 5,
      processing: 5, memory: 7, mechanical: 1, idea: 6,
      sequential: 7, interpersonal: 10, detail: 7, risk: 4
    }
  },
  {
    id: 'pilot',
    title: 'Commercial Pilot',
    category: 'Transportation',
    description: 'Fly aircraft and transport passengers or cargo',
    avgSalary: '$130,000',
    growth: '+6% (Average)',
    education: 'Flight training + ATP License',
    dayInLife: 'Pre-flight checks, navigation, communication with ATC, passenger safety, logbooks',
    aptitudeProfile: {
      verbal: 6, numerical: 7, spatial: 9, pattern: 7,
      processing: 9, memory: 8, mechanical: 8, idea: 4,
      sequential: 9, interpersonal: 6, detail: 9, risk: 6
    }
  },
  {
    id: 'physical_therapist',
    title: 'Physical Therapist',
    category: 'Healthcare',
    description: 'Help patients recover movement and manage pain',
    avgSalary: '$95,000',
    growth: '+18% (Much faster than average)',
    education: 'Doctorate in Physical Therapy',
    dayInLife: 'Patient evaluations, therapy sessions, treatment plans, documentation, patient education',
    aptitudeProfile: {
      verbal: 7, numerical: 5, spatial: 7, pattern: 6,
      processing: 6, memory: 7, mechanical: 6, idea: 6,
      sequential: 7, interpersonal: 9, detail: 7, risk: 4
    }
  },
  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    description: 'Protect organizations from cyber threats',
    avgSalary: '$105,000',
    growth: '+32% (Much faster than average)',
    education: "Bachelor's in IT/CS + Certifications",
    dayInLife: 'Monitor systems, investigate incidents, implement security measures, train staff',
    aptitudeProfile: {
      verbal: 5, numerical: 7, spatial: 4, pattern: 9,
      processing: 7, memory: 8, mechanical: 5, idea: 7,
      sequential: 9, interpersonal: 5, detail: 10, risk: 6
    }
  },
  {
    id: 'journalist',
    title: 'Journalist',
    category: 'Media',
    description: 'Research and report news stories',
    avgSalary: '$50,000',
    growth: '-9% (Declining)',
    education: "Bachelor's in Journalism",
    dayInLife: 'Research, interviews, writing, editing, meeting deadlines, fact-checking',
    aptitudeProfile: {
      verbal: 10, numerical: 4, spatial: 2, pattern: 6,
      processing: 7, memory: 7, mechanical: 1, idea: 8,
      sequential: 7, interpersonal: 8, detail: 8, risk: 6
    }
  },
  {
    id: 'civil_engineer',
    title: 'Civil Engineer',
    category: 'Engineering',
    description: 'Design and oversee infrastructure projects',
    avgSalary: '$90,000',
    growth: '+7% (Average)',
    education: "Bachelor's in Civil Engineering",
    dayInLife: 'Site inspections, structural analysis, project management, regulatory compliance',
    aptitudeProfile: {
      verbal: 5, numerical: 9, spatial: 9, pattern: 7,
      processing: 5, memory: 7, mechanical: 9, idea: 6,
      sequential: 9, interpersonal: 6, detail: 9, risk: 5
    }
  }
];

export const FAMOUS_MINDS: FamousMind[] = [
  {
    id: 'einstein',
    name: 'Albert Einstein',
    title: 'Theoretical Physicist',
    description: 'Revolutionary thinker who combined pattern recognition with spatial visualization',
    profile: { pattern: 10, spatial: 9, idea: 9, numerical: 8, verbal: 6 }
  },
  {
    id: 'oprah',
    name: 'Oprah Winfrey',
    title: 'Media Mogul',
    description: 'Master of interpersonal connection and creative business building',
    profile: { interpersonal: 10, verbal: 9, idea: 9, risk: 8, sequential: 6 }
  },
  {
    id: 'jobs',
    name: 'Steve Jobs',
    title: 'Tech Visionary',
    description: 'Combined spatial design sense with bold risk-taking',
    profile: { spatial: 9, idea: 10, risk: 9, interpersonal: 7, detail: 8 }
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    title: 'Scientist',
    description: 'Exceptional detail orientation paired with pattern recognition',
    profile: { detail: 10, pattern: 9, memory: 9, sequential: 8, numerical: 8 }
  },
  {
    id: 'gates',
    name: 'Bill Gates',
    title: 'Tech Pioneer & Philanthropist',
    description: 'Analytical mindset with strategic sequential reasoning',
    profile: { pattern: 10, numerical: 9, sequential: 9, idea: 8, risk: 7 }
  },
  {
    id: 'musk',
    name: 'Elon Musk',
    title: 'Serial Entrepreneur',
    description: 'High risk tolerance combined with mechanical and spatial thinking',
    profile: { risk: 10, mechanical: 9, spatial: 9, pattern: 8, idea: 9 }
  },
  {
    id: 'rowling',
    name: 'J.K. Rowling',
    title: 'Author',
    description: 'Exceptional verbal ability with imaginative idea generation',
    profile: { verbal: 10, idea: 10, memory: 8, sequential: 7, pattern: 7 }
  },
  {
    id: 'buffett',
    name: 'Warren Buffett',
    title: 'Investor',
    description: 'Numerical mastery with calculated risk assessment',
    profile: { numerical: 10, risk: 8, pattern: 9, memory: 8, sequential: 8 }
  },
  {
    id: 'obama',
    name: 'Barack Obama',
    title: 'Leader & Orator',
    description: 'Powerful verbal and interpersonal abilities with strategic thinking',
    profile: { verbal: 10, interpersonal: 10, sequential: 8, memory: 8, risk: 6 }
  },
  {
    id: 'tesla',
    name: 'Nikola Tesla',
    title: 'Inventor',
    description: 'Extraordinary spatial visualization with creative genius',
    profile: { spatial: 10, idea: 10, pattern: 9, memory: 9, mechanical: 9 }
  },
  {
    id: 'winfrey',
    name: 'Sheryl Sandberg',
    title: 'Business Executive',
    description: 'Strong interpersonal skills with analytical precision',
    profile: { interpersonal: 9, sequential: 9, verbal: 8, numerical: 8, detail: 7 }
  },
  {
    id: 'darwin',
    name: 'Charles Darwin',
    title: 'Naturalist',
    description: 'Patient observer with exceptional pattern recognition',
    profile: { pattern: 10, detail: 10, memory: 9, sequential: 8, verbal: 7 }
  },
  {
    id: 'daVinci',
    name: 'Leonardo da Vinci',
    title: 'Renaissance Polymath',
    description: 'Unparalleled combination of spatial visualization and creative thinking',
    profile: { spatial: 10, idea: 10, detail: 10, pattern: 9, mechanical: 9 }
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    title: 'Computer Science Pioneer',
    description: 'Exceptional pattern recognition and sequential logic',
    profile: { pattern: 10, sequential: 10, numerical: 9, memory: 9, idea: 8 }
  },
  {
    id: 'nightingale',
    name: 'Florence Nightingale',
    title: 'Nursing Pioneer',
    description: 'Combined interpersonal care with analytical detail orientation',
    profile: { interpersonal: 10, detail: 10, sequential: 9, numerical: 7, memory: 8 }
  }
];

// Career matching algorithm
export function matchCareers(
  userScores: Record<AptitudeId, number>
): CareerMatch[] {
  return CAREERS.map(career => {
    let matchScore = 0;
    let totalWeight = 0;

    Object.entries(career.aptitudeProfile).forEach(([aptitude, importance]) => {
      const userScore = userScores[aptitude as AptitudeId] || 50;
      const weight = importance;

      // Normalize user score to 1-10 scale (assuming userScore is 0-100)
      const normalizedUserScore = userScore / 10;

      // Score based on how well user matches the required level
      const diff = Math.abs(normalizedUserScore - importance);
      const match = Math.max(0, 10 - diff) / 10;

      matchScore += match * weight;
      totalWeight += weight;
    });

    return {
      career,
      matchScore: Math.round((matchScore / totalWeight) * 100)
    };
  })
  .sort((a, b) => b.matchScore - a.matchScore);
}

// Find the famous mind that best matches user's profile
export function findFamousMindMatch(
  userScores: Record<AptitudeId, number>
): FamousMind {
  let bestMatch: FamousMind = FAMOUS_MINDS[0];
  let bestScore = 0;

  FAMOUS_MINDS.forEach(mind => {
    let matchScore = 0;
    let count = 0;

    Object.entries(mind.profile).forEach(([aptitude, value]) => {
      const userScore = userScores[aptitude as AptitudeId] || 50;
      const normalizedUserScore = userScore / 10;
      const diff = Math.abs(normalizedUserScore - (value || 5));
      matchScore += (10 - diff) / 10;
      count++;
    });

    const avgMatch = matchScore / count;
    if (avgMatch > bestScore) {
      bestScore = avgMatch;
      bestMatch = mind;
    }
  });

  return bestMatch;
}

// Generate cognitive profile summary
export function generateCognitiveProfileSummary(
  scores: Record<AptitudeId, number>
): string {
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  const topTwo = sortedScores.slice(0, 2);
  const bottomTwo = sortedScores.slice(-2);

  const topAptitudes = topTwo.map(([id]) =>
    APTITUDES.find(a => a.id === id)?.name || id
  );
  const bottomAptitudes = bottomTwo.map(([id]) =>
    APTITUDES.find(a => a.id === id)?.name || id
  );

  return `Your cognitive profile reveals exceptional strength in ${topAptitudes[0]} and ${topAptitudes[1]}. These abilities position you well for roles requiring analytical thinking and creative problem-solving. Your profile suggests you thrive in environments that challenge your ${topAptitudes[0].toLowerCase()} while allowing you to leverage your natural ${topAptitudes[1].toLowerCase()}. Areas for potential development include ${bottomAptitudes[0]} and ${bottomAptitudes[1]}, though these are not weaknesses—rather, they represent opportunities for growth that could expand your career options.`;
}

// Calculate percentiles (simplified simulation)
export function calculatePercentiles(
  scores: Record<AptitudeId, number>
): Record<AptitudeId, number> {
  const percentiles: Partial<Record<AptitudeId, number>> = {};

  Object.entries(scores).forEach(([aptitude, score]) => {
    // Simplified percentile calculation (would be based on actual population data)
    // Assumes normal distribution with mean 50, std 15
    const zScore = (score - 50) / 15;
    const percentile = Math.round(
      (1 / (1 + Math.exp(-1.7 * zScore))) * 100
    );
    percentiles[aptitude as AptitudeId] = Math.min(99, Math.max(1, percentile));
  });

  return percentiles as Record<AptitudeId, number>;
}

// Get salary data for a career
export function getSalaryData(careerId: string): { min: number; max: number; median: number } {
  const salaryRanges: Record<string, { min: number; max: number; median: number }> = {
    software_engineer: { min: 70000, max: 180000, median: 110000 },
    data_scientist: { min: 85000, max: 200000, median: 125000 },
    marketing_director: { min: 90000, max: 220000, median: 140000 },
    surgeon: { min: 250000, max: 600000, median: 400000 },
    entrepreneur: { min: 0, max: 1000000, median: 75000 },
    architect: { min: 60000, max: 150000, median: 90000 },
    therapist: { min: 45000, max: 90000, median: 60000 },
    financial_analyst: { min: 55000, max: 150000, median: 85000 },
    ux_designer: { min: 65000, max: 150000, median: 95000 },
    attorney: { min: 70000, max: 300000, median: 130000 },
    product_manager: { min: 80000, max: 200000, median: 120000 },
    nurse_practitioner: { min: 90000, max: 160000, median: 115000 },
    investment_banker: { min: 100000, max: 400000, median: 150000 },
    mechanical_engineer: { min: 65000, max: 140000, median: 95000 },
    teacher: { min: 40000, max: 85000, median: 60000 },
    graphic_designer: { min: 35000, max: 90000, median: 55000 },
    accountant: { min: 50000, max: 120000, median: 75000 },
    sales_manager: { min: 70000, max: 200000, median: 130000 },
    research_scientist: { min: 60000, max: 130000, median: 85000 },
    hr_manager: { min: 60000, max: 130000, median: 85000 },
    pilot: { min: 70000, max: 250000, median: 130000 },
    physical_therapist: { min: 70000, max: 130000, median: 95000 },
    cybersecurity_analyst: { min: 70000, max: 160000, median: 105000 },
    journalist: { min: 35000, max: 90000, median: 50000 },
    civil_engineer: { min: 60000, max: 140000, median: 90000 }
  };

  return salaryRanges[careerId] || { min: 40000, max: 100000, median: 60000 };
}
