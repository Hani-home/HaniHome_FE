
import {
  AdditionalInfo,
  Costs,
  Furniture,
  LivingConditions,
  PropertyDetails,
} from "@/types/listingDetail";

export const formatFurniture = (furniture: Furniture | null | undefined): string => {
  if (!furniture) return "N/A";
  return Object.values(furniture)
    .map(items => items.join(", "))
    .join(" / ");
};

export const formatHighlights = (highlights: string[] | null | undefined): string => {
  if (!highlights || highlights.length === 0) return "N/A";
  return highlights.join(" / ");
};

export const formatAdditionalInfo = (additionalInfo: AdditionalInfo | null | undefined): string => {
  if (!additionalInfo) return "N/A";
  const parts: string[] = [];

  parts.push(additionalInfo.smokingAllowed ? "흡연자 가능" : "흡연자 불가");
  parts.push(additionalInfo.petsAllowed ? "반려동물 가능" : "반려동물 불가");
  parts.push(additionalInfo.visitorsAllowed ? "외부인 방문 가능" : "외부인 방문 불가");

  if (additionalInfo.parking.length > 0) {
    parts.push(additionalInfo.parking.map(p => `주차 ${p}`).join(", "));
  } else {
    parts.push("주차 불가");
  }

  parts.push(additionalInfo.kitchenAccess ? "주방 사용 가능" : "주방 사용 불가");
  return parts.join(" / ");
};

export const formatPropertyDetails = (propertyDetails: PropertyDetails | null | undefined) => {
  if (!propertyDetails) return <div>N/A</div>;
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex justify-end gap-2">
        <span>Internal area</span>
        <span className="text-mint">{propertyDetails.internalArea}</span>
        <span>m²</span>
      </div>
      <div className="flex justify-end gap-2">
        <span>Total area</span>
        <span className="text-mint">{propertyDetails.totalArea}</span>
        <span>m²</span>
      </div>
      <div className="flex justify-end gap-2">
        <span>방 개수</span>
        <span className="text-mint">{propertyDetails.totalResidents}</span>
        <span>개</span>
      </div>
      <div className="flex justify-end gap-2">
        <span>욕실 개수</span>
        <span className="text-mint">{propertyDetails.sharedBathrooms}</span>
        <span>개</span>
      </div>
      <div className="flex justify-end gap-2">
        <span>건물 전체 층</span>
        <span className="text-mint">{propertyDetails.buildingFloors}</span>
        <span>층</span>
      </div>
      <div className="flex justify-end gap-2">
        <span>해당 층</span>
        <span className="text-mint">{propertyDetails.floor}</span>
        <span>층</span>
      </div>
    </div>
  );
};

export const formatIsBrokered = (isBrokered: boolean | null | undefined) => {
  if (isBrokered === null || isBrokered === undefined) return "N/A";
  return isBrokered ? "부동산 중개" : "개인 임대";
};

export const formatGuestGender = (guestGender: string[] | null | undefined) => {
  if (!guestGender || guestGender.length === 0) return "N/A";
  const base = guestGender.find(g => g !== "LGBTQ 가능") || "무관";
  const hasLGBTQ = guestGender.includes("LGBTQ 가능");
  return hasLGBTQ ? `${base} (LGBTQ 가능)` : base;
};

export const formatMoveInDates = (moveInDates: string[] | null | undefined) => {
  if (!moveInDates || moveInDates.length === 0) return <div>N/A</div>;
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-end gap-2">
        <span>입주 가능일</span>
        <span className="text-mint">{moveInDates[0]}</span>
      </div>
      <div className="flex justify-end">
        <span>{moveInDates[1] || "N/A"}</span>
      </div>
    </div>
  );
};

export const formatCosts = (costs: Costs | null | undefined) => {
  if (!costs) return <div>N/A</div>;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <span>{costs.billsIncluded ? "빌 포함" : "빌 미포함"}</span>
        <span className="text-mint">{costs.weeklyCost}</span>
        <span>주/$</span>
      </div>
      {costs.includedItems.length > 0 && (
        <div>
          <span>{costs.includedItems.join(", ")}</span>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <span>디파짓</span>
        <span className="text-mint">{costs.deposit}</span>
        <span>주/$</span>
      </div>
    </div>
  );
};

export const formatLivingConditions = (livingConditions: LivingConditions | null | undefined) => {
  if (!livingConditions) return <div>N/A</div>;
  return (
    <div className="grid grid-cols-2">
      <div className="flex gap-2 justify-end">
        <span>노티스</span>
        <span className="text-mint">{livingConditions.noticePeriod}</span>
        <span>주</span>
      </div>
      <div className="flex gap-2 justify-end">
        <span>최소거주기간</span>
        <span className="text-mint">{livingConditions.minStayDuration}</span>
        <span>주</span>
      </div>
      <div>{livingConditions.contractType}</div>
    </div>
  );
};