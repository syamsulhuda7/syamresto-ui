import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { searchMenuStorage } from "../../../utils/zustand/searchMenu";

interface AutoCompleteProps {
  menuData: string[];
}
export default function UseAutocomplete({ menuData }: AutoCompleteProps) {
  const [value, setValue] = React.useState<string | null>(null);

  const setSearch = searchMenuStorage((state) => state.setSearch);

  if (value) {
    setSearch(value);
  }

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: menuData,
    getOptionLabel: (option) => option,
    value,
    onChange: (_, newValue) => setValue(newValue),
  });

  return (
    <div
      className="w-full flex flex-col items-center"
      style={{ marginBottom: 16 }}
    >
      <Label
        className="text-white font-albertSans text-[25px] md:text-[35px] xl:text-[50px] mb-2"
        {...getInputLabelProps()}
      >
        Find Our Best Menu
      </Label>
      <Root {...getRootProps()} className={focused ? "Mui-focused" : ""}>
        <Input placeholder="search" {...getInputProps()} />
      </Root>
      {groupedOptions.length > 0 && (
        <Listbox
          className="mt-[85px] md:mt-[100px] xl:mt-[120px]"
          {...getListboxProps()}
        >
          {(groupedOptions as Array<string>).map((option, index) => (
            <Option {...getOptionProps({ option, index })}>{option}</Option>
          ))}
        </Listbox>
      )}
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Label = styled("label")`
  display: block;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Root = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 50px;
  color: #fff;
  background: rgba(30, 30, 30, 0.7);
  border: #F49B33 1px solid;
  box-shadow: 0 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.Mui-focused {
    border-color: #F49B33;
    box-shadow: 0 0 0 1px #F49B33;
  }

  &:hover {
    border-color: #F49B33;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const Input = styled("input")(
  () => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background: none;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`
);

const Listbox = styled("ul")(
  () => `
  scrollbar-width: none;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  max-height: 200px;
  z-index: 100;
  position: absolute;
  background: #fff;
  border: 1px solid #999;
  color: #444;
  box-shadow: 0 2px 3px rgba(0,0,0, 0.05);
  `
);

const Option = styled("li")(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected="true"] {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? grey[500] : grey[200]
    };
  }

  &[aria-selected="true"].Mui-focused,
  &[aria-selected="true"].Mui-focusVisible {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
  }
  `
);
