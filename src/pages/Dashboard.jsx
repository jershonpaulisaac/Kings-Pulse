import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Zap, Target, Users, ChevronRight, Bookmark,
    ArrowUpRight, Loader2, Activity, Cpu, ShieldCheck, Crown
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

    // Reputation Logic
    const getRepTitle = (points) => {
        if (points >= 5001) return 'Grand Matrix Innovator';
        if (points >= 1501) return 'Sync Master';
        if (points >= 501) return 'Signal Architect';
        if (points >= 101) return 'Pulse Pioneer';
        return 'Novice Innovator';
    }

    const activeProjects = projects?.slice(0, 2) || []

    // Bug #1 Fix: Progress Calculation
    const currentPoints = profile?.points || 0;
    const nextLevelPoints = reputationThresholds[getRepLevel(currentPoints)] || 10000;
    const pointsNeeded = Math.max(0, nextLevelPoints - currentPoints);
    const progressPercentage = pointsNeeded === 0 ? 100 : Math.min(100, (currentPoints / nextLevelPoints) * 100);

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-lavender/10 rounded-2xl border border-lavender/20 hidden md:block">
                            <Cpu className="text-lavender animate-pulse" size={24} />
                        </div>
                        <div>
                            <h2 className="text-5xl font-black font-outfit tracking-tight uppercase text-white">MISSION <span className="text-lavender">CONTROL</span></h2>
                            <p className="text-lavender font-bold tracking-[0.3em] uppercase mt-2 text-sm flex items-center">
                                <ShieldCheck size={14} className="mr-2" />
                                Node: {getRepTitle(currentPoints)}
                            </p>
                        </div>
                    </div>
                    {/* Bug #2 Fix: Leaderboard Button Visuals (Removed heavy shadow in CSS, kept simple here) */}
                    <div className="flex items-center space-x-3 bg-[#2D2B3F] p-2 rounded-2xl border border-white/5 mt-6 w-fit">
                        <div className="px-4 py-2 bg-[#1E1D2B] border border-white/5 rounded-xl min-w-[120px]">
                            <p className="text-[10px] text-lavender/60 font-black tracking-widest">PULSE POWER</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-xl font-black font-outfit text-white">{currentPoints.toLocaleString()}</p>
                                <Zap size={14} className="text-lavender fill-lavender" />
                            </div>
                        </div>
                        <button onClick={() => navigate('/leaderboard')} className="sculpted-button !py-2 !px-4 text-xs font-black tracking-widest text-white">LEADERBOARD</button>
                    </div>
                </div>
            </div>

            {/* Grid Layout: Stats & Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Bug #2 Fix: Action Cards Glow/Border */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <QuickActionCard onClick={() => navigate('/discover?create=true')} icon={Zap} title="New Signal" desc="Initiate showcase" color="lavender" />
                        <QuickActionCard icon={Target} title="Challenges" desc="Solve protocols" color="white" />
                        <QuickActionCard onClick={() => navigate('/discover')} icon={Users} title="Sync" desc="Connect talent" color="lavender" />
                    </div>

                    {/* Main Feed */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black tracking-[0.4em] text-lavender uppercase">ACTIVE FREQUENCIES</h3>
                            <Activity className="text-lavender/30 animate-pulse" size={16} />
                        </div>

                        {projectsLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="text-lavender animate-spin" size={32} />
                            </div>
                        ) : activeProjects.length === 0 ? (
                            <div className="sculpted-card p-12 text-center border-dashed border-white/10 bg-[#2D2B3F]">
                                <p className="text-lavender/40 font-bold italic uppercase tracking-widest text-xs">No active signals detected.</p>
                            </div>
                        ) : (
                            activeProjects.map((project) => (
                                <div key={project.id} className="sculpted-card p-8 group cursor-pointer transition-transform hover:-translate-y-1 shadow-2xl bg-[#2D2B3F] border-white/5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-4 mb-6">
                                            {/* Bug #4 Fix: Replaced solid filled icons with standard Lucide outline icons */}
                                            <div className="w-12 h-12 bg-[#1E1D2B] rounded-2xl flex items-center justify-center border border-lavender/20">
                                                <Target size={24} className="text-lavender" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold uppercase tracking-tight text-white">{project.title}</h4>
                                                <p className="text-xs text-lavender font-black uppercase tracking-widest mt-0.5">
                                                    {project.author?.full_name || 'Anonymous'} • {project.author?.department || 'KEC'}
                                                </p>
                                            </div>
                                        </div>
                                        <Bookmark className="text-lavender/30 group-hover:text-lavender transition-colors" size={20} />
                                    </div>

                                    <p className="text-platinum/70 leading-relaxed mb-8 max-w-2xl line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex space-x-3">
                                            <span className="px-3 py-1 bg-[#1E1D2B] text-[10px] font-black tracking-widest text-lavender border border-lavender/20 rounded-md">
                                                {project.category || 'INNOVATION'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm font-black group-hover:text-lavender transition-colors text-platinum">
                                            EXPAND SIGNAL <ChevronRight size={18} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="glass-panel rounded-[40px] p-8 border border-white/5 bg-[#2D2B3F]">
                        <div className="space-y-6">
                            {leaders?.map((leader, i) => (
                                <div key={leader.id} className="flex items-center justify-between group cursor-pointer" onClick={() => navigate('/leaderboard')}>
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-platinum/10 text-platinum/40'}`}>
                                            {i === 0 ? <Crown size={12} /> : i + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-lavender transition-colors">{leader.full_name}</p>
                                            <p className="text-[10px] font-black text-platinum/20 uppercase tracking-widest">{leader.department}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black tracking-widest text-lavender">{leader.points?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bug #1 Fix: Progress Color Logic */}
                        <div className="mt-10 p-6 bg-[#1E1D2B] rounded-3xl border border-white/5">
                            <p className="text-xs font-black text-lavender tracking-widest uppercase mb-2">NEXT LEVEL</p>
                            <p className="text-sm font-bold text-platinum/80 leading-snug mb-4">
                                {pointsNeeded === 0 ? "Level Cap Reached!" : `Earn ${pointsNeeded} more points to reach the next rank.`}
                            </p>
                            <div className="h-2 w-full bg-[#181722] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    className={`h-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] ${progressPercentage >= 100 ? 'bg-emerald-400' : 'bg-purple-500'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-lavender p-8 rounded-[40px] text-white overflow-hidden relative group shadow-2xl shadow-lavender/20">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black font-outfit mb-2 uppercase leading-none">HACKATHON<br />PRIME</h3>
                            <p className="text-sm font-bold opacity-80 mb-6 font-inter underline decoration-2 underline-offset-4">Reg opens in 48h</p>
                            <button className="bg-[#1E1D2B] text-white px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest flex items-center">
                                RESERVE SPACE <ArrowUpRight size={14} className="ml-2" />
                            </button>
                        </div>
                        <Target className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-125 transition-transform duration-700" size={200} />
                    </div>
                </aside>
            </div>
        </div>
    )
}

// Bug #3 Fix: Improved Text Contrast
const QuickActionCard = ({ icon: Icon, title, desc, color, onClick }) => (
    <div
        onClick={onClick}
        className={`p-6 bg-[#2D2B3F] border border-white/5 rounded-[30px] flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 transition-all ${color === 'lavender' ? 'border-t-4 border-t-lavender hover:shadow-[0_0_20px_rgba(167,139,250,0.1)]' : 'border-t-4 border-t-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
    >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${color === 'lavender' ? 'bg-lavender text-white shadow-lg shadow-lavender/20' : 'bg-platinum text-[#1E1D2B] shadow-lg shadow-platinum/20'}`}>
            <Icon size={24} />
        </div>
        <h4 className="font-black text-lg font-outfit mb-1 uppercase tracking-tight text-white">{title}</h4>
        {/* Adjusted contrast for description text */}
        <p className={`text-[10px] uppercase font-black tracking-[0.2em] ${color === 'lavender' ? 'text-lavender' : 'text-platinum/60'}`}>{desc}</p>
    </div>
)

export default Dashboard
