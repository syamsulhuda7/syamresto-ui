import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { useState } from "react";

export const Pagination = () => {
  const [page, setPage] = useState<number>(1);
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };
  return (
    <div className="w-full h-fit font-poppins font-semibold text-gry flex items-center justify-center gap-0">
      <button
        onClick={prevPage}
        className="text-[14px] text-org px-1 hover:scale-[1.05] transition-all ease-in-out duration-200"
      >
        <ArrowLeftRoundedIcon className="text-drk mb-[2px]" />
        Prev
      </button>
      <p className="h-[22px] aspect-square flex items-center justify-center text-sm">
        {page - 1 > 0 ? page - 1 : ""}
      </p>
      <p className="h-[22px] aspect-square flex items-center justify-center rounded-sm text-white text-base bg-org">
        {page}
      </p>
      <p className="h-[22px] aspect-square flex items-center justify-center text-sm">
        {page + 1 < 4 ? page + 1 : ""}
      </p>
      <button
        onClick={nextPage}
        className="text-[14px] text-org px-1 hover:scale-[1.05] transition-all ease-in-out duration-200"
      >
        Next
        <ArrowRightRoundedIcon className="text-drk mb-[2px]" />
      </button>
    </div>
  );
};
