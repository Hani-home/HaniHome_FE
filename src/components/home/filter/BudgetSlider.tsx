import { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const BudgetSlider = () => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([100, 1000]);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex w-full px-4 py-3">
        <span className="text-heading3 py-2 text-gray-900">예산 범위</span>
        <div className="text-heading3 flex flex-1 items-center justify-end gap-2">
          <span className="text-gray-500">주/$</span>
          <span className="text-mint">{budgetRange[0]}</span>
          <span className="text-mint">–</span>
          <span className="text-mint">{budgetRange[1]}</span>
        </div>
      </div>

      <div className="relative flex">
        <div className="absolute top-1/2 left-[-8px] z-0 h-1 w-[343px] -translate-y-1/2 rounded-full bg-gray-100" />
        <div className="flex w-[327px] flex-col gap-5">
          <Slider
            range
            className="custom-slider"
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
      </div>
    </div>
  );
};

export default BudgetSlider;
