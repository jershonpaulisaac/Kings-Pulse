import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Calendar, User, HelpCircle, LogOut, Bell, Trophy, Users, Menu, X } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const AppLayout = ({ children }) => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const { data: profile } = useProfile(user?.id);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="theme-app min-h-screen flex bg-[#1E1D2B]">
            {/* Desktop Sidebar (unchanged logic) */}
            <aside className="w-64 bg-[#181722] border-r border-white/5 hidden lg:flex flex-col sticky top-0 h-screen z-20">
                <div className="p-8">
                    <h1 className="text-2xl font-black font-outfit tracking-tighter text-white">
                        KINGS <span className="text-lavender">PULSE</span>
                    </h1>
                    <p className="text-[10px] text-lavender font-bold tracking-[0.2em] mt-1 uppercase">Student Portal</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavLinks location={location} />
                </nav>

                <div className="p-4 border-t border-white/5 space-y-1">
                    <NavLinksBottom location={location} logout={logout} />
                </div>
            </aside>

            {/* Mobile Sidebar Overlay & Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 w-64 h-full bg-[#181722] z-50 lg:hidden border-r border-white/10 flex flex-col shadow-2xl"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-white/5">
                                <div>
                                    <h1 className="text-xl font-black font-outfit tracking-tighter text-white">
                                        KINGS <span className="text-lavender">PULSE</span>
                                    </h1>
                                </div>
                                <button onClick={closeMobileMenu} className="p-2 text-platinum hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                                <NavLinks location={location} onClick={closeMobileMenu} />
                            </nav>

                            <div className="p-4 border-t border-white/5 space-y-1">
                                <NavLinksBottom location={location} logout={logout} onClick={closeMobileMenu} />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-[#1E1D2B]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-platinum hover:text-white active:scale-95 transition-transform"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex-1 max-w-xl">
                            <p className="text-sm font-bold text-platinum/40 hidden md:block">Welcome back, <span className="text-white">{profile?.full_name?.split(' ')[0] || 'Scholar'}</span></p>
                            {/* Mobile specific greeting (shorter) */}
                            <p className="text-sm font-bold text-white md:hidden">{profile?.full_name?.split(' ')[0] || 'Scholar'}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="relative group">
                            <button className="text-platinum/40 hover:text-white transition-colors p-2">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-lavender rounded-full border border-[#1E1D2B]"></span>
                            </button>
                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-2 w-64 bg-[#2D2B3F] border border-white/5 rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Notifications</h4>
                                <div className="space-y-2">
                                    <div className="text-xs text-platinum/60 hover:text-white cursor-pointer p-2 rounded hover:bg-white/5">
                                        🚀 New Hackathon listed in Events
                                    </div>
                                    <div className="text-xs text-platinum/60 hover:text-white cursor-pointer p-2 rounded hover:bg-white/5">
                                        👋 Sarah commented on your post
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/profile" className="w-10 h-10 bg-lavender/10 text-lavender rounded-xl flex items-center justify-center font-bold text-xs border border-lavender/20 hover:bg-lavender hover:text-white transition-all cursor-pointer">
                            {user?.email?.[0]?.toUpperCase() || 'U'}
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Extracted Nav Links for reusability
const NavLinks = ({ location, onClick }) => (
    <>
        <NavItem onClick={onClick} to="/dashboard" icon={Home} label="Dashboard" active={location.pathname === '/dashboard'} />
        <NavItem onClick={onClick} to="/discover" icon={Search} label="Projects" active={location.pathname === '/discover'} />
        <NavItem onClick={onClick} to="/community" icon={MessageSquare} label="Collaborate" active={location.pathname === '/community'} />
        <NavItem onClick={onClick} to="/student-search" icon={Users} label="Student Search" active={location.pathname === '/student-search'} />
        <NavItem onClick={onClick} to="/events" icon={Calendar} label="Events" active={location.pathname === '/events'} />
    </>
)

const NavLinksBottom = ({ location, logout, onClick }) => (
    <>
        <NavItem onClick={onClick} to="/profile" icon={User} label="My Profile" active={location.pathname === '/profile'} />
        <NavItem onClick={onClick} to="/help" icon={HelpCircle} label="Help & Support" active={location.pathname === '/help'} />
        <button
            onClick={() => {
                if (onClick) onClick();
                logout();
            }}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-platinum/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-4"
        >
            <LogOut size={18} className="mr-3" />
            Sign Out
        </button>
    </>
)

const NavItem = ({ to, icon: Icon, label, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center px-4 py-3 rounded-xl transition-all text-sm ${active
            ? 'sidebar-link-active'
            : 'sidebar-link-inactive'
            }`}
    >
        <Icon size={18} className="mr-3" />
        {label}
    </Link>
)

export default AppLayout;
