import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { playClick } from '../utils/audio';
import './LegalModal.css';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'impressum' | 'datenschutz' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const content = {
    impressum: {
      title: 'Impressum',
      text: (
        <>
          <p><strong>Angaben gemäß § 5 TMG</strong></p>
          <p>
            1618 Digital<br />
            Represented by: Ömer Arslaner<br />
            Wirmerzeile 4<br />
            13627 Berlin<br />
            Germany<br /><br />
            
            <strong>Contact:</strong><br />
            E-Mail: info@1618-digital.de
          </p>
          <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong></p>
          <p>
            Ömer Faruk Arslaner<br />
            Wirmerzeile 4<br />
            13627 Berlin
          </p>
          <p><strong>EU-Streitschlichtung</strong></p>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p><strong>Verbraucherstreitbeilegung / Universalschlichtungsstelle</strong></p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p><strong>Haftung für Inhalte</strong></p>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p><strong>Haftung für Links</strong></p>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p><strong>Urheberrecht</strong></p>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </>
      )
    },
    datenschutz: {
      title: 'Datenschutzerklärung (DSGVO)',
      text: (
        <>
          <p><strong>1. Datenschutz auf einen Blick</strong></p>
          <p><strong>Allgemeine Hinweise</strong><br/>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

          <p><strong>2. Verantwortlicher</strong></p>
          <p>
            Verantwortlicher im Sinne der DSGVO:<br/>
            <strong>Responsible for data processing:</strong><br/>
            1618 Digital<br/>
            Ömer Arslaner<br/>
            Wirmerzeile 4, 13627 Berlin<br/>
            E-Mail: info@1618-digital.de<br/>
            Telefon: +49 178 7277867
          </p>

          <p><strong>3. Datenerfassung auf unserer Website</strong></p>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
          <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. über das Kontaktformular). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>

          <p><strong>4. Rechtsgrundlage (Art. 6 DSGVO)</strong></p>
          <p>Die Verarbeitung personenbezogener Daten erfolgt auf Basis folgender Rechtsgrundlagen:</p>
          <ul>
            <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (z.B. Cookie Consent, Kontaktformular)</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO – Berechtigtes Interesse (z.B. Webanalyse)</li>
          </ul>

          <p><strong>5. Kontaktformular</strong></p>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>

          <p><strong>6. Hosting und Content Delivery Networks (CDN)</strong></p>
          <p>Wir hosten die Inhalte unserer Website bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen und Meta- und Kommunikationsdaten handeln.</p>
          <p>Weitere Informationen entnehmen Sie der Datenschutzerklärung von Vercel:{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              https://vercel.com/legal/privacy-policy
            </a>
          </p>

          <p><strong>7. Vercel Analytics</strong></p>
          <p>Wir verwenden Vercel Analytics, um anonymisierte Statistiken zur Website-Nutzung zu erfassen und die Performance zu verbessern. Vercel Analytics verwendet keine Cookies und erfasst keine personenbezogenen Daten. IP-Adressen werden nicht gespeichert. Die Nutzung erfolgt nur nach Ihrer Einwilligung über den Cookie-Consent-Banner.</p>

          <p><strong>8. SSL/TLS-Verschlüsselung</strong></p>
          <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>

          <p><strong>9. Ihre Betroffenenrechte</strong></p>
          <p>Sie haben folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
            <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p>Die zuständige Aufsichtsbehörde ist: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstr. 219, 10969 Berlin.</p>

          <p><strong>10. Aufbewahrungsdauer</strong></p>
          <p>Sofern innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Gesetzliche Aufbewahrungspflichten bleiben unberührt.</p>

          <p><strong>11. Schriftarten (Self-Hosted)</strong></p>
          <p>Diese Website verwendet die Schriftart „Outfit". Die Schriftarten sind lokal auf unserem Server gehostet. Es werden keine Verbindungen zu externen Servern (z.B. Google) hergestellt. Somit werden keine personenbezogenen Daten (z.B. Ihre IP-Adresse) an Dritte übertragen.</p>
        </>
      )
    }
  };

  const activeContent = content[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="legal-modal-overlay"
        onClick={() => {
          playClick();
          onClose();
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="legal-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            aria-label="Close modal"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="legal-modal-close-btn"
          >
            <X size={20} />
          </button>

          <h2 className="legal-modal-title">
            {activeContent.title}
          </h2>

          <div className="legal-modal-content">
            {activeContent.text}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
