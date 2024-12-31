import api from "../axios/instance";

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

type CategoryData = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};

type ResponseType = {
  data: {
    data: MenuData[];
  };
};

export const productsData = async () => {
  try {
    const response: ResponseType = await api.get("/products");
    response.data.data.forEach((item: MenuData) => {
      item.image_url = `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`;
      return item;
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const categoriesData = async () => {
  try {
    const response = await api.get("/categories");
    response.data.data.forEach((item: CategoryData) => {
      item.icon = `https://apisyamresto.syamdev.my.id/storage/${item.icon}`;
      return item;
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
