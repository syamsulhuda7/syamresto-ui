import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { getCookie, setCookie } from "../utils/cookies/instance";

describe("Cookie Utilities", () => {
  let originalCookie: string;

  beforeEach(() => {
    // Simpan nilai cookie asli untuk mengembalikannya setelah tes
    originalCookie = document.cookie;
    // Mock document.cookie untuk menghindari perubahan cookie asli
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    // Kembalikan nilai cookie asli setelah tes
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: originalCookie,
    });
  });

  it("should set cookie with the correct name, value, and expiration", () => {
    const name = "user";
    const value = "john_doe";
    const days = 7;

    setCookie(name, value, days);

    // Verifikasi bahwa cookie telah diset dengan benar
    expect(document.cookie).toContain(`${name}=${value}`);
    expect(document.cookie).toContain("expires=");
  });

  it("should get the correct cookie value", () => {
    const name = "user";
    const value = "john_doe";

    // Set cookie secara langsung untuk pengujian
    document.cookie = `${name}=${value};path=/`;

    const result = getCookie(name);

    // Verifikasi bahwa nilai cookie yang diambil sesuai dengan yang disetel
    expect(result).toBe(value);
  });

  it("should return null if cookie is not found", () => {
    const name = "non_existing_cookie";

    const result = getCookie(name);

    // Verifikasi bahwa hasilnya adalah null karena cookie tidak ada
    expect(result).toBeNull();
  });
});
