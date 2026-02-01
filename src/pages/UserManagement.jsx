import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Key, Shield, Search, RefreshCw, Copy, Check } from 'lucide-react';
import { useUsers, useUpdateUserKey } from '../hooks/useUsers';

const UserManagement = () => {
    const { data: users, isLoading, error } = useUsers();
    const updateKeyMutation = useUpdateUserKey();
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const generateKey = () => {
        return 'PK-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    };

    const handleAssignKey = (userId) => {
        const newKey = generateKey();
        updateKeyMutation.mutate({ userId, key: newKey });
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredUsers = users?.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (isLoading) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black font-outfit tracking-tight text-white mb-2">
                        USER <span className="text-lavender">MANAGEMENT</span>
                    </h1>
                    <p className="text-platinum/60 font-medium">Manage user identities and assign portal access keys.</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                    <div className="bg-charcoal/50 border border-white/5 p-4 rounded-xl px-6 text-center">
                        <p className="text-lavender font-bold text-sm tracking-wider uppercase">Total Users</p>
                        <p className="text-3xl font-black text-white">{users?.length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-charcoal/50 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                <Search className="text-platinum/40" size={20} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-white w-full placeholder:text-platinum/30"
                />
            </div>

            {/* Users Table */} // Using a grid for better mobile adaptability/modern look
            <div className="grid grid-cols-1 gap-4">
                {filteredUsers.map((user) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-raisin border border-white/5 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-lavender/30 transition-all group"
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender/20 to-lavender/5 border border-lavender/20 flex items-center justify-center text-lavender font-bold text-xl">
                                {user.full_name?.charAt(0) || <Users size={20} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-lavender transition-colors">{user.full_name || 'Unknown User'}</h3>
                                <p className="text-sm text-platinum/50 flex items-center gap-2">
                                    {user.email}
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${user.portal_access_key ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                        {user.portal_access_key ? 'Key Active' : 'No Key'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Access Key Section */}
                        <div className="flex-1 w-full lg:w-auto lg:max-w-md bg-black/20 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <Key size={16} className="text-lavender/50 min-w-[16px]" />
                                <code className="text-sm font-mono text-platinum/80 truncate">
                                    {user.portal_access_key || 'No Access Key Assigned'}
                                </code>
                            </div>
                            {user.portal_access_key && (
                                <button
                                    onClick={() => copyToClipboard(user.portal_access_key, user.id)}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-platinum/50 hover:text-white"
                                    title="Copy Key"
                                >
                                    {copiedId === user.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => handleAssignKey(user.id)}
                                disabled={updateKeyMutation.isLoading}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-lavender hover:text-raisin border border-white/10 rounded-xl transition-all font-bold text-sm text-white"
                            >
                                <RefreshCw size={16} className={updateKeyMutation.isLoading ? 'animate-spin' : ''} />
                                {user.portal_access_key ? 'Regenerate' : 'Generate Key'}
                            </button>
                        </div>
                    </motion.div>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center py-20 text-platinum/30">
                        <Users size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No users found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Simple Help/Note */}
            <div className="bg-lavender/5 border border-lavender/10 p-4 rounded-xl flex gap-3 text-sm text-lavender/80">
                <Shield size={20} className="shrink-0" />
                <p>
                    Portal Access Keys are used to verify user identity in external subsystems.
                    Generating a new key will immediately invalidate any previously assigned key.
                </p>
            </div>
        </div>
    );
};

export default UserManagement;
