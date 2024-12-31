import { useEffect, useState } from "react";
import { FrameFragment } from "../../layouts/frameFragment";
import { categoriesData } from "../../../utils/api";
type CategoryData = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};
export const ExploreCategory = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data: CategoryData[] = await categoriesData();
      setCategory(data);
    };
    fetchCategory();
  }, []);

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
          >
            <img
              className="w-[70px] md:w-[100px] xl:w-[150px] aspect-[1/1] rounded-full object-cover"
              src={data.icon}
            />
            <p className="font-albertSans font-semibold text-sm md:text-[20px] text-white text-center pt-3">
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </FrameFragment>
  );
};
