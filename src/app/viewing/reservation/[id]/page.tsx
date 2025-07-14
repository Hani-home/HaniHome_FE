"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";

import { useSingleDateCalendar } from "@/hooks/calendar/useSingleDateHandlers";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import ScheduleInputList from "@/components/reservation/ScheduleInputList";
import SingleDateCalendar from "@/components/reservation/SingleDateCalendar";
import TimePicker from "@/components/reservation/TimePicker";

import { VIEWING_TIME_SLOTS } from "@/constants/mock/viewing-schedule-dummies";

const ViewingReservationPage = () => {
  const { id } = useParams() as { id: string };
  const { moveMonthBy, shownDate, setShownDate } = useSingleDateCalendar();
  const router = useRouter();

  const {
    setActiveId,
    reset,
    getSchedule,
    setSchedule,
    getSelectedTimeLabel,
    setSelectedTimeLabel,
  } = useViewingScheduleStore();

  const [mode, setMode] = useState<"calendar" | "time">("calendar");

  useEffect(() => {
    setActiveId(id);
    return () => reset();
  }, [id]);

  const schedule = getSchedule();
  const selectedTimeLabel = getSelectedTimeLabel();

  const updateSchedule = (key: "date" | "time", value: Date | string) => {
    setSchedule(id, { ...schedule, [key]: value });
  };

  const isAllFilled = !!schedule.date && schedule.time !== "NN : NN";

  return (
    <div className="pb-16">
      <BackHeader title="뷰잉 예약" onBackClick={() => router.back()} />

      <div className="flex flex-col justify-center gap-1 p-4">
        <h1 className="text-heading3 text-gray-900">
          원하는 뷰잉 날짜를 선택해주세요
        </h1>
        <span className="text-cap1-med text-gray-500">
          호스트가 설정하지 않은 일정, 다른 게스트가 예약한 일정, <br />
          나의 다른 매물 뷰잉 예약과 중복되는 일정은 선택할 수 없어요
        </span>
      </div>

      <ScheduleInputList
        schedules={[schedule]}
        activeIndex={0}
        mode={mode}
        setMode={setMode}
        setActiveIndex={() => {}}
      />

      {mode === "calendar" && (
        <SingleDateCalendar
          selectedDate={schedule.date}
          onSelectDate={date => updateSchedule("date", date)}
          moveMonthBy={moveMonthBy}
          shownDate={shownDate}
          setShownDate={setShownDate}
          disabledDates={[]}
        />
      )}

      {mode === "time" && (
        <TimePicker
          selectedDate={schedule.date}
          selectedTime={schedule.time}
          setSelectedTime={time => updateSchedule("time", time)}
          selectedLabel={selectedTimeLabel}
          setSelectedLabel={label => setSelectedTimeLabel(id, label)}
          viewingTimeSlots={VIEWING_TIME_SLOTS}
          usedDateTimeSet={new Set()}
        />
      )}

      <BottomActionBar
        label="다음"
        disabled={!isAllFilled}
        onClick={() => router.push(`/viewing/reservation/${id}/confirm`)}
      />
    </div>
  );
};

export default ViewingReservationPage;
