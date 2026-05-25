import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "meta_title": "1618 Digital | 3D SaaS & Cinematic Productions",
      "meta_description": "1618 Digital builds perfectly proportioned 3D SaaS ecosystems, AI voice agents, and cinematic cinematography in Berlin. High-end digital architecture inspired by the Golden Ratio.",
      "hero_title": "We architect digital ecosystems.",
      "hero_subtitle": "Moving beyond simple websites. We build 3D SaaS products, AI Voice Agents, and High-End Productions for forward-thinking businesses.",
      "hero_button": "Explore Ecosystems",
      "service_saas_title": "SaaS & Custom Workflows",
      "service_saas_desc": "3D Configurators, custom booking engines, and dedicated business dashboards.",
      "service_ai_title": "AI Voice Agents",
      "service_ai_desc": "24/7 human-like voice receptionists to capture every lead.",
      "service_media_title": "Premium Production",
      "service_media_desc": "Cinematic drone footage and DaVinci Resolve color grading.",
      "service_social_title": "Social Media Packages",
      "service_social_desc": "High-impact short-form videos and content strategies for Instagram and TikTok.",
      "service_event_title": "Event & Wedding Cinematography",
      "service_event_desc": "Emotional moments captured in high-definition and aesthetic perfection.",
      "service_trailer_title": "Cinematic Storytelling",
      "service_trailer_desc": "High-end teasers and trailers that turn your vision into a captivating visual experience.",
      "contact_button": "Let's Build Together",
      "language": "EN",
      "works_title": "Selected Projects & Productions",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digital identity and media presence for Berlin's premier street food brand.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium event management platform with tailored digital flows.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-end cinematic gateway for a creative production studio.",
      "about_title": "Philosophy",
      "about_subtitle": "Ratio. Ethics.",
      "about_text": "We believe in the Golden Ratio (1.618)—where proportion meets aesthetic perfection. From cutting-edge software development to high-end photo and video production, we merge technological precision with visual mastery. We don't create standard solutions, but tailor-made digital and cinematic experiences that make your brand unforgettable.",
      "contact_title": "Initiate a Project",
      "contact_name": "Your Name",
      "contact_email": "Email Address",
      "contact_message": "Project Details...",
      "contact_send": "Send Transmission",
      "contact_success": "Transmission received. We will contact you shortly.",
      "contact_dsgvo_consent": "I agree to the processing of my data in accordance with the privacy policy. My data will only be used to process my inquiry and will not be shared with third parties.",
      "stat_projects": "Projects",
      "stat_clients": "Clients",
      "stat_satisfaction": "Satisfaction",
      "stat_uptime": "AI Uptime",
      "wa_operator_online": "● OPERATOR ONLINE",
      "wa_quick_connect": "WhatsApp Quick-Connect",
      "wa_tap_to_chat": "TAP TO CHAT",
      "wa_copied": "COPIED",
      "wa_copy": "COPY",
      "wa_message": "Hello, I'm interested in starting a project with 1618 Digital!",
      "nav_home": "HOME",
      "nav_home_sub": "SYS.BOOT // CORE INTERFACE",
      "nav_cinematics": "CINEMATICS",
      "nav_cinematics_sub": "SYS.REEL // AUDIO VISUAL GRID",
      "nav_ecosystems": "PROJECTS",
      "nav_ecosystems_sub": "SYS.WORK // PORTFOLIO & PRODUCTIONS",
      "nav_philosophy": "PHILOSOPHY",
      "nav_philosophy_sub": "SYS.MIND // RATIONAL DESIGN DOCS",
      "nav_capabilities": "CAPABILITIES",
      "nav_capabilities_sub": "SYS.SPEC // STACK CAPABILITIES",
      "nav_initiate": "INITIATE",
      "nav_initiate_sub": "SYS.COMM // TRANSMIT PROPOSAL"
    }
  },
  de: {
    translation: {
      "meta_title": "1618 Digital | 3D SaaS & Kino-Produktionen",
      "meta_description": "1618 Digital entwickelt perfekt proportionierte 3D-SaaS-Ökosysteme, KI-Sprachagenten und kinoreife Produktionen in Berlin. High-End-Architektur nach dem Goldenen Schnitt.",
      "hero_title": "Wir kreieren digitale Ökosysteme.",
      "hero_subtitle": "Mehr als nur einfache Websites. Wir entwickeln 3D SaaS-Produkte, KI-Sprachagenten und High-End-Produktionen für moderne Unternehmen.",
      "hero_button": "Ökosysteme Erkunden",
      "service_saas_title": "SaaS & Custom Workflows",
      "service_saas_desc": "3D-Konfiguratoren, benutzerdefinierte Buchungsmaschinen und unternehmensspezifische Dashboards.",
      "service_ai_title": "KI Sprachagenten",
      "service_ai_desc": "Menschlich klingende Sprachassistenten, die rund um die Uhr Leads generieren.",
      "service_media_title": "Premium Produktion",
      "service_media_desc": "Kinoreife Drohnenaufnahmen und DaVinci Resolve Color Grading.",
      "service_social_title": "Social Media Pakete",
      "service_social_desc": "Wirkungsstarke Kurzvideos und Content-Strategien für Instagram und TikTok.",
      "service_event_title": "Event- & Hochzeitskinematografie",
      "service_event_desc": "Emotionale Augenblicke, festgehalten in höchster Auflösung und ästhetischer Perfektion.",
      "service_trailer_title": "Cinematic Storytelling",
      "service_trailer_desc": "Hochwertige Teaser und Trailer, die Ihre Vision in ein fesselndes visuelles Erlebnis verwandeln.",
      "contact_button": "Zusammen Bauen",
      "language": "DE",
      "works_title": "Ausgewählte Projekte & Produktionen",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digitale Identität und Medienpräsenz für Berlins führende Street-Food-Marke.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium-Event-Management-Plattform mit maßgeschneiderten digitalen Abläufen.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-End-Kino-Portal für ein kreatives Produktionsstudio.",
      "about_title": "Philosophie",
      "about_subtitle": "Proportion. Ethik.",
      "about_text": "Wir glauben an den Goldenen Schnitt (1.618) – wo perfekte Proportion auf Ästhetik trifft. Von der hochmodernen Software-Entwicklung bis hin zu High-End-Foto- und Videoproduktionen vereinen wir technologische Präzision mit visueller Meisterhaftigkeit. Wir kreieren keine Standardlösungen, sondern maßgeschneiderte digitale und visuelle Erlebnisse, die Ihre Marke unvergesslich machen.",
      "contact_title": "Projekt Initiieren",
      "contact_name": "Ihr Name",
      "contact_email": "E-Mail Adresse",
      "contact_message": "Projektdetails...",
      "contact_send": "Senden",
      "contact_success": "Erhalten. Wir melden uns in Kürze bei Ihnen.",
      "contact_dsgvo_consent": "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. Meine Daten werden ausschließlich zur Bearbeitung meiner Anfrage verwendet und nicht an Dritte weitergegeben.",
      "stat_projects": "Projekte",
      "stat_clients": "Kunden",
      "stat_satisfaction": "Zufriedenheit",
      "stat_uptime": "KI-Uptime",
      "wa_operator_online": "● OPERATOR ONLINE",
      "wa_quick_connect": "WhatsApp Schnellkontakt",
      "wa_tap_to_chat": "JETZT CHATTEN",
      "wa_copied": "KOPIERT",
      "wa_copy": "KOPIEREN",
      "wa_message": "Hallo, ich interessiere mich für ein Projekt mit 1618 Digital!",
      "nav_home": "STARTSEITE",
      "nav_home_sub": "SYS.BOOT // HAUPTSCHNITTSTELLE",
      "nav_cinematics": "KINEMATOGRAPHIE",
      "nav_cinematics_sub": "SYS.REEL // AUDIOVISUELLES RASTER",
      "nav_ecosystems": "PROJEKTE",
      "nav_ecosystems_sub": "SYS.WORK // PORTFOLIO & PRODUKTIONEN",
      "nav_philosophy": "PHILOSOPHIE",
      "nav_philosophy_sub": "SYS.MIND // RATIONALE PHILOSOPHIE",
      "nav_capabilities": "KOMPETENZEN",
      "nav_capabilities_sub": "SYS.SPEC // STACK-SPEZIFIKATIONEN",
      "nav_initiate": "KONTAKT",
      "nav_initiate_sub": "SYS.COMM // PROJEKT INITIIGEREN"
    }
  }
};

const getUserLanguage = () => {
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang) return storedLang;

  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'de'];
  return supportedLangs.includes(browserLang) ? browserLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getUserLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

// Update language in localStorage and document lang attribute when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;
});

// Set initial html lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

export default i18n;
