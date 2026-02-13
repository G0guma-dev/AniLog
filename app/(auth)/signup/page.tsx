import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center gap-4 px-4">
      <AuthCard mode="signup" />
      <p className="text-sm text-muted-foreground">
        이미 계정이 있나요? <Link className="underline" href="/login">로그인</Link>
      </p>
    </main>
  );
}
