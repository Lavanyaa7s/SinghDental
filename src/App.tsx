import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/sections/Preloader";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Statistics from "./components/sections/Statistics";
import Services from "./components/sections/Services";
import BeforeAfter from "./components/sections/BeforeAfter";
import Dentists from "./components/sections/Dentists";
import Testimonials from "./components/sections/Testimonials";
import Gallery from "./components/sections/Gallery";
import TreatmentProcess from "./components/sections/TreatmentProcess";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import GlobalAmbientAtmosphere from "./components/ui/GlobalAmbientAtmosphere";
import { useLenis } from "./hooks/useLenis";

function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            key="preloader"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <GlobalAmbientAtmosphere />
          <Navbar />
          <main style={{ position: "relative" }}>
            <Hero />
            <About />
            <Statistics />
            <Services />
            <BeforeAfter />
            <Dentists />
            <Testimonials />
            <Gallery />
            <TreatmentProcess />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
