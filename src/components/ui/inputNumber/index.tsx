import * as React from "react";
import { Box, styled } from "@mui/system";
import { Input as BaseInput } from "@mui/base/Input";

interface InputProps {
  slots?: {
    input?: React.ElementType;
    root?: React.ElementType;
    textarea?: React.ElementType;
  };
  id: string;
  type: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startAdornment?: React.ReactNode;
}

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { slots, ...other } = props;
  return (
    <BaseInput
      slots={{
        root: InputRoot,
        input: InputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

// Input.propTypes = {
//   slots: PropTypes.shape({
//     input: PropTypes.elementType,
//     root: PropTypes.elementType,
//     textarea: PropTypes.elementType,
//   }),
// };

interface NumberInputProps {
  sendValue: (value: number) => void;
  defaultVal: number;
  label: {
    title: string;
    position: string;
  };
}

interface ValuesType {
  amount: number;
}
export default function NumberInput({
  defaultVal,
  sendValue,
  label,
}: NumberInputProps) {
  const [values, setValues] = React.useState<ValuesType>({
    amount: defaultVal,
  });

  const handleChange =
    (prop: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: Number(event.target.value) });
      sendValue(Number(event.target.value));
    };

  // React.useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <Box
      className="font-poppins"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Input
        id="outlined-start-adornment"
        type="number"
        // defaultValue={default}
        value={values.amount}
        onChange={handleChange("amount")}
        startAdornment={<InputAdornment>{label.title}</InputAdornment>}
      />
    </Box>
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

const InputRoot = styled("div")(
  () => `
  box-shadow: inset 1px 3px 4px rgba(0, 0, 0, 0.35);
  font-weight: 400;
  border-radius: 8px;
  width: 100%;
  height: auto;
  color: #9DA8B7;
  background: #fff;
  border: 1px solid #f1f1f1;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #f1f1f1;
  }

  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`
);

const InputElement = styled("input")(
  () => `
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  background: transparent;
  color: ${grey[600]};
  border: none;
  border-radius: inherit;
  padding: 4px 8px;
  outline: 0;
`
);

const InputAdornment = styled("div")`
  margin: 8px;
  font-size: 14px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
