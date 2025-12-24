// src/components/layout/BreakingNews.jsx

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Radio, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTrendingArticles, getAllArticles } from '../../data/newsData';

const BreakingNews = () => {
    const { t } = useTranslation();
    const [breakingNews, setBreakingNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBreakingNews = async () => {
            try {
                console.log('📰 BreakingNews: Fetching...');

                // Try trending first, fallback to all articles
                let articles = await getTrendingArticles();

                // If no trending, get latest articles
                if (!articles || articles.length === 0) {
                    console.log('📰 No trending, fetching all articles...');
                    const allArticles = await getAllArticles();
                    articles = allArticles.slice(0, 10); // Get first 10
                }

                if (Array.isArray(articles) && articles.length > 0) {
                    // Extract titles for breaking news ticker
                    const newsTitles = articles
                        .filter(article => article.title && article.title !== '[Removed]')
                        .slice(0, 10) // Limit to 10 items
                        .map(article => article.title);

                    console.log('📰 BreakingNews loaded:', newsTitles.length, 'items');
                    setBreakingNews(newsTitles);
                } else {
                    // Fallback default news
                    setBreakingNews([
                        t('breaking.welcome') || 'Welcome to Iqrar Times - Your trusted news source!'
                    ]);
                }

                setLoading(false);
            } catch (err) {
                console.error('❌ BreakingNews Error:', err);
                setBreakingNews([
                    t('breaking.welcome') || 'Welcome to Iqrar Times - Stay updated with latest news!'
                ]);
                setLoading(false);
            }
        };

        fetchBreakingNews();
    }, [t]);

    // Loading state
    if (loading) {
        return (
            <div className="bg-primary text-white mt-[140px]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center py-2">
                        <div className="flex items-center space-x-2 bg-white text-primary px-4 py-1.5 font-bold text-sm mr-4 rounded">
                            <Radio size={14} className="animate-pulse" />
                            <span>{t('breaking.live') || 'LIVE'}</span>
                        </div>
                        <div className="flex-1 text-sm animate-pulse">
                            {t('common.loading') || 'Loading latest news...'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // No news available
    if (breakingNews.length === 0) {
        return (
            <div className="bg-primary text-white mt-[140px]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center py-2">
                        <div className="flex items-center space-x-2 bg-white text-primary px-4 py-1.5 font-bold text-sm mr-4 rounded">
                            <AlertCircle size={14} />
                            <span>{t('breaking.news') || 'NEWS'}</span>
                        </div>
                        <div className="flex-1 text-sm">
                            {t('breaking.welcome') || 'Welcome to Iqrar Times!'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate animation duration based on content length
    const totalTextLength = breakingNews.join(' • ').length;
    const animationDuration = Math.max(30, totalTextLength * 0.15); // Min 30s, scales with content

    return (
        <div className="bg-primary text-white mt-[140px]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center py-2">
                    {/* Breaking Label */}
                    <div className="flex-shrink-0 flex items-center space-x-2 bg-white text-primary px-4 py-1.5 font-bold text-sm mr-4 rounded shadow-md">
                        <Radio size={14} className="animate-pulse text-red-600" />
                        <span className="uppercase tracking-wide">
                            {t('breaking.live') || 'LIVE'}
                        </span>
                    </div>

                    {/* News Ticker */}
                    <div className="flex-1 overflow-hidden relative">
                        {/* Gradient fade on edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent z-10"></div>

                        <motion.div
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{
                                repeat: Infinity,
                                duration: animationDuration,
                                ease: 'linear'
                            }}
                            className="flex whitespace-nowrap text-sm font-medium"
                        >
                            {breakingNews.map((news, index) => (
                                <span key={index} className="mx-4 flex items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
                                    {news}
                                </span>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {breakingNews.map((news, index) => (
                                <span key={`dup-${index}`} className="mx-4 flex items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
                                    {news}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;