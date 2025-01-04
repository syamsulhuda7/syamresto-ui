import { create } from "zustand";

interface Set {
  search: string;
}

interface Actions {
  setSearch: (search: string) => void;
}

export const searchMenuStorage = create<Set & Actions>((set) => ({
  search: "",
  setSearch: (search) => set(() => ({ search })),
}));
