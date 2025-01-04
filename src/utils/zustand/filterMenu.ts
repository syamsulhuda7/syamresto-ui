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
    rating: [0, 0],
    promo: {},
    apply: false,
  },
  setFilter: (filter) => set(() => ({ filter })),
}));
