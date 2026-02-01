import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Filter, Layout, FileText, Image as ImageIcon, X, Loader2, UploadCloud } from 'lucide-react'
import { useProjects, useCreateProject } from '../hooks/useProjects'
import { useAuth } from '../context/AuthContext'
import { useSearchParams } from 'react-router-dom'

const Discovery = () => {
    const { user } = useAuth()
    const [searchParams] = useSearchParams()
    const { data: projects, isLoading } = useProjects()
    const createProjectMutation = useCreateProject()

    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('ALL')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(searchParams.get('create') === 'true')

    const categories = ['ALL', 'Web Dev', 'AI/ML', 'IoT', 'Mobile App', 'Blockchain', 'Cybersecurity', 'Cloud Computing', 'Data Science', 'Design']

    const filteredProjects = projects?.filter(p => {
        const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    }) || []

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Project Explorer</h2>
                    <p className="text-platinum/60 text-sm mt-1">Discover innovative projects and find collaboration opportunities.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="sculpted-button !px-6 !py-3 flex items-center gap-2"
                >
                    <Plus size={18} /> Upload Project
                </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/40" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects by title, domain, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-lavender/50 placeholder:text-platinum/20"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="relative min-w-[200px]">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full appearance-none bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lavender/50 cursor-pointer font-bold text-sm"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-platinum/40 pointer-events-none" />
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Loader2 className="animate-spin text-lavender" size={32} />
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-platinum/40">
                        No projects found matching your search.
                    </div>
                ) : (
                    filteredProjects.map(project => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#2D2B3F] border border-white/5 rounded-2xl overflow-hidden hover:border-lavender/30 transition-all group"
                        >
                            <div className="h-40 bg-black/20 flex items-center justify-center relative">
                                {project.image_url ? (
                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <Layout size={40} className="text-platinum/10" />
                                )}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase">
                                    {project.category || 'General'}
                                </div>
                            </div>
                            <div className="p-6 space-y-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-lavender transition-colors">{project.title}</h3>
                                <p className="text-platinum/60 text-sm line-clamp-2">{project.description}</p>
                                <div className="pt-4 flex items-center justify-between border-t border-white/5 text-xs text-platinum/40">
                                    <span>By {project.author?.full_name}</span>
                                    {project.doc_url && <span className="flex items-center gap-1 text-lavender"><FileText size={12} /> Docs Available</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreateProjectModal
                        onClose={() => setIsCreateModalOpen(false)}
                        onSubmit={async (data) => {
                            await createProjectMutation.mutateAsync({ ...data, author_id: user.id })
                            setIsCreateModalOpen(false)
                        }}
                        isLoading={createProjectMutation.isLoading}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

const CreateProjectModal = ({ onClose, onSubmit, isLoading }) => {
    // Note: In a real app, we'd handle file uploads to Supabase Storage here.
    // For this prototype, we'll confirm the UI fields exist as requested.

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            // image_file: formData.get('image'), // Would be handled by upload logic
            // doc_file: formData.get('doc')
        })
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-[#1E1D2B] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Upload Project</h2>
                    <button onClick={onClose}><X className="text-platinum/50 hover:text-white" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-platinum/60 uppercase">Project Title</label>
                        <input name="title" required className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-lavender/50 focus:outline-none" placeholder="e.g. AI Traffic Control System" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-platinum/60 uppercase">Category / Domain</label>
                            <select name="category" className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-lavender/50 focus:outline-none">
                                <option>Web Dev</option>
                                <option>AI/ML</option>
                                <option>IoT</option>
                                <option>Mobile App</option>
                                <option>Blockchain</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-platinum/60 uppercase">Looking For</label>
                            <input name="looking_for" className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-lavender/50 focus:outline-none" placeholder="e.g. Collaborators, Feedback" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-platinum/60 uppercase">Description</label>
                        <textarea name="description" required rows={4} className="w-full bg-[#2D2B3F] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-lavender/50 focus:outline-none resize-none" placeholder="Detailed description of your project..." />
                    </div>

                    {/* File Uploads UI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
                            <ImageIcon className="text-lavender mb-2" />
                            <p className="text-sm font-bold text-white">Project Cover Image</p>
                            <p className="text-xs text-platinum/40 mt-1">PNG, JPG up to 5MB</p>
                            <input type="file" accept="image/*" className="hidden" />
                        </div>
                        <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
                            <FileText className="text-emerald-400 mb-2" />
                            <p className="text-sm font-bold text-white">Project Documentation</p>
                            <p className="text-xs text-platinum/40 mt-1">PDF, DOCX, PPTX</p>
                            <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className="hidden" />
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full py-4 bg-lavender hover:bg-[#7D7AFF] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        {isLoading ? <Loader2 className="animate-spin" /> : <><UploadCloud size={20} /> Publish Project</>}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Discovery
