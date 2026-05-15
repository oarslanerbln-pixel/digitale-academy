import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Reel.css';

const words = [
  "CINEMATICS",
  "4K 120FPS",
  "AERIAL DRONE",
  "COLOR GRADING",
  "SOUND DESIGN"
];

export default function Reel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Change word every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reel" className="reel-section">
      <motion.div
        className="glass-panel glow-card reel-glass-panel"
        style={{ '--card-glow': '#ff6a00' } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="reel-video"
        >
          <source src="/video.1.mp4.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Cinematic Vignette Overlay */}
        <div className="reel-vignette" />

        {/* Animated Text Overlay */}
        <div className="reel-text-overlay">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="reel-text"
            >
              {words[index]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
