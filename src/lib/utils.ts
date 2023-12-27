import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInputElementByName(name: string) {
    return document.getElementsByName(name)[0] as HTMLInputElement;
}
