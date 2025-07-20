import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { QUESTION_MAP } from "@/constants/question-map";

import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";
import ListingDetailDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}
const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const { listingType } = useListingStore();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const handleSelectAnswer = (questionId: string, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
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
        <>
          <DropdownSelector
            key={question.id}
            label={question.label}
            answer={selectedAnswers[question.id]}
          >
            <div>
              <ListingDetailDropdownContent
                id={question.id}
                onSelect={(value: string) =>
                  handleSelectAnswer(question.id, value)
                }
              />
            </div>
          </DropdownSelector>
        </>
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
