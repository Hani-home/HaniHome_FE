"use client";

import React from "react";

import {
  formatAdditionalInfo,
  formatCosts,
  formatFurniture,
  formatGuestGender,
  formatHighlights,
  formatIsBrokered,
  formatLivingConditions,
  formatMoveInDates,
  formatPropertyDetails,
} from "@/utils/formatDetails";

import { ListingValueMap } from "@/types/listingDetail";

interface CategoryContentProps<K extends keyof ListingValueMap> {
  keyName: K;
  value: ListingValueMap[K];
}

const CategoryContent = <K extends keyof ListingValueMap>({
  keyName,
  value,
}: CategoryContentProps<K>) => {
  const baseClass = "text-body2-med w-[319px] text-right text-gray-600";

  switch (keyName) {
    case "propertyDetails":
      return (
        <div className={baseClass}>
          {formatPropertyDetails(value as ListingValueMap["propertyDetails"])}
        </div>
      );
    case "furniture":
      return (
        <div className={baseClass}>
          {formatFurniture(value as ListingValueMap["furniture"])}
        </div>
      );
    case "highlights":
      return (
        <div className={baseClass}>{formatHighlights(value as string[])}</div>
      );
    case "isBrokered":
      return (
        <div className={baseClass}>{formatIsBrokered(value as boolean)}</div>
      );
    case "guestGender":
      return (
        <div className={baseClass}>{formatGuestGender(value as string[])}</div>
      );
    case "additionalInfo":
      return (
        <div className={baseClass}>
          {formatAdditionalInfo(value as ListingValueMap["additionalInfo"])}
        </div>
      );
    case "moveInDates":
      return (
        <div className={baseClass}>
          {formatMoveInDates(value as ListingValueMap["moveInDates"])}
        </div>
      );
    case "costs":
      return (
        <div className={baseClass}>
          {formatCosts(value as ListingValueMap["costs"])}
        </div>
      );
    case "livingConditions":
      return (
        <div className={baseClass}>
          {formatLivingConditions(value as ListingValueMap["livingConditions"])}
        </div>
      );
    default:
      if (typeof value === "string") {
        return <div className={baseClass}>{String(value)}</div>;
      }
  }
};

export default CategoryContent;
