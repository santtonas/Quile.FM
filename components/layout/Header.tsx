"use client";

import { toPng } from "html-to-image";

export default function Header() {
  async function handleDownload() {
    const element = document.getElementById("story-card");

    if (!element) {
      alert("Não encontrei a cápsula para baixar.");
      return;
    }

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "transparent",
    });

    const link = document.createElement("a");
    link.download = "quile-fm-story.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <h1 className="text-xl font-bold tracking-tight">
        Quile<span className="text-red-500">.Fm</span>
      </h1>

      <button
        onClick={handleDownload}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600"
      >
        Baixar imagem
      </button>
    </header>
  );
}