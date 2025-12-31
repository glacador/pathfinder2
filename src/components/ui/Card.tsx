'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-[22px] overflow-hidden';

    const variants = {
      default:
        'bg-[var(--bg-primary)] border border-[var(--fill-quaternary)] shadow-sm',
      glass:
        'glass',
      elevated:
        'bg-[var(--bg-primary)] shadow-lg shadow-black/5 border border-[var(--fill-quaternary)]'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverStyles = hover
      ? 'hover:shadow-md hover:border-[var(--fill-secondary)] cursor-pointer transition-all duration-200'
      : '';

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -2 } : undefined}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
