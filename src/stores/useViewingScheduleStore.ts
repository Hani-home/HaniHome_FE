import { create } from "zustand";

interface ViewingScheduleStore {
  history: number[];
  push: (index: number) => void;
  pop: () => number | undefined;
  remove: (index: number) => void;
  reset: () => void;
}

export const useViewingScheduleStore = create<ViewingScheduleStore>(
  (set, get) => ({
    history: [0],

    push: index =>
      set(state => {
        const last = state.history[state.history.length - 1];
        if (last === index) return state;
        return {
          history: [...state.history, index],
        };
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
        history: state.history
          .filter(i => i !== index)
          .map(i => (i > index ? i - 1 : i)),
      })),

    reset: () => set({ history: [0] }),
  }),
);
