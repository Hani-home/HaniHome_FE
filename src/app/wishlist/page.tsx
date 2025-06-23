"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import TitleHeader from "@/components/layout/header/TitleHeader";
import RoomList from "@/components/wishlist/roomList";

import { ListingDummies } from "@/constants/listing-card-dummies";

const Wishlist = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [setIsOpen] = useState(false);

  const handleRoomClick = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const handleOverview = () => {
    if (selectedId !== null) {
      router.push(`/listing/${selectedId}`);
    }
  };

  const handleReservation = () => {
    if (selectedId !== null) {
      router.push(`/viewing/reservation/${selectedId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden overflow-y-auto">
      <TitleHeader
        title="즐겨찾기"
        rightIcon="list"
        onRightClick={() => setIsOpen(prev => !prev)}
      />

      <div>
        <div className="text-body2-med flex h-[19px] items-center gap-[4px] px-4 py-3 text-gray-800">
          <div>즐겨찾기 매물</div>
          <div>{ListingDummies.length}개</div>
        </div>

        {ListingDummies.map(item => (
          <div
            key={item.id}
            onClick={() => handleRoomClick(item.id)}
            className={`cursor-pointer transition ${
              selectedId === item.id ? "bg-mint-light" : ""
            }`}
          >
            <RoomList {...item} />
          </div>
        ))}
      </div>

      {selectedId !== null && (
        <div className="duration-300">
          <BottomActionBar
            buttons={[
              {
                label: "상세페이지 이동",
                onClick: handleOverview,
                variant: "outline",
              },
              {
                label: "뷰잉 예약",
                onClick: handleReservation,
                variant: "filled",
              },
            ]}
            layout="equal"
          />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
