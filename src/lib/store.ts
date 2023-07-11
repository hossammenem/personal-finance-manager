import { writable } from "svelte/store";

export const clickedDate = writable<string | null>(null);
export const billId = writable<string | null>(null);
export const goalStore = writable<Partial<{goalId: string, minPerMonth: number}>>({});
