import { describe, it, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  carouselData,
  categoriesData,
  productsData,
  profileData,
} from "../utils/api";

const mock = new MockAdapter(axios);

describe("API Utils", () => {
  beforeEach(() => {
    mock.resetHandlers(); // Reset mock sebelum setiap tes
  });

  afterEach(() => {
    mock.restore(); // Bersihkan mock setelah setiap tes
  });

  it("should fetch products data successfully", async () => {
    // Mock endpoint `/products`
    mock.onGet("/products").reply(200);

    const result = await productsData();

    // Pastikan jumlah data sesuai dengan mock response
    expect(result).toHaveLength(72);

    // Validasi elemen pertama
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

  //   it("should return an empty array when productsData fails", async () => {
  //     mock.onGet("/products").networkError();

  //     const result = await productsData();

  //     expect(result).toEqual([]);
  //   });

  it("should fetch categories data successfully", async () => {
    mock.onGet("/categories").reply(200);

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

  //   it("should handle error in categoriesData gracefully", async () => {
  //     mock.onGet("/categories").reply(500);

  //     const result = await categoriesData();

  //     expect(result).toEqual([]);
  //   });

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
});
