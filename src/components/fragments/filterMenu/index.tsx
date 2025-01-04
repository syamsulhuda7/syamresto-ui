/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect, useState } from "react";
import { categoriesState } from "../../../utils/zustand/categoriesState";
import { categoriesData } from "../../../utils/api";
import SelectBaseUI from "../../ui/select";
import { filterStorage } from "../../../utils/zustand/filterMenu";
import NumberInput from "../../ui/inputNumber";
import RangeSlider from "../../ui/slider";

const promoOptions = [
  { name: "Promo", value: "true" },
  { name: "Non Promo", value: "false" },
];
const topMenuOptions = [{ name: "Top Menu", value: "true" }];

export const FilterMenu = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);

  const setFilterValue = filterStorage((state) => state.setFilter);
  const filterValue = filterStorage((state) => state.filter);

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
        <div className="w-full h-fit flex justify-between border-b border-drk pb-[15px]">
          <p className="py-1 font-albertSans font-bold text-2xl md:text-3xl xl:text-[35px] text-drk">
            Filter
          </p>
          <button
            onClick={() => {
              setFilterValue({ ...filterValue, apply: true });
            }}
            className="px-[15px] py-1 bg-drk rounded-md font-poppins font-semibold text-2xl md:text-3xl xl:text-[20px] text-gry"
          >
            Apply
          </button>
        </div>
        <div className="w-full h-fit">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Category
          </p>
          <div className="pl-[30px] pt-2 w-full">
            <SelectBaseUI
              title="category"
              optionData={category.map((data) => {
                return { name: data.name, value: data.slug };
              })}
              optionValue={(value) =>
                setFilterValue({ ...filterValue, category: value })
              }
            />
          </div>
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
            <div className="col-span-8">
              <NumberInput
                sendValue={(value) =>
                  setFilterValue({ ...filterValue, priceMin: Number(value) })
                }
              />
            </div>
            <p className="col-span-4 font-poppins text-2xl md:text-3xl xl:text-[20px] text-drk">
              Max
            </p>
            <div className="col-span-8">
              <NumberInput
                sendValue={(value) =>
                  setFilterValue({ ...filterValue, priceMax: Number(value) })
                }
              />
            </div>
          </div>
        </div>
        {/* rating */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Rating
          </p>
          <div className="flex items-center justify-between gap-5 ml-[30px]">
            <p className="w-12 text-[#6B7A90] rounded-md border-[1px] border-slate-50 shadow-inner shadow-slate-500 aspect-square flex items-center justify-center bg-white col-span-2 font-poppins text-xs md:text-sm xl:text-base">
              {Array.isArray(filterValue.rating) && filterValue.rating[0]}
            </p>
            <div className="w-full mr-2 mt-1">
              <RangeSlider
                sliderValue={(value) =>
                  setFilterValue({
                    ...filterValue,
                    rating: Array.isArray(value)
                      ? value.map((x) => x / 10)
                      : value,
                  })
                }
              />
            </div>
            <p className="w-12 text-[#6B7A90] rounded-md border-[1px] border-slate-50 shadow-inner shadow-slate-500 aspect-square flex items-center justify-center bg-white col-span-2 font-poppins text-xs md:text-sm xl:text-base">
              {Array.isArray(filterValue.rating) && filterValue.rating[1]}
            </p>
          </div>
        </div>
        {/* Promo */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Promo
          </p>
          <div className="pl-[30px] pt-2 w-full">
            <SelectBaseUI
              title="promo"
              optionData={promoOptions}
              optionValue={(value) =>
                setFilterValue({ ...filterValue, promo: value })
              }
            />
          </div>
        </div>
        {/* Top Menu */}
        <div className="w-full h-fit flex flex-col gap-[5px]">
          <p className="font-poppins font-semibold text-2xl md:text-3xl xl:text-[26px] text-drk">
            Top Menu
          </p>
          <div className="pl-[30px] pt-2 w-full">
            <SelectBaseUI
              title="topMenu"
              optionData={topMenuOptions}
              optionValue={(value) =>
                setFilterValue({ ...filterValue, topMenu: value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
