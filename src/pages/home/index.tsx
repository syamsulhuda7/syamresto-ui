import Carousel from "../../components/fragments/carousel";
import { ExploreCategory } from "../../components/fragments/exploreCategory";
import { Navbar } from "../../components/fragments/navbar";
import { Performance } from "../../components/fragments/performance";
import { Profile } from "../../components/fragments/profile";
import { Promo } from "../../components/fragments/promo";
import { TopMenu } from "../../components/fragments/topMenu";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Promo />
      <TopMenu />
      <ExploreCategory />
      <Profile />
      <Performance />
    </>
  );
};
