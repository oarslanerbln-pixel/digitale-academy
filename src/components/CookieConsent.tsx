import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick } from '../utils/audio';
import './CookieConsent.css';

interface CookieConsentProps {
  forceShow?: boolean;
  onCloseForceShow?: () => void;
}

// Export helper to check if analytics is allowed
export function isAnalyticsAllowed(): boolean {
  return localStorage.getItem('digitale_cookie_consent') === 'all';
}

export default function CookieConsent({ forceShow, onCloseForceShow }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted or rejected cookies
    const consent = localStorage.getItem('digitale_cookie_consent');
    if (!consent || forceShow) {
      setIsVisible(true);
    }
  }, [forceShow]);

  const handleAccept = (type: 'all' | 'essential') => {
    playClick();
    localStorage.setItem('digitale_cookie_consent', type);
    setIsVisible(false);
    if (onCloseForceShow) onCloseForceShow();
    // Reload to apply/remove analytics based on choice
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="cookie-consent-wrapper"
        >
          <div className="cookie-consent-header">
            <span className="cookie-consent-icon">🍪</span>
            <h3 className="cookie-consent-title">Cookie Settings</h3>
          </div>
          
          <p className="cookie-consent-text">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten und Analysedaten (Vercel Analytics) zu erfassen. Weitere Informationen finden Sie in unserer{' '}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Scroll-free way to signal parent to open datenschutz modal
                // We dispatch a custom event that App.tsx can listen to
                window.dispatchEvent(new CustomEvent('openDatenschutz'));
              }}
              className="cookie-consent-link"
            >
              Datenschutzerklärung
            </button>.
          </p>

          <div className="cookie-consent-actions">
            <button
              onClick={() => handleAccept('all')}
              className="cookie-consent-btn primary"
            >
              Alle Akzeptieren
            </button>
            <button
              onClick={() => handleAccept('essential')}
              className="cookie-consent-btn secondary"
            >
              Nur Notwendige
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
