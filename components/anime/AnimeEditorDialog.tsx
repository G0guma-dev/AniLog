"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnimeEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

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
  const supabase = createSupabaseBrowser();

  const [title, setTitle] = useState("");
  const [ratingStr, setRatingStr] = useState("");
  const [seasonStr, setSeasonStr] = useState("");
  const [episodeStr, setEpisodeStr] = useState("");
  const [totalEpisodesStr, setTotalEpisodesStr] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [comment, setComment] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
      setTagsText((initial.tags ?? []).join(", "));
      setComment(initial.comment ?? "");
      setImageUrl(initial.image_url ?? "");
    } else {
      setTitle("");
      setRatingStr("");
      setSeasonStr("");
      setEpisodeStr("");
      setTotalEpisodesStr("");
      setTagsText("");
      setComment("");
      setImageUrl("");
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

  const rating = ratingStr === "" ? 0 : Number(ratingStr);
  const season = seasonStr === "" ? 1 : Number(seasonStr);
  const episode = episodeStr === "" ? 0 : Number(episodeStr);
  const totalEpisodes = totalEpisodesStr === "" ? 0 : Number(totalEpisodesStr);

  async function handleImageUpload(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("jpg, png, webp, gif 파일만 업로드할 수 있어요.");
      return;
    }

    if (file.size > maxSize) {
      alert("이미지는 5MB 이하만 업로드할 수 있어요.");
      return;
    }

    try {
      setUploadingImage(true);

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const safeName = baseName
        .replace(/\s+/g, "-")
        .replace(/[^\w\-가-힣]/g, "");

      const filePath = `uploads/${Date.now()}-${safeName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("anime-images")
        .upload(filePath, file, {
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("anime-images")
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error("업로드 후 이미지 URL을 가져오지 못했습니다.");
      }

      setImageUrl(data.publicUrl);
    } catch (e: unknown) {
      console.error(e);
      alert(errMsg(e));
    } finally {
      setUploadingImage(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 max-h-[90vh] w-[min(620px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-extrabold">
            {mode === "create" ? "새 기록 추가" : "기록 수정"}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </div>

        <div className="mt-4 grid gap-4">
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
            <div className="mb-2 text-xs font-bold text-slate-600">이미지 업로드</div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  await handleImageUpload(file);
                }}
                className="block w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
              />

              <p className="mt-3 text-sm text-slate-500">
                jpg, png, webp, gif / 최대 5MB
              </p>

              {uploadingImage && (
                <p className="mt-2 text-sm font-medium text-emerald-600">
                  이미지 업로드 중...
                </p>
              )}
            </div>
          </div>

          {imageUrl.trim() && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 text-sm font-bold text-slate-700">이미지 미리보기</div>

              <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-white p-4">
                <img
                  src={imageUrl}
                  alt={title || "미리보기"}
                  className="max-h-[420px] w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          )}

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
              className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white/80 p-3 text-sm outline-none shadow-sm focus:ring-2 focus:ring-emerald-200"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="느낀 점, 추천 포인트 등"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            className="flex-1"
            disabled={saving || uploadingImage || !title.trim()}
            onClick={async () => {
              try {
                setSaving(true);

                const safeRating = Math.max(
                  0,
                  Math.min(5, isNaN(rating) ? 0 : rating)
                );
                const safeSeason = Math.max(1, isNaN(season) ? 1 : season);
                const safeEpisode = Math.max(0, isNaN(episode) ? 0 : episode);
                const safeTotal = Math.max(
                  0,
                  isNaN(totalEpisodes) ? 0 : totalEpisodes
                );

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