import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input } from "@mui/base/Input";
import { useTheme } from "@mui/system";
import clsx from "clsx";

interface BasicFormControlProps {
  title: string;
  placeholder?: string;
  required: boolean;
  className?: string;
  type: string;
}

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

export default function BasicFormControl({
  title,
  placeholder,
  required,
  className,
  type,
}: BasicFormControlProps) {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <FormControl defaultValue="" className="font-sans" required>
        <Label>{title}</Label>
        <Input
          type={type}
          required={required}
          placeholder={placeholder}
          onChange={(e) => console.log(e.target.value)}
          slotProps={{
            input: {
              className: `${className} w-full min-w-60 md:w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-inner shadow-black border border-solid border-slate-300 bg-white text-slate-900 focus-visible:outline-0`,
            },
          }}
        />
        <HelperText />
      </FormControl>
    </div>
  );
}

const Label = React.forwardRef<
  HTMLParagraphElement,
  { className?: string; children?: React.ReactNode }
>(({ className: classNameProp, children }, ref) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p className={clsx("text-sm mb-1", classNameProp)}>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p
      ref={ref}
      className={clsx(
        "font-albertSans text-base mb-1",
        classNameProp,
        error || showRequiredError ? "invalid text-red-500" : ""
      )}
    >
      {children}
      {required ? " *" : ""}
    </p>
  );
});

const HelperText = React.forwardRef<
  HTMLParagraphElement,
  { className?: string }
>((props, ref) => {
  const { className, ...other } = props;
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p ref={ref} className={clsx("text-sm", className)} {...other}>
      This field is required.
    </p>
  ) : null;
});
