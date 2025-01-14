import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../../../utils/axios/instance";
import { getCookie, setCookie } from "../../../utils/cookies/instance";

interface ResponseType {
  data: {
    data: ImageProfileType[];
  };
}

export default function ProfileCards() {
  const [images, setImages] = useState<ImageProfileType[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/profiles");
        response.data.data.forEach((item: ImageProfileType) => {
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
          <div className="object-cover w-full h-full">
            {!loadedImages[index] && <div className="placeholder"></div>}
            <img
              onLoad={() => handleImageLoad(index)}
              className={`${
                loadedImages[index] ? "w-full h-full object-cover" : "loading"
              }`}
              src={image.image_url}
              alt={image.title}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
