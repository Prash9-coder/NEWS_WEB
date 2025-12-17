import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Clock, Eye, X } from 'lucide-react';
import RightSidebar from '../components/layout/RightSidebar';

const Videos = () => {
    const { t } = useTranslation();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const videos = [
        {
            id: 1,
            title: "Breaking: Parliament Passes Historic Education Reform Bill",
            thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop",
            duration: "12:45",
            views: "2.5M",
            time: "2 hours ago",
            category: "India",
            videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8"
        },
        {
            id: 2,
            title: "India vs Australia: World Cup Final Highlights",
            thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=450&fit=crop",
            duration: "25:30",
            views: "5.8M",
            time: "3 hours ago",
            category: "Sports",
            videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0"
        },
        {
            id: 3,
            title: "MediAI Launch: Revolutionary Healthcare Platform Demo",
            thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
            duration: "18:20",
            views: "1.2M",
            time: "5 hours ago",
            category: "Technology",
            videoUrl: "https://www.youtube.com/embed/aircAruvnKk"
        },
        {
            id: 4,
            title: "Climate Summit 2024: World Leaders Sign Historic Agreement",
            thumbnail: "https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=800&h=450&fit=crop",
            duration: "32:15",
            views: "890K",
            time: "6 hours ago",
            category: "World",
            videoUrl: "https://www.youtube.com/embed/d0tGBCCE0lc"
        },
        {
            id: 5,
            title: "Sensex Crosses 75,000: Expert Market Analysis",
            thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop",
            duration: "15:40",
            views: "650K",
            time: "8 hours ago",
            category: "Business",
            videoUrl: "https://www.youtube.com/embed/lNzAz5lmJgE"
        },
        {
            id: 6,
            title: "Bollywood 100 Years: Grand Celebration Highlights",
            thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
            duration: "45:00",
            views: "3.2M",
            time: "10 hours ago",
            category: "Entertainment",
            videoUrl: "https://www.youtube.com/embed/pRpeEdMmmQ0"
        },
        {
            id: 7,
            title: "5G Network Expansion: Digital India Achievement",
            thumbnail: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=450&fit=crop",
            duration: "10:25",
            views: "420K",
            time: "12 hours ago",
            category: "Technology",
            videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ"
        },
        {
            id: 8,
            title: "Yoga Gets WHO Recognition: Complete Coverage",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
            duration: "08:30",
            views: "780K",
            time: "14 hours ago",
            category: "Lifestyle",
            videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE"
        },
    ];

    const featuredVideo = videos[0];

    const closeVideo = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="mt-[140px] min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-[60px]">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <h1 className="text-3xl md:text-4xl font-black uppercase flex items-center">
                                <Play className="text-primary mr-3" size={32} />
                                Videos
                            </h1>
                            <p className="text-gray-600 mt-2">Watch latest news videos, interviews, and special coverage</p>
                        </motion.div>

                        {/* Featured Video */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                        >
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => setSelectedVideo(featuredVideo)}
                            >
                                <img
                                    src={featuredVideo.thumbnail}
                                    alt={featuredVideo.title}
                                    className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center"
                                    >
                                        <Play className="text-white fill-white ml-1" size={36} />
                                    </motion.div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                                    {featuredVideo.duration}
                                </div>
                                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-sm font-bold uppercase">
                                    Featured
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-primary text-sm font-bold uppercase">{featuredVideo.category}</span>
                                <h2 className="text-2xl font-black mt-2 mb-3">{featuredVideo.title}</h2>
                                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                                    <span className="flex items-center">
                                        <Eye size={16} className="mr-1" />
                                        {featuredVideo.views} views
                                    </span>
                                    <span className="flex items-center">
                                        <Clock size={16} className="mr-1" />
                                        {featuredVideo.time}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Video Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {videos.slice(1).map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedVideo(video)}
                                    className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                                                <Play className="text-white fill-white ml-1" size={24} />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-primary text-xs font-bold uppercase">{video.category}</span>
                                        <h3 className="font-bold mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center space-x-3 text-gray-500 text-xs">
                                            <span className="flex items-center">
                                                <Eye size={12} className="mr-1" />
                                                {video.views}
                                            </span>
                                            <span className="flex items-center">
                                                <Clock size={12} className="mr-1" />
                                                {video.time}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-[150px]">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
                    onClick={closeVideo}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
                        onClick={closeVideo}
                    >
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Video Player */}
                        <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src={`${selectedVideo.videoUrl}?autoplay=1`}
                                title={selectedVideo.title}
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Video Info */}
                        <div className="bg-gray-900 p-4 rounded-b-lg">
                            <span className="text-primary text-sm font-bold uppercase">{selectedVideo.category}</span>
                            <h3 className="text-white text-xl font-bold mt-1">{selectedVideo.title}</h3>
                            <div className="flex items-center space-x-4 text-gray-400 text-sm mt-2">
                                <span className="flex items-center">
                                    <Eye size={14} className="mr-1" />
                                    {selectedVideo.views} views
                                </span>
                                <span className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    {selectedVideo.time}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Videos;