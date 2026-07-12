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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          flex
          max-h-[90vh]
          w-[95vw]
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-white
          p-0
          shadow-2xl
        "
      >
        {/* 제목 영역 */}
        <DialogHeader className="shrink-0 px-8 pb-4 pt-8">
          <DialogTitle className="text-3xl font-extrabold">
            {entry.title}
          </DialogTitle>
        </DialogHeader>

        {/* 내용 영역 */}
        <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-8">
          {/* 위쪽 영역: 이미지 + 정보 */}
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            {/* 왼쪽 이미지 */}
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

            {/* 오른쪽 정보 영역 */}
            <div className="flex flex-col gap-6">
              {/* 평점 + 진행도 */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500">평점</div>

                    <div className="mt-3">
                      <div className="text-4xl">⭐</div>
                      <div className="mt-1 text-3xl font-bold">
                        {entry.rating}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">진행도</div>

                    <div className="mt-3 text-xl font-semibold leading-relaxed">
                      {entry.season}기 ·
                      <br />
                      {entry.episode}/{entry.total_episodes}화
                    </div>
                  </div>
                </div>
              </div>

              {/* 태그 */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-3 text-sm text-gray-500">태그</div>

                <div className="flex flex-wrap gap-2">
                  {entry.tags && entry.tags.length > 0 ? (
                    entry.tags.map((tag, idx) => (
                      <span
                        key={`${tag}-${idx}`}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">태그 없음</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 코멘트 영역 */}
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm text-gray-500">코멘트</div>

            <div
              className="
                max-h-[240px]
                min-h-[140px]
                overflow-y-auto
                whitespace-pre-wrap
                break-words
                pr-3
                leading-7
                text-gray-800
              "
            >
              {entry.comment || "코멘트 없음"}
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="shrink-0 border-t bg-white px-8 py-5">
          <div className="flex gap-4">
            <Button
              className="h-12 flex-1 text-base"
              onClick={() => onEdit(entry)}
            >
              수정
            </Button>

            <Button
              variant="outline"
              className="h-12 flex-1 text-base"
              onClick={() => onDelete(entry.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}