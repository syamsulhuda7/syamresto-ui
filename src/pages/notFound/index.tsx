import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col gap-20 items-center justify-center bg-drk">
      <h1 className="text-7xl text-gry">PAGE NOT FOUND</h1>
      <Button
        onClick={() => navigate(-2)}
        className="border-2 border-org text-org"
      >
        Back
      </Button>
    </div>
  );
};
