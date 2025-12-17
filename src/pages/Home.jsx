import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BreakingNews from '../components/layout/BreakingNews';
import RightSidebar from '../components/layout/RightSidebar';
import NewsCard from '../components/common/NewsCard';
import { allArticles } from '../data/newsData';
import { Clock, User, ArrowRight } from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();
    const featuredArticle = allArticles[0];
    const topStories = allArticles.slice(1, 5);
    const latestNews = allArticles.slice(5);

    return (
        <>
            <BreakingNews />

            {/* Add padding-top to account for fixed header */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content - 8 columns */}
                    <div className="lg:col-span-8 mt-[60px]">
                        {/* Featured Article */}
                        <Link to={`/article/${featuredArticle.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden mb-6 group cursor-pointer hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-[400px]" >
                                    <img
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase mb-3 inline-block">
                                            {featuredArticle.category}
                                        </span>
                                        <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                                            {featuredArticle.title}
                                        </h1>
                                        <p className="text-gray-200 mb-4 line-clamp-2 text-lg">
                                            {featuredArticle.excerpt}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                                            <span className="flex items-center">
                                                <User size={14} className="mr-1" />
                                                {featuredArticle.author.name}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center">
                                                <Clock size={14} className="mr-1" />
                                                {featuredArticle.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Top Stories Grid */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-black uppercase">{t('home.topStories')}</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {topStories.map((article, index) => (
                                    <Link key={article.id} to={`/article/${article.slug}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                                        >
                                            <div className="flex">
                                                <div className="w-40 h-32 flex-shrink-0">
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-3 flex-1">
                                                    <span className="text-primary text-xs font-bold uppercase">
                                                        {article.category}
                                                    </span>
                                                    <h3 className="font-bold text-sm mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock size={12} className="mr-1" />
                                                        {article.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Latest News */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-black uppercase">{t('home.latestNews')}</h2>
                                <Link
                                    to="/category/india"
                                    className="text-primary hover:text-accent flex items-center space-x-1 text-sm font-semibold"
                                >
                                    <span>{t('home.viewAll')}</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {latestNews.map((article, index) => (
                                    <NewsCard key={article.id} news={article} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - 4 columns with FIXED sticky position */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-[150px]">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;