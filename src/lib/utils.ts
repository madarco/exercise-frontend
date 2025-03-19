import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPopulation(value: number) {
  if (!value) {
    return null;
  }
  if (Number.isNaN(value)) {
    return value;
  }
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " Billion";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + " Million";
  } else if (value >= 1_000) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return value.toString();
}