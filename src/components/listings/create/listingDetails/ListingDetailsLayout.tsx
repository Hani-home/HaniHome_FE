"use client";

import { useEffect } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/DropdownSelector";

import {
  CAPACITY_RENT_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";
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
} from "@/types/listingDetail";

import FunnelLayout from "../common/FunnelLayout";
import ListingDetailsDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const {
    rentInternalDetails,
    shareInternalDetails,
    rentPropertyType,
    sharePropertyType,
    rentCapacityPeople,
    shareCapacityPeople,
    optionItemIds,
    listingType,
    setRentInternalDetails,
    setShareInternalDetails,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    setOptionItemIds,
  } = useListingStore();

  const section = "ListingDetails";
  const questions = listingType ? QUESTION_MAP[listingType][section] : [];

  const highlightIds = CATEGORY_OPTIONS[1].items.map(item => item.optionId);
  const furnitureIds = Object.values(CATEGORY_OPTIONS[2].items)
    .flat()
    .map(item => item.optionId);
  const isBrokeredIds = CATEGORY_OPTIONS[5].items.map(item => item.optionId);

  const getAnswerValue = (id: ListingDetailsOption["type"]) => {
    switch (id) {
      case "internalDetails":
        return listingType === "RENT"
          ? rentInternalDetails
          : shareInternalDetails;
      case "propertyType":
        return listingType === "RENT" ? rentPropertyType : sharePropertyType;
      case "capacityPeople":
        return listingType === "RENT"
          ? rentCapacityPeople
          : shareCapacityPeople;
      case "highlights":
        return optionItemIds.filter(id =>
          highlightIds.includes(id as (typeof highlightIds)[number]),
        );
      case "furniture":
        return optionItemIds.filter(id =>
          furnitureIds.includes(id as (typeof furnitureIds)[number]),
        );
      case "isBrokered":
        return (
          optionItemIds.find(id =>
            isBrokeredIds.includes(id as (typeof isBrokeredIds)[number]),
          ) ?? null
        );
      default:
        return null;
    }
  };

  const getAnswerText = (questionId: string): string => {
    const answer = getAnswerValue(questionId as ListingDetailsOption["type"]);

    if (questionId === "internalDetails") {
      const val = answer as unknown as Record<string, number>;
      if (!val) return "";

      const parts = [
        val["internalArea"] || val["totalArea"] ? "면적" : null,
        val["totalResidents"] ? "거주인" : null,
        val["totalBathUser"] ? "욕실 쉐어" : null,
        val["numberOfRoom"] ? "방 개수" : null,
        val["numberOfBath"] ? "욕실 개수" : null,
        val["totalFloors"] || val["propertyFloor"] ? "층수" : null,
      ].filter(Boolean);

      return Array.from(new Set(parts)).join(", ");
    }

    switch (questionId) {
      case "isBrokered":
        return answer === 54 ? "개인임대" : "부동산 중개";
      case "highlights": {
        const highlights = answer as number[] | undefined;
        const options = CATEGORY_OPTIONS[1]?.items;
        const matched = options.filter(item =>
          highlights?.includes(item.optionId),
        );
        return matched.length
          ? `${matched[0].label}${matched.length > 1 ? "···" : ""}`
          : "";
      }
      case "furniture": {
        const furniture = answer as number[] | undefined;
        const options = CATEGORY_OPTIONS[2]?.items;
        const categories = Object.entries(options)
          .filter(([, items]) =>
            items.some(i => furniture?.includes(i.optionId)),
          )
          .map(([category]) => category);
        return categories.join(", ");
      }
      case "propertyType": {
        if (typeof answer !== "string") return "";
        return listingType === "RENT"
          ? RENT_TYPE_MAP[answer as keyof typeof RENT_TYPE_MAP]
          : SHARE_TYPE_MAP[answer as keyof typeof SHARE_TYPE_MAP];
      }
      case "capacityPeople": {
        if (typeof answer !== "string") return "";
        return listingType === "RENT"
          ? CAPACITY_RENT_MAP[answer as keyof typeof CAPACITY_RENT_MAP]
          : CAPACITY_SHARE_MAP[answer as keyof typeof CAPACITY_SHARE_MAP];
      }
      default:
        return typeof answer === "string" ? answer : "";
    }
  };

  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
    totalCount: questions.length,
    shouldAutoClose: index => {
      const id = questions[index].id as ListingDetailsOption["type"];
      const answer = getAnswerValue(id);

      if (id === "highlights" && Array.isArray(answer)) {
        const highlightOptionIds = CATEGORY_OPTIONS[1]?.items.map(
          item => item.optionId,
        ) as readonly number[];
        const selectedHighlightCount = (answer as number[]).filter(id =>
          highlightOptionIds.includes(id),
        ).length;
        return selectedHighlightCount >= 5;
      }

      if (
        id === "internalDetails" &&
        typeof answer === "object" &&
        !Array.isArray(answer) &&
        answer !== null
      ) {
        const requiredKeys = [
          ...(listingType === "RENT"
            ? ["numberOfRoom", "numberOfBath"]
            : ["totalResidents", "totalBathUser"]),
          "internalArea",
        ];
        return requiredKeys.every(key => {
          const val = (answer as unknown as Record<string, number>)[key];
          return typeof val === "number" && !isNaN(val);
        });
      }

      return !!answer;
    },
  });

  useEffect(() => {
    openIndices.forEach(idx => {
      const answer = getAnswerValue(
        questions[idx].id as ListingDetailsOption["type"],
      );
      if (autoAdvance && answer) autoAdvance(idx);
    });
  }, [openIndices, questions, autoAdvance]);

  const allAnswered = questions.every(q => {
    const answer = getAnswerValue(q.id as ListingDetailsOption["type"]);
    if (Array.isArray(answer)) return answer.length > 0;
    if (answer && typeof answer === "object")
      return Object.keys(answer).length > 0;
    return Boolean(answer);
  });

  return (
    <FunnelLayout>
      {questions.map((item, index) => {
        const answerValue = getAnswerValue(
          item.id as ListingDetailsOption["type"],
        );
        if (answerValue === undefined) return null;
        console.log("QUESTION ID:", item.id, "→ answer:", answerValue);

        return (
          <DropdownSelector
            key={item.id}
            label={item.label}
            answer={getAnswerText(item.id)}
            isOpen={openIndices.includes(index)}
            onClick={() => toggleIndex(index)}
          >
            <ListingDetailsDropdownContent
              id={item.id as ListingDetailsOption["type"]}
              value={answerValue}
              onSelect={val => {
                if (val === null) return;

                switch (item.id) {
                  case "propertyType":
                    listingType === "RENT"
                      ? setRentPropertyType(val as RentPropertySubType)
                      : setSharePropertyType(val as SharePropertySubType);
                    break;
                  case "capacityPeople":
                    listingType === "RENT"
                      ? setRentCapacityPeople(val as CapacityRent)
                      : setShareCapacityPeople(val as CapacityShare);
                    break;
                  case "internalDetails":
                    listingType === "RENT"
                      ? setRentInternalDetails(val as RentInternalDetails)
                      : setShareInternalDetails(val as ShareInternalDetails);
                    break;
                  case "highlights":
                  case "furniture":
                  case "isBrokered": {
                    const targetIds: number[] =
                      item.id === "highlights"
                        ? highlightIds
                        : item.id === "furniture"
                          ? furnitureIds
                          : isBrokeredIds;

                    const newIds = (Array.isArray(val) ? val : [val]).filter(
                      (v): v is number => typeof v === "number",
                    );
                    const updated = [
                      ...optionItemIds.filter(id => !targetIds.includes(id)),
                      ...newIds,
                    ];
                    setOptionItemIds(updated);
                    break;
                  }
                  default:
                    break;
                }
              }}
            />
          </DropdownSelector>
        );
      })}

      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              console.log("저장된 Zustand 상태", {
                rentPropertyType,
                sharePropertyType,
                rentCapacityPeople,
                shareCapacityPeople,
                rentInternalDetails,
                shareInternalDetails,
                optionItemIds,
              });
            },

            variant: "outline",
          },
          {
            label: "다음",
            onClick: onNext,
            variant: "filled",
            disabled: !allAnswered,
          },
        ]}
      />
    </FunnelLayout>
  );
};

export default ListingDetails;
