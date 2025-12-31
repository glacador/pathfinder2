'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { APTITUDES } from '@/data/aptitudes';
import { AptitudeId } from '@/types';

interface AptitudeRadarProps {
  scores: Record<AptitudeId, number>;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AptitudeRadar({
  scores,
  showLabels = true,
  size = 'md'
}: AptitudeRadarProps) {
  const data = APTITUDES.map((apt) => ({
    aptitude: apt.shortName,
    fullName: apt.name,
    score: scores[apt.id] || 0,
    fullMark: 100
  }));

  const heights = {
    sm: 200,
    md: 300,
    lg: 400
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { fullName: string; score: number } }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass p-3 rounded-xl">
          <p className="font-semibold text-[var(--label-primary)]">
            {item.fullName}
          </p>
          <p className="text-sm text-[var(--label-secondary)]">
            Score: <span className="font-mono font-bold text-[var(--color-primary)]">{item.score}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={heights[size]}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid
            stroke="var(--fill-secondary)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="aptitude"
            tick={{
              fill: 'var(--label-secondary)',
              fontSize: size === 'sm' ? 10 : 12
            }}
            tickLine={false}
          />
          {showLabels && (
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'var(--label-tertiary)', fontSize: 10 }}
              tickCount={5}
              axisLine={false}
            />
          )}
          <Radar
            name="Score"
            dataKey="score"
            stroke="#007AFF"
            fill="#007AFF"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
