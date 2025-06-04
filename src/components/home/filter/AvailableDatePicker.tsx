"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "@/styles/reactDateRange.css";
// 네가 작성한 스타일 포함
import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type OnChangeParam = {
  selection: Range;
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

  const isSingleSelection = useMemo(() => {
    const { startDate, endDate } = range[0];
    return (
      startDate &&
      endDate &&
      startDate.toDateString() === endDate.toDateString()
    );
  }, [range]);

  return (
    <div className="flex flex-col py-4">
      <span className="text-heading3 p-4 text-gray-900">입주 가능일</span>

      <div className="relative flex flex-col">
        <div className="rdrDateDisplay relative flex items-center justify-center gap-[24px] py-4">
          <div
            role="button"
            onClick={() => setFocusedRange([0, 0])}
            className={clsx(
              "rdrDateDisplayItem text-body1-med cursor-pointer text-gray-800",
              focusedRange[1] === 0 && "rdrDateDisplayItemActive",
            )}
          >
            {format(range[0].startDate, "yyyy. MM. dd")}
          </div>
          <span className="text-body1-med text-gray-700">~</span>
          <div
            role="button"
            onClick={() => setFocusedRange([0, 1])}
            className={clsx(
              "rdrDateDisplayItem text-body1-med cursor-pointer text-gray-800",
              focusedRange[1] === 1 && "rdrDateDisplayItemActive",
            )}
          >
            {format(range[0].endDate, "yyyy. MM. dd")}
          </div>
        </div>

        {/* 현재 보여지는 달 표시 */}
        <div className="text-body1-med absolute top-21.5 left-1/2 z-10 -translate-x-1/2 text-gray-900">
          {format(currentMonth, "yyyy. MM. dd.")}
        </div>

        {/* 달력 */}
        <DateRange
          ranges={range}
          onChange={(item: OnChangeParam) => setRange([item.selection])}
          showDateDisplay={false}
          focusedRange={focusedRange}
          onRangeFocusChange={(range: [number, number]) =>
            setFocusedRange(range)
          }
          locale={enUS}
          rangeColors={["#2ED8A7"]}
          shownDate={currentMonth}
          onShownDateChange={(date: Date) => {
            setCurrentMonth(date);
          }}
          className={clsx({ "single-selection": isSingleSelection })}
        />
      </div>
    </div>
  );
};

export default AvailableDatePicker;
