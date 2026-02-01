import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Code, Briefcase, Mail } from 'lucide-react'
import { useQuery } from 'react-query'
import { supabase } from '../lib/supabase'

const StudentSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterDept, setFilterDept] = useState('ALL')

    const { data: students, isLoading } = useQuery('students-directory', async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('full_name', { ascending: true })
        if (error) throw error
        return data
    })

    const filteredStudents = students?.filter(student => {
        const matchesSearch = student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDept = filterDept === 'ALL' || student.department === filterDept;
        return matchesSearch && matchesDept;
    }) || []

    const departments = ['ALL', 'CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'AI&DS']

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Student Directory</h2>
                <p className="text-platinum/60 text-sm mt-1">Find peers with specific skills for your next project.</p>
            </div>

            {/* Search Bar */}
            <div className="bg-[#2D2B3F] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/40" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or skill (e.g. 'Python', 'React')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1E1D2B] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-lavender/50 placeholder:text-platinum/20"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {departments.map(dept => (
                        <button
                            key={dept}
                            onClick={() => setFilterDept(dept)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${filterDept === dept ? 'bg-lavender text-white' : 'bg-[#1E1D2B] text-platinum/50 hover:bg-white/10'}`}
                        >
                            {dept}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <p className="text-platinum/50">Loading directory...</p>
                ) : filteredStudents.length === 0 ? (
                    <p className="text-platinum/50 col-span-full text-center py-10">No students found matching your criteria.</p>
                ) : (
                    filteredStudents.map((student) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#2D2B3F] border border-white/5 rounded-2xl p-6 hover:border-lavender/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-lg font-bold text-lavender border border-white/5">
                                        {student.full_name?.[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{student.full_name}</h3>
                                        <p className="text-xs text-platinum/50 flex items-center gap-1">
                                            <Briefcase size={12} /> {student.department || 'Student'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Skills */}
                                <div>
                                    <p className="text-[10px] font-bold text-platinum/40 uppercase tracking-widest mb-2">Top Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {student.skills?.slice(0, 3).map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-[#1E1D2B] border border-white/5 rounded text-[10px] text-platinum/70">
                                                {skill}
                                            </span>
                                        )) || <span className="text-xs text-platinum/20 italic">No skills listed</span>}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 rounded-xl border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                                <Mail size={14} /> Send Message
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}

export default StudentSearch
