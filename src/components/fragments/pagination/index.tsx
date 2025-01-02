import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  onTop: () => void;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  onTop,
}: PaginationProps) => {
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onTop();
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onTop();
    }
  };
  return (
    <div className="w-full h-fit font-poppins font-semibold text-gry flex items-center justify-center gap-0">
      <button
        onClick={prevPage}
        className={`${
          currentPage === 1
            ? "pointer-events-none text-opacity-50 hover:scale-100"
            : "hover:scale-[1.05]"
        } text-[14px] text-org px-1 transition-all ease-in-out duration-200`}
      >
        <ArrowLeftRoundedIcon
          className={`${
            currentPage === 1 ? "text-opacity-50" : ""
          } text-drk mb-[2px]`}
        />
        Prev
      </button>
      <p className="h-[22px] aspect-square flex items-center justify-center text-sm">
        {currentPage - 1 > 0 ? currentPage - 1 : ""}
      </p>
      <p className="h-[22px] aspect-square flex items-center justify-center rounded-sm text-white text-base bg-org">
        {currentPage}
      </p>
      <p className="h-[22px] aspect-square flex items-center justify-center text-sm">
        {currentPage + 1 <= totalPages ? currentPage + 1 : ""}
      </p>
      <button
        onClick={nextPage}
        className={`${
          currentPage === totalPages
            ? "pointer-events-none text-opacity-50 hover:scale-100"
            : "hover:scale-[1.05]"
        } text-[14px] text-org px-1 transition-all ease-in-out duration-200`}
      >
        Next
        <ArrowRightRoundedIcon
          className={`${
            currentPage === totalPages ? "text-opacity-50" : ""
          } text-drk mb-[2px]`}
        />
      </button>
    </div>
  );
};
