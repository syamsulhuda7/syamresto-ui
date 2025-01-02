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
    // search: "",
    // priceMin: 0,
    // priceMax: 0,
    // ratingMin: 0,
    // ratingMax: 0,
    promo: {},
  },
  setFilter: (filter) => set(() => ({ filter })),
}));
