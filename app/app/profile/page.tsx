// app/app/profile/page.tsx
import BgShell from "@/components/ui/bg-shell";
import HeaderBar from "@/components/HeaderBar";
import ProfileClient from "./ui/ProfileClient";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // 로그인 안 했으면 login으로 보내고 싶으면 아래 주석 해제(원하면 해줄게)
  // if (!user) redirect("/login");

  const nickname = (user?.user_metadata?.nickname as string | undefined) ?? "";

  return (
    <BgShell variant="app">
      <HeaderBar nickname={nickname} />
      <main className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">프로필</h1>
        <ProfileClient userId={user?.id ?? ""} initialNickname={nickname} />
      </main>
    </BgShell>
  );
}
