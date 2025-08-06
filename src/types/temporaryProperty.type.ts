export interface TemporaryPropertyId{
  temporaryPropertyId: number;
  createdAt: string;
}

export interface TemporaryCostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  isBillIncluded: boolean; // 주의: API 응답은 isBillIncluded
  isDepositAdjustable: boolean; // 주의: API 응답은 isDepositAdjustable
}

export interface TemporaryLivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  isContractExtendable: boolean; // 주의: API 응답은 isContractExtendable
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
  meetingDateFrom: string; // "2025-08-06"
  meetingDateTo: string; // "2025-08-06"
  timeSlots: TemporaryTimeSlot[];
  viewingAvailableDateTimes: ViewingAvailableDateTime[];
  viewingAlwaysAvailable: boolean;
  description: string;
  createdAt: string; // ISO date
  // 내부 구조는 kind에 따라 아래 둘 중 하나만 존재:
  shareInternalDetails?: ShareInternalDetails;
  rentInternalDetails?: RentInternalDetails;
}
import { ShareInternalDetails, RentInternalDetails,PropertySuperType, GenderPreference, PropertyRegion } from "./listingDetailPost.type";
import { OptionItem } from "./listingDetailGet.type";

