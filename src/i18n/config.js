import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationHI from './locales/hi.json';
import translationTE from './locales/te.json';
import translationTA from './locales/ta.json';
import translationKN from './locales/kn.json';

const resources = {
    en: { translation: translationEN },
    hi: { translation: translationHI },
    te: { translation: translationTE },
    ta: { translation: translationTA },
    kn: { translation: translationKN },
};

// Get saved language from localStorage, default to English
const savedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,      // 👈 Use saved language
        fallbackLng: 'en',       // 👈 Fallback to English
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;