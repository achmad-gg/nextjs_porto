import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes conditionally
 * Example: cn("px-4", isActive && "bg-blue-500")
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
