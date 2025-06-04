interface BottomActionBarProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;

  // 버튼 2개 이상인 경우
  buttons?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }[];

  showDivider?: boolean;
}

const BottomActionBar = ({
  label,
  onClick,
  disabled = false,
  buttons,
  showDivider = true,
}: BottomActionBarProps) => {
  const isSingle = !buttons || buttons.length === 0;

  // 단일 버튼 케이스
  if (isSingle) {
    return (
      <div className="fixed bottom-0 left-1/2 z-20 flex w-[375px] -translate-x-1/2 flex-col items-center bg-white">
        {showDivider && (
          <div className="h-[1px] w-full self-center bg-gray-300" />
        )}
        <button
          type="button"
          onClick={onClick}
          className={`text-heading3 my-2 w-[343px] rounded py-3 text-white transition ${
            disabled
              ? "cursor-not-allowed bg-gray-300"
              : "bg-mint cursor-pointer"
          }`}
        >
          {label}
        </button>
      </div>
    );
  }

  // 버튼 두 개 이상 케이스
  return (
    <div className="fixed bottom-0 left-1/2 z-20 flex w-[375px] -translate-x-1/2 flex-col items-center bg-white">
      {showDivider && (
        <div className="h-[1px] w-full self-center bg-gray-300" />
      )}
      <div className="my-2 flex w-[343px] gap-1">
        {buttons.map((btn, idx) => {
          const isLeft = idx === 0;
          const isDisabled = !!btn.disabled;

          const baseClass = "text-heading3 rounded border p-3 transition";

          const leftClass = "w-[83px] border-mint text-mint bg-white";
          const rightClass = isDisabled
            ? "flex-1 bg-gray-300 text-white cursor-not-allowed"
            : "flex-1 bg-mint text-white cursor-pointer";

          return (
            <button
              key={idx}
              type="button"
              onClick={btn.onClick}
              disabled={isDisabled}
              className={`${baseClass} ${isLeft ? leftClass : rightClass}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomActionBar;
