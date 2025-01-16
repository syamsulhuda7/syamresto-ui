import { create } from "zustand";
import { getCookie, setCookie } from "../cookies/instance";

interface Set {
  cartItems: CartItem[] | [];
}

interface Actions {
  addCartItems: (cartItem: CartItem) => void;
  reduceCartItems: (id: number) => void;
}

export const cartItemsStorage = create<Set & Actions>((set) => ({
  cartItems: JSON.parse(getCookie("cartItems") || "[]") || [],
  addCartItems: (cartItem: CartItem) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === cartItem.id
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += cartItem.quantity;
        setCookie("cartItems", JSON.stringify(updatedCartItems), 1);
        return { cartItems: updatedCartItems };
      } else {
        const newCartItems = [...state.cartItems, cartItem];
        setCookie("cartItems", JSON.stringify(newCartItems), 1);
        return { cartItems: newCartItems };
      }
    }),

  reduceCartItems: (id: number) =>
    set((state) => {
      const indexItem = state.cartItems.findIndex((item) => item.id === id);
      if (indexItem !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[indexItem].quantity -= 1;
        if (updatedCartItems[indexItem].quantity === 0) {
          updatedCartItems.splice(indexItem, 1);
        }
        setCookie("cartItems", JSON.stringify(updatedCartItems), 1);
        return { cartItems: updatedCartItems };
      }
      return state;
    }),
}));
