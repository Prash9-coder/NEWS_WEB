import { motion } from 'framer-motion'
import { Clock, User, TrendingUp } from 'lucide-react'

const HeroSection = () => {
    const mainNews = {
        title: "India's Economic Growth Surpasses Expectations in Q4 2024",
        excerpt: "The Indian economy shows remarkable resilience with GDP growth reaching 7.8%, making it one of the fastest-growing major economies globally.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
        category: "Economy",
        author: "Rajesh Kumar",
        time: "2 hours ago",
        trending: true
    }

    const sideNews = [
        {
            title: "Tech Giants Announce Major AI Collaboration",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
            category: "Technology",
            time: "3 hours ago"
        },
        {
            title: "Cricket World Cup: India Defeats Australia in Thriller",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
            category: "Sports",
            time: "5 hours ago"
        },
        {
            title: "Bollywood Celebrates 100 Years of Cinema",
            image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop",
            category: "Entertainment",
            time: "6 hours ago"
        }
    ]

    return (
        <section className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured News */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl"
                >
                    <div className="relative h-[500px]">
                        <img
                            src={mainNews.image}
                            alt={mainNews.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        {mainNews.trending && (
                            <motion.div
                                initial={{ x: -100 }}
                                animate={{ x: 0 }}
                                className="absolute top-6 left-0 bg-primary text-white px-6 py-2 rounded-r-full flex items-center space-x-2 font-bold"
                            >
                                <TrendingUp size={20} />
                                <span>TRENDING</span>
                            </motion.div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4"
                            >
                                {mainNews.category}
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                            >
                                {mainNews.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-200 text-lg mb-6 line-clamp-2"
                            >
                                {mainNews.excerpt}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center space-x-4 text-gray-300 text-sm"
                            >
                                <div className="flex items-center space-x-2">
                                    <User size={16} />
                                    <span>{mainNews.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock size={16} />
                                    <span>{mainNews.time}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.article>

                {/* Side News */}
                <div className="space-y-6">
                    {sideNews.map((news, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 * (index + 1) }}
                            className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                                    {news.category}
                                </span>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {news.title}
                                </h3>
                                <div className="flex items-center text-gray-500 text-xs">
                                    <Clock size={14} className="mr-1" />
                                    {news.time}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection