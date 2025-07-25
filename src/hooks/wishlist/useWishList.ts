import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addWish,
  getMyWishList,
  getWishedProperties,
  removeWish,
} from "@/apis/wishlist";

import { WishListSortType } from "@/types/wishlist";

export const useWishList = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return useQuery({
    queryKey: ["wishList"],
    queryFn: getMyWishList,
    enabled: isLoggedIn,
  });
};

export const useWishedProperties = (sort: WishListSortType = "latest") => {
  return useQuery({
    queryKey: ["wishList", sort],
    queryFn: () => getWishedProperties(sort),
  });
};

export const useToggleWish = (
  refetchKey: (string | number)[] = ["wishList"],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isLiked }: { id: number; isLiked: boolean }) => {
      if (isLiked) {
        await removeWish(id);
      } else {
        await addWish(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: refetchKey });
    },
  });
};
