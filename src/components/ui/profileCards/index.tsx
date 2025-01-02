import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
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

export default function ProfileCards() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/profiles");
        response.data.data.forEach((item: ImageType) => {
          item.image_url = `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`;
          return item;
        });
        setImages(response?.data?.data);
        const loadedFromCookies = JSON.parse(
          getCookie("loadedProfileImages") || "[]"
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
      setCookie("loadedProfileImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      coverflowEffect={{
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      speed={700}
      pagination={true}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="container-coverflow-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.id} className="coverflow-swiper-slide">
          {!loadedImages[index] && (
            <div className="absolute object-cover w-full h-full bg-black"></div>
          )}
          <img
            onLoad={() => handleImageLoad(index)}
            className={`${
              loadedImages[index]
                ? "absolute object-cover w-full h-full block"
                : "hidden"
            }`}
            src={image.image_url}
            alt={image.title}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
