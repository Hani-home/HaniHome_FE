import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "@/styles/reactDateRange.css";
import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type Props = {
  range: Range[];
  focusedRange: [number, number];
  isSingleSelection?: boolean;
  currentMonth: Date;
  onRangeChange: (range: Range[]) => void;
  onFocusChange: (range: [number, number]) => void;
  onShownDateChange?: (date: Date) => void;
};

const Calendar = ({
  range,
  focusedRange,
  isSingleSelection,
  currentMonth,
  onRangeChange,
  onFocusChange,
  onShownDateChange,
}: Props) => {
  const displayStart = format(range[0].startDate, "yyyy. MM. dd");
  const displayEnd = format(range[0].endDate, "yyyy. MM. dd");

  return (
    <div className="relative flex flex-col">
      {/* 상단 날짜 표시 */}
      <div className="rdrDateDisplay flex items-center justify-center gap-[24px] py-4">
        <button
          onClick={() => onFocusChange([0, 0])}
          className={clsx(
            "rdrDateDisplayItem text-body1-med text-gray-800",
            focusedRange[1] === 0 && "rdrDateDisplayItemActive",
          )}
        >
          {displayStart}
        </button>
        <span className="text-body1-med text-gray-700">~</span>
        <button
          onClick={() => onFocusChange([0, 1])}
          className={clsx(
            "rdrDateDisplayItem text-body1-med text-gray-800",
            focusedRange[1] === 1 && "rdrDateDisplayItemActive",
          )}
        >
          {displayEnd}
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
