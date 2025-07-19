import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";

import FunnelStepMenu from "./FunnelStepMenu";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}
const ListingDetails = ({ onNext, }: ListingDetailsProps) => {
  const { listingType } = useListingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const baseClass =
    "w-[343px] h-9 border rounded-[4px] text-lab1-sb flex items-center justify-center cursor-pointer";

  if (!listingType) {
    return <div>매물 타입이 선택되지 않았습니다.</div>;
  }

  const options =
    listingType === "SHARE"
      ? ["마스터 룸", "거실 쉐어", "세컨드 룸"]
      : ["하우스", "아파트", "유닛", "스튜디오", "그래니 플랫"];

  return (
    <div>
      <FunnelStepMenu />
      <div className="flex flex-col gap-[3px] px-4 py-3">
        {options.map(option => (
          <div
            key={option}
            className={`${baseClass} ${
              selectedOption === option
                ? "border-mint bg-mint-light text-mint"
                : "border-gray-600 text-gray-800"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
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
