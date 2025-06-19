"use client";

import { useState } from "react";

import BottomActionBar from "@/components/wishlist/BottomActionBar";
import RoomList from "@/components/wishlist/roomList";

import { ListingDummies } from "@/constants/listing-card-dummies";

import ListingIcon from "@/public/svgs/wishlist/listing-icon.svg";

const Wishlist = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleRoomClick = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden overflow-y-auto pb-39.5">
      <div className="fixed top-0 left-1/2 z-10 flex h-12 w-full max-w-[375px] -translate-x-1/2 items-center justify-between bg-white px-4">
        <div className="text-heading-2 flex-grow text-center font-bold text-gray-900">
          즐겨찾기
        </div>
        <div>
          <ListingIcon className="ml-auto cursor-pointer" />
        </div>
      </div>

      <div className="mt-16">
        <div className="flex h-[19px] items-center pl-4">
          즐겨찾기 매물 {ListingDummies.length}개
        </div>

        {ListingDummies.map(item => (
          <div
            key={item.id}
            onClick={() => handleRoomClick(item.id)}
            className={`cursor-pointer ${selectedId === item.id ? "bg-mint-light" : ""}`}
          >
            <RoomList {...item} />
          </div>
        ))}
      </div>
      {selectedId !== null && (
        <div className="duration-300">
          <BottomActionBar />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
