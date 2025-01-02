import { create } from "zustand";

interface Set {
  categories: CategoryData[];
}

interface Actions {
  setCategories: (categories: CategoryData[]) => void;
}

export const categoriesState = create<Set & Actions>(
  (set) => (
    console.log("from categoriesState"),
    {
      categories: [],
      setCategories: (categories) => set(() => ({ categories })),
    }
  )
);
