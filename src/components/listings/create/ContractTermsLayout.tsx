import { useListingStore } from "@/stores/useListingStore";

import { formatMeetingDay } from "@/utils/dateFormatter";
import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { COMMON_CONTRACT_TERMS } from "@/constants/question-map";

import ContractTermsContent from "./ContractTermsContent";
import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";

interface ContractTermsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ContractTerms = ({ onNext }: ContractTermsProps) => {
  const costDetails = useListingStore(state => state.costDetails);
  const timeSlots = useListingStore(state => state.timeSlots);
  const meetingDateFrom = useListingStore(state => state.meetingDateFrom);
  const meetingDateTo = useListingStore(state => state.meetingDateTo);

  const { openIndices, toggleIndex } = useDropdownAutoManager({
    totalCount: COMMON_CONTRACT_TERMS.length,
    shouldAutoClose: () => false,
  });

  const getAnswerText = (itemId: string): string | undefined => {
    switch (itemId) {
      case "costDetails": {
        const { weeklyCost, deposit, keyDeposit, billIncluded } = costDetails;
        const parts = [];

        if (weeklyCost && weeklyCost > 0) {
          if (billIncluded) {
            parts.push(`빌 포함 주 ${weeklyCost}$`);
          } else {
            parts.push(`주 ${weeklyCost}$`);
          }
        }
        if (deposit && deposit > 0) parts.push(`디파짓 ${deposit}$`);
        if (keyDeposit && keyDeposit > 0)
          parts.push(`키 디파짓 ${keyDeposit}$`);

        return parts.join(", ");
      }

      case "meetingTime": {
        const formattedFrom = meetingDateFrom
          ? formatMeetingDay(meetingDateFrom).date
          : "";
        const formattedTo = meetingDateTo
          ? formatMeetingDay(meetingDateTo).date
          : "";
        if (!formattedFrom && !formattedTo) return "기한 상관없음";
        return `${formattedFrom ?? ""} ~ ${formattedTo ?? ""}`;
      }

      case "timeSlots": {
        const parts = [];
        for (const slot of timeSlots) {
          if (slot.timeFrom === "00:00" && slot.timeTo === "00:00") continue;

          const hour = parseInt(slot.timeFrom.split(":")[0]);
          if (hour < 12) parts.push("아침");
          else if (hour < 18) parts.push("점심");
          else parts.push("저녁");
        }

        return [...new Set(parts)].join(", ");
      }

      default:
        return "";
    }
  };

  return (
    <div className="pb-70">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {COMMON_CONTRACT_TERMS.map((item, index) => (
        <DropdownSelector
          key={item.id}
          label={item.label}
          answer={getAnswerText(item.id)}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleIndex(index)}
        >
          {item.options && <ContractTermsContent option={item.options} />}
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
export default ContractTerms;
