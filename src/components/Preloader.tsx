import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playWhoosh } from '../utils/audio';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let whooshPlayed = false;
    const duration = 2200; // Cinematic pacing

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      
      let p = elapsedTime / duration;
      if (p > 1) p = 1;
      const easeProgress = 1 - Math.pow(1 - p, 4); // Quartic ease out for long smooth tail
      
      setProgress(Math.floor(easeProgress * 100));

      if (p < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsLoaded(true);
        if (!whooshPlayed) {
            playWhoosh();
            whooshPlayed = true;
        }
        setTimeout(() => {
          onComplete(); 
        }, 1500); // Give the shutter 1.5s to fully animate out before unmounting
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <motion.div
      key="preloader-wrapper"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }} // Fade entirely after shutters are open
      style={{ pointerEvents: isLoaded ? 'none' : 'all' }}
      className="preloader-overlay"
    >
      {/* Top Shutter */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isLoaded ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="preloader-shutter-top"
      />
      
      {/* Bottom Shutter */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isLoaded ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="preloader-shutter-bottom"
      />

      {/* Cinematic Center Stage */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
            opacity: isLoaded ? 0 : 1, 
            scale: isLoaded ? 1.05 : 1,
            filter: isLoaded ? 'blur(12px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="preloader-stage"
      >
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="preloader-brand"
        >
            1618 Digital
        </motion.div>
        
        {/* Exquisitely thin progress line */}
        <div className="preloader-track">
            <motion.div 
                style={{ width: `${progress}%` }}
                className="preloader-bar"
            />
        </div>
        
        {/* Minimalist % counter */}
        <div className="preloader-counter">
            {progress}%
        </div>
      </motion.div>
    </motion.div>
  );
}
