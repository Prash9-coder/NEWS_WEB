import React, { useState, useEffect } from 'react';
import {
    Upload,
    Trash2,
    Search,
    Grid,
    List,
    Download,
    Copy,
    Check,
    X,
    Image as ImageIcon,
    Video,
    File,
    Filter,
    FolderPlus,
    Folder,
    ChevronRight,
    Eye,
    Edit2,
    Star,
    Clock
} from 'lucide-react';

const MediaLibrary = () => {
    const [media, setMedia] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [copiedId, setCopiedId] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [folders, setFolders] = useState([]);
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewMedia, setPreviewMedia] = useState(null);

    const [filters, setFilters] = useState({
        type: 'all',
        search: '',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortOrder: 'desc'
    });

    useEffect(() => {
        fetchMedia();
        fetchFolders();
    }, [filters, currentFolder]);

    const fetchMedia = async () => {
        // API call
        // const response = await getMedia(filters, currentFolder);
        // setMedia(response.data);

        // Mock data
        setMedia([
            {
                id: 1,
                name: 'breaking-news-thumbnail.jpg',
                url: 'https://picsum.photos/400/300?random=1',
                type: 'image',
                size: 245670,
                dimensions: '1920x1080',
                createdAt: '2024-12-20T10:30:00',
                folder: null,
                isFavorite: true,
                usedIn: 5
            },
            {
                id: 2,
                name: 'sports-championship.jpg',
                url: 'https://picsum.photos/400/300?random=2',
                type: 'image',
                size: 189450,
                dimensions: '1280x720',
                createdAt: '2024-12-19T15:20:00',
                folder: null,
                isFavorite: false,
                usedIn: 3
            },
            {
                id: 3,
                name: 'interview-video.mp4',
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                thumbnail: 'https://picsum.photos/400/300?random=3',
                type: 'video',
                size: 5678900,
                duration: '2:34',
                createdAt: '2024-12-18T09:15:00',
                folder: null,
                isFavorite: false,
                usedIn: 1
            }
        ]);
    };

    const fetchFolders = async () => {
        // API call
        setFolders([
            { id: 1, name: 'Politics', count: 45, createdAt: '2024-01-15' },
            { id: 2, name: 'Sports', count: 32, createdAt: '2024-02-20' },
            { id: 3, name: 'Entertainment', count: 28, createdAt: '2024-03-10' }
        ]);
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            if (currentFolder) formData.append('folder', currentFolder);

            try {
                // Simulate progress
                for (let i = 0; i <= 100; i += 10) {
                    setUploadProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                // const response = await uploadMedia(formData);
                console.log('Uploaded:', file.name);
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
            console.log('Deleting:', ids);
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

    const toggleFavorite = async (id) => {
        // await toggleMediaFavorite(id);
        setMedia(media.map(m =>
            m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
        ));
    };

    const createFolder = async () => {
        if (!newFolderName.trim()) return;

        // await createMediaFolder(newFolderName);
        console.log('Creating folder:', newFolderName);
        setNewFolderName('');
        setShowNewFolderModal(false);
        fetchFolders();
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'image': return <ImageIcon size={20} />;
            case 'video': return <Video size={20} />;
            default: return <File size={20} />;
        }
    };

    const filteredMedia = media.filter(item => {
        let matches = true;

        if (filters.type !== 'all' && item.type !== filters.type) matches = false;
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) matches = false;
        if (currentFolder && item.folder !== currentFolder) matches = false;

        return matches;
    });

    const sortedMedia = [...filteredMedia].sort((a, b) => {
        const order = filters.sortOrder === 'asc' ? 1 : -1;

        switch (filters.sortBy) {
            case 'name':
                return order * a.name.localeCompare(b.name);
            case 'size':
                return order * (a.size - b.size);
            case 'date':
            default:
                return order * (new Date(b.createdAt) - new Date(a.createdAt));
        }
    });

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Media Library</h1>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <button onClick={() => setCurrentFolder(null)} className="hover:text-blue-600">
                            Home
                        </button>
                        {currentFolder && (
                            <>
                                <ChevronRight size={16} />
                                <span className="text-blue-600">
                                    {folders.find(f => f.id === currentFolder)?.name}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowNewFolderModal(true)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <FolderPlus size={18} /> New Folder
                    </button>
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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Files</p>
                            <p className="text-2xl font-bold">{media.length}</p>
                        </div>
                        <File className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Images</p>
                            <p className="text-2xl font-bold">{media.filter(m => m.type === 'image').length}</p>
                        </div>
                        <ImageIcon className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Videos</p>
                            <p className="text-2xl font-bold">{media.filter(m => m.type === 'video').length}</p>
                        </div>
                        <Video className="text-purple-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Size</p>
                            <p className="text-2xl font-bold">
                                {formatFileSize(media.reduce((acc, m) => acc + m.size, 0))}
                            </p>
                        </div>
                        <Download className="text-orange-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Folders */}
            {!currentFolder && folders.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Folders</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {folders.map(folder => (
                            <button
                                key={folder.id}
                                onClick={() => setCurrentFolder(folder.id)}
                                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-left"
                            >
                                <Folder className="text-yellow-500 mb-2" size={32} />
                                <p className="font-medium truncate">{folder.name}</p>
                                <p className="text-xs text-gray-500">{folder.count} files</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters & Search */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search files..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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

                    <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="name">Sort by Name</option>
                        <option value="size">Sort by Size</option>
                    </select>

                    <div className="flex gap-2 border rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex-1 p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        >
                            <Grid size={18} className="mx-auto" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex-1 p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        >
                            <List size={18} className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading files...</span>
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
                    {sortedMedia.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-all hover:shadow-lg ${selectedMedia.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            <div className="relative aspect-square bg-gray-100 group">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onClick={() => {
                                            setPreviewMedia(item);
                                            setShowPreviewModal(true);
                                        }}
                                    />
                                ) : item.type === 'video' ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        {item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Video size={48} className="text-gray-400" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                            <div className="bg-white rounded-full p-3">
                                                <Video size={24} className="text-gray-700" />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewMedia(item);
                                            setShowPreviewModal(true);
                                        }}
                                        className="bg-white p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(item.url, item.id);
                                        }}
                                        className="bg-white p-2 rounded-full hover:bg-gray-100"
                                    >
                                        {copiedId === item.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    </button>
                                    <a
                                        href={item.url}
                                        download
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-white p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <Download size={16} />
                                    </a>
                                </div>

                                {/* Selection Checkbox */}
                                <div className="absolute top-2 left-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMedia.includes(item.id)}
                                        onChange={() => toggleSelection(item.id)}
                                        className="w-5 h-5 rounded"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>

                                {/* Favorite Star */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(item.id);
                                    }}
                                    className="absolute top-2 right-2"
                                >
                                    <Star
                                        size={20}
                                        className={item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}
                                    />
                                </button>

                                {/* Video Duration */}
                                {item.type === 'video' && item.duration && (
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                        {item.duration}
                                    </div>
                                )}
                            </div>

                            <div className="p-3">
                                <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
                                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                    <span>{formatFileSize(item.size)}</span>
                                    {item.dimensions && <span>{item.dimensions}</span>}
                                </div>
                                {item.usedIn > 0 && (
                                    <div className="mt-2 text-xs text-blue-600">
                                        Used in {item.usedIn} article{item.usedIn > 1 ? 's' : ''}
                                    </div>
                                )}
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
                                        checked={selectedMedia.length === sortedMedia.length}
                                        onChange={() => {
                                            if (selectedMedia.length === sortedMedia.length) {
                                                setSelectedMedia([]);
                                            } else {
                                                setSelectedMedia(sortedMedia.map(m => m.id));
                                            }
                                        }}
                                        className="w-4 h-4"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedMedia.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedMedia.includes(item.id)}
                                            onChange={() => toggleSelection(item.id)}
                                            className="w-4 h-4"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                            {item.type === 'image' ? (
                                                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    {getFileIcon(item.type)}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{item.name}</span>
                                            {item.isFavorite && <Star size={14} className="fill-yellow-400 text-yellow-400" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatFileSize(item.size)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.usedIn} articles</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setPreviewMedia(item);
                                                    setShowPreviewModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(item.url, item.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                            <a
                                                href={item.url}
                                                download
                                                className="text-purple-600 hover:text-purple-900"
                                            >
                                                <Download size={18} />
                                            </a>
                                            <button
                                                onClick={() => toggleFavorite(item.id)}
                                                className="text-yellow-600 hover:text-yellow-900"
                                            >
                                                <Star size={18} className={item.isFavorite ? 'fill-current' : ''} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete([item.id])}
                                                className="text-red-600 hover:text-red-900"
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

            {sortedMedia.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Upload size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Media Files</h3>
                    <p className="text-gray-500 mb-4">Upload images or videos to get started</p>
                    <label className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                        Upload Files
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            )}

            {/* New Folder Modal */}
            {showNewFolderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Create New Folder</h2>
                            <button onClick={() => setShowNewFolderModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder name..."
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            autoFocus
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowNewFolderModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createFolder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Create Folder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreviewModal && previewMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="max-w-6xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-bold">{previewMedia.name}</h2>
                            <button onClick={() => setShowPreviewModal(false)} className="text-white">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="bg-white rounded-lg p-4 mb-4">
                            {previewMedia.type === 'image' ? (
                                <img
                                    src={previewMedia.url}
                                    alt={previewMedia.name}
                                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                                />
                            ) : previewMedia.type === 'video' ? (
                                <video
                                    src={previewMedia.url}
                                    controls
                                    className="w-full h-auto max-h-[70vh] mx-auto"
                                />
                            ) : null}
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Size</p>
                                    <p className="font-medium">{formatFileSize(previewMedia.size)}</p>
                                </div>
                                {previewMedia.dimensions && (
                                    <div>
                                        <p className="text-gray-600">Dimensions</p>
                                        <p className="font-medium">{previewMedia.dimensions}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-gray-600">Upload Date</p>
                                    <p className="font-medium">{new Date(previewMedia.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Used In</p>
                                    <p className="font-medium">{previewMedia.usedIn} articles</p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => copyToClipboard(previewMedia.url, previewMedia.id)}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                                >
                                    {copiedId === previewMedia.id ? <Check size={18} /> : <Copy size={18} />}
                                    {copiedId === previewMedia.id ? 'Copied!' : 'Copy URL'}
                                </button>
                                <a
                                    href={previewMedia.url}
                                    download
                                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                >
                                    <Download size={18} /> Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;