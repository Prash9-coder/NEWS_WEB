import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Clock, Eye, Play } from 'lucide-react';
import { getTrendingArticles, allArticles } from '../../data/newsData';

const RightSidebar = () => {
    const { t } = useTranslation();
    const trending = getTrendingArticles();
    const videos = allArticles.slice(0, 4);

    return (
        <aside className="space-y-6">
            {/* Trending News */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-[60px]">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                    <TrendingUp className="text-primary" size={20} />
                    <h2 className="text-lg font-black uppercase">{t('home.trending')}</h2>
                </div>

                <div className="space-y-4">
                    {trending.map((article, index) => (
                        <Link key={article.id} to={`/article/${article.slug}`}>
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
                                            {article.time}
                                        </span>
                                        <span className="flex items-center">
                                            <Eye size={12} className="mr-1" />
                                            {article.views} {t('article.views')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                    <Play className="text-primary" size={20} />
                    <h2 className="text-lg font-black uppercase">{t('home.videos')}</h2>
                </div>

                <div className="space-y-4">
                    {videos.map((video, index) => (
                        <Link key={video.id} to={`/article/${video.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-lg mb-2">
                                    <img
                                        src={video.image}
                                        alt={video.title}
                                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-lg shadow-md p-6 text-white">
                <h3 className="text-lg font-black mb-2">{t('home.newsletter')}</h3>
                <p className="text-sm mb-4 text-white/90">
                    {t('home.newsletterText')}
                </p>
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-md text-gray-900 text-sm mb-2"
                />
                <button className="w-full bg-white text-primary font-bold py-2 rounded-md hover:bg-gray-100 transition-colors">
                    {t('home.subscribe')}
                </button>
            </div>
        </aside>
    );
};

export default RightSidebar;