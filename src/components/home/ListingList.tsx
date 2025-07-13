"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { usePropertySearch } from "@/hooks/filter/useFilter";
import { usePropertyList } from "@/hooks/property/useProperty";

import { buildQueryParams } from "@/utils/buildQueryParams";

import { SummaryProperty } from "@/types/property";

import ListingCard from "./ListingCard";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const ListingList = () => {
  const router = useRouter();
  const { isLoggedIn, isAuthInitialized } = useAuthStore();
  const { openModal } = useLoginModalStore();
  const {
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
  } = useFilterStore();

  const params = buildQueryParams({
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
  });

  const { data: listData } = usePropertyList<"SUMMARY">({
    view: "SUMMARY",
    enabled: isAuthInitialized && !isLoggedIn,
  });

  const { data: searchData } = usePropertySearch(params, {
    enabled: isAuthInitialized && isLoggedIn,
  });

  const [likedState, setLikedState] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  const properties: SummaryProperty[] = useMemo(() => {
    return isLoggedIn ? (searchData?.list ?? []) : (listData ?? []);
  }, [isLoggedIn, searchData, listData]);

  useEffect(() => {
    if (!properties.length) return;

    setLikeCounts(prev => {
      if (Object.keys(prev).length === properties.length) return prev;

      const init: Record<number, number> = {};
      properties.forEach(p => {
        init[p.id] = p.wishCount ?? 0;
      });
      return init;
    });
  }, [properties]);

  const toggleLike = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setLikedState(prev => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts(prev => ({
      ...prev,
      [id]: prev[id] + (likedState[id] ? -1 : 1),
    }));
  };

  const handleCardClick = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    router.push(`/listings/${id}`);
  };

  return (
    <div className="flex flex-1 flex-col">
      {properties?.map(p => (
        <ListingCard
          key={p.id}
          id={p.id}
          thumbnailUrl={p.thumbnailUrl}
          weeklyCost={p.weeklyCost}
          tradeStatus={p.tradeStatus}
          internalArea={p.internalArea}
          totalFloors={p.totalFloors}
          propertySubType={p.propertySubType}
          billIncluded={p.billIncluded}
          suburb={p.suburb}
          createdAt={p.createdAt}
          wishCount={likeCounts[p.id] ?? 0}
          isLiked={likedState[p.id] ?? false}
          onToggleLike={() => toggleLike(p.id)}
          onClick={() => handleCardClick(p.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
