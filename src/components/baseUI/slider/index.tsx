import * as React from "react";
import { styled, Box } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";

interface RangeSliderProps {
  sliderValue: (value: number | number[]) => void;
}

export default function RangeSlider({ sliderValue }: RangeSliderProps) {
  const [value, setValue] = React.useState<number | number[]>([15, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setValue(newValue);
    sliderValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* controlled: */}
      <Slider
        value={value}
        onChange={handleChange}
        getAriaLabel={() => "Temperature range"}
        getAriaValueText={valuetext}
        min={0}
        max={50}
      />
      {/* uncontrolled: */}
      {/* <Slider
        defaultValue={[20, 37]}
        getAriaLabel={() => "Temperature range"}
        getAriaValueText={valuetext}
        min={0}
        max={100}
      /> */}
    </Box>
  );
}

function valuetext(value: number) {
  return `${value / 10}`;
}
// const orange = {
//   50: "#FEF4E9", // Sangat terang
//   100: "#FDE6C7", // Lebih terang
//   200: "#FBD5A3", // Terang
//   300: "#F8BE76", // Warna terang medium
//   400: "#F6AA51", // Medium
//   500: "#F49B33", // Warna dasar
//   600: "#DA8C2F", // Medium gelap
//   700: "#B37326", // Gelap
//   800: "#8A591D", // Lebih gelap
//   900: "#5A3B13", // Sangat gelap
// };

const darkGrey = {
  50: "#F2F2F2", // Sangat terang
  100: "#D9D9D9", // Lebih terang
  200: "#BFBFBF", // Terang
  300: "#A6A6A6", // Warna terang medium
  400: "#8C8C8C", // Medium
  500: "#1E1E1E", // Warna dasar
  600: "#191919", // Medium gelap
  700: "#141414", // Gelap
  800: "#0F0F0F", // Lebih gelap
  900: "#0A0A0A", // Sangat gelap
};

const Slider = styled(BaseSlider)(
  () => `
  color: ${darkGrey[500]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${darkGrey[300]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${darkGrey[500]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    

    &.${sliderClasses.focusVisible} {
      
      outline: none;
    }

    &.${sliderClasses.active} {
      
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 99%;
    background-color: ${darkGrey[200]};
    top: 44%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${darkGrey[500]};
  }
`
);
