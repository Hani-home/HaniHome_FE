import { OptionItem } from "./listingDetailGet.type";
import {
  GenderPreference,
  PropertyRegion,
  PropertySuperType,
  RentInternalDetails,
  ShareInternalDetails,
} from "./listingDetailPost.type";

export type FunnelSteps =
  | "ADDRESS_PHOTO "
  | "LISTING_DETAILS"
  | "MOVING_CONDITIONS"
  | "CONTRACT_TERMS"
  | "LISTING_DESCRIPTION"
  | "CREATE_SUCCESS";

export interface TemporaryPropertyId {
  temporaryPropertyId: number;
  createdAt: string;
}

export interface TemporaryCostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  billIncluded: boolean;
  depositAdjustable: boolean;
}

export interface TemporaryLivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  contractExtendable: boolean;
}

export interface TemporaryMoveInInfo {
  availableFrom: string; // ISO datetime
  availableTo: string; // ISO datetime
  isImmediate: boolean;
  isNegotiable: boolean;
}

export interface TemporaryTimeSlot {
  timeFrom: string;
  timeTo: string;
}

export interface ViewingAvailableDateTime {
  date: string; // "YYYY-MM-DD"
  time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  timeInterval: "MINUTE30" | "MINUTE60"; // 가능성에 따라 enum 처리
  reserved: boolean;
}

export interface TemporaryProperty {
  id: number;
  kind: PropertySuperType; // "RENT" | "SHARE"
  genderPreference: GenderPreference;
  lgbtAvailable: boolean;
  region: PropertyRegion;
  photoUrls: string[];
  costDetails: TemporaryCostDetails;
  optionItems: OptionItem[];
  livingConditions: TemporaryLivingConditions;
  moveInInfo: TemporaryMoveInInfo;
  meetingDateFrom: string; //isoDate
  meetingDateTo: string; // isoDate
  timeSlots: TemporaryTimeSlot[];
  viewingAvailableDateTimes: ViewingAvailableDateTime[];
  viewingAlwaysAvailable: boolean;
  description: string;
  createdAt: string; // ISO date
  // 내부 구조는 kind에 따라 아래 둘 중 하나만 존재:
  shareInternalDetails?: ShareInternalDetails;
  rentInternalDetails?: RentInternalDetails;
}
