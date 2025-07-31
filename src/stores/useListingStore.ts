import { create } from "zustand";

import {
  CapacityRent,
  CapacityShare,
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  PropertyRegion,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
  TimeSlot,
} from "@/types/listingDetail";

interface ListingState {
  listingType: "SHARE" | "RENT" | null;
  setListingType: (type: "SHARE" | "RENT" | null) => void;

  region: PropertyRegion;
  setRegion: (data: PropertyRegion) => void;

  photoUrls: string[];
  setPhotoUrls: (data: string[]) => void;

  rentPropertyType: RentPropertySubType | null;
  setRentPropertyType: (data: RentPropertySubType | null) => void;

  sharePropertyType: SharePropertySubType | null;
  setSharePropertyType: (data: SharePropertySubType | null) => void;

  rentCapacityPeople: CapacityRent | null;
  setRentCapacityPeople: (data: CapacityRent | null) => void;

  shareCapacityPeople: CapacityShare | null;
  setShareCapacityPeople: (data: CapacityShare | null) => void;

  rentInternalDetails: RentInternalDetails | null;
  setRentInternalDetails: (data: RentInternalDetails | null) => void;

  shareInternalDetails: ShareInternalDetails | null;
  setShareInternalDetails: (data: ShareInternalDetails | null) => void;

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

  description: string;
  setDescription: (data: string) => void;

  genderPreference: GenderPreference | null;
  setGenderPreference: (value: GenderPreference | null) => void;

  lgbtAvailable: boolean;
  setLgbtAvailable: (value: boolean) => void;

  moveInInfo: MoveInInfo;
  setMoveInInfo: (value: MoveInInfo) => void;

  livingConditions: LivingConditions | null;
  setLivingConditions: (value: LivingConditions | null) => void;
}

export const useListingStore = create<ListingState>(set => ({
  listingType: null,
  setListingType: type => set({ listingType: type }),

  region: {
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
  setRegion: data => set({ region: data }),

  photoUrls: [],
  setPhotoUrls: data => set({ photoUrls: data }),

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

  description: "",
  setDescription: data => set({ description: data }),

  genderPreference: null,
  setGenderPreference: value => set({ genderPreference: value }),

  lgbtAvailable: false,
  setLgbtAvailable: value => set({ lgbtAvailable: value }),

  moveInInfo: {
    availableFrom: "",
    availableTo: "",
    isImmediate: false,
    isNegotiable: false,
  },
  setMoveInInfo: value => set({ moveInInfo: value }),

  livingConditions: null,
  setLivingConditions: value => set({ livingConditions: value }),

  rentPropertyType: null,
  setRentPropertyType: data => set({ rentPropertyType: data }),

  sharePropertyType: null,
  setSharePropertyType: data => set({ sharePropertyType: data }),

  rentCapacityPeople: null,
  setRentCapacityPeople: data => set({ rentCapacityPeople: data }),

  shareCapacityPeople: null,
  setShareCapacityPeople: data => set({ shareCapacityPeople: data }),

  rentInternalDetails: {
    internalArea: 0,
    totalArea: 0,
    totalFloors: 0,
    propertyFloor: 0,
    numberOfRoom: 0,
    numberOfBath: 0,
    yardIncluded: false,
    verandaIncluded: false,
  },
  setRentInternalDetails: data => set({ rentInternalDetails: data }),

  shareInternalDetails: {
    internalArea: 0,
    totalArea: 0,
    totalFloors: 0,
    propertyFloor: 0,
    totalResidents: 0,
    totalBathUser: 0,
    withPropertyOwner: false,
  },
  setShareInternalDetails: data => set({ shareInternalDetails: data }),
}));
