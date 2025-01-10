import { create } from "zustand";

interface Set {
  snackbar: {
    open: boolean;
    mainText: string;
    subText: string;
  };
}

interface Actions {
  setSnackbar: (snackbar: Set["snackbar"]) => void;
}

export const snackbarStorage = create<Set & Actions>((set) => ({
  snackbar: {
    open: false,
    mainText: "",
    subText: "",
  },
  setSnackbar: (snackbar: Set["snackbar"]) => set({ snackbar }),
}));
