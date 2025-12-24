import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Filter, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageNews = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [filters, setFilters] = useState({
        language: 'all',
        reporter: 'all',
        status: 'all',
        dateFrom: '',
        dateTo: '',
        search: ''
    });

    const [reporters, setReporters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchNews();
        fetchReporters();
    }, [filters]);

    const fetchNews = async () => {
        // API call with filters
        // const response = await getNews(filters);
        // setNews(response.data);
    };

    const fetchReporters = async () => {
        // API call to get reporters
        // setReporters(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            // await deleteNews(id);
            fetchNews();
        }
    };

    const filteredNews = news.filter(item => {
        let matches = true;

        if (filters.language !== 'all' && item.language !== filters.language) matches = false;
        if (filters.reporter !== 'all' && item.reporterId !== filters.reporter) matches = false;
        if (filters.status !== 'all' && item.status !== filters.status) matches = false;
        if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) matches = false;

        return matches;
    });

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage News Articles</h1>
                <button
                    onClick={() => navigate('/admin/news/create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} /> Create Article
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Language Filter */}
                    <select
                        value={filters.language}
                        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Languages</option>
                        <option value="english">English</option>
                        <option value="telugu">Telugu</option>
                    </select>

                    {/* Reporter Filter */}
                    <select
                        value={filters.reporter}
                        onChange={(e) => setFilters({ ...filters, reporter: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Reporters</option>
                        {reporters.map(reporter => (
                            <option key={reporter.id} value={reporter.id}>{reporter.name}</option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending Approval</option>
                        <option value="approved">Approved</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    {/* Date Range */}
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

            {/* News Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredNews.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img src={item.thumbnail} alt="" className="w-12 h-12 rounded object-cover mr-3" />
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-sm text-gray-500">{item.views} views</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.reporter}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                        {item.language}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'published' ? 'bg-green-100 text-green-800' :
                                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
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

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredNews.length)} of {filteredNews.length} results
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage * itemsPerPage >= filteredNews.length}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageNews;