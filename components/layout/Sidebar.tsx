"use client";

import { useState } from "react";
import { getStory } from "@/lib/api/lastfm";
import { useStoryStore } from "@/store/storyStore";
import ImageCropper from "@/components/Editor/ImageCropper";

export default function Sidebar() {
  const story = useStoryStore((state) => state.story);
  const setStory = useStoryStore((state) => state.setStory);
  const updateBackground = useStoryStore((state) => state.updateBackground);

  const [username, setUsername] = useState("");
  const [period, setPeriod] = useState("12month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  async function handleGenerate() {
    try {
      setError("");
      setLoading(true);

      const newStory = await getStory(username, period);

      setStory({
        ...newStory,
        background:
          story.background || "/images/default-story.jpg",
      });
    } catch {
      setError("Não consegui buscar esse usuário.");
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImageToCrop(imageUrl);
  }

  return (
    <>
      <aside className="w-full border-b border-zinc-800 bg-zinc-950 p-6 lg:w-80 lg:border-b-0 lg:border-r">
        <h2 className="mb-6 text-lg font-semibold">
          Editor
        </h2>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Usuário do Last.fm
            </label>

            <input
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="ex: santtonas"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Período
            </label>

            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 outline-none transition focus:border-red-500"
            >
              <option value="7day">7 dias</option>
              <option value="1month">1 mês</option>
              <option value="6month">6 meses</option>
              <option value="12month">12 meses</option>
              <option value="overall">Todo o tempo</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !username}
            className="w-full rounded-lg bg-red-500 py-3 font-medium transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Gerando..." : "Gerar cápsula"}
          </button>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-xs leading-5 text-zinc-400">
              O Last.fm não fornece o total de scrobbles por
              período. O valor exibido na cápsula é uma
              estimativa baseada nas músicas mais ouvidas
              desse período ₍^. .^₎Ⳋ.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Imagem de fundo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm text-zinc-400 file:mr-3 file:rounded-md file:border-0 file:bg-red-500 file:px-3 file:py-2 file:text-white hover:file:bg-red-600"
            />
          </div>

        </div>
      </aside>

      {imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          onCancel={() => setImageToCrop(null)}
          onSave={(croppedImage) => {
            updateBackground(croppedImage);
            setImageToCrop(null);
          }}
        />
      )}
    </>
  );
}