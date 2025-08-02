import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import {
  CAPACITY_RENT_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";
import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";
import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer";

import DropdownSelector from "./DropdownSelector";
import ListingDetailsDropdownContent from "./ListingDetailsDropdownContent";
import FunnelStepMenu from "./common/FunnelStepMenu";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const { listingType } = useListingStore();

  const section = "ListingDetails";
  const questions = listingType ? QUESTION_MAP[listingType][section] : [];

  const [selectedAnswers, setSelectedAnswers] = useState<
    Partial<Record<ListingDetailsOption["type"], ListingDetailsOption["value"]>>
  >({});

  // openIndices 관리 및 자동 닫기/다음 열기 로직
  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
    totalCount: questions.length,
    shouldAutoClose: index => {
      const id = questions[index].id as ListingDetailsOption["type"];
      const answer = selectedAnswers[id];

      if (id === "highlights" && Array.isArray(answer)) {
        const highlightOptionIds =
          CATEGORY_OPTIONS[1]?.items?.map(item => item.optionId) ?? [];

        const selectedHighlightCount = (answer as number[]).filter(id =>
          highlightOptionIds.includes(
            id as (typeof highlightOptionIds)[number],
          ),
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
      if (autoAdvance && idx !== -1) {
        if (
          questions[idx] &&
          selectedAnswers[questions[idx].id as ListingDetailsOption["type"]]
        ) {
          autoAdvance(idx);
        }
      }
    });
  }, [selectedAnswers, openIndices, questions, autoAdvance]);

  if (!listingType) {
    return <div>매물 타입이 선택되지 않았습니다.</div>;
  }

  const getAnswerText = (questionId: string): string => {
    const answer = selectedAnswers[questionId as ListingDetailsOption["type"]];

    if (questionId === "internalDetails") {
      const val = answer as Record<string, string> | undefined;
      if (!val) return "";

      const areaLabels = ["internalArea", "totalArea"];
      const areaTexts = areaLabels.filter(key => val[key]).map(() => "면적");

      const resident = val["totalResidents"] ? "거주인" : "";
      const shareBathroom = val["totalBathUser"] ? "욕실 쉐어" : "";

      const rooms = val["numberOfRoom"] ? "방 개수" : "";
      const bathrooms = val["numberOfBath"] ? "욕실 개수" : "";

      const floorLabels = ["totalFloors", "propertyFloor"];
      const floorTexts = floorLabels.filter(key => val[key]).map(() => "층수");

      const parts = [
        areaTexts.length > 0 ? "면적" : null,
        resident || null,
        shareBathroom || null,
        rooms || null,
        bathrooms || null,
        floorTexts.length > 0 ? "층수" : null,
      ].filter(Boolean);

      const uniqueParts = Array.from(new Set(parts));

      return uniqueParts.join(", ");
    }
    switch (questionId) {
      case "internalDetails": {
        const val = answer as Record<string, string> | undefined;
        if (!val) return "";

        const areaLabels = ["internalArea", "totalArea"];
        const areaTexts = areaLabels.filter(key => val[key]).map(() => "면적");

        const resident = val["totalResidents"] ? "거주인" : "";
        const shareBathroom = val["totalBathUser"] ? "욕실 쉐어" : "";

        const rooms = val["numberOfRoom"] ? "방 개수" : "";
        const bathrooms = val["numberOfBath"] ? "욕실 개수" : "";

        const floorLabels = ["totalFloors", "propertyFloor"];
        const floorTexts = floorLabels
          .filter(key => val[key])
          .map(() => "층수");

        const parts = [
          areaTexts.length > 0 ? "면적" : null,
          resident || null,
          shareBathroom || null,
          rooms || null,
          bathrooms || null,
          floorTexts.length > 0 ? "층수" : null,
        ].filter(Boolean);

        const uniqueParts = Array.from(new Set(parts));

        return uniqueParts.join(", ");
      }

      case "isBrokered": {
        const isBrokered = answer;
        return isBrokered === 54 ? "개인임대" : "부동산 중개";
      }

      case "highlights": {
        const highlights = answer as number[] | undefined;
        if (!highlights || highlights.length === 0) return "";

        const highlightOptions = CATEGORY_OPTIONS[1]?.items;
        const filteredHighlights = highlights.filter(h =>
          highlightOptions.some(item => item.optionId === h),
        );

        if (filteredHighlights.length === 0) return "";

        const firstSelected = highlightOptions.find(
          item => item.optionId === filteredHighlights[0],
        );

        return (
          firstSelected?.label + (filteredHighlights.length > 1 ? "···" : "")
        );
      }

      case "furniture": {
        const furniture = answer as number[] | undefined;
        if (!furniture || furniture.length === 0) return "";

        const furnitureOptions = CATEGORY_OPTIONS[2]?.items;

        if (
          !furnitureOptions ||
          typeof furnitureOptions !== "object" ||
          Array.isArray(furnitureOptions)
        ) {
          return "";
        }

        const categories = Object.entries(furnitureOptions)
          .filter(([, items]) =>
            items.some(item => furniture.includes(item.optionId)),
          )
          .map(([category]) => category);

        return categories.join(", ");
      }

      case "propertyType": {
        if (typeof answer !== "string") return "";

        if (listingType === "RENT") {
          return RENT_TYPE_MAP[answer as keyof typeof RENT_TYPE_MAP] ?? "";
        } else if (listingType === "SHARE") {
          return SHARE_TYPE_MAP[answer as keyof typeof SHARE_TYPE_MAP] ?? "";
        }

        return "";
      }

      case "capacityPeople": {
        if (typeof answer !== "string") return "";

        if (listingType === "RENT") {
          return (
            CAPACITY_RENT_MAP[answer as keyof typeof CAPACITY_RENT_MAP] ?? ""
          );
        } else if (listingType === "SHARE") {
          return (
            CAPACITY_SHARE_MAP[answer as keyof typeof CAPACITY_SHARE_MAP] ?? ""
          );
        }

        return "";
      }
      default: {
        if (typeof answer === "string") {
          return answer;
        }
        return "";
      }
    }
  };

  const allAnswered = questions.every(q => {
    const answer = selectedAnswers[q.id as ListingDetailsOption["type"]];

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    if (answer && typeof answer === "object") {
      return Object.keys(answer).length > 0;
    }
    return Boolean(answer);
  });

  const handleSelect = <T extends ListingDetailsOption["type"]>(
    id: T,
    value: Extract<ListingDetailsOption, { type: T }>["value"],
  ) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="pb-[70px]">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {QUESTION_MAP[listingType].ListingDetails.map((item, index) => {
        const answer = selectedAnswers[item.id as ListingDetailsOption["type"]];

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
              value={
                answer as Extract<
                  ListingDetailsOption,
                  { type: typeof item.id }
                >["value"]
              }
              onSelect={val =>
                handleSelect(item.id as ListingDetailsOption["type"], val)
              }
            />
          </DropdownSelector>
        );
      })}

      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              // 저장 로직 필요시 추가
              console.log("저장된 옵션들:", selectedAnswers);
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
    </div>
  );
};

export default ListingDetails;
