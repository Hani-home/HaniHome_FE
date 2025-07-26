import { create } from "zustand";

import { CostDetails, PropertyRegion, TimeSlot } from "@/types/listingDetail";

interface ListingState {
  listingType: "SHARE" | "RENT" | null;
  setListingType: (type: "SHARE" | "RENT" | null) => void;

  addressData: PropertyRegion;
  setAddressData: (data: PropertyRegion) => void;

  photoData: string[];
  setPhotoData: (data: string[]) => void;

  costDetails: CostDetails;
  setCostDetails: <K extends keyof CostDetails>(
    key: K,
    value: CostDetails[K],
  ) => void;
  setAllCostDetails: (value: CostDetails) => void;

  optionItemIds: number[];
  setOptionItemIds: (ids: number[]) => void;

  timeSlots: TimeSlot[];
  setTimeSlots: (data: TimeSlot[]) => void;

  meetingDateFrom: string | null;
  meetingDateTo: string | null;
  setMeetingDateRange: (from: string | null, to: string | null) => void;

  viewingAlwaysAvailable: boolean;
  setViewingAlwaysAvailable: (value: boolean) => void;
}

export const useListingStore = create<ListingState>(set => ({
  listingType: null,
  setListingType: type => set({ listingType: type }),

  addressData: {
    country: "",
    postCode: "",
    state: "",
    suburb: "",
    streetName: "",
    streetNumber: "",
    unit: "",
    buildingName: "",
    longitude: 0,
    latitude: 0,
  },
  setAddressData: data => set({ addressData: data }),

  photoData: [],
  setPhotoData: data => set({ photoData: data }),

  costDetails: {
    weeklyCost: 0,
    costDescription: "",
    deposit: 0,
    keyDeposit: 0,
    depositAdjustable: false,
    billIncluded: false,
  },
  setCostDetails: (key, value) =>
    set(state => ({
      costDetails: {
        ...state.costDetails,
        [key]: value,
      },
    })),

  setAllCostDetails: value => set({ costDetails: value }),

  optionItemIds: [],
  setOptionItemIds: ids => set({ optionItemIds: ids }),

  timeSlots: [
    { timeFrom: "00:00", timeTo: "00:00" },
    { timeFrom: "00:00", timeTo: "00:00" },
    { timeFrom: "00:00", timeTo: "00:00" },
  ],
  setTimeSlots: data => set({ timeSlots: data }),

  meetingDateFrom: null,
  meetingDateTo: null,
  setMeetingDateRange: (from, to) =>
    set({ meetingDateFrom: from, meetingDateTo: to }),

  viewingAlwaysAvailable: false,
  setViewingAlwaysAvailable: value => set({ viewingAlwaysAvailable: value }),
}));
