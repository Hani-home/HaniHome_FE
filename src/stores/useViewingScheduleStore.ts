import { create } from "zustand";

import { TimeLabel } from "@/constants/time-options";

import { Schedule } from "@/types/schedule";

interface StorePerId {
  schedule: Schedule;
  selectedTimeLabel: TimeLabel;
}

interface ViewingScheduleStore {
  data: Record<string, StorePerId>;
  activeId: string | null;

  setActiveId: (id: string) => void;
  setSchedule: (id: string, schedule: Schedule) => void;
  setSelectedTimeLabel: (id: string, label: TimeLabel) => void;

  getSchedule: () => Schedule;
  getSelectedTimeLabel: () => TimeLabel;

  reset: () => void;
}

export const useViewingScheduleStore = create<ViewingScheduleStore>(
  (set, get) => ({
    data: {},
    activeId: null,

    setActiveId: id => {
      const state = get();
      if (!state.data[id]) {
        state.data[id] = {
          schedule: { date: null, time: "NN : NN" },
          selectedTimeLabel: "아침",
        };
      }
      set({ activeId: id });
    },

    setSchedule: (id, schedule) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            schedule,
          },
        },
      })),

    setSelectedTimeLabel: (id, label) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            selectedTimeLabel: label,
          },
        },
      })),

    getSchedule: () => {
      const { activeId, data } = get();
      return activeId && data[activeId]?.schedule
        ? data[activeId].schedule
        : { date: null, time: "NN : NN" };
    },

    getSelectedTimeLabel: () => {
      const { activeId, data } = get();
      return activeId && data[activeId]?.selectedTimeLabel
        ? data[activeId].selectedTimeLabel
        : "아침";
    },

    reset: () => {
      const id = get().activeId;
      if (!id) return;

      set(state => ({
        data: {
          ...state.data,
          [id]: {
            schedule: { date: null, time: "NN : NN" },
            selectedTimeLabel: "아침",
          },
        },
      }));
    },
  }),
);
