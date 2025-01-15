import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { profileData } from "../../../utils/api";
// import { getCookie, setCookie } from "../../../utils/cookies/instance";

export default function ProfileCards() {
  const [images, setImages] = useState<ImageProfileType[]>([]);
  // const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await profileData();
      setImages(response);
    };

    fetchData();
  }, []);

  // const handleImageLoad = (index: number) => {
  //   setLoadedImages((prevLoadedImages) => {
  //     const newLoadedImages = [...prevLoadedImages];
  //     newLoadedImages[index] = true;
  //     setCookie("loadedProfileImages", JSON.stringify(newLoadedImages), 1);
  //     return newLoadedImages;
  //   });
  // };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      coverflowEffect={{
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      speed={1200}
      pagination={true}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="container-coverflow-swiper"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id} className="coverflow-swiper-slide">
          <div className="object-cover w-full h-full">
            {/* {!loadedImages[index] && <div className="placeholder"></div>} */}
            <img
              // onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover`}
              // className={`${
              //   loadedImages[index] ? "w-full h-full object-cover" : "loading"
              // }`}
              src={image.image_url}
              alt={image.title}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
