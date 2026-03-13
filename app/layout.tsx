import type { Metadata } from "next";

import "@/app/globals.css";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | 개인 지식 OS`,
  description:
    "메모, 독서 노트, 링크, 아이디어를 빠르게 쌓고 다시 찾는 개인용 지식 운영체제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
