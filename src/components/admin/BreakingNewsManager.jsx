import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, AlertCircle, Clock, Eye, EyeOff } from 'lucide-react';

const BreakingNewsManager = () => {
    const [breakingNews, setBreakingNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        priority: 1,
        isActive: true,
        startTime: '',
        endTime: '',
        language: 'both'
    });

    useEffect(() => {
        fetchBreakingNews();
    }, []);

    const fetchBreakingNews = async () => {
        // API call
        // const response = await getBreakingNews();
        // setBreakingNews(response.data);

        // Mock data
        setBreakingNews([
            {
                id: 1,
                title: 'లేటెస్ట్: కరీంనగర్‌లో భారీ వర్షాలు',
                url: '/article/heavy-rains',
                priority: 1,
                isActive: true,
                startTime: '2024-12-20T08:00:00',
                endTime: '2024-12-20T20:00:00',
                language: 'telugu',
                views: 1234
            },
            {
                id: 2,
                title: 'Breaking: Major Policy Announcement',
                url: '/article/policy-announcement',
                priority: 2,
                isActive: true,
                startTime: '2024-12-20T10:00:00',
                endTime: '2024-12-21T10:00:00',
                language: 'english',
                views: 856
            }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            // await updateBreakingNews(editingId, formData);
        } else {
            // await createBreakingNews(formData);
        }

        setIsModalOpen(false);
        resetForm();
        fetchBreakingNews();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this breaking news?')) {
            // await deleteBreakingNews(id);
            fetchBreakingNews();
        }
    };

    const toggleActive = async (id, currentStatus) => {
        // await updateBreakingNewsStatus(id, !currentStatus);
        fetchBreakingNews();
    };

    const handleEdit = (news) => {
        setFormData(news);
        setEditingId(news.id);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            url: '',
            priority: 1,
            isActive: true,
            startTime: '',
            endTime: '',
            language: 'both'
        });
        setEditingId(null);
    };

    const isActive = (news) => {
        if (!news.isActive) return false;
        const now = new Date();
        const start = new Date(news.startTime);
        const end = new Date(news.endTime);
        return now >= start && now <= end;
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Breaking News Manager</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                >
                    <Plus size={20} /> Add Breaking News
                </button>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-blue-800">
                    <p className="font-medium">Breaking News Guidelines:</p>
                    <ul className="list-disc ml-5 mt-1">
                        <li>Breaking news will appear as a ticker on the website</li>
                        <li>Priority 1 items appear first</li>
                        <li>News will auto-hide after end time</li>
                        <li>Keep titles concise and impactful</li>
                    </ul>
                </div>
            </div>

            {/* Breaking News List */}
            <div className="space-y-4">
                {breakingNews
                    .sort((a, b) => a.priority - b.priority)
                    .map((news) => (
                        <div
                            key={news.id}
                            className={`bg-white rounded-lg shadow overflow-hidden border-l-4 ${isActive(news) ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">
                                                PRIORITY {news.priority}
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${news.language === 'telugu' ? 'bg-orange-100 text-orange-800' :
                                                news.language === 'english' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-purple-100 text-purple-800'
                                                }`}>
                                                {news.language.toUpperCase()}
                                            </span>
                                            {isActive(news) ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium flex items-center gap-1">
                                                    <Eye size={12} /> LIVE
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium flex items-center gap-1">
                                                    <EyeOff size={12} /> INACTIVE
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold mb-2">{news.title}</h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                Start: {new Date(news.startTime).toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                End: {new Date(news.endTime).toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye size={14} />
                                                {news.views} views
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600">
                                            Link: <a href={news.url} className="text-blue-600 hover:underline">{news.url}</a>
                                        </p>
                                    </div>

                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => toggleActive(news.id, news.isActive)}
                                            className={`p-2 rounded-lg ${news.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                                } hover:bg-opacity-80`}
                                            title={news.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            {news.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(news)}
                                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(news.id)}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {breakingNews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Breaking News</h3>
                    <p className="text-gray-500 mb-4">Add your first breaking news item</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Add Breaking News
                    </button>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {editingId ? 'Edit Breaking News' : 'Add Breaking News'}
                            </h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="e.g., Breaking: Major Announcement"
                                        required
                                        maxLength={150}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{formData.title.length}/150 characters</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Article URL *</label>
                                    <input
                                        type="text"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="/article/breaking-news"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Priority *</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            <option value={1}>1 - Highest</option>
                                            <option value={2}>2 - High</option>
                                            <option value={3}>3 - Medium</option>
                                            <option value={4}>4 - Low</option>
                                            <option value={5}>5 - Lowest</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Language *</label>
                                        <select
                                            value={formData.language}
                                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            <option value="both">Both Languages</option>
                                            <option value="telugu">Telugu Only</option>
                                            <option value="english">English Only</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Start Time *</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">End Time *</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                    >
                                        <Save size={18} /> {editingId ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreakingNewsManager;