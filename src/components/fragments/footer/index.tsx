import { FrameFragment } from "../../layouts/frameFragment";

export const Footer = () => {
  return (
    <FrameFragment
      className="bg-drk"
      innerClass="relative py-[100px] w-fit flex flex-col md:flex-row items-start justify-between gap-10"
    >
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-center font-adlamDisplay pb-5 text-[24px] text-org">
          Top Menu
        </h1>
        <p className="font-poppins text-white">Chicken Crispy</p>
        <p className="font-poppins text-white">Tomato Soup</p>
        <p className="font-poppins text-white">Potato Roll</p>
        <p className="font-poppins text-white">Zucchini fries</p>
        <p className="font-poppins text-white">Americano</p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-center font-adlamDisplay pb-5 text-[24px] text-org">
          Categories
        </h1>
        <p className="font-poppins text-white">Appetizers</p>
        <p className="font-poppins text-white">Main Courses</p>
        <p className="font-poppins text-white">Desserts</p>
        <p className="font-poppins text-white">Beverages</p>
        <p className="font-poppins text-white">Sides</p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-center font-adlamDisplay pb-5 text-[24px] text-org">
          Social Media
        </h1>
        <p className="font-poppins text-white">Gmail : syamresto@gmail.com</p>
        <p className="font-poppins text-white">Instagram : @syamresto_id</p>
        <p className="font-poppins text-white">tiktok : syamresto_id</p>
        <p className="font-poppins text-white">
          facebook : syamresto_indonesia
        </p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-center font-adlamDisplay pb-5 text-[24px] text-org">
          Payment Support
        </h1>
        <div className="w-full flex items-center justify-center flex-wrap gap-3">
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/gopay.svg"
            alt="gopay"
          />
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/bca.svg"
            alt="bca"
          />
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/bri.svg"
            alt="bri"
          />
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/mandiri.svg"
            alt="mandiri"
          />
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/ovo.svg"
            alt="ovo"
          />
          <img
            className="h-[30px] w-fit bg-white px-3 py-2 rounded-md"
            src="/assets/qris.svg"
            alt="qris"
          />
          <img
            className="h-[30px] w-fit bg-white px-[6px] py-[0px] rounded-md"
            src="/assets/spay.svg"
            alt="spay"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 px-2 py-2 w-full text-center font-poppins text-gry text-xs md:text-base">
        SYAMSTORE © 2024. Developed by Syamsul Huda Harisul Muslimin All Rights
        Reserved
      </div>
    </FrameFragment>
  );
};
