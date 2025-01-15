import { useEffect } from "react";
import {
  carouselData,
  categoriesData,
  productsData,
  profileData,
} from "../api";

export const PreloadImages = () => {
  const preloadImage = (url: string) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const [carousels, products, categories, profiles] = await Promise.all([
        carouselData(),
        productsData(),
        categoriesData(),
        profileData(),
      ]);

      // Gabungkan semua gambar dalam satu array
      const allImages = [
        ...carousels.map((item: { image_url: string }) => item.image_url),
        ...products
          .slice(0, 3)
          .map((item: { image_url: string }) => item.image_url),
        ...products
          .slice(-5)
          .map((item: { image_url: string }) => item.image_url),
        ...categories.map((item: { icon: string }) => item.icon),
        ...profiles.map((item: { image_url: string }) => item.image_url),
      ];

      console.log(allImages);
      // Preload gambar
      allImages.forEach(preloadImage);
    };

    fetchImages();
  }, []);

  return null;
};
