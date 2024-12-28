import { useEffect, useState } from "react";
import { TimeSection } from "./timeSection";

const Timer = ({ initialSeconds = 36010 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    let val = initialSeconds;
    const interval = setInterval(() => {
      if (val > -1) {
        setIsFlipping(true);
        val--;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFlipping) {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) =>
          prevSeconds > 0 ? prevSeconds - 1 : prevSeconds
        );
        setIsFlipping(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isFlipping]);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");

    return {
      hours: {
        current0: parseInt(hours[0]),
        current1: parseInt(hours[1]),
        next0: (parseInt(hours[0]) - 1 + 10) % 10,
        next1: (parseInt(hours[1]) - 1 + 10) % 10,
      },
      minutes: {
        current0: parseInt(minutes[0]),
        current1: parseInt(minutes[1]),
        next0: (parseInt(minutes[0]) - 1 + 6) % 6,
        next1: (parseInt(minutes[1]) - 1 + 10) % 10,
      },
      seconds: {
        current0: parseInt(secs[0]),
        current1: parseInt(secs[1]),
        next0: (parseInt(secs[0]) - 1 + 6) % 6,
        next1: (parseInt(secs[1]) - 1 + 10) % 10,
      },
    };
  };

  const { hours, minutes, seconds: secs } = formatTime(seconds);

  return (
    <div className="flex space-x-2 items-center">
      <TimeSection
        timeLeft={seconds}
        typeData="hours"
        values={hours}
        isFlipping={isFlipping}
      />
      <div className="flex flex-col gap-2">
        <div className="dot-separator"></div>
        <div className="dot-separator"></div>
      </div>
      <TimeSection
        timeLeft={seconds}
        typeData="minutes"
        values={minutes}
        isFlipping={isFlipping}
      />
      <div className="flex flex-col gap-2">
        <div className="dot-separator"></div>
        <div className="dot-separator"></div>
      </div>
      <TimeSection
        timeLeft={seconds}
        typeData="seconds"
        values={secs}
        isFlipping={isFlipping}
      />
    </div>
  );
};

export default Timer;
