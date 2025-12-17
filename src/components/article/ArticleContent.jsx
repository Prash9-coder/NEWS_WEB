import { motion } from 'framer-motion';
import { Clock, User, Eye, Calendar, Tag, Share2 } from 'lucide-react';
import InlineImage from './InlineImage';
import VideoPlayer from './VideoPlayer';
import ImageGallery from './ImageGallery';

const ArticleContent = ({ article }) => {
    // Process content to replace placeholders with media components
    const processContent = () => {
        let content = article.content;

        // Replace image placeholders
        if (article.images) {
            article.images.forEach((image, index) => {
                const placeholder = `{{IMAGE_${index}}}`;
                const imageComponent = `<div class="inline-image-${index}"></div>`;
                content = content.replace(placeholder, imageComponent);
            });

            // Replace gallery placeholder
            const galleryPlaceholder = `{{GALLERY}}`;
            const galleryComponent = `<div class="image-gallery"></div>`;
            content = content.replace(galleryPlaceholder, galleryComponent);
        }

        // Replace video placeholders
        if (article.videos) {
            article.videos.forEach((video, index) => {
                const placeholder = `{{VIDEO_${index}}}`;
                const videoComponent = `<div class="inline-video-${index}"></div>`;
                content = content.replace(placeholder, videoComponent);
            });
        }

        return content;
    };

    const renderContent = () => {
        const processedContent = processContent();
        const div = document.createElement('div');
        div.innerHTML = processedContent;

        // Replace inline images
        if (article.images) {
            article.images.forEach((image, index) => {
                const placeholder = div.querySelector(`.inline-image-${index}`);
                if (placeholder) {
                    const imageElement = document.createElement('div');
                    placeholder.parentNode.replaceChild(imageElement, placeholder);
                }
            });
        }

        return processedContent;
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            {/* Featured Image */}
            <div className="relative h-[500px] overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-primary text-white px-4 py-2 rounded-md text-sm font-bold uppercase">
                        {article.category}
                    </span>
                </div>
            </div>

            <div className="p-8">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900">
                    {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-primary pl-4 italic">
                    {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar size={18} className="text-primary" />
                        <span className="font-medium">{new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Clock size={18} className="text-primary" />
                        <span className="font-medium">{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Eye size={18} className="text-primary" />
                        <span className="font-medium">{article.views} views</span>
                    </div>
                    <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors ml-auto">
                        <Share2 size={18} />
                        <span className="font-semibold">Share</span>
                    </button>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-8 pb-8 border-b-2 border-gray-200 bg-gray-50 p-6 rounded-lg">
                    <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                        <div className="flex items-center space-x-2 mb-1">
                            <User size={16} className="text-primary" />
                            <span className="text-sm text-gray-500 uppercase tracking-wide">Author</span>
                        </div>
                        <h3 className="font-black text-xl text-gray-900">{article.author.name}</h3>
                        <p className="text-gray-600 mt-1">{article.author.bio}</p>
                    </div>
                </div>

                {/* Article Content with Media */}
                <ArticleContentRenderer article={article} />

                {/* Tags */}
                <div className="flex items-center flex-wrap gap-2 pt-8 border-t-2 border-gray-200 bg-gray-50 p-6 rounded-lg">
                    <Tag size={20} className="text-primary" />
                    <span className="font-bold text-gray-700 mr-2">Tags:</span>
                    {article.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
};

// Separate component to render content with media
const ArticleContentRenderer = ({ article }) => {
    const contentParts = article.content.split(/(\{\{[A-Z_0-9]+\}\})/g);

    return (
        <div className="prose prose-lg max-w-none mb-8">
            {contentParts.map((part, index) => {
                // Check for image placeholder
                const imageMatch = part.match(/\{\{IMAGE_(\d+)\}\}/);
                if (imageMatch && article.images) {
                    const imageIndex = parseInt(imageMatch[1]);
                    return <InlineImage key={index} image={article.images[imageIndex]} />;
                }

                // Check for video placeholder
                const videoMatch = part.match(/\{\{VIDEO_(\d+)\}\}/);
                if (videoMatch && article.videos) {
                    const videoIndex = parseInt(videoMatch[1]);
                    return <VideoPlayer key={index} video={article.videos[videoIndex]} />;
                }

                // Check for gallery placeholder
                if (part === '{{GALLERY}}' && article.images) {
                    return <ImageGallery key={index} images={article.images} />;
                }

                // Regular HTML content
                return (
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: part }}
                        style={{
                            lineHeight: '1.8',
                            fontSize: '18px',
                            color: '#374151'
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ArticleContent;