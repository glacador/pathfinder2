'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'warning' | 'danger';
  className?: string;
}

export default function Timer({
  duration,
  onComplete,
  onTick,
  autoStart = true,
  showIcon = true,
  size = 'md',
  className = ''
}: TimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining, onComplete, onTick]);

  const getVariant = () => {
    const percentRemaining = (remaining / duration) * 100;
    if (percentRemaining <= 20) return 'danger';
    if (percentRemaining <= 40) return 'warning';
    return 'default';
  };

  const variant = getVariant();

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const variants = {
    default: 'text-[var(--label-primary)]',
    warning: 'text-[var(--color-warning)]',
    danger: 'text-[var(--color-error)]'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.div
      className={`flex items-center gap-2 font-mono font-semibold ${sizes[size]} ${variants[variant]} ${className}`}
      animate={
        variant === 'danger'
          ? { scale: [1, 1.05, 1] }
          : undefined
      }
      transition={
        variant === 'danger'
          ? { repeat: Infinity, duration: 0.5 }
          : undefined
      }
    >
      {showIcon && <Clock className={iconSizes[size]} />}
      <span>{formatTime(remaining)}</span>
    </motion.div>
  );
}

export function useTimer(duration: number, autoStart = false) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRemaining(duration);
    setIsRunning(false);
    setIsComplete(false);
  }, [duration]);

  return {
    remaining,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    percentage: (remaining / duration) * 100
  };
}
