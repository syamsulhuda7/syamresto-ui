import CountUp, { useCountUp } from "react-countup";

export const Performance = () => {
  useCountUp({
    ref: "counter",
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });
  return (
    <div className="w-full h-fit flex items-center justify-center bg-org">
      <div className="w-full max-w-[1440px] h-fit flex items-center justify-between px-[130px] py-[100px]">
        <div className="w-full h-fit flex items-center">
          <div className="w-1/4 font-adlamDisplay font-bold text-[40px] text-drk flex flex-col items-center justify-center">
            <div className="text-[96px] w-full flex items-center justify-center">
              <CountUp
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
      </div>
    </div>
  );
};
