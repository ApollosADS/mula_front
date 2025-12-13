'use client';

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { cn } from '@/lib/utils';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'default' | 'outlined' | 'filled';
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  // Version Tailwind simple pour cas basiques
  if (variant === 'default') {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300',
            'focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent',
            'transition-all duration-200 bg-gray-50 focus:bg-white',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...(props as any)}
        />
        {helperText && (
          <p className={cn('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // Version MUI pour cas complexes (outlined, filled, avec validation avancée)
  return (
    <TextField
      variant={(variant === 'outlined' ? 'outlined' : variant === 'filled' ? 'filled' : 'standard') as TextFieldVariant}
      label={label}
      error={error}
      helperText={helperText}
      className={cn('w-full', className)}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          '&:hover fieldset': {
            borderColor: '#E00000',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#E00000',
          },
        },
        '& .MuiFilledInput-root': {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(224, 0, 0, 0.04)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(224, 0, 0, 0.08)',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#E00000',
        },
      }}
      {...props}
    />
  );
};

// Composants spécialisés
export const TextInput: React.FC<InputProps & { type?: 'text' | 'email' | 'tel' | 'password' }> = (props) => (
  <Input {...props} />
);

export const TextArea: React.FC<InputProps & { rows?: number }> = ({ rows = 4, ...props }) => {
  if (props.variant === 'default') {
    return (
      <div className="w-full">
        {props.label && (
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {props.label}
          </label>
        )}
        <textarea
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300',
            'focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent',
            'transition-all duration-200 bg-gray-50 focus:bg-white resize-none',
            props.error && 'border-red-500 focus:ring-red-500',
            props.className
          )}
          {...(props as any)}
        />
        {props.helperText && (
          <p className={cn('mt-2 text-sm', props.error ? 'text-red-600' : 'text-gray-500')}>
            {props.helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <TextField
      multiline
      rows={rows}
      variant={(props.variant === 'outlined' ? 'outlined' : props.variant === 'filled' ? 'filled' : 'standard') as TextFieldVariant}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        ...props.sx,
      }}
    />
  );
};

export const Select: React.FC<InputProps & { options: { value: string; label: string }[] }> = ({
  options,
  ...props
}) => {
  if (props.variant === 'default') {
    return (
      <div className="w-full">
        {props.label && (
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {props.label}
          </label>
        )}
        <select
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300',
            'focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent',
            'transition-all duration-200 bg-gray-50 focus:bg-white',
            props.error && 'border-red-500 focus:ring-red-500',
            props.className
          )}
          {...(props as any)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {props.helperText && (
          <p className={cn('mt-2 text-sm', props.error ? 'text-red-600' : 'text-gray-500')}>
            {props.helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <TextField
      select
      SelectProps={{
        native: true,
      }}
      variant={(props.variant === 'outlined' ? 'outlined' : props.variant === 'filled' ? 'filled' : 'standard') as TextFieldVariant}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

