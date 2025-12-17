import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const NewsCard = ({ news, index }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
            <Link to={`/article/${news.slug}`}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                        {news.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {news.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                        <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>{news.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{news.time}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default NewsCard;