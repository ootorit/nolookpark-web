import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Details from "@/components/Details";
import Interviews from "@/components/Interviews";
import Media from "@/components/Media";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import {
  MapSection,
  ContentsSection,
  TicketsSection,
} from "@/components/guide/sections";
import Organizers from "@/components/Organizers";
import SponsorsTier from "@/components/SponsorsTier";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Statement />
        <Details />
        <Media />
        {/* 当日ガイド（/guide）と共通のセクション。見出し id は各セクションの aria-labelledby と対応 */}
        <MapSection
          className="bg-cream px-6 py-20 md:px-12 md:py-24"
          heading={
            <Reveal>
              <SectionHeading id="map-title" jp="会場MAP" en="VENUE MAP" />
            </Reveal>
          }
        />
        <ContentsSection
          className="bg-white px-6 py-20 md:px-12 md:py-24"
          zoneLinks={false}
          cardLinks={false}
          heading={
            <SectionHeading id="contents-title" jp="コンテンツ" en="CONTENTS" />
          }
        />
        <Interviews />
        <TicketsSection
          className="bg-cream px-6 py-20 md:px-12 md:py-24"
          linkTitles={false}
          heading={
            <Reveal>
              <SectionHeading
                id="tickets-title"
                jp="整理券が必要なコンテンツ"
                en="TICKETED CONTENTS"
              />
            </Reveal>
          }
        />
        <Organizers />
        <SponsorsTier />
        <div aria-hidden className="h-1.5 w-full bg-brand" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
