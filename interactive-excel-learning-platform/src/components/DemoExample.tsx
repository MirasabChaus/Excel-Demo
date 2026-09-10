import type { DemoData } from "@/db/schema";
import { ArrowRight, ListOrdered } from "lucide-react";

export function DemoTable({
  title,
  headers,
  rows,
  accent,
  highlightLastRow,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  accent: string;
  highlightLastRow?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
                  style={i === 0 ? { color: accent } : undefined}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => {
              const last = highlightLastRow && ri === rows.length - 1;
              return (
                <tr
                  key={ri}
                  className={
                    last
                      ? "border-b-0 font-semibold"
                      : ri < rows.length - 1
                        ? "border-b border-slate-100"
                        : ""
                  }
                >
                  {r.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 tabular-nums"
                      style={
                        ci === 0
                          ? { color: accent, fontWeight: 600 }
                          : last
                            ? { background: "#ecfdf5", color: "#047857" }
                            : undefined
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DemoExample({ demo, accent }: { demo: DemoData; accent: string }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <DemoTable
          title={demo.beforeTitle}
          headers={demo.beforeHeaders}
          rows={demo.beforeRows}
          accent={accent}
        />
        <div className="hidden justify-center lg:flex">
          <span
            className="grid size-9 place-items-center rounded-full text-white shadow-sm"
            style={{ background: accent }}
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
        <DemoTable
          title={demo.afterTitle}
          headers={demo.afterHeaders}
          rows={demo.afterRows}
          accent={accent}
          highlightLastRow
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <ListOrdered className="size-4 text-slate-500" />
          How it works, step by step
        </div>
        <ol className="space-y-1.5">
          {demo.steps.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-600">
              <span
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                style={{ background: accent }}
              >
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
