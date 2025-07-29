"use client";

import { useEffect, useState } from "react";

import { formatMeetingDay } from "@/utils/dateFormatter";
import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { GENDER_PREFERENCE_MAP } from "@/constants/gender-options";
import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";
import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { MovingConditionsOption } from "@/types/createPropertyAnswer";

import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";
import MovingConditionDropdownContent from "./MovingConditionDropdownContent";

interface MovingConditionProps {
  onNext: () => void;
  onPrev: () => void;
}

const MovingCondition = ({ onNext }: MovingConditionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, MovingConditionsOption>
  >({});

  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
    totalCount: COMMON_MOVING_CONDITIONS.length,
    shouldAutoClose: index =>
      !!selectedAnswers[COMMON_MOVING_CONDITIONS[index].id],
  });

  useEffect(() => {
    openIndices.forEach(idx => {
      if (autoAdvance && idx !== -1) {
        const id = COMMON_MOVING_CONDITIONS[idx].id;
        const answer = selectedAnswers[id];
        if (answer) autoAdvance(idx);
      }
    });
  }, [selectedAnswers, openIndices, autoAdvance]);

  const handleSelect = (id: string, value: MovingConditionsOption) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: value }));
  };

  const allAnswered = COMMON_MOVING_CONDITIONS.every(
    item => !!selectedAnswers[item.id],
  );

  const AVAILABLE_KEY_LABEL_MAP: Record<string, string> = {
    흡연자: "흡연자",
    반려동물: "반려동물",
    "외부인 방문": "외부인",
    주차: "주차",
    "주방 사용": "주방",
  };

  const getAnswerText = (itemId: string): string => {
    const answer = selectedAnswers[itemId];
    if (!answer) return "";
    if (itemId === "genderPreference" && typeof answer.value === "string") {
      return GENDER_PREFERENCE_MAP[answer.value] || "";
    }

    if (itemId === "availableOptions" && typeof answer.value === "object") {
      const selectedIds = answer.value as number[];
      const additionalInfoItems = CATEGORY_OPTIONS[3].items;

      const selectedCategories = Object.entries(additionalInfoItems)
        .filter(([, options]) =>
          options.some(option => selectedIds.includes(option.optionId)),
        )
        .map(([category]) => AVAILABLE_KEY_LABEL_MAP[category] ?? category);

      return selectedCategories.join(", ");
    }

    if (itemId === "livingConditions" && typeof answer.value === "object") {
      const { noticePeriodWeeks, minimumStayWeeks, contractTerms } =
        answer.value as {
          noticePeriodWeeks: number;
          minimumStayWeeks: number;
          contractTerms: string;
        };

      const parts: string[] = [];
      if (noticePeriodWeeks) parts.push(`노티스 ${noticePeriodWeeks}주`);
      if (minimumStayWeeks) parts.push(`최소 ${minimumStayWeeks}주`);
      if (contractTerms) parts.push("계약 형태");
      return parts.join(", ");
    }

    if (itemId === "moveInInfo" && typeof answer.value === "object") {
      const { availableFrom, availableTo, isImmediate, isNegotiable } =
        answer.value as {
          availableFrom?: string | null;
          availableTo?: string | null;
          isImmediate?: boolean;
          isNegotiable?: boolean;
        };

      const parts: string[] = [];

      const from = availableFrom ? formatMeetingDay(availableFrom).date : null;
      const to = availableTo ? formatMeetingDay(availableTo).date : null;

      if (from && to) parts.push(`${from} ~ ${to}`);
      else parts.push("날짜 미정");

      if (isImmediate) parts.push("즉시 입주");
      if (isNegotiable) parts.push("협의 가능");

      return parts.join(", ");
    }

    if (typeof answer.value === "string") return answer.value.trim();
    if (Array.isArray(answer.value))
      return answer.value.filter(Boolean).join(", ");

    return "";
  };

  return (
    <div className="pb-[70px]">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {COMMON_MOVING_CONDITIONS.map((item, index) => (
        <DropdownSelector
          key={item.id}
          label={item.label}
          answer={getAnswerText(item.id)}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleIndex(index)}
        >
          <MovingConditionDropdownContent
            id={item.id}
            value={selectedAnswers[item.id]}
            onSelect={value => handleSelect(item.id, value)}
          />
        </DropdownSelector>
      ))}
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              //Todo: 저장 로직 추가
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
    </div>
  );
};
export default MovingCondition;
