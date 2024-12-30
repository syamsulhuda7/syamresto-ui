import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabNav } from "../../ui/tabNav";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit flex items-center justify-center bg-drk sticky top-0 z-50">
      <Tabs
        className="font-albertSans max-w-[1440px] w-full h-fit flex items-center justify-between px-[130px] py-3"
        defaultValue={"Home"}
        onChange={(e, value) => navigate(`/${value}`)}
      >
        <p className="text-white text-[32px] font-adlamDisplay font-bold">
          SYAM<span className="text-org">STORE</span>
        </p>
        <TabsList className="w-fit flex items-center justify-center content-between gap-4 min-w-tabs-list">
          <TabNav title="Home" separator />
          <TabNav title="Menu" separator />
          <TabNav title="My Order" separator />
          <div
            className={`text-base text-org border-2 border-org font-bold w-fit px-4 py-1 rounded-lg flex justify-center cursor-pointer hover:text-org/70 hover:border-org/70`}
          >
            Login
          </div>
        </TabsList>
      </Tabs>
    </div>
  );
};
