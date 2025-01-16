import { useLocation, useNavigate } from "react-router";

interface TabNavProps {
  title: string;
  separator?: boolean;
  setNavigation: (value: string) => void;
}

export const TabNav = ({ title, separator, setNavigation }: TabNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  let slug = "/" + title.toLowerCase().replace(" ", "-");
  if (title === "Home") {
    slug = "/";
  }

  return (
    <>
      <div
        className={`${
          slug === location.pathname
            ? "text-org border-b-2 border-org"
            : "text-white bg-transparent focus:text-white hover:text-org"
        } text-sm md:text-lg font-medium w-fit py-1 border-0 flex justify-center cursor-pointer`}
        onClick={() => {
          setNavigation(slug); // Pastikan slug diakses dengan benar
          navigate(slug);
        }}
      >
        {title}
      </div>
      {separator && <span className="w-0.5 h-6 bg-gry" />}
    </>
  );
};
