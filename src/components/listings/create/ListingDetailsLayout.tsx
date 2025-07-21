import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { QUESTION_MAP } from "@/constants/question-map";

import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";
import HighLightsContent from "./HighLightsContent";
import InternalDetailsContent from "./InternalDetailsContent";
import ListingDetailDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

interface SelectedAnswers {
  [key: string]: string | Record<string, string> | string[];
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const { listingType } = useListingStore();
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  const handleSelectAnswer = (
    questionId: string,
    value: string | Record<string, string> | string[],
  ) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const formatInternalDetailsAnswerNoValue = (
    internalDetails?: Record<string, string>,
  ) => {
    if (!internalDetails) return "";

    const areaLabels = ["Internal Area", "Total Area (선택)"];
    const areaTexts = areaLabels
      .filter(key => internalDetails[key])
      .map(() => "면적");

    const resident = internalDetails["총 거주인"] ? "거주인" : "";
    const shareBathroom = internalDetails["욕실 쉐어자 수"] ? "욕실 쉐어" : "";

    const rooms = internalDetails["방 개수"] ? "방 개수" : "";
    const bathrooms = internalDetails["욕실 개수"] ? "욕실 개수" : "";

    const floorLabels = ["건물 전체 층 (선택)", "해당 층 (선택)"];
    const floorTexts = floorLabels
      .filter(key => internalDetails[key])
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
  };

  const getAnswerText = (questionId: string): string => {
    if (questionId === "internalDetails") {
      return formatInternalDetailsAnswerNoValue(
        selectedAnswers.internalDetails as Record<string, string>,
      );
    }

    if (questionId === "highlights") {
      const highlights = selectedAnswers.highlights as string[] | undefined;
      if (!highlights || highlights.length === 0) return "";
      return highlights[0] + (highlights.length > 1 ? "···" : "");
    }

    return (selectedAnswers[questionId] as string) || "";
  };

  const section = "ListingDetails";

  if (!listingType) {
    return <div>매물 타입이 선택되지 않았습니다.</div>;
  }

  const questions = QUESTION_MAP[listingType][section];

  return (
    <div className="pb-[70px]">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {questions.map(question => (
        <div key={question.id}>
          <DropdownSelector
            label={question.label}
            answer={getAnswerText(question.id)}
          >
            {question.id === "internalDetails" ? (
              <InternalDetailsContent
                value={
                  (selectedAnswers.internalDetails as Record<string, string>) ||
                  {}
                }
                onChange={value => handleSelectAnswer("internalDetails", value)}
              />
            ) : question.id === "highlights" ? (
              <HighLightsContent
                value={(selectedAnswers.highlights as string[]) || []}
                onChange={value => handleSelectAnswer("highlights", value)}
              />
            ) : (
              <div className="py-3">
                <ListingDetailDropdownContent
                  id={question.id}
                  value={
                    (selectedAnswers.internalDetails as Record<
                      string,
                      string
                    >) || {}
                  }
                  onSelect={val => handleSelectAnswer(question.id, val)}
                />
              </div>
            )}
          </DropdownSelector>
        </div>
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
export default ListingDetails;
