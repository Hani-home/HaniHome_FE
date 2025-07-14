import { useMemo } from "react";

import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

import { useViewingAvailableDates } from "@/hooks/viewing/useViewing";

import { TIME_OPTIONS, TimeLabel } from "@/constants/time-options";

import { MyViewingDate } from "@/types/viewing";

export const useViewingReservation = ({
  propertyId,
  shownDate,
  selectedTime,
  currentId,
  myViewingDatesData,
}: {
  propertyId: number;
  shownDate: Date;
  selectedTime: string;
  selectedDate: Date | null;
  currentId: string;
  myViewingDatesData: MyViewingDate[] | undefined;
}) => {
  const { data: availableDatesData } = useViewingAvailableDates(propertyId);

  const getTimeLabelByTime = (time: string): TimeLabel => {
    const found = (Object.keys(TIME_OPTIONS) as TimeLabel[]).find(label =>
      TIME_OPTIONS[label].includes(time),
    );
    if (!found) throw new Error(`Invalid time: ${time}`);
    return found;
  };

  const filteredAvailableDates = useMemo(() => {
    if (!availableDatesData || selectedTime === "NN : NN") return null;

    return Object.entries(availableDatesData)
      .filter(([, slots]) =>
        slots.some(slot => {
          const timeStr = slot.time.slice(0, 5);
          return timeStr === selectedTime && !slot.reserved;
        }),
      )
      .map(([date]) => date);
  }, [availableDatesData, selectedTime]);

  const disabledDates = useMemo(() => {
    if (!availableDatesData) return [];

    const allDatesInMonth = eachDayOfInterval({
      start: startOfMonth(shownDate),
      end: endOfMonth(shownDate),
    });

    return allDatesInMonth.filter(date => {
      const formatted = format(date, "yyyy-MM-dd");

      if (selectedTime !== "NN : NN" && filteredAvailableDates) {
        return !filteredAvailableDates.includes(formatted);
      }

      return !availableDatesData[formatted];
    });
  }, [availableDatesData, shownDate, selectedTime, filteredAvailableDates]);

  const usedDateTimeSet = useMemo(() => {
    const set = new Set<string>();

    if (availableDatesData) {
      Object.entries(availableDatesData).forEach(([date, slots]) => {
        slots.forEach(slot => {
          if (slot.reserved) {
            const timeStr = slot.time.slice(0, 5);
            set.add(`${date}-${timeStr}`);
          }
        });
      });
    }

    const myViewingDates = Array.isArray(myViewingDatesData)
      ? myViewingDatesData
      : [];

    myViewingDates.forEach(item => {
      if (item.propertyId === Number(currentId)) return;
      set.add(`${item.viewingDate}-${item.viewingTime}`);
    });

    return set;
  }, [availableDatesData, myViewingDatesData, currentId]);

  const isDisabledTime = (time: string) => {
    if (!availableDatesData) return true;

    const hasAvailableSlot = Object.values(availableDatesData).some(slots => {
      return slots.some(slot => {
        const slotTime = slot.time.slice(0, 5);
        return slotTime === time && !slot.reserved;
      });
    });

    return !hasAvailableSlot;
  };

  return {
    availableDatesData,
    getTimeLabelByTime,
    filteredAvailableDates,
    disabledDates,
    usedDateTimeSet,
    isDisabledTime,
  };
};
