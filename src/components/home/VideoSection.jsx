import { motion } from 'framer-motion'
import { Play, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchNewsData, allArticles } from '../../data/newsData'
import Loader from '../common/Loader'

const VideoSection = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchNewsData()
                const fetchedVideos = allArticles.filter(article => article.videos && article.videos.length > 0)
                setVideos(fetchedVideos.slice(0, 4))
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

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
        >
            <h2 className="text-2xl font-black mb-6">📺 Video News</h2>

            <div className="space-y-4">
                {videos.map((video, index) => (
                    <motion.article
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative rounded-xl overflow-hidden">
                            <img
                                src={video.image}
                                alt={video.title}
                                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />

                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                    <Play className="text-primary fill-primary ml-1" size={28} />
                                </div>
                            </motion.div>

                            <div className="absolute top-3 right-3">
                                {video.videos && video.videos[0] && video.videos[0].url.includes('live') ? (
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                                    >
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        <span>LIVE</span>
                                    </motion.span>
                                ) : (
                                    <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                                        <Clock size={12} />
                                        <span>{video.videos && video.videos[0] ? video.videos[0].duration : '10:00'}</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className="font-bold mt-3 group-hover:text-primary transition-colors line-clamp-2">
                            {video.title}
                        </h3>
                    </motion.article>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
                Watch More Videos
            </motion.button>
        </motion.section>
    )
}

export default VideoSection
