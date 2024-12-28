import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { useEffect, useState, useRef, LegacyRef } from "react";
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
  const swiperRef: LegacyRef<SwiperRef> = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/carousels");
        response.data.data.forEach((item: ImageType) => {
          item.image_url = `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`;
          return item;
        });
        setImages(response?.data?.data);
        const loadedFromCookies = JSON.parse(getCookie("loadedImages") || "[]");
        setLoadedImages(loadedFromCookies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.update();
      swiperInstance.autoplay.start();
      swiperInstance.slideTo(0); // Memaksa untuk memulai dari slide pertama
    }
  }, [images]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      setCookie("loadedImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        loop={true}
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
        modules={[EffectCreative, Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
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
    </>
  );
}
