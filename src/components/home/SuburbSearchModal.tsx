"use client";

import { useRef, useState } from "react";

import { useOutsideClick } from "@/hooks/common/useOutsideClick";
import { useScrollLock } from "@/hooks/common/useScrollLock";

import SearchField from "@/components/common/SearchField";

import CloseIcon from "@/public/svgs/common/close-icon.svg";

interface SuburbSearchModalProps {
  onClose: () => void;
  onSelectRegion?: (region: string) => void;
}

const SuburbSearchModal = ({
  onClose,
  onSelectRegion,
}: SuburbSearchModalProps) => {
  const [region, setRegion] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    const trimmed = region.trim();
    if (confirmed && trimmed && onSelectRegion) {
      onSelectRegion(trimmed);
    }
    onClose();
  };

  const handleSearch = () => {
    if (onSelectRegion) {
      const trimmed = region.trim();
      if (trimmed) onSelectRegion(trimmed);
    }
    onClose();
  };

  useOutsideClick(modalRef, handleClose);
  useScrollLock();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="relative w-[343px] rounded-md bg-white px-4 py-6"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-heading2 text-gray-900">Suburb 검색</h2>
          <button
            className="absolute top-6 right-4 cursor-pointer"
            onClick={handleClose}
            aria-label="닫기"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <SearchField
          value={region}
          onChange={setRegion}
          isSelected={!!region}
          onSearchClick={handleSearch}
          onConfirm={setConfirmed}
        />
      </div>
    </div>
  );
};

export default SuburbSearchModal;
