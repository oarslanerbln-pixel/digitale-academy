import { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, Video, Grid, Mail, MessageCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import './FloatingHUD.css';

// Premium Magnetic Wrapper
function MagneticButton({ children, onClick, title, as = "button", href }: { children: ReactNode, onClick?: () => void, title?: string, as?: "button" | "a", href?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === "a" ? motion.a : motion.button;
  const isWhatsapp = as === "a";

  return (
    <Component
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      href={href}
      target={as === "a" ? "_blank" : undefined}
      rel={as === "a" ? "noopener noreferrer" : undefined}
      title={title}
      className={`floating-hud-btn ${isWhatsapp ? 'whatsapp' : ''}`}
    >
      {children}
    </Component>
  );
}

export default function FloatingHUD() {
  const scrollTo = (id: string) => {
    playTick(); // C6 tick sound
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { icon: <Home size={18} strokeWidth={1.5} />, id: 'hero', label: 'Home' },
    { icon: <Video size={18} strokeWidth={1.5} />, id: 'reel', label: 'Reel' },
    { icon: <Grid size={18} strokeWidth={1.5} />, id: 'works', label: 'Works' },
    { icon: <Mail size={18} strokeWidth={1.5} />, id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      className="floating-hud-wrapper hud-glass-panel hud-scanline-container"
    >
      {navItems.map((item) => (
        <MagneticButton key={item.id} onClick={() => scrollTo(item.id)} title={item.label}>
          {item.icon}
        </MagneticButton>
      ))}

      {/* Divider */}
      <div className="floating-hud-divider" />

      {/* WhatsApp Button */}
      <MagneticButton
        as="a"
        href="https://wa.me/491787277867"
        onClick={() => playClick()}
        title="WhatsApp"
      >
        <MessageCircle size={18} strokeWidth={1.5} />
      </MagneticButton>
    </motion.div>
  );
}
