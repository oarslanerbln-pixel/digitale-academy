import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    playClick();
    const langs = ['en', 'de', 'tr'];
    // Handle cases where language might be en-US
    const currentBaseLang = i18n.language.substring(0, 2).toLowerCase();
    const currentIndex = langs.indexOf(currentBaseLang) !== -1 ? langs.indexOf(currentBaseLang) : 0;
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={playTick}
      onClick={toggleLanguage}
      className="glass-panel"
      style={{
        position: 'fixed',
        top: '32px',
        left: '32px',
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        zIndex: 100,
        fontSize: '0.9rem',
        letterSpacing: '1px'
      }}
    >
      {i18n.language.substring(0, 2).toUpperCase()}
    </motion.button>
  );
}
