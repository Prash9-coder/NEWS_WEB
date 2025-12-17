import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ThumbsUp, Reply } from 'lucide-react';

const CommentSection = () => {
    const { t } = useTranslation();
    const [newComment, setNewComment] = useState('');

    const comments = [
        {
            id: 1,
            author: 'Rahul Sharma',
            avatar: 'https://i.pravatar.cc/150?img=11',
            content: 'Great article! Very informative and well-researched.',
            time: '2 hours ago',
            likes: 12
        },
        {
            id: 2,
            author: 'Priya Patel',
            avatar: 'https://i.pravatar.cc/150?img=9',
            content: 'This is exactly what we needed. Thank you for sharing!',
            time: '5 hours ago',
            likes: 8
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            alert('Comment submitted!');
            setNewComment('');
        }
    };

    return (
        <section className="mt-12 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-black mb-6 flex items-center">
                <MessageCircle className="mr-3" />
                {t('article.comments')} ({comments.length})
            </h2>

            <form onSubmit={handleSubmit} className="mb-8">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary outline-none transition-colors resize-none"
                    rows="4"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-3 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-accent transition-colors"
                >
                    {t('article.postComment')}
                </motion.button>
            </form>

            <div className="space-y-6">
                {comments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-200 pb-6 last:border-0"
                    >
                        <div className="flex items-start space-x-4">
                            <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold">{comment.author}</h4>
                                    <span className="text-sm text-gray-500">{comment.time}</span>
                                </div>
                                <p className="text-gray-700 mb-3">{comment.content}</p>
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors">
                                        <ThumbsUp size={16} />
                                        <span className="text-sm">{comment.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors">
                                        <Reply size={16} />
                                        <span className="text-sm">Reply</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CommentSection;