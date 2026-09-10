"use client";

const STORAGE_KEY = "excel-master:progress";
const EVENT = "excel-master:progress-change";

export type Progress = Record<string, boolean>;

export function getProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function isLessonComplete(slug: string): boolean {
  return Boolean(getProgress()[slug]);
}

export function setLessonComplete(slug: string, complete: boolean): Progress {
  const progress = getProgress();
  if (complete) progress[slug] = true;
  else delete progress[slug];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable — ignore
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: progress }));
  return progress;
}

export function completedCount(): number {
  return Object.keys(getProgress()).filter((k) => getProgress()[k]).length;
}

export function subscribeProgress(cb: (p: Progress) => void): () => void {
  const handler = (e: Event) => {
    cb((e as CustomEvent<Progress>).detail ?? getProgress());
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
