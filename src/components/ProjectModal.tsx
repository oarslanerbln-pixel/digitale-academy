import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, Activity, Users, TrendingUp } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';

interface Project {
  id: string;
  url: string;
  titleKey: string;
  descKey: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { t } = useTranslation();

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="modal-overlay"
          onClick={() => { playClick(); onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playTick}
              className="glass-panel modal-close-btn"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="display-h modal-title">
              <span className="text-silver modal-title-text">
                {t(project.titleKey)}
              </span>
            </h2>
            
            <p className="modal-description">
              {t(project.descKey)}
            </p>

            {/* Metrics Area */}
            <div className="modal-metrics-grid">
              <div className="glass-panel modal-metric-card">
                <TrendingUp size={28} color="var(--accent-silver)" />
                <div>
                  <div className="text-silver modal-metric-value">+45%</div>
                  <div className="modal-metric-label">Conversion Rate</div>
                </div>
              </div>
              
              <div className="glass-panel modal-metric-card">
                <Activity size={28} color="var(--accent-silver)" />
                <div>
                  <div className="text-silver modal-metric-value">24/7</div>
                  <div className="modal-metric-label">AI Agent Uptime</div>
                </div>
              </div>

              <div className="glass-panel modal-metric-card">
                <Users size={28} color="var(--accent-silver)" />
                <div>
                  <div className="text-silver modal-metric-value">10k+</div>
                  <div className="modal-metric-label">Monthly Users</div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playTick}
                onClick={playClick}
                className="premium-button premium-button-silver"
              >
                Visit Live Platform <ExternalLink size={20} />
              </a>
              
              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={playTick}
                className="premium-button premium-button-glass"
              >
                Return to Gallery
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
