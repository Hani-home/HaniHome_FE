import { useState } from "react";

export const useSingleDateCalendar = (initialDate: Date = new Date()) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [shownDate, setShownDate] = useState(initialDate);

  const moveMonthBy = (offset: number) => {
    setShownDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  return {
    selectedDate,
    setSelectedDate,
    shownDate,
    setShownDate,
    moveMonthBy,
  };
};
