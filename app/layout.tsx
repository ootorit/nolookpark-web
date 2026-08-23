import type { Metadata } from "next";
import { Poppins, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["700", "900"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nolookpark-web.vercel.app"),
  title: "NO LOOK PARK｜「みえない」を楽しみつくす体験型イベント",
  description:
    "NO LOOK PARKは「みえない」をコンセプトにした新しい体験型イベント。2026年10月24日（土）、東京・池尻大橋 HOME/WORK VILLAGEにて開催。",
  openGraph: {
    title: "NO LOOK PARK｜「みえない」を楽しみつくす",
    description:
      "2026.10.24 SAT｜東京・池尻大橋。視覚を手放すと、遊びはもっと自由になる。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${poppins.variable} ${notoSansJP.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
