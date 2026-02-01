import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ArrowUp, Plus, Info, MessageCircle, Share2, Loader2, X, Zap, Bookmark, Briefcase, Layout } from 'lucide-react'
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
        <div className="max-w-7xl mx-auto space-y-8 text-platinum">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Collaboration Hub</h2>
                    <p className="text-platinum/60 text-sm mt-1">Find teammates or showcase your work.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="sculpted-button group flex items-center !px-6 !py-3"
                >
                    Create Post <Plus size={18} className="ml-2 group-hover:rotate-90 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-12 space-y-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="text-lavender animate-spin" size={32} />
                            <p className="text-lavender/60 text-xs font-bold">Loading posts...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-rose-500/10 rounded-3xl border border-rose-500/20">
                            <p className="text-rose-400 font-bold">Unable to load posts.</p>
                        </div>
                    ) : posts?.length === 0 ? (
                        <div className="text-center py-20 border-dashed border border-white/10 rounded-2xl bg-[#2D2B3F]">
                            <p className="text-platinum/40 font-medium">No posts yet. Be the first to collaborate!</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="sculpted-card p-6 flex gap-6 group hover:border-lavender/30 transition-all shadow-lg bg-[#2D2B3F] border-white/5"
                            >
                                {/* Vote Block */}
                                <div className="flex flex-col items-center min-w-[50px]">
                                    <button
                                        onClick={() => handleUpvote(post.id, post.upvotes)}
                                        disabled={upvoteMutation.isLoading}
                                        className={`p-2 transition-all hover:bg-lavender/10 rounded-lg ${upvoteMutation.isLoading ? 'opacity-50' : 'text-platinum/40 hover:text-lavender'}`}
                                    >
                                        <ArrowUp size={20} strokeWidth={3} />
                                    </button>
                                    <span className="text-lg font-bold text-white mt-1">{post.upvotes}</span>
                                </div>

                                {/* Content Block */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${post.category === 'LOOKING FOR TEAM'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {post.category || 'GENERAL'}
                                        </span>
                                        <span className="text-xs text-platinum/30">•</span>
                                        <span className="text-xs text-platinum/40">{dayjs(post.created_at).fromNow()}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-lavender transition-colors">{post.title}</h3>
                                        <p className="text-platinum/70 text-sm mt-2 line-clamp-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center text-platinum/40 text-xs font-bold hover:text-white transition-colors">
                                                <MessageCircle size={14} className="mr-2" /> Comment
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookmark(post.id);
                                                }}
                                                className={`flex items-center text-xs font-bold transition-colors ${profile?.bookmarks?.includes(post.id) ? 'text-lavender' : 'text-platinum/40 hover:text-lavender'}`}
                                            >
                                                <Bookmark size={14} className="mr-2" fill={profile?.bookmarks?.includes(post.id) ? "currentColor" : "none"} /> {profile?.bookmarks?.includes(post.id) ? 'Saved' : 'Save'}
                                            </button>
                                        </div>
                                        <p className="text-xs text-platinum/30">Posted by <span className="text-platinum/60 font-medium">{post.author?.full_name || 'Student'}</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

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
    const [postType, setPostType] = useState('LOOKING FOR TEAM'); // Default

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({
            title: formData.get('title'),
            content: formData.get('content'),
            category: postType
        })
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-[#1E1D2B] border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-platinum/40 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">Create New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Post Type Selector */}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setPostType('LOOKING FOR TEAM')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${postType === 'LOOKING FOR TEAM' ? 'border-lavender bg-lavender/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                        >
                            <Briefcase className={postType === 'LOOKING FOR TEAM' ? 'text-lavender' : 'text-platinum/50'} />
                            <p className={`text-sm font-bold ${postType === 'LOOKING FOR TEAM' ? 'text-white' : 'text-platinum/50'}`}>Looking for Team</p>
                        </div>
                        <div
                            onClick={() => setPostType('PROJECT SHOWCASE')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${postType === 'PROJECT SHOWCASE' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                        >
                            <Layout className={postType === 'PROJECT SHOWCASE' ? 'text-emerald-400' : 'text-platinum/50'} />
                            <p className={`text-sm font-bold ${postType === 'PROJECT SHOWCASE' ? 'text-white' : 'text-platinum/50'}`}>Project Showcase</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-platinum/60 uppercase tracking-wider">Title</label>
                        <input
                            required
                            name="title"
                            placeholder={postType === 'LOOKING FOR TEAM' ? "e.g., Need React Developer for Hackathon" : "e.g., Check out my new AI Drone"}
                            className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-lavender/50 text-white placeholder:text-platinum/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-platinum/60 uppercase tracking-wider">Details</label>
                        <textarea
                            required
                            name="content"
                            rows={5}
                            placeholder="Describe your project, the skills you need, or what you've built..."
                            className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-lavender/50 resize-none text-white placeholder:text-platinum/20"
                        />
                    </div>

                    {/* File Attachment (New) */}
                    <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2D2B3F] rounded-lg flex items-center justify-center text-lavender group-hover:scale-110 transition-transform">
                                <Plus size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Attach File</p>
                                <p className="text-xs text-platinum/40">Image or PDF (Max 5MB)</p>
                            </div>
                        </div>
                        <input type="file" accept="image/*,.pdf" className="hidden" />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-lavender hover:bg-[#7D7AFF] text-white rounded-xl font-bold text-sm tracking-wide transition-colors flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Post to Community'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Community
