"use client";

import BackHeader from "@/components/layout/header/BackHeader";
import RoomList from "@/components/wishlist/roomList";

import { myPurchases } from "@/constants/mock/my-purchases";

const Purchases = () => {
  return (
    <div>
      <BackHeader />
      {myPurchases.map(item => (
        <RoomList
          key={item.id}
          {...item}
          isLiked={false}
          onToggleLike={() => {}}
          onClick={() => {}}
          heartColor="text-gray-400"
        />
      ))}
    </div>
  );
};
export default Purchases;
