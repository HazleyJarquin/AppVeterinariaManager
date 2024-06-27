import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useAuthToken = createWithEqualityFn(
  persist<AuthState>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-token",
    }
  )
);
