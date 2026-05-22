import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import TrustFactors from "./components/TrustFactors";
import CTA from "./components/CTA";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <TrustFactors />
        <CTA />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
