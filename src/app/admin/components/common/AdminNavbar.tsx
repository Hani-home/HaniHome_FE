"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const AdminNavbar = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center border-b border-gray-200 bg-white px-12 shadow-md">
      {/* 로고 */}
      <button
        onClick={() => router.push("/home")}
        className="flex items-center"
      >
        <Image
          src="/svgs/common/logo-wordmark.svg"
          alt="하니홈 로고"
          width={160}
          height={28}
          priority
        />
      </button>

      {/* 중앙 메뉴 */}
      <nav className="ml-24 flex gap-12">
        <button
          onClick={() => router.push("/admin/verification")}
          className="text-lg text-gray-700 hover:text-mint transition"
        >
          신원 인증
        </button>
        <button
          onClick={() => router.push("/admin/report")}
          className="text-lg text-gray-700 hover:text-mint transition"
        >
          신고
        </button>
        <button
          onClick={() => router.push("/admin/oneOnOneConsult")}
          className="text-lg text-gray-700 hover:text-mint transition"
        >
          1:1 문의
        </button>
      </nav>
    </header>
  );
};

export default AdminNavbar;
