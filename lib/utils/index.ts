import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge multiple class names with Tailwind CSS specificity handling
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}