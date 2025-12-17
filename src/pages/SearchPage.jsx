import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { searchArticles } from '../data/newsData';
import NewsCard from '../components/common/NewsCard';
import RightSidebar from '../components/layout/RightSidebar';
import { Search } from 'lucide-react';

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const results = searchArticles(query);

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
                            <div className="flex items-center space-x-3 mb-2">
                                <Search className="text-primary" size={32} />
                                <h1 className="text-3xl md:text-4xl font-black">Search Results</h1>
                            </div>
                            <p className="text-gray-600">
                                {results.length} result{results.length !== 1 ? 's' : ''} found for "{query}"
                            </p>
                        </motion.div>

                        {results.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {results.map((article, index) => (
                                    <NewsCard key={article.id} news={article} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-bold mb-2">No results found</h3>
                                <p className="text-gray-600">Try different keywords or browse our categories</p>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - FIXED POSITION */}
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

export default SearchPage;