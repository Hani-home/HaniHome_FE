import {
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  TimeSlot,
} from "./listingDetail";

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
