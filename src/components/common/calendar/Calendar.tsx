import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "@/styles/reactDateRange.css";
import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { useCalendarHandlers } from "@/hooks/calendar/useCalendarHandlers";

import { CalendarProps, Range } from "@/types/calendar";

import WheelSelector from "./WheelSelector";

const Calendar = ({
  range,
  focusedRange,
  isSingleSelection,
  currentMonth,
  onRangeChange,
  onFocusChange,
  onShownDateChange,
  onOpenWheel,
  onCloseWheel,
}: CalendarProps) => {
  const startDate = range[0].startDate;
  const endDate = range[0].endDate;

  const {
    tempDate,
    showWheel,
    handleDateClick,
    moveMonthBy,
    toggleShowWheel,
    handleWheelChange,
    handleWheelClose,
  } = useCalendarHandlers({
    range,
    focusedRange,
    onRangeChange,
    onFocusChange,
    onShownDateChange,
    onOpenWheel,
    onCloseWheel,
  });

  return (
    <div className="relative flex flex-col">
      {/* 날짜 선택 버튼 */}
      <div className="rdrDateDisplay flex items-center justify-center gap-[24px] py-4">
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleDateClick(0)}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 0 && "rdrDateDisplayItemActive",
          )}
        >
          {format(startDate, "yyyy. MM. dd")}
        </button>

        <span className="text-body1-med text-gray-700">~</span>

        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleDateClick(1)}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 1 && "rdrDateDisplayItemActive",
          )}
        >
          {format(endDate, "yyyy. MM. dd")}
        </button>
      </div>

      {/* 상단 날짜 텍스트 (가운데 클릭 시 휠 toggle) */}
      <div className="flex items-center justify-center gap-17 px-11 py-3 text-gray-900">
        <button
          onClick={() => moveMonthBy(-1)}
          className="h-[8.71px] w-[7px] cursor-pointer text-[8px] leading-none"
        >
          ◀
        </button>

        <span onClick={toggleShowWheel} className="cursor-pointer">
          {format(tempDate, "yyyy. MM. dd.")}
        </span>

        <button
          onClick={() => moveMonthBy(1)}
          className="h-[8.71px] w-[7px] cursor-pointer text-[8px] leading-none"
        >
          ▶
        </button>
      </div>

      {/* 날짜 휠 또는 캘린더 표시 */}
      {showWheel ? (
        <WheelSelector
          value={tempDate}
          onChange={handleWheelChange}
          onClose={handleWheelClose}
        />
      ) : (
        <DateRange
          key={currentMonth.toISOString()}
          shownDate={tempDate}
          onShownDateChange={handleWheelChange}
          ranges={range}
          onChange={(item: { selection: Range }) =>
            onRangeChange([item.selection])
          }
          showDateDisplay={false}
          focusedRange={focusedRange}
          onRangeFocusChange={onFocusChange}
          locale={enUS}
          rangeColors={["#2ED8A7"]}
          className={clsx({ "single-selection": isSingleSelection })}
        />
      )}
    </div>
  );
};

export default Calendar;
