// src/components/epaper/PageThumbnails.jsx

import { FiCheck } from 'react-icons/fi';
import { getPageLabel } from '../../data/epaperData';

const PageThumbnails = ({ pages, currentPage, setCurrentPage, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="w-48 lg:w-56 bg-white border-r border-gray-200 overflow-y-auto 
                    h-[calc(100vh-200px)] sticky top-[200px]">
            <div className="p-3 border-b border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-gray-700 text-sm">All Pages</h3>
                <p className="text-xs text-gray-400">{pages.length} pages</p>
            </div>

            <div className="p-2 space-y-2">
                {pages.map((page) => (
                    <button
                        key={page.id}
                        onClick={() => setCurrentPage(page.pageNumber)}
                        className={`w-full relative group rounded-lg overflow-hidden border-2 transition-all
              ${currentPage === page.pageNumber
                                ? 'border-primary shadow-lg'
                                : 'border-transparent hover:border-gray-300'}`}
                    >
                        {/* Thumbnail Image */}
                        <div className="relative aspect-[3/4] bg-gray-100">
                            <img
                                src={page.thumbnail}
                                alt={`Page ${page.pageNumber}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Page Number Badge */}
                            <div className={`absolute top-1 left-1 px-2 py-0.5 rounded text-xs font-bold
                ${currentPage === page.pageNumber
                                    ? 'bg-primary text-white'
                                    : 'bg-black/60 text-white'}`}>
                                {page.pageNumber}
                            </div>

                            {/* Current Page Indicator */}
                            {currentPage === page.pageNumber && (
                                <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                                    <FiCheck size={12} />
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all" />
                        </div>

                        {/* Page Label */}
                        <div className={`p-1.5 text-xs text-center font-medium truncate
              ${currentPage === page.pageNumber ? 'text-primary' : 'text-gray-600'}`}>
                            {getPageLabel(page.pageNumber, pages.length)}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PageThumbnails;