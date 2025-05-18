import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "하니홈",
  description: "해외 거주 한인을 위한 숙소 매칭 플랫폼",
  robots: "index, follow",
  authors: [{ name: "Sujin" }, { name: "Chaeyoung" }],
  icons: {
    icon: "/icons/favicon.svg",
  },
  openGraph: {
    title: "하니홈",
    description: "해외 거주 한인을 위한 숙소 매칭 플랫폼",
    siteName: "하니홈",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto min-h-screen max-w-[768px] min-w-[375px] pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
