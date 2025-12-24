import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import NewsCard from '../NewsCard'
import { fetchNewsData, getArticlesByCategory } from '../../data/newsData'
import Loader from '../common/Loader'

const CategoryTabs = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [newsData, setNewsData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const categories = ['All', 'Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science']

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchNewsData()
                const fetchedData = {}
                categories.forEach(category => {
                    if (category !== 'All') {
                        fetchedData[category] = getArticlesByCategory(category)
                    }
                })
                setNewsData(fetchedData)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching news data:', err)
                setError(err.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>
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