"use client";

import { Button } from "@/components/ui/button";

type Props = {
  nickname?: string | null;
  onTutorial?: () => void; // ✅ optional
};

export default function AppHeader({ nickname, onTutorial }: Props) {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <div className="text-sm text-muted-foreground">
        {nickname ? `${nickname}님` : ""}
      </div>

      <div className="flex items-center gap-2">
        {onTutorial && (
          <Button variant="outline" onClick={onTutorial}>
            튜토리얼
          </Button>
        )}
      </div>
    </div>
  );
}
