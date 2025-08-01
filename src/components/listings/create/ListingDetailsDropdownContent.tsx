import { useListingStore } from "@/stores/useListingStore";

import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";
import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer";
import {
  CapacityRent,
  CapacityShare,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost";

import CapacityPeopleField from "./CapacityPeopleField";
import FurnitureContent from "./FurnitureContent";
import HighLightsContent from "./HighLightsContent";
import InternalDetailsContent from "./InternalDetailsContent";
import IsBrokeredField from "./IsBrokeredField";
import PropertyTypeField from "./PropertyTypeField";

interface Props<T extends ListingDetailsOption["type"]> {
  id: T;
  value: Extract<ListingDetailsOption, { type: T }>["value"];
  onSelect: (
    value: Extract<ListingDetailsOption, { type: T }>["value"],
  ) => void;
}

function updateOptionItemIdsByCategory(
  prevIds: number[],
  newIds: number[],
  categoryIds: number[],
): number[] {
  const remaining = prevIds.filter(id => !categoryIds.includes(id));
  return [...remaining, ...newIds];
}

function ListingDetailsDropdownContent<T extends ListingDetailsOption["type"]>({
  id,
  value,
  onSelect,
}: Props<T>) {
  const {
    listingType,
    optionItemIds,
    setOptionItemIds,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    rentInternalDetails,
    setRentInternalDetails,
    shareInternalDetails,
    setShareInternalDetails,
  } = useListingStore();

  if (!listingType) return null;

  const question = QUESTION_MAP[listingType].ListingDetails.find(
    q => q.id === id,
  );
  if (!question) return null;

  const highlightIds = CATEGORY_OPTIONS[1].items.map(
    item => item.optionId,
  ) as number[]; // 1~10
  const furnitureIds = Object.values(CATEGORY_OPTIONS[2].items)
    .flat()
    .map(item => item.optionId) as number[];
  const isBrokeredIds = CATEGORY_OPTIONS[5].items.map(
    item => item.optionId,
  ) as number[]; // 54~55

  switch (id) {
    case "internalDetails": {
      const internalDetails =
        listingType === "RENT" ? rentInternalDetails : shareInternalDetails;

      if (!internalDetails) return null;

      const onSelectInternalDetails = onSelect as (
        value: Extract<
          ListingDetailsOption,
          { type: "internalDetails" }
        >["value"],
      ) => void;

      return (
        <InternalDetailsContent
          value={internalDetails}
          onChange={(key, val) => {
            const updated = {
              ...internalDetails,
              [key]: val,
            };
            if (listingType === "RENT") {
              setRentInternalDetails(updated as RentInternalDetails);
            } else {
              setShareInternalDetails(updated as ShareInternalDetails);
            }
            onSelectInternalDetails(updated);
          }}
          listingType={listingType}
        />
      );
    }

    case "highlights": {
      const onSelectHighlights = onSelect as (
        value: Extract<ListingDetailsOption, { type: "highlights" }>["value"],
      ) => void;

      return (
        <HighLightsContent
          value={optionItemIds.filter(id => highlightIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              highlightIds,
            );
            setOptionItemIds(updated);
            onSelectHighlights(updated);
          }}
        />
      );
    }
    case "furniture": {
      const onSelectFurniture = onSelect as (
        value: Extract<ListingDetailsOption, { type: "furniture" }>["value"],
      ) => void;
      return (
        <FurnitureContent
          value={optionItemIds.filter(id => furnitureIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              furnitureIds,
            );
            setOptionItemIds(updated);
            onSelectFurniture(updated);
          }}
        />
      );
    }
    case "isBrokered": {
      const onSelectBrokered = onSelect as (
        value: Extract<ListingDetailsOption, { type: "isBrokered" }>["value"],
      ) => void;
      return (
        <IsBrokeredField
          value={optionItemIds.filter(id => isBrokeredIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              isBrokeredIds,
            );
            setOptionItemIds(updated);
            const selected = newValue[0] ?? null;
            if (selected !== null) {
              onSelectBrokered(selected);
            }
          }}
        />
      );
    }
    case "capacityPeople": {
      const onSelectCapacity = onSelect as (
        value: Extract<
          ListingDetailsOption,
          { type: "capacityPeople" }
        >["value"],
      ) => void;
      return (
        <CapacityPeopleField
          listingType={listingType}
          value={value as CapacityRent | CapacityShare}
          onSelect={selected => {
            if (listingType === "RENT") {
              setRentCapacityPeople(selected as CapacityRent);
            } else {
              setShareCapacityPeople(selected as CapacityShare);
            }
            onSelectCapacity(selected);
          }}
        />
      );
    }
    case "propertyType": {
      const onSelectProperty = onSelect as (
        value: Extract<ListingDetailsOption, { type: "propertyType" }>["value"],
      ) => void;
      return (
        <PropertyTypeField
          listingType={listingType}
          value={value as RentPropertySubType | SharePropertySubType}
          onSelect={selected => {
            if (listingType === "RENT") {
              setRentPropertyType(selected as RentPropertySubType);
            } else {
              setSharePropertyType(selected as SharePropertySubType);
            }
            onSelectProperty(selected);
          }}
        />
      );
    }
    default:
      return null;
  }
}

export default ListingDetailsDropdownContent;
