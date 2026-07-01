import { StoryData } from "@/types/story";

const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY!;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

async function request(method: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams({
    method,
    api_key: API_KEY,
    format: "json",
    ...params,
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do Last.fm");
  }

  return response.json();
}

export async function getTopArtists(username: string, period: string) {
  return request("user.gettopartists", {
    user: username,
    period,
    limit: "5",
  });
}

export async function getTopTracks(username: string, period: string) {
  return request("user.gettoptracks", {
    user: username,
    period,
    limit: "200",
  });
}

export async function getTopAlbums(username: string, period: string) {
  return request("user.gettopalbums", {
    user: username,
    period,
    limit: "5",
  });
}

export async function getUserInfo(username: string) {
  return request("user.getinfo", {
    user: username,
  });
}

export async function getStory(
  username: string,
  period: string
): Promise<StoryData> {
  const [artists, tracks, albums, user] = await Promise.all([
    getTopArtists(username, period),
    getTopTracks(username, period),
    getTopAlbums(username, period),
    getUserInfo(username),
  ]);

  const topTracks = tracks.toptracks.track ?? [];

  const avatar =
    user.user.image?.find((img: { size: string }) => img.size === "large")?.[
      "#text"
    ] || "";

  return {
    username: user.user.name,
    period,

    scrobbles:
      period === "overall"
        ? Number(user.user.playcount)
        : topTracks.reduce(
            (total: number, track: { playcount: string }) =>
              total + Number(track.playcount),
            0
          ),

    background: "/images/default-story.jpg",
    avatar,
    showProfile: true,

    artists: artists.topartists.artist
      .slice(0, 5)
      .map((artist: { name: string }) => artist.name),

    tracks: topTracks
      .slice(0, 5)
      .map((track: { name: string }) => track.name),

    albums: albums.topalbums.album
      .slice(0, 5)
      .map((album: { name: string }) => album.name),
  };
}