import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SEOHead Component
 * Dynamically updates document title and meta description based on current language.
 * This ensures search engines and users see the correct local information.
 */
export default function SEOHead() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "1618 Digital";
    const localizedTitle = t('meta_title');
    document.title = `${baseTitle} | ${localizedTitle}`;

    // 2. Update Meta Description & Social Tags
    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', t('meta_description'));
    updateMeta('meta[property="og:title"]', `${baseTitle} | ${localizedTitle}`);
    updateMeta('meta[property="og:description"]', t('meta_description'));
    updateMeta('meta[property="twitter:title"]', `${baseTitle} | ${localizedTitle}`);
    updateMeta('meta[property="twitter:description"]', t('meta_description'));

    // 3. Update HTML Lang attribute
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);

  return null; // This component handles side effects, no UI to render
}
