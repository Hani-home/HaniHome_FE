"use client";

import Image from "next/image";

import { useState } from "react";

import BackHeader from "@/components/layout/header/BackHeader";
import DropDownMenu from "@/components/listings/DropDownMenu";

import CertificatedIcon from "@/public/svgs/common/certificated-icon.svg";
import HeartFilledIcon from "@/public/svgs/common/heart-filled-icon.svg";
import HeartOutlineIcon from "@/public/svgs/common/heart-outline-icon.svg";

const ListingEditPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <BackHeader rightIcon="more" />
      <div className="relative flex">
        <Image
          src="/svgs/common/room-img.svg"
          width={375}
          height={375}
          alt="매물 이미지"
          className="h-[375px] w-[375px] rounded-sm border border-gray-200 object-cover"
          priority
        />
        <button
          type="button"
          onClick={() => setLiked(prev => !prev)}
          className="absolute right-6 bottom-5 flex cursor-pointer rounded-full bg-white p-2.5 shadow-md"
          aria-label={liked ? "즐겨찾기 취소" : "즐겨찾기"}
        >
          {liked ? (
            <HeartFilledIcon className="text-mint h-6 w-6" />
          ) : (
            <HeartOutlineIcon className="text-mint h-6 w-6" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-[14px] px-4 py-3">
          {/* 프로필 이미지 */}
          <div className="h-12 w-12 rounded-full border border-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-body1-sb flex shrink-0 font-bold text-black">
              하니하니
            </span>
            <div className="flex items-center justify-center p-[3px]">
              <CertificatedIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
        </div>
        {/*드롭다운 메뉴*/}
        <div>
          <DropDownMenu />
        </div>
      </div>
    </div>
  );
};
export default ListingEditPage;
