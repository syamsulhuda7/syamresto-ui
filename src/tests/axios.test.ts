import { describe, it, expect, vi } from "vitest";
import api from "../utils/axios/instance";

// Mock axios.create
// vi.mock("axios", () => ({
//   create: vi.fn().mockReturnValue({
//     interceptors: {
//       request: { use: vi.fn() },
//       response: { use: vi.fn() },
//     },
//     get: vi.fn(),
//   }),
// }));

describe("api.ts", () => {
  it("should set baseURL and timeout for axios instance", () => {
    const axiosInstance = api; // Menggunakan instance yang sudah dimock

    // Verifikasi konfigurasi dasar axios instance
    expect(axiosInstance.defaults.baseURL).toBe(
      "https://apisyamresto.syamdev.my.id/api"
    );
    expect(axiosInstance.defaults.timeout).toBe(5000);
  });

  //   it("should call request interceptor", async () => {
  //     const mockRequest = vi.fn();
  //     api.interceptors.request.use(mockRequest);

  //     // Simulasikan request
  //     const config = { headers: {} };
  //     await api(config);

  //     expect(mockRequest).toHaveBeenCalled(); // Memastikan interceptor request dipanggil
  //   });

  it("should handle response interceptor", async () => {
    const mockResponse = vi.fn().mockResolvedValue({ data: "response" });
    api.interceptors.response.use(mockResponse);

    // Simulasikan response
    await api.get("/carousels");

    expect(mockResponse).toHaveBeenCalled(); // Memastikan interceptor response dipanggil
  });

  it("should handle errors properly in response interceptor", async () => {
    const mockError = vi.fn().mockRejectedValue(new Error("error"));
    api.interceptors.response.use(null, mockError);

    // Simulasikan error response
    try {
      await api.get("/some-endpoint");
    } catch (error) {
      expect(mockError).toHaveBeenCalled(); // Memastikan error interceptor dipanggil
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("error");
    }
  });

  it("should reject error in request interceptor", async () => {
    // Membuat mock untuk error pada request interceptor
    const mockError = vi.fn().mockRejectedValue(new Error("Request Error"));
    api.interceptors.request.use(null, mockError);

    // Simulasikan error request
    const config = { headers: {} };

    // Menggunakan await dan menangkap rejection promise
    await expect(api(config)).rejects.toThrow("Request Error");

    // Verifikasi bahwa interceptor error telah dipanggil
    expect(mockError).toHaveBeenCalled();
  });
});
