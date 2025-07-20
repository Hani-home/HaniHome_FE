"use client";

import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { QUESTION_MAP } from "@/constants/question-map";

import EmptyCheck from "@/public/svgs/common/empty-check.svg";
// import FilledCheck from "@/public/svgs/common/filled-check.svg";
import ChangeIcon from "@/public/svgs/listings/change-icon.svg";
import QuestionIcon from "@/public/svgs/listings/question-mark-icon.svg";

const InternalDetailsContent = () => {
  const { listingType } = useListingStore();
  const [isSquareMeter, setIsSquareMeter] = useState(false); // false = 평, true = ㎡

  if (!listingType) return null;

  const internalDetails = QUESTION_MAP[listingType].ListingDetails.find(
    q => q.id === "internalDetails",
  );

  const options = Array.isArray(internalDetails?.options)
    ? (internalDetails?.options as string[])
    : [];

  const areaOptions = options.filter(
    opt => opt === "Internal Area" || opt === "Total Area (선택)",
  );
  const otherOptions = options.filter(
    opt => opt !== "Internal Area" && opt !== "Total Area (선택)",
  );

  const groupedOtherOptions: string[][] = [];
  for (let i = 0; i < otherOptions.length; i += 2) {
    groupedOtherOptions.push(otherOptions.slice(i, i + 2));
  }

  const inputUnitText = isSquareMeter ? "평" : "㎡";
  const buttonUnitText = isSquareMeter ? "㎡" : "평";

  return (
    <div className="max-w-[375px]">
      <div className="flex flex-col gap-4 pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-body1-sb text-gray-800">방 면적</div>
            <QuestionIcon className="text-gray-800" />
          </div>
          <button
            type="button"
            onClick={() => setIsSquareMeter(prev => !prev)}
            className="flex items-center gap-1"
          >
            <ChangeIcon className="text-mint" />
            <div className="text-lab1-sb text-mint">
              {inputUnitText} 단위로 입력
            </div>
          </button>
        </div>

        {/* Internal Area, Total Area 인풋 */}
        <div className="flex justify-between">
          {areaOptions.map(option => (
            <div
              key={option}
              className="flex h-[73px] flex-col justify-between"
            >
              <div className="text-body2-med text-gray-600">{option}</div>
              <input
                type="text"
                className="text-body1-med h-11 w-[167px] rounded-[4px] border border-gray-400 px-4 py-3 text-gray-500"
                placeholder={`입력해주세요          ${buttonUnitText}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 나머지 옵션들 */}
      <div className="flex flex-col">
        {groupedOtherOptions.map((pair, rowIdx) => (
          <div key={rowIdx} className="flex justify-between py-4">
            {pair.map((option, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-body1-sb mb-3 text-gray-800">{option}</div>

                {[
                  "총 거주인",
                  "욕실 쉐어자 수",
                  "방 개수",
                  "욕실 개수",
                ].includes(option) ? (
                  <>
                    <input
                      type="text"
                      className="text-body1-med h-11 w-[167px] rounded border border-gray-400 px-4 py-3 text-gray-500"
                      placeholder="입력해주세요          명"
                    />
                    {listingType === "SHARE" && option === "총 거주인" && (
                      <div className="mt-2 flex items-center">
                        <EmptyCheck />
                        <div className="text-cap1-med text-gray-700">
                          집주인과 함께 거주
                        </div>
                      </div>
                    )}
                  </>
                ) : ["건물 전체 층 (선택)", "해당 층 (선택)"].includes(
                    option,
                  ) ? (
                  <input
                    type="text"
                    className="text-body1-med h-11 w-[167px] rounded border border-gray-400 px-4 py-3 text-gray-500"
                    placeholder="입력해주세요          층"
                  />
                ) : (
                  <input
                    type="text"
                    className="text-body1-med h-11 w-[167px] rounded border border-gray-400 px-4 py-3 text-gray-500"
                    placeholder="입력해주세요          층"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternalDetailsContent;
