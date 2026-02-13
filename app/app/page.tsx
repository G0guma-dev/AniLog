// app/app/page.tsx
import BgShell from "@/components/ui/bg-shell";
import AppClient from "./AppClient";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function AppPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // 로그인 안 되어있으면 여기서 리다이렉트 처리하고 싶으면 redirect("/login") 등으로 바꿔도 됨
  const nickname = (user?.user_metadata?.nickname as string | undefined) ?? null;

  return (
    <BgShell variant="home">
      <AppClient nickname={nickname} />
    </BgShell>
  );
}
