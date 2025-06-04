import { useState } from "react";

const CustomRangeSlider = () => {
  const MIN = 100;
  const MAX = 3000;
  const STEP = 100;

  const [minVal, setMinVal] = useState(100);
  const [maxVal, setMaxVal] = useState(1000);

  const getPercent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

  // z-index 기준: 값이 큰 핸들이 밑으로 가야 아래에 깔리지 않음
  const isMinOnTop = minVal >= maxVal;

  return (
    <div className="relative h-10 w-[327px]">
      {/* 배경 트랙 */}
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-gray-200" />

      {/* 선택된 영역 트랙 */}
      <div
        className="bg-mint absolute top-1/2 h-1 -translate-y-1/2 rounded"
        style={{
          left: `${getPercent(Math.min(minVal, maxVal))}%`,
          width: `${Math.abs(getPercent(maxVal) - getPercent(minVal))}%`,
        }}
      />

      {/* 왼쪽 핸들 */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={minVal}
        onChange={e => setMinVal(Number(e.target.value))}
        className={`range-thumb absolute top-0 left-0 h-full w-full appearance-none bg-transparent ${
          isMinOnTop ? "z-40" : "z-30"
        }`}
      />

      {/* 오른쪽 핸들 */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={maxVal}
        onChange={e => setMaxVal(Number(e.target.value))}
        className={`range-thumb absolute top-0 left-0 h-full w-full appearance-none bg-transparent ${
          isMinOnTop ? "z-30" : "z-40"
        }`}
      />

      {/* 라벨 */}
      <div className="absolute -bottom-6 left-0 flex w-full justify-between text-sm text-gray-400">
        <span>{MIN}$</span>
        <span>{MAX}$</span>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
