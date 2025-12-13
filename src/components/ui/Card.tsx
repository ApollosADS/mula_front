'use client';

import React from 'react';
import { Card as MUICard, CardProps as MUICardProps, CardContent as MUICardContent, CardHeader as MUICardHeader, CardActions as MUICardActions } from '@mui/material';
import { cn } from '@/lib/utils';

interface CardProps extends Omit<MUICardProps, 'variant'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children,
  header,
  actions,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-100 shadow-card',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50 border border-gray-100',
  };

  // Version Tailwind simple
  if (variant === 'default' || variant === 'elevated' || variant === 'outlined' || variant === 'filled') {
    return (
      <div
        className={cn(
          'rounded-xl overflow-hidden transition-all duration-200',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-gray-100">
            {header}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
        {actions && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            {actions}
          </div>
        )}
      </div>
    );
  }

  // Version MUI pour cas complexes
  return (
    <MUICard
      variant={variant === 'elevated' ? 'elevation' : variant === 'outlined' ? 'outlined' : 'elevation'}
      className={cn(className)}
      sx={{
        borderRadius: '12px',
        boxShadow: variant === 'elevated' ? 4 : 1,
      }}
      {...props}
    >
      {header && <MUICardHeader>{header}</MUICardHeader>}
      <MUICardContent>{children}</MUICardContent>
      {actions && <MUICardActions>{actions}</MUICardActions>}
    </MUICard>
  );
};

// Composants Card simplifiés
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

export const CardActions: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-2', className)}>
    {children}
  </div>
);

