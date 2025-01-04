import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

interface ModalProps {
  item: MenuData;
}

export default function Modal({ item }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full h-full font-poppins font-semibold text-[14px] py-[6px] rounded-md text-white bg-org"
      >
        Detail
      </button>
      {/* <button
        type="button"
        onClick={handleOpen}
        className="px-4 py-2 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        Open modal
      </button> */}

      {/* Modal */}
      {open && (
        <div
          className="fixed p-5 inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-[1000px] flex bg-white rounded-lg shadow-xl p-10 text-gray-900"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="w-[60%] pr-4">
              <div className="w-full flex items-end justify-between">
                <p className="font-poppins font-semibold text-[40px]">
                  {item.name}
                </p>
                <div className="flex items-center pb-2 gap-1 text-[24px]">
                  <StarIcon className="text-org scale-[1.1]" /> 4.7
                </div>
              </div>
              <div className="w-full aspect-[5/4] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image_url}
                  alt={item.name}
                />
              </div>
            </div>
            <div className="w-[40%] flex flex-col justify-between mt-12 pl-3 bg-green-700/20">
              <div>
                <h1 className="font-poppins text-[24px] mt-1">Description :</h1>
                <p className="font-poppins text-[16px] text-justify indent-10">
                  {item.description}
                </p>
                <h1 className="font-poppins text-[24px] mt-1">Category :</h1>
                <p className="font-poppins text-[16px]">{item.category.name}</p>
                <h1 className="font-poppins text-[24px] mt-1">Price :</h1>
                <p className="font-poppins text-[16px]">{item.price}</p>
                <h1 className="font-poppins text-[24px] mt-1">Sold :</h1>
                <p className="font-poppins text-[16px]">24</p>
              </div>
              <div>
                <button className="px-4 py-2 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                  button
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
