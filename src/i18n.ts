import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "meta_title": "AI Agency Berlin | 3D SaaS & Cinematic Productions",
      "meta_description": "Digitale Academy builds premium 3D SaaS ecosystems, AI voice agents, and cinematic cinematography in Berlin. High-end digital architecture for forward-thinking businesses.",
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
      "works_title": "Selected Ecosystems",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digital identity and media presence for Berlin's premier street food brand.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium event management platform with tailored digital flows.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-end cinematic gateway for a creative production studio.",
      "about_title": "Philosophy",
      "about_subtitle": "Rational. Ethical. Pragmatic.",
      "about_text": "We don’t believe in bloated code or empty promises. We believe in functional aesthetics and robust digital infrastructure. Our goal is to save you time and build scalable systems that work tirelessly in the background, allowing you to focus on your core business.",
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
      "stat_uptime": "AI Uptime"
    }
  },
  de: {
    translation: {
      "meta_title": "KI-Agentur Berlin | 3D SaaS & Kino-Produktionen",
      "meta_description": "Digitale Academy entwickelt erstklassige 3D-SaaS-Ökosysteme, KI-Sprachagenten und kinoreife Produktionen in Berlin. High-End-Architektur für moderne Unternehmen.",
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
      "works_title": "Ausgewählte Ökosysteme",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digitale Identität und Medienpräsenz für Berlins führende Street-Food-Marke.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium-Event-Management-Plattform mit maßgeschneiderten digitalen Abläufen.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-End-Kino-Portal für ein kreatives Produktionsstudio.",
      "about_title": "Philosophie",
      "about_subtitle": "Rational. Ethisch. Pragmatisch.",
      "about_text": "Wir glauben nicht an aufgeblähten Code oder leere Versprechungen. Wir glauben an funktionale Ästhetik und robuste digitale Infrastruktur. Unser Ziel ist es, Ihnen Zeit zu sparen und skalierbare Systeme zu entwickeln, die unermüdlich im Hintergrund arbeiten, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
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
      "stat_uptime": "KI-Uptime"
    }
  },
  tr: {
    translation: {
      "meta_title": "Yapay Zeka Ajansı Berlin | 3D SaaS & Sinematik Prodüksiyon",
      "meta_description": "Digitale Academy; premium 3D SaaS ekosistemleri, yapay zeka sesli asistanları ve üst düzey sinematik çekimler geliştirir. Berlin merkezli dijital mimari.",
      "hero_title": "Dijital ekosistemler inşa ediyoruz.",
      "hero_subtitle": "Basit web sitelerinin ötesine geçiyoruz. Geleceği düşünen işletmeler için 3D SaaS ürünleri, Yapay Zeka Ses Asistanları ve Üst Düzey Prodüksiyonlar geliştiriyoruz.",
      "hero_button": "Ekosistemleri Keşfet",
      "service_saas_title": "SaaS & Özel İş Akışları",
      "service_saas_desc": "3D Konfigüratörler, özel rezervasyon motorları ve işletmelere özel paneller.",
      "service_ai_title": "Yapay Zeka Ses Asistanları",
      "service_ai_desc": "Tüm potansiyel müşterileri yakalamak için 7/24 insan benzeri sesli asistanlar.",
      "service_media_title": "Premium Prodüksiyon",
      "service_media_desc": "Sinematik drone çekimleri ve DaVinci Resolve renk yapılandırması.",
      "service_social_title": "Sosyal Medya Paketleri",
      "service_social_desc": "Instagram ve TikTok için yüksek etkileşimli kısa videolar ve içerik stratejileri.",
      "service_event_title": "Etkinlik ve Düğün Sinematografisi",
      "service_event_desc": "Duygusal anların en yüksek çözünürlükte ve estetik mükemmellikte ölümsüzleştirilmesi.",
      "service_trailer_title": "Sinematik Hikaye Anlatımı",
      "service_trailer_desc": "Vizyonunuzu büyüleyici bir görsel deneyime dönüştüren üst düzey fragman ve tanıtımlar.",
      "contact_button": "Birlikte İnşa Edelim",
      "language": "TR",
      "works_title": "Seçili Ekosistemler",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Berlin'in önde gelen sokak yemeği markası için dijital kimlik ve medya varlığı.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Özel dijital akışlara sahip premium etkinlik yönetimi platformu.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "Yaratıcı bir prodüksiyon stüdyosu için üst düzey sinematik vitrin.",
      "about_title": "Felsefemiz",
      "about_subtitle": "Rasyonel. Etik. Pragmatik.",
      "about_text": "Şişirilmiş kodlara veya boş vaatlere inanmıyoruz. İşlevsel estetiğe ve sağlam dijital altyapıya inanıyoruz. Amacımız size zaman kazandırmak ve arka planda yorulmaksızın çalışarak kendi işinize odaklanmanızı sağlayacak ölçeklenebilir sistemler inşa etmektir.",
      "contact_title": "Bir Proje Başlatın",
      "contact_name": "İsminiz",
      "contact_email": "E-posta Adresiniz",
      "contact_message": "Proje Detayları...",
      "contact_send": "Mesaj Gönder",
      "contact_success": "Mesajınız alındı. Sizinle en kısa sürede iletişime geçeceğiz.",
      "contact_dsgvo_consent": "Verilerimin gizlilik politikasına uygun şekilde işlenmesini kabul ediyorum. Verilerim yalnızca talebimin işlenmesi için kullanılacak ve üçüncü taraflarla paylaşılmayacaktır.",
      "stat_projects": "Projeler",
      "stat_clients": "Müşteriler",
      "stat_satisfaction": "Memnuniyet",
      "stat_uptime": "AI Uptime"
    }
  }
};

const getUserLanguage = () => {
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang) return storedLang;

  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'de', 'tr'];
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
