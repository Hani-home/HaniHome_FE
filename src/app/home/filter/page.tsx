"use client";

import { useState } from "react";

import BudgetSlider from "@/components/home/filter/BudgetSlider";
import RoomTypeSelector from "@/components/home/filter/RoomTypeSelector";
import TypeSelector from "@/components/home/filter/TypeSelector";
import BackHeader from "@/components/layout/header/BackHeader";

import { SHARE_ONLY_ROOM_TYPES } from "@/constants/filter";

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
    <div className="scrollbar-hide flex h-screen flex-col overflow-x-hidden overflow-y-auto">
      <BackHeader />

      {/* 매물 종류 */}
      <TypeSelector selectedType={selectedType} onSelect={selectType} />
      <hr className="my-3 border-t border-gray-200" />

      {/* 매물 유형 */}
      <RoomTypeSelector
        selectedRoomTypes={selectedRoomTypes}
        toggleRoomType={toggleRoomType}
        isDisabled={isDisabled}
      />
      <hr className="my-3 border-t border-gray-200" />

      {/* 예산 범위 */}
      <BudgetSlider />
    </div>
  );
};

export default Filter;
