"use client";

import { useEffect, useMemo, useState } from "react";

import { useFilterStore } from "@/stores/useFilterStore";
import { format, parseISO } from "date-fns";

import CheckIcon from "@/components/common/CheckIcon";
import Calendar from "@/components/common/calendar/Calendar";

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const AvailableDatePicker = () => {
  const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [range, setRange] = useState<Range[] | null>(null);
  const [, setIsWheelOpen] = useState(false);

  const { immediate, negotiable, setFilters, availableFrom, availableTo } =
    useFilterStore();

  useEffect(() => {
    const today = new Date();
    const fromDate = availableFrom ? parseISO(availableFrom) : today;
    const toDate = availableTo ? parseISO(availableTo) : today;

    setCurrentMonth(fromDate);
    setRange([
      {
        startDate: toStartOfDay(fromDate),
        endDate: toStartOfDay(toDate),
        key: "selection",
      },
    ]);
  }, [availableFrom, availableTo]);

  const toStartOfDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const handleRangeChange = (newRange: Range[]) => {
    const { startDate, endDate } = newRange[0];

    const startOfDay = toStartOfDay(startDate);
    const endOfDay = toStartOfDay(endDate);

    setRange([
      {
        startDate: startOfDay,
        endDate: endOfDay,
        key: "selection",
      },
    ]);

    setFilters({
      availableFrom: format(startOfDay, "yyyy-MM-dd'T'00:00:00"),
      availableTo: format(endOfDay, "yyyy-MM-dd'T'00:00:00"),
    });
  };

  const isSingleSelection = useMemo(() => {
    if (!range) return true;
    const { startDate, endDate } = range[0];
    return startDate.toDateString() === endDate.toDateString();
  }, [range]);

  if (!range || !currentMonth) return null;

  return (
    <div className="flex flex-col py-4">
      <span className="text-heading3 p-4 text-gray-900">입주 가능일</span>

      <Calendar
        range={range}
        focusedRange={focusedRange}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isSingleSelection={isSingleSelection}
        onRangeChange={handleRangeChange}
        onFocusChange={setFocusedRange}
        onShownDateChange={setCurrentMonth}
        onOpenWheel={() => setTimeout(() => setIsWheelOpen(true), 0)}
        onCloseWheel={() => setTimeout(() => setIsWheelOpen(false), 0)}
      />

      <div className="mt-[6px] flex flex-col gap-2 px-4 py-3 transition-all duration-300">
        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={() => setFilters({ immediate: !immediate })}
        >
          <CheckIcon checked={immediate} />
          즉시 입주 가능
        </div>

        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={() => setFilters({ negotiable: !negotiable })}
        >
          <CheckIcon checked={negotiable} />
          입주 일자 협의 가능
        </div>
      </div>
    </div>
  );
};

export default AvailableDatePicker;
