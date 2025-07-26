import { useListingStore } from "@/stores/useListingStore";

import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";

import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";

const CostDetailField = () => {
  const { costDetails, setCostDetails, optionItemIds, setOptionItemIds } =
    useListingStore();

  const handleInputChange = <K extends keyof typeof costDetails>(
    field: K,
    value: (typeof costDetails)[K],
  ) => {
    setCostDetails(field, value);
  };

  const handleBillIncluded = () => {
    setCostDetails("billIncluded", !costDetails.billIncluded);
  };

  const handleDepositAdjustable = () => {
    setCostDetails("depositAdjustable", !costDetails.depositAdjustable);
  };

  const handleIncludedItemClick = (id: number) => {
    const newIds = optionItemIds.includes(id)
      ? optionItemIds.filter(i => i !== id)
      : [...optionItemIds, id];

    setOptionItemIds(newIds);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      {/* 주간 비용 입력 + 빌 포함 체크 */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="입력해주세요"
            className="placeholder:text-body2-med h-9 w-[343px] rounded-[4px] border border-gray-400 px-4 py-3 placeholder:text-gray-500 focus:outline-none"
            value={costDetails.weeklyCost === 0 ? "" : costDetails.weeklyCost}
            onChange={e => handleInputChange("weeklyCost", +e.target.value)}
          />
          <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
            주/$
          </span>
        </div>
        <div
          onClick={handleBillIncluded}
          className="flex cursor-pointer gap-1 select-none"
        >
          <CheckIcon checked={costDetails.billIncluded} />
          <div className="text-cap1-med text-gray-700">빌 포함</div>
        </div>
      </div>

      <Divider className="my-[2px]" />

      {/* 빌에 포함된 항목 */}
      <div className="flex flex-col gap-4">
        <div className="text-body1-sb text-gray-800">빌에 포함된 항목</div>
        <div className="flex w-[343px] flex-wrap content-center items-center gap-2 self-stretch">
          {CATEGORY_OPTIONS[4].items.map(({ optionId, label }) => {
            const isSelected = optionItemIds.includes(optionId);
            return (
              <button
                key={label}
                type="button"
                onClick={() => handleIncludedItemClick(optionId)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  isSelected
                    ? "bg-mint-press border-transparent text-white"
                    : "border-gray-400 text-gray-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <Divider className="my-[2px]" />

      {/* 빌설명 */}
      <div className="flex flex-col gap-3">
        <div className="text-body1-sb text-gray-800">빌 설명</div>
        <input
          type="text"
          placeholder="ex) 주차비는 주/$20 입니다"
          className="placeholder:text-body2-med h-9 w-[343px] rounded-[4px] border border-gray-400 px-4 py-3 placeholder:text-gray-500 focus:outline-none"
          value={costDetails.costDescription}
          onChange={e => handleInputChange("costDescription", e.target.value)}
        />
      </div>

      <Divider className="my-[2px]" />

      <div className="flex gap-2">
        {/*디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">디파짓</div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className="placeholder:text-body2-med h-9 w-full rounded-[4px] border border-gray-400 px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none"
              value={costDetails.deposit === 0 ? "" : costDetails.deposit}
              onChange={e => handleInputChange("deposit", +e.target.value)}
            />
            <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              $
            </span>
          </div>
          <div onClick={handleDepositAdjustable} className="flex gap-1">
            <CheckIcon checked={costDetails.depositAdjustable} />
            <div className="text-cap1-med text-gray-700">디파짓 조정 가능</div>
          </div>
        </div>
        {/**key디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">Key 디파짓 (선택)</div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className="placeholder:text-body2-med h-9 w-full rounded-[4px] border border-gray-400 px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none"
              value={costDetails.keyDeposit === 0 ? "" : costDetails.keyDeposit}
              onChange={e => handleInputChange("keyDeposit", +e.target.value)}
            />
            <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              $
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostDetailField;
