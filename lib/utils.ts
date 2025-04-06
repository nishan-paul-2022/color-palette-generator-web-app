import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines if text should be white or black based on background color
 * @param hexColor The background color in hex format
 * @returns "#ffffff" for dark backgrounds, "#000000" for light backgrounds
 */
export function getContrastTextColor(hexColor: string): string {
  // Remove the # if it exists
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1) : hexColor;

  // Convert to RGB
  const r = Number.parseInt(color.substring(0, 2), 16) || 0;
  const g = Number.parseInt(color.substring(2, 4), 16) || 0;
  const b = Number.parseInt(color.substring(4, 6), 16) || 0;

  // Calculate luminance - using the formula for relative luminance in the sRGB color space
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Generates a unique ID for new items
 * @returns A string timestamp-based ID
 */
export function generateId(): string {
  return Date.now().toString();
}
