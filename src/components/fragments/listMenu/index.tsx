import { useEffect, useMemo, useState } from "react";
import { CardMenu } from "../../ui/cardMenu";
import { Pagination } from "../pagination";
import { getCookie, setCookie } from "../../../utils/cookies/instance";
import { filterStorage } from "../../../utils/zustand/filterMenu";
import { searchMenuStorage } from "../../../utils/zustand/searchMenu";
import { menuDataStorage } from "../../../utils/zustand/menuData";

export const ListMenu = () => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [allMenu, setAllMenu] = useState<MenuData[]>([]);
  const [showMenu, setShowMenu] = useState<MenuData[]>([]);

  const filterValue = filterStorage((state) => state.filter);
  const setFilterValue = filterStorage((state) => state.setFilter);
  const searchMenuValue = searchMenuStorage((state) => state.search);
  const menuDataValue = menuDataStorage((state) => state.menuData);

  useEffect(() => {
    const loadedFromCookies = JSON.parse(
      getCookie("loadedListMenuImages") || "[]"
    );
    setLoadedImages(loadedFromCookies);
  }, []);

  useEffect(() => {
    setAllMenu(menuDataValue);
    setShowMenu(menuDataValue);
  }, [menuDataValue]);

  useEffect(() => {
    if (!searchMenuValue) return;
    const filteredMenu = menuDataValue.filter((item) =>
      item.name.includes(searchMenuValue)
    );
    setShowMenu(filteredMenu);
    setCurrentPage(1);
  }, [searchMenuValue]);

  useEffect(() => {
    console.log({ allMenu, showMenu, menuDataValue });
    console.log(filterValue);
    if (!filterValue.apply) return;
    const categoryFilter =
      filterValue.category !== "all" &&
      typeof filterValue.category === "string";
    const priceMinFilter = filterValue.priceMin !== 0;
    const priceMaxFilter = filterValue.priceMax !== 0;
    // const ratingFilter =
    //   (Array.isArray(filterValue.rating) && filterValue.rating[0] !== 0) ||
    //   (Array.isArray(filterValue.rating) && filterValue.rating[1] !== 0);
    // const promoFilter =
    //   filterValue.promo !== "all" && typeof filterValue.promo === "string";

    if (
      categoryFilter ||
      priceMinFilter ||
      priceMaxFilter
      // || ratingFilter ||
      // promoFilter
    ) {
      const filteredMenu = menuDataValue.filter((item) => {
        const categoryMatch = categoryFilter
          ? item.category.slug === filterValue.category
          : true;
        const priceMinMatch = priceMinFilter
          ? item.price >= filterValue.priceMin
          : true;
        const priceMaxMatch = priceMaxFilter
          ? item.price <= filterValue.priceMax
          : true;
        // const ratingMatch = ratingFilter
        //   ? item.rating >= filterValue.rating[0] && item.rating <= filterValue.rating[1]
        //   : true;
        // const promoMatch = promoFilter ? item.promo === filterValue.promo : true;
        return categoryMatch && priceMinMatch && priceMaxMatch;
      });
      if (filteredMenu.length > 0) {
        console.log(filteredMenu);
        setShowMenu(filteredMenu);
        setCurrentPage(1);
        setFilterValue({ ...filterValue, apply: false });
        return;
      } else {
        console.log(filteredMenu);
        setShowMenu([]);
        setCurrentPage(1);
        setFilterValue({ ...filterValue, apply: false });
        return;
      }
    }
    setFilterValue({ ...filterValue, apply: false });
    setShowMenu(allMenu);
    setCurrentPage(1);
  }, [filterValue, allMenu, setFilterValue, menuDataValue, showMenu]);

  useEffect(() => {
    // setCookie("loadedListMenuImages", JSON.stringify([]), 1);
    // setLoadedImages([]);
  }, [currentPage, showMenu]);

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

  const handleImageLoad = (itemId: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[itemId] = true;
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
        <div className="pt-[30px] pb-[50px] flex flex-wrap gap-5 md:gap-7 xl:gap-10 justify-center">
          {showMenu?.length === 0 && (
            <p className="text-center font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-org">
              Menu Not Found
            </p>
          )}
          <CardMenu
            menuData={currentItems || []}
            handleImageLoad={handleImageLoad}
            loadedImages={loadedImages}
          />
        </div>
        {showMenu?.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            onTop={onTop}
          />
        )}
      </div>
    </div>
  );
};
