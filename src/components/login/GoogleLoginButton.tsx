"use client";

import GoogleIcon from "@/public/svgs/login/google-icon.svg";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const redirectURI = process.env.NEXT_PUBLIC_GOOGLE_REDIRCET_URI;

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectURI}&scope=openid%20email%20profile`;

    window.location.href = googleAuthUrl;
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
