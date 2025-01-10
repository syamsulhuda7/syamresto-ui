import { useEffect, useState } from "react";
import { FramePage } from "../../components/layouts/framePage";
import { QRCodeSVG } from "qrcode.react";
import { checkoutItemsStorage } from "../../utils/zustand/checkoutItem";

export const MyOrder = () => {
  const [qrData, setQrData] = useState<string | string[]>([]);
  const [openQr, setOpenQr] = useState(false);

  const checkoutItemValue = checkoutItemsStorage((state) => state.checkoutItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenQr(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const qrData = JSON.stringify(checkoutItemValue);
    setQrData(qrData);
  }, [checkoutItemValue]);

  return (
    <FramePage>
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5">
        <div className="px-5 py-3 bg-org rounded-md mx-10 mb-10">
          <h1 className="text-[24px] text-center font-albertSans font-bold">
            Show This QR Code To The Cashier:
          </h1>
        </div>
        <div className="relative w-full h-fit flex flex-col items-center justify-center px-10 pb-10">
          {!openQr && (
            <div className="absolute z-10 backdrop-blur-md w-[105%] h-[105%] flex items-center justify-center">
              <div className="animate-spin animation-duration-1000 w-10 h-10 border-4 border-org border-t-drk rounded-full"></div>
            </div>
          )}
          <QRCodeSVG
            className="w-full md:w-fit h-full md:h-[450px]"
            value={qrData}
            size={512}
          />
        </div>
      </div>
    </FramePage>
  );
};
