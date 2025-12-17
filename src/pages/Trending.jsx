import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Eye, ArrowRight, Flame } from 'lucide-react';
import { allArticles } from '../data/newsData';
import RightSidebar from '../components/layout/RightSidebar';

const Trending = () => {
    const trendingArticles = allArticles.slice(0, 10);

    return (
        <div className="mt-[140px] min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <h1 className="text-3xl md:text-4xl font-black uppercase flex items-center">
                                <Flame className="text-primary mr-3" size={32} />
                                Trending Now
                            </h1>
                            <p className="text-gray-600 mt-2">Most popular stories of the day</p>
                        </motion.div>

                        {/* Trending Articles */}
                        <div className="space-y-4">
                            {trendingArticles.map((article, index) => (
                                <Link key={article.id} to={`/article/${article.slug}`}>
                                    <motion.article
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group flex"
                                    >
                                        {/* Rank */}
                                        <div className={`w-20 flex items-center justify-center font-black text-3xl ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                                                index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                                                    'bg-gray-100 text-gray-500'
                                            }`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        {/* Image */}
                                        <div className="w-40 h-32 flex-shrink-0">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4">
                                            <span className="text-primary text-xs font-bold uppercase">
                                                {article.category}
                                            </span>
                                            <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-gray-500 text-sm">
                                                <span className="flex items-center">
                                                    <Eye size={14} className="mr-1" />
                                                    {article.views} views
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock size={14} className="mr-1" />
                                                    {article.time}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="w-12 flex items-center justify-center text-gray-300 group-hover:text-primary transition-colors">
                                            <ArrowRight size={24} />
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-36">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;