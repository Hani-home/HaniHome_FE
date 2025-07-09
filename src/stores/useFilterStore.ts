import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterStore {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create(
  persist<FilterStore>(
    set => ({
      selectedFilters: [],
      setSelectedFilters: filters => set({ selectedFilters: filters }),
      resetFilters: () => set({ selectedFilters: [] }),
    }),
    {
      name: "filter-storage",
    },
  ),
);
