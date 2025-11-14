import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the filename from a URL string and removes everything before the first hyphen
 * @param url - The URL string to extract the filename from
 * @returns The filename extracted from the URL (with everything before the first hyphen removed), or an empty string if extraction fails
 */
export function getFilenameFromUrl(url: string): string {
  try {
    const urlPath = new URL(url).pathname;
    const filename = urlPath.split('/').pop() || '';
    
    // Remove everything before and including the first hyphen
    const hyphenIndex = filename.indexOf('-');
    if (hyphenIndex !== -1) {
      return filename.substring(hyphenIndex + 1);
    }
    
    return filename;
  } catch {
    // If URL parsing fails, try to extract from the string directly
    const parts = url.split('/');
    const filename = parts[parts.length - 1] || '';
    
    // Remove everything before and including the first hyphen
    const hyphenIndex = filename.indexOf('-');
    if (hyphenIndex !== -1) {
      return filename.substring(hyphenIndex + 1);
    }
    
    return filename;
  }
}

