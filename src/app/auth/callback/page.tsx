"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

const GoogleCallbackPage = () => {
  const { login, loginError } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    login({ code });
  }, [login]);

  return (
    <div className="flex h-screen items-center justify-center">
      {/* 추후 로딩 페이지와 디자인 동일하게 추가 */}
      {loginError && <p className="text-red">로그인에 실패했습니다.</p>}
    </div>
  );
};

export default GoogleCallbackPage;
