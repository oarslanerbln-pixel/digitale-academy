import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, ArrowUpRight } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import './WhatsAppWidget.css';

export default function WhatsAppWidget() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Close tooltip on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close tooltip on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wa-widget-wrapper')) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getWhatsAppLink = () => {
    const message = t('wa_message');
    return `https://wa.me/491787277867?text=${encodeURIComponent(message)}`;
  };

  const handleConnectWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClick();
    window.open(getWhatsAppLink(), '_blank');
  };

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText('+491787277867');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleWidgetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On mobile or touch-enabled devices, toggle the tooltip
    // On desktop, click opens WhatsApp directly since hovering already expands it
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      playClick();
      setIsExpanded(prev => !prev);
    } else {
      handleConnectWhatsApp();
    }
  };

  return (
    <div className="wa-widget-wrapper">
      {/* Floating Action Button */}
      <motion.button
        className="wa-floating-btn"
        onClick={handleWidgetClick}
        onMouseEnter={() => {
          // Hover only on desktop
          const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouch) {
            playTick();
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouch) {
            setIsExpanded(false);
          }
        }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Green Ambient Glow */}
        <span className="wa-btn-pulse" />
        
        {/* Technical Rotating Frame Line */}
        <span className="wa-btn-frame" />

        {/* WhatsApp Icon */}
        <MessageCircle size={22} className="wa-icon" />

        {/* Online Status Dot Indicator */}
        <span className="wa-status-dot" />
      </motion.button>

      {/* Expanded Hover/Touch Detail Tooltip */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="wa-detail-tooltip hud-scanline-container"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
              if (!isTouch) setIsExpanded(true);
            }}
            onMouseLeave={() => {
              const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
              if (!isTouch) setIsExpanded(false);
            }}
          >
            {/* Header info */}
            <div className="wa-tooltip-header">
              <span className="wa-live-tag">{t('wa_operator_online')}</span>
              <span className="wa-tech-id">SYS.REF // WA-49178</span>
            </div>

            {/* Content box */}
            <div className="wa-tooltip-body" onClick={handleConnectWhatsApp}>
              <h4 className="wa-title">DIGITALE ACADEMY</h4>
              <p className="wa-subtitle">{t('wa_quick_connect')}</p>
              
              <div className="wa-link-preview">
                <span className="wa-phone-number">+49 (0) 178 7277867</span>
                <ArrowUpRight size={14} className="wa-arrow" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="wa-tooltip-actions">
              <button className="wa-action-btn wa-chat-now" onClick={handleConnectWhatsApp}>
                {t('wa_tap_to_chat')}
              </button>
              <button 
                className={`wa-action-btn wa-copy-number ${phoneCopied ? 'is-copied' : ''}`} 
                onClick={handleCopyNumber}
              >
                {phoneCopied ? (
                  <>
                    <Check size={12} />
                    {t('wa_copied')}
                  </>
                ) : (
                  t('wa_copy')
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
