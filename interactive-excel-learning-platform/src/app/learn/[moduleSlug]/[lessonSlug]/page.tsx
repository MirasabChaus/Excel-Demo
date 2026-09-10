import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lightbulb,
  PlaySquare,
  Sigma,
  Table2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import LessonSidebar from "@/components/LessonSidebar";
import VideoEmbed from "@/components/VideoEmbed";
import FormulaCard from "@/components/FormulaCard";
import DemoExample from "@/components/DemoExample";
import SpreadsheetWorkArea from "@/components/SpreadsheetWorkArea";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import {
  getModuleBySlug,
  getLessonBySlug,
  getLessonsByModule,
} from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const module = await getModuleBySlug(moduleSlug);
  if (!module) notFound();

  const moduleLessons = await getLessonsByModule(module.id);
  const lesson = await getLessonBySlug(module.id, lessonSlug);
  if (!lesson) notFound();

  const index = moduleLessons.findIndex((l) => l.slug === lesson.slug);
  const prev = index > 0 ? moduleLessons[index - 1] : null;
  const next = index < moduleLessons.length - 1 ? moduleLessons[index + 1] : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <LessonSidebar
            moduleTitle={module.title}
            moduleSlug={module.slug}
            accent={module.accent}
            currentSlug={lesson.slug}
            lessons={moduleLessons.map((l) => ({
              slug: l.slug,
              title: l.title,
              durationMin: l.durationMin,
            }))}
          />

          <article className="min-w-0 flex-1 space-y-8">
            {/* Header */}
            <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <nav className="flex items-center gap-1.5 text-sm text-slate-500">
                <Link href="/learn" className="hover:text-slate-700">
                  Curriculum
                </Link>
                <span>/</span>
                <span className="font-medium" style={{ color: module.accent }}>
                  {module.title}
                </span>
              </nav>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
                  style={{ background: module.accent }}
                >
                  {module.level}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="size-3.5" /> {lesson.durationMin} min
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-600">
                {lesson.summary}
              </p>
              <div className="mt-6">
                <MarkCompleteButton slug={lesson.slug} />
              </div>
            </header>

            {/* Video */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <PlaySquare className="size-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">Watch the demo</h2>
              </div>
              <VideoEmbed
                videoId={lesson.videoId}
                start={lesson.videoStart}
                title={lesson.title}
              />
            </section>

            {/* Formula */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Sigma className="size-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">The formula</h2>
              </div>
              <FormulaCard
                formula={lesson.formula}
                explanation={lesson.formulaExplain}
                accent={module.accent}
              />
            </section>

            {/* Key points */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="size-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">Key points</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {lesson.keyPoints.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0"
                      style={{ color: module.accent }}
                    />
                    {k}
                  </li>
                ))}
              </ul>
            </section>

            {/* Side-by-side example */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Table2 className="size-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Side-by-side example
                </h2>
              </div>
              <DemoExample demo={lesson.demo} accent={module.accent} />
            </section>

            {/* Practice */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <GraduationCap className="size-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Try it yourself
                </h2>
              </div>
              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-600">
                {lesson.task}
              </p>
              <SpreadsheetWorkArea
                key={lesson.slug}
                initialData={lesson.taskData}
                targetCell={lesson.taskTarget}
                expected={lesson.taskExpected}
                hint={lesson.formula}
              />
            </section>

            {/* Prev / Next */}
            <nav className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/learn/${module.slug}/${prev.slug}`}
                  className="group flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <ArrowLeft className="size-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">Previous</span>
                    <span className="block truncate text-sm font-semibold text-slate-800">
                      {prev.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="flex-1" />
              )}
              {next ? (
                <Link
                  href={`/learn/${module.slug}/${next.slug}`}
                  className="group flex flex-1 items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">Next</span>
                    <span className="block truncate text-sm font-semibold text-slate-800">
                      {next.title}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
                </Link>
              ) : (
                <span className="flex-1" />
              )}
            </nav>
          </article>
        </div>
      </main>
    </div>
  );
}
