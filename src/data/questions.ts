import { Question } from '@/types';

export const QUESTIONS: Question[] = [
  // === VERBAL (4) ===
  {
    id: 'V1',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'BIRD is to NEST as BEAR is to:',
    options: [
      { id: 'a', text: 'Forest', correct: false },
      { id: 'b', text: 'Den', correct: true },
      { id: 'c', text: 'Fur', correct: false },
      { id: 'd', text: 'Hibernate', correct: false }
    ],
    explanation: 'A bird lives in a nest, a bear lives in a den.'
  },
  {
    id: 'V2',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Select the word most similar in meaning to UBIQUITOUS:',
    options: [
      { id: 'a', text: 'Rare', correct: false },
      { id: 'b', text: 'Omnipresent', correct: true },
      { id: 'c', text: 'Ambiguous', correct: false },
      { id: 'd', text: 'Unique', correct: false }
    ],
    explanation: 'Ubiquitous means present everywhere.'
  },
  {
    id: 'V3',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: "Despite the team's _____ efforts, the project failed due to _____ planning.",
    options: [
      { id: 'a', text: 'minimal ... excellent', correct: false },
      { id: 'b', text: 'heroic ... inadequate', correct: true },
      { id: 'c', text: 'weak ... strong', correct: false },
      { id: 'd', text: 'lazy ... careful', correct: false }
    ],
    explanation: '"Despite" indicates contrast between positive efforts and negative planning.'
  },
  {
    id: 'V4',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'CRESCENDO is to MUSIC as CLIMAX is to:',
    options: [
      { id: 'a', text: 'Mountain', correct: false },
      { id: 'b', text: 'Narrative', correct: true },
      { id: 'c', text: 'Weather', correct: false },
      { id: 'd', text: 'Temperature', correct: false }
    ],
    explanation: 'Crescendo is the peak of music; climax is the peak of a narrative.'
  },

  // === NUMERICAL (4) ===
  {
    id: 'N1',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'What number comes next? 2, 6, 18, 54, ___',
    options: [
      { id: 'a', text: '108', correct: false },
      { id: 'b', text: '162', correct: true },
      { id: 'c', text: '126', correct: false },
      { id: 'd', text: '216', correct: false }
    ],
    explanation: 'Each number is multiplied by 3. 54 × 3 = 162.'
  },
  {
    id: 'N2',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'A store offers 25% off, then an additional 10% off the sale price. Original price: $80. Final price?',
    options: [
      { id: 'a', text: '$52.00', correct: false },
      { id: 'b', text: '$54.00', correct: true },
      { id: 'c', text: '$56.00', correct: false },
      { id: 'd', text: '$48.00', correct: false }
    ],
    explanation: '$80 - 25% = $60. Then $60 - 10% = $54.'
  },
  {
    id: 'N3',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'If 3 workers complete a task in 8 days, how many days for 6 workers?',
    options: [
      { id: 'a', text: '16 days', correct: false },
      { id: 'b', text: '4 days', correct: true },
      { id: 'c', text: '6 days', correct: false },
      { id: 'd', text: '12 days', correct: false }
    ],
    explanation: 'Double workers = half time. 8 ÷ 2 = 4 days.'
  },
  {
    id: 'N4',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Revenue: Q1 $120K, Q4 $180K. What % increase from Q1 to Q4?',
    options: [
      { id: 'a', text: '33%', correct: false },
      { id: 'b', text: '50%', correct: true },
      { id: 'c', text: '60%', correct: false },
      { id: 'd', text: '45%', correct: false }
    ],
    explanation: '($180K - $120K) / $120K × 100 = 50%.'
  },

  // === PATTERN (4) ===
  {
    id: 'P1',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'What comes next in the pattern? 1, 2, 3, ____',
    options: [
      { id: 'a', text: '4', correct: true },
      { id: 'b', text: '3', correct: false },
      { id: 'c', text: '2', correct: false },
      { id: 'd', text: '1', correct: false }
    ],
    explanation: 'Pattern adds one each time.'
  },
  {
    id: 'P2',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'What comes next? 1, 1, 2, 3, 5, 8, 13, ___',
    options: [
      { id: 'a', text: '18', correct: false },
      { id: 'b', text: '20', correct: false },
      { id: 'c', text: '21', correct: true },
      { id: 'd', text: '26', correct: false }
    ],
    explanation: 'Fibonacci: each = sum of previous two. 8 + 13 = 21.'
  },
  {
    id: 'P3',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Find the odd one out: 2, 3, 5, 7, 9, 11, 13',
    options: [
      { id: 'a', text: '2', correct: false },
      { id: 'b', text: '9', correct: true },
      { id: 'c', text: '7', correct: false },
      { id: 'd', text: '11', correct: false }
    ],
    explanation: 'All are prime numbers except 9 (3×3).'
  },
  {
    id: 'P4',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Pattern: AZ, BY, CX, DW, ___',
    options: [
      { id: 'a', text: 'EV', correct: true },
      { id: 'b', text: 'EU', correct: false },
      { id: 'c', text: 'FV', correct: false },
      { id: 'd', text: 'EW', correct: false }
    ],
    explanation: 'First letter goes forward, second goes backward.'
  },

  // === PROCESSING SPEED (4) ===
  {
    id: 'PS1',
    aptitude: 'processing',
    type: 'timed_task',
    difficulty: 'medium',
    timeLimit: 30,
    question: 'Tap the LARGER number as fast as you can.',
    explanation: 'Measures quick numerical comparison.'
  },
  {
    id: 'PS2',
    aptitude: 'processing',
    type: 'timed_task',
    difficulty: 'medium',
    timeLimit: 30,
    question: 'Match identical symbols. Complete as many pairs as possible.',
    explanation: 'Measures visual processing speed.'
  },
  {
    id: 'PS3',
    aptitude: 'processing',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 30,
    question: 'Tap the COLOR of the word, not what it says (Stroop test).',
    explanation: 'Measures cognitive inhibition and speed.'
  },
  {
    id: 'PS4',
    aptitude: 'processing',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 45,
    question: 'Find and tap the target among distractors.',
    explanation: 'Measures visual search speed.'
  },

  // === MEMORY (4) ===
  {
    id: 'M1',
    aptitude: 'memory',
    type: 'sequence',
    difficulty: 'easy',
    question: 'Remember this sequence: 4, 7, 2, 9. Enter it in REVERSE order.',
    options: [
      { id: 'a', text: '9, 2, 7, 4', correct: true },
      { id: 'b', text: '4, 7, 2, 9', correct: false },
      { id: 'c', text: '2, 4, 7, 9', correct: false },
      { id: 'd', text: '9, 7, 4, 2', correct: false }
    ],
    explanation: 'Measures working memory span.'
  },
  {
    id: 'M2',
    aptitude: 'memory',
    type: 'sequence',
    difficulty: 'medium',
    question: 'Remember: B, 3, A, 7, C, 1. Which arrangement shows numbers first (ascending), then letters (alphabetical)?',
    options: [
      { id: 'a', text: '1, 3, 7, A, B, C', correct: true },
      { id: 'b', text: 'A, B, C, 1, 3, 7', correct: false },
      { id: 'c', text: '3, 7, 1, B, A, C', correct: false },
      { id: 'd', text: 'B, 3, A, 7, C, 1', correct: false }
    ],
    explanation: 'Measures complex working memory.'
  },
  {
    id: 'M3',
    aptitude: 'memory',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 60,
    question: '2-Back Task: Press YES if current item matches 2 items ago.',
    explanation: 'Measures active memory updating.'
  },
  {
    id: 'M4',
    aptitude: 'memory',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 45,
    question: 'Mental math (no paper): Start with 47, add 18, subtract 23, multiply by 2. Result?',
    options: [
      { id: 'a', text: '76', correct: false },
      { id: 'b', text: '84', correct: true },
      { id: 'c', text: '92', correct: false },
      { id: 'd', text: '68', correct: false }
    ],
    explanation: '47 + 18 = 65. 65 - 23 = 42. 42 × 2 = 84.'
  },

  // === SPATIAL (4) ===
  {
    id: 'S1',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'easy',
    timeLimit: 30,
    question: 'If you rotate the letter "N" 180 degrees, what do you get?',
    options: [
      { id: 'a', text: 'N', correct: true },
      { id: 'b', text: 'Z', correct: false },
      { id: 'c', text: 'M', correct: false },
      { id: 'd', text: 'W', correct: false }
    ],
    explanation: 'N rotated 180 degrees still looks like N.'
  },
  {
    id: 'S2',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 45,
    question: 'A paper is folded in half once, then a hole is punched. When unfolded, how many holes?',
    options: [
      { id: 'a', text: '1', correct: false },
      { id: 'b', text: '2', correct: true },
      { id: 'c', text: '3', correct: false },
      { id: 'd', text: '4', correct: false }
    ],
    explanation: 'One fold = 2 layers = 2 holes.'
  },
  {
    id: 'S3',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 45,
    question: 'A cube has how many edges?',
    options: [
      { id: 'a', text: '6', correct: false },
      { id: 'b', text: '8', correct: false },
      { id: 'c', text: '12', correct: true },
      { id: 'd', text: '10', correct: false }
    ],
    explanation: 'A cube has 12 edges (4 on top, 4 on bottom, 4 connecting them).'
  },
  {
    id: 'S4',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 60,
    question: 'Count the blocks: Bottom layer 3x3, middle layer 2x2, top layer 1. Total blocks?',
    options: [
      { id: 'a', text: '12', correct: false },
      { id: 'b', text: '14', correct: true },
      { id: 'c', text: '15', correct: false },
      { id: 'd', text: '16', correct: false }
    ],
    explanation: 'Count layer by layer: 9 + 4 + 1 = 14.'
  },

  // === MECHANICAL (4) ===
  {
    id: 'MR1',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'If Gear A turns clockwise, which way does Gear C turn? (A drives B, B drives C)',
    options: [
      { id: 'a', text: 'Clockwise', correct: true },
      { id: 'b', text: 'Counter-clockwise', correct: false },
      { id: 'c', text: "Doesn't move", correct: false },
      { id: 'd', text: 'Cannot determine', correct: false }
    ],
    explanation: 'Gears alternate direction: CW -> CCW -> CW.'
  },
  {
    id: 'MR2',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'A pulley system with 2 pulleys reduces the effort needed by approximately:',
    options: [
      { id: 'a', text: '25%', correct: false },
      { id: 'b', text: '50%', correct: true },
      { id: 'c', text: '75%', correct: false },
      { id: 'd', text: '100%', correct: false }
    ],
    explanation: 'Each pulley in a system doubles mechanical advantage, cutting required effort in half.'
  },
  {
    id: 'MR3',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Lever: 20kg at 2m from fulcrum. Where place 10kg to balance?',
    options: [
      { id: 'a', text: '1m', correct: false },
      { id: 'b', text: '2m', correct: false },
      { id: 'c', text: '4m', correct: true },
      { id: 'd', text: '3m', correct: false }
    ],
    explanation: 'Torque balance: 20×2 = 10×?. ? = 4m.'
  },
  {
    id: 'MR4',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Water flowing through pipes: where is pressure HIGHEST? (Wide section -> Narrow -> Wide)',
    options: [
      { id: 'a', text: 'Wide section', correct: true },
      { id: 'b', text: 'Narrow section', correct: false },
      { id: 'c', text: 'Same everywhere', correct: false },
      { id: 'd', text: 'Depends on flow rate', correct: false }
    ],
    explanation: "Bernoulli's principle: slower flow (wide) = higher pressure."
  },

  // === IDEA GENERATION (4) ===
  {
    id: 'IG1',
    aptitude: 'idea',
    type: 'timed_task',
    difficulty: 'medium',
    timeLimit: 60,
    question: 'List as many unusual uses for a BRICK as you can in 60 seconds.',
    explanation: 'Measures ideation fluency and originality.'
  },
  {
    id: 'IG2',
    aptitude: 'idea',
    type: 'timed_task',
    difficulty: 'medium',
    timeLimit: 90,
    question: 'Coffee shop slow afternoons. Generate promotion ideas. Budget: $500/month.',
    explanation: 'Measures creative problem solving.'
  },
  {
    id: 'IG3',
    aptitude: 'idea',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 60,
    question: 'What if humans only needed 1 hour of sleep? List consequences.',
    explanation: 'Measures consequence elaboration.'
  },
  {
    id: 'IG4',
    aptitude: 'idea',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 90,
    question: 'Combine UMBRELLA + SOCIAL MEDIA into new product ideas.',
    explanation: 'Measures remote association.'
  },

  // === SEQUENTIAL (4) ===
  {
    id: 'SQ1',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'Which is the correct order for ATM withdrawal? 1)Take cash 2)Enter PIN 3)Insert card 4)Select amount 5)Confirm',
    options: [
      { id: 'a', text: '3, 2, 4, 5, 1', correct: true },
      { id: 'b', text: '2, 3, 4, 5, 1', correct: false },
      { id: 'c', text: '3, 4, 2, 5, 1', correct: false },
      { id: 'd', text: '3, 2, 5, 4, 1', correct: false }
    ],
    explanation: 'Insert card, Enter PIN, Select amount, Confirm, Take cash.'
  },
  {
    id: 'SQ2',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'A before B, B before C, D after A but before C. Which order is INVALID?',
    options: [
      { id: 'a', text: 'A, D, B, C', correct: false },
      { id: 'b', text: 'A, B, D, C', correct: false },
      { id: 'c', text: 'D, A, B, C', correct: true },
      { id: 'd', text: 'A, B, C (without D)', correct: false }
    ],
    explanation: 'D must come AFTER A, so D->A is invalid.'
  },
  {
    id: 'SQ3',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 60,
    question: 'Algorithm: X=5. If X<10, double X. If X even, add 3. If X>15, subtract 7. Final X?',
    options: [
      { id: 'a', text: '13', correct: true },
      { id: 'b', text: '10', correct: false },
      { id: 'c', text: '6', correct: false },
      { id: 'd', text: '16', correct: false }
    ],
    explanation: 'X=5 -> 10 (doubled) -> 13 (add 3, since even). 13 < 15, so stop.'
  },
  {
    id: 'SQ4',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Dependencies: E needs B,C. B needs A. D needs A. C needs D. Valid order?',
    options: [
      { id: 'a', text: 'A, B, D, C, E', correct: true },
      { id: 'b', text: 'A, C, D, B, E', correct: false },
      { id: 'c', text: 'B, A, D, C, E', correct: false },
      { id: 'd', text: 'A, D, B, C, E', correct: false }
    ],
    explanation: 'Must satisfy all dependencies: A first, then B and D, then C (needs D), then E (needs B,C).'
  },

  // === INTERPERSONAL (4) ===
  {
    id: 'IP1',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'easy',
    timeLimit: 15,
    question: 'Someone crosses their arms and looks away while you speak. They likely feel:',
    options: [
      { id: 'a', text: 'Engaged and interested', correct: false },
      { id: 'b', text: 'Defensive or closed off', correct: true },
      { id: 'c', text: 'Tired but attentive', correct: false },
      { id: 'd', text: 'Excited to respond', correct: false }
    ],
    explanation: 'Crossed arms and looking away typically signal defensiveness or disengagement.'
  },
  {
    id: 'IP2',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Coworker takes credit for your idea in meeting. Best response?',
    options: [
      { id: 'a', text: 'Call them out publicly', correct: false },
      { id: 'b', text: 'Say nothing', correct: false },
      { id: 'c', text: 'Speak privately first, escalate if needed', correct: true },
      { id: 'd', text: 'Email whole team clarifying', correct: false }
    ],
    explanation: 'Private conversation preserves relationship while addressing the issue.'
  },
  {
    id: 'IP3',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Customer: "This is the THIRD time this happened!" Their primary concern is:',
    options: [
      { id: 'a', text: 'Wants refund', correct: false },
      { id: 'b', text: 'Feels disrespected/unvalued', correct: true },
      { id: 'c', text: 'Needs item urgently', correct: false },
      { id: 'd', text: 'Wants manager', correct: false }
    ],
    explanation: '"Third time" emphasis = feels ignored or not valued.'
  },
  {
    id: 'IP4',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Leading meeting, two members clearly disagreeing, stopped contributing. Best action?',
    options: [
      { id: 'a', text: 'Ignore, move on', correct: false },
      { id: 'b', text: '5-min break, speak to each privately', correct: true },
      { id: 'c', text: "Ask what's wrong in front of everyone", correct: false },
      { id: 'd', text: 'End meeting, reschedule', correct: false }
    ],
    explanation: 'Break allows reset without embarrassment.'
  },

  // === DETAIL (4) ===
  {
    id: 'DO1',
    aptitude: 'detail',
    type: 'timed_task',
    difficulty: 'easy',
    timeLimit: 30,
    question: 'How many differences between these two images?',
    explanation: 'Measures visual attention to detail.'
  },
  {
    id: 'DO2',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 60,
    question: 'How many spelling errors: "The companys quartely report showed a signficant increase in revnue."',
    options: [
      { id: 'a', text: '2', correct: false },
      { id: 'b', text: '3', correct: false },
      { id: 'c', text: '4', correct: true },
      { id: 'd', text: '5', correct: false }
    ],
    explanation: 'Errors: companys (company\'s), quartely (quarterly), signficant (significant), revnue (revenue).'
  },
  {
    id: 'DO3',
    aptitude: 'detail',
    type: 'timed_task',
    difficulty: 'hard',
    timeLimit: 90,
    question: 'Compare two data tables. How many cells differ?',
    explanation: 'Measures data verification accuracy.'
  },
  {
    id: 'DO4',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 45,
    question: 'Which code breaks the pattern? ABC-123, DEF-456, GHI-789, JKL-012, MNP-345',
    options: [
      { id: 'a', text: 'DEF-456', correct: false },
      { id: 'b', text: 'JKL-012', correct: false },
      { id: 'c', text: 'MNP-345', correct: true },
      { id: 'd', text: 'GHI-789', correct: false }
    ],
    explanation: 'MNO not MNP - letter sequence is broken (O skipped).'
  },

  // === RISK ASSESSMENT (4) ===
  {
    id: 'RA1',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'Investment: 80% chance of $1000 gain OR guaranteed $700. Expected value of risky option?',
    options: [
      { id: 'a', text: '$800', correct: true },
      { id: 'b', text: '$1000', correct: false },
      { id: 'c', text: '$700', correct: false },
      { id: 'd', text: '$900', correct: false }
    ],
    explanation: 'Expected value = 0.80 × $1000 = $800.'
  },
  {
    id: 'RA2',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Startup opportunity: quit stable job, 30% success rate, 5x potential return. Best approach?',
    options: [
      { id: 'a', text: 'Take the leap immediately', correct: false },
      { id: 'b', text: 'Never risk stable income', correct: false },
      { id: 'c', text: 'Calculate runway, test part-time first', correct: true },
      { id: 'd', text: 'Flip a coin', correct: false }
    ],
    explanation: 'Calculated risk-taking with mitigation is the optimal approach.'
  },
  {
    id: 'RA3',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Project 50% complete, major issue found. Continue (may fail) or restart (certain delay)?',
    options: [
      { id: 'a', text: 'Always continue - sunk cost', correct: false },
      { id: 'b', text: 'Always restart - quality first', correct: false },
      { id: 'c', text: 'Assess: failure impact vs delay cost', correct: true },
      { id: 'd', text: 'Ask manager to decide', correct: false }
    ],
    explanation: 'Rational risk analysis over heuristics is the best approach.'
  },
  {
    id: 'RA4',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'You can save 100 people for certain OR attempt to save 300 with 50% success (0 if fail). Which has higher expected value?',
    options: [
      { id: 'a', text: 'Save 100 certain (EV=100)', correct: false },
      { id: 'b', text: 'Attempt 300 (EV=150)', correct: true },
      { id: 'c', text: 'Both equal', correct: false },
      { id: 'd', text: 'Cannot calculate', correct: false }
    ],
    explanation: 'EV of risky option = 0.5 × 300 = 150, which is higher than 100.'
  }
];

export function getQuestionsByAptitude(aptitudeId: string): Question[] {
  return QUESTIONS.filter(q => q.aptitude === aptitudeId);
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getAssessmentQuestions(): Question[] {
  // Get all questions and shuffle them
  return shuffleQuestions(QUESTIONS);
}
