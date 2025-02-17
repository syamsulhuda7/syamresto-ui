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
import { carouselData } from "../../../utils/api";
// import { getCookie, setCookie } from "../../../utils/cookies/instance";

export default function Carousel() {
  const [images, setImages] = useState<ImageCarouselType[]>([]);
  // const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await carouselData();
      setImages(response);

      // const loadedImages = getCookie("loadedCarouselImages");
      // if (loadedImages) {
      //   setLoadedImages(JSON.parse(loadedImages));
      // }
    };

    fetchData();
  }, []);

  // const handleImageLoad = (index: number) => {
  //   setLoadedImages((prevLoadedImages) => {
  //     const newLoadedImages = [...prevLoadedImages];
  //     newLoadedImages[index] = true;
  //     setCookie("loadedCarouselImages", JSON.stringify(newLoadedImages), 1);
  //     return newLoadedImages;
  //   });
  // };

  return (
    <div className="w-full aspect-[20/9] relative flex items-center justify-center">
      <Swiper
        slidesPerView={1}
        loop={false}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
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
              {/* {!loadedImages[index] && <div className="placeholder"></div>} */}
              <img
                src={image.image_url}
                // onLoad={() => handleImageLoad(index)}
                // className={loadedImages[index] ? "loaded" : "loading"}
                className={"loaded"}
                alt={image.title}
                fetchPriority={index <= 1 ? "high" : "low"}
                loading={`${index <= 1 ? "eager" : "lazy"}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
