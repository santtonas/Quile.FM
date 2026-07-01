import { create } from "zustand";
import { StoryData } from "@/types/story";
import { mockStory } from "@/lib/mockData";

interface StoryStore {
  story: StoryData;
  setStory: (story: StoryData) => void;
  updateBackground: (background: string) => void;
  updateShowProfile: (showProfile: boolean) => void;
}

export const useStoryStore = create<StoryStore>((set) => ({
  story: mockStory,

  setStory: (story) => set({ story }),

  updateBackground: (background) =>
    set((state) => ({
      story: {
        ...state.story,
        background,
      },
    })),

  updateShowProfile: (showProfile) =>
    set((state) => ({
      story: {
        ...state.story,
        showProfile,
      },
    })),
}));