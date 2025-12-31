import type { Metadata } from 'next';
import './globals.css';
import { AssessmentProvider } from '@/contexts/AssessmentContext';

export const metadata: Metadata = {
  title: 'PathFinder - Discover Your Ideal Career',
  description:
    'Take the PathFinder aptitude assessment to discover careers that match your unique cognitive profile. 12 aptitudes, 150+ career matches.',
  keywords: [
    'career assessment',
    'aptitude test',
    'career matching',
    'cognitive abilities',
    'career planning'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
