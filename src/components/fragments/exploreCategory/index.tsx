import { FrameFragment } from "../../layouts/frameFragment";

export const ExploreCategory = () => {
  const data = [
    {
      category: "Main Course",
    },
    {
      category: "Main Course",
    },
    {
      category: "Main Course",
    },
    {
      category: "Main Course",
    },
    {
      category: "Main Course",
    },
  ];
  return (
    <FrameFragment className="bg-drk" innerClass="pb-[100px] pt-[50px]">
      <p className="font-albertSans font-bold text-2xl md:text-3xl xl:text-[40px] text-white pb-[30px] text-center">
        Explore By Categories
      </p>
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-5 md:gap-10 xl:gap-16">
        {data.map((_, index) => (
          <div key={index}>
            <img
              className="w-[70px] md:w-[100px] xl:w-[150px] aspect-[1/1] rounded-full object-cover"
              src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
            />
            <p className="font-albertSans font-semibold text-sm md:text-[20px] text-white text-center pt-3">
              Category
            </p>
          </div>
        ))}
      </div>
    </FrameFragment>
  );
};
