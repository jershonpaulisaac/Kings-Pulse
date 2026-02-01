import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Filter, Mail, ExternalLink } from 'lucide-react'
import { useQuery } from 'react-query'
import { supabase } from '../lib/supabase'
import dayjs from 'dayjs'

const Events = () => {
    const [filterDept, setFilterDept] = useState('ALL')
    const [filterMonth, setFilterMonth] = useState('ALL')

    // Mock data for now
    const events = [
        { id: 1, title: 'Hackathon Prime', date: '2026-03-15', dept: 'CSE', time: '10:00 AM', location: 'Main Auditorium', description: '24-hour coding marathon.' },
        { id: 2, title: 'Robotics Workshop', date: '2026-02-20', dept: 'ECE', time: '2:00 PM', location: 'Lab Complex B', description: 'Hands-on Arduino session.' },
        { id: 3, title: 'Civil Symposium', date: '2026-04-05', dept: 'CIVIL', time: '9:00 AM', location: 'Seminar Hall', description: 'Sustainable infrastructure talks.' },
    ]

    const filteredEvents = events.filter(event => {
        const matchesDept = filterDept === 'ALL' || event.dept === filterDept;
        const matchesMonth = filterMonth === 'ALL' || dayjs(event.date).format('MMMM') === filterMonth;
        return matchesDept && matchesMonth;
    })

    const departments = ['ALL', 'CSE', 'ECE', 'MECH', 'CIVIL']
    const months = ['ALL', 'February', 'March', 'April', 'May']

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Campus Events</h2>
                    <p className="text-platinum/60 text-sm mt-1">Stay updated with workshops, symposiums, and cultural fests.</p>
                </div>
                <a
                    href="mailto:admin@college.edu?subject=Event Suggestion"
                    className="sculpted-button bg-[#2D2B3F] hover:bg-white/10 !border-white/10 !text-white flex items-center gap-2 !px-4 !py-3"
                >
                    <Mail size={16} /> Suggest an Event
                </a>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-2 bg-[#2D2B3F] p-2 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-platinum/40 px-2">DEPT:</span>
                    <select
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                        className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer"
                    >
                        {departments.map(d => <option key={d} value={d} className="bg-[#2D2B3F]">{d}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2 bg-[#2D2B3F] p-2 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-platinum/40 px-2">MONTH:</span>
                    <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer"
                    >
                        {months.map(m => <option key={m} value={m} className="bg-[#2D2B3F]">{m}</option>)}
                    </select>
                </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                    <p className="text-center py-10 text-platinum/40">No events found for selected filters.</p>
                ) : (
                    filteredEvents.map((event) => (
                        <div key={event.id} className="bg-[#2D2B3F] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-lavender/30 transition-all group">
                            {/* Date Block */}
                            <div className="bg-[#1E1D2B] rounded-xl p-4 flex flex-col items-center justify-center min-w-[80px] border border-white/5 group-hover:border-lavender/30 transition-colors">
                                <span className="text-xs font-black text-rose-400 uppercase">{dayjs(event.date).format('MMM')}</span>
                                <span className="text-2xl font-black text-white">{dayjs(event.date).format('DD')}</span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-platinum/60 border border-white/5">{event.dept}</span>
                                    <span className="flex items-center text-xs text-platinum/50"><Clock size={12} className="mr-1" /> {event.time}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                <p className="text-platinum/60 text-sm">{event.description}</p>
                                <div className="flex items-center text-xs text-lavender pt-2">
                                    <MapPin size={12} className="mr-1" /> {event.location}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="flex items-center">
                                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-lavender hover:text-white text-platinum/60 font-bold text-xs transition-colors">
                                    Register
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Events
