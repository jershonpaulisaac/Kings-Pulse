import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Star, TrendingUp, Users, Zap, Target, Search } from 'lucide-react'
import { useQuery } from 'react-query'
import { supabase } from '../lib/supabase'

const Leaderboard = () => {
    const { data: leaders, isLoading } = useQuery('leaderboard', async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('points', { ascending: false })
            .limit(10);

        if (error) throw error;
        return data;
    });

    return (
        <div className="space-y-12 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-sm font-black tracking-[0.6em] text-lavender uppercase mb-2">Kings Pulse</h2>
                    <h3 className="text-5xl font-black font-outfit tracking-tighter uppercase">Innovator <span className="text-lavender">Leaderboard</span></h3>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="sculpted-card !bg-charcoal/50 flex items-center space-x-3 px-6 py-3">
                        <Users className="text-lavender" size={20} />
                        <div>
                            <p className="text-[10px] font-black text-lavender/60 uppercase tracking-widest leading-none">Total Nodes</p>
                            <p className="text-lg font-bold">{leaders?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top 3 Podium */}
            {!isLoading && leaders && leaders.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-10">
                    {/* Rank 2 */}
                    <PodiumRank rank={2} user={leaders[1]} delay={0.2} height="h-64" crown={Medal} crownColor="text-platinum/60" />
                    {/* Rank 1 */}
                    <PodiumRank rank={1} user={leaders[0]} delay={0} height="h-80" crown={Trophy} crownColor="text-yellow-500" />
                    {/* Rank 3 */}
                    <PodiumRank rank={3} user={leaders[2]} delay={0.4} height="h-56" crown={Star} crownColor="text-orange-400" />
                </div>
            )}

            {/* Detailed List */}
            <div className="max-w-5xl mx-auto space-y-4">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-platinum/30 uppercase tracking-[0.2em]">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Innovator</div>
                    <div className="col-span-3">Department</div>
                    <div className="col-span-3 text-right">Pulse Points</div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 rounded-2xl border-4 border-lavender border-t-transparent animate-spin"></div>
                    </div>
                ) : (
                    leaders?.slice(3).map((user, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={user.id}
                            className="grid grid-cols-12 items-center px-8 py-5 sculpted-card !bg-charcoal/30 hover:!bg-charcoal/50 transition-colors group cursor-pointer border-transparent hover:border-lavender/30"
                        >
                            <div className="col-span-1 font-black text-platinum/20 group-hover:text-lavender transition-colors">
                                #{index + 4}
                            </div>
                            <div className="col-span-5 flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-xl bg-lavender/10 border border-lavender/20 flex items-center justify-center font-black text-lavender">
                                    {user.full_name?.charAt(0) || '?'}
                                </div>
                                <div>
                                    <p className="font-bold text-white uppercase tracking-tight">{user.full_name}</p>
                                    <p className="text-[10px] font-black text-platinum/30 uppercase tracking-widest">{user.reputation_title || 'Novice Innovator'}</p>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <span className="text-xs font-black text-platinum/60 tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full">
                                    {user.department || 'GENERAL'}
                                </span>
                            </div>
                            <div className="col-span-3 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <span className="text-lg font-black text-lavender tracking-tighter">{user.points?.toLocaleString()}</span>
                                    <Zap size={14} className="text-lavender fill-lavender" />
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}

                {leaders?.length === 0 && !isLoading && (
                    <div className="text-center py-20 sculpted-card !bg-charcoal/20 border-dashed border-white/5">
                        <Users size={48} className="mx-auto text-platinum/10 mb-4" />
                        <p className="text-platinum/40 font-bold">Waiting for innovators to establish nodes...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const PodiumRank = ({ rank, user, delay, height, crown: Icon, crownColor }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
    >
        <div className={`w-full ${height} bg-gradient-to-t from-lavender/20 to-lavender/5 border-x border-t border-lavender/30 rounded-t-3xl relative flex flex-col items-center p-8 group overflow-hidden`}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className={`mb-4 ${crownColor} drop-shadow-[0_0_15px_currentColor]`}>
                    <Icon size={rank === 1 ? 48 : 32} />
                </div>

                <div className="w-20 h-20 rounded-2xl bg-charcoal border-2 border-lavender flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform">
                    {user?.profile_photo_url ? (
                        <img src={user.profile_photo_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-3xl font-black text-lavender">{user?.full_name?.charAt(0) || '?'}</span>
                    )}
                </div>

                <p className="text-sm font-black text-white uppercase tracking-tighter mb-1 text-center truncate w-full">{user?.full_name}</p>
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black text-lavender tracking-tighter">{user?.points?.toLocaleString()}</span>
                    <Zap size={16} className="text-lavender fill-lavender" />
                </div>
            </div>

            {/* Rank Indicator */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-raisin border-2 border-lavender rounded-xl flex items-center justify-center font-black text-xl text-lavender shadow-xl">
                {rank}
            </div>
        </div>
    </motion.div>
)

export default Leaderboard
