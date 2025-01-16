import { describe, it, expect, beforeEach } from "vitest";
import { menuDataStorage } from "../utils/zustand/menuData";

describe("menuDataStorage", () => {
  beforeEach(() => {
    // Reset store sebelum setiap tes
    menuDataStorage.setState({ menuData: [] });
  });

  it("should initialize with an empty menuData array", () => {
    const store = menuDataStorage.getState();
    expect(store.menuData).toEqual([]);
  });

  it("should update menuData when setMenuData is called", () => {
    const newMenuData = Array.from({ length: 72 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      slug: `product-${i + 1}`,
      description: `Description for product ${i + 1}`,
      image_url: `images/product-${i + 1}.jpg`,
      price: 100 + i,
      status: "available",
      sold: null,
      category: {
        id: 1,
        name: "Category 1",
        slug: "category-1",
        icon: "category-icon/icon1.svg",
      },
    }));

    // Memanggil setMenuData dengan data baru
    menuDataStorage.getState().setMenuData(newMenuData);

    const store = menuDataStorage.getState();

    // Verifikasi bahwa menuData sudah diperbarui
    expect(store.menuData).toEqual(newMenuData);
  });

  it("should not affect other data when menuData is updated", () => {
    const initialMenuData = [
      {
        id: 1,
        name: `Product ${1}`,
        slug: `product-${1}`,
        description: `Description for product ${1}`,
        image_url: `images/product-${1}.jpg`,
        price: 100,
        status: "available",
        sold: null,
        category: {
          id: 1,
          name: "Category 1",
          slug: "category-1",
          icon: "category-icon/icon1.svg",
        },
      },
    ];

    // Memanggil setMenuData untuk pertama kali
    menuDataStorage.getState().setMenuData(initialMenuData);

    const storeAfterFirstUpdate = menuDataStorage.getState();
    expect(storeAfterFirstUpdate.menuData).toEqual(initialMenuData);

    // Memperbarui menuData dengan data baru
    const updatedMenuData = [
      {
        id: 1,
        name: `Product ${2}`,
        slug: `product-${2}`,
        description: `Description for product ${2}`,
        image_url: `images/product-${2}.jpg`,
        price: 200,
        status: "available",
        sold: null,
        category: {
          id: 2,
          name: "Category 2",
          slug: "category-2",
          icon: "category-icon/icon2.svg",
        },
      },
    ];
    menuDataStorage.getState().setMenuData(updatedMenuData);

    const storeAfterSecondUpdate = menuDataStorage.getState();
    // Verifikasi bahwa menuData sudah diperbarui sesuai dengan yang baru
    expect(storeAfterSecondUpdate.menuData).toEqual(updatedMenuData);
  });
});
