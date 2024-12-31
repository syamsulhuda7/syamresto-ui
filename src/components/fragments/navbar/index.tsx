import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabNav } from "../../ui/tabNav";
import { useNavigate } from "react-router";
import { MiniMenu } from "../../ui/miniMenu";
import { navigationStore } from "../../../utils/zustand/navigation";
// import { useEffect, useState } from "react";
export const Navbar = () => {
  // const [navValue, setNavValue] = useState("");
  const navigate = useNavigate();
  const navigationValue = navigationStore((state) => state.navigation);
  console.log({ navigationValue });
  const setNavigation = navigationStore((state) => state.setNavigation);

  // useEffect(() => {
  //   console.log({ navValue });
  //   setNavigation(navValue);
  // }, [navValue]);
  return (
    <div className="w-full h-fit flex items-center justify-center bg-drk sticky top-0 z-50">
      <Tabs
        className="font-albertSans max-w-[1440px] w-full h-fit flex items-center justify-between px-[30px] md:px-[50px] xl:px-[130px] py-3"
        defaultValue={navigationValue}
        onChange={(_, value) => navigate(`/${value}`)}
      >
        <p
          onClick={() => navigate("/")}
          className="cursor-pointer text-white text-[20px] md:text-[26px] xl:text-[32px] font-adlamDisplay font-bold"
        >
          SYAM<span className="text-org">STORE</span>
        </p>
        <TabsList className="hidden md:flex w-fit items-center justify-center content-between gap-4 min-w-tabs-list">
          <TabNav sendNavigation={setNavigation} title="Home" separator />
          <TabNav sendNavigation={setNavigation} title="Menu" separator />
          <TabNav sendNavigation={setNavigation} title="My Order" separator />
          <div
            className={`text-sm md:text-base text-org border-2 border-org font-bold w-fit px-4 py-1 rounded-lg flex justify-center cursor-pointer hover:text-org/70 hover:border-org/70`}
          >
            Login
          </div>
        </TabsList>
        <span className="md:hidden">
          <MiniMenu />
        </span>
      </Tabs>
    </div>
  );
};
