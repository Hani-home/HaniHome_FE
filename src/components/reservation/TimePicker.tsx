import { useState } from "react";

import clsx from "clsx";

import { TIME_OPTIONS, TimeLabel } from "@/constants/time-options";

import AfternoonIcon from "@/public/svgs/reservation/afternoon-icon.svg";
import EveningIcon from "@/public/svgs/reservation/evening-icon.svg";
import MorningIcon from "@/public/svgs/reservation/morning-icon.svg";

const TimePicker = ({
  activeIndex,
  schedules,
  updateSchedule,
}: {
  activeIndex: number;
  schedules: { date: Date | null; time: string }[];
  updateSchedule: (index: number, key: "time", value: string) => void;
}) => {
  const [selectedLabel, setSelectedLabel] = useState<TimeLabel>("아침");

  return (
    <div className="px-4">
      <div className="border-b border-gray-200 pb-12">
        {/* 상단 시간대 탭 */}
        <div className="flex items-center justify-center gap-10 border-y border-gray-200 px-11 py-3">
          {[
            { label: "아침", icon: MorningIcon },
            { label: "점심", icon: AfternoonIcon },
            { label: "저녁", icon: EveningIcon },
          ].map(({ label, icon: Icon }) => {
            const isActive =
              selectedLabel === label ||
              (schedules[activeIndex].time === "NN : NN" && label === "아침");

            return (
              <button
                key={label}
                onClick={() => setSelectedLabel(label as TimeLabel)}
                className={clsx(
                  "text-body1-sb flex cursor-pointer items-center gap-2 rounded-full",
                  isActive ? "bg-green text-mint" : "text-gray-500",
                )}
              >
                <Icon
                  className={clsx("h-6 w-6 fill-current", {
                    "text-mint": isActive,
                    "text-gray-500": !isActive,
                  })}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* 선택된 시간대에 따른 시간 버튼 목록 */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-2 px-[15.5px] pt-5">
          {TIME_OPTIONS[selectedLabel].map(time => (
            <button
              key={time}
              onClick={() => updateSchedule(activeIndex, "time", time)}
              className={clsx(
                "text-body1-sb border-mint-contrast h-10 w-24 rounded border py-2 text-center",
                schedules[activeIndex].time === time
                  ? "bg-mint-light text-mint-contrast"
                  : "text-gray-700",
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
