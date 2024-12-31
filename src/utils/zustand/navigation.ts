import { create } from "zustand";

// Define state and actions
type Set = {
  navigation: string;
};

type Actions = {
  setNavigation: (navigation: string) => void;
};

const pathname = window.location.pathname.split("/")[1];
console.log({ pathname });

// Create Zustand store
export const navigationStore = create<Set & Actions>((set) => ({
  navigation: pathname ? pathname : "home", // Set the initial navigation value
  setNavigation: (navigation) => set(() => ({ navigation })), // Update the navigation value
}));
