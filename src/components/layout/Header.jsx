// src/components/layout/Header.jsx

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, Bell, User, ChevronDown, Play, Camera, Radio, TrendingUp, Newspaper, Tv } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const Header = () => {
    const { t } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const mainNavItems = [
        { name: 'Home', path: '/', icon: null },
        { name: 'India', path: '/category/india', icon: null },
        { name: 'World', path: '/category/world', icon: null },
        {
            name: 'Politics', path: '/category/politics', dropdown: [
                { name: 'National Politics', path: '/category/politics/national' },
                { name: 'State Politics', path: '/category/politics/state' },
                { name: 'Elections', path: '/category/politics/elections' },
                { name: 'Parliament', path: '/category/politics/parliament' },
            ]
        },
        { name: 'Business', path: '/category/business', icon: null },
        { name: 'Technology', path: '/category/technology', icon: null },
        {
            name: 'Sports', path: '/category/sports', dropdown: [
                { name: 'Cricket', path: '/category/sports/cricket' },
                { name: 'Football', path: '/category/sports/football' },
                { name: 'Tennis', path: '/category/sports/tennis' },
                { name: 'Olympics', path: '/category/sports/olympics' },
                { name: 'IPL 2024', path: '/category/sports/ipl' },
            ]
        },
        {
            name: 'Entertainment', path: '/category/entertainment', dropdown: [
                { name: 'Bollywood', path: '/category/entertainment/bollywood' },
                { name: 'Hollywood', path: '/category/entertainment/hollywood' },
                { name: 'Television', path: '/category/entertainment/television' },
                { name: 'Music', path: '/category/entertainment/music' },
                { name: 'Web Series', path: '/category/entertainment/web-series' },
            ]
        },
        { name: 'Lifestyle', path: '/category/lifestyle', icon: null },
        { name: 'Opinion', path: '/opinion', icon: null },
        { name: 'Videos', path: '/videos', icon: Play },
        { name: 'Photos', path: '/photos', icon: Camera },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
            {/* Breaking News Bar */}
            <div className="bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 flex items-center h-8 text-xs overflow-hidden">
                    <span className="bg-white text-primary px-2 py-0.5 font-bold mr-3 flex items-center">
                        <Radio size={12} className="mr-1 animate-pulse" />LIVE
                    </span>
                    <div className="flex-1 overflow-hidden whitespace-nowrap">
                        <span className="animate-marquee inline-block">Breaking: Parliament passes historic education reform bill • Stock markets hit all-time high • India wins World Cup 2024 • Climate Summit reaches breakthrough agreement</span>
                    </div>
                </div>
            </div>

            {/* Top Bar */}
            <div className="bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-10 text-xs">
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:inline">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span className="hidden md:inline">|</span>
                        <Link to="/trending" className="flex items-center hover:text-primary transition-colors">
                            <TrendingUp size={14} className="mr-1" />Trending
                        </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* E-Paper Button - Opens in New Tab */}
                        <a
                            href="/epaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-primary hover:bg-accent px-3 py-1 rounded text-white font-semibold transition-colors"
                        >
                            <Newspaper size={14} />
                            E-Paper
                        </a>

                        {/* Live TV Button - Opens in New Tab */}
                        <a
                            href="/live-tv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-primary hover:bg-accent px-3 py-1 rounded text-white font-semibold transition-colors"
                        >
                            <Tv size={14} />
                            Live TV
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        </a>

                        <LanguageSelector />
                        <button className="hover:text-primary transition-colors p-1"><Bell size={16} /></button>
                        <button className="hover:text-primary transition-colors p-1"><User size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo - Updated with Image */}
                        <Link to="/" className="inline-block group mb-3">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="/iqrar time.png"
                                    alt="Iqrar Time Logo"
                                    className="h-22 w-20 object-contain"
                                />
                                <span className="text-2xl font-black text-dark group-hover:text-primary transition-colors">
                                    IQRAR TIMES NEWS
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Search */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <form onSubmit={handleSearch} className="w-full relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search news, topics, videos..."
                                    className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary text-sm"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold hover:bg-accent transition-colors">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Mobile Buttons */}
                        <div className="flex items-center space-x-3">
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Search size={20} />
                            </button>
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    {isSearchOpen && (
                        <div className="md:hidden pb-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search news..."
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    autoFocus
                                />
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-white border-b" ref={dropdownRef}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-1">
                        {mainNavItems.map((item) => (
                            <div key={item.path} className="relative group">
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`flex items-center px-4 py-3 text-sm font-semibold uppercase transition-colors ${isActive(item.path) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                                        >
                                            {item.icon && <item.icon size={16} className="mr-1" />}
                                            {item.name}
                                            <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === item.name && (
                                            <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg border min-w-48 py-2 z-50">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-4 py-3 text-sm font-semibold uppercase transition-colors ${isActive(item.path) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                                    >
                                        {item.icon && <item.icon size={16} className="mr-1" />}
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t max-h-[70vh] overflow-y-auto">
                    <nav className="max-w-7xl mx-auto px-4 py-2">
                        {/* E-Paper & Live TV Buttons for Mobile */}
                        <div className="flex gap-2 mb-4">
                            <a
                                href="/epaper"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold text-sm"
                            >
                                <Newspaper size={18} />
                                <span>E-PAPER</span>
                            </a>
                            <a
                                href="/live-tv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold text-sm"
                            >
                                <Tv size={18} />
                                <span>LIVE TV</span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            </a>
                        </div>

                        {mainNavItems.map((item) => (
                            <div key={item.path}>
                                {item.dropdown ? (
                                    <div className="border-b">
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold uppercase text-gray-700"
                                        >
                                            <span className="flex items-center">
                                                {item.icon && <item.icon size={16} className="mr-2" />}
                                                {item.name}
                                            </span>
                                            <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === item.name && (
                                            <div className="bg-gray-50 pb-2">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        onClick={() => { setActiveDropdown(null); setIsMobileMenuOpen(false); }}
                                                        className="block px-8 py-2 text-sm text-gray-600 hover:text-primary"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center px-4 py-3 text-sm font-semibold uppercase border-b transition-colors ${isActive(item.path) ? 'text-primary bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {item.icon && <item.icon size={16} className="mr-2" />}
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;