import React, { useState, useEffect } from 'react'
import { Bell, Shield, Eye, Moon, Monitor, Trash2, Save, Loader2, Lock, User, Mail, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateSettings } from '../hooks/useProfile'

const Settings = () => {
    const { user, logout } = useAuth()
    const { data: profile, isLoading } = useProfile(user?.id)
    const updateSettingsMutation = useUpdateSettings()

    // Default Settings
    const [settings, setSettings] = useState({
        notifications_email: true,
        notifications_push: true,
        profile_visibility: 'public', // public, private   
        theme: 'dark'
    })

    const [activeTab, setActiveTab] = useState('general')
    const [showSaveSuccess, setShowSaveSuccess] = useState(false)

    // Load initial settings
    useEffect(() => {
        if (profile?.settings) {
            setSettings({ ...settings, ...profile.settings })
        }
    }, [profile])

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        try {
            await updateSettingsMutation.mutateAsync({
                userId: user.id,
                settings: settings
            })
            setShowSaveSuccess(true)
            setTimeout(() => setShowSaveSuccess(false), 2000)
        } catch (error) {
            console.error("Failed to save settings", error)
        }
    }

    if (isLoading) {
        return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-lavender" /></div>
    }

    const tabs = [
        { id: 'general', label: 'General', icon: Monitor },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    ]

    return (
        <div className="max-w-4xl mx-auto py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-platinum/50 text-sm mb-8">Manage your account preferences and application settings.</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === tab.id
                                    ? 'bg-lavender text-white shadow-lg shadow-lavender/20'
                                    : 'text-platinum/60 hover:bg-[#2D2B3F] hover:text-white'
                                }`}
                        >
                            <tab.icon size={18} className="mr-3" />
                            {tab.label}
                        </button>
                    ))}

                    <div className="pt-4 border-t border-white/5 mt-4">
                        <button
                            onClick={logout}
                            className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                            <Trash2 size={18} className="mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    <div className="bg-[#2D2B3F] rounded-2xl border border-white/5 overflow-hidden">

                        {/* General Settings */}
                        {activeTab === 'general' && (
                            <div className="p-6 space-y-6">
                                <h2 className="text-lg font-bold border-b border-white/5 pb-4">Account Information</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-platinum/50 uppercase tracking-wider mb-2">Full Name</label>
                                        <div className="flex items-center bg-[#1E1D2B] rounded-xl px-4 py-3 border border-white/5 text-platinum/50 cursor-not-allowed">
                                            <User size={16} className="mr-3 opacity-50" />
                                            {profile?.full_name}
                                            <span className="ml-auto text-[10px] bg-white/5 px-2 py-1 rounded">Read Only</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-platinum/50 uppercase tracking-wider mb-2">Email Address</label>
                                        <div className="flex items-center bg-[#1E1D2B] rounded-xl px-4 py-3 border border-white/5 text-platinum/50 cursor-not-allowed">
                                            <Mail size={16} className="mr-3 opacity-50" />
                                            {profile?.email}
                                            <span className="ml-auto text-[10px] bg-white/5 px-2 py-1 rounded">Read Only</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h2 className="text-lg font-bold border-b border-white/5 pb-4 mb-6">Appearance</h2>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white">Theme Preference</p>
                                            <p className="text-xs text-platinum/50">Choose how the application looks.</p>
                                        </div>
                                        <div className="flex p-1 bg-[#1E1D2B] rounded-lg border border-white/5">
                                            <button
                                                onClick={() => handleChange('theme', 'dark')}
                                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${settings.theme === 'dark' ? 'bg-[#2D2B3F] text-white shadow' : 'text-platinum/40'}`}
                                            >
                                                Dark
                                            </button>
                                            <button
                                                onClick={() => handleChange('theme', 'light')}
                                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${settings.theme === 'light' ? 'bg-white text-black shadow' : 'text-platinum/40'}`}
                                            >
                                                Light
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeTab === 'notifications' && (
                            <div className="p-6 space-y-6">
                                <h2 className="text-lg font-bold border-b border-white/5 pb-4">Notification Preferences</h2>

                                <div className="space-y-4">
                                    <Toggle
                                        label="Email Notifications"
                                        desc="Receive updates about projects and messages via email."
                                        active={settings.notifications_email}
                                        onToggle={() => handleToggle('notifications_email')}
                                    />
                                    <Toggle
                                        label="Push Notifications"
                                        desc="Receive real-time alerts in the browser."
                                        active={settings.notifications_push}
                                        onToggle={() => handleToggle('notifications_push')}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Privacy */}
                        {activeTab === 'privacy' && (
                            <div className="p-6 space-y-6">
                                <h2 className="text-lg font-bold border-b border-white/5 pb-4">Privacy & Security</h2>

                                <div className="space-y-6">
                                    <div>
                                        <p className="font-bold text-white mb-4">Profile Visibility</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => handleChange('profile_visibility', 'public')}
                                                className={`p-4 rounded-xl border text-left transition-all ${settings.profile_visibility === 'public' ? 'bg-lavender/10 border-lavender' : 'bg-[#1E1D2B] border-white/5 hover:border-white/10'}`}
                                            >
                                                <div className="flex items-center mb-2">
                                                    <GlobeIcon active={settings.profile_visibility === 'public'} />
                                                    <span className={`ml-2 text-sm font-bold ${settings.profile_visibility === 'public' ? 'text-lavender' : 'text-white'}`}>Public</span>
                                                </div>
                                                <p className="text-xs text-platinum/50">Visible to all students and faculty.</p>
                                            </button>

                                            <button
                                                onClick={() => handleChange('profile_visibility', 'private')}
                                                className={`p-4 rounded-xl border text-left transition-all ${settings.profile_visibility === 'private' ? 'bg-lavender/10 border-lavender' : 'bg-[#1E1D2B] border-white/5 hover:border-white/10'}`}
                                            >
                                                <div className="flex items-center mb-2">
                                                    <LockIcon active={settings.profile_visibility === 'private'} />
                                                    <span className={`ml-2 text-sm font-bold ${settings.profile_visibility === 'private' ? 'text-lavender' : 'text-white'}`}>Private</span>
                                                </div>
                                                <p className="text-xs text-platinum/50">Only visible to you and connections.</p>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <h3 className="text-sm font-bold text-rose-400 mb-2">Danger Zone</h3>
                                        <button className="flex items-center text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                                            <Trash2 size={14} className="mr-2" /> Request Account Deletion
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer / Save Action */}
                        <div className="p-6 bg-[#181722] border-t border-white/5 flex items-center justify-between">
                            <p className="text-xs text-platinum/30">Last updated: {new Date().toLocaleDateString()}</p>

                            <button
                                onClick={handleSave}
                                disabled={updateSettingsMutation.isLoading}
                                className="px-6 py-2.5 bg-lavender hover:bg-[#7D7AFF] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-lavender/20 flex items-center"
                            >
                                {updateSettingsMutation.isLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : (showSaveSuccess ? <CheckIcon /> : <Save size={16} className="mr-2" />)}
                                {showSaveSuccess ? 'Saved!' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Toggle = ({ label, desc, active, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-[#1E1D2B] rounded-xl border border-white/5">
        <div>
            <p className="font-bold text-sm text-white">{label}</p>
            <p className="text-xs text-platinum/50">{desc}</p>
        </div>
        <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-lavender' : 'bg-platinum/20'}`}
        >
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : ''}`} />
        </button>
    </div>
)

const GlobeIcon = ({ active }) => (
    <Eye size={16} className={active ? 'text-lavender' : 'text-platinum/50'} />
)

const LockIcon = ({ active }) => (
    <Lock size={16} className={active ? 'text-lavender' : 'text-platinum/50'} />
)

const CheckIcon = () => (
    <span className="mr-2">✓</span>
)

export default Settings
