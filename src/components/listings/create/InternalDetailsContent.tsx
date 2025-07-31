"use client";

import { useEffect, useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";

import {
  InternalDetailsBase,
  RentInternalDetails,
  ShareInternalDetails,
} from "@/types/listingDetail";

import ChangeIcon from "@/public/svgs/listings/change-icon.svg";
import QuestionIcon from "@/public/svgs/listings/question-mark-icon.svg";

interface InternalDetailsContentProps<
  T extends RentInternalDetails | ShareInternalDetails,
> {
  value: T;
  listingType: "RENT" | "SHARE";
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
}

const InternalDetailsContent = <
  T extends RentInternalDetails | ShareInternalDetails,
>({
  value,
  listingType,
  onChange,
}: InternalDetailsContentProps<T>) => {

  const [withPropertyOwner, setWithPropertyOwner] = useState(false);
  const [yardIncluded, setYardIncluded] = useState(false);
  const [verandaIncluded, setVerandaIncluded] = useState(false);
  const [isSquareMeter, setIsSquareMeter] = useState(false);

  useEffect(() => {
    setWithPropertyOwner(
      (value as ShareInternalDetails).withPropertyOwner ?? false,
    );
    setYardIncluded((value as RentInternalDetails).yardIncluded ?? false);
    setVerandaIncluded((value as RentInternalDetails).verandaIncluded ?? false);
    setIsSquareMeter((value as InternalDetailsBase).isSquareMeter ?? false);
  }, [value]);

  // Handle numeric input changes
  const handleNumericInputChange = <K extends keyof T>(
    field: K,
    newValue: string,
  ) => {
    // Only allow numeric fields to be updated with numbers
    if (
      field === "internalArea" ||
      field === "totalArea" ||
      field === "totalFloors" ||
      field === "propertyFloor" ||
      field === "numberOfRoom" ||
      field === "numberOfBath" ||
      field === "totalResidents" ||
      field === "totalBathUser"
    ) {
      const numericValue = newValue === "" ? "" : +newValue;
      onChange(field, numericValue as T[K]);
    }
  };

  const handleYardChecked = () => {
    if (listingType !== "RENT") return;
    const newChecked = !yardIncluded;
    setYardIncluded(newChecked);
    onChange("yardIncluded" as keyof T, newChecked as T[keyof T]);
  };

  const handleVerandaChecked = () => {
    if (listingType !== "RENT") return;
    const newChecked = !verandaIncluded;
    setVerandaIncluded(newChecked);
    onChange("verandaIncluded" as keyof T, newChecked as T[keyof T]);
  };

  const handleWithOwnerChecked = () => {
    if (listingType !== "SHARE") return;
    const newChecked = !withPropertyOwner;
    setWithPropertyOwner(newChecked);
    onChange("withPropertyOwner" as keyof T, newChecked as T[keyof T]);
  };

  const handleIsSquareMeterToggle = () => {
    const newChecked = !isSquareMeter;
    setIsSquareMeter(newChecked);
    onChange("isSquareMeter" as keyof T, newChecked as T[keyof T]);
  };

  const inputUnitText = isSquareMeter ? "평" : "㎡";
  const buttonUnitText = isSquareMeter ? "㎡" : "평";

  const areaKeys = ["internalArea", "totalArea"] as const;
  const rentOtherKeys = ["numberOfRoom", "numberOfBath"] as const;
  const shareOtherKeys = ["totalResidents", "totalBathUser"] as const;
  const floorKeys = ["totalFloors", "propertyFloor"] as const;

  const labelMap: Record<string, string> = {
    internalArea: "Internal Area",
    totalArea: "Total Area (선택)",
    numberOfRoom: "방 개수",
    numberOfBath: "욕실 개수",
    totalResidents: "총 거주인",
    totalBathUser: "욕실 쉐어자 수",
    totalFloors: "건물 전체 층 (선택)",
    propertyFloor: "해당 층 (선택)",
  };

  if (!listingType || !value) return null;

  const details =
    listingType === "RENT"
      ? (value as RentInternalDetails)
      : (value as ShareInternalDetails);

  return (
    <div className="max-w-[375px]">
      <div className="flex flex-col gap-4 px-4 py-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-body1-sb text-gray-800">방 면적</div>
            <QuestionIcon className="text-gray-800" />
          </div>
          <button
            type="button"
            onClick={handleIsSquareMeterToggle}
            className="flex items-center gap-1"
          >
            <ChangeIcon className="text-mint" />
            <div className="text-lab1-sb text-mint">
              {inputUnitText} 단위로 입력
            </div>
          </button>
        </div>

        {/* 면적 입력 */}
        <div className="flex justify-between">
          {areaKeys.map(key => (
            <div key={key} className="flex h-[73px] flex-col justify-between">
              <div className="text-body2-med text-gray-600">
                {labelMap[key]}
              </div>
              <div className="relative w-[167px]">
                {(() => {
                  const inputValue = details[key as keyof typeof details];
                  const safeValue =
                    typeof inputValue === "boolean"
                      ? ""
                      : inputValue === 0
                        ? ""
                        : inputValue || "";

                  return (
                    <input
                      type="text"
                      className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                        inputValue
                          ? "border-gray-600 text-gray-900"
                          : "border-gray-400 text-gray-500"
                      }`}
                      placeholder="입력해주세요"
                      value={safeValue}
                      onChange={e =>
                        handleNumericInputChange(key as keyof T, e.target.value)
                      }
                    />
                  );
                })()}
                <span
                  className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                    details[key] ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {buttonUnitText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 나머지 옵션 */}
      <div className="flex flex-col">
        {(listingType === "RENT"
          ? [...rentOtherKeys, ...floorKeys]
          : [...shareOtherKeys, ...floorKeys]
        )
          .reduce<string[][]>((acc, curr, idx) => {
            if (idx % 2 === 0) acc.push([curr]);
            else acc[acc.length - 1].push(curr);
            return acc;
          }, [])
          .map((pair, rowIdx) => (
            <div key={rowIdx} className="flex justify-between px-4 py-5">
              {pair.map(key => (
                <div key={key} className="flex flex-col">
                  <div className="text-body1-sb mb-3 text-gray-800">
                    {labelMap[key]}
                  </div>
                  <div className="relative w-[167px]">
                    {(() => {
                      const rawValue = details[key as keyof typeof details];
                      const valueForInput =
                        typeof rawValue === "boolean"
                          ? ""
                          : rawValue === 0
                            ? ""
                            : (rawValue ?? "");

                      return (
                        <input
                          type="text"
                          className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                            rawValue
                              ? "border-gray-600 text-gray-900"
                              : "border-gray-400 text-gray-500"
                          }`}
                          placeholder="입력해주세요"
                          value={valueForInput}
                          onChange={e =>
                            handleNumericInputChange(
                              key as keyof T,
                              e.target.value,
                            )
                          }
                        />
                      );
                    })()}
                    <span
                      className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                        details[key as keyof typeof details]
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {listingType === "RENT"
                        ? ["numberOfRoom", "numberOfBath"].includes(key)
                          ? "개"
                          : "층"
                        : ["totalResidents", "totalBathUser"].includes(key)
                          ? "명"
                          : "층"}
                    </span>
                  </div>

                  {listingType === "SHARE" && key === "totalResidents" && (
                    <div
                      className="mt-2 flex cursor-pointer items-center gap-1 select-none"
                      onClick={handleWithOwnerChecked}
                    >
                      <CheckIcon checked={withPropertyOwner} />
                      <div className="text-cap1-med text-gray-700">
                        집주인과 함께 거주
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      {listingType === "RENT" && (
        <div className="flex flex-col gap-3 px-4 pt-3">
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={handleYardChecked}
          >
            <CheckIcon checked={yardIncluded} />
            <div className="text-cap1-med text-gray-700">마당 포함</div>
          </div>
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={handleVerandaChecked}
          >
            <CheckIcon checked={verandaIncluded} />
            <div className="text-cap1-med text-gray-700">베란다 포함</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalDetailsContent;
