import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { HomeCard } from "../../ui/homeCard";
import { FrameFragment } from "../../layouts/frameFragment";
import { getCookie, setCookie } from "../../../utils/cookies/instance";
import { useEffect, useState } from "react";

interface TopMenuProps {
  menuData: MenuData[];
}

export const TopMenu = ({ menuData }: TopMenuProps) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    const loadedFromCookies = JSON.parse(
      getCookie("loadedTopMenuImages") || "[]"
    );
    setLoadedImages(loadedFromCookies);
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      setCookie("loadedTopMenuImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  return (
    <FrameFragment className="bg-drk" innerClass="pt-[100px]">
      <div className="w-full h-fit flex items-center justify-between pb-[30px]">
        <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[40px] text-white">
          Top Menu
        </p>
        <p className="font-albertSans font-medium text-base md:text-xl xl:text-[24px] text-org">
          View All{" "}
          <KeyboardDoubleArrowRightSharpIcon className="scale-[.75] md:scale-[.9] xl:scale-[1.15]" />
        </p>
      </div>
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-2 md:gap-5">
        {menuData.map((data, index) => (
          <HomeCard
            index={index}
            key={data.id}
            category={data.category.name}
            title={data.name}
            container="px-2 py-2 md:px-5 md:py-5 xl:px-6 xl:py-6"
            className="w-[100px] md:w-[170px] xl:w-[180px] aspect-[6/9] rounded-none"
            src={data.image_url}
            // loading="lazy"
            loadedImages={loadedImages}
            handleImageLoad={handleImageLoad}
          />
        ))}
      </div>
      <div className="w-full h-[1.5px] bg-gry mt-[100px]" />
      <div className="w-full h-[2px] bg-gry mt-1" />
    </FrameFragment>
  );
};
