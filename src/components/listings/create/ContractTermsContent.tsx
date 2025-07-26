import { ContractTermsOption } from "@/types/createPropertyAnswer";

import CostDetailField from "./CostDetailField";
import MeetingTimeField from "./MeetingTimeField";
import TimeSlotField from "./TimeSlotField";

interface ContractTermsContentProps {
  option: ContractTermsOption;
}

const ContractTermsContent = ({
  option,
}: ContractTermsContentProps) => {
  if (option.type === "costDetails") {
    return <CostDetailField  />;
  } else if (option.type === "meetingTime") {
    return <MeetingTimeField />;
  } else if (option.type === "timeSlots") {
    return <TimeSlotField />;
  }

  return null;
};

export default ContractTermsContent;
