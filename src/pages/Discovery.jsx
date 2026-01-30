import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Cpu, Code, Globe, Layout, Layers, Database, User, Zap, ChevronRight, Loader2, Plus, X } from 'lucide-react'
import { useProjects, useCreateProject, useSyncProject } from '../hooks/useProjects'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateBookmarks } from '../hooks/useProfile'

const Discovery = () => {
    const [activeFilter, setActiveFilter] = useState('ALL')
    const [searchQuery, setSearchQuery] = useState('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { user } = useAuth()
    const { data: profile } = useProfile(user?.id)
    const { data: projects, isLoading, error } = useProjects()
    const createProjectMutation = useCreateProject()
    const syncProjectMutation = useSyncProject()
    const updateBookmarksMutation = useUpdateBookmarks()

    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setIsCreateModalOpen(true)
        }
    }, [searchParams])

    const handleCloseModal = () => {
        setIsCreateModalOpen(false)
        if (searchParams.get('create')) {
            const newParams = new URLSearchParams(searchParams)
            newParams.delete('create')
            setSearchParams(newParams)
        }
    }

    const sectors = ['ALL', 'WEB', 'MOBILE', 'AI/ML', 'IOT', 'BLOCKCHAIN', 'MECH']

    const filteredProjects = projects?.filter(project => {
        const matchesFilter = activeFilter === 'ALL' || (project.category && project.category.toUpperCase() === activeFilter);
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Header & Sub-Nav */}
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-5xl font-black font-outfit tracking-tighter">SIGNAL <span className="text-lavender">DISCOVERY</span></h2>
                        <p className="text-lavender font-bold tracking-[0.4em] uppercase mt-2 text-sm">Targeting Global Innovation Nodes</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="sculpted-button group flex items-center !px-10 !py-4"
                    >
                        <Plus size={20} className="mr-3 group-hover:rotate-90 transition-transform" />
                        START A SYNC
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-b border-white/5 pb-8">
                    {sectors.map(sector => (
                        <button
                            key={sector}
                            onClick={() => setActiveFilter(sector)}
                            className={`px-8 py-3 text-[11px] font-black tracking-widest transition-all ${activeFilter === sector
                                ? 'bg-lavender text-white shadow-lg shadow-lavender/20'
                                : 'bg-charcoal text-lavender/50 hover:text-lavender hover:bg-lavender/5 border border-white/5'
                                }`}
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            {sector}
                        </button>
                    ))}
                </div>
            </div>

            {/* Discovery Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="text-lavender animate-spin" size={48} />
                    <p className="text-lavender font-black tracking-widest uppercase text-xs">Synchronizing Signals...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-charcoal/30 rounded-3xl border border-red-500/20">
                    <p className="text-red-400 font-bold">Signal Interference Detected</p>
                    <p className="text-lavender/60 text-sm mt-2">Check your connection or credentials.</p>
                </div>
            ) : filteredProjects?.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-lavender/60 font-medium italic">No active nodes found in this sector.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects?.map((project, i) => (
                        <DiscoveryCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            )}

            {/* Load More Protocol */}
            {!isLoading && !error && filteredProjects?.length > 0 && (
                <div className="flex justify-center pt-10">
                    <button className="flex items-center space-x-4 group">
                        <div className="w-12 h-px bg-white/10 group-hover:w-24 transition-all"></div>
                        <p className="text-[10px] font-black tracking-[0.8em] text-lavender uppercase">Extend Search Matrix</p>
                        <div className="w-12 h-px bg-white/10 group-hover:w-24 transition-all"></div>
                    </button>
                </div>
            )}

            {/* Create Project Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreateProjectModal
                        onClose={handleCloseModal}
                        onSubmit={async (formData) => {
                            await createProjectMutation.mutateAsync({
                                ...formData,
                                student_id: user.id,
                                media_urls: [],
                            })
                            handleCloseModal()
                        }}
                        isLoading={createProjectMutation.isLoading}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

const CreateProjectModal = ({ onClose, onSubmit, isLoading }) => {
    const sectors = ['WEB', 'MOBILE', 'AI/ML', 'IOT', 'BLOCKCHAIN', 'MECH']

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({
            title: formData.get('title'),
            description: formData.get('description'),
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

                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black font-outfit uppercase tracking-tighter">INITIATE <span className="text-lavender">SYNC</span></h2>
                    <p className="text-[10px] text-lavender font-black tracking-[0.4em] uppercase mt-2">Broadcasting New Technical Signal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Signal Title</label>
                        <input
                            required
                            name="title"
                            placeholder="NAME YOUR ARCHITECTURE"
                            className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-bold"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Sector Matrix</label>
                            <select
                                name="category"
                                className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-bold appearance-none text-platinum/60"
                            >
                                {sectors.filter(s => s !== 'ALL').map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Priority Level</label>
                            <div className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between text-[10px] font-black tracking-widest text-lavender/40">
                                <span>STANDARD SYNC</span>
                                <div className="w-2 h-2 rounded-full bg-lavender animate-pulse shadow-[0_0_10px_rgba(94,83,115,1)]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-lavender tracking-widest uppercase ml-4">Technical Breakdown</label>
                        <textarea
                            required
                            name="description"
                            rows={4}
                            placeholder="DESCRIBE THE STACK AND MISSION OBJECTIVES..."
                            className="w-full bg-raisin/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-lavender/50 transition-all font-medium resize-none"
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
                                BROADCAST SIGNAL
                                <Zap size={20} className="ml-3 group-hover:scale-125 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

const DiscoveryCard = ({ id, title, description, category, author, media_urls, created_at, syncs, index, onSync, isBookmarked, onBookmark }) => {
    const icons = [Cpu, Code, Globe, Layout, Layers, Database]
    const Icon = icons[index % 6]

    return (
        <motion.div
            className="sculpted-card p-0 flex flex-col group h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            {/* Image/Visual Placeholder */}
            <div className="aspect-video bg-raisin relative overflow-hidden flex items-center justify-center border-b border-white/5">
                {media_urls?.[0] ? (
                    <img src={media_urls[0]} alt={title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                ) : (
                    <Icon size={80} className="text-lavender/20 group-hover:text-lavender/40 transition-colors duration-500 scale-100 group-hover:scale-110" />
                )}
                <div className="absolute top-4 right-4 px-3 py-1 bg-lavender/20 backdrop-blur-md rounded-lg flex items-center space-x-2 border border-lavender/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulse"></div>
                    <span className="text-[10px] font-black text-lavender tracking-[0.2em] uppercase">ACTIVE</span>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-lavender/10 flex items-center justify-center text-lavender border border-lavender/20 overflow-hidden">
                        {author?.profile_photo_url ? (
                            <img src={author.profile_photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={16} />
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-platinum">{author?.full_name || 'Anonymous'}</p>
                        <p className="text-[9px] text-lavender font-black uppercase tracking-widest">{author?.department || 'SECURE'} • Year {author?.year || 'X'}</p>
                    </div>
                </div>

                <h3 className="text-2xl font-black font-outfit uppercase tracking-tighter mb-4 leading-none group-hover:text-lavender transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-platinum/50 font-medium leading-relaxed mb-10 flex-1 line-clamp-3">
                    {description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onSync();
                            }}
                            className="flex items-center text-platinum/40 text-xs font-bold hover:text-lavender transition-colors"
                        >
                            <Zap size={14} className="mr-2" /> {syncs || 0} Syncs
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmark();
                            }}
                            className={`flex items-center text-xs font-bold transition-colors ${isBookmarked ? 'text-lavender' : 'text-platinum/40 hover:text-lavender'}`}
                        >
                            <Bookmark size={14} className="mr-2" fill={isBookmarked ? "currentColor" : "none"} /> {isBookmarked ? 'SAVED' : 'SAVE'}
                        </button>
                        <div className="flex items-center text-platinum/40 text-xs font-bold">
                            <User size={14} className="mr-2" /> {author?.full_name || 'Innovator'}
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-raisin flex items-center justify-center text-lavender border border-white/5 hover:bg-lavender hover:text-white transition-all transform group-hover:rotate-12">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default Discovery
