import { UserStoreType } from "@/hooks/use-auth.hook";
import { create } from "zustand";



const useUser = create<UserStoreType>()((set) => ({
  user: undefined,
  setUser: (userData) => {
    set(({ setUser }) => ({ setUser, user: userData }));
  },
}));

export { useUser };
