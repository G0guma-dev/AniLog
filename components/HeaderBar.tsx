// components/HeaderBar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

type Props = {
  nickname?: string | null;
  onTutorial?: () => void;
};

export default function HeaderBar({ nickname, onTutorial }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/app"
          className="shrink-0 whitespace-nowrap text-xl font-extrabold tracking-tight"
        >
          AniLog
        </Link>

        <span className="inline-flex min-w-0 max-w-[140px] items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm text-slate-700 backdrop-blur sm:max-w-[220px]">
          <span className="truncate whitespace-nowrap">
            {nickname ? `${nickname}님` : "닉네임 미설정"}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
        {onTutorial && (
          <Button variant="outline" onClick={onTutorial} className="w-full">
            튜토리얼
          </Button>
        )}

        <Link href="/app/profile" className="w-full">
          <Button variant="outline" className="w-full">
            프로필
          </Button>
        </Link>

        <Button variant="outline" onClick={handleLogout} className="w-full">
          로그아웃
        </Button>
      </div>
    </header>
  );
}