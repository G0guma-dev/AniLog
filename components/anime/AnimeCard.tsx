"use client";

import type { AnimeEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function AnimeCard({
  entry,
  onEdit,
  onDelete,
  onOpen,
}: {
  entry: AnimeEntry;
  onEdit: (entry: AnimeEntry) => void;
  onDelete: (id: string) => void;
  onOpen: (entry: AnimeEntry) => void;
}) {
  return (
    <div
      onClick={() => onOpen(entry)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(entry);
      }}
    >
      {/* 🔥 이미지 영역 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
        {entry.image_url ? (
          <img
            src={entry.image_url}
            alt={entry.title}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            이미지 없음
          </div>
        )}
      </div>

      {/* 🔥 텍스트 영역 */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-base font-extrabold">
              {entry.title}
            </div>
            <div className="mt-1 text-xs text-slate-600">
              {entry.season}기 · {entry.episode}/{entry.total_episodes}화
            </div>
          </div>

          <div className="shrink-0 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-bold">
            ★ {entry.rating}
          </div>
        </div>

        <div className="mt-3 line-clamp-2 text-sm text-slate-700">
          {entry.comment?.trim() ? entry.comment : "코멘트 없음"}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}