"use client";

import { useEffect, useState } from "react";

import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import DropdownSelector from "./DropdownSelector";
import MovingConditionDropdownContent from "./MovingConditionDropdownContent";

interface MovingConditionProps {
  onNext: () => void;
  onPrev: () => void;
}

const MovingCondition = ({ onNext }: MovingConditionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | string[] | Record<string, string | string[]>>
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

  const handleSelect = (
    id: string,
    value: string | string[] | Record<string, string | string[]>,
  ) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: value }));
  };

  // const allAnswered = COMMON_MOVING_CONDITIONS.every(
  //   item => !!selectedAnswers[item.id],
  // );

  const AVAILABLE_KEYS_ORDER = [
    "흡연자",
    "반려동물",
    "외부인 방문",
    "주차",
    "주방 사용",
  ];

  const AVAILABLE_KEY_LABEL_MAP: Record<string, string> = {
    흡연자: "흡연자",
    반려동물: "반려동물",
    "외부인 방문": "외부인",
    주차: "주차",
    "주방 사용": "주방",
  };

  const getAnswerText = (itemId: string) => {
    const answer = selectedAnswers[itemId];
    if (!answer) return "";

    if (itemId === "availableOptions") {
      const obj = answer as Record<string, string | string[]>;
      return AVAILABLE_KEYS_ORDER.filter(key => {
        const val = obj?.[key];
        return Array.isArray(val) ? val.length > 0 : !!val?.trim();
      })
        .map(key => AVAILABLE_KEY_LABEL_MAP[key])
        .join(", ");
    }

    if (itemId === "livingConditions") {
      const obj = answer as Record<string, string>;
      if (!obj) return "";

      const parts: string[] = [];

      const notice = obj["노티스"]?.trim();
      const minPeriod = obj["최소 거주 기간"]?.trim();
      const contractDesc = obj["계약 형태 설명"]?.trim();

      if (notice) parts.push(`노티스 ${notice}주`);
      if (minPeriod) parts.push(`최소 거주 기간 ${minPeriod}주`);
      if (contractDesc) parts.push("계약 형태");

      return parts.join(", ");
    }

    if (typeof answer === "string") return answer.trim();
    if (Array.isArray(answer)) return answer.filter(Boolean).join(", ");
    return "";
  };

  return (
    <div className="pb-[70px]">
      <BackHeader rightIcon="close" />
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
          },
        ]}
      />
    </div>
  );
};
export default MovingCondition;
