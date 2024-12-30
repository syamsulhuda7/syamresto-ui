import { FrameFragment } from "../../components/layouts/frameFragment";
import { FramePage } from "../../components/layouts/framePage";

export const Menu = () => {
  return (
    <FramePage>
      <FrameFragment
        className="bg-white h-full"
        innerClass="flex items-start h-full"
      >
        <div className="h-full">Menu</div>
      </FrameFragment>
    </FramePage>
  );
};
