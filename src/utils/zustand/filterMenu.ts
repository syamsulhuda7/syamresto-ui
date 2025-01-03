import { create } from "zustand";

interface Set {
  filter: FilterState;
}

interface Actions {
  setFilter: (filter: Set["filter"]) => void;
}

export const filterStorage = create<Set & Actions>((set) => ({
  filter: {
    category: {},
    priceMin: 0,
    priceMax: 0,
    rating: [1.5, 3.7],
    promo: {},
  },
  setFilter: (filter) => set(() => ({ filter })),
}));
