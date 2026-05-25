import './Footer.css';

interface FooterProps {
  onOpenLegal: (type: 'impressum' | 'datenschutz') => void;
  onOpenCookies: () => void;
}

export default function Footer({ onOpenLegal, onOpenCookies }: FooterProps) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-copyright">
        © {new Date().getFullYear()} 1618 Digital. Represented by Ömer Arslaner. 
      </div>

      <div className="footer-links">
        <button 
          onClick={() => onOpenLegal('impressum')}
          className="footer-link"
        >
          Impressum
        </button>
        <button 
          onClick={() => onOpenLegal('datenschutz')}
          className="footer-link"
        >
          Datenschutz
        </button>
        <button 
          onClick={onOpenCookies}
          className="footer-link"
        >
          Cookie Settings
        </button>
      </div>
    </footer>
  );
}
