import React from 'react';
import Image from 'next/image';

export const Logo: React.FC<{ className?: string; size?: 'default' | 'small' | 'footer' }> = ({ className = "", size = 'default' }) => {
  const sizeClasses = {
    default: 'w-24 sm:w-32 md:w-40 lg:w-[188px]',
    small: 'w-20 sm:w-24 md:w-28',
    footer: 'w-16 sm:w-20 md:w-24 lg:w-28'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="MŪLA - Huile de Palme Rouge"
        width={188}
        height={49}
        priority
        className={`object-contain rounded-full ${sizeClasses[size]} h-auto`}
      />
    </div>
  );
};

