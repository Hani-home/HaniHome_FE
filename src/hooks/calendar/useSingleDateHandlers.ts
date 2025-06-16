import { useState } from "react";

export const useSingleDateCalendar = (initialDate: Date = new Date()) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const moveMonthBy = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  return { selectedDate, setSelectedDate, moveMonthBy };
};
