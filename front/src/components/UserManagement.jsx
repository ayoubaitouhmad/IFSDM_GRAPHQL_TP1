import React, { useEffect, useState } from 'react';
import { Trash2, UserPlus, Users } from 'lucide-react';
import {useUsers} from "../hooks/useUsers.js";
import {useAddUser} from "../hooks/useAddUser.js";
import {useDeleteUser} from "../hooks/useDeleteUser.js";


export default function UserManagement() {
    const { usersLoading, usersError, users: fetchedUsers } = useUsers();
    const { createUser, createLoading, createError } = useAddUser();
    const { deleteUser, deleteUserLoading, deleteError } = useDeleteUser();

    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        console.log('Fetched users:', fetchedUsers);
        if (fetchedUsers && fetchedUsers.length > 0) {
            setUsers(fetchedUsers);
        }
    }, [fetchedUsers]);
    if (usersLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }
    if (usersError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {usersError.message || usersError}</p>
                    <button
                        onClick={false}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            try {
                const result = await createUser({
                    variables: {
                        name: newUser.name,
                        email: newUser.email
                    }
                });


                const user = {
                    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                    ...newUser
                };
                setUsers([...users, user]);
                setNewUser({ name: '', email: '' });
                setShowAddForm(false);

                console.log('User created successfully:', result);
            } catch (error) {
                console.error('Error creating user:', error);
                alert('Failed to create user. Please try again.');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUser({ variables: { id } });
            setUsers(users.filter(user => user.id !== id));

            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                                <p className="text-gray-600">Manage your application users</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            disabled={createLoading}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Error Messages */}
                {createError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">Error creating user: {createError.message}</p>
                    </div>
                )}

                {deleteError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">Error deleting user: {deleteError.message}</p>
                    </div>
                )}

                {/* Add User Form */}
                {showAddForm && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter user name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleAddUser}
                                    disabled={createLoading}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    {createLoading ? 'Adding...' : 'Add User'}
                                </button>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Users ({users.length})
                        </h2>
                    </div>

                    {users.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No users found. Add your first user to get started.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                disabled={deleteUserLoading}
                                                className="text-red-600 hover:text-red-900 flex items-center space-x-1 disabled:opacity-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span>{deleteUserLoading ? 'Deleting...' : 'Delete'}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}