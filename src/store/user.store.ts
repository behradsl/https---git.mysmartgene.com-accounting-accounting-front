
import { UserEntity } from "@/types/user-entity.type";
import { create } from "zustand";


interface userStore {
  user:UserEntity|undefined;
  setUser:(UserEntity?:UserEntity)=>void;
}


const useUser = create<userStore>()((set) => ({
  user: undefined,
  setUser: (userData) => {
    set(({ setUser }) => ({ setUser, user: userData }));
  },
}));

export { useUser };
