import { describe, it, expect, beforeEach } from "vitest";
import { snackbarStorage } from "../utils/zustand/snackbar";

describe("snackbarStorage", () => {
  beforeEach(() => {
    // Reset state sebelum setiap test
    snackbarStorage.setState({
      snackbar: {
        open: false,
        mainText: "",
        subText: "",
      },
    });
  });

  it("should initialize snackbar with default values", () => {
    const store = snackbarStorage.getState();

    // Verifikasi bahwa snackbar diinisialisasi dengan nilai default
    expect(store.snackbar.open).toBe(false);
    expect(store.snackbar.mainText).toBe("");
    expect(store.snackbar.subText).toBe("");
  });

  it("should update snackbar state when setSnackbar is called", () => {
    const store = snackbarStorage.getState();

    // Memanggil setSnackbar untuk memperbarui state snackbar
    store.setSnackbar({
      open: true,
      mainText: "Main Text",
      subText: "Sub Text",
    });

    // Mengambil state setelah perubahan
    const updatedStore = snackbarStorage.getState();

    // Verifikasi bahwa snackbar state telah diperbarui
    expect(updatedStore.snackbar.open).toBe(true);
    expect(updatedStore.snackbar.mainText).toBe("Main Text");
    expect(updatedStore.snackbar.subText).toBe("Sub Text");
  });

  it("should handle snackbar state with empty values", () => {
    const store = snackbarStorage.getState();

    // Memanggil setSnackbar dengan nilai kosong
    store.setSnackbar({
      open: false,
      mainText: "",
      subText: "",
    });

    // Mengambil state setelah perubahan
    const updatedStore = snackbarStorage.getState();

    // Verifikasi bahwa snackbar state masih kosong
    expect(updatedStore.snackbar.open).toBe(false);
    expect(updatedStore.snackbar.mainText).toBe("");
    expect(updatedStore.snackbar.subText).toBe("");
  });
});
