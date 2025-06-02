"use client";

import { useRouter } from "next/navigation";

import GoogleIcon from "@/public/svgs/login/google-icon.svg";

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    // 실제 로그인 로직은 추후 구현
    // try {
    //   const accessToken = await getGoogleAccessToken(); // 구글 SDK 연동 예정
    //   const res = await axios.post("/api/v1/auth/social/login", {
    //     provider: "google",
    //     token: accessToken,
    //   });

    //   const data = res.data; // 응답 데이터

    //   // 예: { isNewUser, accessToken, refreshToken } 예상
    //   localStorage.setItem("accessToken", data.accessToken);
    //   localStorage.setItem("refreshToken", data.refreshToken);

    //   if (data.isNewUser) {
    //     router.push("/signup/info");
    //   } else {
    //     router.push("/home");
    //   }
    // } catch (err) {
    //   console.error("구글 로그인 에러:", err);
    //   alert("로그인에 실패했습니다.");
    // }

    // 테스트용: 바로 정보 입력 페이지로 이동
    router.push("/signup/info");
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex h-12 w-[343px] cursor-pointer items-center justify-center gap-1 rounded-sm border border-gray-500 bg-white py-[10px]"
    >
      <GoogleIcon />
      <span className="text-body1-sb text-gray-900">구글 계정으로 가입</span>
    </button>
  );
};

export default GoogleLoginButton;
