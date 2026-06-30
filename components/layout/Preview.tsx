"use client";

import StoryCard from "../capsule/StoryCard";
import { useStoryStore } from "@/store/storyStore";

export default function Preview() {
  const story = useStoryStore((state) => state.story);

  return (
    <section className="flex flex-1 items-center justify-center overflow-auto bg-gradient-to-br from-[#08080a] via-[#111118] to-black p-6">
      <div className="origin-top scale-[0.82] sm:scale-90 md:scale-100">
        <StoryCard data={story} />
      </div>
    </section>
  );
}