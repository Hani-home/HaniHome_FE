"use client";

import { useEffect, useMemo, useState } from "react";

import { AgreementTerm } from "@/constants/AgreementTerm";

import AgreementGroup from "./AgreementGroup";
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
  const [openGroup, setOpenGroup] = useState<{
    required: boolean;
    optional: boolean;
  }>({
    required: false,
    optional: false,
  });

  const requiredTerms = useMemo(
    () => AgreementTerm.filter(t => t.required),
    [],
  );
  const optionalTerms = useMemo(
    () => AgreementTerm.filter(t => !t.required),
    [],
  );

  const requiredIds = requiredTerms.map(t => t.id);
  const optionalIds = optionalTerms.map(t => t.id);

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

  const toggleItem = (id: number) => {
    update(
      isChecked(id)
        ? checkedItems.filter(i => i !== id)
        : [...checkedItems, id],
    );
  };

  const toggleGroup = (ids: number[], isAllGroupChecked: boolean) => {
    update(
      isAllGroupChecked
        ? checkedItems.filter(id => !ids.includes(id))
        : [...checkedItems, ...ids],
    );
  };

  useEffect(() => {
    onRequiredValidChange?.(isAllRequiredChecked);
  }, [checkedItems]);

  return (
    <div className="flex flex-col py-6">
      {/* 전체 동의 */}
      <button
        onClick={() =>
          toggleGroup([...requiredIds, ...optionalIds], isAllChecked)
        }
        className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
      >
        <CheckIcon checked={isAllChecked} />
        전체 동의합니다
      </button>

      <hr className="mt-3 border-t border-gray-200" />

      {/* 필수 동의 */}
      <AgreementGroup
        title="필수 동의란"
        terms={requiredTerms}
        isOpen={openGroup.required}
        onToggleOpen={() =>
          setOpenGroup(prev => ({ ...prev, required: !prev.required }))
        }
        isAllChecked={isAllRequiredChecked}
        onToggleGroup={() => toggleGroup(requiredIds, isAllRequiredChecked)}
        isChecked={isChecked}
        onToggleItem={toggleItem}
        gap="gap-1"
      />

      {/* 선택 동의 */}
      <AgreementGroup
        title="선택 동의란"
        terms={optionalTerms}
        isOpen={openGroup.optional}
        onToggleOpen={() =>
          setOpenGroup(prev => ({ ...prev, optional: !prev.optional }))
        }
        isAllChecked={isAllOptionalChecked}
        onToggleGroup={() => toggleGroup(optionalIds, isAllOptionalChecked)}
        isChecked={isChecked}
        onToggleItem={toggleItem}
        gap="gap-2"
      />
    </div>
  );
};

export default AgreementList;
