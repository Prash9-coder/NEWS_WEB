import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getArticlesByCategory } from '../data/newsData';
import NewsCard from '../components/common/NewsCard';
import RightSidebar from '../components/layout/RightSidebar';
import { Newspaper } from 'lucide-react';

const CategoryPage = () => {
    const { t } = useTranslation();
    const { category, subcategory } = useParams();
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const articles = getArticlesByCategory(categoryName);

    return (
        <div className="mt-[140px] min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-[60px]">
                    {/* Main Content - 8 columns */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <Newspaper className="text-primary" size={32} />
                                <h1 className="text-3xl md:text-4xl font-black uppercase">
                                    {subcategory ? `${categoryName} / ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}` : t(`category.${category.toLowerCase()}`) || `${categoryName} News`}
                                </h1>
                            </div>
                            <p className="text-gray-600">
                                {t('category.latestFrom')} {category.toLowerCase()}
                            </p>
                        </motion.div>

                        {articles.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {articles.map((article, index) => (
                                    <NewsCard key={article.id} news={article} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <Newspaper size={64} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-600 text-lg">No articles found in this category.</p>
                                <p className="text-gray-400 mt-2">Check back later for updates!</p>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - 4 columns - FIXED POSITION */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-[150px]">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;