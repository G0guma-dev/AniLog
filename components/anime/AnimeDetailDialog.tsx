"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AnimeEntry } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  entry: AnimeEntry | null;
  onEdit: (entry: AnimeEntry) => void;
  onDelete: (id: string) => void;
};

export default function AnimeDetailDialog({
  open,
  onClose,
  entry,
  onEdit,
  onDelete,
}: Props) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-3xl p-8 bg-white shadow-2xl">

        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold">
            {entry.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">

          {/* 🎬 왼쪽 이미지 */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-md">
            {entry.image_url ? (
              <Image
                src={entry.image_url}
                alt={entry.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* 📦 오른쪽 정보 박스 */}
          <div className="flex flex-col gap-6">

            {/* ⭐ 평점 + 진행도 */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">평점</div>
                  <div className="mt-2 flex items-center gap-2 text-3xl font-bold">
                    ⭐ {entry.rating}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">진행도</div>
                  <div className="mt-2 text-xl font-semibold">
                    {entry.season}기 · {entry.episode}/{entry.total_episodes}화
                  </div>
                </div>
              </div>
            </div>

            {/* 🏷 태그 */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">태그</div>
              <div className="flex flex-wrap gap-2">
                {entry.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 📝 코멘트 */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-3">코멘트</div>
              <div className="whitespace-pre-line text-gray-800">
                {entry.comment || "코멘트 없음"}
              </div>
            </div>

            {/* 버튼 */}
            <div className="mt-4 flex gap-4">
              <Button
                className="flex-1 h-12 text-base"
                onClick={() => onEdit(entry)}
              >
                수정
              </Button>

              <Button
                variant="outline"
                className="flex-1 h-12 text-base"
                onClick={() => onDelete(entry.id)}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
