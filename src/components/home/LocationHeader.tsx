"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import { useSignupStore } from "@/stores/useSignupStore";

import { extractSuburb } from "@/utils/extractSuburb";

import LoginAlertModal from "@/components/common/LoginAlertModal";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import SuburbSearchModal from "./SuburbSearchModal";

export interface LocationHeaderProps {
  interestRegions: string;
  isLoading?: boolean;
}

const LocationHeader = ({
  interestRegions,
  isLoading,
}: LocationHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const { setField } = useSignupStore();

  const suburb = extractSuburb(interestRegions);
  const displayedSuburb = suburb ?? (isLoading ? "" : "Chatswood");

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="mb-1 flex w-full cursor-pointer items-center justify-between px-4 py-2"
        onClick={handleOpenModal}
      >
        <p className="text-heading2 text-gray-900">{displayedSuburb}</p>
        <Arrow className="h-6 w-6 rotate-180 text-gray-600" />
      </div>
      {isModalOpen && (
        <SuburbSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelectRegion={interestRegion =>
            setField("interestRegion", interestRegion)
          }
        />
      )}
      <LoginAlertModal />
    </>
  );
};

export default LocationHeader;
