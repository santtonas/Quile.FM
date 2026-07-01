"use client";

import { toPng } from "html-to-image";

async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();

      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
}

export default function Header() {
  async function handleDownload() {
    try {
      const element = document.getElementById("story-card");

      if (!element) {
        alert("Não encontrei a cápsula para baixar.");
        return;
      }

      await waitForImages(element);

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#000000",
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "quile-fm-story.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      alert(
        "Não consegui baixar automaticamente. Toque e segure na imagem para salvar."
      );

      const element = document.getElementById("story-card");

      if (!element) return;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#000000",
      });

      window.open(dataUrl, "_blank");
    }
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