"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import { ListingDummies } from "@/constants/mock/listing-card-dummies";

import ListingCard from "./ListingCard";

const ListingList = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const [likedState, setLikedState] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() =>
    ListingDummies.reduce(
      (acc, cur) => {
        acc[cur.id] = cur.likes;
        return acc;
      },
      {} as Record<number, number>,
    ),
  );

  const toggleLike = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    setLikedState(prev => ({
      ...prev,
      [id]: !prev[id],
    }));

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
    <div className="flex flex-col">
      {ListingDummies.map(listing => (
        <ListingCard
          key={listing.id}
          {...listing}
          likes={likeCounts[listing.id] ?? listing.likes}
          isLiked={likedState[listing.id] ?? false}
          onToggleLike={() => toggleLike(listing.id)}
          onClick={() => handleCardClick(listing.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
