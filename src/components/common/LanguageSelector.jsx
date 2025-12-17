import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Globe size={18} />
                <span className="text-sm font-semibold">{currentLanguage.nativeName}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50 overflow-hidden"
                        >
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => changeLanguage(language.code)}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${i18n.language === language.code ? 'bg-gray-50' : ''
                                        }`}
                                >
                                    <div>
                                        <div className="font-semibold text-sm">{language.nativeName}</div>
                                        <div className="text-xs text-gray-500">{language.name}</div>
                                    </div>
                                    {i18n.language === language.code && (
                                        <Check size={16} className="text-primary" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;