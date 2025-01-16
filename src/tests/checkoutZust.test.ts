import { describe, it, expect, beforeEach } from "vitest";
import { checkoutItemsStorage } from "../utils/zustand/checkoutItem";

describe("checkoutItemsStorage", () => {
  beforeEach(() => {
    // Reset store sebelum setiap tes
    checkoutItemsStorage.setState({ checkoutItem: [] });
  });

  it("should initialize with an empty checkoutItem array", () => {
    const store = checkoutItemsStorage.getState();
    expect(store.checkoutItem).toEqual([]); // Memastikan checkoutItem dimulai dengan array kosong
  });

  it("should set checkoutItem correctly", () => {
    const newCheckoutItems = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
        image_url: "img.webp",
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 2,
        image_url: "img.webp",
      },
    ];

    // Memanggil setCheckoutItem dengan data baru
    checkoutItemsStorage.getState().setCheckoutItem(newCheckoutItems);

    const store = checkoutItemsStorage.getState();

    // Verifikasi bahwa checkoutItem sudah diubah sesuai dengan data baru
    expect(store.checkoutItem).toEqual(newCheckoutItems);
  });

  it("should update checkoutItem when setCheckoutItem is called multiple times", () => {
    const checkoutItems1 = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
        image_url: "img.webp",
      },
    ];

    const checkoutItems2 = [
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 2,
        image_url: "img.webp",
      },
      {
        id: 5,
        name: "Product 5",
        price: 2030,
        quantity: 12,
        image_url: "img.webp",
      },
    ];

    // Memanggil setCheckoutItem pertama kali
    checkoutItemsStorage.getState().setCheckoutItem(checkoutItems1);
    let store = checkoutItemsStorage.getState();

    // Verifikasi bahwa checkoutItem diubah ke checkoutItems1
    expect(store.checkoutItem).toEqual(checkoutItems1);

    // Memanggil setCheckoutItem kedua kali
    checkoutItemsStorage.getState().setCheckoutItem(checkoutItems2);
    store = checkoutItemsStorage.getState();

    // Verifikasi bahwa checkoutItem diubah ke checkoutItems2
    expect(store.checkoutItem).toEqual(checkoutItems2);
  });
});
