import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Statement from "@/components/Statement";
import Details from "@/components/Details";
import Contents from "@/components/Contents";
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
        <Sponsors />
        <Statement />
        <Details />
        <Contents />
        <Organizers />
        <SponsorsTier />
        <div aria-hidden className="h-1.5 w-full bg-brand" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
