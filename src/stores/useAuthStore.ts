import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string;
  isLoggedIn: boolean;

  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      accessToken: "",
      isLoggedIn: false,

      setAccessToken: token => set({ accessToken: token, isLoggedIn: true }),
      clearAuth: () => set({ accessToken: "", isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

//우선 persist로 저장, 추후 인터셉터에 재발급 로직 추가 예정
