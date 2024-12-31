import { ReactNode } from "react";
import { Navbar } from "../../fragments/navbar";
import { Footer } from "../../fragments/footer";

export const FramePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div className="w-full h-fit flex flex-col items-start">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};
