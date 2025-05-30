"use client";

// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// import { useState } from "react";

import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import LogoSymbol from "@/public/svgs/common/logo-symbol.svg";
import LogoWordmark from "@/public/svgs/common/logo-wordmark.svg";
// import logoLottie from "@/public/lotties/logo-lottie.json";
import GuestIcon from "@/public/svgs/login/guest-icon.svg";

// const Lottie = dynamic(
//   () => import("react-lottie-player").then(mod => mod.default),
//   { ssr: false },
// );

const LoginPage = () => {
  const router = useRouter();
  // const [isLottieReady, setIsLottieReady] = useState(false);
  // const [hasError, setHasError] = useState(false);

  const handleGuestClick = () => {
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-52">
      <div className="flex min-h-[155px] w-[225px] flex-col items-center gap-5 pb-27">
        {/* {!isLottieReady || hasError ? (
          <LogoFallback width={225} height={155} />
        ) : null} */}
        <LogoSymbol width={147} height={104} />
        <LogoWordmark width={225} height={31} />
        {/* 
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
        /> */}
      </div>

      <div className="flex flex-col gap-4 px-4 py-3">
        <GoogleLoginButton />
        <button
          onClick={handleGuestClick}
          className="flex h-6 w-[343px] cursor-pointer items-center justify-center gap-2 bg-white py-[10px]"
        >
          <GuestIcon />
          <span className="text-lab1-b text-mint underline">
            게스트 모드로 시작하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
