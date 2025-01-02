declare global {
  interface CategoryData {
    id: number;
    name: string;
    slug: string;
    icon: string;
  }

  interface MenuData {
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

  interface ImageProfileType {
    id: number;
    title: string;
    image_url: string;
    status: string;
  }

  interface ImageCarouselType {
    id: number;
    title: string;
    image_url: string;
    status: string;
  }

  interface FilterState {
    category: {};
    // search: string;
    // priceMin: number;
    // priceMax: number;
    // ratingMin: number;
    // ratingMax: number;
    promo: {};
  }
}

export {};
