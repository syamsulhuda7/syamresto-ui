import { useEffect, useState } from "react";
import { Booking } from "../../components/fragments/booking";
import Carousel from "../../components/fragments/carousel";
import { ExploreCategory } from "../../components/fragments/exploreCategory";
import { Footer } from "../../components/fragments/footer";
import { Navbar } from "../../components/fragments/navbar";
import { Performance } from "../../components/fragments/performance";
import { Profile } from "../../components/fragments/profile";
import { Promo } from "../../components/fragments/promo";
import { TopMenu } from "../../components/fragments/topMenu";
import { productsData } from "../../utils/api";

export const Home = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productData: MenuData[] = (await productsData()) || [];
      setMenuData(productData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Carousel />
      <Promo menuData={menuData.slice(0, 3) || []} />
      <TopMenu menuData={menuData.slice(-5) || []} />
      <ExploreCategory />
      <Profile />
      <Booking />
      <Performance />
      <Footer />
    </>
  );
};
