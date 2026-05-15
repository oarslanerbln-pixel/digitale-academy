import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { playWhoosh, playTick, playClose } from '../utils/audio';
import './NavigationMenu.css';

export default function NavigationMenu() {
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
      // Small timeout to allow exit animation to finish smoothly
      setTimeout(() => { document.body.style.overflow = ''; }, 500);
    }
  }, [isOpen]);

  const navItems = [
    { label: 'HOME', id: 'hero' },
    { label: 'CINEMATICS', id: 'reel' },
    { label: 'ECOSYSTEMS', id: 'works' },
    { label: 'PHILOSOPHY', id: 'about' },
    { label: 'CAPABILITIES', id: 'services' },
    { label: 'INITIATE', id: 'contact' },
  ];

  return (
    <>
      {/* Fixed Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        onMouseEnter={() => !isOpen && playTick()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`nav-toggle-btn ${isOpen ? 'open' : ''}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full Screen Overlay Matrix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 60px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 60px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 60px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="nav-overlay"
          >
            {/* Nav Links Container */}
            <div className="nav-links-container">
              {navItems.map((item, index) => (
                <div key={item.id} className="nav-link-wrapper">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.1 + (index * 0.05) // Staggered reveal
                    }}
                  >
                    <motion.button
                      onClick={() => scrollTo(item.id)}
                      onMouseEnter={() => playTick()}
                      whileHover={{ scale: 1.05, color: '#00f5d4' }}
                      className="nav-link-btn"
                    >
                      {item.label}
                    </motion.button>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom specific links (WhatsApp etc) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="nav-bottom-links"
            >
              <a 
                href="https://wa.me/491787277867" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-whatsapp-link"
                onMouseEnter={() => {
                  playTick();
                }}
              >
                <MessageCircle size={24} />
                <span>WhatsApp</span>
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
