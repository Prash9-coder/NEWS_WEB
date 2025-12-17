// src/pages/EpaperAdmin.jsx

import { useState, useEffect } from 'react';
import { FiUpload, FiSave, FiTrash2, FiPlus, FiArrowLeft, FiEye, FiImage, FiCalendar, FiMapPin } from 'react-icons/fi';
import { editionCategories } from '../data/epaperData';

const EpaperAdmin = () => {
    const [selectedEdition, setSelectedEdition] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadedPages, setUploadedPages] = useState([]);
    const [savedEpapers, setSavedEpapers] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);

    // Load saved epapers from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('epaperUploads') || '[]');
        setSavedEpapers(saved);
    }, []);

    // Get all editions flat
    const allEditions = editionCategories.flatMap(cat =>
        cat.editions.map(ed => ({ ...ed, category: cat.name, categoryColor: cat.color }))
    );

    // Handle file upload
    const handlePageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Sort files by name to maintain order
        files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

        const newPages = files.map((file, index) => ({
            id: Date.now() + index,
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file),
            pageNumber: uploadedPages.length + index + 1,
        }));

        setUploadedPages([...uploadedPages, ...newPages]);
    };

    // Remove a page
    const removePage = (id) => {
        const updated = uploadedPages
            .filter(p => p.id !== id)
            .map((p, index) => ({ ...p, pageNumber: index + 1 }));
        setUploadedPages(updated);
    };

    // Clear all pages
    const clearAllPages = () => {
        uploadedPages.forEach(p => URL.revokeObjectURL(p.preview));
        setUploadedPages([]);
    };

    // Drag and drop reorder
    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItem === null || draggedItem === index) return;

        const newPages = [...uploadedPages];
        const draggedPage = newPages[draggedItem];
        newPages.splice(draggedItem, 1);
        newPages.splice(index, 0, draggedPage);

        // Update page numbers
        newPages.forEach((p, i) => p.pageNumber = i + 1);

        setUploadedPages(newPages);
        setDraggedItem(index);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    // Save epaper
    const handleSave = () => {
        if (!selectedEdition) {
            alert('Please select an edition!');
            return;
        }
        if (uploadedPages.length === 0) {
            alert('Please upload at least one page!');
            return;
        }

        setIsUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            const edition = allEditions.find(e => e.id === selectedEdition);

            const epaperData = {
                id: Date.now(),
                edition: selectedEdition,
                editionName: edition?.name || selectedEdition,
                category: edition?.category,
                categoryColor: edition?.categoryColor,
                date: selectedDate,
                pagesCount: uploadedPages.length,
                pages: uploadedPages.map(p => ({
                    pageNumber: p.pageNumber,
                    url: p.preview,
                    name: p.name,
                })),
                createdAt: new Date().toISOString(),
            };

            // Save to localStorage
            const existingData = JSON.parse(localStorage.getItem('epaperUploads') || '[]');

            // Remove existing entry for same edition and date
            const filteredData = existingData.filter(
                e => !(e.edition === selectedEdition && e.date === selectedDate)
            );

            filteredData.unshift(epaperData);
            localStorage.setItem('epaperUploads', JSON.stringify(filteredData));

            setSavedEpapers(filteredData);
            setUploadedPages([]);
            setIsUploading(false);

            alert(`✅ E-Paper saved successfully!\n\n${edition?.name} - ${selectedDate}\n${epaperData.pagesCount} pages`);
        }, 1000);
    };

    // Delete saved epaper
    const deleteEpaper = (id) => {
        if (!confirm('Are you sure you want to delete this E-Paper?')) return;

        const updated = savedEpapers.filter(e => e.id !== id);
        localStorage.setItem('epaperUploads', JSON.stringify(updated));
        setSavedEpapers(updated);
    };

    // Preview epaper
    const previewEpaper = (epaper) => {
        window.open(`/epaper/${epaper.edition}?date=${epaper.date}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-secondary text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-4">
                            <a href="/epaper" className="p-2 hover:bg-white/10 rounded-lg">
                                <FiArrowLeft size={20} />
                            </a>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black">
                                    <span className="text-primary">NEWS</span>
                                    <span className="text-white">HUB</span>
                                </span>
                                <span className="text-white/50">|</span>
                                <span className="font-semibold">E-Paper Admin</span>
                            </div>
                        </div>
                        <a
                            href="/epaper"
                            target="_blank"
                            className="flex items-center gap-2 bg-primary hover:bg-accent px-4 py-2 rounded-lg transition-colors"
                        >
                            <FiEye size={16} />
                            View E-Paper
                        </a>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - Upload Section */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Upload Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FiUpload className="text-primary" />
                                Upload New E-Paper
                            </h2>

                            {/* Edition & Date Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FiMapPin size={14} />
                                        Select Edition *
                                    </label>
                                    <select
                                        value={selectedEdition}
                                        onChange={(e) => setSelectedEdition(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    >
                                        <option value="">Choose Edition...</option>
                                        {editionCategories.map(category => (
                                            <optgroup key={category.id} label={category.name}>
                                                {category.editions.map(edition => (
                                                    <option key={edition.id} value={edition.id}>
                                                        {edition.name} ({edition.nameLocal})
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FiCalendar size={14} />
                                        Edition Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer mb-6">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePageUpload}
                                    className="hidden"
                                    id="page-upload"
                                />
                                <label htmlFor="page-upload" className="cursor-pointer block">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiImage className="text-primary" size={28} />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        Drop page images here
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        or click to browse files
                                    </p>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Supports: JPG, PNG, WebP • Multiple files allowed
                                    </p>
                                </label>
                            </div>

                            {/* Uploaded Pages Grid */}
                            {uploadedPages.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-700">
                                            Uploaded Pages ({uploadedPages.length})
                                        </h3>
                                        <button
                                            onClick={clearAllPages}
                                            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                                        >
                                            <FiTrash2 size={14} />
                                            Clear All
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mb-3">
                                        💡 Drag and drop to reorder pages
                                    </p>

                                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                        {uploadedPages.map((page, index) => (
                                            <div
                                                key={page.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragOver={(e) => handleDragOver(e, index)}
                                                onDragEnd={handleDragEnd}
                                                className={`relative group cursor-move transition-all ${draggedItem === index ? 'opacity-50 scale-95' : ''
                                                    }`}
                                            >
                                                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-colors">
                                                    <img
                                                        src={page.preview}
                                                        alt={`Page ${page.pageNumber}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs text-center py-1 rounded-b-lg">
                                                    Page {page.pageNumber}
                                                </div>
                                                <button
                                                    onClick={() => removePage(page.id)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                                >
                                                    <FiTrash2 size={12} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add More Button */}
                                        <label
                                            htmlFor="page-upload"
                                            className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                                        >
                                            <FiPlus className="text-gray-400" size={20} />
                                            <span className="text-xs text-gray-400 mt-1">Add</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            {uploadedPages.length > 0 && (
                                <button
                                    onClick={handleSave}
                                    disabled={isUploading || !selectedEdition}
                                    className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FiSave size={20} />
                                            Save E-Paper ({uploadedPages.length} pages)
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <h3 className="font-bold text-blue-800 mb-3">📝 How to Upload E-Paper:</h3>
                            <ol className="text-sm text-blue-700 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                    <span>Convert your PDF to images at <a href="https://www.ilovepdf.com/pdf_to_jpg" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-900">ilovepdf.com/pdf_to_jpg</a></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                    <span>Select Edition (Hyderabad, Vijayawada, etc.)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                    <span>Select the newspaper date</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                                    <span>Upload all page images (they will auto-sort by filename)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                                    <span>Drag to reorder if needed, then click Save</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Right Column - Saved E-Papers */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                📚 Saved E-Papers ({savedEpapers.length})
                            </h2>

                            {savedEpapers.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <FiImage size={40} className="mx-auto mb-2 opacity-50" />
                                    <p>No e-papers uploaded yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {savedEpapers.map((epaper) => (
                                        <div
                                            key={epaper.id}
                                            className="border border-gray-200 rounded-xl p-3 hover:border-primary transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Thumbnail */}
                                                <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                    {epaper.pages?.[0]?.url && (
                                                        <img
                                                            src={epaper.pages[0].url}
                                                            alt={epaper.editionName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: epaper.categoryColor }}
                                                        ></span>
                                                        <h4 className="font-semibold text-gray-800 truncate">
                                                            {epaper.editionName}
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {new Date(epaper.date).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {epaper.pagesCount} pages
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={() => previewEpaper(epaper)}
                                                        className="p-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                                                        title="Preview"
                                                    >
                                                        <FiEye size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteEpaper(epaper.id)}
                                                        className="p-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 text-white">
                            <h3 className="font-bold mb-3">📊 Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/20 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold">{savedEpapers.length}</p>
                                    <p className="text-xs opacity-80">Total E-Papers</p>
                                </div>
                                <div className="bg-white/20 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold">
                                        {savedEpapers.reduce((acc, e) => acc + (e.pagesCount || 0), 0)}
                                    </p>
                                    <p className="text-xs opacity-80">Total Pages</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpaperAdmin;