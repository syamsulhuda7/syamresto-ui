import { create } from "zustand";

// Define state and actions
interface Set {
  navigation: string;
}

interface Actions {
  setNavigation: (navigation: string) => void;
}

// const pathname = window.location.pathname.split("/")[1];
// Create Zustand store
export const navigationStore = create<Set & Actions>((set) => ({
  navigation: "/", // Set the initial navigation value
  setNavigation: (navigation) => set(() => ({ navigation })), // Update the navigation value
}));
