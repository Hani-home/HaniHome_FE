"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/auth/useAuth";

const GoogleCallbackPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    login({ code });
  }, [login]);

  return (
    <div className="flex h-screen items-center justify-center">
      {/* 로딩 페이지와 디자인 동일하게 추가 */}
    </div>
  );
};

export default GoogleCallbackPage;
