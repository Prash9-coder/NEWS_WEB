// src/pages/CategoryPage.jsx

import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getArticlesByCategory, debugState } from '../data/newsData';
import NewsCard from '../components/common/NewsCard';
import RightSidebar from '../components/layout/RightSidebar';
import { Newspaper, RefreshCw, Bug } from 'lucide-react';
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
            setError(null);

            try {
                console.log('🌟 CategoryPage useEffect triggered');
                console.log('   URL params:', { category, subcategory });

                const fetchedArticles = await getArticlesByCategory(category, subcategory);

                console.log('🌟 CategoryPage got:', fetchedArticles.length, 'articles');

                setArticles(fetchedArticles);
                setLoading(false);

            } catch (err) {
                console.error('❌ CategoryPage Error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [category, subcategory]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-[140px]">
                <div className="text-center py-8 bg-white rounded-lg shadow-md p-8 max-w-md">
                    <p className="text-red-500 text-xl mb-4">❌ Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={18} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const formatCategoryName = (cat) => {
        return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    };

    const displayCategory = formatCategoryName(category);
    const displaySubcategory = subcategory ? formatCategoryName(subcategory) : null;

    return (
        <div className="mt-[140px] min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-[60px]">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Newspaper className="text-primary" size={32} />
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black uppercase">
                                            {displaySubcategory
                                                ? `${displayCategory} / ${displaySubcategory}`
                                                : displayCategory
                                            }
                                        </h1>
                                        <p className="text-gray-600 mt-1">
                                            {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Articles */}
                        {articles.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {articles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <NewsCard news={article} index={index} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-lg shadow-md p-12 text-center"
                            >
                                <Newspaper size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                                    No Articles Found
                                </h3>
                                <p className="text-gray-500 mb-2">
                                    No content in <strong>{displayCategory}</strong>
                                    {displaySubcategory && ` / ${displaySubcategory}`}
                                </p>
                                <p className="text-sm text-gray-400 mb-6">
                                    Articles might not be available in this category yet.
                                </p>

                                <div className="flex gap-3 justify-center flex-wrap">
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
                                    >
                                        <RefreshCw size={18} />
                                        Refresh Page
                                    </button>

                                    <button
                                        onClick={() => debugState()}
                                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                                    >
                                        <Bug size={18} />
                                        Debug (Console)
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
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