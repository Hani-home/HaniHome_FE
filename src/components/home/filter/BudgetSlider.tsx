import { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import CheckIcon from "@/components/signup/info/CheckIcon";

const BudgetSlider = () => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([100, 1000]);
  const [checked, isChecked] = useState(false);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex w-full px-4 py-3">
        <span className="text-heading3 text-gray-900">예산 범위</span>
        <div className="text-heading3 flex flex-1 items-center justify-end gap-2">
          <span className="text-gray-500">주/$</span>
          <span className="text-mint">{budgetRange[0]}</span>
          <span className="text-mint">–</span>
          <span className="text-mint">{budgetRange[1]}</span>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center gap-2 px-4 py-1">
        <div className="absolute top-4 left-4 z-0 h-1 w-[343px] rounded-full bg-gray-100" />
        <div className="flex w-[327px] self-center pt-[6px] pb-7">
          <Slider
            range
            className="custom-slider my-[1px]"
            value={budgetRange}
            min={100}
            step={100}
            max={3000}
            allowCross={true}
            onChange={value => {
              const [start, end] = value as [number, number];
              if (Math.abs(end - start) >= 100) {
                setBudgetRange([start, end]);
              }
            }}
            marks={{
              100: {
                label: (
                  <span className="text-cap1-med ml-3.5 text-gray-400">
                    100$
                  </span>
                ),
              },
              3000: {
                label: (
                  <span className="text-cap1-med mr-6.5 text-gray-400">
                    3000$
                  </span>
                ),
              },
            }}
          />
        </div>
        <div
          className="flex cursor-pointer items-center justify-end gap-1"
          onClick={() => isChecked(prev => !prev)}
        >
          <CheckIcon checked={checked} />
          <div className="text-cap1-med text-gray-700">빌 포함</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
