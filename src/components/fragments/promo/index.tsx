// import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

import { FrameFragment } from "../../layouts/frameFragment";
import { HomeCard } from "../../ui/homeCard";
import Timer from "../timer-3d";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";

const data = [
  {
    category: "Main Course",
  },
  {
    category: "Main Course",
  },
  {
    category: "Main Course",
  },
];
export const Promo = () => {
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
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-5 xl:gap-10">
        {data.map((_, index) => (
          <HomeCard
            key={index}
            category="Main Course"
            title="Seafood Pasta"
            discount="57%"
            className="w-[300px] xl:w-[350px] aspect-[9/7] rounded-xl"
            src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
          />
        ))}
      </div>
      <div className="w-full h-fit flex items-center justify-center pt-[30px]">
        <button className="px-4 py-2 font-semibold text-white bg-drk rounded-lg">
          Check All Promo <ArrowRightSharpIcon className="scale-150" />
        </button>
      </div>
    </FrameFragment>
  );
};
