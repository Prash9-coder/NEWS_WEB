import { motion } from 'framer-motion'
import { useState } from 'react'
import NewsCard from '../NewsCard'

const CategoryTabs = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = ['All', 'Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science']

    const newsData = {
        Politics: [
            {
                title: "Parliament Passes Historic Education Reform Bill",
                excerpt: "Major changes in education policy aim to revolutionize learning",
                image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
                category: "Politics",
                time: "1 hour ago"
            },
            {
                title: "State Elections: High Voter Turnout Recorded",
                excerpt: "Record numbers seen across all constituencies in crucial state polls",
                image: "https://images.unsplash.com/photo-1495555961986-6d4c37a2ffc1?w=600&h=400&fit=crop",
                category: "Politics",
                time: "3 hours ago"
            }
        ],
        Technology: [
            {
                title: "Indian Startup Launches Revolutionary AI Platform",
                excerpt: "New AI technology promises to transform healthcare diagnostics",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
                category: "Technology",
                time: "30 mins ago"
            },
            {
                title: "5G Network Coverage Expands to Rural Areas",
                excerpt: "Digital India initiative reaches new milestone with rural connectivity",
                image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=400&fit=crop",
                category: "Technology",
                time: "2 hours ago"
            }
        ],
        Sports: [
            {
                title: "Indian Athletes Shine at International Championship",
                excerpt: "Record medal haul brings glory to the nation",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
                category: "Sports",
                time: "45 mins ago"
            },
            {
                title: "Cricket: New Tournament Format Announced",
                excerpt: "BCCI unveils exciting changes for upcoming season",
                image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
                category: "Sports",
                time: "4 hours ago"
            }
        ]
    }

    const allNews = Object.values(newsData).flat()

    return (
        <section className="mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h2 className="text-3xl font-black mb-6">Latest News</h2>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${activeCategory === category
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* News Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {(activeCategory === 'All' ? allNews : newsData[activeCategory] || []).map((news, index) => (
                    <NewsCard key={index} news={news} index={index} />
                ))}
            </motion.div>
        </section>
    )
}

export default CategoryTabs