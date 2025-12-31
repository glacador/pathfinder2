'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-[14px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:scale-[1.02]';

    const variants = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[#0066d6]',
      secondary:
        'bg-[var(--fill-tertiary)] text-[var(--label-primary)] hover:bg-[var(--fill-secondary)]',
      ghost:
        'bg-transparent text-[var(--color-primary)] hover:bg-[var(--fill-quaternary)]',
      danger: 'bg-[var(--color-error)] text-white hover:bg-[#e0342a]'
    };

    const sizes = {
      sm: 'min-h-[36px] px-4 text-[15px]',
      md: 'min-h-[44px] px-6 text-[17px]',
      lg: 'min-h-[52px] px-8 text-[18px]'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
