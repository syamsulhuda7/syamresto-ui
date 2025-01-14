import api from "../axios/instance";

interface ResponseType {
  data: {
    data: MenuData[];
  };
}

export const productsData = async () => {
  try {
    const response: ResponseType = await api.get("/products");
    const updatedProducts = response.data.data.map((item: MenuData) => {
      return {
        ...item,
        image_url: `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`,
      };
    });
    return updatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const categoriesData = async () => {
  try {
    const response = await api.get("/categories");
    const updatedCategories = response.data.data.map((item: CategoryData) => {
      return {
        ...item,
        icon: `https://apisyamresto.syamdev.my.id/storage/${item.icon}`,
      };
    });
    return updatedCategories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const carouselData = async () => {
  try {
    const response = await api.get("/carousels");
    const updatedCarousels = response.data.data.map(
      (item: ImageCarouselType) => {
        return {
          ...item,
          image_url: `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`,
        };
      }
    );
    return updatedCarousels;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export const profileData = async () => {
  try {
    const response = await api.get("/profiles");
    const updatedProfiles = response.data.data.map((item: ImageProfileType) => {
      return {
        ...item,
        image_url: `https://apisyamresto.syamdev.my.id/storage/${item.image_url}`,
      };
    });
    return updatedProfiles;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
