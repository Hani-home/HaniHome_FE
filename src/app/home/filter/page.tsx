"use client";

import { useState } from "react";

import SelectableChip from "@/components/common/SelectableChip";
import BackHeader from "@/components/layout/header/BackHeader";

import {
  HOUSE_TYPES,
  ROOM_TYPES,
  SHARE_ONLY_ROOM_TYPES,
} from "@/constants/filter";

const Filter = () => {
  const [selectedType, setSelectedType] = useState<"쉐어" | "렌트">();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const isDisabled = (type: string) => {
    if (selectedType === "쉐어") return !SHARE_ONLY_ROOM_TYPES.includes(type);
    if (selectedType === "렌트") return SHARE_ONLY_ROOM_TYPES.includes(type);
    return false;
  };

  const selectType = (type: "쉐어" | "렌트") => {
    setSelectedType(type);
    setSelectedRoomTypes([]);
  };

  const toggleRoomType = (type: string) => {
    if (!selectedType) {
      const inferred = SHARE_ONLY_ROOM_TYPES.includes(type) ? "쉐어" : "렌트";
      setSelectedType(inferred);
      setSelectedRoomTypes([type]);
      return;
    }

    if (isDisabled(type)) return;

    setSelectedRoomTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  return (
    <div className="scrollbar-hide flex h-screen flex-col overflow-y-auto">
      <BackHeader />

      {/* 매물 종류 */}
      <div className="flex items-center py-4">
        <span className="text-heading3 px-4 py-1 text-gray-900">매물종류</span>
        <div className="flex flex-1 justify-end gap-3 px-4 py-1">
          {HOUSE_TYPES.map(type => (
            <SelectableChip
              key={type}
              label={type}
              selected={selectedType === type}
              onClick={() => selectType(type as "쉐어" | "렌트")}
            />
          ))}
        </div>
      </div>

      <hr className="my-3 border-t border-gray-200" />

      {/* 매물 유형 */}
      <div className="flex items-center gap-3 py-4">
        <span className="text-heading3 px-4 py-2 text-gray-900">매물유형</span>
        <div className="flex w-fit max-w-[269px] flex-wrap items-center justify-center gap-2 px-4 py-2">
          {ROOM_TYPES.map(type => (
            <SelectableChip
              key={type}
              label={type}
              selected={selectedRoomTypes.includes(type)}
              disabled={isDisabled(type)}
              onClick={() => toggleRoomType(type)}
            />
          ))}
        </div>
      </div>
      <hr className="my-3 border-t border-gray-200" />

      {/* 예산 범위 */}
      <div className="flex flex-col items-center py-4">
        <div className="flex w-full px-4 py-3">
          <span className="text-heading3 py-2 text-gray-900">예산 범위</span>
          <div className="text-heading3 flex flex-1 items-center justify-end gap-2">
            <span className="text-gray-500">주/$</span>
            <span className="text-mint">100</span>
            <span className="text-mint">–</span>
            <span className="text-mint">150</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
