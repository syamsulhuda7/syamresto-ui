import { describe, it, expect, beforeEach } from "vitest";
import { searchMenuStorage } from "../utils/zustand/searchMenu";

describe("searchMenuStorage", () => {
  beforeEach(() => {
    // Reset state sebelum setiap test
    searchMenuStorage.setState({ search: "" });
  });

  it("should initialize search with an empty string", () => {
    const store = searchMenuStorage.getState();

    // Verifikasi bahwa nilai awal search adalah ""
    expect(store.search).toBe("");
  });

  it("should update search when setSearch is called", () => {
    const store = searchMenuStorage.getState();

    // Memanggil setSearch untuk memperbarui nilai search
    store.setSearch("new search");

    // Mengambil state setelah perubahan
    const updatedStore = searchMenuStorage.getState();

    // Verifikasi bahwa nilai search sudah diperbarui
    expect(updatedStore.search).toBe("new search");
  });

  it("should handle empty search string", () => {
    const store = searchMenuStorage.getState();

    // Memanggil setSearch dengan string kosong
    store.setSearch("");

    // Mengambil state setelah perubahan
    const updatedStore = searchMenuStorage.getState();

    // Verifikasi bahwa nilai search sekarang adalah string kosong
    expect(updatedStore.search).toBe("");
  });
});
