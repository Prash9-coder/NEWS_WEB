import React, { useState, useEffect } from 'react';
import { Check, X, Eye } from 'lucide-react';

const ApprovalQueue = () => {
    const [pendingNews, setPendingNews] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        fetchPendingNews();
    }, []);

    const fetchPendingNews = async () => {
        // API call to fetch pending articles
        // setPendingNews(response.data);
    };

    const handleApprove = async (id) => {
        if (window.confirm('Approve this article for publishing?')) {
            // await approveArticle(id);
            fetchPendingNews();
        }
    };

    const handleReject = async (id) => {
        if (!rejectionReason) {
            alert('Please provide a rejection reason');
            return;
        }

        // await rejectArticle(id, rejectionReason);
        setRejectionReason('');
        setSelectedArticle(null);
        fetchPendingNews();
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Approval Queue</h1>

            <div className="grid gap-6">
                {pendingNews.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex gap-6">
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-48 h-32 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                                <p className="text-gray-600 mb-3">{article.summary}</p>

                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>By: {article.reporter}</span>
                                    <span>Category: {article.category}</span>
                                    <span>Language: {article.language}</span>
                                    <span>Submitted: {new Date(article.submittedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedArticle(article);
                                        setShowPreview(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Eye size={18} /> Preview
                                </button>

                                <button
                                    onClick={() => handleApprove(article.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                >
                                    <Check size={18} /> Approve
                                </button>

                                <button
                                    onClick={() => setSelectedArticle(article)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                >
                                    <X size={18} /> Reject
                                </button>
                            </div>
                        </div>

                        {/* Rejection Form */}
                        {selectedArticle?.id === article.id && !showPreview && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <label className="block text-sm font-medium mb-2">Rejection Reason</label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    rows="3"
                                    placeholder="Explain why this article is being rejected..."
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleReject(article.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Confirm Rejection
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedArticle(null);
                                            setRejectionReason('');
                                        }}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {showPreview && selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Article Preview</h2>
                            <button onClick={() => setShowPreview(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <img
                            src={selectedArticle.featuredImage}
                            alt={selectedArticle.title}
                            className="w-full h-64 object-cover rounded mb-4"
                        />

                        <h1 className="text-3xl font-bold mb-4">{selectedArticle.title}</h1>

                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovalQueue;