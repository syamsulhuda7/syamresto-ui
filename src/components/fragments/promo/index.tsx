// import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

// import { useEffect, useState } from "react";
import { FrameFragment } from "../../layouts/frameFragment";
import { Button } from "../../ui/button";
import { HomeCard } from "../../ui/homeCard";
import Timer from "../timer-3d";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
// import { getCookie, setCookie } from "../../../utils/cookies/instance";

interface PromoProps {
  menuData: MenuData[];
}

export const Promo = ({ menuData }: PromoProps) => {
  // const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  // useEffect(() => {
  //   const loadedFromCookies = JSON.parse(
  //     getCookie("loadedTopMenuImages") || "[]"
  //   );
  //   setLoadedImages(loadedFromCookies);
  // }, []);

  // const handleImageLoad = (index: number) => {
  //   setLoadedImages((prevLoadedImages) => {
  //     const newLoadedImages = [...prevLoadedImages];
  //     newLoadedImages[index] = true;
  //     setCookie("loadedTopMenuImages", JSON.stringify(newLoadedImages), 1);
  //     return newLoadedImages;
  //   });
  // };

  return (
    <FrameFragment className="bg-white">
      <div className="w-full h-fit flex flex-col md:flex-row items-center justify-between pb-[30px]">
        <p className="font-albertSans font-bold text-drk text-2xl md:text-3xl xl:text-[40px]">
          Promo of the Week 🔥
        </p>
        <div className="scale-[.55] md:scale-[.75] xl:scale-[1]">
          <Timer initialSeconds={36010} />
        </div>
      </div>
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-3 xl:gap-10">
        {menuData.map((data) => (
          <HomeCard
            key={data.id}
            category={data.category.name}
            title={data.name}
            discount="32%"
            container="px-3 py-3 md:px-5 md:py-5 xl:px-6 xl:py-6"
            className="w-[150px] md:w-[220px] xl:w-[310px] aspect-[9/7] rounded-xl"
            src={data.image_url}
            priority="high"
            index={0}
            handleImageLoad={() => {}}
            loadedImages={[]}
          />
        ))}
      </div>
      <div className="w-full h-fit flex items-center justify-center pt-[30px]">
        <Button className="text-sm md:text-base font-semibold text-white bg-drk">
          Check All Promo <ArrowRightSharpIcon className="scale-150" />
        </Button>
      </div>
    </FrameFragment>
  );
};
