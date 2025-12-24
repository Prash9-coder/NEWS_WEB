import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Eye, Play } from 'lucide-react';
import { getTrendingArticles, getAllArticles } from '../../data/newsData';

const RightSidebar = () => {
    const { t } = useTranslation();
    const [trending, setTrending] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ FIXED: await async functions
                const fetchedTrending = await getTrendingArticles();
                const allArticlesData = await getAllArticles();

                // ✅ FIXED: Ensure arrays before setting state
                setTrending(Array.isArray(fetchedTrending) ? fetchedTrending : []);
                setVideos(Array.isArray(allArticlesData) ? allArticlesData.slice(0, 4) : []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news data:', err);
                setTrending([]);
                setVideos([]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <aside className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6 mt-[60px]">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex space-x-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="space-y-6">
            {/* Trending News */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-[60px]">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                    <TrendingUp className="text-primary" size={20} />
                    <h2 className="text-lg font-black uppercase">{t('home.trending') || 'Trending'}</h2>
                </div>

                <div className="space-y-4">
                    {trending.length > 0 ? (
                        trending.map((article, index) => (
                            <Link key={article.id || index} to={`/article/${article.slug}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex space-x-3 group cursor-pointer pb-4 border-b last:border-0"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                                            <span className="flex items-center">
                                                <Clock size={12} className="mr-1" />
                                                {article.time || 'Recent'}
                                            </span>
                                            <span className="flex items-center">
                                                <Eye size={12} className="mr-1" />
                                                {article.views || 0} {t('article.views') || 'views'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-4">No trending articles</p>
                    )}
                </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                    <Play className="text-primary" size={20} />
                    <h2 className="text-lg font-black uppercase">{t('home.videos') || 'Videos'}</h2>
                </div>

                <div className="space-y-4">
                    {videos.length > 0 ? (
                        videos.map((video, index) => (
                            <Link key={video.id || index} to={`/article/${video.slug}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-2 bg-gray-200">
                                        <img
                                            src={video.image}
                                            alt={video.title}
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/placeholder.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                                <Play className="text-primary fill-primary ml-1" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-4">No videos available</p>
                    )}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-lg shadow-md p-6 text-white">
                <h3 className="text-lg font-black mb-2">{t('home.newsletter') || 'Newsletter'}</h3>
                <p className="text-sm mb-4 text-white/90">
                    {t('home.newsletterText') || 'Subscribe to get the latest news directly to your inbox.'}
                </p>
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-md text-gray-900 text-sm mb-2"
                />
                <button className="w-full bg-white text-primary font-bold py-2 rounded-md hover:bg-gray-100 transition-colors">
                    {t('home.subscribe') || 'Subscribe'}
                </button>
            </div>
        </aside>
    );
};

export default RightSidebar;