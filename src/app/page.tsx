"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

export default function RootRedirectPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    } else {
      router.replace("/auth/login");
    }
  }, [isLoggedIn, router]);

  return null;
}
