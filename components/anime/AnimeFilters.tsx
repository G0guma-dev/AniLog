"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type SortKey = "updated_desc" | "rating_desc" | "title_asc";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  tags: string[];
  activeTag: string | null;
  onTagChange: (t: string | null) => void;

  sortKey: SortKey;
  onSortChange: (k: SortKey) => void;
};

export default function AnimeFilters({
  query,
  onQueryChange,
  sortKey,
  onSortChange,
}: Props) {
  const sortLabel =
    sortKey === "updated_desc" ? "최근" : sortKey === "rating_desc" ? "평점" : "제목";

  return (
    <div className="rounded-2xl border bg-white/60 dark:bg-black/20 backdrop-blur shadow-sm">
      <div className="flex items-center gap-2 p-3">
        <Input
          className="h-11 rounded-xl bg-white/70 dark:bg-black/20"
          placeholder="애니 제목이나 태그 검색…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />

        {/* ✅ 정렬 버튼: 겹침 방지 위해 고정 폭 */}
        <Button
          type="button"
          variant="outline"
          className="h-11 w-24 rounded-xl shrink-0"
          onClick={() => {
            // 클릭할 때마다 순환
            const next =
              sortKey === "updated_desc"
                ? "rating_desc"
                : sortKey === "rating_desc"
                ? "title_asc"
                : "updated_desc";
            onSortChange(next);
          }}
          title="정렬 변경"
        >
          정렬:{sortLabel}
        </Button>
      </div>
    </div>
  );
}
