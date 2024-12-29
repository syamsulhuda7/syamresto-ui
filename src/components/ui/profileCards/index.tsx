import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { EffectCards } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../../../utils/axios/instance";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/carousels");
        response.data.data.forEach((item: ImageType) => {
          item.image_url = `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`;
          return item;
        });
        setImages(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="profile-cards-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="profile-cards-swiper-slide">
            <img
              className="absolute object-cover w-full h-full"
              src={image.image_url}
              alt={image.title}
            />
            {image.title}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
