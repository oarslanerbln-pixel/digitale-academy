import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const GlobeBackground = lazy(() => import('./components/GlobeBackground'));
import './components/GlobeBackground.css';
import Preloader from './components/Preloader';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import Reel from './components/Reel';
import About from './components/About';
import Services from './components/Services';
import Works from './components/Works';
import SEOHead from './components/SEOHead';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import NavigationMenu from './components/NavigationMenu';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import MarqueeTextBand from './components/MarqueeTextBand';
import AIChatDrawer from './components/AIChatDrawer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { ReactLenis } from '@studio-freight/react-lenis';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);
  const [forceShowCookies, setForceShowCookies] = useState(false);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoaded]);

  // Listen for global events to open legal modals (e.g. from cookie banner)
  useEffect(() => {
    const handleOpenDatenschutz = () => setLegalModalType('datenschutz');
    const handleOpenImpressum = () => setLegalModalType('impressum');

    window.addEventListener('openDatenschutz', handleOpenDatenschutz);
    window.addEventListener('openImpressum', handleOpenImpressum);

    return () => {
      window.removeEventListener('openDatenschutz', handleOpenDatenschutz);
      window.removeEventListener('openImpressum', handleOpenImpressum);
    };
  }, []);

  return (
    <ReactLenis root>
      <SEOHead />
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* 3D Globe — fixed background */}
      {isLoaded && (
        <Suspense fallback={null}>
          <GlobeBackground />
        </Suspense>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        <CustomCursor />
        <NavigationMenu />
        <LanguageToggle />
        <AIChatDrawer />
        <WhatsAppWidget />
        <CookieConsent forceShow={forceShowCookies} onCloseForceShow={() => setForceShowCookies(false)} />
        <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
        <main>
          <Hero />
          {/* Marquee Band #1 — between Hero and Reel */}
          <MarqueeTextBand direction="left" />
          <Reel />
          <div className="section-divider" />
          <Works />
          {/* Marquee Band #2 — between Works and About, reverse direction */}
          <MarqueeTextBand direction="right" />
          <About />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <Contact />
          <Footer 
            onOpenLegal={(type) => setLegalModalType(type)} 
            onOpenCookies={() => setForceShowCookies(true)} 
          />
        </main>
      </motion.div>
    </ReactLenis>
  );
}

export default App;
