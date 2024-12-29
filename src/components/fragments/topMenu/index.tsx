import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { HomeCard } from "../../ui/homeCard";
import { FrameFragment } from "../../layouts/frameFragment";

export const TopMenu = () => {
  return (
    <FrameFragment className="bg-drk" innerClass="pt-[100px]">
      <div className="w-full h-fit flex items-center justify-between pb-[30px]">
        <p className="font-albertSans font-bold text-[40px] text-white">
          Top Menu
        </p>
        <p className="font-albertSans font-medium text-[24px] text-org">
          View All{" "}
          <KeyboardDoubleArrowRightSharpIcon className="scale-[1.15]" />
        </p>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <HomeCard
          category="Main Course"
          title="Seafood Pasta"
          className="w-[200px] aspect-[6/9] rounded-none"
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
        />
        <HomeCard
          category="Main Course"
          title="Seafood Pasta"
          className="w-[200px] aspect-[6/9] rounded-none"
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
        />
        <HomeCard
          category="Main Course"
          title="Seafood Pasta"
          className="w-[200px] aspect-[6/9] rounded-none"
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
        />
        <HomeCard
          category="Main Course"
          title="Seafood Pasta"
          className="w-[200px] aspect-[6/9] rounded-none"
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
        />
        <HomeCard
          category="Main Course"
          title="Seafood Pasta"
          className="w-[200px] aspect-[6/9] rounded-none"
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
        />
      </div>
      <div className="w-full h-[1.5px] bg-gry mt-[100px]" />
      <div className="w-full h-[2px] bg-gry mt-1" />
    </FrameFragment>
  );
};
