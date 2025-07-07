import { useState } from "react";

import DownArrow from "@/public/svgs/signup/down-arrow.svg";

const DropDownMenu = () => {
  const TABS = [
    { label: "거래 중", key: "active" },
    { label: "거래 완료", key: "completed" },
  ];

  const [selectedKey, setSelectedKey] = useState("active");
  const [isOpen, setIsOpen] = useState(false);

  const selectedTab = TABS.find(tab => tab.key === selectedKey);
  const unselectedTabs = TABS.filter(tab => tab.key !== selectedKey);

  const handleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    setIsOpen(false);
  };

  return (
    <div className="text-body1-med relative w-[109px]">
      <div className="rounded-[4px] border border-gray-600 bg-white text-gray-800">
        <div
          onClick={handleDropdown}
          className="flex h-[36px] cursor-pointer items-center justify-between px-3"
        >
          <span>{selectedTab?.label}</span>
          <DownArrow
            className={`h-[18px] w-[18px] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {/* 열림 상태 */}
        {isOpen && (
          <div className="absolute top-0 left-0 z-10 w-full rounded-[4px] border border-gray-600 bg-white">
            <div
              className="flex cursor-pointer items-center justify-between px-3 py-[6px] text-gray-800"
              onClick={handleDropdown}
            >
              {selectedTab?.label}
              <DownArrow className="h-[18px] w-[18px] rotate-180 transition-transform duration-200" />
            </div>

            {unselectedTabs.map(tab => (
              <div
                key={tab.key}
                onClick={() => handleSelect(tab.key)}
                className="hover:text-mint cursor-pointer px-3 py-[6px] text-gray-800"
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default DropDownMenu;
