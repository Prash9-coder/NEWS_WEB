import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Trash2, Flag, User, Calendar, Filter, Search } from 'lucide-react';

const CommentModeration = () => {
    const [comments, setComments] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all', // all, pending, approved, spam
        search: '',
        articleId: '',
        dateFrom: '',
        dateTo: ''
    });
    const [selectedComments, setSelectedComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [filters]);

    const fetchComments = async () => {
        // API call
        // const response = await getComments(filters);
        // setComments(response.data);

        // Mock data
        setComments([
            {
                id: 1,
                author: 'Rajesh Kumar',
                email: 'rajesh@example.com',
                content: 'Great article! Very informative and well-written.',
                article: 'Breaking: New Policy Announced',
                status: 'pending',
                createdAt: '2024-12-20T10:30:00',
                ip: '192.168.1.1',
                reported: false
            },
            {
                id: 2,
                author: 'Anonymous',
                email: 'spam@example.com',
                content: 'Click here for cheap deals!!!',
                article: 'Sports: Team Wins Championship',
                status: 'spam',
                createdAt: '2024-12-20T09:15:00',
                ip: '192.168.1.2',
                reported: true
            },
            {
                id: 3,
                author: 'Priya Sharma',
                email: 'priya@example.com',
                content: 'Thanks for sharing this important news.',
                article: 'Breaking: New Policy Announced',
                status: 'approved',
                createdAt: '2024-12-20T08:00:00',
                ip: '192.168.1.3',
                reported: false
            }
        ]);
    };

    const handleApprove = async (commentIds) => {
        // await approveComments(commentIds);
        console.log('Approving comments:', commentIds);
        fetchComments();
        setSelectedComments([]);
    };

    const handleReject = async (commentIds) => {
        // await rejectComments(commentIds);
        console.log('Rejecting comments:', commentIds);
        fetchComments();
        setSelectedComments([]);
    };

    const handleMarkAsSpam = async (commentIds) => {
        // await markAsSpam(commentIds);
        console.log('Marking as spam:', commentIds);
        fetchComments();
        setSelectedComments([]);
    };

    const handleDelete = async (commentIds) => {
        if (window.confirm(`Delete ${commentIds.length} comment(s)?`)) {
            // await deleteComments(commentIds);
            console.log('Deleting comments:', commentIds);
            fetchComments();
            setSelectedComments([]);
        }
    };

    const toggleSelection = (id) => {
        if (selectedComments.includes(id)) {
            setSelectedComments(selectedComments.filter(cid => cid !== id));
        } else {
            setSelectedComments([...selectedComments, id]);
        }
    };

    const filteredComments = comments.filter(comment => {
        let matches = true;
        if (filters.status !== 'all' && comment.status !== filters.status) matches = false;
        if (filters.search && !comment.content.toLowerCase().includes(filters.search.toLowerCase())) matches = false;
        return matches;
    });

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            spam: 'bg-red-100 text-red-800',
            rejected: 'bg-gray-100 text-gray-800'
        };
        return styles[status] || styles.pending;
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Comment Moderation</h1>
                <div className="flex gap-2">
                    {selectedComments.length > 0 && (
                        <>
                            <button
                                onClick={() => handleApprove(selectedComments)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                                <Check size={18} /> Approve ({selectedComments.length})
                            </button>
                            <button
                                onClick={() => handleMarkAsSpam(selectedComments)}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
                            >
                                <Flag size={18} /> Mark Spam
                            </button>
                            <button
                                onClick={() => handleDelete(selectedComments)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                            >
                                <Trash2 size={18} /> Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Comments</p>
                            <p className="text-2xl font-bold">{comments.length}</p>
                        </div>
                        <MessageSquare className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {comments.filter(c => c.status === 'pending').length}
                            </p>
                        </div>
                        <Clock className="text-yellow-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Approved</p>
                            <p className="text-2xl font-bold text-green-600">
                                {comments.filter(c => c.status === 'approved').length}
                            </p>
                        </div>
                        <Check className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Spam</p>
                            <p className="text-2xl font-bold text-red-600">
                                {comments.filter(c => c.status === 'spam').length}
                            </p>
                        </div>
                        <Flag className="text-red-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search comments..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="spam">Spam</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {filteredComments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedComments.includes(comment.id)}
                                    onChange={() => toggleSelection(comment.id)}
                                    className="w-5 h-5 mt-1"
                                />

                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {comment.author.charAt(0)}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold">{comment.author}</h3>
                                            <p className="text-sm text-gray-600">{comment.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(comment.status)}`}>
                                                {comment.status}
                                            </span>
                                            {comment.reported && (
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1">
                                                    <Flag size={12} /> Reported
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-800 mb-3">{comment.content}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </span>
                                        <span>Article: {comment.article}</span>
                                        <span>IP: {comment.ip}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {comment.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove([comment.id])}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                                                >
                                                    <Check size={16} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject([comment.id])}
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm flex items-center gap-2"
                                                >
                                                    <X size={16} /> Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleMarkAsSpam([comment.id])}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm flex items-center gap-2"
                                        >
                                            <Flag size={16} /> Spam
                                        </button>
                                        <button
                                            onClick={() => handleDelete([comment.id])}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-2"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredComments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Comments Found</h3>
                    <p className="text-gray-500">There are no comments matching your filters</p>
                </div>
            )}
        </div>
    );
};

export default CommentModeration;