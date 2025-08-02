"use client";

import { useListingStore } from "@/stores/useListingStore";

import { formatMeetingDay } from "@/utils/dateFormatter";
import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/common/DropdownSelector";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import { GENDER_PREFERENCE_MAP } from "@/constants/gender-options";
import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { MovingConditionsOption } from "@/types/createPropertyAnswer";

import MovingConditionDropdownContent from "./MovingConditionDropdownContent";

interface MovingConditionProps {
  onNext: () => void;
  onPrev: () => void;
}

const MovingCondition = ({ onNext }: MovingConditionProps) => {
  const {
    genderPreference,
    moveInInfo,
    livingConditions,
    optionItemIds,
    setGenderPreference,
    setMoveInInfo,
    setLivingConditions,
    setOptionItemIds,
  } = useListingStore();

  const { openIndices, toggleIndex } = useDropdownAutoManager({
    totalCount: COMMON_MOVING_CONDITIONS.length,
    shouldAutoClose: index => {
      const id = COMMON_MOVING_CONDITIONS[index].id;
      switch (id) {
        case "genderPreference":
          return !!genderPreference;
        case "availableOptions":
          return optionItemIds.length > 0;
        case "moveInInfo":
          return (
            !!moveInInfo.availableFrom ||
            !!moveInInfo.isImmediate ||
            !!moveInInfo.isNegotiable
          );
        case "livingConditions":
          return (
            !!livingConditions &&
            (!!livingConditions.noticePeriodWeeks ||
              !!livingConditions.minimumStayWeeks)
          );
        default:
          return false;
      }
    },
  });

  const handleSelect = (id: string, option: MovingConditionsOption) => {
    switch (option.type) {
      case "genderPreference":
        setGenderPreference(option.value);
        break;
      case "optionItemIds":
        setOptionItemIds(option.value);
        break;
      case "moveInInfo":
        setMoveInInfo(option.value);
        break;
      case "livingConditions":
        setLivingConditions(option.value);
        break;
    }
  };

  const allAnswered = COMMON_MOVING_CONDITIONS.every(item => {
    switch (item.id) {
      case "genderPreference":
        return !!genderPreference;
      case "availableOptions":
        return optionItemIds.length > 0;
      case "moveInInfo":
        return (
          !!moveInInfo.availableFrom ||
          !!moveInInfo.isImmediate ||
          !!moveInInfo.isNegotiable
        );
      case "livingConditions":
        return (
          !!livingConditions &&
          (!!livingConditions.noticePeriodWeeks ||
            !!livingConditions.minimumStayWeeks)
        );
      default:
        return false;
    }
  });

  const AVAILABLE_KEY_LABEL_MAP: Record<string, string> = {
    흡연자: "흡연자",
    반려동물: "반려동물",
    "외부인 방문": "외부인",
    주차: "주차",
    "주방 사용": "주방",
  };

  const getAnswerText = (itemId: string): string => {
    if (itemId === "genderPreference") {
      return genderPreference ? GENDER_PREFERENCE_MAP[genderPreference] : "";
    }

    if (itemId === "availableOptions") {
      const selectedIds = optionItemIds;
      const additionalInfoItems = CATEGORY_OPTIONS[3].items;

      const selectedCategories = Object.entries(additionalInfoItems)
        .filter(([, options]) =>
          options.some(option => selectedIds.includes(option.optionId)),
        )
        .map(([category]) => AVAILABLE_KEY_LABEL_MAP[category] ?? category);

      return selectedCategories.join(", ");
    }

    if (itemId === "livingConditions" && livingConditions) {
      const { noticePeriodWeeks, minimumStayWeeks, contractTerms } =
        livingConditions;

      const parts: string[] = [];
      if (noticePeriodWeeks) parts.push(`노티스 ${noticePeriodWeeks}주`);
      if (minimumStayWeeks) parts.push(`최소 ${minimumStayWeeks}주`);
      if (contractTerms) parts.push("계약 형태");
      return parts.join(", ");
    }

    if (itemId === "moveInInfo" && moveInInfo) {
      const { availableFrom, availableTo, isImmediate, isNegotiable } =
        moveInInfo;

      const parts: string[] = [];

      const from = availableFrom ? formatMeetingDay(availableFrom).date : null;
      const to = availableTo ? formatMeetingDay(availableTo).date : null;

      if (from && to) parts.push(`${from} ~ ${to}`);
      else parts.push("날짜 미정");

      if (isImmediate) parts.push("즉시 입주");
      if (isNegotiable) parts.push("협의 가능");

      return parts.join(", ");
    }

    return "";
  };

  const getValueById = (id: string): MovingConditionsOption | undefined => {
    switch (id) {
      case "genderPreference":
        return genderPreference !== null
          ? { type: "genderPreference", value: genderPreference }
          : undefined;

      case "availableOptions":
        return {
          type: "optionItemIds",
          value: optionItemIds,
        };

      case "moveInInfo":
        return moveInInfo !== null
          ? { type: "moveInInfo", value: moveInInfo }
          : undefined;

      case "livingConditions":
        return livingConditions !== null
          ? { type: "livingConditions", value: livingConditions }
          : undefined;

      default:
        return undefined;
    }
  };

  return (
    <FunnelLayout>
      {COMMON_MOVING_CONDITIONS.map((item, index) => {
        const value = getValueById(item.id);
        if (value === undefined) return null;

        return (
          <DropdownSelector
            key={item.id}
            label={item.label}
            answer={getAnswerText(item.id)}
            isOpen={openIndices.includes(index)}
            onClick={() => toggleIndex(index)}
          >
            <MovingConditionDropdownContent
              id={item.id}
              value={value}
              onSelect={value => handleSelect(item.id, value)}
            />
          </DropdownSelector>
        );
      })}

      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              console.log("저장");
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

export default MovingCondition;
