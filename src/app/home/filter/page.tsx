"use client";

import { useState } from "react";

import { useFilterStore } from "@/stores/useFilterStore";

import { usePropertyCount } from "@/hooks/filter/filter";
import { useDebouncedValue } from "@/hooks/filter/useDebouncedValue";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";
import BudgetSlider from "@/components/home/filter/BudgetSlider";
import RoomTypeSelector from "@/components/home/filter/RoomTypeSelector";
import SubwayStationSelector from "@/components/home/filter/SubwayStationSelector";
import TypeSelector from "@/components/home/filter/TypeSelector";
import BackHeader from "@/components/layout/header/BackHeader";

import {
  RENT_TYPE_MAP,
  SHARE_ONLY_ROOM_TYPES,
  SHARE_TYPE_MAP,
} from "@/constants/housing-options";

import { FilteredPropertyParams } from "@/types/property";

export type RoomKind = "SHARE" | "RENT";

const Filter = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const {
    selectedTypes,
    setSelectedTypes,
    selectedRoomTypes,
    setSelectedRoomTypes,
    setFilters,
    resetFilters,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
  } = useFilterStore();

  const debouncedMinCost = useDebouncedValue(minWeeklyCost, 500);
  const debouncedMaxCost = useDebouncedValue(maxWeeklyCost, 500);
  const debouncedRadiusKm = useDebouncedValue(radiusKm, 500);

  const mapRoomTypesToApi = (
    selectedTypes: ("쉐어" | "렌트")[],
    selectedRoomTypes: string[],
  ) => {
    const sharePropertySubTypes: string[] = [];
    const rentPropertySubTypes: string[] = [];

    for (const room of selectedRoomTypes) {
      if (selectedTypes.includes("쉐어") && SHARE_TYPE_MAP[room]) {
        sharePropertySubTypes.push(SHARE_TYPE_MAP[room]);
      }
      if (selectedTypes.includes("렌트") && RENT_TYPE_MAP[room]) {
        rentPropertySubTypes.push(RENT_TYPE_MAP[room]);
      }
    }

    return { sharePropertySubTypes, rentPropertySubTypes };
  };

  const buildQueryParams = (
    minCost: number | null,
    maxCost: number | null,
    radiusKm: number | null,
  ): FilteredPropertyParams => {
    const kinds = selectedTypes
      .map(type => (type === "쉐어" ? "SHARE" : "RENT"))
      .filter((k): k is "SHARE" | "RENT" => k !== null);

    const { sharePropertySubTypes, rentPropertySubTypes } = mapRoomTypesToApi(
      selectedTypes,
      selectedRoomTypes,
    );

    const params: FilteredPropertyParams = {
      kinds,
      sharePropertySubTypes,
      rentPropertySubTypes,
      billIncluded: billIncluded ?? false,
      immediate: immediate ?? false,
      negotiable: negotiable ?? false,
    };

    if (minCost !== null) params.minWeeklyCost = minCost;
    if (maxCost !== null) params.maxWeeklyCost = maxCost;
    if (radiusKm !== null) params.radiusKm = radiusKm;

    if (availableFrom && availableTo && availableFrom !== availableTo) {
      params.availableFrom = availableFrom;
      params.availableTo = availableTo;
    }

    return params;
  };

  const params = buildQueryParams(
    debouncedMinCost,
    debouncedMaxCost,
    debouncedRadiusKm,
  );

  const { data: count } = usePropertyCount(params);

  const isDisabled = (type: string) => {
    if (selectedTypes.includes("쉐어") && selectedTypes.includes("렌트"))
      return false;
    if (selectedTypes.includes("쉐어"))
      return !SHARE_ONLY_ROOM_TYPES.includes(type);
    if (selectedTypes.includes("렌트"))
      return SHARE_ONLY_ROOM_TYPES.includes(type);
    return false;
  };

  const toggleType = (type: "쉐어" | "렌트") => {
    setSelectedTypes(prev => {
      const next = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      if (next.length === 0) setSelectedRoomTypes([]);
      return next;
    });
  };

  const toggleRoomType = (type: string) => {
    if (selectedTypes.length === 0) {
      setAlertMessage("매물종류를 선택해주세요");
      return;
    }
    if (isDisabled(type)) return;

    setSelectedRoomTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleReset = () => {
    resetFilters();
  };

  const handleApply = () => {
    const kinds = selectedTypes.map(type =>
      type === "쉐어" ? "SHARE" : "RENT",
    ) as RoomKind[];

    const { sharePropertySubTypes, rentPropertySubTypes } = mapRoomTypesToApi(
      selectedTypes,
      selectedRoomTypes,
    );

    setFilters({
      kinds,
      sharePropertySubTypes,
      rentPropertySubTypes,
      selectedTypes,
      selectedRoomTypes,
      availableFrom,
      availableTo,
    });
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pb-39.5">
      <BackHeader />

      <TypeSelector selectedTypes={selectedTypes} onSelect={toggleType} />
      <Divider />

      <RoomTypeSelector
        selectedRoomTypes={selectedRoomTypes}
        toggleRoomType={toggleRoomType}
        isDisabled={isDisabled}
      />
      <Divider />

      <BudgetSlider />
      <Divider />

      <AvailableDatePicker />
      <Divider />

      <SubwayStationSelector />

      <BottomActionBar
        buttons={[
          { label: "초기화", onClick: handleReset, variant: "outline" },
          {
            label: `매물 ${count}개`,
            onClick: handleApply,
            disabled:
              selectedTypes.length === 0 || selectedRoomTypes.length === 0,
          },
        ]}
      />

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-19"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default Filter;
