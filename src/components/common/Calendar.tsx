import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "@/styles/reactDateRange.css";
import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { CalendarProps, Range } from "@/types/calendar";

const Calendar = ({
  range,
  focusedRange,
  isSingleSelection,
  currentMonth,
  onRangeChange,
  onFocusChange,
  onShownDateChange,
}: CalendarProps) => {
  const startDate = range[0].startDate;
  const endDate = range[0].endDate;
  return (
    <div className="relative flex flex-col">
      {/* 상단 날짜 스피너 표시 */}
      <div className="rdrDateDisplay flex items-center justify-center gap-[24px] py-4">
        <button
          onMouseDown={e => {
            e.preventDefault();
            onFocusChange([0, 0]);
          }}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 0 && "rdrDateDisplayItemActive",
          )}
        >
          {format(startDate, "yyyy. MM. dd")}
        </button>
        <span className="text-body1-med text-gray-700">~</span>
        <button
          onMouseDown={e => {
            e.preventDefault();
            onFocusChange([0, 1]);
          }}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 1 && "rdrDateDisplayItemActive",
          )}
        >
          {format(endDate, "yyyy. MM. dd")}
        </button>
      </div>

      {/* 현재 달 */}
      <div className="text-body1-med absolute top-21.5 left-1/2 z-10 -translate-x-1/2 text-gray-900">
        {format(currentMonth, "yyyy. MM. dd.")}
      </div>

      {/* 캘린더 */}
      <DateRange
        ranges={range}
        onChange={(item: { selection: Range }) =>
          onRangeChange([item.selection])
        }
        showDateDisplay={false}
        focusedRange={focusedRange}
        onRangeFocusChange={onFocusChange}
        locale={enUS}
        rangeColors={["#2ED8A7"]}
        shownDate={currentMonth}
        onShownDateChange={onShownDateChange}
        className={clsx({ "single-selection": isSingleSelection })}
      />
    </div>
  );
};

export default Calendar;
