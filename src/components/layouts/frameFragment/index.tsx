import { ReactNode } from "react";

type FrameFragmentProps = {
  children?: ReactNode;
  className?: string;
  innerClass?: string;
};

export const FrameFragment = ({
  children,
  className,
  innerClass = "py-[100px]",
}: FrameFragmentProps) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <div className={`w-full max-w-[1440px] h-fit px-[130px] ${innerClass}`}>
        {children}
      </div>
    </div>
  );
};
