import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single class string using clsx and tailwind-merge.
 * This is useful for combining Tailwind CSS classes with Ant Design classes.
 *
 * @param inputs - Class values to be combined
 * @returns Merged class string
 *
 * @example
 * // Example usage:
 * <Button className={cn('custom-tailwind-class', {'conditional-class': condition})}>
 *   Button Text
 * </Button>
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Combines Ant Design style objects with an optional className string.
 * Useful for adding style objects to Ant Design components along with Tailwind classes.
 *
 * @param style - The style object to apply
 * @param className - Optional className string to append
 * @returns An object with style and className properties
 *
 * @example
 * // Example usage:
 * <DatePicker {...withAntStyle({ width: '100%' }, 'my-tailwind-class')} />
 */
export function withAntStyle(style: React.CSSProperties = {}, className?: string) {
  return {
    style,
    className,
  };
}
