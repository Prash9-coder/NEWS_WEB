import React, { useState, useEffect } from 'react';
import {
    Upload,
    Trash2,
    Eye,
    Calendar,
    Download,
    Plus,
    FileText,
    X
} from 'lucide-react';

const ManageEpaper = () => {
    const [epapers, setEpapers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [formData, setFormData] = useState({
        date: '',
        edition: 'main',
        language: 'telugu',
        pdfFile: null,
        thumbnail: null,
        pages: 0,
        supplements: []
    });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [editions, setEditions] = useState(['main', 'karimnagar', 'warangal', 'hyderabad']);

    useEffect(() => {
        fetchEpapers();
    }, [selectedDate]);

    const fetchEpapers = async () => {
        // API call
        // const response = await getEpapers(selectedDate);
        // setEpapers(response.data);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('pdf', file);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('edition', formData.edition);
        formDataToSend.append('language', formData.language);

        try {
            for (let i = 0; i <= 100; i += 10) {
                setUploadProgress(i);
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            setIsModalOpen(false);
            resetForm();
            fetchEpapers();
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this e-paper?')) {
            fetchEpapers();
        }
    };

    const resetForm = () => {
        setFormData({
            date: '',
            edition: 'main',
            language: 'telugu',
            pdfFile: null,
            thumbnail: null,
            pages: 0,
            supplements: []
        });
        setUploadProgress(0);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage E-Paper</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} /> Upload E-Paper
                </button>
            </div>

            {/* Date Filter */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center gap-4">
                    <Calendar size={20} className="text-gray-600" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-600">
                        Showing e-papers for {new Date(selectedDate).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {/* E-Papers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {epapers.map((epaper) => (
                    <div key={epaper.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="relative h-64 bg-gray-200">
                            {epaper.thumbnail ? (
                                <img
                                    src={epaper.thumbnail}
                                    alt={`${epaper.edition} edition`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-gray-400">
                                        <FileText size={48} />
                                        <p className="mt-2">PDF Preview</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                                {epaper.pages} Pages
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg capitalize">{epaper.edition} Edition</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(epaper.date).toLocaleDateString()}
                                    </p>
                                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${epaper.language === 'telugu'
                                        ? 'bg-orange-100 text-orange-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {epaper.language}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {(epaper.fileSize / 1024 / 1024).toFixed(2)} MB
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.open(epaper.pdfUrl, '_blank')}
                                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                                >
                                    <Eye size={16} /> View
                                </button>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = epaper.pdfUrl;
                                        link.download = `epaper-${epaper.edition}-${epaper.date}.pdf`;
                                        link.click();
                                    }}
                                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download size={16} /> Download
                                </button>
                                <button
                                    onClick={() => handleDelete(epaper.id)}
                                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {epapers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No E-Papers Found</h3>
                    <p className="text-gray-500 mb-4">
                        Upload your first e-paper for {new Date(selectedDate).toLocaleDateString()}
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Upload E-Paper
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageEpaper;
