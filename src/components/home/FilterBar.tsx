"use client";

import { useState } from "react";

import EditIcon from "@/public/svgs/home/filter-icon.svg";

import FilterChip from "./FilterChip";

const filters = [
  "매물종류",
  "매물유형",
  "예산범위",
  "입주 가능일",
  "지하철 역",
];

const FilterBar = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (filter: string) => {
    setSelected(prev => (prev === filter ? null : filter));
  };

  return (
    <div className="mb-3 flex w-full items-center gap-3 py-2">
      <div className="scrollbar-hide flex max-w-[329px] gap-1 overflow-x-auto pl-4">
        {filters.map(filter => (
          <FilterChip
            key={filter}
            text={filter}
            isSelected={selected === filter}
            onClick={() => handleSelect(filter)}
          />
        ))}
      </div>
      <EditIcon className="cursor-pointer" />
    </div>
  );
};

export default FilterBar;
