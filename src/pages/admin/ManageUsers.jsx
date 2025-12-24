import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, UserCheck, UserX, Mail, Phone, Shield } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'reporter',
        password: '',
        department: '',
        bio: '',
        avatar: null,
        status: 'active',
        permissions: []
    });

    const roles = [
        { value: 'admin', label: 'Admin', color: 'red' },
        { value: 'editor', label: 'Editor', color: 'purple' },
        { value: 'reporter', label: 'Reporter', color: 'blue' },
        { value: 'contributor', label: 'Contributor', color: 'green' }
    ];

    const permissions = [
        'create_news',
        'edit_news',
        'delete_news',
        'publish_news',
        'manage_categories',
        'manage_users',
        'manage_epaper',
        'moderate_comments',
        'view_analytics'
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        // API call
        // const response = await getUsers();
        // setUsers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            // await updateUser(editingId, formData);
        } else {
            // await createUser(formData);
        }

        setIsModalOpen(false);
        resetForm();
        fetchUsers();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            // await deleteUser(id);
            fetchUsers();
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        // await updateUserStatus(id, newStatus);
        fetchUsers();
    };

    const handleEdit = (user) => {
        setFormData(user);
        setEditingId(user.id);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'reporter',
            password: '',
            department: '',
            bio: '',
            avatar: null,
            status: 'active',
            permissions: []
        });
        setEditingId(null);
    };

    const getRoleBadgeColor = (role) => {
        const roleObj = roles.find(r => r.value === role);
        return roleObj ? roleObj.color : 'gray';
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Users</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} /> Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail size={14} className="text-gray-400" />
                                            {user.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone size={14} className="text-gray-400" />
                                            {user.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                            user.role === 'editor' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'reporter' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                        <Shield size={12} className="inline mr-1" />
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.department || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => toggleStatus(user.id, user.status)}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${user.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {user.status === 'active' ? <UserCheck size={14} /> : <UserX size={14} />}
                                        {user.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="font-semibold">{user.articleCount || 0}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={user.role === 'admin'}
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {editingId ? 'Edit User' : 'Add New User'}
                            </h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Role *</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {roles.map(role => (
                                            <option key={role.value} value={role.value}>{role.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {!editingId && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Password *</label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required={!editingId}
                                            minLength={6}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">Department</label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Politics, Sports, etc."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Permissions</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {permissions.map(permission => (
                                            <label key={permission} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.includes(permission)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({
                                                                ...formData,
                                                                permissions: [...formData.permissions, permission]
                                                            });
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                permissions: formData.permissions.filter(p => p !== permission)
                                                            });
                                                        }
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm">{permission.replace(/_/g, ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => { setIsModalOpen(false); resetForm(); }}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingId ? 'Update' : 'Create'} User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;