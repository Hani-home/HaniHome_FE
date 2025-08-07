import { UseListingStoreReturn } from "@/stores/useListingStore";

import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

type StepKey =
  | "ADDRESS_PHOTO"
  | "LISTING_DETAILS"
  | "MOVING_CONDITIONS"
  | "CONTRACT_TERMS"
  | "LISTING_DESCRIPTION"
  | "CREATE_CONFIRM";

export function createPayloadByStep(
  step: StepKey,
  store: UseListingStoreReturn,
  draftData?: Partial<TemporaryPropertyPost> | null,
): Partial<TemporaryPropertyPost> {
  const base = {
    ...draftData,
    status: step,
    kind: store.listingType ?? "RENT",
    jsonDiscriminator: store.listingType ?? "RENT",
  };
  switch (step) {
    case "ADDRESS_PHOTO":
      return {
        ...base,
        region: store.region,
        photoUrls: store.photoUrls,
      };

    case "LISTING_DETAILS": {
      const basePayload = createPayloadByStep(
        "ADDRESS_PHOTO",
        store,
        draftData,
      );

      if (store.listingType === "RENT") {
        return {
          ...basePayload,
          status: step,
          rentPropertySubType: store.rentPropertyType,
          capacityRent: store.rentCapacityPeople,
          internalDetails: store.rentInternalDetails,
          // SHARE 관련 필드는 null로 명시
          sharePropertySubType: null,
          capacityShare: null,
          optionItemIds: store.optionItemIds,
        };
      } else if (store.listingType === "SHARE") {
        return {
          ...basePayload,
          status: step,
          sharePropertySubType: store.sharePropertyType,
          capacityShare: store.shareCapacityPeople,
          internalDetails: store.shareInternalDetails,
          // RENT 관련 필드는 null로 명시
          rentPropertySubType: null,
          capacityRent: null,
          optionItemIds: store.optionItemIds,
        };
      } else {
        return basePayload;
      }
    }
    case "MOVING_CONDITIONS":
      return {
        ...createPayloadByStep("LISTING_DETAILS", store, draftData),
        status: step,
        moveInInfo: store.moveInInfo,
        genderPreference: store.genderPreference,
        lgbtAvailable: store.lgbtAvailable,
        livingConditions: store.livingConditions,
        optionItemIds: store.optionItemIds,
      };
    case "CONTRACT_TERMS":
      return {
        ...createPayloadByStep("MOVING_CONDITIONS", store, draftData),
        costDetails: store.costDetails,
        meetingDateFrom: store.meetingDateFrom,
        meetingDateTo: store.meetingDateTo,
        viewingAlwaysAvailable: store.viewingAlwaysAvailable,
        timeSlots:
          store.timeSlots?.map(slot => ({
            timeFrom: slot.timeFrom ?? "",
            timeTo: slot.timeTo ?? "",
          })) ?? [],
      };
    case "LISTING_DESCRIPTION":
      return {
        ...createPayloadByStep("CONTRACT_TERMS", store, draftData),
        description: store.description,
      };
    case "CREATE_CONFIRM":
      return createPayloadByStep("LISTING_DESCRIPTION", store, draftData);
    default:
      return draftData ?? {};
  }
}
