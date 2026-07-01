import { StoryData } from "@/types/story";
import { formatStoryDate } from "@/utils/date";
import { getPeriodRange } from "@/utils/period";

interface StoryCardProps {
  data: StoryData;
  exportMode?: boolean;
}

export default function StoryCard({
  data,
  exportMode = false,
}: StoryCardProps) {
  const hasData = data.artists.length > 0 || data.tracks.length > 0;

  return (
    <div
      id={exportMode ? "story-card-export" : "story-card-preview"}
      className={`relative h-[800px] w-[450px] overflow-hidden bg-black ${
        exportMode
          ? ""
          : "rounded-[42px] shadow-[0_70px_140px_rgba(0,0,0,.80)]"
      }`}
    >
      <img
        src={data.background || "/images/default-story.jpg"}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

      {!hasData && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
          <p className="text-4xl">₍^. .^₎Ⳋ</p>

          <h2 className="mt-4 text-2xl font-bold">
            Sua cápsula aparecerá aqui
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/60">
            Digite um usuário do Last.fm e escolha um período para começar.
          </p>
        </div>
      )}

      {hasData && (
        <div className="absolute bottom-10 left-1/2 w-[84%] -translate-x-1/2 rounded-[30px] border border-white/20 bg-[rgba(18,18,18,0.22)] p-8 shadow-[0_10px_40px_rgba(0,0,0,.18)]">
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

          {data.showProfile && data.username && (
            <div className="relative mt-4 mb-6 flex items-center gap-3">
              {data.avatar && (
                <img
                  src={data.avatar}
                  alt={data.username}
                  className="h-10 w-10 rounded-full object-cover"
                  crossOrigin="anonymous"
                  draggable={false}
                />
              )}

              <p className="text-sm font-medium text-white/80">
                {data.username}
              </p>
            </div>
          )}

<div className="relative mb-5">
  <p className="text-xs uppercase tracking-[0.22em] text-white/55">
    {getPeriodRange(data.period)}
  </p>
</div>

          <div className="relative">
            <p className="text-xs font-medium text-white/90">
              Total de scrobbles
            </p>

            <h1 className="mt-1 text-7xl font-black leading-none tracking-tighter">
              {data.scrobbles.toLocaleString("pt-BR")}
            </h1>
          </div>

          <div className="relative mt-8">
            <h2 className="mb-3 text-sm font-medium text-white/90">
              TOP ARTISTAS
            </h2>

            <ol className="space-y-3 text-sm">
              {data.artists.map((artist, index) => (
                <li key={artist} className="flex items-center gap-4">
                  <span className="w-6 text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-medium">{artist}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-10">
            <h2 className="mb-3 text-sm font-medium text-white/90">
              TOP MÚSICAS
            </h2>

            <ol className="space-y-3 text-sm">
              {data.tracks.map((track, index) => (
                <li key={track} className="flex items-center gap-4">
                  <span className="w-6 text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-medium">{track}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
        <span>{formatStoryDate()}</span>
        <span>quile.fm</span>
      </div>
    </div>
  );
}