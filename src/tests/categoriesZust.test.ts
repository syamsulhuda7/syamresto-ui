import { describe, it, expect, beforeEach } from "vitest";
import { categoriesState } from "../utils/zustand/categoriesState";

describe("categoriesState", () => {
  beforeEach(() => {
    // Reset store sebelum setiap tes
    categoriesState.setState({ categories: [] });
  });

  it("should initialize with an empty categories array", () => {
    const store = categoriesState.getState();
    expect(store.categories).toEqual([]); // Memastikan categories dimulai dengan array kosong
  });

  it("should set categories correctly", () => {
    const newCategories = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Category ${i + 1}`,
      slug: `category-${i + 1}`,
      icon: `images/category-${i + 1}.jpg`,
    }));

    // Memanggil setCategories dengan data baru
    categoriesState.getState().setCategories(newCategories);

    const store = categoriesState.getState();

    // Verifikasi bahwa categories sudah diubah sesuai dengan data baru
    expect(store.categories).toEqual(newCategories);
  });

  it("should update categories when setCategories is called multiple times", () => {
    const categories1 = [
      {
        id: 1,
        name: "Category 1",
        slug: "category-1",
        icon: "category-icon/icon1.svg",
      },
    ];

    const categories2 = [
      {
        id: 2,
        name: "Category 2",
        slug: "category-1",
        icon: "category-icon/icon1.svg",
      },
    ];

    // Memanggil setCategories pertama kali
    categoriesState.getState().setCategories(categories1);
    let store = categoriesState.getState();

    // Verifikasi bahwa categories diubah ke categories1
    expect(store.categories).toEqual(categories1);

    // Memanggil setCategories kedua kali
    categoriesState.getState().setCategories(categories2);
    store = categoriesState.getState();

    // Verifikasi bahwa categories diubah ke categories2
    expect(store.categories).toEqual(categories2);
  });
});
