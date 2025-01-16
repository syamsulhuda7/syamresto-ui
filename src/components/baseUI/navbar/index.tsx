import { MiniMenu } from "../../ui/miniMenu";
import { useEffect } from "react";
import { TabNav } from "../tabNav";
import { navigationStore } from "../../../utils/zustand/navigation";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const setNavigation = navigationStore((state) => state.setNavigation);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-fit flex items-center justify-center bg-drk sticky top-0 z-50">
      <div className="font-albertSans max-w-[1440px] w-full h-fit flex items-center justify-between px-[30px] md:px-[50px] xl:px-[130px] py-3">
        <p
          onClick={() => {
            navigate("/");
            setNavigation("/");
          }}
          className="cursor-pointer text-white text-[20px] md:text-[26px] xl:text-[32px] font-adlamDisplay font-bold"
        >
          SYAM<span className="text-org">STORE</span>
        </p>
        <div className="hidden md:flex w-fit items-center justify-center content-between gap-4 min-w-tabs-list">
          <TabNav setNavigation={setNavigation} title="Home" separator />
          <TabNav setNavigation={setNavigation} title="Menu" separator />
          <TabNav setNavigation={setNavigation} title="My Order" separator />
          <div
            className={`text-sm md:text-base text-org border-2 border-org font-bold w-fit px-4 py-1 rounded-lg flex justify-center cursor-pointer hover:text-org/70 hover:border-org/70`}
          >
            Login
          </div>
          {/* {navigationValue === "menu" && (
            <>
              <span className="w-0.5 h-6 bg-gry" />
              <CartItem />
            </>
          )} */}
        </div>
        <span className="md:hidden flex">
          {/* {navigationValue === "menu" && <CartItem />} */}
          <MiniMenu />
        </span>
      </div>
    </div>
  );
};
