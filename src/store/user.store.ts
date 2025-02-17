import { create } from "zustand";

export type UserStoreType = {
  user?: {
    id: string;
    name: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  setUser: (userData: UserStoreType["user"]) => void;
};

const useUser = create<UserStoreType>()((set) => ({
  user: undefined,
  setUser: (userData) => {
    set(({ setUser }) => ({ setUser, user: userData }));
  },
}));

export { useUser };
