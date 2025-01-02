import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
