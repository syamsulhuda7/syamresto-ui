import { create } from "zustand";

interface Set {
  menuData: MenuData[];
}

interface Actions {
  setMenuData: (menuData: MenuData[]) => void;
}

export const menuDataStorage = create<Set & Actions>((set) => ({
  menuData: [],
  setMenuData: (menuData: MenuData[]) => set(() => ({ menuData })),
}));
