import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { HomeCard } from "../../ui/homeCard";
import { FrameFragment } from "../../layouts/frameFragment";

type MenuData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  price: number;
  status: string;
  sold: number | null;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
  };
};

type TopMenuProps = {
  menuData: MenuData[];
};

export const TopMenu = ({ menuData }: TopMenuProps) => {
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
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-5">
        {menuData.map((data) => (
          <HomeCard
            key={data.id}
            category={data.category.name}
            title={data.name}
            className="w-[150px] md:w-[170px] xl:w-[200px] aspect-[6/9] rounded-none"
            src={data.image_url}
          />
        ))}
      </div>
      <div className="w-full h-[1.5px] bg-gry mt-[100px]" />
      <div className="w-full h-[2px] bg-gry mt-1" />
    </FrameFragment>
  );
};
