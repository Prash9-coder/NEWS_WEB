import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTrendingArticles } from '../../data/newsData';

const BreakingNews = () => {
    const { t } = useTranslation();
    const [breakingNews, setBreakingNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ FIXED: await the async function
                const trendingArticles = await getTrendingArticles();

                // ✅ FIXED: Ensure it's an array before mapping
                if (Array.isArray(trendingArticles) && trendingArticles.length > 0) {
                    const fetchedBreakingNews = trendingArticles.map(article => article.title);
                    setBreakingNews(fetchedBreakingNews);
                } else {
                    setBreakingNews(['Welcome to our News Portal - Stay updated with latest news!']);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news data:', err);
                setBreakingNews(['Welcome to our News Portal - Stay updated with latest news!']);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Don't show loader for breaking news, show placeholder instead
    if (loading) {
        return (
            <div className="bg-primary text-white mt-[104px]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center py-2">
                        <div className="flex items-center space-x-2 bg-white text-primary px-4 py-1 font-bold text-sm mr-4">
                            <Radio size={14} className="animate-pulse" />
                            <span>{t('breaking.label') || 'Breaking'}</span>
                        </div>
                        <div className="flex-1 text-sm">
                            Loading latest news...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary text-white mt-[104px]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center py-2">
                    <div className="flex items-center space-x-2 bg-white text-primary px-4 py-1 font-bold text-sm mr-4">
                        <Radio size={14} className="animate-pulse" />
                        <span>{t('breaking.label') || 'Breaking'}</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            animate={{ x: [1000, -2000] }}
                            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                            className="flex space-x-8 whitespace-nowrap text-sm"
                        >
                            {[...breakingNews, ...breakingNews].map((news, index) => (
                                <span key={index}>• {news}</span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;