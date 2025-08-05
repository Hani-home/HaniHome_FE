"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export const ScrollHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return null;
};
