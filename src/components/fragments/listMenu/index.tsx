import { useEffect, useMemo, useState } from "react";
import { CardMenu } from "../../ui/cardMenu";
import { Pagination } from "../pagination";
import { getCookie, setCookie } from "../../../utils/cookies/instance";
import { filterStorage } from "../../../utils/zustand/filterMenu";

interface ListMenuProps {
  menuData: MenuData[];
}

export const ListMenu = ({ menuData }: ListMenuProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [allMenu, setAllMenu] = useState<MenuData[]>([]);
  const [showMenu, setShowMenu] = useState<MenuData[]>([]);

  const filterValue = filterStorage((state) => state.filter);
  const setFilterValue = filterStorage((state) => state.setFilter);

  useEffect(() => {
    const loadedFromCookies = JSON.parse(
      getCookie("loadedListMenuImages") || "[]"
    );
    setLoadedImages(loadedFromCookies);
  }, []);

  useEffect(() => {
    setAllMenu(menuData);
    setShowMenu(allMenu);
  }, [menuData]);

  useEffect(() => {
    console.log(filterValue);
    if (!filterValue.apply) return;
    const categoryFilter =
      filterValue.category !== "all" &&
      typeof filterValue.category === "string";
    const priceMinFilter = filterValue.priceMin !== 0;
    const priceMaxFilter = filterValue.priceMax !== 0;
    const ratingFilter =
      (Array.isArray(filterValue.rating) && filterValue.rating[0] !== 0) ||
      (Array.isArray(filterValue.rating) && filterValue.rating[1] !== 0);
    const promoFilter =
      filterValue.promo !== "all" && typeof filterValue.promo === "string";

    if (
      categoryFilter ||
      priceMinFilter ||
      priceMaxFilter ||
      ratingFilter ||
      promoFilter
    ) {
      // const filteredMenu = allMenu.filter(
      //   (item) =>
      //     categoryFilter &&
      //     item.category.slug === filterValue.category &&
      //     priceMinFilter &&
      //     item.price > filterValue.priceMin
      // );
      // console.log("masuk sini");
      const filteredMenu = allMenu.filter((item) => {
        return item.category.slug === filterValue.category;
      });
      if (filteredMenu.length > 0) {
        setShowMenu(filteredMenu);
        setCurrentPage(1);
        console.log({ filteredMenu });
        return;
      }
    }
    setFilterValue({ ...filterValue, apply: false });
    setShowMenu(allMenu);
  }, [filterValue.apply]);

  useEffect(() => {
    setCookie("loadedListMenuImages", JSON.stringify([]), 1);
    setLoadedImages([]);
  }, [currentPage, filterValue.apply]);

  const totalPages = Math.ceil(showMenu?.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return showMenu.slice(startIndex, endIndex);
  }, [currentPage, showMenu, itemsPerPage]);

  const onTop = () => {
    const targetElement = document.getElementById("view-target");
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      setCookie("loadedListMenuImages", JSON.stringify(newLoadedImages), 1);
      return newLoadedImages;
    });
  };

  return (
    <div className="w-full md:w-[70%] h-full bg-white">
      <div className="w-full px-[30px] md:pr-[50px] xl:pr-[130px] md:pl-[50px] py-[50px]">
        <div className="w-full h-fit flex justify-between border-b border-drk pb-[15px]">
          <p className="py-1 font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-drk">
            Menu
          </p>
          <p className="py-1 font-albertSans font-bold text-2xl md:text-3xl xl:text-[30px] text-gry">
            <span className="text-org">{currentItems?.length}</span> /{" "}
            {showMenu?.length}
          </p>
        </div>
        {/* MENU */}
        <div className="pt-[30px] pb-[50px] flex flex-wrap gap-10 justify-center">
          <CardMenu
            menuData={currentItems || []}
            handleImageLoad={handleImageLoad}
            loadedImages={loadedImages}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onTop={onTop}
        />
      </div>
    </div>
  );
};
