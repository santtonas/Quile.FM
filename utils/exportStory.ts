import { StoryData } from "@/types/story";
import { formatStoryDate } from "@/utils/date";
import { getPeriodRange } from "@/utils/period";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if (!src.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / img.width, height / img.height);
  const x = (width - img.width * scale) / 2;
  const y = (height - img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.closePath();
}

function drawCircleImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, x, y, size, size);
  ctx.restore();
}

function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  if (ctx.measureText(text).width <= maxWidth) return text;

  let shortened = text;

  while (ctx.measureText(shortened + "...").width > maxWidth) {
    shortened = shortened.slice(0, -1);
  }

  return shortened + "...";
}

export async function exportStoryImage(data: StoryData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = 1080;
  canvas.height = 1920;

  const bg = await loadImage(data.background || "/images/default-story.jpg");

  drawCoverImage(ctx, bg, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,0,0,0.32)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cardX = 70;
  const cardY = 245;
  const cardW = 940;
  const cardH = 1535;
  const paddingX = 78;

  roundRect(ctx, cardX, cardY, cardW, cardH, 72);
  ctx.fillStyle = "rgba(18,18,18,0.22)";
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  ctx.stroke();

  let y = cardY + 155;

 if (data.showProfile && data.username) {
  if (data.avatar) {
    try {
      const avatar = await loadImage(data.avatar);
      drawCircleImage(ctx, avatar, cardX + paddingX, y - 48, 72);
    } catch {}
  }

  ctx.font = "400 30px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText(`${data.username}`, cardX + paddingX + 88, y);

  y += 95;
}

ctx.font = "500 26px Arial";
ctx.fillStyle = "rgba(255,255,255,0.6)";
ctx.fillText(getPeriodRange(data.period), cardX + paddingX, y);

y += 70;

  ctx.font = "500 28px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("Total de scrobbles", cardX + paddingX, y);

  y += 145;

  ctx.font = "900 155px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    data.scrobbles.toLocaleString("pt-BR"),
    cardX + paddingX,
    y
  );

  y += 155;

  ctx.font = "500 40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("TOP ARTISTAS", cardX + paddingX, y);

  y += 70;

  ctx.font = "500 40px Arial";
  data.artists.slice(0, 5).forEach((artist, index) => {
    const itemY = y + index * 68;

    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillText(String(index + 1).padStart(2, "0"), cardX + paddingX, itemY);

    ctx.fillStyle = "white";
    ctx.fillText(
      truncateText(ctx, artist, 650),
      cardX + paddingX + 80,
      itemY
    );
  });

  y += 450;

  ctx.font = "500 40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("TOP MÚSICAS", cardX + paddingX, y);

  y += 70;

  ctx.font = "500 40px Arial";
  data.tracks.slice(0, 5).forEach((track, index) => {
    const itemY = y + index * 68;

    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillText(String(index + 1).padStart(2, "0"), cardX + paddingX, itemY);

    ctx.fillStyle = "white";
    ctx.fillText(
      truncateText(ctx, track, 650),
      cardX + paddingX + 80,
      itemY
    );
  });

  ctx.font = "500 24px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(formatStoryDate(), 56, 1870);

  ctx.textAlign = "right";
  ctx.fillText("quile.fm", 1024, 1870);
  ctx.textAlign = "left";

  const link = document.createElement("a");
  link.download = "quile-fm-story.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}