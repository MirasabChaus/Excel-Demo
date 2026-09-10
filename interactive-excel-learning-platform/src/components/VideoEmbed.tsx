"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  videoId: string;
  start?: number;
  title?: string;
};

export default function VideoEmbed({ videoId, start = 0, title }: Props) {
  const [playing, setPlaying] = useState(false);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&start=${start || 0}${
    playing ? "&autoplay=1" : ""
  }`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-black/10">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title ?? "Excel tutorial"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label="Play video"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title ?? "Excel tutorial thumbnail"}
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-75"
            loading="lazy"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-emerald-600/95 text-white shadow-xl ring-4 ring-white/30 transition group-hover:scale-110 group-hover:bg-emerald-500">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </span>
          {start > 0 && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
              starts at {formatSeconds(start)}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

function formatSeconds(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
