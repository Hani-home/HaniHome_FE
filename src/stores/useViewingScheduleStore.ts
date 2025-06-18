import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TimeLabel } from "@/constants/time-options";

interface Schedule {
  date: Date | null;
  time: string;
}

interface ViewingScheduleStore {
  // 히스토리
  history: number[];
  push: (index: number) => void;
  pop: () => number | undefined;
  remove: (index: number) => void;
  reset: () => void;

  // 뷰잉 스케줄
  schedules: Schedule[];
  selectedTimeLabels: TimeLabel[];
  activeIndex: number;
  mode: "calendar" | "time" | null;

  setSchedules: (s: Schedule[]) => void;
  setSelectedTimeLabels: (l: TimeLabel[]) => void;
  setActiveIndex: (index: number) => void;
  setMode: (m: "calendar" | "time" | null) => void;
}

export const useViewingScheduleStore = create<
  ViewingScheduleStore,
  [["zustand/persist", Partial<ViewingScheduleStore>]]
>(
  persist(
    (set, get) => ({
      // 초기 상태
      history: [0],
      schedules: [{ date: null, time: "NN : NN" }],
      selectedTimeLabels: ["아침"],
      activeIndex: 0,
      mode: "calendar",

      setSchedules: schedules => set({ schedules }),
      setSelectedTimeLabels: labels => set({ selectedTimeLabels: labels }),
      setActiveIndex: index => set({ activeIndex: index }),
      setMode: mode => set({ mode }),

      // 히스토리
      push: index =>
        set(state => {
          const last = state.history[state.history.length - 1];
          if (last === index) return state;
          return { history: [...state.history, index] };
        }),

      pop: () => {
        const prev = [...get().history];
        if (prev.length <= 1) return undefined;
        prev.pop();
        const last = prev[prev.length - 1];
        set({ history: prev });
        return last;
      },

      remove: index =>
        set(state => ({
          schedules: state.schedules.filter((_, i) => i !== index),
          selectedTimeLabels: state.selectedTimeLabels.filter(
            (_, i) => i !== index,
          ),
          history: state.history
            .filter(i => i !== index)
            .map(i => (i > index ? i - 1 : i)),
        })),

      reset: () =>
        set({
          history: [0],
          selectedTimeLabels: ["아침"],
          activeIndex: 0,
          mode: "calendar",
        }),
    }),
    {
      name: "viewing-schedule",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      partialize: (state): Partial<ViewingScheduleStore> => ({
        schedules: state.schedules,
        selectedTimeLabels: state.selectedTimeLabels,
      }),
      onRehydrateStorage: () => state => {
        if (!state) return;
        return {
          ...state,
          schedules: state.schedules.map(s => ({
            ...s,
            date: s.date ? new Date(s.date) : null,
          })),
        };
      },
    },
  ),
);
