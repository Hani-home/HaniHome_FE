"use client";

import { useEffect, useState } from "react";

import { AgreementTerm } from "@/constants/AgreementTerm";

import DownArrow from "@/public/svgs/signup/down-arrow.svg";

import AgreementItem from "./AgreementItem";
import CheckIcon from "./CheckIcon";

interface AgreementListProps {
  onChange: (checked: number[]) => void;
  onRequiredValidChange?: (valid: boolean) => void;
}

const AgreementList = ({
  onChange,
  onRequiredValidChange,
}: AgreementListProps) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isRequiredOpen, setIsRequiredOpen] = useState(true);
  const [isOptionalOpen, setIsOptionalOpen] = useState(true);

  const requiredIds = AgreementTerm.filter(t => t.required).map(t => t.id);
  const optionalIds = AgreementTerm.filter(t => !t.required).map(t => t.id);

  const isChecked = (id: number) => checkedItems.includes(id);
  const isAllChecked = AgreementTerm.length === checkedItems.length;
  const isAllRequiredChecked = requiredIds.every(id =>
    checkedItems.includes(id),
  );
  const isAllOptionalChecked = optionalIds.every(id =>
    checkedItems.includes(id),
  );

  const update = (items: number[]) => {
    const uniqueItems = [...new Set(items)];
    setCheckedItems(uniqueItems);
    onChange(uniqueItems);
  };

  const toggleCheck = (id: number) => {
    update(
      isChecked(id)
        ? checkedItems.filter(i => i !== id)
        : [...checkedItems, id],
    );
  };

  const toggleAll = () => {
    update(isAllChecked ? [] : AgreementTerm.map(term => term.id));
  };

  const toggleRequired = () => {
    update(
      isAllRequiredChecked
        ? checkedItems.filter(id => !requiredIds.includes(id))
        : [...checkedItems, ...requiredIds],
    );
  };

  const toggleOptional = () => {
    update(
      isAllOptionalChecked
        ? checkedItems.filter(id => !optionalIds.includes(id))
        : [...checkedItems, ...optionalIds],
    );
  };

  useEffect(() => {
    if (onRequiredValidChange) {
      onRequiredValidChange(isAllRequiredChecked);
    }
  }, [checkedItems, isAllRequiredChecked, onRequiredValidChange]);

  return (
    <div className="flex flex-col py-6">
      {/* 전체 동의 */}
      <button
        onClick={toggleAll}
        className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
      >
        <CheckIcon checked={isAllChecked} />
        전체 동의합니다
      </button>

      <hr className="my-3 border-t border-gray-200" />

      {/* 필수 동의란 */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggleRequired}
          className="text-cap1-med flex items-center gap-1 text-gray-700"
        >
          <CheckIcon checked={isAllRequiredChecked} />
          필수 동의란
        </button>
        <button
          onClick={() => setIsRequiredOpen(prev => !prev)}
          className={isRequiredOpen ? "rotate-180" : ""}
        >
          <DownArrow className="h-[18px] w-[18px] object-contain" />
        </button>
      </div>

      {isRequiredOpen && (
        <div className="mt-3 flex flex-col gap-1">
          {AgreementTerm.filter(t => t.required).map(term => (
            <AgreementItem
              key={term.id}
              id={term.id}
              label={term.label}
              checked={isChecked(term.id)}
              onClick={() => toggleCheck(term.id)}
            />
          ))}
        </div>
      )}

      {/* 선택 동의란 */}
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={toggleOptional}
          className="text-cap1-med flex items-center gap-1 text-gray-700"
        >
          <CheckIcon checked={isAllOptionalChecked} />
          선택 동의란
        </button>
        <button
          onClick={() => setIsOptionalOpen(prev => !prev)}
          className={isOptionalOpen ? "rotate-180" : ""}
        >
          <DownArrow className="h-[18px] w-[18px] object-contain" />
        </button>
      </div>

      {isOptionalOpen && (
        <div className="mt-3 flex flex-col gap-2">
          {AgreementTerm.filter(t => !t.required).map(term => (
            <AgreementItem
              key={term.id}
              id={term.id}
              label={term.label}
              checked={isChecked(term.id)}
              onClick={() => toggleCheck(term.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgreementList;
