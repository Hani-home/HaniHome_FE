"use client";

import { useSingleDateCalendar } from "@/hooks/calendar/useSingleDateHandlers";
import { useViewingSchedules } from "@/hooks/reservation/useViewingSchedule";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import ScheduleInputList from "@/components/reservation/ScheduleInputList";
import SingleDateCalendar from "@/components/reservation/SingleDateCalendar";
import TimePicker from "@/components/reservation/TimePicker";

import { VIEWING_TIME_SLOTS } from "@/constants/viewing-schedule-dummies";

import PlusIcon from "@/public/svgs/reservation/plus-squared-icon.svg";

const ViewingReservationPage = () => {
  const { moveMonthBy, shownDate, setShownDate } = useSingleDateCalendar();

  const {
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
  } = useViewingSchedules(shownDate, setShownDate);

  return (
    <>
      <BackHeader title="뷰잉 예약" />

      <div className="flex flex-col justify-center gap-1 p-4">
        <h1 className="text-heading3 text-gray-900">
          원하는 뷰잉 날짜를 선택해주세요
        </h1>
        <span className="text-cap1-med text-gray-500">
          최대 3개까지 일정 신청이 가능하고, <br />
          가능한 가장 빠른 일정으로 예약이 자동 확정됩니다.
        </span>
      </div>

      <ScheduleInputList
        schedules={schedules}
        activeIndex={activeIndex}
        mode={mode}
        setMode={setMode}
        setActiveIndex={setActiveIndex}
        removeSchedule={removeSchedule}
      />

      {schedules.length < 3 && (
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={addSchedule}
            className="bg-mint-contrast h-fit w-fit cursor-pointer rounded-full p-1"
          >
            <PlusIcon className="h-4.5 w-4.5 text-white" />
          </button>
        </div>
      )}

      {mode === "time" && (
        <TimePicker
          activeIndex={activeIndex}
          schedules={schedules}
          updateSchedule={updateSchedule}
          selectedLabel={selectedTimeLabels[activeIndex] ?? "아침"}
          setSelectedLabel={label =>
            setSelectedTimeLabels(prev =>
              prev.map((l, i) => (i === activeIndex ? label : l)),
            )
          }
          usedDateTimeSet={usedDateTimeSet}
          viewingTimeSlots={VIEWING_TIME_SLOTS}
        />
      )}

      {mode === "calendar" && (
        <SingleDateCalendar
          activeIndex={activeIndex}
          schedules={schedules}
          updateSchedule={updateSchedule}
          selectedDates={selectedDates}
          moveMonthBy={moveMonthBy}
          shownDate={shownDate}
          setShownDate={setShownDate}
          disabledDates={disabledDates}
        />
      )}

      <BottomActionBar label="뷰잉 예약하기" disabled={!isAllSchedulesFilled} />
    </>
  );
};

export default ViewingReservationPage;
