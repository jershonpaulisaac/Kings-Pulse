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

const reputationThresholds = [100, 500, 1500, 5000, 10000];
const getRepLevel = (points) => {
    if (points >= 5001) return 4;
    if (points >= 1501) return 3;
    if (points >= 501) return 2;
    if (points >= 101) return 1;
    return 0;
}

const Dashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: profile, isLoading: profileLoading } = useProfile(user?.id)
    const { data: projects, isLoading: projectsLoading } = useProjects()

    const { data: leaders } = useQuery('leaderboard-mini', async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('points', { ascending: false })
            .limit(3);
        if (error) throw error;
        return data;
    });

    // Simplified Level Logic
    // Usage: Level 1, Level 2, etc. instead of complex titles vs titles can be kept as subtitles.
    const getRepTitle = (points) => {
        if (points >= 5001) return 'Expert';
        if (points >= 1501) return 'Master';
        if (points >= 501) return 'Architect';
        if (points >= 101) return 'Pioneer';
        return 'Novice';
    }

    const activeProjects = projects?.slice(0, 2) || []

    const currentPoints = profile?.points || 0;
    const nextLevelPoints = reputationThresholds[getRepLevel(currentPoints)] || 10000;
    const pointsNeeded = Math.max(0, nextLevelPoints - currentPoints);
    const progressPercentage = pointsNeeded === 0 ? 100 : Math.min(100, (currentPoints / nextLevelPoints) * 100);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
                    <p className="text-platinum/60 text-sm mt-1">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}.</p>
                </div>

                <div className="bg-[#2D2B3F] p-2 pr-6 rounded-2xl border border-white/5 flex items-center space-x-4">
                    <div className="bg-[#1E1D2B] px-4 py-2 rounded-xl border border-white/5">
                        <p className="text-[10px] text-platinum/50 font-bold uppercase tracking-wider">MY POINTS</p>
                        <p className="text-xl font-bold text-white flex items-center">
                            {currentPoints.toLocaleString()}
                            <Zap size={14} className="ml-2 text-yellow-400 fill-yellow-400" />
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-platinum/50 font-bold uppercase tracking-wider">CURRENT LEVEL</p>
                        <p className="text-sm font-bold text-lavender">{getRepTitle(currentPoints)}</p>
                    </div>
                </div>
            </div>

            {/* Main Action Buttons - very clear, large targets */}
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

            {/* Split View: Recent Projects & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Recent Projects */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold text-white">Recent Projects</h3>
                        <button onClick={() => navigate('/discover')} className="text-xs font-bold text-lavender hover:text-white transition-colors">View All</button>
                    </div>

                    {projectsLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="text-lavender animate-spin" size={32} />
                        </div>
                    ) : activeProjects.length === 0 ? (
                        <div className="sculpted-card p-8 text-center border-dashed border-white/10 bg-[#2D2B3F]">
                            <p className="text-platinum/40 text-sm">No projects posted yet.</p>
                        </div>
                    ) : (
                        activeProjects.map((project) => (
                            <div key={project.id} className="sculpted-card p-6 group cursor-pointer hover:-translate-y-1 transition-all bg-[#2D2B3F] border-white/5">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-0.5 bg-[#1E1D2B] text-[10px] font-bold text-lavender rounded border border-white/5">
                                                {project.category || 'General'}
                                            </span>
                                            <span className="text-xs text-platinum/40">•</span>
                                            <span className="text-xs text-platinum/40">{project.author?.full_name || 'Anonymous'}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white group-hover:text-lavender transition-colors">{project.title}</h4>
                                        <p className="text-platinum/60 text-sm line-clamp-2 max-w-xl">{project.description}</p>
                                    </div>
                                    <ChevronRight className="text-white/20 group-hover:text-lavender transition-colors mt-2" />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Column: Progress & Leaderboard */}
                <aside className="lg:col-span-4 space-y-6">
                    {/* Progress Card */}
                    <div className="sculpted-card p-6 bg-[#2D2B3F] border-white/5">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h4 className="text-sm font-bold text-white">Your Progress</h4>
                                <p className="text-xs text-platinum/50 mt-1">
                                    {pointsNeeded === 0
                                        ? "Max level reached!"
                                        : `${pointsNeeded} points to next level`}
                                </p>
                            </div>
                            <span className="text-xl font-bold text-white">{progressPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 w-full bg-[#1E1D2B] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                className={`h-full rounded-full ${progressPercentage >= 100 ? 'bg-emerald-400' : 'bg-lavender'}`}
                            />
                        </div>
                    </div>

                    {/* Top Students */}
                    <div className="sculpted-card p-6 bg-[#2D2B3F] border-white/5">
                        <h4 className="text-sm font-bold text-white mb-4">Top Students</h4>
                        <div className="space-y-4">
                            {leaders?.map((leader, i) => (
                                <div key={leader.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-3">
                                        <span className={`w-6 h-6 flex items-center justify-center rounded font-bold text-xs ${i === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-platinum/50'}`}>
                                            {i + 1}
                                        </span>
                                        <span className="text-platinum">{leader.full_name}</span>
                                    </div>
                                    <span className="font-bold text-platinum/50">{leader.points?.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => navigate('/leaderboard')} className="w-full mt-4 py-2 text-xs font-bold text-lavender hover:bg-lavender/10 rounded transition-colors">
                            View Full Leaderboard
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Dashboard
