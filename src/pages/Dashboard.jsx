import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Zap, Target, Users, ChevronRight, Bookmark,
    ArrowUpRight, Loader2, Activity, Cpu, ShieldCheck, Crown, Plus
} from 'lucide-react'
import { useQuery } from 'react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useProjects } from '../hooks/useProjects'

const Dashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: profile, isLoading: profileLoading } = useProfile(user?.id)
    const { data: projects, isLoading: projectsLoading } = useProjects()

    const activeProjects = projects?.slice(0, 5) || [] // Show more recent projects since sidebar is gone/smaller

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
                    <p className="text-platinum/60 text-sm mt-1">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}.</p>
                </div>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/discover?create=true')}
                    className="sculpted-card p-6 bg-lavender hover:bg-[#7D7AFF] border-none flex flex-col items-center justify-center text-center group transition-all"
                >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                        <Plus size={24} className="text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Post Project</h3>
                    <p className="text-white/80 text-xs mt-1">Share your work & find team</p>
                </button>

                <button
                    onClick={() => navigate('/discover')}
                    className="sculpted-card p-6 bg-[#2D2B3F] hover:bg-[#363448] flex flex-col items-center justify-center text-center group transition-all"
                >
                    <div className="w-12 h-12 bg-[#1E1D2B] rounded-full flex items-center justify-center mb-3 border border-white/5">
                        <Target size={24} className="text-lavender" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Find Projects</h3>
                    <p className="text-platinum/50 text-xs mt-1">Collaborate on existing ideas</p>
                </button>

                <button
                    onClick={() => navigate('/users')}
                    className="sculpted-card p-6 bg-[#2D2B3F] hover:bg-[#363448] flex flex-col items-center justify-center text-center group transition-all"
                >
                    <div className="w-12 h-12 bg-[#1E1D2B] rounded-full flex items-center justify-center mb-3 border border-white/5">
                        <Users size={24} className="text-lavender" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Student Directory</h3>
                    <p className="text-platinum/50 text-xs mt-1">Connect with peers</p>
                </button>
            </div>

            {/* Main Content: Recent Projects (Expanded since widgets are gone) */}
            <div className="sculpted-card p-8 bg-[#2D2B3F] border-white/5 min-h-[500px]">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white">Recent Projects</h3>
                    <button onClick={() => navigate('/discover')} className="text-sm font-bold text-lavender hover:text-white transition-colors">View All Projects</button>
                </div>

                {projectsLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="text-lavender animate-spin" size={32} />
                    </div>
                ) : activeProjects.length === 0 ? (
                    <div className="p-12 text-center border-dashed border border-white/10 rounded-2xl bg-[#1E1D2B]">
                        <p className="text-platinum/40 text-sm">No projects posted yet.</p>
                        <button onClick={() => navigate('/discover?create=true')} className="mt-4 text-xs font-bold text-lavender">Be the first to post</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeProjects.map((project) => (
                            <div key={project.id} className="p-6 rounded-2xl bg-[#1E1D2B] group cursor-pointer hover:-translate-y-1 transition-all border border-white/5 hover:border-lavender/20">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-0.5 bg-[#2D2B3F] text-[10px] font-bold text-lavender rounded border border-white/5">
                                                {project.category || 'General'}
                                            </span>
                                            <span className="text-xs text-platinum/40">•</span>
                                            <span className="text-xs text-platinum/40">{project.author?.full_name || 'Anonymous'}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white group-hover:text-lavender transition-colors">{project.title}</h4>
                                        <p className="text-platinum/60 text-sm line-clamp-2">{project.description}</p>
                                    </div>
                                    <ChevronRight className="text-white/20 group-hover:text-lavender transition-colors mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
