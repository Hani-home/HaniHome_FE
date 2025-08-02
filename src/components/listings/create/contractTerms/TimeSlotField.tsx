import { useEffect, useState } from "react";

import AlertMessage from "@/components/common/AlertMessage";
import TimeSpinner from "@/components/common/calendar/TimeSpinner";

import { TimeSlot } from "@/types/listingDetail";

interface TimeSlotFieldProps {
  value: TimeSlot[];
  onChange: (updated: TimeSlot[]) => void;
}

const PERIODS = ["아침", "점심", "저녁"] as const;
type Period = (typeof PERIODS)[number];

const PERIOD_LIMITS: Record<Period, { minTime: string; maxTime: string }> = {
  아침: { minTime: "06:00", maxTime: "11:30" },
  점심: { minTime: "12:00", maxTime: "18:00" },
  저녁: { minTime: "18:30", maxTime: "24:00" },
};

const TimeSlotField = ({ value, onChange }: TimeSlotFieldProps) => {
  const [slots, setSlots] = useState<TimeSlot[]>(value);
  const [tempTime, setTempTime] = useState<string | null>(null);
  const [activeSpinner, setActiveSpinner] = useState<{
    period: Period;
    type: "start" | "end";
  } | null>(null);

  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  useEffect(() => {
    const isSame =
      value.length === slots.length &&
      value.every(
        (slot, i) =>
          slot.timeFrom === slots[i]?.timeFrom &&
          slot.timeTo === slots[i]?.timeTo,
      );

    if (!isSame) {
      if (value.length === 0) {
        setSlots([
          { timeFrom: "00:00", timeTo: "00:00" },
          { timeFrom: "00:00", timeTo: "00:00" },
          { timeFrom: "00:00", timeTo: "00:00" },
        ]);
      } else {
        setSlots(value);
      }
    }
  }, [value]);

  const timeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    if (timeStr === "24:00") return 1440;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  const displayTime = (timeStr: string) => {
    if (timeStr === "24:00") return "00:00";
    return timeStr;
  };

  const handleTimeChange = (
    period: Period,
    type: "start" | "end",
    val: string,
  ) => {
    const idx = PERIODS.indexOf(period);
    if (idx === -1) return;

    const { minTime, maxTime } = PERIOD_LIMITS[period];
    const minLimit = timeToMinutes(minTime);
    const maxLimit = timeToMinutes(maxTime === "00:00" ? "24:00" : maxTime);
    const valMin = timeToMinutes(val);

    if (valMin < minLimit || valMin > maxLimit) {
      setAlertMsg(`${period} 시간대(${minTime}~ ${maxTime})사이여야 합니다.`);
      return;
    }

    const otherVal =
      slots[idx][type === "start" ? "timeTo" : "timeFrom"] || "00:00";

    const otherMin = timeToMinutes(otherVal);

    // 시작 종료 시간 관계 확인
    if (
      (type === "start" && valMin >= otherMin && otherVal !== "00:00") ||
      (type === "end" && valMin <= otherMin && val !== "00:00")
    ) {
      setAlertMsg("시작 시간은 종료 시간보다 이전이어야 합니다.");
      return;
    }

    setTempTime(val);
  };

  const handleSpinnerClose = () => {
    if (activeSpinner && tempTime !== null) {
      const { period, type } = activeSpinner;
      const idx = PERIODS.indexOf(period);
      if (idx !== -1) {
        const updatedSlots = [...slots];
        let saveTime = tempTime;

        // timeTo가 '00:00'이면 저장 시 '24:00'으로 변경
        if (type === "end" && tempTime === "00:00") {
          saveTime = "24:00";
        }

        updatedSlots[idx] = {
          ...updatedSlots[idx],
          [type === "start" ? "timeFrom" : "timeTo"]: saveTime,
        };
        setSlots(updatedSlots);
        onChange(updatedSlots);
      }
    }
    setTempTime(null);
    setActiveSpinner(null);
  };

  const handleButtonClick = (period: Period, type: "start" | "end") => {
    const incompleteSlot = slots.find((slot, idx) => {
      const isCurrent = PERIODS[idx] === period;
      return (
        !isCurrent &&
        (slot.timeFrom === "00:00" || slot.timeFrom === "") !==
          (slot.timeTo === "00:00" || slot.timeTo === "")
      );
    });

    if (incompleteSlot) {
      setAlertMsg(
        "현재 시간대의 시작 시간과 종료 시간을 모두 설정한 후\n다른 시간대를 선택해 주세요",
      );

      return;
    }

    if (activeSpinner?.period === period && activeSpinner?.type === type) {
      handleSpinnerClose();
    } else {
      setActiveSpinner({ period, type });
      const idx = PERIODS.indexOf(period);
      if (idx !== -1 && slots[idx]) {
        const currentTime =
          slots[idx][type === "start" ? "timeFrom" : "timeTo"] || "00:00";
        setTempTime(currentTime);
      } else {
        setTempTime("00:00");
      }
    }
  };

  const getDisplayTime = (period: Period, type: "start" | "end") => {
    const timeValue =
      slots[PERIODS.indexOf(period)][
        type === "start" ? "timeFrom" : "timeTo"
      ] || "00:00";

    const isActive =
      activeSpinner?.period === period && activeSpinner?.type === type;

    const [hour, minute] = (displayTime(timeValue) || "00:00").split(":");

    return isActive ? (
      <span>nn : nn</span>
    ) : (
      <span className="flex items-center gap-[2px]">
        <span>{hour}</span>
        <span>:</span>
        <span>{minute}</span>
      </span>
    );
  };

  const getButtonClass = (period: Period, type: "start" | "end") => {
    const timeValue =
      slots[PERIODS.indexOf(period)][
        type === "start" ? "timeFrom" : "timeTo"
      ] || "00:00";

    const isEmptyTime = timeValue === "00:00" || timeValue === "";
    const isTwentyFour = timeValue === "24:00";

    if (activeSpinner?.period === period && activeSpinner?.type === type) {
      return "bg-mint-contrast border-mint-contrast text-white";
    }

    if (isEmptyTime) {
      return "bg-gray-0 border-gray-300 text-gray-300";
    }

    if (isTwentyFour) {
      return "text-mint bg-white border-gray-400";
    }

    return "text-mint border-gray-400";
  };

  return (
    <div className="relative">
      {PERIODS.map(period => {
        return (
          <div key={period} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div
                className={`text-body1-sb ${
                  activeSpinner?.period === period
                    ? "text-gray-800"
                    : "text-gray-400"
                }`}
              >
                {period}
              </div>
              <div className="flex items-center gap-[12px]">
                <button
                  className={`text-body1-med flex h-[33px] w-[77px] items-center justify-center gap-1 rounded-[4px] border px-3 py-1 ${getButtonClass(period, "start")}`}
                  onClick={() => handleButtonClick(period, "start")}
                >
                  {getDisplayTime(period, "start")}
                </button>

                <span className="text-body1-med text-gray-400">~</span>

                <button
                  className={`text-body1-med flex h-[33px] w-[77px] items-center justify-center gap-1 rounded-[4px] border px-3 py-1 ${getButtonClass(period, "end")}`}
                  onClick={() => handleButtonClick(period, "end")}
                >
                  {getDisplayTime(period, "end")}
                </button>
              </div>
            </div>

            {activeSpinner?.period === period && (
              <TimeSpinner
                key={`${period}-${activeSpinner.type}`}
                initialHour={parseInt(tempTime?.split(":")[0] ?? "0")}
                initialMinute={parseInt(tempTime?.split(":")[1] ?? "0")}
                onChange={val =>
                  handleTimeChange(period, activeSpinner.type, val)
                }
                onClose={handleSpinnerClose}
                minHour={parseInt(PERIOD_LIMITS[period].minTime.split(":")[0])}
                maxHour={
                  PERIOD_LIMITS[period].maxTime === "00:00"
                    ? 24
                    : parseInt(PERIOD_LIMITS[period].maxTime.split(":")[0])
                }
              />
            )}
          </div>
        );
      })}

      {alertMsg && (
        <AlertMessage
          message={alertMsg}
          onDone={() => setAlertMsg(null)}
          className="bottom-[70px] whitespace-pre-line"
        />
      )}
    </div>
  );
};

export default TimeSlotField;
