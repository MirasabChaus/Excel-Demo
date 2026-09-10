"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, Clock } from "lucide-react";
import { getProgress, subscribeProgress } from "@/lib/progress";

export type SidebarLesson = {
  slug: string;
  title: string;
  durationMin: number;
};

export default function LessonSidebar({
  moduleTitle,
  moduleSlug,
  accent,
  lessons,
  currentSlug,
}: {
  moduleTitle: string;
  moduleSlug: string;
  accent: string;
  lessons: SidebarLesson[];
  currentSlug: string;
}) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgress());
    return subscribeProgress((p) => setProgress(p));
  }, []);

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div
          className="flex items-center gap-2 px-4 py-3 text-white"
          style={{ background: accent }}
        >
          <span className="text-xs font-medium uppercase tracking-wide text-white/80">
            Module
          </span>
          <span className="text-sm font-semibold">{moduleTitle}</span>
        </div>
        <nav className="max-h-[60vh] overflow-y-auto p-2">
          {lessons.map((l, i) => {
            const active = l.slug === currentSlug;
            const done = Boolean(progress[l.slug]);
            return (
              <Link
                key={l.slug}
                href={`/learn/${moduleSlug}/${l.slug}`}
                className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                  active
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    done
                      ? "text-white"
                      : active
                        ? "text-white"
                        : "bg-slate-100 text-slate-500"
                  }`}
                  style={
                    done || active ? { background: accent } : undefined
                  }
                >
                  {done ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block leading-snug">{l.title}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="size-3" />
                    {l.durationMin} min
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-2">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ChevronLeft className="size-4" />
            All modules
          </Link>
        </div>
      </div>
    </aside>
  );
}
