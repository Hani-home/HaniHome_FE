"use client";

import { useMemo, useState } from "react";

import Calendar from "@/components/common/Calendar";
import CheckIcon from "@/components/signup/info/CheckIcon";

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const AvailableDatePicker = () => {
  const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [availableImmediately, setAvailableImmediately] = useState(false);
  const [negotiableDate, setNegotiableDate] = useState(false);

  const [, setIsWheelOpen] = useState(false);

  const isSingleSelection = useMemo(() => {
    const { startDate, endDate } = range[0];
    return startDate.toDateString() === endDate.toDateString();
  }, [range]);

  return (
    <div className="flex flex-col py-4">
      <span className="text-heading3 p-4 text-gray-900">입주 가능일</span>

      <Calendar
        range={range}
        focusedRange={focusedRange}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isSingleSelection={isSingleSelection}
        onRangeChange={setRange}
        onFocusChange={setFocusedRange}
        onShownDateChange={date => {
          setCurrentMonth(date);
        }}
        onOpenWheel={() => {
          setTimeout(() => {
            setIsWheelOpen(true);
          }, 0);
        }}
        onCloseWheel={() => {
          setTimeout(() => {
            setIsWheelOpen(false);
          }, 0);
        }}
      />

      <div className="mt-[6px] flex flex-col gap-2 px-4 py-3 transition-all duration-300">
        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={() => setAvailableImmediately(prev => !prev)}
        >
          <CheckIcon checked={availableImmediately} />
          즉시 입주 가능
        </div>

        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={() => setNegotiableDate(prev => !prev)}
        >
          <CheckIcon checked={negotiableDate} />
          입주 일자 협의 가능
        </div>
      </div>
    </div>
  );
};

export default AvailableDatePicker;
