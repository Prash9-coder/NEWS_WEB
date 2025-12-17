import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, ArrowRight } from 'lucide-react';

const RelatedArticles = ({ articles }) => {
    const { t } = useTranslation();

    if (!articles || articles.length === 0) return null;

    return (
        <section className="mt-12">
            <h2 className="text-3xl font-black mb-6">{t('article.relatedArticles')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                    >
                        <Link to={`/article/${article.slug}`}>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Clock size={14} className="mr-1" />
                                        {article.time}
                                    </div>
                                    <span className="text-primary font-semibold text-sm flex items-center group">
                                        {t('article.readMore')}
                                        <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default RelatedArticles;