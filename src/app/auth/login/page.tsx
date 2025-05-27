"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useState } from "react";

import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import logoLottie from "@/public/lotties/logo-lottie.json";
import GuestIcon from "@/public/svgs/login/guest-icon.svg";
import LogoFallback from "@/public/svgs/login/lottie-default.svg";

const Lottie = dynamic(
  () => import("react-lottie-player").then(mod => mod.default),
  { ssr: false },
);

const LoginPage = () => {
  const router = useRouter();
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleGuestClick = () => {
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="min-h-[307px] w-[307px]">
        {!isLottieReady || hasError ? (
          <LogoFallback width={307} height={307} />
        ) : null}

        <Lottie
          animationData={logoLottie}
          play
          loop={false}
          style={{
            width: 307,
            height: 307,
            display: isLottieReady && !hasError ? "block" : "none",
          }}
          onLoad={() => setIsLottieReady(true)}
          onError={() => setHasError(true)}
        />
      </div>

      <div className="flex flex-col gap-[10px] px-4 py-3">
        <GoogleLoginButton />
        <button
          onClick={handleGuestClick}
          className="border-violet flex h-12 w-[343px] cursor-pointer items-center justify-center gap-1 rounded-sm border bg-white py-[10px]"
        >
          <GuestIcon />
          <span className="text-body1-sb text-violet">
            게스트 모드로 시작하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
