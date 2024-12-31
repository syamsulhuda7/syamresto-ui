import { CardMenu } from "../../ui/cardMenu";
import { Pagination } from "../pagination";

type ListMenuProps = {
  menuData: {
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
  }[];
};

export const ListMenu = ({ menuData }: ListMenuProps) => {
  return (
    <div className="w-full md:w-[70%] h-full bg-white">
      <div className="w-full px-[30px] md:pr-[50px] xl:pr-[130px] md:pl-[50px] py-[50px]">
        <div className="w-full h-fit flex justify-between border-b border-drk pb-[20px]">
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-drk">
            Menu
          </p>
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[30px] text-gry">
            <span className="text-org">20</span> / 72
          </p>
        </div>
        {/* MENU */}
        <div className="pt-[30px] pb-[50px] flex flex-wrap gap-10 justify-center">
          <CardMenu menuData={menuData || []} />
        </div>
        <Pagination />
      </div>
    </div>
  );
};
