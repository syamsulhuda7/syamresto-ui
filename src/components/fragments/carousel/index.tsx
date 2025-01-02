import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useEffect, useState } from "react";
// import { useEffect, useState, useRef, LegacyRef } from "react";
import api from "../../../utils/axios/instance";
import { getCookie, setCookie } from "../../../utils/cookies/instance";

type ImageType = {
  id: number;
  title: string;
  image_url: string;
  status: string;
};

type ResponseType = {
  data: {
    data: ImageType[];
  };
};

export default function Carousel() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  // const swiperRef: LegacyRef<SwiperRef> = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/carousels");
        response.data.data.forEach((item: ImageType) => {
          item.image_url = `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`;
          return item;
        });
        setImages(response?.data?.data);
        const loadedFromCookies = JSON.parse(
          getCookie("loadedCarouselImages") || "[]"
        );
        setLoadedImages(loadedFromCookies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      setCookie("loadedCarouselImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  return (
    <div className="w-full aspect-[20/9] relative flex items-center justify-center">
      <Swiper
        slidesPerView={1}
        loop={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        speed={700}
        grabCursor={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCreative, Pagination, Autoplay, Navigation]}
        className="carousel-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide className="carousel-swiper-slide" key={index}>
            <div className="image-container">
              {!loadedImages[index] && <div className="placeholder"></div>}
              <img
                src={image.image_url}
                onLoad={() => handleImageLoad(index)}
                className={loadedImages[index] ? "loaded" : "loading"}
                alt={image.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
