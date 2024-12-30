import CountUp from "react-countup";
import { FrameFragment } from "../../layouts/frameFragment";

export const Performance = () => {
  const data = [
    {
      end: 71,
      title: "Menus",
    },
    {
      end: 39,
      title: "Employees",
    },
    {
      end: 12,
      title: "Branches",
    },
    {
      end: 23,
      title: "Partners",
    },
  ];
  return (
    <FrameFragment className="bg-org">
      <div className="w-full h-fit flex flex-wrap items-center justify-center gap-5">
        {data.map((item, index) => (
          <>
            <div
              key={index}
              className="w-[40%] md:w-[20%] font-adlamDisplay font-bold text-[20px] md:text-[28px] xl:text-[40px] text-drk flex flex-col items-center justify-center"
            >
              <div className="text-[50px] md:text-[70px] xl:text-[96px] w-full flex items-center justify-center">
                <CountUp
                  scrollSpyOnce={true}
                  enableScrollSpy
                  start={0}
                  end={item.end}
                  duration={6}
                  suffix="+"
                />
              </div>
              <p>{item.title}</p>
            </div>
            {index !== data.length - 1 && (
              <span
                key={index}
                className={`${
                  index === 1 && "hidden md:block"
                } w-1 md:w-[6px] xl:w-2 h-[100px] md:h-[145px] xl:h-[200px] bg-drk`}
              />
            )}
          </>
        ))}
      </div>
    </FrameFragment>
  );
};
