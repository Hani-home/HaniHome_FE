"use client";

import { useRouter } from "next/navigation";

import BackArrow from "@/public/svgs/header/back-icon.svg";

const BackHeader = () => {
  const router = useRouter();

  return (
    <header className="flex h-12 items-center justify-between px-4 py-3">
      <button onClick={() => router.back()} className="cursor-pointer">
        <BackArrow />
      </button>
    </header>
  );
};

export default BackHeader;
