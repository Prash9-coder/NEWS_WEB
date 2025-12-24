import React, { useState } from 'react';
import { Save, Globe, Bell, Shield, Database } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        siteName: 'IQAR News',
        siteDescription: 'Your trusted news source',
        contactEmail: 'contact@iqarnews.com',
        logo: null,
        favicon: null,
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: ''
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: false,
            commentNotifications: true
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            passwordExpiry: 90
        }
    });

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'backup', label: 'Backup', icon: Database }
    ];

    const handleSave = async () => {
        // API call to save settings
        // await updateSettings(settings);
        alert('Settings saved successfully!');
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Save size={18} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar Tabs */}
                <div className="col-span-12 md:col-span-3">
                    <div className="bg-white rounded-lg shadow">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b hover:bg-gray-50 ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''
                                        }`}
                                >
                                    <Icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="col-span-12 md:col-span-9">
                    <div className="bg-white rounded-lg shadow p-6">
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">General Settings</h2>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Site Description</label>
                                    <textarea
                                        value={settings.siteDescription}
                                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                                    <input
                                        type="email"
                                        value={settings.contactEmail}
                                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Facebook</label>
                                        <input
                                            type="url"
                                            value={settings.socialLinks.facebook}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Twitter</label>
                                        <input
                                            type="url"
                                            value={settings.socialLinks.twitter}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>

                                <label className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Email Notifications</div>
                                        <div className="text-sm text-gray-600">Receive notifications via email</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.emailNotifications}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                                        })}
                                        className="w-5 h-5"
                                    />
                                </label>

                                <label className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Push Notifications</div>
                                        <div className="text-sm text-gray-600">Receive browser push notifications</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.pushNotifications}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                                        })}
                                        className="w-5 h-5"
                                    />
                                </label>

                                <label className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Comment Notifications</div>
                                        <div className="text-sm text-gray-600">Get notified about new comments</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.commentNotifications}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            notifications: { ...settings.notifications, commentNotifications: e.target.checked }
                                        })}
                                        className="w-5 h-5"
                                    />
                                </label>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Security Settings</h2>

                                <label className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Two-Factor Authentication</div>
                                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.security.twoFactorAuth}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            security: { ...settings.security, twoFactorAuth: e.target.checked }
                                        })}
                                        className="w-5 h-5"
                                    />
                                </label>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                                    <input
                                        type="number"
                                        value={settings.security.sessionTimeout}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                                        })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Password Expiry (days)</label>
                                    <input
                                        type="number"
                                        value={settings.security.passwordExpiry}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                                        })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'backup' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Backup & Restore</h2>

                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Last backup: December 20, 2024 at 10:30 AM
                                    </p>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                    Create Backup Now
                                </button>

                                <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700">
                                    Restore from Backup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;