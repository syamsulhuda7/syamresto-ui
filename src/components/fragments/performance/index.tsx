import CountUp from "react-countup";
import { FrameFragment } from "../../layouts/frameFragment";

export const Performance = () => {
  return (
    <FrameFragment className="bg-org">
      <div className="w-full h-fit flex items-center">
        <div className="w-1/4 font-adlamDisplay font-bold text-[40px] text-drk flex flex-col items-center justify-center">
          <div className="text-[96px] w-full flex items-center justify-center">
            <CountUp
              scrollSpyOnce={true}
              enableScrollSpy
              start={0}
              end={71}
              duration={6}
              suffix="+"
            />
          </div>
          <p>Menus</p>
        </div>
        <span className="w-2 h-[200px] bg-drk" />
        <div className="w-1/4 font-adlamDisplay font-bold text-[40px] text-drk flex flex-col items-center justify-center">
          <div className="text-[96px] w-full flex items-center justify-center">
            <CountUp
              scrollSpyOnce={true}
              enableScrollSpy
              start={0}
              end={35}
              duration={6}
              suffix="+"
            />
          </div>
          <p>Employees</p>
        </div>
        <span className="w-2 h-[200px] bg-drk" />

        <div className="w-1/4 font-adlamDisplay font-bold text-[40px] text-drk flex flex-col items-center justify-center">
          <div className="text-[96px] w-full flex items-center justify-center">
            <CountUp
              scrollSpyOnce={true}
              enableScrollSpy
              start={0}
              end={16}
              duration={6}
              suffix="+"
            />
          </div>
          <p>Branches</p>
        </div>
        <span className="w-2 h-[200px] bg-drk" />

        <div className="w-1/4 font-adlamDisplay font-bold text-[40px] text-drk flex flex-col items-center justify-center">
          <div className="text-[96px] w-full flex items-center justify-center">
            <CountUp
              scrollSpyOnce={true}
              enableScrollSpy
              start={0}
              end={29}
              duration={6}
              suffix="+"
            />
          </div>
          <p>Partners</p>
        </div>
      </div>
    </FrameFragment>
  );
};
