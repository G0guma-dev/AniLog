// app/app/AppClient.tsx
"use client";

import { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import TutorialModal from "@/components/tutorial/TutorialModal";
import AnimeClient from "./ui/AnimeClient";

type Props = {
  nickname?: string | null;
};

export default function AppClient({ nickname }: Props) {
  const [tutorialOpen, setTutorialOpen] = useState(false);

  return (
    <>
      <HeaderBar nickname={nickname} onTutorial={() => setTutorialOpen(true)} />
      <TutorialModal open={tutorialOpen} onOpenChange={setTutorialOpen} />
      <AnimeClient />
    </>
  );
}
