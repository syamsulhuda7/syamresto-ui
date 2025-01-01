import { useEffect, useState } from "react";
import { categoriesState } from "../../../utils/zustand/categoriesState";
import { categoriesData } from "../../../utils/api";
import SelectBaseUI from "../../ui/select";

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  icon: string;
}
interface FilterState {
  category: string;
  search: string;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  promo: string;
}
export const FilterMenu = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    category: "",
    search: "",
    priceMin: 0,
    priceMax: 0,
    ratingMin: 0,
    ratingMax: 0,
    promo: "false",
  });

  const setCategoryState = categoriesState((state) => state.setCategories);
  const categoryState = categoriesState((state) => state.categories);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (categoryState.length > 0) {
          setCategory(categoryState);
          return;
        }
        const data: CategoryData[] = await categoriesData();
        if (data.length > 0) {
          setCategory(data);
          setCategoryState(data);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="sticky top-10 w-full md:w-[30%] h-full min-h-screen bg-org">
      <div className="w-full flex flex-col gap-[30px] px-[30px] md:pl-[50px] xl:pl-[130px] md:pr-[50px] py-[50px]">
        <div className="w-full h-fit flex justify-between border-b border-drk pb-[20px]">
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-drk">
            Filter
          </p>
          <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[30px] text-drk">
            0
          </p>
        </div>
        <div className="w-full h-fit">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Category
          </p>
          <SelectBaseUI
            optionData={category.map((data) => {
              return { name: data.name, slug: data.slug };
            })}
          />
          {/* <select className="ml-[30px] mt-4 px-3 py-2 rounded-md" name="" id="">
            <option value="">All</option>
            {category.map((data) => (
              <option key={data.id} value="Appetizers">
                {data.name}
              </option>
            ))}
          </select> */}
        </div>
        {/* Price */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Price
          </p>
          <div className="grid grid-cols-12 gap-2 ml-[30px]">
            <p className="col-span-4 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk">
              Min
            </p>

            <input
              type="number"
              className="col-span-8 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk"
            />
            <p className="col-span-4 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk">
              Max
            </p>

            <input
              type="number"
              className="col-span-8 font-poppins text-2xl md:text-3xl xl:text-[24px] text-drk"
            />
          </div>
        </div>
        {/* rating */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Rating
          </p>
          <div className="grid grid-cols-12 gap-2 ml-[30px]">
            <p className="col-span-4 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk">
              Min
            </p>

            <input
              type="range"
              className="col-span-8 font-poppins text-2xl md:text-3xl xl:text-[24px] text-drk"
            />
            <p className="col-span-4 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk">
              Max
            </p>

            <input
              type="range"
              className="col-span-8 font-poppins text-2xl md:text-3xl xl:text-[24px] text-drk"
            />
          </div>
        </div>
        {/* Promo */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Promo
          </p>
          <select className="ml-[30px] mt-4 px-3 py-2 rounded-md" name="" id="">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};
