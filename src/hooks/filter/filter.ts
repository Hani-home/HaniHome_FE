import { useQuery } from "@tanstack/react-query";

import { fetchPropertyCount } from "@/apis/property";

import { FilteredPropertyParams } from "@/types/property";

export const usePropertyCount = (params: FilteredPropertyParams) => {
  return useQuery({
    queryKey: ["propertyCount", params],
    queryFn: () => fetchPropertyCount(params),
    select: count => count,
    initialData: 0,
  });
};
