import { jsPDF } from 'jspdf';
import { EssentialReport, AptitudeId } from '@/types';
import { APTITUDES } from '@/data/aptitudes';

export async function generateEssentialPDF(
  userName: string,
  aptitudeScores: Record<AptitudeId, number>,
  cognitiveProfile: string,
  famousMindName: string,
  famousMindTitle: string,
  topCareers: Array<{ title: string; matchScore: number }>
): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Colors
  const primaryColor: [number, number, number] = [0, 122, 255];
  const textPrimary: [number, number, number] = [0, 0, 0];
  const textSecondary: [number, number, number] = [100, 100, 100];

  // Cover Page
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 0, pageWidth, 297, 'F');

  doc.setFontSize(32);
  doc.setTextColor(...primaryColor);
  doc.text('PathFinder', pageWidth / 2, 50, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(...textSecondary);
  doc.text('Career Aptitude Assessment', pageWidth / 2, 65, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(...textPrimary);
  doc.text(`Prepared for ${userName}`, pageWidth / 2, 100, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(...textSecondary);
  doc.text(new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }), pageWidth / 2, 115, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('ESSENTIAL REPORT', pageWidth / 2, 140, { align: 'center' });

  // Page 2: Cognitive Profile
  doc.addPage();

  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('Your Cognitive Profile', 20, 30);

  doc.setFontSize(12);
  doc.setTextColor(...textPrimary);

  // Wrap text for cognitive profile
  const splitProfile = doc.splitTextToSize(cognitiveProfile, pageWidth - 40);
  doc.text(splitProfile, 20, 50);

  // Famous Mind Match
  const profileEndY = 50 + splitProfile.length * 7;
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('You Think Like...', 20, profileEndY + 20);

  doc.setFontSize(16);
  doc.setTextColor(...textPrimary);
  doc.text(famousMindName, 20, profileEndY + 35);

  doc.setFontSize(12);
  doc.setTextColor(...textSecondary);
  doc.text(famousMindTitle, 20, profileEndY + 45);

  // Page 3: Aptitude Scores
  doc.addPage();

  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('Aptitude Scores', 20, 30);

  let yPos = 50;
  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (aptitudeScores[b.id] || 0) - (aptitudeScores[a.id] || 0)
  );

  sortedAptitudes.forEach((apt) => {
    const score = aptitudeScores[apt.id] || 0;

    doc.setFontSize(12);
    doc.setTextColor(...textPrimary);
    doc.text(apt.name, 20, yPos);

    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(`${score}`, pageWidth - 30, yPos);

    // Draw progress bar
    doc.setFillColor(230, 230, 230);
    doc.rect(20, yPos + 3, pageWidth - 50, 4, 'F');

    doc.setFillColor(...primaryColor);
    doc.rect(20, yPos + 3, ((pageWidth - 50) * score) / 100, 4, 'F');

    yPos += 18;
  });

  // Page 4: Top Career Matches
  doc.addPage();

  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('Top Career Matches', 20, 30);

  yPos = 50;
  topCareers.slice(0, 10).forEach((career, index) => {
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text(`#${index + 1}`, 20, yPos);

    doc.setFontSize(12);
    doc.setTextColor(...textPrimary);
    doc.text(career.title, 40, yPos);

    doc.setTextColor(...primaryColor);
    doc.text(`${career.matchScore}%`, pageWidth - 30, yPos);

    yPos += 15;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(...textSecondary);
    doc.text(
      `PathFinder Essential Report | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      287,
      { align: 'center' }
    );
  }

  return doc.output('blob');
}

export async function downloadPDF(blob: Blob, filename: string): Promise<void> {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
