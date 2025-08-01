import {
  CapacityRent,
  CapacityShare,
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
  TimeSlot,
} from "./listingDetailPost";

export type MovingConditionsOption =
  | {
      type: "genderPreference";
      value: GenderPreference;
    }
  | {
      type: "moveInInfo";
      value: MoveInInfo;
    }
  | {
      type: "livingConditions";
      value: LivingConditions;
    }
  | { type: "optionItemIds"; value: number[] };

export type ContractTermsOption =
  | {
      type: "costDetails";
      value: CostDetails;
    }
  | {
      type: "meetingTime";
      value: {
        meetingDateFrom: string | null;
        meetingDateTo: string | null;
        viewingAlwaysAvailable: boolean | null;
      };
    }
  | {
      type: "timeSlots";
      value: TimeSlot[];
    }
  | { type: "optionItemIds"; value: number[] };

export type ListingDetailsOption =
  | { type: "propertyType"; value: RentPropertySubType | SharePropertySubType }
  | { type: "capacityPeople"; value: CapacityRent | CapacityShare }
  | { type: "highlights"; value: number[] }
  | { type: "furniture"; value: number[] }
  | { type: "isBrokered"; value: number }
  | {
      type: "internalDetails";
      value: ShareInternalDetails | RentInternalDetails;
    };
