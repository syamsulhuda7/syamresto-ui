import { Tab } from "@mui/base/Tab";

type TabNavProps = {
  title: string;
  separator?: boolean;
};

export const TabNav = ({ title, separator }: TabNavProps) => {
  const slug = title.toLowerCase().replace(" ", "-");
  return (
    <>
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
        value={slug}
      >
        {title}
      </Tab>
      {separator && <span className="w-0.5 h-6 bg-gry" />}
    </>
  );
};
