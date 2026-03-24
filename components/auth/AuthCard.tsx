"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup";

export default function AuthCard({ mode }: { mode: Mode }) {
  const supabase = createSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit() {
    setMsg(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        const userId = data.user?.id;
        if (!userId) throw new Error("유저 생성에 실패했습니다.");

        const { error: pErr } = await supabase
          .from("profiles")
          .upsert({ id: userId });

        if (pErr) throw pErr;

        setMsg("회원가입 완료! 로그인 페이지로 이동해 주세요.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        window.location.href = "/app";
      }
    } catch (e: any) {
      setMsg(e?.message ?? "에러가 발생했어요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{mode === "login" ? "로그인" : "회원가입"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button className="w-full" onClick={onSubmit} disabled={loading}>
          {loading ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
        </Button>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </CardContent>
    </Card>
  );
}