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
  const [schedules, setSchedules] = useState<
    { date: Date | null; time: string }[]
  >([{ date: null, time: "NN : NN" }]);

  const { push, remove } = useViewingScheduleStore();
  const [selectedTimeLabels, setSelectedTimeLabels] = useState<TimeLabel[]>([
    "아침",
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"calendar" | "time" | null>("calendar");

  const selectedDates = schedules
    .filter((s): s is { date: Date; time: string } => s.date !== null)
    .map(s => s.date);

  // 허용 가능한 뷰잉 날짜 범위 계산
  const allowedStart = new Date(VIEWING_PERIOD.startDate);
  const allowedEnd = new Date(VIEWING_PERIOD.endDate);

  const disabledDates = eachDayOfInterval({
    start: startOfMonth(shownDate),
    end: endOfMonth(shownDate),
  }).filter(date => isBefore(date, allowedStart) || isAfter(date, allowedEnd));

  // 중복 방지를 위한 사용된 date+time 조합 Set
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
    setSchedules(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const addSchedule = () => {
    if (schedules.length < 3) {
      const newIndex = schedules.length;
      setSchedules(prev => [...prev, { date: null, time: "NN : NN" }]);
      setSelectedTimeLabels(prev => [...prev, "아침"]);
      setActiveIndex(newIndex);
      push(newIndex);
      setMode("calendar");
      setShownDate(new Date());
    }
  };

  const removeSchedule = (index: number) => {
    setSchedules(prev => prev.filter((_, i) => i !== index));
    setSelectedTimeLabels(prev => prev.filter((_, i) => i !== index));
    setActiveIndex(prev => {
      if (prev > index) return prev - 1;
      if (prev === index) return 0;
      return prev;
    });
    remove(index);
  };
  // 일정 인덱스가 바뀌면 캘린더를 해당 일정 날짜로 이동
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
