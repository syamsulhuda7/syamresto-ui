import * as React from "react";
import { Transition } from "react-transition-group";
// import { useTheme } from "@mui/system";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/base/Snackbar";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";
import { snackbarStorage } from "../../../utils/zustand/snackbar";

// function useIsDarkMode() {
//   const theme = useTheme();
//   return theme.palette.mode === "dark";
// }

export default function SnackbarBaseUi() {
  //   const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState(true);
  const [mainText, setMainText] = React.useState("");
  const [subText, setSubText] = React.useState("");
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const snackbarValue = snackbarStorage((state) => state.snackbar);

  React.useEffect(() => {
    console.log({ snackbarValue });
    setOpen(snackbarValue.open);
    setMainText(snackbarValue.mainText);
    setSubText(snackbarValue.subText);
  }, [snackbarValue]);
  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <div className={``}>
      {/* <button
        className="cursor-pointer text-sm font-sans box-border rounded-lg font-semibold px-4 py-2 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none shadow-sm"
        type="button"
        onClick={handleClick}
      >
        Open snackbar
      </button> */}
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
        className="fixed z-50 font-sans flex right-4 bottom-4 left-auto max-w-xl	min-w-xs"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="flex gap-4	overflow-hidden	bg-white rounded-lg	border border-solid border-slate-200 shadow-md text-slate-900 p-3 text-start"
              style={{
                transform: positioningStyles[status],
                transition: "transform 300ms ease",
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: "success.main",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "1.5rem",
                }}
              />
              <div className="flex-1	max-w-full">
                <p className="m-0 leading-normal mr-2 font-medium">
                  {mainText}
                </p>
                <p className="m-0 leading-normal font-normal	text-slate-800">
                  {subText}
                </p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer	shrink-0	p-0.5	rounded hover:bg-slate-50"
              />
            </div>
          )}
        </Transition>
      </Snackbar>
    </div>
  );
}

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
  unmounted: "translateX(500px)",
};
