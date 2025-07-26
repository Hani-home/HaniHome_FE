import { CostDetails, TimeSlot } from "./listingDetail";

export interface AvailabilityOptions {
  availableFrom: string | null;
  availableTo: string | null;
  immediate: boolean;
  negotiable: boolean;
}
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
      };
    }
  | {
      type: "timeSlots";
      value: TimeSlot[];
    }
  | { type: "optionItemIds"; value: number[] };
