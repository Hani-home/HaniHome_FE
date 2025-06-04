import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "@/styles/reactDateRange.css";
import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

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
  setCurrentMonth,
}: CalendarProps) => {
  const startDate = range[0].startDate;
  const endDate = range[0].endDate;

  const [tempDate, setTempDate] = useState(currentMonth);
  const [nextTempDate, setNextTempDate] = useState<Date | null>(null);
  const [shouldOpenWheel, setShouldOpenWheel] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  // 날짜 클릭 시
  const handleDateClick = (targetIndex: number) => {
    const isSame = focusedRange[1] === targetIndex;
    onFocusChange([0, targetIndex]);

    const newDate = targetIndex === 0 ? startDate : endDate;

    if (!isSame || !showWheel) {
      setNextTempDate(newDate);
    } else {
      setShowWheel(false);
      setTimeout(() => onCloseWheel?.(), 0);
    }
  };

  // 외부 currentMonth 변할 때 초기화
  useEffect(() => {
    setTempDate(currentMonth);
  }, [currentMonth]);

  // nextTempDate 들어오면 tempDate로 세팅 → 열 준비
  useEffect(() => {
    if (!nextTempDate) return;
    setTempDate(nextTempDate);
    setNextTempDate(null);
    setShouldOpenWheel(true);
  }, [nextTempDate]);

  // tempDate 바뀐 다음 열기
  useEffect(() => {
    if (!shouldOpenWheel) return;
    setShouldOpenWheel(false);
    setShowWheel(true);
    onOpenWheel?.();
  }, [tempDate]);

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

      <div
        onClick={() => {
          setShowWheel(prev => {
            const next = !prev;
            if (next) onOpenWheel?.();
            else setTimeout(() => onCloseWheel?.(), 0);
            return next;
          });
        }}
        className="flex items-center justify-center gap-17 px-11 py-3 text-gray-900"
      >
        <button
          onClick={e => {
            e.stopPropagation();
            const newDate = new Date(tempDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setTempDate(newDate);
            setCurrentMonth?.(newDate);
            onShownDateChange?.(newDate);
          }}
          className="h-[8.71px] w-[7px] text-[8px] leading-none"
        >
          ◀
        </button>

        {format(tempDate, "yyyy. MM. dd.")}

        <button
          onClick={e => {
            e.stopPropagation();
            const newDate = new Date(tempDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setTempDate(newDate);
            onShownDateChange?.(newDate);
          }}
          className="h-[8.71px] w-[7px] text-[8px] leading-none"
        >
          ▶
        </button>
      </div>

      {showWheel ? (
        <WheelSelector
          value={tempDate}
          onChange={date => {
            setTempDate(date);
            setCurrentMonth?.(date);
            onShownDateChange?.(date);

            const updated = new Date(date);
            const current = range[0];

            const newRange = {
              ...current,
              startDate:
                focusedRange[1] === 0
                  ? updated
                  : updated < current.startDate
                    ? updated
                    : current.startDate,
              endDate:
                focusedRange[1] === 1
                  ? updated
                  : updated > current.endDate
                    ? updated
                    : current.endDate,
            };

            if (newRange.startDate > newRange.endDate) {
              const temp = newRange.startDate;
              newRange.startDate = newRange.endDate;
              newRange.endDate = temp;
            }

            onRangeChange?.([newRange]);
          }}
          onClose={() => {
            setShowWheel(false);
            setTimeout(() => onCloseWheel?.(), 0);
          }}
        />
      ) : (
        <DateRange
          key={currentMonth.toISOString()}
          shownDate={currentMonth}
          onShownDateChange={(date: Date) => setCurrentMonth(date)}
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
