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
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
      <div className="flex items-center gap-3">
        <Link href="/app" className="text-xl font-extrabold tracking-tight">
          AniLog
        </Link>

        {nickname ? (
          <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm text-slate-700 backdrop-blur">
            {nickname}님
          </span>
        ) : (
          <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm text-slate-600 backdrop-blur">
            닉네임 미설정
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onTutorial && (
          <Button variant="outline" onClick={onTutorial}>
            튜토리얼
          </Button>
        )}

        <Link href="/app/profile">
          <Button variant="outline">프로필</Button>
        </Link>

        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
