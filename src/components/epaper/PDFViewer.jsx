// src/components/epaper/PDFViewer.jsx

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, currentPage, onPageChange, onLoadSuccess }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageWidth, setPageWidth] = useState(800);

    useEffect(() => {
        const updateWidth = () => {
            const width = Math.min(window.innerWidth - 100, 900);
            setPageWidth(width);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        if (onLoadSuccess) {
            onLoadSuccess(numPages);
        }
    };

    return (
        <div className="flex justify-center">
            <Document
                file={pdfUrl}
                onLoadSuccess={handleLoadSuccess}
                loading={
                    <div className="flex items-center justify-center h-96">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }
                error={
                    <div className="text-red-500 text-center py-10">
                        Failed to load PDF. Please try again.
                    </div>
                }
            >
                <Page
                    pageNumber={currentPage}
                    width={pageWidth}
                    loading={
                        <div className="flex items-center justify-center h-96">
                            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>
        </div>
    );
};

export default PDFViewer;