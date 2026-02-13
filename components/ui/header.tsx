"use client";

import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function onLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="text-lg font-extrabold tracking-tight">
        AniLog
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/app/profile">
          <Button variant="outline">프로필</Button>
        </Link>
        <Button variant="outline" onClick={onLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
