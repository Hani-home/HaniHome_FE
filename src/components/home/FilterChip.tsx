interface FilterChipProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterChip = ({ text, isSelected, onClick }: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-body2-med shrink-0 cursor-pointer rounded-[100px] border px-[10px] py-1 ${
        isSelected
          ? "bg-mint-light text-mint-contrast border-mint-contrast"
          : "border-gray-300 bg-white text-gray-700"
      }`}
    >
      {text}
    </button>
  );
};

export default FilterChip;
