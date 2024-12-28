import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { HomeCard } from "../../ui/homeCard";

export const TopMenu = () => {
  return (
    <div className="w-full h-fit flex items-center justify-center bg-drk">
      <div className="relative max-w-[1440px] w-full h-fit px-[130px] py-[100px]">
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
        <div className="absolute bottom-1 max-w-[1180px] w-full h-[1px] bg-gry"></div>
        <div className="absolute -bottom-[2px] max-w-[1180px] w-full h-[1.5px] bg-gry"></div>
      </div>
    </div>
  );
};
