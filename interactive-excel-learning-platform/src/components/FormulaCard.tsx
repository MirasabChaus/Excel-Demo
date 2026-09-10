import { Sigma } from "lucide-react";

export default function FormulaCard({
  formula,
  explanation,
  accent,
}: {
  formula: string;
  explanation: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-md sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
          style={{ background: accent }}
        >
          <Sigma className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Formula to learn
          </p>
          <code className="mono mt-0.5 block break-all text-lg font-semibold text-emerald-300 sm:text-xl">
            {formula}
          </code>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-300 sm:border-l sm:border-slate-700 sm:pl-5">
        {explanation}
      </p>
    </div>
  );
}
