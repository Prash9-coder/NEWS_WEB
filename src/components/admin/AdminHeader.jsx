import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const notifications = [
        { id: 1, text: 'New article submitted for approval', time: '5 min ago', unread: true },
        { id: 2, text: 'Comment reported on article "Breaking News"', time: '1 hour ago', unread: true },
        { id: 3, text: 'New user registered', time: '2 hours ago', unread: false },
    ];

    const handleLogout = () => {
        // Clear auth tokens
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Search */}
                    <div className="hidden md:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 hover:bg-gray-100 rounded-lg relative"
                        >
                            <Bell size={22} />
                            {notifications.some(n => n.unread) && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                                <div className="p-4 border-b">
                                    <h3 className="font-semibold">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <p className="text-sm">{notif.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t">
                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User"
                                alt="Admin"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="hidden md:block font-medium">Admin User</span>
                        </button>

                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                                <div className="p-4 border-b">
                                    <p className="font-semibold">Admin User</p>
                                    <p className="text-sm text-gray-600">admin@iqarnews.com</p>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={() => navigate('/admin/settings')}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Settings size={18} />
                                        Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;