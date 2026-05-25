import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/* ─── Animated Counter ─── */
function StatHighlight({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="stat-item"
    >
      <div className="stat-value-container">
        <span className="text-silver stat-highlight-label">
          {label}
        </span>
      </div>
      <p className="stat-highlight-sublabel">
        {sublabel}
      </p>
    </motion.div>
  );
}

const highlights = [
  { label: "Boutique", sublabel: "Quality over Volume" },
  { label: "Focused", sublabel: "Dedicated Attention" },
  { label: "Tailored", sublabel: "Bespoke Solutions" },
  { label: "Elite", sublabel: "Premium Standards" },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="about-layout"
      >
        
        {/* Founder Image Profile */}
        <div className="about-image-container">

          
          <motion.img 
            src="/founder_profile.png" 
            alt="Founder & Digital Architect"
            whileHover={{ scale: 1.02, filter: 'grayscale(0%) contrast(1.1)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="about-profile-img"
          />
        </div>

        {/* Text Details */}
        <div className="about-text-container">
          <h2 className="about-overline">
            {t('about_title')}
          </h2>
          <h3 className="text-silver about-headline">
            {t('about_subtitle')}
          </h3>
          <p className="about-description">
            {t('about_text')}
          </p>
          
          <div className="about-signature">
            <div className="signature-line" />
            <div>
              <p className="text-silver signature-name">
                Ömer Arslaner
              </p>
              <p className="signature-title">
                Digital Architect & Director
              </p>
            </div>
          </div>
        </div>

      </motion.div>

      {/* ─── Premium Value Highlights ─── */}
      <div className="stat-grid">
        {highlights.map((item, idx) => (
          <StatHighlight
            key={idx}
            label={item.label}
            sublabel={item.sublabel}
          />
        ))}
      </div>
    </section>
  );
}
