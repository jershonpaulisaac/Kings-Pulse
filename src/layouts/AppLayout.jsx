import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Calendar, User, Settings as SettingsIcon, LogOut, Bell, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppLayout = ({ children }) => {
    const location = useLocation();
    const { logout, user } = useAuth(); // Assuming logout function exists in context

    return (
        <div className="theme-app min-h-screen flex bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen z-20">
                <div className="p-6">
                    <h1 className="text-2xl font-black font-outfit tracking-tighter text-slate-900">
                        KINGS <span className="text-indigo-600">PULSE</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] mt-1 uppercase">Student Portal</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <NavItem to="/dashboard" icon={Home} label="Dashboard" active={location.pathname === '/dashboard'} />
                    <NavItem to="/discover" icon={Search} label="Discovery" active={location.pathname === '/discover'} />
                    <NavItem to="/community" icon={MessageSquare} label="Community" active={location.pathname === '/community'} />
                    <NavItem to="/leaderboard" icon={Trophy} label="Leaderboard" active={location.pathname === '/leaderboard'} />
                    <NavItem to="/timeline" icon={Calendar} label="Timeline" active={location.pathname === '/timeline'} />
                    <NavItem to="/users" icon={User} label="Directory" active={location.pathname === '/users'} />
                </nav>

                <div className="p-4 border-t border-slate-100 space-y-1">
                    <NavItem to="/profile" icon={User} label="My Profile" active={location.pathname === '/profile'} />
                    <NavItem to="/settings" icon={SettingsIcon} label="Settings" active={location.pathname === '/settings'} />
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2"
                    >
                        <LogOut size={18} className="mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div className="flex-1 max-w-xl">
                        {/* Search could go here */}
                        <p className="text-sm font-bold text-slate-400">Welcome back, {user?.email?.split('@')[0] || 'Scholar'}</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative text-slate-400 hover:text-indigo-600 transition-colors p-2">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-white"></span>
                        </button>
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs border border-indigo-200">
                            {user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-2.5 rounded-lg transition-all text-sm ${active
            ? 'sidebar-link-active'
            : 'sidebar-link-inactive'
            }`}
    >
        <Icon size={18} className="mr-3" />
        {label}
    </Link>
)

export default AppLayout;
