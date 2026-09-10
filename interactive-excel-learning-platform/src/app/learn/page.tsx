import Link from "next/link";
import { ArrowRight, Clock, Sigma } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getAllModules, getAllLessons } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const [modules, lessons] = await Promise.all([
    getAllModules(),
    getAllLessons(),
  ]);
  const byModule = new Map<number, typeof lessons>();
  for (const l of lessons) {
    const arr = byModule.get(l.moduleId) ?? [];
    arr.push(l);
    byModule.set(l.moduleId, arr);
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Curriculum
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Learn Excel from basic to advanced
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Work through the levels in order, or jump straight to the lesson you
            need. Each one has a demo video, a side-by-side example, and a live
            spreadsheet to practice in.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {modules.map((m) => {
            const moduleLessons = byModule.get(m.id) ?? [];
            return (
              <section key={m.id}>
                <div className="flex items-start gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-sm"
                    style={{ background: `${m.accent}1a` }}
                  >
                    {m.icon}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
                        style={{ background: m.accent }}
                      >
                        {m.level}
                      </span>
                      <span className="text-sm text-slate-400">
                        {moduleLessons.length} lessons
                      </span>
                    </div>
                    <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
                      {m.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">{m.tagline}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {moduleLessons.map((l) => (
                    <Link
                      key={l.id}
                      href={`/learn/${m.slug}/${l.slug}`}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="grid size-8 place-items-center rounded-lg text-white"
                          style={{ background: m.accent }}
                        >
                          <Sigma className="size-4" />
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="size-3.5" />
                          {l.durationMin} min
                        </span>
                      </div>
                      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-slate-900 group-hover:underline">
                        {l.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">
                        {l.summary}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <code className="mono truncate rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                          {l.formula}
                        </code>
                        <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
