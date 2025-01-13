import { useEffect, useState } from "react";
import { FrameFragment } from "../../layouts/frameFragment";
import { categoriesData } from "../../../utils/api";
import { categoriesState } from "../../../utils/zustand/categoriesState";
import { getCookie, setCookie } from "../../../utils/cookies/instance";
import { filterStorage } from "../../../utils/zustand/filterMenu";
import { useNavigate } from "react-router";
import { navigationStore } from "../../../utils/zustand/navigation";

export const ExploreCategory = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const setCategoryState = categoriesState((state) => state.setCategories);
  const categoryState = categoriesState((state) => state.categories);
  const setNavigation = navigationStore((state) => state.setNavigation);
  const setFilterValue = filterStorage((state) => state.setFilter);
  const filterValue = filterStorage((state) => state.filter);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (categoryState.length > 0) {
          setCategory(categoryState);
          return;
        }
        const data: CategoryData[] = await categoriesData();
        if (data.length > 0) {
          setCategory(data);
          setCategoryState(data);
          const loadedFromCookies = JSON.parse(
            getCookie("loadedCarouselImages") || "[]"
          );
          setLoadedImages(loadedFromCookies);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, [categoryState, setCategoryState]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      setCookie("loadedImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  const handleCategoryFilter = (slug: string) => () => {
    navigate("/menu");
    setNavigation("menu");
    setFilterValue({ ...filterValue, category: slug, apply: true });
  };

  return (
    <FrameFragment className="bg-drk" innerClass="pb-[100px] pt-[50px]">
      <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[40px] text-white pb-[30px] text-center">
        Explore By Categories
      </p>
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-5 md:gap-10 xl:gap-16">
        {category.map((data, index) => (
          <div
            className="flex flex-col items-center hover:scale-[1.05] transition-all ease-in-out duration-[200ms] cursor-pointer"
            key={index}
            onClick={handleCategoryFilter(data.slug)}
          >
            <div className="w-[70px] md:w-[100px] xl:w-[150px] overflow-hidden aspect-[1/1] rounded-full">
              {!loadedImages[index] && <div className="placeholder"></div>}
              <img
                onLoad={() => handleImageLoad(index)}
                className={`${
                  loadedImages[index] ? "w-full h-full object-cover" : "loading"
                }`}
                src={data.icon}
                alt={data.name}
              />
            </div>
            <p className="font-albertSans font-semibold text-sm md:text-[20px] text-white text-center pt-3">
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </FrameFragment>
  );
};
