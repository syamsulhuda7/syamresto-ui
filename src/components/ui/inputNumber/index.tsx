import * as React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";
import { Input as BaseInput } from "@mui/base/Input";

const Input = React.forwardRef(function CustomInput(props, ref) {
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

Input.propTypes = {
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
};

export default function NumberInput() {
  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleChange =
    (prop: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  React.useEffect(() => {
    console.log(values);
  }, [values]);

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
      // id="outlined-start-adornment"
      // type="number"
      // value={values.amount}
      // onChange={handleChange("amount")}
      // startAdornment={<InputAdornment>Rp</InputAdornment>}
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
  padding: 8px 12px;
  outline: 0;
`
);

const InputAdornment = styled("div")`
  margin: 8px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
