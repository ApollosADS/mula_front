'use client';

import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'color' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-mula-red hover:bg-red-700 text-white',
    secondary: 'bg-mula-green hover:bg-green-800 text-white',
    outline: 'border-2 border-mula-red text-mula-red hover:bg-mula-red hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Pour les variantes simples, utiliser Tailwind
  if (variant === 'primary' || variant === 'secondary' || variant === 'outline' || variant === 'ghost' || variant === 'danger') {
    return (
      <button
        className={cn(
          'font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Pour les cas complexes, utiliser MUI
  return (
    <MUIButton
      variant={variant === 'outline' ? 'outlined' : 'contained'}
      size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium'}
      className={cn(className)}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '8px',
        ...(variant === 'primary' && {
          backgroundColor: '#E00000',
          '&:hover': { backgroundColor: '#B00000' },
        }),
        ...(variant === 'secondary' && {
          backgroundColor: '#009000',
          '&:hover': { backgroundColor: '#007000' },
        }),
      }}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

