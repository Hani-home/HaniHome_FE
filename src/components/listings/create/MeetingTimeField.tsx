import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import { format } from "date-fns";

import Calendar from "@/components/common/calendar/Calendar";

import StatusOffIcon from "@/public/svgs/listings/status-off-icon.svg";
import StatusOnIcon from "@/public/svgs/listings/status-on-icon.svg";

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

const toStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const MeetingTimeField = () => {
  const {
    meetingDateFrom,
    meetingDateTo,
    setMeetingDateRange,
    viewingAlwaysAvailable,
    setViewingAlwaysAvailable,
  } = useListingStore();

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
    setViewingAlwaysAvailable(!viewingAlwaysAvailable);
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
      <div className="flex justify-between px-4 py-3" onClick={handleStatus}>
        <div
          className={`text-body1-med ${viewingAlwaysAvailable ? "text-mint" : "text-gray-500"}`}
        >
          기한 상관 없음
        </div>
        {viewingAlwaysAvailable ? <StatusOnIcon /> : <StatusOffIcon />}
      </div>
    </div>
  );
};
export default MeetingTimeField;
