import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center gap-4 px-4">
      <AuthCard mode="login" />
      <p className="text-sm text-muted-foreground">
        계정이 없나요? <Link className="underline" href="/signup">회원가입</Link>
      </p>
    </main>
  );
}
