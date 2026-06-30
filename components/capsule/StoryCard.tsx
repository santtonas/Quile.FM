import Image from "next/image";
import { StoryData } from "@/types/story";
import { formatStoryDate } from "@/utils/date";

interface StoryCardProps {
  data: StoryData;
}

export default function StoryCard({ data }: StoryCardProps) {
  return (
    <div className="relative h-[720px] w-[405px] overflow-hidden rounded-[42px] shadow-[0_70px_140px_rgba(0,0,0,.80)]">
      <Image
        src={data.background}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="absolute bottom-10 left-1/2 w-[84%] -translate-x-1/2 rounded-[30px] border border-white/20 bg-white/8 p-8 backdrop-blur-[28px]">
        <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />

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

        <div className="relative mt-10"></div>

        <div className="relative">
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

      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
        <span>{formatStoryDate()}</span>
        <span>quile.fm</span>
      </div>
    </div>
  );
}