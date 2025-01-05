import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import NumberInput from "../../ui/inputNumber";

interface ModalProps {
  item: MenuData;
}

export default function Modal({ item }: ModalProps) {
  const [countItem, setCountItem] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(countItem);
  }, []);

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full h-full font-poppins font-semibold text-xs md:text-sm py-[6px] md:py-[6px] rounded-md text-white bg-org"
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
            className="relative w-full max-w-[800px] flex flex-col md:flex-row bg-white rounded-lg shadow-xl text-gray-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="w-full md:w-[60%] p-3 md:pr-5 md:p-10">
              <div className="w-full flex items-end justify-between pb-2 md:pb-0">
                <p className="font-poppins font-semibold text-[24px] md:text-[30px]">
                  {item.name}
                </p>
                <div className="flex items-center pb-2 gap-1 text-[20px]">
                  <StarIcon className="text-org scale-[1]" /> 4.7
                </div>
              </div>
              <div className="w-full aspect-[5/3] md:aspect-[5/4] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image_url}
                  alt={item.name}
                />
              </div>
            </div>
            <div className="w-full md:w-[40%] flex flex-col justify-between p-3 md:pt-16 md:pl-5 md:p-10 bg-org shadow-md shadow-black">
              <div>
                <div className="px-5 py-3 max-h-[130px] md:max-h-[180px] overflow-auto scroll-none rounded-xl bg-white text-drk border-2 border-gry shadow-inner shadow-slate-500">
                  <h1 className="font-poppins text-xl md:text-[20px] font-semibold">
                    Description :
                  </h1>
                  <p className="font-poppins text-xs md:text-sm text-justify indent-10">
                    {item.description}
                  </p>
                </div>
                <div className="grid grid-cols-12 items-end p-5 text-drk">
                  <h1 className="col-span-5 font-poppins text-sm md:text-base font-semibold mt-1">
                    Category
                  </h1>
                  <p className="col-span-1 font-poppins text-sm md:text-base">
                    :
                  </p>
                  <p className="col-span-6 font-poppins text-sm md:text-base">
                    {item.category.name}
                  </p>
                  <h1 className="col-span-5 font-poppins text-sm md:text-base font-semibold mt-1">
                    Price
                  </h1>
                  <p className="col-span-1 font-poppins text-sm md:text-base">
                    :
                  </p>
                  <p className="col-span-6 font-poppins text-sm md:text-base">
                    {item.price}
                  </p>
                  <h1 className="col-span-5 font-poppins text-sm md:text-base font-semibold mt-1">
                    Sold
                  </h1>
                  <p className="col-span-1 font-poppins text-sm md:text-base">
                    :
                  </p>
                  <p className="col-span-6 font-poppins text-sm md:text-base">
                    42
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center justify-center md:justify-between gap-2">
                <div className="w-[40%] md:w-full">
                  <NumberInput
                    label={{ title: "Qty", position: "left" }}
                    sendValue={(value) => setCountItem(value)}
                    defaultVal={1}
                  />
                </div>
                <button className="px-4 py-2 font-semibold text-white bg-drk rounded-lg shadow-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
