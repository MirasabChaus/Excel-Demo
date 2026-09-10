"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Grid3X3, Menu, X, GraduationCap, PlaySquare } from "lucide-react";
import { completedCount, subscribeProgress } from "@/lib/progress";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Curriculum" },
  { href: "/playground", label: "Playground" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(completedCount());
    return subscribeProgress(() => setCount(completedCount()));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-sm transition-transform group-hover:scale-105">
            <Grid3X3 className="size-5" strokeWidth={2.5} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight text-slate-900">
              Excel&nbsp;Master
            </span>
            <span className="block text-[11px] font-medium text-emerald-600">
              basic → advanced
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <span className="ml-2 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <GraduationCap className="size-3.5" />
            {count} lessons done
          </span>
        </nav>

        <button
          className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {l.label === "Playground" ? (
                <PlaySquare className="size-4" />
              ) : (
                <GraduationCap className="size-4" />
              )}
              {l.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-xs font-semibold text-emerald-600">
            {count} lessons completed
          </p>
        </nav>
      )}
    </header>
  );
}
