"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  RotateCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { evaluateCell, matchesExpected, parseCellRef } from "@/lib/formula";

type Props = {
  initialData: string[][];
  targetCell?: string;
  expected?: string;
  hint?: string;
  height?: number;
  title?: string;
};

function matrixToSheetData(matrix: string[][]) {
  const rows: Record<string, { cells: Record<string, { text: string }>; len: number }> = {};
  let maxCols = 0;
  (matrix ?? []).forEach((rowArr, ri) => {
    const cells: Record<string, { text: string }> = {};
    rowArr.forEach((cell, ci) => {
      if (cell !== "" && cell != null) cells[ci] = { text: String(cell) };
    });
    rows[ri] = { cells, len: rowArr.length };
    maxCols = Math.max(maxCols, rowArr.length);
  });
  return {
    name: "Practice",
    rows,
    cols: { len: Math.max(maxCols, 7) },
    styles: [],
  };
}

function loadAssets(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.querySelector('link[data-xss-css="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/vendor/xspreadsheet.css";
      link.setAttribute("data-xss-css", "1");
      document.head.appendChild(link);
    }

    const wait = () => {
      let tries = 0;
      const poll = () => {
        if (window.x_spreadsheet) {
          resolve();
          return;
        }
        tries += 1;
        if (tries > 120) {
          resolve(); // give up polling; caller will surface an error state
          return;
        }
        setTimeout(poll, 50);
      };
      poll();
    };

    if (!document.querySelector('script[data-xss-js="1"]')) {
      const script = document.createElement("script");
      script.src = "/vendor/xspreadsheet.js";
      script.setAttribute("data-xss-js", "1");
      script.onload = wait;
      script.onerror = wait;
      document.head.appendChild(script);
    } else {
      wait();
    }
  });
}

export default function SpreadsheetWorkArea({
  initialData,
  targetCell,
  expected,
  hint,
  height = 480,
  title = "Live Work Area",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<XSpreadsheetInstance | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let disposed = false;
    let instance: XSpreadsheetInstance | null = null;

    (async () => {
      try {
        await loadAssets();
        if (disposed || !containerRef.current) return;
        const create = window.x_spreadsheet;
        if (!create) {
          setState("error");
          return;
        }
        instance = create(containerRef.current, {
          showToolbar: true,
          showGrid: true,
          showContextmenu: true,
          showBottomBar: false,
          view: {
            height: () => height,
            width: () => containerRef.current?.clientWidth ?? 800,
          },
        });
        instance.loadData(matrixToSheetData(initialData));
        instance.change(() => setResult(null));
        instanceRef.current = instance;
        setState("ready");
      } catch {
        if (!disposed) setState("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        instance?.destroy?.();
      } catch {
        // ignore
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
      instanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = useCallback(() => {
    instanceRef.current?.loadData(matrixToSheetData(initialData));
    setResult(null);
  }, [initialData]);

  const check = useCallback(() => {
    const inst = instanceRef.current;
    if (!inst || !targetCell) return;
    const sheet = (inst.getData()?.[0] ?? {}) as {
      rows?: Record<string, { cells?: Record<string, { text?: string }> }>;
    };
    const rows = sheet.rows ?? {};
    const getCell = (ri: number, ci: number) =>
      rows[ri]?.cells?.[ci]?.text ?? "";
    const { ri, ci } = parseCellRef(targetCell);
    const raw = getCell(ri, ci);
    if (!raw || raw.trim() === "") {
      setResult({
        ok: false,
        msg: `${targetCell} is empty — type a formula into that cell first.`,
      });
      return;
    }
    try {
      const value = evaluateCell(raw, getCell);
      const ok = expected ? matchesExpected(value, expected) : true;
      setResult(
        ok
          ? { ok: true, msg: `Correct! ${targetCell} = ${String(value)} 🎉` }
          : {
              ok: false,
              msg: `Not quite — expected ${expected}, but got ${String(value)}. Try again.`,
            },
      );
    } catch {
      setResult({ ok: false, msg: "Couldn't parse that formula — check the syntax." });
    }
  }, [targetCell, expected]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-emerald-600" />
          <span className="text-sm font-semibold text-slate-800">{title}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {showHint ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              {showHint ? "Hide hint" : "Hint"}
            </button>
          )}
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="size-3.5" />
            Reset example
          </button>
          {targetCell && (
            <button
              type="button"
              onClick={check}
              disabled={state !== "ready"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
            >
              <CheckCircle2 className="size-3.5" />
              Check answer
            </button>
          )}
        </div>
      </div>

      {showHint && hint && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Try:</span>{" "}
            <code className="mono rounded bg-white/80 px-1.5 py-0.5 text-[13px] text-amber-900">
              {hint}
            </code>
          </p>
        </div>
      )}

      {result && (
        <div
          className={`flex items-center gap-2 border-b px-4 py-2.5 text-sm font-medium ${
            result.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {result.ok ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <TriangleAlert className="size-4 shrink-0" />
          )}
          {result.msg}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: height + 48 }}
      >
        {state === "loading" && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-white/80">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Loader2 className="size-4 animate-spin" />
              Loading spreadsheet…
            </div>
          </div>
        )}
        {state === "error" && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-white p-6 text-center">
            <p className="max-w-sm text-sm text-slate-600">
              The spreadsheet failed to load. Please refresh the page and try
              again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
