// components/ui/bg-shell.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BgVariant = "home" | "app" | "auth";

export default function BgShell({
  children,
  className,
  variant = "home",
}: {
  children: ReactNode;
  className?: string;
  variant?: BgVariant;
}) {
  const base = "min-h-screen w-full text-slate-900";

  const bg =
    variant === "home" || variant === "app"
      ? "bg-[radial-gradient(circle_at_20%_20%,rgba(255,236,210,0.55),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(200,230,255,0.65),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(230,210,255,0.65),transparent_50%)]"
      : "bg-white";

  const dots =
    "relative before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(rgba(15,23,42,0.10)_1px,transparent_1px)] before:[background-size:18px_18px]";

  return <div className={cn(base, bg, dots, className)}>{children}</div>;
}
