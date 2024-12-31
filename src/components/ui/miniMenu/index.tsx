import { useState } from "react";
import { Button } from "../button";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useNavigate } from "react-router";

export const MiniMenu = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Button onClick={handleOpen} className="text-white hover:text-org">
        <DragIndicatorIcon />
      </Button>
      {open && (
        <div className="flex flex-col gap-2 absolute right-[30px] bg-drk border-[1px] border-org p-2 rounded-md">
          <Button
            onClick={() => navigate("/")}
            className="text-white hover:text-org"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/menu")}
            className="text-white hover:text-org"
          >
            Menu
          </Button>
          <Button
            onClick={() => navigate("/my-order")}
            className="text-white hover:text-org"
          >
            My Order
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="text-white hover:text-org"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};
