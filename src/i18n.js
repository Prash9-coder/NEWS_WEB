// src/i18n.js

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// ✅ All translations inline (single correct structure)
const resources = {
    en: {
        translation: {
            header: {
                home: "Home",
                india: "India",
                world: "World",
                politics: "Politics",
                business: "Business",
                technology: "Technology",
                sports: "Sports",
                entertainment: "Entertainment",
                lifestyle: "Lifestyle",
                opinion: "Opinion",
                videos: "Videos",
                photos: "Photos",
                trending: "Trending",
                epaper: "E-Paper",
                livetv: "Live TV",
                search: "Search",
                searchPlaceholder: "Search news, topics, videos..."
            },
            subCategories: {
                national: "National Politics",
                state: "State Politics",
                elections: "Elections",
                parliament: "Parliament",
                cricket: "Cricket",
                football: "Football",
                tennis: "Tennis",
                olympics: "Olympics",
                ipl: "IPL 2024",
                bollywood: "Bollywood",
                hollywood: "Hollywood",
                television: "Television",
                music: "Music",
                webSeries: "Web Series"
            },
            breaking: {
                live: "LIVE",
                news: "NEWS",
                breakingNews: "Breaking News",
                welcome: "Welcome to Iqrar Times - Your trusted news source!"
            },
            home: {
                topStories: "Top Stories",
                latestNews: "Latest News",
                viewAll: "View All",
                newsletter: "Newsletter",
                newsletterText: "Subscribe for latest news",
                subscribe: "Subscribe"
            },
            category: {
                latestFrom: "Latest from",
                articles: "Articles",
                noArticles: "No articles found"
            },
            footer: {
                categories: "Categories",
                company: "Company",
                legal: "Legal",
                about: "About Us",
                contact: "Contact",
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                copyright: "All Rights Reserved"
            }
        }
    },

    hi: {
        translation: {
            header: {
                home: "होम",
                india: "भारत",
                world: "विश्व",
                politics: "राजनीति",
                business: "व्यापार",
                technology: "टेक्नोलॉजी",
                sports: "खेल",
                entertainment: "मनोरंजन",
                lifestyle: "जीवनशैली",
                opinion: "राय",
                videos: "वीडियो",
                photos: "फोटो",
                trending: "ट्रेंडिंग",
                epaper: "ई-पेपर",
                livetv: "लाइव टीवी",
                search: "खोजें",
                searchPlaceholder: "समाचार, विषय, वीडियो खोजें..."
            },
            subCategories: {
                national: "राष्ट्रीय राजनीति",
                state: "राज्य राजनीति",
                elections: "चुनाव",
                parliament: "संसद",
                cricket: "क्रिकेट",
                football: "फुटबॉल",
                tennis: "टेनिस",
                olympics: "ओलंपिक",
                ipl: "आईपीएल 2024",
                bollywood: "बॉलीवुड",
                hollywood: "हॉलीवुड",
                television: "टेलीविजन",
                music: "संगीत",
                webSeries: "वेब सीरीज"
            },
            breaking: {
                live: "लाइव",
                news: "समाचार",
                breakingNews: "ब्रेकिंग न्यूज",
                welcome: "इकरार टाइम्स में आपका स्वागत है!"
            },
            home: {
                topStories: "मुख्य खबरें",
                latestNews: "ताज़ा खबरें",
                viewAll: "सभी देखें"
            },
            category: {
                latestFrom: "से ताज़ा खबरें",
                articles: "लेख",
                noArticles: "कोई लेख नहीं मिला"
            },
            footer: {
                categories: "श्रेणियाँ",
                company: "कंपनी",
                legal: "कानूनी",
                about: "हमारे बारे में",
                contact: "संपर्क करें",
                privacy: "गोपनीयता नीति",
                terms: "सेवा की शर्तें",
                copyright: "सर्वाधिकार सुरक्षित"
            }
        }
    },

    te: {
        translation: {
            header: {
                home: "హోమ్",
                india: "భారతదేశం",
                world: "ప్రపంచం",
                politics: "రాజకీయాలు",
                business: "వ్యాపారం",
                technology: "టెక్నాలజీ",
                sports: "క్రీడలు",
                entertainment: "వినోదం",
                lifestyle: "జీవనశైలి",
                opinion: "అభిప్రాయం",
                videos: "వీడియోలు",
                photos: "ఫోటోలు",
                trending: "ట్రెండింగ్",
                epaper: "ఈ-పేపర్",
                livetv: "లైవ్ టీవీ",
                search: "వెతకండి",
                searchPlaceholder: "వార్తలు వెతకండి..."
            },
            subCategories: {
                national: "జాతీయ రాజకీయాలు",
                state: "రాష్ట్ర రాజకీయాలు",
                elections: "ఎన్నికలు",
                parliament: "పార్లమెంట్",
                cricket: "క్రికెట్",
                football: "ఫుట్‌బాల్",
                tennis: "టెన్నిస్",
                olympics: "ఒలింపిక్స్",
                ipl: "ఐపీఎల్ 2024",
                bollywood: "బాలీవుడ్",
                hollywood: "హాలీవుడ్",
                television: "టెలివిజన్",
                music: "సంగీతం",
                webSeries: "వెబ్ సిరీస్"
            },
            breaking: {
                live: "లైవ్",
                news: "వార్తలు",
                breakingNews: "బ్రేకింగ్ న్యూస్",
                welcome: "ఇక్రార్ టైమ్స్‌కు స్వాగతం!"
            },
            home: {
                topStories: "టాప్ స్టోరీలు",
                latestNews: "తాజా వార్తలు",
                viewAll: "అన్నీ చూడండి"
            },
            category: {
                latestFrom: "తాజా వార్తలు",
                articles: "వ్యాసాలు",
                noArticles: "వ్యాసాలు లేవు"
            },
            footer: {
                categories: "కేటగిరీలు",
                company: "కంపెనీ",
                legal: "చట్టపరమైన",
                about: "మా గురించి",
                contact: "సంప్రదించండి",
                privacy: "గోప్యతా విధానం",
                terms: "సేవా నిబంధనలు",
                copyright: "అన్ని హక్కులు"
            }
        }
    }
}

// Get saved language
const savedLanguage = localStorage.getItem('i18nextLng') || 'en'

// Initialize i18n
i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false
    }
})

// ✅ Debug
console.log('🌐 i18n Ready! Language:', i18n.language)

export default i18n
