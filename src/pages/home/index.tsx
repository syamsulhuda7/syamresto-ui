import Carousel from "../../components/fragments/carousel";
import { Navbar } from "../../components/fragments/navbar";
import { Promo } from "../../components/fragments/promo";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Promo />
    </>
  );
};
