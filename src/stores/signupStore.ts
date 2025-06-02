import { create } from "zustand";

interface SignupState {
  name: string;
  email: string;
  phone: string;
  agreed: number[];

  nickname: string;
  gender: string;
  region: string;
  profileimg: string;

  setField: (key: keyof SignupState, value: string) => void;
  setAgreed: (ids: number[]) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>(set => ({
  name: "",
  email: "",
  phone: "",
  agreed: [],
  nickname: "",
  gender: "",
  region: "",
  profileimg: "",

  setField: (key, value) => set(state => ({ ...state, [key]: value })),

  setAgreed: ids => set({ agreed: ids }),

  reset: () =>
    set({
      name: "",
      email: "",
      phone: "",
      agreed: [],
      nickname: "",
      gender: "",
      region: "",
      profileimg: "",
    }),
}));
