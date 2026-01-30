import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ArrowUp, Plus, Info, MessageCircle, Share2, Loader2, X, Zap, Bookmark } from 'lucide-react'
import { useForumPosts, useCreateForumPost, useUpvotePost } from '../hooks/useForumPosts'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateBookmarks } from '../hooks/useProfile'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Community = () => {
    const { user } = useAuth()
    const { data: profile } = useProfile(user?.id)
    const { data: posts, isLoading, error } = useForumPosts()
    const createPostMutation = useCreateForumPost()
    const upvoteMutation = useUpvotePost()
    const updateBookmarksMutation = useUpdateBookmarks()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleUpvote = (id, currentUpvotes) => {
        upvoteMutation.mutate({ id, currentUpvotes })
    }

    const handleBookmark = (id) => {
        updateBookmarksMutation.mutate({
            userId: user.id,
            projectId: id,
            isBookmarked: profile?.bookmarks?.includes(id)
        })
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 text-platinum">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div>
                    <h2 className="text-5xl font-black font-outfit tracking-tighter uppercase leading-none text-white">COLLABORATION<br /><span className="text-lavender">STREAMS</span></h2>
                    <p className="text-lavender font-bold tracking-[0.4em] uppercase mt-4 text-sm">Synchronizing Shared Intelligence</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="sculpted-button group flex items-center !px-8 !py-5"
                >
                    INITIATE BROADCAST <Plus size={18} className="ml-3 group-hover:rotate-90 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="text-lavender animate-spin" size={48} />
                            <p className="text-lavender font-black tracking-widest uppercase text-xs">Accessing Channels...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-charcoal/30 rounded-3xl border border-red-500/20">
                            <p className="text-red-400 font-bold">Secure Socket Disconnected</p>
                            <p className="text-lavender/60 text-sm mt-2">Could not retrieve community signals.</p>
                        </div>
                    ) : posts?.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-lavender/60 font-medium italic">No signal broadcasts found in this sector.</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="sculpted-card p-1 flex group cursor-pointer hover:border-lavender/30 transition-all shadow-xl !bg-charcoal/50"
                            >
                                {/* Vote Block */}
                                <div className="bg-raisin/50 w-20 sm:w-24 flex flex-col items-center justify-center p-4 border-r border-white/5">
                                    <button
                                        onClick={() => handleUpvote(post.id, post.upvotes)}
                                        disabled={upvoteMutation.isLoading}
                                        className={`p-3 transition-all hover:bg-lavender/5 rounded-xl ${upvoteMutation.isLoading ? 'opacity-50' : 'text-lavender/40 hover:text-lavender'}`}
                                    >
                                        <ArrowUp size={24} strokeWidth={3} />
                                    </button>
                                    <span className="text-xl font-black font-outfit mt-2 text-white">{post.upvotes}</span>
                                </div>

                                {/* Content Block */}
                                <div className="flex-1 p-6 sm:p-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 bg-raisin text-[10px] font-black tracking-widest text-lavender uppercase border border-lavender/20">{post.category || 'GENERAL'}</span>
                                        <span className="text-[10px] font-bold text-platinum/20 uppercase tracking-widest">{dayjs(post.created_at).fromNow()}</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black font-outfit leading-tight group-hover:text-lavender transition-colors text-white">{post.title}</h3>
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center text-platinum/40 text-xs font-bold">
                                                <MessageCircle size={14} className="mr-2" /> 0 Signals
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookmark(post.id);
                                                }}
                                                className={`flex items-center text-xs font-bold transition-colors ${profile?.bookmarks?.includes(post.id) ? 'text-lavender' : 'text-platinum/40 hover:text-lavender'}`}
                                            >
                                                <Bookmark size={14} className="mr-2" fill={profile?.bookmarks?.includes(post.id) ? "currentColor" : "none"} /> {profile?.bookmarks?.includes(post.id) ? 'SAVED' : 'SAVE'}
                                            </button>
                                            <div className="flex items-center text-platinum/40 text-xs font-bold hover:text-lavender">
                                                <Share2 size={14} className="mr-2" /> Share
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-black text-lavender uppercase tracking-widest">By {post.author?.full_name || 'Anonymous'}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}

                    {!isLoading && !error && posts?.length > 0 && (
                        <div className="flex justify-center pt-10">
                            <button className="text-[10px] font-black tracking-[1em] text-lavender/30 hover:text-lavender transition-all uppercase px-10 py-4 border border-white/5">
                                Load Historic Data
                            </button>
                        </div>
                    )}
                </div>

                <aside className="lg:col-span-4 space-y-8">
                    <div className="glass-panel p-10 rounded-[40px] bg-charcoal/30 border border-white/5">
                        <div className="flex items-center space-x-4 mb-8">
                            <Info className="text-lavender" />
                            <h3 className="font-black font-outfit text-xl text-white">PROTOCOL TIPS</h3>
                        </div>
                        <p className="text-sm font-medium text-platinum/50 leading-relaxed mb-8">
                            Helpful signals earn you **Growth Pulse Points**. Verified innovators receive priority bandwidth in the SIH network.
                        </p>
                        <div className="p-6 bg-raisin/50 rounded-3xl border border-white/5 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span>Topic of the Day</span>
                                <span className="text-lavender">#EdgeAI</span>
                            </div>
                            <div className="w-full h-1 bg-lavender/20 rounded-full">
                                <div className="w-3/4 h-full bg-lavender"></div>
                            </div>
                        </div>
                    </div>

                    <div className="sculpted-card p-10 bg-lavender !rounded-none text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black font-outfit leading-none mb-4">REPUTATION<br />BOOST</h3>
                            <p className="text-sm font-bold opacity-80 mb-8">Solve a technical protocol today.</p>
                            <button className="bg-raisin px-6 py-3 text-[10px] font-black tracking-widest uppercase">Go to Challenges</button>
                        </div>
                        <MessageSquare size={150} className="absolute -bottom-10 -right-10 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                </aside>
            </div>
            <div className="h-20"></div>
            {/* Create Post Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreatePostModal
                        onClose={() => setIsCreateModalOpen(false)}
                        onSubmit={async (formData) => {
                            await createPostMutation.mutateAsync({
                                ...formData,
                                author_id: user.id,
                                upvotes: 0
                            })
                            setIsCreateModalOpen(false)
                        }}
                        isLoading={createPostMutation.isLoading}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

const CreatePostModal = ({ onClose, onSubmit, isLoading }) => {
    const categories = ['GENERAL', 'TECHNICAL', 'CAREERS', 'EVENTS', 'RESEARCH']

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category')
        })
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-raisin/90 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-charcoal border border-white/5 rounded-[40px] p-12 shadow-2xl overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-lavender/40 hover:text-lavender transition-colors">
                    <X size={24} />
                </button>

                <div className="mb-10 text-center text-white">
                    <h2 className="text-4xl font-black font-outfit uppercase tracking-tighter">INITIATE <span className="text-lavender">BROADCAST</span></h2>
                    <p className="text-[10px] text-lavender font-black tracking-[0.4em] uppercase mt-2">Opening Channel for Community Intelligence</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Signal Heading</label>
                        <input
                            required
                            name="title"
                            placeholder="WHAT ARE WE BROADCASTING?"
                            className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-bold text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Channel Sector</label>
                        <select
                            name="category"
                            className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-bold appearance-none text-platinum/60"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Signal Content</label>
                        <textarea
                            required
                            name="content"
                            rows={4}
                            placeholder="TRANSMIT YOUR MESSAGE..."
                            className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-medium resize-none text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sculpted-button !py-5 !text-lg flex items-center justify-center group"
                    >
                        {isLoading ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <>
                                TRANSMIT TO STREAMS
                                <Zap size={20} className="ml-3 group-hover:scale-125 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Community
