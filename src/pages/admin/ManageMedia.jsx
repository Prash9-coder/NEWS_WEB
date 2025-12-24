import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Search, Filter, Grid, List, Download, Copy, Check } from 'lucide-react';

const ManageMedia = () => {
    const [media, setMedia] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [copiedId, setCopiedId] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all', // all, image, video
        search: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        fetchMedia();
    }, [filters]);

    const fetchMedia = async () => {
        // API call
        // const response = await getMedia(filters);
        // setMedia(response.data);
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setIsUploading(true);

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Simulate progress
                for (let i = 0; i <= 100; i += 10) {
                    setUploadProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                // const response = await uploadMedia(formData);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }

        setIsUploading(false);
        setUploadProgress(0);
        fetchMedia();
    };

    const handleDelete = async (ids) => {
        if (window.confirm(`Delete ${ids.length} file(s)?`)) {
            // await deleteMedia(ids);
            setSelectedMedia([]);
            fetchMedia();
        }
    };

    const copyToClipboard = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleSelection = (id) => {
        if (selectedMedia.includes(id)) {
            setSelectedMedia(selectedMedia.filter(mediaId => mediaId !== id));
        } else {
            setSelectedMedia([...selectedMedia, id]);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    const filteredMedia = media.filter(item => {
        let matches = true;
        if (filters.type !== 'all' && item.type !== filters.type) matches = false;
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) matches = false;
        return matches;
    });

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Media Library</h1>
                <div className="flex gap-2">
                    {selectedMedia.length > 0 && (
                        <button
                            onClick={() => handleDelete(selectedMedia)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                            <Trash2 size={18} /> Delete ({selectedMedia.length})
                        </button>
                    )}
                    <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                        <Upload size={18} /> Upload Files
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search files..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Types</option>
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                    </select>

                    <div className="flex gap-2 border rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Media Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-all ${selectedMedia.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                                }`}
                            onClick={() => toggleSelection(item.id)}
                        >
                            <div className="relative aspect-square bg-gray-100">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {selectedMedia.includes(item.id) && (
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                                        <Check size={16} />
                                    </div>
                                )}
                            </div>
                            <div className="p-2">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                                <div className="flex gap-1 mt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(item.url, item.id);
                                        }}
                                        className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center justify-center gap-1"
                                    >
                                        {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                                        {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                                    </button>
                                    <a
                                        href={item.url}
                                        download
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded"
                                    >
                                        <Download size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedMedia.length === filteredMedia.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedMedia(filteredMedia.map(m => m.id));
                                            } else {
                                                setSelectedMedia([]);
                                            }
                                        }}
                                        className="w-4 h-4"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMedia.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedMedia.includes(item.id)}
                                            onChange={() => toggleSelection(item.id)}
                                            className="w-4 h-4"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.type === 'image' ? item.url : item.thumbnail}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{item.url}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatFileSize(item.size)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => copyToClipboard(item.url, item.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Copy URL"
                                            >
                                                {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                            <a
                                                href={item.url}
                                                download
                                                className="text-green-600 hover:text-green-900"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </a>
                                            <button
                                                onClick={() => handleDelete([item.id])}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredMedia.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Upload size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Media Files</h3>
                    <p className="text-gray-500">Upload images or videos to get started</p>
                </div>
            )}
        </div>
    );
};

export default ManageMedia;