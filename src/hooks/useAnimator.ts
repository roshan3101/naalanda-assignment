import { useState, useEffect, useCallback, useRef } from 'react';
import type { BSTStep } from '../types';

export function useAnimator(
  steps: BSTStep[], 
  initialSpeed = 800, 
  onStepChange?: (step: BSTStep, index: number) => void
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length && onStepChange) {
      onStepChange(steps[currentStepIndex], currentStepIndex);
    }
  }, [currentStepIndex, steps, onStepChange]);

  const next = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) return prev + 1;
      setIsPlaying(false);
      return prev;
    });
  }, [steps.length]);

  const prev = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > -1 ? prev - 1 : prev));
  }, []);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        next();
      }, speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed, next]);

  return {
    currentStep: currentStepIndex >= 0 ? steps[currentStepIndex] : null,
    currentStepIndex,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    next,
    prev,
    reset,
    totalSteps: steps.length
  };
}
