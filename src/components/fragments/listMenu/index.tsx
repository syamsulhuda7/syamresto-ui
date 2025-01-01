import { useEffect, useMemo, useState } from "react";
import { CardMenu } from "../../ui/cardMenu";
import { Pagination } from "../pagination";

interface DetailMenu {
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
}
type ListMenuProps = {
  menuData: DetailMenu[];
};

export const ListMenu = ({ menuData }: ListMenuProps) => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allMenu, setAllMenu] = useState<DetailMenu[]>([]);
  const [showMenu, setShowMenu] = useState<DetailMenu[]>([]);

  useEffect(() => {
    setAllMenu(menuData);
    setShowMenu(menuData);
  }, [menuData]);

  const totalPages = Math.ceil(allMenu?.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return showMenu.slice(startIndex, endIndex);
  }, [currentPage, showMenu, itemsPerPage]);

  return (
    <div className="w-full md:w-[70%] h-full bg-white">
      <div className="w-full px-[30px] md:pr-[50px] xl:pr-[130px] md:pl-[50px] py-[50px]">
        <div className="w-full h-fit flex justify-between border-b border-drk pb-[20px]">
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-drk">
            Menu
          </p>
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[30px] text-gry">
            <span className="text-org">{currentItems?.length}</span> /{" "}
            {showMenu?.length}
          </p>
        </div>
        {/* MENU */}
        <div className="pt-[30px] pb-[50px] flex flex-wrap gap-10 justify-center">
          <CardMenu menuData={currentItems || []} />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
