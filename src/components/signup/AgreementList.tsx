"use client";

import { useState } from "react";

import { AgreementTerm } from "@/constants/AgreementTerm";

import AgreementItem from "./AgreementItem";
import CheckIcon from "./CheckIcon";

interface AgreementListProps {
  onChange: (checked: number[]) => void;
}

const AgreementList = ({ onChange }: AgreementListProps) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const update = (items: number[]) => {
    setCheckedItems(items);
    onChange(items);
  };

  const isChecked = (id: number) => checkedItems.includes(id);
  const toggleCheck = (id: number) => {
    update(
      isChecked(id)
        ? checkedItems.filter(i => i !== id)
        : [...checkedItems, id],
    );
  };

  const toggleAll = () => {
    update(
      checkedItems.length === AgreementTerm.length
        ? []
        : AgreementTerm.map(term => term.id),
    );
  };

  return (
    <div className="flex flex-col py-6">
      {/* 전체 동의 */}
      <button
        onClick={toggleAll}
        className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
      >
        <CheckIcon checked={checkedItems.length === AgreementTerm.length} />
        전체 동의합니다
      </button>

      <hr className="my-3 border-t border-gray-200" />

      {/* 개별 항목 */}
      <div className="flex flex-col gap-2">
        {AgreementTerm.map(term => (
          <AgreementItem
            key={term.id}
            id={term.id}
            label={term.label}
            checked={isChecked(term.id)}
            onClick={() => toggleCheck(term.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgreementList;
