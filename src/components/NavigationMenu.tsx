import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playWhoosh, playTick, playClose } from '../utils/audio';
import './NavigationMenu.css';

export default function NavigationMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      playWhoosh();
    } else {
      playClose();
    }
    setIsOpen(!isOpen);
  };

  const scrollTo = (id: string) => {
    playClose();
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => { document.body.style.overflow = ''; }, 500);
    }
  }, [isOpen]);

  const navItems = [
    { label: t('nav_home', 'HOME'), id: 'hero', sub: t('nav_home_sub', 'SYS.BOOT // CORE INTERFACE') },
    { label: t('nav_cinematics', 'CINEMATICS'), id: 'reel', sub: t('nav_cinematics_sub', 'SYS.REEL // AUDIO VISUAL GRID') },
    { label: t('nav_ecosystems', 'ECOSYSTEMS'), id: 'works', sub: t('nav_ecosystems_sub', 'SYS.WORK // ARCHITECTED PLATFORMS') },
    { label: t('nav_philosophy', 'PHILOSOPHY'), id: 'about', sub: t('nav_philosophy_sub', 'SYS.MIND // RATIONAL DESIGN DOCS') },
    { label: t('nav_capabilities', 'CAPABILITIES'), id: 'services', sub: t('nav_capabilities_sub', 'SYS.SPEC // STACK CAPABILITIES') },
    { label: t('nav_initiate', 'INITIATE'), id: 'contact', sub: t('nav_initiate_sub', 'SYS.COMM // TRANSMIT PROPOSAL') },
  ];

  return (
    <>
      {/* Fixed Hamburger Button with Dashed Scanner Frame */}
      <motion.button
        onClick={toggleMenu}
        onMouseEnter={() => !isOpen && playTick()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`nav-toggle-btn ${isOpen ? 'open' : ''}`}
        aria-label="Toggle navigation menu"
      >
        <span className="nav-btn-ring" />
        <span className="nav-btn-label font-mono">SYS.NAV // {isOpen ? 'CLOSE' : 'MENU'}</span>
        
        {/* Morphing SVG Lines */}
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ zIndex: 10 }}>
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 5 L 20 5" },
              open: { d: "M 3 19 L 19 3" }
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            d="M 2 11 L 20 11"
            variants={{
              closed: { opacity: 1, scaleX: 1 },
              open: { opacity: 0, scaleX: 0 }
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 17 L 20 17" },
              open: { d: "M 3 3 L 19 19" }
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.button>

      {/* Full Screen Overlay Matrix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 60px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 60px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 60px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="nav-overlay hud-scanline-container"
          >
            {/* Tech grid backdrop */}
            <div className="nav-grid-overlay" />
            <div className="nav-ambient-glow" />

            {/* Corner Brackets */}
            <div className="nav-hud-bracket top-left" />
            <div className="nav-hud-bracket top-right" />
            <div className="nav-hud-bracket bottom-left" />
            <div className="nav-hud-bracket bottom-right" />

            {/* Navigation Content Wrapper for scrolling & vertical centering */}
            <div className="nav-content-wrapper">
              {/* Navigation links container */}
              <div className="nav-links-container">
                {navItems.map((item, index) => (
                  <div key={item.id} className="nav-link-wrapper">
                    <motion.div
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + (index * 0.05)
                      }}
                      style={{ width: '100%' }}
                    >
                      <button
                        onClick={() => scrollTo(item.id)}
                        onMouseEnter={() => playTick()}
                        className="nav-link-btn"
                      >
                        <span className="nav-link-num">0{index + 1}.</span>
                        <span className="nav-link-text">{item.label}</span>
                        <span className="nav-link-sub">{item.sub}</span>
                      </button>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Bottom HUD info & redundant connection */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="nav-bottom-links"
              >
                <a 
                  href={`https://wa.me/491787277867?text=${encodeURIComponent(t('wa_message'))}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="nav-whatsapp-link"
                  onClick={() => playClose()}
                  onMouseEnter={() => playTick()}
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Connection</span>
                </a>
              </motion.div>
            </div>

            {/* HUD Status Coordinates */}
            <div className="nav-hud-status-bar font-mono">
              <span>TERM.CONN // SECURED_TRANS</span>
              <span>NODE.LOC // BERLIN_LAT.52.5200</span>
              <span>SYS.REF // DA-NAV-2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
