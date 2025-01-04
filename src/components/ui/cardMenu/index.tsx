import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "../../fragments/modal";

interface CardMenuProps {
  menuData: MenuData[];
  handleImageLoad: (itemId: number) => void;
  loadedImages: boolean[];
}

export const CardMenu = ({
  menuData,
  handleImageLoad,
  loadedImages,
}: CardMenuProps) => {
  return (
    <>
      {menuData.map((item) => (
        <div
          key={item.id}
          className="w-fit h-fit bg-gry/20 p-[10px] rounded-md flex flex-col gap-1 items-center shadow-lg shadow-slate-300"
        >
          <div className="h-[120px] aspect-[6/4] rounded-md overflow-hidden">
            {!loadedImages[item.id] && <div className="placeholder"></div>}
            <img
              onLoad={() => handleImageLoad(item.id)}
              className={`${
                loadedImages[item.id] ? "w-full h-full object-cover" : "loading"
              }`}
              src={item.image_url}
              alt={item.name}
            />
          </div>
          <div className="w-[180px] h-[50px] text-center flex justify-center items-center font-poppins font-semibold text-base">
            {item.name}
          </div>
          <div className="font-poppins text-slate-400 text-[12px]">
            {item.category.name}
          </div>
          <div className="font-poppins text-slate-400 text-[12px]">
            43 sold / month
          </div>
          <div className="w-full font-poppins text-slate-700 text-sm flex justify-between items-center">
            <div>
              <StarIcon className="text-org scale-75 -mt-[6px]" />
              4.5
            </div>
            <p>Rp {item.price}</p>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <div className="w-full">
              <Modal item={item} />
            </div>
            <button className="bg-org p-1 rounded-md text-white">
              <ShoppingCartIcon className="scale-[.9]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
