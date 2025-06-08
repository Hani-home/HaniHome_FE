import { useState } from "react";
import React from "react";

const labels = ["수도세", "전기세", "안터넷비", "가스비", "청소비", "주차비"];

const descriptions: Record<string, string> = {
  수도세: "수도 요금은 월 기준 정산됩니다.",
  전기세: "전기 요금은 사용량에 따라 부과됩니다.",
  안터넷비: "인터넷 요금은 고정 월 요금입니다.",
  가스비: "가스 요금은 계절별로 변동될 수 있습니다.",
  청소비: "청소비는 분기별로 청구됩니다.",
  주차비: "주차비는 주/20$ 입니다",
};

const ContractInfo = () => {
  const [selected, setSelected] = useState("수도세");

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <div className="flex flex-col gap-4 px-4 py-3">
        <span className="text-body1-sb text-gray-900">빌 포함 항목</span>
        <div className="flex flex-col gap-3">
          <div className="text-body2-med flex gap-2 text-gray-700">
            {labels.map((label, idx) => (
              <React.Fragment key={label}>
                <span
                  onClick={() => setSelected(label)}
                  className={`cursor-pointer ${selected === label ? "text-gray-900" : ""}`}
                >
                  {label}
                </span>
                {idx < labels.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-600">
            {descriptions[selected]}
          </div>
        </div>
      </div>

      <hr className="my-3 border-t border-gray-200" />

      <div className="flex flex-col gap-1 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-body1-sb text-gray-900">디파짓</span>
          <div className="text-body1-med text-gray-700">$/주</div>
        </div>
        <span className="text-cap1-med text-gray-500">디파짓 조정 가능</span>
      </div>

      <hr className="my-3 border-t border-gray-200" />

      <div className="flex flex-col gap-3 px-4 py-3">
        <span className="text-body1-sb text-gray-900">계약 형태 설명</span>
        <div className="flex flex-col gap-2">
          <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-600">
            월 단위로 계약합니다
          </div>
          <span className="text-cap1-med text-gray-500">계약 연장 가능</span>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
