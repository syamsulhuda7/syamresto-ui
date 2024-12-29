import { FrameFragment } from "../../layouts/frameFragment";
import { Button } from "../../ui/button";
import BasicFormControl from "../../ui/input";

export const Booking = () => {
  return (
    <FrameFragment className="bg-white" innerClass="pb-[100px] pt-[50px]">
      <div className="p-10 bg-drk w-full h-fit flex justify-center items-center text-white rounded-xl shadow-sm shadow-black">
        <div className="w-full text-right">
          <div className="pr-[50px]">
            <p className="font-albertSans font-bold text-[50px]">Book Now !</p>
            <p className="font-albertSans font-bold text-[35px]">
              And Save <span className="text-org text-[50px]">Up To 50%</span>
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-2 pl-[50px] py-2 border-l-[4px] border-gry">
          <BasicFormControl
            title="Full Name"
            required={true}
            placeholder="fullname"
            type="text"
          />
          <BasicFormControl
            title="Date"
            required={true}
            placeholder="date"
            type="datetime-local"
          />
          <BasicFormControl
            title="Person"
            required={true}
            placeholder="4"
            type="number"
          />
          <Button
            type="submit"
            className="bg-org text-white font-bold font-albertSans mt-2 hover:bg-org/80"
          >
            Book Now
          </Button>
        </div>
      </div>
    </FrameFragment>
  );
};
