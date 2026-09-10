"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { isLessonComplete, setLessonComplete } from "@/lib/progress";

export default function MarkCompleteButton({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isLessonComplete(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !done;
        setDone(next);
        setLessonComplete(slug, next);
      }}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
        done
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {done ? (
        <>
          <CheckCircle2 className="size-4" /> Completed
        </>
      ) : (
        <>
          <Circle className="size-4" /> Mark as complete
        </>
      )}
    </button>
  );
}
