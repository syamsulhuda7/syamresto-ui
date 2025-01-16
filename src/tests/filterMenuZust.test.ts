import { describe, it, expect, beforeEach } from "vitest";
import { filterStorage } from "../utils/zustand/filterMenu";

describe("filterStorage", () => {
  beforeEach(() => {
    // Reset store sebelum setiap tes
    filterStorage.setState({
      filter: {
        category: {},
        priceMin: 0,
        priceMax: 0,
        rating: [0, 0],
        promo: {},
        topMenu: {},
        apply: false,
      },
    });
  });

  it("should initialize with the default filter state", () => {
    const store = filterStorage.getState();
    expect(store.filter).toEqual({
      category: {},
      priceMin: 0,
      priceMax: 0,
      rating: [0, 0],
      promo: {},
      topMenu: {},
      apply: false,
    });
  });

  it("should update filter state when setFilter is called", () => {
    const newFilter = {
      category: { id: 1, name: "Category 1" },
      priceMin: 100,
      priceMax: 500,
      rating: [3, 5],
      promo: { code: "SAVE20" },
      topMenu: { featured: true },
      apply: true,
    };

    // Memanggil setFilter dengan filter baru
    filterStorage.getState().setFilter(newFilter);

    const store = filterStorage.getState();

    // Verifikasi bahwa filter sudah diperbarui
    expect(store.filter).toEqual(newFilter);
  });

  it("should preserve the previous filter when only part of it is updated", () => {
    const partialFilterUpdate = {
      priceMin: 50,
      priceMax: 200,
    };

    // Memanggil setFilter dengan pembaruan sebagian filter
    filterStorage.getState().setFilter({
      ...filterStorage.getState().filter,
      ...partialFilterUpdate,
    });

    const store = filterStorage.getState();

    // Verifikasi bahwa harga diperbarui, tetapi filter lain tetap terjaga
    expect(store.filter.priceMin).toBe(50);
    expect(store.filter.priceMax).toBe(200);
    expect(store.filter.category).toEqual({});
    expect(store.filter.rating).toEqual([0, 0]);
    expect(store.filter.promo).toEqual({});
    expect(store.filter.topMenu).toEqual({});
    expect(store.filter.apply).toBe(false);
  });
});
