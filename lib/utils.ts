import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge
 * Helps avoid Tailwind conflicts when conditionally applying classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}