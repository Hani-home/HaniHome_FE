"use client";

import CheckIcon from "./CheckIcon";

interface AgreementItemProps {
  id: number;
  label: string;
  checked: boolean;
  onClick: () => void;
}

const AgreementItem = ({ id, label, checked, onClick }: AgreementItemProps) => {
  return (
    <button
      key={id}
      onClick={onClick}
      className="text-cap1-med flex cursor-pointer items-center gap-1 text-left"
    >
      <CheckIcon checked={checked} />
      <span
        className={label.includes("[필수]") ? "text-gray-700" : "text-gray-500"}
      >
        {label}
      </span>
    </button>
  );
};

export default AgreementItem;
