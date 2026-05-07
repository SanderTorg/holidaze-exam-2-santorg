import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
  isLoggedIn: boolean;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
}

interface UserActions {
  setUser: (user: Omit<UserState, "isLoggedIn">) => void;
  clearUser: () => void;
}

export type UserStore = UserState & UserActions;

const defaultState: UserState = {
  name: "",
  email: "",
  accessToken: "",
  venueManager: false,
  isLoggedIn: false,
  avatar: undefined,
  banner: undefined,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setUser: (user) => set({ ...user, isLoggedIn: true }),
      clearUser: () => set(defaultState),
    }),
    { name: "user-store" },
  ),
);
