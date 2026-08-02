import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Statement from "@/components/Statement";
import Details from "@/components/Details";
import Contents from "@/components/Contents";
import Organizers from "@/components/Organizers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Sponsors />
      <Statement />
      <Details />
      <Contents />
      <Organizers />
      <Contact />
      <Footer />
    </main>
  );
}
