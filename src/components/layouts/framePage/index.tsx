import { ReactNode } from "react";
import { Navbar } from "../../fragments/navbar";
import { Footer } from "../../fragments/footer";

export const FramePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <>
        <Navbar />
        {children}
      </>
      <Footer />
    </div>
  );
};
