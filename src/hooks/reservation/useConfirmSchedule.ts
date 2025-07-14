import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import { format } from "date-fns";

import { normalizeTime } from "@/utils/dateFormatter";

// 임시 겹치는 일정
const mockedOverlappingTimes = [
  { date: "2025-06-19", time: "06:30" },
  { date: "2025-06-30", time: "14:00" },
];

const isOverlapping = (date: Date, time: string) => {
  const formatted = format(date, "yyyy-MM-dd");
  const normalized = normalizeTime(time);
  return mockedOverlappingTimes.some(
    o => o.date === formatted && o.time === normalized,
  );
};

export const useConfirmSchedules = (id: string) => {
  const { setActiveId, getSchedule, setSchedule } = useViewingScheduleStore();
  const [selectedSchedule, setSelectedSchedule] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  useEffect(() => {
    setActiveId(id);
  }, [id, setActiveId]);

  const raw = getSchedule();

  const isValid = raw.date !== null && raw.time !== "NN : NN";

  // 겹치는지 여부 판단
  const isOverlap = isValid && isOverlapping(raw.date!, raw.time);

  // 선택 가능한 경우
  useEffect(() => {
    if (isValid && !isOverlap) {
      setSelectedSchedule({ date: raw.date!, time: raw.time });
    }
  }, [raw]);

  return {
    selectedSchedule, // 선택된 일정 (겹치지 않음)

    changeableSchedules:
      isValid && isOverlap
        ? [] // 서버로부터 받은 대체 일정 넣기 (현재는 없음)
        : [],

    overlappingSchedules:
      isValid && isOverlap ? [{ date: raw.date!, time: raw.time }] : [],

    handleSelectSchedule: (s: { date: Date; time: string }) => {
      setSchedule(id, s);
      setSelectedSchedule(s);
    },
  };
};
