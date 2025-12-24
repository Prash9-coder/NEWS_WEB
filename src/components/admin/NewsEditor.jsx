import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewsEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: '',
        language: 'english',
        tags: [],
        featuredImage: null,
        gallery: [],
        videoUrl: '',
        reporter: '',
        status: 'draft',
        publishDate: '',
        isFeatured: false,
        isBreaking: false,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: ''
    });

    const [categories, setCategories] = useState([]);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (id) {
            fetchArticle(id);
        }
        fetchCategories();
    }, [id]);

    const fetchArticle = async (articleId) => {
        // API call to fetch article
        // setFormData(response.data);
    };

    const fetchCategories = async () => {
        // API call to fetch categories
        // setCategories(response.data);
    };

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // Upload image to server/cloud
        const formData = new FormData();
        formData.append('image', file);

        // const response = await uploadImage(formData);
        // if (type === 'featured') {
        //   setFormData(prev => ({ ...prev, featuredImage: response.url }));
        // }
    };

    const handleSubmit = async (e, status) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSubmit = { ...formData, status };

            if (id) {
                // await updateArticle(id, dataToSubmit);
            } else {
                // await createArticle(dataToSubmit);
            }

            navigate('/admin/news');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    return (
        <div className="container mx-auto max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{id ? 'Edit Article' : 'Create New Article'}</h1>
                <button
                    onClick={() => navigate('/admin/news')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <X size={24} />
                </button>
            </div>

            <form className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Language *</label>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="english">English</option>
                                <option value="telugu">Telugu</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Summary</label>
                            <textarea
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Content *</label>
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                modules={quillModules}
                                className="bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Media</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Featured Image</label>
                            <div className="flex items-center gap-4">
                                {formData.featuredImage && (
                                    <img src={formData.featuredImage} alt="" className="w-32 h-32 object-cover rounded" />
                                )}
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Upload size={18} />
                                    Upload Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'featured')}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Video URL (YouTube/Vimeo)</label>
                            <input
                                type="url"
                                value={formData.videoUrl}
                                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                    </div>
                </div>

                {/* Tags & Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Tags & Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tags</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2">
                                        {tag}
                                        <X size={14} className="cursor-pointer" onClick={() => removeTag(tag)} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                Featured Article
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isBreaking}
                                    onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                Breaking News
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Publish Date</label>
                            <input
                                type="datetime-local"
                                value={formData.publishDate}
                                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">SEO Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Title</label>
                            <input
                                type="text"
                                value={formData.metaTitle}
                                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <textarea
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={formData.metaKeywords}
                                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 bg-white rounded-lg shadow p-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
                        className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, 'draft')}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        disabled={loading}
                    >
                        Save as Draft
                    </button>

                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, 'pending')}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        disabled={loading}
                    >
                        Submit for Approval
                    </button>

                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, 'published')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        disabled={loading}
                    >
                        <Save size={18} />
                        Publish Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsEditor;