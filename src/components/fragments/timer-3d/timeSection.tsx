import { FlipCard } from "./flipCard";

type TimeSectionProps = {
    values: {
        current0: number;
        current1: number;
        next0: number;
        next1: number;
    };
    isFlipping: boolean;
    typeData: 'seconds' | 'minutes' | 'hours';
    timeLeft: number;
}
export const TimeSection = ({ values, isFlipping, typeData, timeLeft }: TimeSectionProps) => {
  const { current0, current1, next0, next1 } = values;

  return (
    <div className="flex gap-1">
      <FlipCard
        typeData={typeData}
        timeLeft={timeLeft}
        position="front"
        value={current0}
        nextValue={next0}
        isFlipping={isFlipping}
      />
      <FlipCard
        typeData={typeData}
        timeLeft={timeLeft}
        position="back"
        value={current1}
        nextValue={next1}
        isFlipping={isFlipping}
      />
    </div>
  );
};
