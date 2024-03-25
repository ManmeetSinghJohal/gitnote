import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCreateTypeColor(createType: string) {
  const colorMap: { [key: string]: string } = {
    component: "text-purple-500 bg-purple-500/10",
    workFlow: "text-primary1-500 bg-primary1-500/10",
    knowledge: "text-green-500 bg-green-500/10",
  };

  return colorMap[createType] || "text-primary1-500 bg-primary1-500/10";
}

  export function capitalizeFirstLetter(string: string): string {
    return string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";
  }
