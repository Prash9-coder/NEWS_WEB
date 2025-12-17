import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Radio } from 'lucide-react';

const BreakingNews = () => {
    const { t, i18n } = useTranslation();

    const breakingNewsData = {
        en: [
            "Supreme Court delivers landmark verdict on digital privacy rights",
            "Stock markets hit all-time high amid positive economic indicators",
            "India launches new space mission to explore Mars atmosphere",
        ],
        hi: [
            "सुप्रीम कोर्ट ने डिजिटल गोपनीयता अधिकारों पर ऐतिहासिक फैसला सुनाया",
            "सकारात्मक आर्थिक संकेतकों के बीच शेयर बाजार सर्वकालिक उच्चतम स्तर पर",
            "भारत ने मंगल के वायुमंडल का अध्ययन करने के लिए नया अंतरिक्ष मिशन लॉन्च किया",
        ],
        te: [
            "డిజిటల్ ప్రైవసీ హక్కులపై సుప్రీంకోర్టు చారిత్రాత్మక తీర్పు",
            "సానుకూల ఆర్థిక సూచికల మధ్య స్టాక్ మార్కెట్లు అత్యధిక స్థాయికి చేరుకున్నాయి",
            "మార్స్ వాతావరణాన్ని అన్వేషించడానికి భారతదేశం కొత్త అంతరిక్ష మిషన్‌ను ప్రారంభించింది",
        ],
        ta: [
            "டிஜிட்டல் தனியுரிமை உரிமைகள் குறித்து உச்ச நீதிமன்றம் வரலாற்று தீர்ப்பு",
            "நேர்மறையான பொருளாதார குறிகாட்டிகள் மத்தியில் பங்குச் சந்தைகள் எல்லா காலத்திலும் உயர்வு",
            "செவ்வாய் கிரகத்தின் வளிமண்டலத்தை ஆராய இந்தியா புதிய விண்வெளி பயணத்தை தொடங்கியது",
        ],
        kn: [
            "ಡಿಜಿಟಲ್ ಗೌಪ್ಯತೆ ಹಕ್ಕುಗಳ ಮೇಲೆ ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಐತಿಹಾಸಿಕ ತೀರ್ಪು",
            "ಧನಾತ್ಮಕ ಆರ್ಥಿಕ ಸೂಚಕಗಳ ನಡುವೆ ಷೇರು ಮಾರುಕಟ್ಟೆ ಸಾರ್ವಕಾಲಿಕ ಗರಿಷ್ಠ ಮಟ್ಟವನ್ನು ತಲುಪಿದೆ",
            "ಮಂಗಳದ ವಾತಾವರಣವನ್ನು ಅನ್ವೇಷಿಸಲು ಭಾರತ ಹೊಸ ಬಾಹ್ಯಾಕಾಶ ಮಿಷನ್ ಪ್ರಾರಂಭಿಸಿದೆ",
        ],
    };

    const breakingNews = breakingNewsData[i18n.language] || breakingNewsData.en;

    return (
        <div className="bg-primary text-white mt-[104px]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center py-2">
                    <div className="flex items-center space-x-2 bg-white text-primary px-4 py-1 font-bold text-sm mr-4">
                        <Radio size={14} className="animate-pulse" />
                        <span>{t('breaking.label')}</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            animate={{ x: [1000, -2000] }}
                            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                            className="flex space-x-8 whitespace-nowrap text-sm"
                        >
                            {[...breakingNews, ...breakingNews].map((news, index) => (
                                <span key={index}>{news}</span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;