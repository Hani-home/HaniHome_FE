import RoomList from "@/components/wishlist/roomList";

import { ListingDummies } from "@/constants/listing-card-dummies";

import ListingIcon from "@/public/svgs/wishlist/listing-icon.svg";

const Wishlist = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden overflow-y-auto pb-39.5">
      <div className="fixed top-0 left-1/2 z-10 flex h-12 w-full max-w-[375px] -translate-x-1/2 items-center justify-between bg-white px-4">
        <div className="text-heading-2 flex-grow text-center font-bold text-gray-900">
          즐겨찾기
        </div>
        <div>
          <ListingIcon className="ml-auto" />
        </div>
      </div>

      <div className="mt-16">
        <div className="flex h-[19px] items-center pl-4">
          즐겨찾기 매물 {ListingDummies.length}개
        </div>
        {ListingDummies.map(item => (
          <RoomList key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
