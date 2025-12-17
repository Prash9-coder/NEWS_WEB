import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;