// app/app/profile/ui/ProfileClient.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function ProfileClient({
  userId,
  initialNickname,
}: {
  userId: string;
  initialNickname: string | null;
}) {
  const router = useRouter();
  const [nickname, setNickname] = useState(initialNickname ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSave = useMemo(() => nickname.trim().length >= 2, [nickname]);

  const onSave = async () => {
    setMsg(null);
    const value = nickname.trim();
    if (value.length < 2) {
      setMsg("닉네임은 2글자 이상으로 입력해줘.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createSupabaseBrowser();

      // user_metadata.nickname 갱신
      const { error } = await supabase.auth.updateUser({
        data: { nickname: value },
      });

      if (error) throw new Error(error.message);

      setMsg("저장 완료! 이제 메인 화면 상단에 닉네임이 표시돼요.");

      // ✅ 여기서 즉시 체감되게: /app로 이동 + 서버 리렌더
      router.push("/app");
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : "저장 중 오류가 발생했습니다.";
      setMsg(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur">
      <div className="text-sm text-slate-600">내 계정</div>
      <div className="mt-1 text-xs text-slate-500">User ID: {userId}</div>

      <div className="mt-5">
        <div className="text-sm font-bold">닉네임</div>
        <div className="mt-2 flex gap-2">
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="예: 오성"
          />
          <Button onClick={onSave} disabled={!canSave || saving}>
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>

        <div className="mt-2 text-xs text-slate-500">
          닉네임을 저장하면 메인 화면 상단에 <b>OO님</b>으로 표시돼서 “내 계정”이 확실해져요.
        </div>

        {msg && <div className="mt-3 text-sm text-slate-700">{msg}</div>}
      </div>
    </section>
  );
}
