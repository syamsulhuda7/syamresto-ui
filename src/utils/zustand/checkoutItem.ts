import { create } from "zustand";

interface Set {
  checkoutItem: CartItem[] | [];
}

interface Actions {
  setCheckoutItem: (checkoutItem: CartItem[]) => void;
}

export const checkoutItemsStorage = create<Set & Actions>((set) => ({
  checkoutItem: [],
  setCheckoutItem: (checkoutItem) => set({ checkoutItem }),
}));
