"use client";

import { useState } from "react";
import { useStoryStore } from "@/store/storyStore";
import { exportStoryImage } from "@/utils/exportStory";

export default function Header() {
  const story = useStoryStore((state) => state.story);
  const [exporting, setExporting] = useState(false);

  async function handleDownload() {
    try {
      setExporting(true);
      await exportStoryImage(story);
    } catch {
      alert("Não consegui baixar a imagem.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <h1 className="text-xl font-bold tracking-tight">
        Quile<span className="text-red-500">.Fm</span>
      </h1>

      <button
        onClick={handleDownload}
        disabled={exporting}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600 disabled:opacity-60"
      >
        {exporting ? "Preparando..." : "Baixar imagem"}
      </button>
    </header>
  );
}