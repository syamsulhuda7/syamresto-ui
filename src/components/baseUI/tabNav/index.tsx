import { Tab } from "@mui/base/Tab";

interface TabNavProps {
  title: string;
  separator?: boolean;
  sendNavigation: (slug: string) => void;
}

export const TabNav = ({ title, separator, sendNavigation }: TabNavProps) => {
  const slug = title.toLowerCase().replace(" ", "-") || "";

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
            } text-sm md:text-lg font-medium w-fit py-1 border-0 flex justify-center`,
            onClick: () => {
              if (!disabled) {
                sendNavigation(slug); // Pastikan slug diakses dengan benar
              }
            },
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
