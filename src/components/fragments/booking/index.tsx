import { FrameFragment } from "../../layouts/frameFragment";
import { Button } from "../../ui/button";
import BasicFormControl from "../../baseUI/input";

export const Booking = () => {
  return (
    <FrameFragment className="bg-white" innerClass="pb-[100px] pt-[50px]">
      <div className="p-10 bg-drk w-full h-fit flex flex-col md:flex-row justify-center items-center text-white rounded-xl shadow-sm shadow-black">
        <div className="w-full text-center md:text-right">
          <div className="md:pr-[50px] pb-3 md:pb-0">
            <p className="font-albertSans font-bold text-[30px] md:text-[40px] xl:text-[50px]">
              Book Now !
            </p>
            <p className="font-albertSans font-bold text-[25px] md:text-[30px] xl:text-[35px]">
              And Save{" "}
              <span className="text-org text-[30px] md:text-[40px] xl:text-[50px]">
                Up To 50%
              </span>
            </p>
          </div>
        </div>
        <div className="w-fit md:w-full flex flex-col items-start justify-center gap-2 md:pl-[50px] pt-5 md:py-2 border-t-[4px] md:border-t-0 md:border-l-[4px] border-gry">
          <BasicFormControl
            title="Full Name"
            required={true}
            placeholder="fullname"
            type="text"
          />
          <BasicFormControl
            title="Date"
            required={true}
            type="datetime-local"
          />
          <BasicFormControl
            title="Person"
            required={true}
            placeholder="0"
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
