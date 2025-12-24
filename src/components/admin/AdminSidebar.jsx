import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderTree,
    Newspaper,
    FileText,
    Users,
    Image,
    MessageSquare,
    Settings,
    CheckSquare,
    TrendingUp
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
        { path: '/admin/news', icon: Newspaper, label: 'News Articles' },
        { path: '/admin/news/approval', icon: CheckSquare, label: 'Approval Queue' },
        { path: '/admin/epaper', icon: FileText, label: 'E-Paper' },
        { path: '/admin/users', icon: Users, label: 'Users/Reporters' },
        { path: '/admin/media', icon: Image, label: 'Media Library' },
        { path: '/admin/comments', icon: MessageSquare, label: 'Comments' },
        { path: '/admin/breaking', icon: TrendingUp, label: 'Breaking News' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300`}>
            <div className="p-4 border-b border-gray-800">
                <h2 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>Admin Panel</h2>
            </div>

            <nav className="mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                                }`}
                        >
                            <Icon size={20} />
                            <span className={`ml-3 ${!isOpen && 'hidden'}`}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;