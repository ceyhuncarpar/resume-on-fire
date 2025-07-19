import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Global className merger with the help of clsx.
 * @param inputs Inputs to merge, can be an array, object or a string. Can have
 * multiple values.
 * @returns Merged className
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Sleep the function for a given amount of time in ms.
 * @param ms Duration of the sleep.
 */
export async function sleep(ms = 1000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}