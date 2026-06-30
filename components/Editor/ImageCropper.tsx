"use client";

import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
  image: string;
  onCancel: () => void;
  onSave: (image: string) => void;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });
}

async function getCroppedImage(imageSrc: string, crop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return imageSrc;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL("image/jpeg");
}

export default function ImageCropper({
  image,
  onCancel,
  onSave,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  async function handleSave() {
    if (!croppedArea) return;

    const croppedImage = await getCroppedImage(image, croppedArea);
    onSave(croppedImage);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-[420px] rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-white">
        <h2 className="mb-4 text-lg font-semibold">Recortar imagem</h2>

        <div className="relative h-[520px] overflow-hidden rounded-xl bg-zinc-900">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={9 / 16}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) =>
              setCroppedArea(croppedAreaPixels)
            }
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">Zoom</label>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-zinc-700 py-3 text-sm font-medium hover:bg-zinc-900"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-red-500 py-3 text-sm font-medium hover:bg-red-600"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}