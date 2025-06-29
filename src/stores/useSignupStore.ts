import { create } from "zustand";

interface SignupState {
  name: string;
  email: string;
  phoneNumber: string;
  agreed: number[];
  nickname: string;
  gender: string;
  interestRegion: string;
  profileImage: string;

  setField: (key: keyof SignupState, value: string) => void;
  setAgreed: (ids: number[]) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>(set => ({
  name: "",
  email: "",
  phoneNumber: "",
  agreed: [],
  nickname: "",
  gender: "",
  interestRegion: "",
  profileImage: "",

  setField: (key, value) => set(state => ({ ...state, [key]: value })),

  setAgreed: ids => set({ agreed: ids }),

  reset: () =>
    set({
      name: "",
      email: "",
      phoneNumber: "",
      agreed: [],
      nickname: "",
      gender: "",
      interestRegion: "",
      profileImage: "",
    }),
}));
