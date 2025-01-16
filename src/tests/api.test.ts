import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  carouselData,
  categoriesData,
  productsData,
  profileData,
} from "../utils/api";
import api from "../utils/axios/instance";

const mock = new MockAdapter(axios);

describe("API Utils", () => {
  beforeEach(() => {
    mock.resetHandlers(); // Reset mock sebelum setiap tes
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Bersihkan mock setelah setiap tes
  });

  it("should fetch products data successfully", async () => {
    const mockResponseData = {
      data: {
        data: Array.from({ length: 72 }, (_, i) => ({
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
        })),
      },
    };

    // Mock endpoint `/products` with data
    mock.onGet("/products").reply(200, mockResponseData);

    const result = await productsData();

    // Validate the number of items returned
    expect(result).toHaveLength(72);

    // Validate the first item structure
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      slug: expect.any(String),
      description: expect.any(String),
      image_url: expect.stringContaining(
        "https://apisyamresto.syamdev.my.id/storage/"
      ),
      price: expect.any(Number),
      status: expect.any(String),
      sold: null,
      category: {
        id: expect.any(Number),
        name: expect.any(String),
        slug: expect.any(String),
        icon: expect.stringContaining("category-icon/"),
      },
    });
  });

  it("products data should return an empty array when an error occurs", async () => {
    // Mock api.get untuk mensimulasikan error
    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    const result = await productsData();

    // Pastikan hasilnya adalah array kosong
    expect(result).toStrictEqual([]);
  });

  it("products data should log the error", async () => {
    // Mock console.log untuk memeriksa apakah error tertangkap dan dilog
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    await productsData();

    // Verifikasi bahwa console.log dipanggil dengan error
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Network error"));

    consoleSpy.mockRestore(); // Membersihkan spy
  });

  it("should fetch categories data successfully", async () => {
    const mockResponseData = {
      data: {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: `Category ${i + 1}`,
          slug: `category-${i + 1}`,
          icon: `images/category-${i + 1}.jpg`,
        })),
      },
    };

    mock.onGet("/categories").reply(200, mockResponseData);

    const result = await categoriesData();

    expect(result).toHaveLength(5); // Pastikan jumlah data sesuai
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      slug: expect.any(String),
      icon: expect.stringContaining(
        "https://apisyamresto.syamdev.my.id/storage/"
      ),
    });
  });

  it("categories data should return an empty array when an error occurs", async () => {
    // Mock api.get untuk mensimulasikan error
    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    const result = await categoriesData();

    // Pastikan hasilnya adalah array kosong
    expect(result).toStrictEqual([]);
  });

  it("categories data should log the error", async () => {
    // Mock console.log untuk memeriksa apakah error tertangkap dan dilog
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    await categoriesData();

    // Verifikasi bahwa console.log dipanggil dengan error
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Network error"));

    consoleSpy.mockRestore(); // Membersihkan spy
  });

  it("should fetch carousel data successfully", async () => {
    mock.onGet("/carousels").reply(200);

    const result = await carouselData();

    expect(result).toHaveLength(9); // Pastikan jumlah data sesuai
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      status: expect.any(String),
      image_url: expect.stringContaining(
        "https://apisyamresto.syamdev.my.id/storage/"
      ),
    });
  });

  it("carousels data should return an empty array when an error occurs", async () => {
    // Mock api.get untuk mensimulasikan error
    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    const result = await carouselData();

    // Pastikan hasilnya adalah array kosong
    expect(result).toStrictEqual([]);
  });

  it("carousels data should log the error", async () => {
    // Mock console.log untuk memeriksa apakah error tertangkap dan dilog
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    await carouselData();

    // Verifikasi bahwa console.log dipanggil dengan error
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Network error"));

    consoleSpy.mockRestore(); // Membersihkan spy
  });

  it("should fetch profile data successfully", async () => {
    mock.onGet("/profiles").reply(200);

    const result = await profileData();

    expect(result).toHaveLength(7); // Pastikan jumlah data sesuai
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      status: expect.any(String),
      image_url: expect.stringContaining(
        "https://apisyamresto.syamdev.my.id/storage/"
      ),
    });
  });

  it("profiles data should return an empty array when an error occurs", async () => {
    // Mock api.get untuk mensimulasikan error
    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    const result = await profileData();

    // Pastikan hasilnya adalah array kosong
    expect(result).toStrictEqual([]);
  });

  it("profiles data should log the error", async () => {
    // Mock console.log untuk memeriksa apakah error tertangkap dan dilog
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    vi.spyOn(api, "get").mockRejectedValue(new Error("Network error"));

    await profileData();

    // Verifikasi bahwa console.log dipanggil dengan error
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Network error"));

    consoleSpy.mockRestore(); // Membersihkan spy
  });
});
