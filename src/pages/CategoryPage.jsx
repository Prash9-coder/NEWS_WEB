import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getArticlesByCategory } from '../data/newsData';
import NewsCard from '../components/common/NewsCard';
import RightSidebar from '../components/layout/RightSidebar';
import { Newspaper } from 'lucide-react';
import Loader from '../components/common/Loader';

const CategoryPage = () => {
    const { t } = useTranslation();
    const { category, subcategory } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('📂 CategoryPage: Fetching category:', category);
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

                // IMPORTANT: await the async function
                const fetchedArticles = await getArticlesByCategory(categoryName);

                console.log('✅ CategoryPage: Fetched articles:', fetchedArticles.length);
                setArticles(fetchedArticles);
                setLoading(false);
            } catch (err) {
                console.error('❌ CategoryPage: Error fetching news data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [category]); // Re-fetch when category changes

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center py-8">
                    <p className="text-red-500 text-xl mb-4">❌ Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-accent"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

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
                                    {subcategory
                                        ? `${categoryName} / ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`
                                        : t(`category.${category.toLowerCase()}`) || `${categoryName} News`
                                    }
                                </h1>
                            </div>
                            <p className="text-gray-600">
                                {t('category.latestFrom') || 'Latest from'} {category.toLowerCase()}
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
                                <p className="text-gray-600 text-lg">📰 No articles found in this category.</p>
                                <p className="text-gray-400 mt-2">Check back later for updates!</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-accent"
                                >
                                    Refresh
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - 4 columns */}
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