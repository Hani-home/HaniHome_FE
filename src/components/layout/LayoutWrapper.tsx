"use client";

import { usePathname } from "next/navigation";

import TabBar from "@/components/layout/TabBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showBottomNavbarPaths = ["/home", "/wishlist", "/viewing", "/mypage"];

  const showNavbar = showBottomNavbarPaths.includes(pathname);

  return (
    <>
      {children}
      {showNavbar && <TabBar />}
    </>
  );
};

export default LayoutWrapper;
