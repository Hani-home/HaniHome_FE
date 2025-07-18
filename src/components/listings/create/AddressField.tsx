import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";

import { PropertyRegion } from "@/types/listingDetail";

import SearchIcon from "@/public/svgs/common/search-icon.svg";

interface AddressFieldProps {
  onNext: () => void;
}

const AddressField = ({ onNext }: AddressFieldProps) => {
  const { addressData, setAddressData } = useListingStore();
  const [isFocused] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [unit, setUnit] = useState(addressData.unit);
  const [buildingName, setBuildingName] = useState(addressData.buildingName);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  const handleInputClick = () => {
    // 실제 AddressFinder API 사용 시 여기서 선택된 결과를 업데이트
    const fakeAddress: PropertyRegion = {
      country: "Australia",
      postCode: "2000",
      state: "NSW",
      suburb: "Sydney",
      streetName: "George St",
      streetNumber: "123",
      unit: "",
      buildingName: "",
      longitude: 151.2093,
      latitude: -33.8688,
    };
    setIsSearchClicked(true);
    setAddressData(fakeAddress);
  };

  useEffect(() => {
    setAddressData({
      ...addressData,
      unit,
      buildingName,
    });
  }, [unit, buildingName, setAddressData]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-heading3 px-4 py-4 text-gray-900">
        주소를 입력해주세요
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-2">
          <div
            className={`flex h-11 w-[343px] items-center justify-between rounded-[4px] border px-4 py-3 ${
              isFocused ? "border-gray-600" : "border-gray-400"
            }`}
            onClick={handleInputClick}
          >
            <input
              className="text-body1-med text-gray-500 outline-none"
              placeholder="도로명, 건물명, suburb 검색"
            />
            <SearchIcon
              className="cursor-pointer text-gray-500"
              onClick={handleSearchClick}
            />
          </div>
          {isFocused && (
            <div className="text-cap1-med text-red">
              주소는 수정이 불가능하니 정확히 확인해주세요
            </div>
          )}
        </div>
      </div>

      {!isSearchClicked && (
        <>
          <div className="flex gap-2 px-4 py-3">
            <div className="text-body2-med text-gray-700">
              이렇게 검색해보세요!
            </div>
            <div className="text-cap1-med text-gray-500">
              영문 입력을 권장드립니다
            </div>
          </div>
          <div className="flex flex-col gap-[2px] px-4 py-2">
            <div className="text-cap1-med text-gray-600">번지수 + 도로명</div>
            <div className="text-cap1-med text-gray-300">
              ex&#41; 25 Smith St
            </div>
          </div>
          <div className="flex flex-col gap-[2px] px-4 py-2">
            <div className="text-cap1-med text-gray-600">도로명 + Suburb</div>
            <div className="text-cap1-med text-gray-300">
              ex&#41; 25 George St, Parramatta
            </div>
          </div>
          <div className="flex flex-col gap-[2px] px-4 py-2">
            <div className="text-cap1-med text-gray-600">건물명</div>
            <div className="text-cap1-med text-gray-300">
              ex&#41; World Tower
            </div>
          </div>
        </>
      )}
      {isSearchClicked && (
        <>
          <div className="pb-[70px]">
            <div className="flex flex-col gap-2">
              <div className="px-4 py-4">상세주소를 입력해주세요 (선택)</div>
              <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col gap-2">
                  <div className="text-body2-med text-gray-700">Unit No.</div>
                  <div className="flex h-11 w-[343px] items-center rounded-[4px] border border-gray-400 px-4 py-3">
                    <input
                      placeholder="입력해주세요"
                      className="text-body1-med text-gray-500 outline-none"
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-body2-med text-gray-700">
                    건물 / 아파트 이름
                  </div>
                  <div className="flex h-11 w-[343px] items-center rounded-[4px] border border-gray-400 px-4 py-3">
                    <input
                      placeholder="입력해주세요"
                      className="text-body1-med text-gray-500 outline-none"
                      value={buildingName}
                      onChange={e => setBuildingName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BottomActionBar label="다음" variant="outline" onClick={onNext} />
        </>
      )}
    </div>
  );
};

export default AddressField;
