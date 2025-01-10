import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "../../fragments/modal";
import { cartItemsStorage } from "../../../utils/zustand/cartItems";
import { snackbarStorage } from "../../../utils/zustand/snackbar";

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
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [itemName, setItemName] = useState("");
  // const cartItemsValue = cartItemsStorage((state) => state.cartItems);gi
  const addCartItems = cartItemsStorage((state) => state.addCartItems);
  const setSnackbar = snackbarStorage((state) => state.setSnackbar);

  const handleAddToCart = (item: MenuData) => {
    const { id, name, image_url, price } = item;
    addCartItems({ id, name, image_url, price, quantity: 1 });
    setSnackbar({
      open: true,
      mainText: "Cart Updated!",
      subText: `1 ${name} added to cart`,
    });
  };

  return (
    <>
      {menuData.map((item) => (
        <div
          key={item.id}
          className="w-[140px] md:w-[200px] h-fit bg-gry/20 p-[10px] rounded-md flex flex-col gap-1 items-center shadow-lg shadow-slate-300"
        >
          <div className="w-full aspect-[6/4] rounded-md overflow-hidden">
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
          <div className="w-full h-[50px] text-center flex justify-center items-center font-poppins font-semibold text-sm md:text-base">
            {item.name}
          </div>
          <div className="font-poppins text-slate-400 text-[9px] md:text-[12px]">
            {item.category.name}
          </div>
          <div className="font-poppins text-slate-400 text-[9px] md:text-[12px]">
            43 sold / month
          </div>
          <div className="w-full font-poppins text-slate-700 text-xs md:text-sm flex justify-between items-center">
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
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-org py-[1px] md:py-1 px-[2px] md:p-1 rounded-md text-white"
            >
              <ShoppingCartIcon className="scale-[.7] md:scale-[.9]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
