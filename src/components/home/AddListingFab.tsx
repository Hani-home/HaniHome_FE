"use client";

import Link from "next/link";

import { useState } from "react";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

const AddListingFab = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/listings/create"
      className="fixed bottom-15.5 left-1/2 z-30 w-[375px] -translate-x-1/2"
    >
      <div className="flex justify-end pr-5 pb-8">
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`shadow-fab bg-mint active:bg-mint-contrast z-30 flex h-13.5 cursor-pointer items-center rounded-full text-white transition-all duration-500 ${
            hovered ? "px-4" : "px-[15px]"
          }`}
        >
          <PlusIcon className="h-6 w-6 text-white" />
          <span
            className={`text-body1 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${
              hovered
                ? "ml-2 max-w-[67px] translate-x-0 opacity-100"
                : "max-w-0 -translate-x-2 opacity-0"
            }`}
          >
            매물 등록
          </span>
        </button>
      </div>
    </Link>
  );
};

export default AddListingFab;
