"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Step({
  n,
  title,
  desc,
}: {
  n: number;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        flex gap-4 rounded-2xl border border-slate-200
        bg-white p-5 shadow-md
      "
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
        {n}
      </div>

      <div className="min-w-0">
        <div className="text-lg font-extrabold text-slate-900">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-slate-700">{desc}</div>
      </div>
    </div>
  );
}

export default function TutorialModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* DialogContent 내부에 Title 필수 */}
      <DialogContent
        className="
          max-w-2xl p-0
          bg-white
          text-slate-900
          shadow-2xl
        "
      >
        <DialogTitle className="sr-only">AniLog 튜토리얼</DialogTitle>

        {/* 상단 헤더 */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <div className="text-3xl font-extrabold tracking-tight">튜토리얼</div>
            <div className="mt-2 text-sm text-slate-700">
              AniLog는 “내 기록”을 빠르게 쌓고, 나중에 찾기 쉽게 만드는 도구야.
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="space-y-4 p-6">
          <Step
            n={1}
            title="+ 새 기록"
            desc="제목, 평점, 코멘트, 태그를 입력해서 기록을 만들어요."
          />
          <Step
            n={2}
            title="검색 & 정렬"
            desc="제목/태그로 검색하고 ‘최근/평점’ 기준으로 정렬해요."
          />
          <Step
            n={3}
            title="프로필(닉네임)"
            desc="닉네임을 저장하면 상단에 ‘OO님’으로 표시되어 내 계정이 확실해져요."
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end border-t border-slate-200 p-6">
          <Button className="px-6" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
        </div>
      </DialogContent>

      {/* ✅ 오버레이(바깥 어두운 배경) 더 진하게:
          shadcn 기본 Dialog가 overlay를 내부에서 렌더링해서
          프로젝트마다 커스터마이징 위치가 다름.
          가장 확실한 방법은 globals.css에서 아래 한 줄 추가하는 거야.
      */}
    </Dialog>
  );
}
