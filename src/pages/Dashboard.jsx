import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Zap, Target, Users, TrendingUp, ChevronRight, Bookmark,
    ArrowUpRight, Loader2, Activity, Cpu, ShieldCheck, Globe, Crown
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

    // Reputation Logic (Sync with Profile)
    const getRepTitle = (points) => {
        if (points >= 5001) return 'Grand Matrix Innovator';
        if (points >= 1501) return 'Sync Master';
        if (points >= 501) return 'Signal Architect';
        if (points >= 101) return 'Pulse Pioneer';
        return 'Novice Innovator';
    }

    const activeProjects = projects?.slice(0, 2) || []

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
                            <h2 className="text-5xl font-black font-outfit tracking-tight uppercase">MISSION <span className="text-lavender">CONTROL</span></h2>
                            <p className="text-lavender font-bold tracking-[0.3em] uppercase mt-2 text-sm flex items-center">
                                <ShieldCheck size={14} className="mr-2" />
                                Node: {getRepTitle(profile?.points || 0)} // {profile ? 'Optimal' : 'Standby'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-charcoal p-2 rounded-2xl border border-white/5">
                        <div className="px-4 py-2 bg-charcoal border border-white/5 rounded-xl min-w-[120px]">
                            <p className="text-[10px] text-lavender/60 font-black tracking-widest">PULSE POWER</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-xl font-black font-outfit">{profile?.points?.toLocaleString() || '0'}</p>
                                <Zap size={14} className="text-lavender fill-lavender" />
                            </div>
                        </div>
                        <button onClick={() => navigate('/leaderboard')} className="sculpted-button !py-2 !px-4 text-xs font-black tracking-widest">LEADERBOARD</button>
                    </div>
                </div>
            </div>

            {/* Grid Layout: Stats & Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Stats & Recommendations */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <QuickActionCard onClick={() => navigate('/discover?create=true')} icon={Zap} title="New Signal" desc="Initiate showcase" color="lavender" />
                        <QuickActionCard icon={Target} title="Challenges" desc="Solve protocols" color="white" />
                        <QuickActionCard onClick={() => navigate('/discover')} icon={Users} title="Sync" desc="Connect talent" color="lavender" />
                    </div>

                    {/* Main Feed: Active Showcases */}
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
                            <div className="sculpted-card p-12 text-center border-dashed border-white/10">
                                <p className="text-lavender/40 font-bold italic uppercase tracking-widest text-xs">No active signals detected in your sector.</p>
                            </div>
                        ) : (
                            activeProjects.map((project, i) => (
                                <div key={project.id} className="sculpted-card p-8 group cursor-pointer transition-transform hover:-translate-y-1 shadow-2xl">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-12 h-12 bg-raisin rounded-2xl flex items-center justify-center border border-lavender/20">
                                                <Target size={24} className="text-lavender" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold uppercase tracking-tight">{project.title}</h4>
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
                                            <span className="px-3 py-1 bg-raisin text-[10px] font-black tracking-widest text-lavender border border-lavender/20 rounded-md">
                                                {project.category || 'INNOVATION'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm font-black group-hover:text-lavender transition-colors">
                                            EXPAND SIGNAL <ChevronRight size={18} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Activity & Trends */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="glass-panel rounded-[40px] p-8 border border-white/5 bg-charcoal/30">
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

                        <div className="mt-10 p-6 bg-raisin/50 rounded-3xl border border-white/5">
                            <p className="text-xs font-black text-lavender tracking-widest uppercase mb-2">NEXT LEVEL</p>
                            <p className="text-sm font-bold text-platinum/80 leading-snug mb-4">
                                Earn {Math.max(0, (reputationThresholds[getRepLevel(profile?.points || 0)] || 0) - (profile?.points || 0))} more points to reach the next rank.
                            </p>
                            <div className="h-2 w-full bg-charcoal rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, ((profile?.points || 0) / (reputationThresholds[getRepLevel(profile?.points || 0)] || 5000)) * 100)}%` }}
                                    className="h-full bg-lavender rounded-full shadow-[0_0_10px_rgba(94,83,115,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-lavender p-8 rounded-[40px] text-white overflow-hidden relative group shadow-2xl shadow-lavender/20">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black font-outfit mb-2 uppercase leading-none">HACKATHON<br />PRIME</h3>
                            <p className="text-sm font-bold opacity-80 mb-6 font-inter underline decoration-2 underline-offset-4">Reg opens in 48h</p>
                            <button className="bg-raisin text-white px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest flex items-center">
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

const QuickActionCard = ({ icon: Icon, title, desc, color, onClick }) => (
    <div
        onClick={onClick}
        className={`p-6 bg-charcoal border border-white/5 rounded-[30px] flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 transition-all ${color === 'lavender' ? 'hover:border-lavender/50' : 'hover:border-white/30'}`}
    >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${color === 'lavender' ? 'bg-lavender text-white shadow-lg shadow-lavender/20' : 'bg-platinum text-raisin shadow-lg shadow-platinum/20'}`}>
            <Icon size={24} />
        </div>
        <h4 className="font-black text-lg font-outfit mb-1 uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] uppercase font-black text-lavender tracking-[0.2em]">{desc}</p>
    </div>
)

const TrendingItem = ({ label, growth, active }) => (
    <div className="flex items-center justify-between group cursor-pointer">
        <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-4 ${active ? 'bg-lavender shadow-[0_0_8px_rgba(94,83,115,0.8)]' : 'bg-platinum/20'}`}></div>
            <p className={`text-sm font-bold uppercase tracking-tight transition-colors ${active ? 'text-platinum' : 'text-platinum/40 group-hover:text-platinum/70'}`}>{label}</p>
        </div>
        <p className={`text-xs font-black tracking-widest ${active ? 'text-lavender' : 'text-platinum/20'}`}>{growth}</p>
    </div>
)

export default Dashboard
