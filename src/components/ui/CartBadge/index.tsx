import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const CartBadge = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute -top-[6px] -right-[6px] text-[10px] text-drk font-semibold bg-gry rounded-full w-4 h-4 flex items-center justify-center leading-3">
          0
        </div>
        <ShoppingCartIcon className="text-org" />
      </div>
      <div className="absolute -bottom-80 right-[150px] w-48 h-fit max-h-80 flex flex-col items-center justify-start gap-1 p-1 bg-white rounded-md shadow-sm shadow-drk">
        <div className="w-full h-12 bg-gry flex flex-col items-center justify-center text-drk rounded-[4px]">
          <h1 className="text-[24px] font-adlamDisplay font-bold">Cart</h1>
        </div>
        <div className="w-full h-12 bg-gry flex flex-col items-center justify-center text-drk rounded-[4px]">
          <h1 className="text-[24px] font-adlamDisplay font-bold">Cart</h1>
        </div>
      </div>
    </>
  );
};
