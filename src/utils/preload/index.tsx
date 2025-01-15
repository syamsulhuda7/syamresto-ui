import { useEffect } from "react";
import { carouselData, productsData } from "../api";

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
      const [carousels, products] = await Promise.all([
        carouselData(),
        productsData(),
      ]);

      // Gabungkan semua gambar dalam satu array
      const allImages = [
        ...carousels
          .slice(0, 2)
          .map((item: { image_url: string }) => item.image_url),
        ...products
          .slice(0, 3)
          .map((item: { image_url: string }) => item.image_url),
      ];

      // Preload gambar
      allImages.forEach(preloadImage);
    };

    fetchImages();
  }, []);

  return null;
};
