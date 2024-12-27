import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
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

// Lazy loading image component
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("src", src);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{
        content: loaded ? "" : "Loading..."
      }}
    />
  );
}

export default function Carousel() {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await api.get("/carousels");
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
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
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
            <LazyImage
              src={`https://apisyamresto.syamdev.my.id/storage/${image.image_url}`}
              alt={image.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
