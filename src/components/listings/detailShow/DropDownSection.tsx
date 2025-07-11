"use client";

import { useState } from "react";

import Divider from "@/components/common/Divider";

import { listingDetailCategories } from "@/constants/listing-detail-categories";

import { ListingValueMap } from "@/types/listingDetail"

import DownArrow from "@/public/svgs/common/down-arrow.svg";

import CategoryContent from "./CategoryContent";

interface DropDownSectionProps {
  listingData: ListingValueMap;
}

const DropDownSection = ({ listingData }: DropDownSectionProps) => {
  const [openCategoryKey, setOpenCategoryKey] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenCategoryKey(prev => (prev === key ? null : key));
  };

  // "쉐어"일 경우 isBrokered 제외
  const filteredCategories =
    listingData.rentalType === "쉐어"
      ? listingDetailCategories.filter(item => item.key !== "isBrokered")
      : listingDetailCategories;

  return (
    <div className="py-3">
      {filteredCategories.map((item, index) => (
        <div key={index} onClick={() => handleToggle(item.key)}>
          <div className="px-4">
            <div className="flex cursor-pointer justify-between px-1 py-2">
              <span className="text-body2-med text-gray-900">{item.label}</span>
              <DownArrow
                className={`h-[18px] w-[18px] text-gray-600 ${openCategoryKey === item.key ? "rotate-180" : ""}`}
              />
            </div>
            {openCategoryKey === item.key && (
              <div className="border-t px-3 py-2 text-gray-100">
                <CategoryContent
                  keyName={item.key}
                  value={listingData[item.key]}
                />
              </div>
            )}
          </div>
          {index !== filteredCategories.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default DropDownSection;
