"use client";

import { useState } from "react";
import { PlaySquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpreadsheetWorkArea from "@/components/SpreadsheetWorkArea";

type SampleKey = "blank" | "sales" | "budget" | "grades";

const SAMPLES: Record<SampleKey, string[][]> = {
  blank: [],
  sales: [
    ["Product", "Units", "Price", "Revenue"],
    ["Pens", "120", "1.5", "=B2*C2"],
    ["Mugs", "80", "4", "=B3*C3"],
    ["Pads", "200", "0.75", "=B4*C4"],
    ["Bags", "55", "12", "=B5*C5"],
    ["Keys", "150", "2.2", "=B6*C6"],
    ["Total", "", "", "=SUM(D2:D6)"],
    ["Average", "", "", "=AVERAGE(D2:D6)"],
  ],
  budget: [
    ["Category", "Budget", "Actual", "Variance"],
    ["Rent", "1200", "1200", "=B2-C2"],
    ["Salaries", "4500", "4400", "=B3-C3"],
    ["Marketing", "800", "1050", "=B4-C4"],
    ["Supplies", "300", "280", "=B5-C5"],
    ["Travel", "500", "620", "=B6-C6"],
    ["Total", "=SUM(B2:B6)", "=SUM(C2:C6)", "=SUM(D2:D6)"],
  ],
  grades: [
    ["Student", "Midterm", "Final", "Average", "Status"],
    ["Ana", "88", "92", "=AVERAGE(B2:C2)", '=IF(D2>=60,"Pass","Fail")'],
    ["Ben", "52", "70", "=AVERAGE(B3:C3)", '=IF(D3>=60,"Pass","Fail")'],
    ["Cal", "76", "64", "=AVERAGE(B4:C4)", '=IF(D4>=60,"Pass","Fail")'],
    ["Dee", "81", "83", "=AVERAGE(B5:C5)", '=IF(D5>=60,"Pass","Fail")'],
    ["Eli", "95", "97", "=AVERAGE(B6:C6)", '=IF(D6>=60,"Pass","Fail")'],
  ],
};

const LABELS: { key: SampleKey; label: string }[] = [
  { key: "blank", label: "Blank sheet" },
  { key: "sales", label: "Sales data" },
  { key: "budget", label: "Budget tracker" },
  { key: "grades", label: "Gradebook" },
];

export default function PlaygroundPage() {
  const [sample, setSample] = useState<SampleKey>("sales");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
            <PlaySquare className="size-4" /> Playground
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Freeform spreadsheet
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Experiment with formulas on a blank canvas. Click any cell, type a
            value or a formula (like <code className="mono text-sm">=SUM(B2:B6)</code>),
            and watch it calculate live.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {LABELS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSample(s.key)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                sample === s.key
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <SpreadsheetWorkArea
            key={sample}
            initialData={SAMPLES[sample]}
            height={560}
            title="Your workspace"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { f: "=SUM(A1:A5)", d: "Add a range of numbers" },
            { f: "=AVERAGE(B2:B9)", d: "Find the mean of a range" },
            { f: '=IF(C2>10,"Yes","No")', d: "Return a value based on a condition" },
            { f: '=CONCAT(A2," ",B2)', d: "Join text from two cells" },
          ].map((t) => (
            <div key={t.f} className="rounded-xl border border-slate-200 bg-white p-4">
              <code className="mono block text-sm font-semibold text-emerald-700">
                {t.f}
              </code>
              <p className="mt-1 text-xs text-slate-500">{t.d}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
