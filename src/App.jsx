import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './context/AuthContext'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import AppLayout from './layouts/AppLayout'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Discovery from './pages/Discovery'
import Profile from './pages/Profile'
import Community from './pages/Community'
import Events from './pages/Events'
import Help from './pages/Help'
import StudentSearch from './pages/StudentSearch'

// Guards
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );
    if (!user) return <Navigate to="/login" replace />;
    return <AppLayout>{children}</AppLayout>;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null; // or spinner
    if (user) return <Navigate to="/dashboard" replace />;
    return <PublicLayout>{children}</PublicLayout>;
}

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes (Dark Theme) */}
                <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

                {/* Protected Routes (Light Theme) */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/discover" element={<ProtectedRoute><Discovery /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/student-search" element={<ProtectedRoute><StudentSearch /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default App
