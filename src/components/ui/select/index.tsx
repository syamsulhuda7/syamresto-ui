/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import {
  Option as BaseOption,
  OptionProps,
  OptionOwnerState,
} from "@mui/base/Option";
import clsx from "clsx";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

interface SelectBaseUIProps {
  optionData: {
    name: string;
    value: string;
  }[];
  optionValue: (value: {}) => void;
}

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = "";
  if (disabled) {
    classes += " text-slate-400";
  } else {
    if (selected) {
      classes += " bg-orange-100 text-orange-950";
    } else if (highlighted) {
      classes += " bg-slate-100 text-slate-900";
    }
    classes += " hover hover:bg-slate-100 hover hover:text-slate-900";
    classes +=
      " focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400";
  }
  return classes;
};

const Option = React.forwardRef<HTMLLIElement, OptionProps<string>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 rounded-lg font-poppins cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`,
          }),
        }}
      />
    );
  }
);

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

// function useIsDarkMode() {
//   const theme = useTheme();
//   return theme.palette.mode === "dark";
// }

export default function SelectBaseUI({
  optionData,
  optionValue,
}: SelectBaseUIProps) {
  const handleChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: {} | null
  ) => {
    event?.preventDefault();
    if (value) {
      optionValue(value); // Menampilkan nilai yang dipilih
    }
  };

  return (
    <div>
      <Select defaultValue="all" onChange={handleChange}>
        <Option value="all">All</Option>
        {optionData.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const Select = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  // Replace this with your app logic for determining dark modes
  // const isDarkMode = useIsDarkMode();

  return (
    <BaseSelect
      ref={ref}
      {...props}
      className={clsx("CustomSelect", props.className)}
      slots={{
        root: Button,
      }}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative w-full text-sm font-poppins box-border w-80 px-3 py-2 rounded-lg text-left bg-white border border-solid border-slate-200 text-slate-900 transition-all hover:bg-slate-50 outline-0 shadow-inner shadow-slate-400 ${
                ownerState.focusVisible
                  ? "focus-visible:ring-4 ring-purple-500/30 focus-visible:border-purple-500"
                  : ""
              } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
              resolvedSlotProps?.className
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-white border border-solid border-slate-200 text-slate-900 shadow shadow-slate-200`,
              resolvedSlotProps?.className
            ),
          };
        },
        popup: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popup,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(`z-10`, resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});
