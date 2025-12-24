import React, { useState, useEffect } from 'react';
import {
    Newspaper,
    Users,
    Eye,
    TrendingUp,
    FileText,
    MessageSquare,
    Clock,
    CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalArticles: 0,
        totalUsers: 0,
        totalViews: 0,
        pendingApprovals: 0,
        todayArticles: 0,
        todayViews: 0,
        activeReporters: 0,
        totalComments: 0
    });

    const [chartData, setChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        // API calls
        // const statsResponse = await getDashboardStats();
        // setStats(statsResponse.data);

        // Mock data for charts
        setChartData([
            { name: 'Mon', articles: 12, views: 2400 },
            { name: 'Tue', articles: 19, views: 1398 },
            { name: 'Wed', articles: 15, views: 9800 },
            { name: 'Thu', articles: 25, views: 3908 },
            { name: 'Fri', articles: 22, views: 4800 },
            { name: 'Sat', articles: 18, views: 3800 },
            { name: 'Sun', articles: 14, views: 4300 },
        ]);

        setCategoryData([
            { name: 'Politics', value: 400, color: '#3B82F6' },
            { name: 'Sports', value: 300, color: '#10B981' },
            { name: 'Entertainment', value: 200, color: '#F59E0B' },
            { name: 'Business', value: 150, color: '#EF4444' },
            { name: 'Technology', value: 100, color: '#8B5CF6' },
        ]);
    };

    const statCards = [
        {
            title: 'Total Articles',
            value: '1,234',
            change: '+12%',
            changeType: 'increase',
            icon: Newspaper,
            color: 'blue'
        },
        {
            title: 'Total Views',
            value: '456.7K',
            change: '+23%',
            changeType: 'increase',
            icon: Eye,
            color: 'green'
        },
        {
            title: 'Active Users',
            value: '45',
            change: '+5',
            changeType: 'increase',
            icon: Users,
            color: 'purple'
        },
        {
            title: 'Pending Approvals',
            value: '12',
            change: '-3',
            changeType: 'decrease',
            icon: Clock,
            color: 'yellow'
        },
        {
            title: "Today's Articles",
            value: '28',
            change: '+8',
            changeType: 'increase',
            icon: TrendingUp,
            color: 'indigo'
        },
        {
            title: 'E-Papers',
            value: '156',
            change: '+1',
            changeType: 'increase',
            icon: FileText,
            color: 'pink'
        },
        {
            title: 'Comments',
            value: '3,421',
            change: '+142',
            changeType: 'increase',
            icon: MessageSquare,
            color: 'orange'
        },
        {
            title: 'Published Today',
            value: '18',
            change: '+6',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'teal'
        },
    ];

    const getColorClass = (color, type = 'bg') => {
        const colors = {
            blue: type === 'bg' ? 'bg-blue-500' : 'text-blue-600',
            green: type === 'bg' ? 'bg-green-500' : 'text-green-600',
            purple: type === 'bg' ? 'bg-purple-500' : 'text-purple-600',
            yellow: type === 'bg' ? 'bg-yellow-500' : 'text-yellow-600',
            indigo: type === 'bg' ? 'bg-indigo-500' : 'text-indigo-600',
            pink: type === 'bg' ? 'bg-pink-500' : 'text-pink-600',
            orange: type === 'bg' ? 'bg-orange-500' : 'text-orange-600',
            teal: type === 'bg' ? 'bg-teal-500' : 'text-teal-600',
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${getColorClass(stat.color, 'bg')} bg-opacity-10`}>
                                    <Icon className={getColorClass(stat.color, 'text')} size={24} />
                                </div>
                                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Line Chart - Articles & Views Trend */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Weekly Performance</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="articles" stroke="#3B82F6" strokeWidth={2} />
                            <Line yAxisId="right" type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Category Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Articles by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Articles */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Recent Articles</h2>
                    </div>
                    <div className="divide-y">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="p-4 hover:bg-gray-50">
                                <div className="flex gap-3">
                                    <img
                                        src={`https://picsum.photos/seed/${item}/100/100`}
                                        alt=""
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium line-clamp-1">
                                            Sample News Article Title {item}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">By Reporter Name • 2 hours ago</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Politics</span>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Published</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Reporters */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Top Reporters (This Month)</h2>
                    </div>
                    <div className="divide-y">
                        {[
                            { name: 'Rajesh Kumar', articles: 45, views: '23.5K' },
                            { name: 'Priya Sharma', articles: 38, views: '19.2K' },
                            { name: 'Amit Patel', articles: 32, views: '15.8K' },
                            { name: 'Sneha Reddy', articles: 28, views: '12.4K' },
                            { name: 'Vijay Singh', articles: 25, views: '10.9K' },
                        ].map((reporter, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                            {reporter.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{reporter.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {reporter.articles} articles • {reporter.views} views
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-300">
                                        #{index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;