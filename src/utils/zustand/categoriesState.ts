import { create } from "zustand";

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

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
