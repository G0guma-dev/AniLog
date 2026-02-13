"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnimeEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "create" | "edit";

function errMsg(e: unknown) {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "오류가 발생했습니다.";
  }
}

export default function AnimeEditorDialog({
  open,
  onClose,
  mode,
  initial,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  initial?: AnimeEntry | null;
  onSave: (payload: {
    title: string;
    rating: number;
    comment: string;
    tags: string[];
    season: number;
    episode: number;
    total_episodes: number;
    image_url?: string | null;
  }) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [ratingStr, setRatingStr] = useState(""); // ✅ string
  const [seasonStr, setSeasonStr] = useState(""); // ✅ string
  const [episodeStr, setEpisodeStr] = useState(""); // ✅ string
  const [totalEpisodesStr, setTotalEpisodesStr] = useState(""); // ✅ string

  const [imageUrl, setImageUrl] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initial) {
      setTitle(initial.title ?? "");
      setRatingStr(String(initial.rating ?? 0));
      setSeasonStr(String(initial.season ?? 1));
      setEpisodeStr(String(initial.episode ?? 0));
      setTotalEpisodesStr(
        initial.total_episodes ? String(initial.total_episodes) : ""
      );
      setImageUrl(initial.image_url ?? "");
      setTagsText((initial.tags ?? []).join(", "));
      setComment(initial.comment ?? "");
    } else {
      setTitle("");
      setRatingStr("");
      setSeasonStr("");
      setEpisodeStr("");
      setTotalEpisodesStr("");
      setImageUrl("");
      setTagsText("");
      setComment("");
    }
  }, [open, mode, initial]);

  const tags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsText]
  );

  // ✅ 저장 직전에만 숫자로 변환 (빈칸은 기본값)
  const rating = ratingStr === "" ? 0 : Number(ratingStr);
  const season = seasonStr === "" ? 1 : Number(seasonStr);
  const episode = episodeStr === "" ? 0 : Number(episodeStr);
  const totalEpisodes = totalEpisodesStr === "" ? 0 : Number(totalEpisodesStr);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* panel */}
      <div className="absolute left-1/2 top-1/2 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-extrabold">
            {mode === "create" ? "새 기록 추가" : "기록 수정"}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </div>

        <div className="mt-4 grid gap-3">
          <div>
            <div className="mb-1 text-xs font-bold text-slate-600">애니 제목</div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="mb-1 text-xs font-bold text-slate-600">평점(0~5)</div>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                max={5}
                placeholder="0~5"
                value={ratingStr}
                onChange={(e) => setRatingStr(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 text-xs font-bold text-slate-600">기수</div>
              <Input
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="예: 1"
                value={seasonStr}
                onChange={(e) => setSeasonStr(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 text-xs font-bold text-slate-600">본 화</div>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="예: 12"
                value={episodeStr}
                onChange={(e) => setEpisodeStr(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs font-bold text-slate-600">총 화수(선택)</div>
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="모르면 비워도 됨"
              value={totalEpisodesStr}
              onChange={(e) => setTotalEpisodesStr(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-1 text-xs font-bold text-slate-600">이미지 URL(선택)</div>
            <Input
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-1 text-xs font-bold text-slate-600">
              태그(쉼표로 구분)
            </div>
            <Input
              placeholder="액션, 성장, 감동"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-1 text-xs font-bold text-slate-600">코멘트</div>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white/80 p-3 text-sm outline-none shadow-sm focus:ring-2 focus:ring-emerald-200"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="느낀 점, 추천 포인트 등"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            className="flex-1"
            disabled={saving || !title.trim()}
            onClick={async () => {
              try {
                setSaving(true);

                // ✅ 안전 범위 보정
                const safeRating = Math.max(0, Math.min(5, isNaN(rating) ? 0 : rating));
                const safeSeason = Math.max(1, isNaN(season) ? 1 : season);
                const safeEpisode = Math.max(0, isNaN(episode) ? 0 : episode);
                const safeTotal = Math.max(0, isNaN(totalEpisodes) ? 0 : totalEpisodes);

                await onSave({
                  title: title.trim(),
                  rating: safeRating,
                  comment,
                  tags,
                  season: safeSeason,
                  episode: safeEpisode,
                  total_episodes: safeTotal,
                  image_url: imageUrl.trim() ? imageUrl.trim() : null,
                });

                onClose();
              } catch (e: unknown) {
                console.error(e);
                alert(errMsg(e));
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "저장 중..." : "저장"}
          </Button>

          <Button variant="outline" className="flex-1" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}
