import type { Metadata } from "next";
import GuideHeader from "@/components/guide/GuideHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NO LOOK PARK 当日ガイド",
    template: "%s｜NO LOOK PARK 当日ガイド",
  },
  description:
    "2026年10月24日（土）NO LOOK PARK の当日ガイド。会場MAP、各コンテンツの紹介、整理券が必要なコンテンツ、スタンプラリーの案内。",
  openGraph: {
    title: "NO LOOK PARK 当日ガイド",
    description:
      "会場MAP、各コンテンツの紹介、整理券が必要なコンテンツ、スタンプラリーの案内。",
    type: "website",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GuideHeader />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
    </>
  );
}
