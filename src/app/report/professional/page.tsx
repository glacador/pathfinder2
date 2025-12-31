'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Linkedin,
  Mail,
  MessageSquare,
  DollarSign,
  Users,
  CheckCircle,
  Brain,
  Copy
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { AptitudeRadar, CareerCard } from '@/components/results';
import ReportHeader from '@/components/report/ReportHeader';
import { useAssessment } from '@/contexts/AssessmentContext';
import { APTITUDES } from '@/data/aptitudes';
import { findFamousMindMatch, generateCognitiveProfileSummary, getSalaryData } from '@/data/careers';
import { AptitudeId, CareerMatch, FamousMind } from '@/types';

interface StoredResults {
  results: {
    aptitudeScores: Record<AptitudeId, number>;
    userName: string;
  };
  careerMatches: CareerMatch[];
  famousMind: FamousMind;
  cognitiveProfile: string;
}

export default function ProfessionalReportPage() {
  const router = useRouter();
  const { results, careerMatches } = useAssessment();
  const [storedData, setStoredData] = useState<StoredResults | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    const tier = localStorage.getItem('pathfinder_tier');
    if (tier !== 'professional') {
      router.push('/results');
      return;
    }

    if (!results) {
      try {
        const stored = localStorage.getItem('pathfinder_results');
        if (stored) {
          setStoredData(JSON.parse(stored));
        } else {
          router.push('/');
        }
      } catch {
        router.push('/');
      }
    }
  }, [results, router]);

  const aptitudeScores = results?.aptitudeScores || storedData?.results?.aptitudeScores;
  const matches = careerMatches.length > 0 ? careerMatches : storedData?.careerMatches || [];
  const userName = results?.userName || storedData?.results?.userName || 'User';

  const famousMind = aptitudeScores ? findFamousMindMatch(aptitudeScores) : storedData?.famousMind;
  const cognitiveProfile = aptitudeScores ? generateCognitiveProfileSummary(aptitudeScores) : storedData?.cognitiveProfile;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  if (!aptitudeScores) {
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

  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (aptitudeScores[b.id] || 0) - (aptitudeScores[a.id] || 0)
  );
  const topStrengths = sortedAptitudes.slice(0, 3);

  // Resume bullets for top career
  const resumeBullets = [
    `Led cross-functional initiatives leveraging strong ${topStrengths[0]?.name.toLowerCase()} to deliver measurable results`,
    `Applied analytical ${topStrengths[1]?.name.toLowerCase()} to optimize processes and improve efficiency by [X]%`,
    `Collaborated with stakeholders using strong ${topStrengths[2]?.name.toLowerCase()} to align on strategic priorities`,
    `Developed innovative solutions through creative problem-solving and systematic analysis`,
    `Managed multiple priorities while maintaining attention to detail and quality standards`
  ];

  // LinkedIn templates
  const linkedInHeadlines = [
    `${matches[0]?.career.title || 'Professional'} | ${topStrengths[0]?.name} Expert`,
    `Experienced ${matches[0]?.career.category} Professional | Driving Results Through ${topStrengths[0]?.shortName}`,
    `${topStrengths[0]?.name} + ${topStrengths[1]?.name} | ${matches[0]?.career.title}`
  ];

  const linkedInSummary = `Results-driven professional with demonstrated expertise in ${topStrengths[0]?.name.toLowerCase()} and ${topStrengths[1]?.name.toLowerCase()}. Passionate about leveraging these strengths to drive meaningful outcomes in ${matches[0]?.career.category.toLowerCase()} roles. Known for combining analytical thinking with creative problem-solving to tackle complex challenges.

Key Strengths:
- ${topStrengths[0]?.name}: ${topStrengths[0]?.description}
- ${topStrengths[1]?.name}: ${topStrengths[1]?.description}
- ${topStrengths[2]?.name}: ${topStrengths[2]?.description}

Open to opportunities in ${matches[0]?.career.title}, ${matches[1]?.career.title}, or related roles.`;

  // Interview questions
  const interviewQuestions = [
    {
      question: 'Tell me about a time you used your analytical skills to solve a problem.',
      answer: `In my previous role, I leveraged my ${topStrengths[0]?.name.toLowerCase()} to analyze [specific situation]. I identified the root cause by [method] and implemented a solution that resulted in [measurable outcome]. This experience reinforced my natural ability to break down complex problems systematically.`
    },
    {
      question: 'How do you handle competing priorities?',
      answer: `My ${topStrengths[2]?.name.toLowerCase()} helps me evaluate priorities objectively. I typically [method], ensuring alignment with strategic goals while maintaining flexibility for urgent matters. For example, [specific example].`
    },
    {
      question: 'Describe your ideal work environment.',
      answer: `Based on my cognitive profile, I thrive in environments that value ${topStrengths[0]?.name.toLowerCase()} and provide opportunities to [specific activities related to their strengths]. I'm most productive when I can [preference based on profile].`
    }
  ];

  // Salary negotiation scripts
  const salaryScripts = {
    initial: `Thank you for the offer. I'm excited about this opportunity. Before I give you a final answer, I'd like to discuss the compensation package. Based on my research and the value I bring with my strong ${topStrengths[0]?.name.toLowerCase()} and ${topStrengths[1]?.name.toLowerCase()}, I was expecting something in the range of [target salary]. Is there flexibility here?`,
    counter: `I appreciate you sharing those details. I understand budget constraints, but given my demonstrated expertise in ${topStrengths[0]?.name.toLowerCase()} and track record of delivering results, I believe [counter offer] would better reflect the value I'll bring. Would you be able to meet me at this level?`,
    benefits: `If there's limited flexibility on base salary, I'd be open to discussing other forms of compensation—perhaps a signing bonus, additional PTO, flexible work arrangements, or a performance-based bonus structure. What options might be available?`
  };

  // Networking templates
  const networkingTemplates = {
    coldEmail: `Subject: ${matches[0]?.career.category} Professional Seeking Career Insights

Hi [Name],

I came across your profile while researching careers in ${matches[0]?.career.category.toLowerCase()} and was impressed by your background at [Company].

I'm currently exploring a transition into ${matches[0]?.career.title.toLowerCase()} roles, leveraging my strengths in ${topStrengths[0]?.name.toLowerCase()} and ${topStrengths[1]?.name.toLowerCase()}.

Would you have 15-20 minutes for a brief call to share your insights about the field? I'd love to hear about your experience and any advice you might have for someone entering this space.

Thank you for your time,
${userName}`,
    linkedInConnect: `Hi [Name], I noticed you work in ${matches[0]?.career.category} and I'm very interested in learning more about the field. I'm currently exploring ${matches[0]?.career.title.toLowerCase()} roles and would value connecting with professionals in this space. Would love to connect!`,
    followUp: `Hi [Name],

Thank you so much for taking the time to speak with me [timeframe]. Your insights about ${matches[0]?.career.category.toLowerCase()} were incredibly valuable.

I particularly appreciated your advice about [specific point]. I've already started implementing your suggestion to [action].

I'll keep you updated on my progress. If there's ever anything I can do to help you, please don't hesitate to reach out.

Best regards,
${userName}`
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ReportHeader
          userName={userName}
          tier="professional"
          generatedAt={new Date()}
          onDownload={() => alert('PDF download would start here')}
        />

        {/* Cognitive Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-warning)]/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[var(--color-warning)]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-3">
                  Your Cognitive Profile
                </h2>
                <p className="text-[var(--label-secondary)] leading-relaxed">
                  {cognitiveProfile}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Radar and Famous Mind */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card variant="glass" className="p-6">
            <AptitudeRadar scores={aptitudeScores} size="lg" />
          </Card>
          <Card variant="glass" className="p-6">
            {famousMind && (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-warning)] to-[var(--color-error)] flex items-center justify-center text-3xl font-bold text-white">
                  {famousMind.name[0]}
                </div>
                <h3 className="text-xl font-bold text-[var(--label-primary)] mb-1">
                  {famousMind.name}
                </h3>
                <p className="text-[var(--color-primary)] font-medium mb-3">
                  {famousMind.title}
                </p>
                <p className="text-sm text-[var(--label-secondary)]">
                  {famousMind.description}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Resume Bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Resume Bullets for {matches[0]?.career.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--label-tertiary)] mb-4">
              Click to copy any bullet point. Customize the [bracketed] sections with your specific achievements.
            </p>
            <div className="space-y-3">
              {resumeBullets.map((bullet, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)] transition-colors"
                  onClick={() => handleCopy(bullet, `bullet-${i}`)}
                >
                  <CheckCircle className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                  <span className="flex-1 text-sm text-[var(--label-secondary)]">{bullet}</span>
                  {copiedItem === `bullet-${i}` ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* LinkedIn Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                LinkedIn Optimization
              </h2>
            </div>

            {/* Headlines */}
            <div className="mb-6">
              <h3 className="font-medium text-[var(--label-primary)] mb-3">Headline Options</h3>
              <div className="space-y-2">
                {linkedInHeadlines.map((headline, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                    onClick={() => handleCopy(headline, `headline-${i}`)}
                  >
                    <span className="text-sm text-[var(--label-secondary)]">{headline}</span>
                    {copiedItem === `headline-${i}` ? (
                      <span className="text-xs text-[var(--color-success)]">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-medium text-[var(--label-primary)] mb-3">Summary Template</h3>
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(linkedInSummary, 'summary')}
              >
                <pre className="text-sm text-[var(--label-secondary)] whitespace-pre-wrap font-sans">
                  {linkedInSummary}
                </pre>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'summary' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Interview Prep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-[var(--color-purple)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Interview Questions & Answers
              </h2>
            </div>
            <div className="space-y-6">
              {interviewQuestions.map((qa, i) => (
                <div key={i} className="p-4 bg-[var(--fill-quaternary)] rounded-xl">
                  <h4 className="font-medium text-[var(--label-primary)] mb-3">
                    Q: {qa.question}
                  </h4>
                  <div
                    className="p-3 bg-[var(--bg-primary)] rounded-lg cursor-pointer hover:bg-[var(--fill-quaternary)]"
                    onClick={() => handleCopy(qa.answer, `qa-${i}`)}
                  >
                    <p className="text-sm text-[var(--label-secondary)]">{qa.answer}</p>
                    <div className="flex justify-end mt-2">
                      {copiedItem === `qa-${i}` ? (
                        <span className="text-xs text-[var(--color-success)]">Copied!</span>
                      ) : (
                        <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Salary Negotiation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-[var(--color-success)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Salary Negotiation Scripts
              </h2>
            </div>
            <div className="space-y-4">
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(salaryScripts.initial, 'salary-initial')}
              >
                <h4 className="font-medium text-[var(--label-primary)] mb-2">Initial Response</h4>
                <p className="text-sm text-[var(--label-secondary)]">{salaryScripts.initial}</p>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'salary-initial' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(salaryScripts.counter, 'salary-counter')}
              >
                <h4 className="font-medium text-[var(--label-primary)] mb-2">Counter Offer</h4>
                <p className="text-sm text-[var(--label-secondary)]">{salaryScripts.counter}</p>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'salary-counter' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(salaryScripts.benefits, 'salary-benefits')}
              >
                <h4 className="font-medium text-[var(--label-primary)] mb-2">Negotiating Benefits</h4>
                <p className="text-sm text-[var(--label-secondary)]">{salaryScripts.benefits}</p>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'salary-benefits' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Networking Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[var(--color-indigo)]" />
              <h2 className="text-xl font-semibold text-[var(--label-primary)]">
                Networking Outreach Templates
              </h2>
            </div>
            <div className="space-y-4">
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(networkingTemplates.coldEmail, 'net-cold')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                  <h4 className="font-medium text-[var(--label-primary)]">Cold Email Template</h4>
                </div>
                <pre className="text-sm text-[var(--label-secondary)] whitespace-pre-wrap font-sans">
                  {networkingTemplates.coldEmail}
                </pre>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'net-cold' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(networkingTemplates.linkedInConnect, 'net-li')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <h4 className="font-medium text-[var(--label-primary)]">LinkedIn Connection Request</h4>
                </div>
                <p className="text-sm text-[var(--label-secondary)]">
                  {networkingTemplates.linkedInConnect}
                </p>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'net-li' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
              <div
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl cursor-pointer hover:bg-[var(--fill-tertiary)]"
                onClick={() => handleCopy(networkingTemplates.followUp, 'net-follow')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[var(--color-success)]" />
                  <h4 className="font-medium text-[var(--label-primary)]">Follow-Up Email</h4>
                </div>
                <pre className="text-sm text-[var(--label-secondary)] whitespace-pre-wrap font-sans">
                  {networkingTemplates.followUp}
                </pre>
                <div className="flex justify-end mt-2">
                  {copiedItem === 'net-follow' ? (
                    <span className="text-xs text-[var(--color-success)]">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--label-tertiary)]" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top Careers Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--label-primary)] mb-6">
              Your Top Career Matches
            </h2>
            <div className="space-y-4">
              {matches.slice(0, 10).map((match, i) => (
                <CareerCard
                  key={match.career.id}
                  careerMatch={match}
                  rank={i + 1}
                  showDetails={i < 3}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
