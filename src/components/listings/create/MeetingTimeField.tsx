import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";

import Calendar from "@/components/common/calendar/Calendar";

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface MeetingTimeFieldProps {
  meetingDateFrom: string | null;
  meetingDateTo: string | null;
  setMeetingDateRange: (from: string | null, to: string | null) => void;
  viewingAlwaysAvailable: boolean;
  setViewingAlwaysAvailable: (value: boolean) => void;
}

const toStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const MeetingTimeField = ({
  meetingDateFrom,
  meetingDateTo,
  setMeetingDateRange,
  viewingAlwaysAvailable,
  setViewingAlwaysAvailable,
}: MeetingTimeFieldProps) => {
  const today = useMemo(() => new Date(), []);
  const dummyDate = useMemo(() => new Date("0000-01-01T00:00:00"), []);

  const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: toStartOfDay(today),
      endDate: toStartOfDay(today),
      key: "selection",
    },
  ]);
  const [, setIsWheelOpen] = useState(false);

  useEffect(() => {
    if (viewingAlwaysAvailable) {
      setCurrentMonth(dummyDate);
      setRange([
        {
          startDate: dummyDate,
          endDate: dummyDate,
          key: "selection",
        },
      ]);
      setFocusedRange([0, 0]);
    } else {
      const fromDate = meetingDateFrom ? new Date(meetingDateFrom) : today;
      const toDate = meetingDateTo ? new Date(meetingDateTo) : today;

      setCurrentMonth(fromDate);
      setRange([
        {
          startDate: toStartOfDay(fromDate),
          endDate: toStartOfDay(toDate),
          key: "selection",
        },
      ]);
      setFocusedRange([0, 0]);
    }
  }, [
    meetingDateFrom,
    meetingDateTo,
    viewingAlwaysAvailable,
    today,
    dummyDate,
  ]);

  const handleRangeChange = (newRange: Range[]) => {
    if (viewingAlwaysAvailable) return;

    const { startDate, endDate } = newRange[0];
    const start = toStartOfDay(startDate);
    const end = toStartOfDay(endDate);

    setRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ]);

    setMeetingDateRange(
      format(start, "yyyy-MM-dd'T'00:00:00"),
      format(end, "yyyy-MM-dd'T'00:00:00"),
    );
  };

  const handleStatus = () => {
    const newStatus = !viewingAlwaysAvailable;
    setViewingAlwaysAvailable(newStatus);

    if (newStatus) {
      // 기한 상관없음 선택 시, 날짜 초기화
      setMeetingDateRange(null, null);
    } else {
      // 다시 날짜 선택하게 될 때 기본값 세팅 (선택사항)
      const todayStart = toStartOfDay(today);
      setMeetingDateRange(
        format(todayStart, "yyyy-MM-dd'T'00:00:00"),
        format(todayStart, "yyyy-MM-dd'T'00:00:00"),
      );
    }
  };

  const isSingleSelection = useMemo(() => {
    if (!range) return true;
    const { startDate, endDate } = range[0];
    return startDate.toDateString() === endDate.toDateString();
  }, [range]);

  return (
    <div>
      <Calendar
        key={viewingAlwaysAvailable ? "always" : "normal"}
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
        disabled={viewingAlwaysAvailable}
      />
      <div
        className="flex items-center justify-between border-t-[2px] border-gray-200 px-4 py-3"
        onClick={handleStatus}
      >
        <div
          className={`text-body1-med ${viewingAlwaysAvailable ? "text-mint-contrast" : "text-gray-500"}`}
        >
          기한 상관 없음
        </div>
        <div
          className={`flex h-7 w-[50px] cursor-pointer items-center rounded-full p-[3px] duration-300 ease-in-out ${
            viewingAlwaysAvailable ? "bg-mint-contrast" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-[22px] w-[22px] transform rounded-full bg-white duration-300 ease-in-out ${
              viewingAlwaysAvailable ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
export default MeetingTimeField;
