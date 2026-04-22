import { create } from "zustand";

interface UserState {
  id: number;
  name: string;
  email: string;
  token: string;
  isUserLoggedIn: boolean;
  isUserAdmin: boolean;
}

interface UserActions {
  setUser: (user: UserState) => void;
  clearUser: () => void;
}

export type UserStore = UserState & UserActions;

const useUserStore = create<UserStore>((set) => ({
  id: 0,
  name: "",
  email: "",
  token: "",
  isUserLoggedIn: false,
  isUserAdmin: false,
  setUser: (user: UserState) => set(user),
  clearUser: () =>
    set({
      id: 0,
      name: "",
      email: "",
      token: "",
      isUserLoggedIn: false,
      isUserAdmin: false,
    }),
}));
