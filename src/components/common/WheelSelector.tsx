import { useEffect, useRef, useState } from "react";

import "@/styles/reactDateRange.css";
import clsx from "clsx";

interface WheelSelectorProps {
  value: Date;
  onChange: (newDate: Date) => void;
  onClose: () => void;
}

const WheelSelector = ({ value, onChange }: WheelSelectorProps) => {
  const baseYears = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const baseMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  const years = ["", "", ...baseYears, "", ""];
  const months = ["", "", ...baseMonths, "", ""];

  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth() + 1);

  const monthScrollRef = useRef<HTMLDivElement>(null!);
  const yearScrollRef = useRef<HTMLDivElement>(null!);
  const yearScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const monthScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const itemHeight = 50;
  const centerOffset = 100;

  const scrollToIndex = (
    ref: React.RefObject<HTMLDivElement | null>,
    index: number,
  ) => {
    if (!ref.current) return;
    const offset = itemHeight * index - centerOffset;
    ref.current.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleSelect = (year: number, month: number) => {
    const newDate = new Date(value);
    newDate.setFullYear(year);
    newDate.setMonth(month - 1);
    onChange(newDate);

    const yearIndex = years.findIndex(y => y === year);
    const monthIndex = months.findIndex(m => m === month);
    scrollToIndex(yearScrollRef, yearIndex);
    scrollToIndex(monthScrollRef, monthIndex);
  };

  const handleSnapScroll = (
    ref: React.RefObject<HTMLDivElement>,
    items: (number | string)[],
    setSelected: (val: number) => void,
    type: "year" | "month",
  ) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const centerIndex = Math.round((scrollTop + centerOffset) / itemHeight);
    const value = items[centerIndex];

    if (typeof value !== "number") return;

    // 진동
    if ("vibrate" in navigator) navigator.vibrate(30);

    setSelected(value);
    ref.current.scrollTo({
      top: centerIndex * itemHeight - centerOffset,
      behavior: "smooth",
    });

    const newDate = new Date(value);
    newDate.setFullYear(type === "year" ? value : selectedYear);
    newDate.setMonth(type === "month" ? value - 1 : selectedMonth - 1);
    onChange(newDate);
  };

  useEffect(() => {
    const yearIndex = years.findIndex(y => y === selectedYear);
    const monthIndex = months.findIndex(m => m === selectedMonth);
    scrollToIndex(yearScrollRef, yearIndex);
    scrollToIndex(monthScrollRef, monthIndex);
  }, [selectedYear, selectedMonth]);

  return (
    <div className="absolute top-30 left-0 z-30 w-full border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex justify-center gap-3">
        <div className="bg-gradient-upper-overlay pointer-events-none absolute top-0 left-0 z-10 h-[50px] w-full bg-white" />
        <div className="bg-gradient-bottom-overlay pointer-events-none absolute bottom-0 left-0 z-10 h-[50px] w-full bg-white" />

        {/* 연도 선택 */}
        <div className="relative flex w-[106px] flex-col items-center text-center">
          <div className="text-mint-contrast pointer-events-none absolute top-[50%] left-2 z-20 -translate-y-1/2">
            <span className="text-heading4">20</span>
          </div>
          <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-[34px] z-20 h-[50px] w-[72px] -translate-y-1/2 border-y" />
          <div
            ref={yearScrollRef}
            className="scrollbar-hide relative z-0 h-[250px] w-full overflow-auto scroll-smooth pl-[34px]"
            onScroll={() => {
              if (yearScrollTimer.current)
                clearTimeout(yearScrollTimer.current);
              yearScrollTimer.current = setTimeout(() => {
                handleSnapScroll(yearScrollRef, years, setSelectedYear, "year");
              }, 100);
            }}
          >
            {years.map((year, idx) => (
              <div
                key={idx}
                className={clsx(
                  "text-heading4 flex h-[50px] items-center justify-center transition-colors duration-150",
                  typeof year === "number"
                    ? year === selectedYear
                      ? "text-mint-contrast"
                      : "text-gray-400"
                    : "pointer-events-none",
                )}
                onClick={() => {
                  if (typeof year === "number") {
                    setSelectedYear(year);
                    handleSelect(year, selectedMonth);
                  }
                }}
              >
                {typeof year === "number" ? `${year.toString().slice(2)}.` : ""}
              </div>
            ))}
          </div>
        </div>

        {/* 월 선택 */}
        <div className="relative flex w-[80px] flex-col items-center text-center">
          <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-0 z-20 h-[50px] w-full -translate-y-1/2 border-y" />
          <div
            ref={monthScrollRef}
            className="scrollbar-hide relative z-0 h-[250px] w-full overflow-auto scroll-smooth"
            onScroll={() => {
              if (monthScrollTimer.current)
                clearTimeout(monthScrollTimer.current);
              monthScrollTimer.current = setTimeout(() => {
                handleSnapScroll(
                  monthScrollRef,
                  months,
                  setSelectedMonth,
                  "month",
                );
              }, 100);
            }}
          >
            {months.map((month, idx) => (
              <div
                key={idx}
                className={clsx(
                  "text-heading4 flex h-[50px] items-center justify-center transition-colors duration-150",
                  typeof month === "number"
                    ? month === selectedMonth
                      ? "text-mint-contrast"
                      : "text-gray-400"
                    : "pointer-events-none",
                )}
                onClick={() => {
                  if (typeof month === "number") {
                    setSelectedMonth(month);
                    handleSelect(selectedYear, month);
                  }
                }}
              >
                {typeof month === "number"
                  ? `${month.toString().padStart(2, "0")}.`
                  : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelSelector;
