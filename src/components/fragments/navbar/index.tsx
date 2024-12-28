import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { Tab } from "@mui/base/Tab";

export const Navbar = () => {
  return (
    <Tabs
      className="font-albertSans w-full h-fit flex items-center justify-between px-10 py-3 bg-black"
      defaultValue={2}
    >
      <p className="text-white text-[32px] font-adlamDisplay font-bold text-xl">
        SYAM<span className="text-org">STORE</span>
      </p>
      <TabsList className="w-fit flex items-center justify-center content-between gap-4 min-w-tabs-list shadow-lg">
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `${
                selected
                  ? "text-org border-b-2 border-org"
                  : "text-white bg-transparent focus:text-white hover:text-org"
              } ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } text-lg font-medium w-fit py-1 border-0 flex justify-center`,
            }),
          }}
          value={1}
        >
          Home
        </Tab>
        <span className="w-0.5 h-6 bg-gry" />
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `${
                selected
                  ? "text-org border-b-2 border-org"
                  : "text-white bg-transparent focus:text-white hover:text-org"
              } ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } text-lg font-medium w-fit py-1 border-0 flex justify-center`,
            }),
          }}
          value={2}
        >
          Menu
        </Tab>
        <span className="w-0.5 h-6 bg-gry" />
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `${
                selected
                  ? "text-org border-b-2 border-org"
                  : "text-white bg-transparent focus:text-white hover:text-org"
              } ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } text-lg font-medium w-fit py-1 border-0 flex justify-center`,
            }),
          }}
          value={3}
        >
          My Order
        </Tab>
        <span className="w-0.5 h-6 bg-gry" />
        <div
          className={`text-base text-org border-2 border-org font-bold w-fit px-4 py-1 rounded-lg flex justify-center cursor-pointer hover:text-org/70 hover:border-org/70`}
        >
          Login
        </div>
      </TabsList>
    </Tabs>
  );
};
