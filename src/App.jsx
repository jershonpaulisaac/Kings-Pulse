import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, MessageSquare, Calendar, User, Settings as SettingsIcon, LogOut, Bell, Trophy } from 'lucide-react'

// Placeholder components (to be implemented next)
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Discovery from './pages/Discovery'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Community from './pages/Community'
import Timeline from './pages/Timeline'
import Settings from './pages/Settings'
import Leaderboard from './pages/Leaderboard'
import UserManagement from './pages/UserManagement'

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-raisin text-platinum font-inter selection:bg-lavender selection:text-white">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/*" element={<AppLayout />} />
                </Routes>
            </div>
        </Router>
    )
}

const AppLayout = () => {
    const location = useLocation()

    return (
        <div className="flex min-h-screen">
            {/* Side Navigation (Desktop) */}
            <aside className="w-64 bg-charcoal/50 border-r border-white/5 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <h1 className="text-2xl font-black font-outfit tracking-tighter">KINGS <span className="text-lavender">PULSE</span></h1>
                    <p className="text-[10px] text-lavender font-bold tracking-[0.2em] mt-1">SECURE COLLABORATION</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavItem to="/dashboard" icon={Home} label="Dashboard" active={location.pathname === '/dashboard'} />
                    <NavItem to="/discover" icon={Search} label="Discovery" active={location.pathname === '/discover'} />
                    <NavItem to="/community" icon={MessageSquare} label="Community" active={location.pathname === '/community'} />
                    <NavItem to="/leaderboard" icon={Trophy} label="Leaderboard" active={location.pathname === '/leaderboard'} />
                    <NavItem to="/timeline" icon={Calendar} label="Timeline" active={location.pathname === '/timeline'} />
                    <NavItem to="/users" icon={User} label="User Management" active={location.pathname === '/users'} />
                </nav>

                <div className="p-4 border-t border-white/5 space-y-1">
                    <NavItem to="/profile" icon={User} label="My Identity" active={location.pathname === '/profile'} />
                    <NavItem to="/settings" icon={SettingsIcon} label="Protocols" active={location.pathname === '/settings'} />
                    <button className="flex items-center w-full px-4 py-3 text-sm font-bold text-lavender/60 hover:text-lavender transition-colors mt-4">
                        <LogOut size={18} className="mr-3" />
                        DISCONNECT
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden">
                {/* Top Navbar */}
                <header className="h-20 bg-raisin/80 backdrop-blur-lg sticky top-0 z-50 px-8 flex items-center justify-between border-b border-white/5">
                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender pointer-events-none group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search resources, users, or signals..."
                                className="w-full bg-charcoal/50 border border-white/5 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-lavender/50 transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative text-lavender hover:text-white transition-colors p-2">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-lavender rounded-full animate-pulse"></span>
                        </button>
                        <div className="flex items-center space-x-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black tracking-widest text-lavender uppercase">LEVEL 04</p>
                                <p className="text-sm font-bold text-platinum truncate max-w-[120px]">Arjun Kumar</p>
                            </div>
                            <div className="w-10 h-10 bg-lavender/20 border border-lavender rounded-xl p-1 group-hover:bg-lavender/30 transition-all">
                                <div className="w-full h-full bg-lavender rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, scale: 0.98, translateY: 10 }}
                            animate={{ opacity: 1, scale: 1, translateY: 0 }}
                            exit={{ opacity: 0, scale: 1.02, translateY: -10 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/discover" element={<Discovery />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/community" element={<Community />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/timeline" element={<Timeline />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/users" element={<UserManagement />} />
                                <Route path="*" element={<Dashboard />} />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Mobile Nav (Floating) */}
            <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-charcoal/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full flex items-center space-x-8 z-[100] shadow-2xl">
                <MobileNavItem icon={Home} to="/dashboard" active={location.pathname === '/dashboard'} />
                <MobileNavItem icon={Search} to="/discover" active={location.pathname === '/discover'} />
                <MobileNavItem icon={MessageSquare} to="/community" active={location.pathname === '/community'} />
                <MobileNavItem icon={Trophy} to="/leaderboard" active={location.pathname === '/leaderboard'} />
                <MobileNavItem icon={User} to="/profile" active={location.pathname === '/profile'} />
            </nav>
        </div>
    )
}

const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-3 rounded-xl transition-all font-bold text-sm ${active
            ? 'bg-lavender text-white shadow-lg shadow-lavender/20 translate-x-1'
            : 'text-platinum/60 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon size={18} className="mr-3" />
        {label}
    </Link>
)

const MobileNavItem = ({ icon: Icon, to, active }) => (
    <Link to={to} className={`transition-all ${active ? 'text-lavender scale-125' : 'text-platinum/40'}`}>
        <Icon size={24} />
    </Link>
)

export default App
