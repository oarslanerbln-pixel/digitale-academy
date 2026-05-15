import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, CheckSquare, Square, Sparkles } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [dsgvoConsent, setDsgvoConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dsgvoConsent) return;
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Holographic Header */}
        <div className="contact-header">
          <h2 className="contact-title">{t('contact_title')}</h2>
          <div className="contact-decorative-line" />
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="contact-success"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles size={52} />
            </motion.div>
            <span>{t('contact_success')}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            
            {/* Input Group */}
            <div className="input-group">
              <div className="input-field-wrapper">
                <input 
                  required 
                  type="text" 
                  placeholder=" "
                  id="contact-name"
                  className="premium-input"
                />
                <label htmlFor="contact-name" className="premium-label">{t('contact_name')}</label>
                <div className="input-focus-border" />
              </div>

              <div className="input-field-wrapper">
                <input 
                  required 
                  type="email" 
                  placeholder=" "
                  id="contact-email"
                  className="premium-input"
                />
                <label htmlFor="contact-email" className="premium-label">{t('contact_email')}</label>
                <div className="input-focus-border" />
              </div>
            </div>

            {/* Textarea */}
            <div className="input-field-wrapper">
              <textarea 
                required 
                rows={5}
                placeholder=" "
                id="contact-message"
                className="premium-input premium-textarea"
              />
              <label htmlFor="contact-message" className="premium-label">{t('contact_message')}</label>
              <div className="input-focus-border" />
            </div>

            {/* DSGVO Consent */}
            <div 
              className={`dsgvo-checkbox-wrapper ${dsgvoConsent ? 'active' : ''}`}
              onClick={() => setDsgvoConsent(!dsgvoConsent)}
            >
              <div className="dsgvo-icon">
                {dsgvoConsent ? (
                  <CheckSquare size={22} color="var(--accent-cyan)" />
                ) : (
                  <Square size={22} color="rgba(255,255,255,0.3)" />
                )}
              </div>
              <p className="dsgvo-text">
                {t('contact_dsgvo_consent')}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: dsgvoConsent ? 1.02 : 1 }}
              whileTap={{ scale: dsgvoConsent ? 0.98 : 1 }}
              type="submit"
              disabled={!dsgvoConsent}
              className={`submit-button ${dsgvoConsent ? 'active' : ''}`}
            >
              {dsgvoConsent && <div className="submit-shimmer" />}
              <span className="submit-text">{t('contact_send')}</span>
              <Send size={20} className="submit-icon" />
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
