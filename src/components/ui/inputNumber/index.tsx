import * as React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";
// import { Button } from "@mui/base/Button";
import { Input as BaseInput, inputClasses } from "@mui/base/Input";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
};

export default function NumberInput() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  //   const handleChange = (prop) => (event) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  //   const handleClickShowPassword = () => {
  //     setValues({
  //       ...values,
  //       showPassword: !values.showPassword,
  //     });
  //   };

  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

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
        startAdornment={<InputAdornment>Rp</InputAdornment>}
      />
      {/* <Input
        id="outlined-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment>
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      /> */}
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


//   &.${inputClasses.focused} {
//     border-color: #f1f1f1;
//     box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
//   }

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

// const IconButton = styled(Button)(
//   ({ theme }) => `
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border: none;
//   background: inherit;
//   cursor: pointer;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
//   `
// );

const InputAdornment = styled("div")`
  margin: 8px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
