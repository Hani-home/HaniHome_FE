import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";
import { MoveInInfo } from "@/types/listingDetail";


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
      isImmediate: !value.isImmediate,
    });

  const toggleNegotiable = () =>
    onSelect({
      ...value,
      isNegotiable: !value.isNegotiable,
    });

  return (
    <AvailableDatePicker
      availableFrom={value.availableFrom}
      availableTo={value.availableTo}
      immediate={value.isImmediate}
      negotiable={value.isNegotiable}
      onDateChange={handleDateChange}
      onImmediateToggle={toggleImmediate}
      onNegotiableToggle={toggleNegotiable}
    />
  );
};
export default MoveInfoContent;
