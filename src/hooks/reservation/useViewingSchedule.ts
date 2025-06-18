import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import {
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isBefore,
  startOfMonth,
} from "date-fns";

import { TimeLabel } from "@/constants/time-options";
import { VIEWING_PERIOD } from "@/constants/viewing-schedule-dummies";

/**
 * 뷰잉 예약 일정 관리 훅
 * - 날짜/시간 선택 상태
 * - 사용된 일정 중복 확인
 * - 일정 추가/삭제/수정 로직 포함
 */
export const useViewingSchedules = (
  shownDate: Date,
  setShownDate: (date: Date) => void,
) => {
  const {
    schedules,
    setSchedules,
    selectedTimeLabels,
    setSelectedTimeLabels,
    push,
    remove,
  } = useViewingScheduleStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"calendar" | "time" | null>("calendar");

  const selectedDates = schedules
    .filter((s): s is { date: Date; time: string } => s.date !== null)
    .map(s => s.date);

  const allowedStart = new Date(VIEWING_PERIOD.startDate);
  const allowedEnd = new Date(VIEWING_PERIOD.endDate);

  const disabledDates = eachDayOfInterval({
    start: startOfMonth(shownDate),
    end: endOfMonth(shownDate),
  }).filter(date => isBefore(date, allowedStart) || isAfter(date, allowedEnd));

  const usedDateTimeSet = new Set(
    schedules
      .filter((_, i) => i !== activeIndex)
      .filter(s => s.date && s.time !== "NN : NN")
      .map(s => `${(s.date as Date).toDateString()}-${s.time}`),
  );

  const isAllSchedulesFilled = schedules.every(
    s => s.date !== null && s.time !== "NN : NN",
  );

  const updateSchedule = (
    index: number,
    key: "date" | "time",
    value: Date | string,
  ) => {
    const updated = schedules.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setSchedules(updated);
  };

  const addSchedule = () => {
    if (schedules.length < 3) {
      const newSchedules = [...schedules, { date: null, time: "NN : NN" }];
      const newLabels = [...selectedTimeLabels, "아침"];
      setSchedules(newSchedules);
      setSelectedTimeLabels(newLabels as TimeLabel[]);

      const newIndex = newSchedules.length - 1;
      setActiveIndex(newIndex);
      push(newIndex);
      setMode("calendar");
      setShownDate(new Date());
    }
  };

  const removeSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    const newLabels = selectedTimeLabels.filter((_, i) => i !== index);
    setSchedules(newSchedules);
    setSelectedTimeLabels(newLabels);
    setActiveIndex(prev => {
      if (prev > index) return prev - 1;
      if (prev === index) return 0;
      return prev;
    });
    remove(index);
  };

  useEffect(() => {
    const selectedDate = schedules[activeIndex]?.date;
    setShownDate(selectedDate ?? new Date());
  }, [activeIndex, schedules, setShownDate]);

  return {
    schedules,
    selectedDates,
    selectedTimeLabels,
    activeIndex,
    mode,
    usedDateTimeSet,
    disabledDates,
    isAllSchedulesFilled,
    updateSchedule,
    addSchedule,
    removeSchedule,
    setActiveIndex,
    setMode,
    setSelectedTimeLabels,
  };
};
