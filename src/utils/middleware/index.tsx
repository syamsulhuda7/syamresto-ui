import { useEffect } from "react";
import { menuDataStorage } from "../zustand/menuData";
import { productsData } from "../api";

const useMiddleware = () => {
  const menuDataValue = menuDataStorage((state) => state.menuData);
  const setMenuData = menuDataStorage((state) => state.setMenuData);

  useEffect(() => {
    const fetchData = async () => {
      const response: MenuData[] = (await productsData()) || [];
      setMenuData(response);
    };

    if (menuDataValue.length === 0) fetchData();
  }, [menuDataValue, setMenuData]);
};

export default useMiddleware;
