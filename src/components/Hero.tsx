import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';
import { useRef, MouseEvent } from 'react';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import Hero3DScene from './Hero3DScene';
import './Hero.css';

function MagneticButton({
  children,
  className,
  onClick,
  onMouseEnter: onEnter,
  ...rest
}: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const springX = useSpring(bx, { stiffness: 150, damping: 25 });
  const springY = useSpring(by, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    bx.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    by.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { bx.set(0); by.set(0); }}
      onMouseEnter={onEnter}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
      style={{ x: springX, y: springY }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="hero-section">
      <div className="hero-3d-bg" />

      <div className="hero-content-grid">
        {/* Left column: Text details */}
        <div className="hero-left">
          <motion.h1 
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero_title')}
          </motion.h1>
   
          <motion.p
            className="hero-subtitle font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* ─── Premium Minimalist Actions ─── */}
          <motion.div
            className="hero-actions-v2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary CTA — Minimal line-style */}
            <MagneticButton
              className="hero-btn-primary-v2"
              onMouseEnter={playTick}
              onClick={() => {
                playClick();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="hero-btn-text">{t('hero_button')}</span>
              <span className="hero-btn-arrow">
                <ArrowRight size={16} strokeWidth={2} />
              </span>
              <span className="hero-btn-line" />
            </MagneticButton>

            {/* Divider dot */}
            <span className="hero-actions-dot" />

            {/* Contact Pills — Icon-forward minimal design */}
            <div className="hero-contact-pills">
              <MagneticButton
                className="hero-pill"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  window.open('https://wa.me/491787277867', '_blank');
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <span className="hero-pill-label">WhatsApp</span>
              </MagneticButton>

              <MagneticButton
                className="hero-pill"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  window.location.href = 'mailto:contact@digitale.academy';
                }}
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.5} />
                <span className="hero-pill-label">Email</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Right column: 3D interactive scene */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Hero3DScene modelUrl="/luxury_glass_info_counter.glb" />
        </motion.div>
      </div>
    </section>
  );
}
