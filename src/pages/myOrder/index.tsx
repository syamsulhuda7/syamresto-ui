import { Button } from "@mui/material";
import { FramePage } from "../../components/layouts/framePage";
import { useStore } from "../../utils/zustand";

// function BearCounter() {
//   const bears = useStore((state) => state.bears);
//   return <h1>{bears} around here...</h1>;
// }

// function Controls() {
//   const increasePopulation = useStore((state) => state.increasePopulation);
//   return <button onClick={increasePopulation}>one up</button>;
// }

export const MyOrder = () => {
  const bearsData = useStore((state) => state.bears);
  const increaseBears = useStore((state) => state.increasePopulation);

  return (
    <FramePage>
      <div className="w-full flex flex-col items-center justify-center h-full">
        {bearsData}
      </div>
      <Button onClick={increaseBears}>MyOrder</Button>
      <div className="h-[300px] aspect-square">
        <div className="placeholder"></div>
      </div>
    </FramePage>
  );
};
