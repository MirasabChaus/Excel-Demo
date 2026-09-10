import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Grid3X3,
  PlaySquare,
  Table2,
  Video,
  CheckCircle2,
  Sigma,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getAllModules, getAllLessons } from "@/db/queries";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    icon: Video,
    title: "Watch the demo video",
    text: "Every lesson links to a hand-picked tutorial that explains the concept in plain language.",
  },
  {
    icon: Table2,
    title: "Study side-by-side examples",
    text: "See the raw data next to the result, with a step-by-step walkthrough of how the formula works.",
  },
  {
    icon: Sigma,
    title: "Practice in a live sheet",
    text: "Type formulas into a real spreadsheet right in your browser and check your answers instantly.",
  },
];

export default async function HomePage() {
  const [modules, lessons] = await Promise.all([
    getAllModules(),
    getAllLessons(),
  ]);
  const lessonCounts = lessons.reduce<Record<number, number>>((acc, l) => {
    acc[l.moduleId] = (acc[l.moduleId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="grid-bg absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 20% 10%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(50% 70% at 90% 20%, rgba(37,99,235,0.22), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Grid3X3 className="size-3.5" />
              Basic → Advanced · built for the latest Excel
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master Excel,{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                one formula
              </span>{" "}
              at a time.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Learn everything from your first cell to pivot tables and dynamic
              arrays — with demo videos, side-by-side examples, and a built-in
              live spreadsheet to practice in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                Start learning <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <PlaySquare className="size-4" /> Open playground
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { k: `${lessons.length}`, v: "Lessons" },
                { k: `${modules.length}`, v: "Levels" },
                { k: "Live", v: "Spreadsheet" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-bold text-white">{s.k}</dt>
                  <dd className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mock spreadsheet */}
          <div className="animate-fade-up rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur">
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <span className="mono ml-2 rounded bg-white/10 px-2 py-0.5 text-xs text-slate-300">
                =SUM(B2:B6)
              </span>
            </div>
            <div className="overflow-hidden rounded-lg">
              <div className="grid grid-cols-[2rem_1fr_1fr_1fr] text-center text-xs">
                <div className="border border-white/10 bg-white/5 py-1.5 text-slate-400" />
                <div className="border border-white/10 bg-white/5 py-1.5 font-semibold text-slate-300">A</div>
                <div className="border border-white/10 bg-white/5 py-1.5 font-semibold text-slate-300">B</div>
                <div className="border border-white/10 bg-white/5 py-1.5 font-semibold text-slate-300">C</div>
              </div>
              {[
                ["1", "Month", "Sales", "Flag"],
                ["2", "Jan", "120", "Normal"],
                ["3", "Feb", "90", "Normal"],
                ["4", "Mar", "150", "High"],
                ["5", "Apr", "110", "Normal"],
                ["6", "May", "130", "High"],
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2rem_1fr_1fr_1fr] text-center text-xs"
                >
                  <div className="border border-white/10 bg-white/5 py-1.5 text-slate-500">{row[0]}</div>
                  <div className="border border-white/10 py-1.5 text-slate-200">{row[1]}</div>
                  <div className="border border-white/10 py-1.5 tabular-nums text-slate-200">{row[2]}</div>
                  <div
                    className={`border border-white/10 py-1.5 font-medium ${
                      row[3] === "High" ? "text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    {row[3]}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[2rem_1fr_1fr_1fr] text-center text-xs">
                <div className="border border-white/10 bg-white/5 py-1.5 text-slate-500">7</div>
                <div className="border border-white/10 py-1.5 font-semibold text-slate-200">Total</div>
                <div className="border border-emerald-400/40 bg-emerald-400/15 py-1.5 font-bold tabular-nums text-emerald-300">
                  600
                </div>
                <div className="border border-white/10 py-1.5 text-slate-500">—</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Learn by watching, reading &amp; doing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            A structured path that gets you typing real formulas from day one.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <s.icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                A clear path from zero to advanced
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Four levels, {lessons.length} lessons, one live spreadsheet.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Browse the full curriculum <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {modules.map((m) => (
              <Link
                key={m.id}
                href={`/learn`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-md"
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-xl text-2xl shadow-sm"
                  style={{ background: `${m.accent}1a` }}
                >
                  {m.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: m.accent }}
                    >
                      {m.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      {lessonCounts[m.id] ?? 0} lessons
                    </span>
                  </div>
                  <h3 className="mt-0.5 text-lg font-semibold text-slate-900 group-hover:underline">
                    {m.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{m.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            {[
              "SUM · AVERAGE · MIN · MAX",
              "IF · AND · OR · CONCAT",
              "VLOOKUP & XLOOKUP",
              "Pivot tables & charts",
              "INDEX/MATCH & dynamic arrays",
              "Power Query & macros",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
          <p className="flex items-center gap-2">
            <Grid3X3 className="size-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">Excel Master</span> —
            learn Excel at your own pace.
          </p>
          <p className="flex items-center gap-1.5">
            <BookOpen className="size-4" /> {lessons.length} interactive lessons
          </p>
        </div>
      </footer>
    </div>
  );
}
