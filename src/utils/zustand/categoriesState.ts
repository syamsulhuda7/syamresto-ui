import { create } from "zustand";

interface Set {
  categories: CategoryData[];
}

interface Actions {
  setCategories: (categories: CategoryData[]) => void;
}

export const categoriesState = create<Set & Actions>((set) => ({
  categories: [],
  setCategories: (categories) => set(() => ({ categories })),
}));
