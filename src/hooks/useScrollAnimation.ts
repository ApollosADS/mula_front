'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!options?.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { elementRef, isVisible };
}

