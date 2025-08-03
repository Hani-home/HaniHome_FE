export const FUNNEL_FLOW = [
  { step: "ListingType" },
  {
    step: "AddressPhoto",
    subSteps: ["address", "photo"],
  },
  { step: "ListingDetails" },
  { step: "MovingConditions" },
  { step: "ContractTerms" },
  { step: "ListingDescription" },
  { step: "CreateConfirm" },
  { step: "CreateSuccess" },
] as const;

export const FUNNEL_STEPS_LABEL = [
  { key: "addressPhoto", label: "주소와 사진" },
  { key: "listingDetails", label: "매물 상세" },
  { key: "movingConditions", label: "입주 조건" },
  { key: "contractTerms", label: "계약 사항" },
] as const;
