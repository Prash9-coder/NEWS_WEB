// src/components/epaper/PDFUploader.jsx

import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';

const PDFUploader = ({ onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            processFile(file);
        } else {
            alert('Please upload a PDF file');
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            processFile(file);
        } else {
            alert('Please upload a PDF file');
        }
    };

    const processFile = async (file) => {
        setIsProcessing(true);
        setUploadedFile(file);

        // Create object URL for the PDF
        const fileUrl = URL.createObjectURL(file);

        // Pass to parent component
        if (onUpload) {
            onUpload(fileUrl, file.name);
        }

        setIsProcessing(false);
    };

    const removeFile = () => {
        setUploadedFile(null);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {!uploadedFile ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                        ${isDragging
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                        <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                        <p className="text-lg font-semibold text-gray-700">
                            Drag & Drop PDF here
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-4">
                            Supports: PDF files only
                        </p>
                    </label>
                </div>
            ) : (
                <div className="border rounded-xl p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FiFile className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 truncate max-w-[200px]">
                                    {uploadedFile.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isProcessing ? (
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <FiCheck className="text-green-600" size={24} />
                            )}
                            <button
                                onClick={removeFile}
                                className="p-1 hover:bg-red-100 rounded text-red-500"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFUploader;