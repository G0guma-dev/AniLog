"use client";

import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimeCard from "@/components/anime/AnimeCard";
import AnimeEditorDialog from "@/components/anime/AnimeEditorDialog";
import AnimeDetailDialog from "@/components/anime/AnimeDetailDialog";
import type { AnimeEntry } from "@/lib/types";
import {
  createAnimeEntry,
  deleteAnimeEntry,
  getMyAnimeEntries,
  updateAnimeEntry,
} from "@/lib/anime";

export default function AppClient() {
  const [items, setItems] = useState<AnimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "rating">("recent");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AnimeEntry | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<AnimeEntry | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getMyAnimeEntries();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? items.filter((it) => {
          const inTitle = it.title.toLowerCase().includes(q);
          const inTags = (it.tags ?? []).some((t) => t.toLowerCase().includes(q));
          return inTitle || inTags;
        })
      : items;

    const sorted =
      sort === "rating"
        ? [...base].sort((a, b) => b.rating - a.rating)
        : [...base].sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );

    return sorted;
  }, [items, query, sort]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <AppHeader />

      <div className="mt-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">내 애니 기록</h1>
        <p className="mt-2 text-sm text-slate-600">
          제목/태그 검색, 평점, 코멘트, 진행도를 깔끔하게 관리해봐.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-2xl space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-white/60 p-3 shadow-sm backdrop-blur">
          <div className="flex gap-2">
            <Input
              placeholder="애니 제목이나 태그 검색…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="outline"
              className="w-32 shrink-0"
              onClick={() => setSort((s) => (s === "recent" ? "rating" : "recent"))}
            >
              정렬: {sort === "recent" ? "최근" : "평점"}
            </Button>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            setEditTarget(null);
            setDialogOpen(true);
          }}
        >
          + 새 기록
        </Button>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="text-center text-sm text-slate-600">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white/60 p-8 text-center shadow-sm backdrop-blur">
            <div className="text-lg font-extrabold">아직 기록이 없어</div>
            <div className="mt-2 text-sm text-slate-600">
              위의 <b>+ 새 기록</b>으로 첫 기록을 만들어봐!
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((e) => (
              <AnimeCard
                key={e.id}
                entry={e}
                onOpen={(entry) => {
                  setSelected(entry);
                  setDetailOpen(true);
                }}
                onEdit={(entry) => {
                  setEditTarget(entry);
                  setDialogOpen(true);
                }}
                onDelete={async (id) => {
                  if (!confirm("삭제할까요?")) return;
                  await deleteAnimeEntry(id);
                  if (selected?.id === id) {
                    setDetailOpen(false);
                    setSelected(null);
                  }
                  await refresh();
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 상세 보기 */}
      <AnimeDetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        entry={selected}
        onEdit={(entry) => {
          setDetailOpen(false);
          setEditTarget(entry);
          setDialogOpen(true);
        }}
        onDelete={async (id) => {
          if (!confirm("삭제할까요?")) return;
          await deleteAnimeEntry(id);
          setDetailOpen(false);
          setSelected(null);
          await refresh();
        }}
      />

      {/* 편집/생성 */}
      <AnimeEditorDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={editTarget ? "edit" : "create"}
        initial={editTarget}
        onSave={async (payload) => {
          if (editTarget) {
            await updateAnimeEntry(editTarget.id, {
              title: payload.title,
              rating: payload.rating,
              comment: payload.comment,
              tags: payload.tags,
              season: payload.season,
              episode: payload.episode,
              total_episodes: payload.total_episodes,
              image_url: payload.image_url ?? null,
            });
          } else {
            await createAnimeEntry(payload);
          }
          await refresh();
        }}
      />
    </main>
  );
}
