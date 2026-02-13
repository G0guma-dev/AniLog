import Link from "next/link";
import BgShell from "@/components/ui/bg-shell";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <BgShell variant="home">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10">
        <header className="flex items-center justify-between">
          <div className="text-lg font-extrabold tracking-tight">AniLog</div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">로그인</Button>
            </Link>
            <Link href="/signup">
              <Button>회원가입</Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="w-full">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              애니 기록을 <span className="text-emerald-600">깔끔하게</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              애니 이름, 평점, 코멘트, 태그, 시청 진행도를 한 곳에서 관리해봐.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/app">
                <Button className="h-12 px-6 text-base">내 기록 보러가기</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 px-6 text-base">
                  로그인
                </Button>
              </Link>
            </div>

            <footer className="mt-10 text-sm text-slate-600">
              <div className="border-t border-slate-200 pt-4">
                Made by <b>G0guma</b>
                <div className="mt-1 flex gap-4">
                  <a className="underline" href="https://www.instagram.com/goguma_dev?igsh=MWxxeGtmODN3OTc0NQ==" target="_blank">
                    Instagram
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </BgShell>
  );
}
