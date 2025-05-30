interface BottomActionBarProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  inactive?: boolean;
  showDivider?: boolean;
}

const BottomActionBar = ({
  label,
  onClick,
  disabled = false,
  showDivider = true,
}: BottomActionBarProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 z-20 flex w-[343px] -translate-x-1/2 flex-col bg-white">
      {showDivider && <div className="h-[1px] w-full bg-gray-300" />}
      <button
        type="button"
        onClick={onClick}
        className={`text-heading3 my-2 w-full rounded py-3 text-white transition ${
          disabled ? "cursor-not-allowed bg-gray-300" : "bg-mint cursor-pointer"
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default BottomActionBar;
