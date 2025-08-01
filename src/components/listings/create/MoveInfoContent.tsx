import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";

import { MoveInInfo } from "@/types/listingDetailPost";

interface MoveInfoContentProps {
  value: MoveInInfo;
  onSelect: (value: MoveInInfo) => void;
}

const MoveInfoContent = ({ value, onSelect }: MoveInfoContentProps) => {
  const handleDateChange = (from: string, to: string) => {
    onSelect({
      ...value,
      availableFrom: from,
      availableTo: to,
    });
  };

  const toggleImmediate = () =>
    onSelect({
      ...value,
      immediate: !value.immediate,
    });

  const toggleNegotiable = () =>
    onSelect({
      ...value,
      negotiable: !value.negotiable,
    });

  return (
    <AvailableDatePicker
      availableFrom={value.availableFrom}
      availableTo={value.availableTo}
      immediate={value.immediate}
      negotiable={value.negotiable}
      onDateChange={handleDateChange}
      onImmediateToggle={toggleImmediate}
      onNegotiableToggle={toggleNegotiable}
    />
  );
};
export default MoveInfoContent;
