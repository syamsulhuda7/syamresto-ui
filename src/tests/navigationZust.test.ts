import { describe, it, expect, beforeEach } from "vitest";
import { navigationStore } from "../utils/zustand/navigation";

describe("navigationStore", () => {
  beforeEach(() => {
    // Reset state sebelum setiap tes
    navigationStore.setState({ navigation: "/" });
  });

  it("should initialize navigation with '/'", () => {
    const store = navigationStore.getState();

    // Verifikasi bahwa nilai awal navigation adalah '/'
    expect(store.navigation).toBe("/");
  });

  it("should update navigation when setNavigation is called", () => {
    const store = navigationStore.getState();

    // Memanggil setNavigation untuk memperbarui nilai navigation
    store.setNavigation("/about");

    // Mengambil state setelah perubahan
    const updatedStore = navigationStore.getState();

    // Verifikasi bahwa nilai navigation sudah diperbarui
    expect(updatedStore.navigation).toBe("/about");
  });

  it("should handle empty string as navigation", () => {
    const store = navigationStore.getState();

    // Memanggil setNavigation dengan string kosong
    store.setNavigation("");

    // Mengambil state setelah perubahan
    const updatedStore = navigationStore.getState();

    // Verifikasi bahwa nilai navigation sekarang adalah string kosong
    expect(updatedStore.navigation).toBe("");
  });
});
