import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoPlayer = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const getEmbedUrl = (url) => {
        // YouTube watch URL
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // YouTube short URL
        if (url.includes('youtu.be')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // YouTube embed URL
        if (url.includes('youtube.com/embed')) {
            return url;
        }
        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('vimeo.com/')[1];
            return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8"
        >
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                {!isPlaying ? (
                    /* Thumbnail with Play Button */
                    <div
                        className="relative cursor-pointer group"
                        onClick={() => setIsPlaying(true)}
                    >
                        <div className="relative" style={{ paddingBottom: '56.25%' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                                >
                                    <Play className="text-white fill-white ml-1" size={36} />
                                </motion.div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                                VIDEO
                            </span>
                            <h4 className="text-white font-bold mt-2 text-lg">{video.title}</h4>
                        </div>
                    </div>
                ) : (
                    /* Video Player */
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            src={`${getEmbedUrl(video.url)}?autoplay=1`}
                            title={video.title}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-primary transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Video Caption */}
                {video.caption && (
                    <div className="bg-gray-800 p-4">
                        <div className="flex items-center space-x-2 text-primary mb-2">
                            <Play size={16} />
                            <span className="text-sm font-bold uppercase">Video</span>
                        </div>
                        <p className="text-white text-sm">{video.caption}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default VideoPlayer;