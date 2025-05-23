"use client";

import { useState } from "react";

import clsx from "clsx";

import DropdownArrow from "@/public/svgs/signup/dropdown-arrow.svg";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

const DropdownField = ({
  label,
  value: selectedValue,
  placeholder = "선택해주세요",
  options,
  onChange,
}: DropdownFieldProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(optionValue);
    setIsDropdownOpen(false);
  };

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label ?? placeholder;

  return (
    <div className="flex flex-col gap-3 py-3">
      <label className="text-body1-sb text-gray-900">{label}</label>

      <div
        className={clsx(
          "relative box-border w-full rounded-sm border px-4",
          isDropdownOpen ? "py-[11px]" : "py-[9px]",
          isDropdownOpen || selectedValue
            ? "border-gray-900"
            : "border-gray-600",
        )}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <div className="flex cursor-pointer items-center justify-between">
          <span
            className={clsx(
              "text-body1-med",
              !selectedValue &&
                (isDropdownOpen ? "text-gray-900" : "text-gray-500"),
            )}
          >
            {selectedLabel}
          </span>
          <DropdownArrow className={clsx(isDropdownOpen && "rotate-180")} />
        </div>

        {isDropdownOpen && (
          <ul className="mt-4 flex flex-col gap-4">
            {options.map(opt => (
              <li
                key={opt.value}
                onClick={e => handleSelect(e, opt.value)}
                className="text-body1-med cursor-pointer"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownField;
