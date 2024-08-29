import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

type AttemptsState = {
  attempts: number;
  setAttempts: (value: number | ((prevAttempts: number) => number)) => void;
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
};

export const useAttempts = createWithEqualityFn(
  persist<AttemptsState>(
    (set) => ({
      attempts: 0,
      setAttempts: (value) =>
        set((state) => ({
          attempts: typeof value === "function" ? value(state.attempts) : value,
        })),
      isLocked: false,
      setIsLocked: (isLocked: boolean) => set({ isLocked }),
    }),
    {
      name: "attempts-store",
    }
  )
);
