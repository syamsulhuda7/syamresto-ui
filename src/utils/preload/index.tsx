import { useEffect } from "react";
// import api from "../axios/instance";
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
      const carousels = await carouselData();
      const products = await productsData();
      const categories = await categoriesData();
      const profiles = await profileData();
      const imageCarousel = carousels.map((item: ImageCarouselType) => {
        return { image: item.image_url };
      });
      const promo = products.slice(0, 3).map((item: MenuData) => {
        return { image: item.image_url };
      });
      const topMenu = products.slice(-5).map((item: MenuData) => {
        return { image: item.image_url };
      });
      const category = categories.map((item: CategoryData) => {
        return { image: item.icon };
      });
      const profile = profiles.map((item: ImageProfileType) => {
        return { image: item.image_url };
      });
      const allData = [
        ...imageCarousel,
        ...promo,
        ...topMenu,
        ...category,
        ...profile,
      ];
      allData.forEach((imageUrl: { image: string }) => {
        preloadImage(imageUrl.image);
      });
    };

    fetchImages();
  }, []);

  return null;
};
