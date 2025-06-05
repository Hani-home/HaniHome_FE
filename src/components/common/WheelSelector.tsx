import { useEffect, useRef, useState } from "react";

import "@/styles/reactDateRange.css";
import clsx from "clsx";

import { useWheelSnap } from "@/hooks/common/useWheelSnap";

import { getSafeDate } from "@/utils/getSafeDate";

interface WheelSelectorProps {
  value: Date;
  onChange: (newDate: Date) => void;
  onClose: () => void;
}

const BASE_YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const BASE_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const PADDED = ["", ""];
const YEARS = [...PADDED, ...BASE_YEARS, ...PADDED];
const MONTHS = [...PADDED, ...BASE_MONTHS, ...PADDED];

const WheelSelector = ({ value, onChange }: WheelSelectorProps) => {
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth() + 1);

  const yearRef = useRef<HTMLDivElement>(null!);
  const monthRef = useRef<HTMLDivElement>(null!);
  const yearTimer = useRef<NodeJS.Timeout | null>(null);
  const monthTimer = useRef<NodeJS.Timeout | null>(null);

  const yearSnap = useWheelSnap({
    ref: yearRef,
    items: YEARS,
    selectedYear: year,
    selectedMonth: month,
    type: "year",
    value,
    onSelect: setYear,
    onChange,
  });

  const monthSnap = useWheelSnap({
    ref: monthRef,
    items: MONTHS,
    selectedYear: year,
    selectedMonth: month,
    type: "month",
    value,
    onSelect: setMonth,
    onChange,
  });

  const handleClick = (type: "year" | "month", val: number) => {
    const newYear = type === "year" ? val : year;
    const newMonth = type === "month" ? val - 1 : month - 1;
    const newDate = getSafeDate(newYear, newMonth, value.getDate());
    if (type === "year") setYear(val);
    else setMonth(val);
    onChange(newDate);
  };

  const debounceScroll = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
    callback: () => void,
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, 100);
  };

  useEffect(() => {
    yearSnap.scrollToIndex(year);
    monthSnap.scrollToIndex(month);
  }, [year, month]);

  return (
    <div className="z-30 w-full border-b border-gray-200 bg-white">
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
            ref={yearRef}
            className="scrollbar-hide relative z-0 h-[250px] w-full overflow-auto scroll-smooth pl-[34px]"
            onScroll={() => debounceScroll(yearTimer, yearSnap.snap)}
          >
            {YEARS.map((y, idx) => (
              <div
                key={idx}
                className={clsx(
                  "text-heading4 flex h-[50px] items-center justify-center transition-colors duration-150",
                  typeof y === "number"
                    ? y === year
                      ? "text-mint-contrast"
                      : "text-gray-400"
                    : "pointer-events-none",
                )}
                onClick={() => typeof y === "number" && handleClick("year", y)}
              >
                {typeof y === "number" ? `${y.toString().slice(2)}.` : ""}
              </div>
            ))}
          </div>
        </div>

        {/* 월 선택 */}
        <div className="relative flex w-[80px] flex-col items-center text-center">
          <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-0 z-20 h-[50px] w-full -translate-y-1/2 border-y" />
          <div
            ref={monthRef}
            className="scrollbar-hide relative z-0 h-[250px] w-full overflow-auto scroll-smooth"
            onScroll={() => debounceScroll(monthTimer, monthSnap.snap)}
          >
            {MONTHS.map((m, idx) => (
              <div
                key={idx}
                className={clsx(
                  "text-heading4 flex h-[50px] items-center justify-center transition-colors duration-150",
                  typeof m === "number"
                    ? m === month
                      ? "text-mint-contrast"
                      : "text-gray-400"
                    : "pointer-events-none",
                )}
                onClick={() => typeof m === "number" && handleClick("month", m)}
              >
                {typeof m === "number"
                  ? `${m.toString().padStart(2, "0")}.`
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
