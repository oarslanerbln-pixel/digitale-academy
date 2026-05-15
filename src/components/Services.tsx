import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Mic, Video, Smartphone, Camera, Film } from 'lucide-react';
import { playTick } from '../utils/audio';
import { useRef } from 'react';

/* ════════════════════════════════════════════════════════════════
   SERVICES — Premium Project-Card Style (matches Works)
   ════════════════════════════════════════════════════════════════ */

const cards = [
  {
    icon: Box,
    titleKey: 'service_saas_title',
    descKey: 'service_saas_desc',
    glowColor: '#00ff87',
    tags: ['SaaS', 'React', 'Firebase'],
  },
  {
    icon: Mic,
    titleKey: 'service_ai_title',
    descKey: 'service_ai_desc',
    glowColor: '#8b5cf6',
    tags: ['GPT', 'Automation', 'NLP'],
  },
  {
    icon: Video,
    titleKey: 'service_media_title',
    descKey: 'service_media_desc',
    glowColor: '#f59e0b',
    tags: ['Videography', '3D', 'Motion'],
  },
  {
    icon: Smartphone,
    titleKey: 'service_social_title',
    descKey: 'service_social_desc',
    glowColor: '#06b6d4',
    tags: ['Strategy', 'Content', 'Growth'],
  },
  {
    icon: Camera,
    titleKey: 'service_event_title',
    descKey: 'service_event_desc',
    glowColor: '#f43f5e',
    tags: ['Events', 'Weddings', 'Cinematic'],
  },
  {
    icon: Film,
    titleKey: 'service_trailer_title',
    descKey: 'service_trailer_desc',
    glowColor: '#ec4899',
    tags: ['Trailers', 'Ads', 'Storytelling'],
  },
];

function ServiceCard({ card, index }: { card: any, index: number }) {
  const { t } = useTranslation();
  const Icon = card.icon;
  const ref = useRef(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={playTick}
      className="glass-panel-silver glow-card project-card"
      style={{ 
        ['--card-glow' as string]: card.glowColor,
        y, opacity, scale 
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-card-header">
        <span className="project-card-number">
          {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
        </span>
        <Icon size={24} color="var(--accent-silver)" strokeWidth={1.5} />
      </div>

      <div className="project-card-divider" />

      <div className="project-card-content">
        <h3 className="text-silver project-card-title">
          {t(card.titleKey)}
        </h3>
        <p className="project-card-desc">
          {t(card.descKey)}
        </p>
      </div>

      <div className="project-card-tags">
        {card.tags.map((tag: string) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="services-overline">WHAT WE BUILD</span>
        <h2 className="services-title text-silver">
          {t('hero_button').includes('Ökosystem') || t('hero_button').includes('Ekosistem')
            ? 'Unsere Ökosysteme'
            : 'Our Ecosystems'}
        </h2>
      </motion.div>

      <div className="works-grid">
        {cards.map((card, index) => (
          <ServiceCard key={card.titleKey} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
