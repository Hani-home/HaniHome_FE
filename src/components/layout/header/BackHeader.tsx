"use client";

import { useRouter } from "next/navigation";

import CloseIcon from "@/public/svgs/common/close-icon.svg";
import BackArrow from "@/public/svgs/common/left-arrow.svg";
import ReportIcon from "@/public/svgs/header/report-icon.svg";

interface BackHeaderProps {
  title?: string;
  rightIcon?: "report" | "close";
  onRightClick?: () => void;
}

const BackHeader = ({ title, rightIcon, onRightClick }: BackHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex h-12 items-center justify-between px-4 py-3">
      <button onClick={() => router.back()} className="cursor-pointer">
        <BackArrow />
      </button>

      {title ? (
        <h1 className="text-heading2 text-gray-900">{title}</h1>
      ) : (
        <div />
      )}

      {rightIcon === "report" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <ReportIcon />
        </button>
      ) : rightIcon === "close" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <CloseIcon />
        </button>
      ) : (
        <div />
      )}
    </header>
  );
};

export default BackHeader;
