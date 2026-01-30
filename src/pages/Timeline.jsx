import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, ChevronRight, Zap, Target, Loader2 } from 'lucide-react'
import { useEvents } from '../hooks/useEvents'
import dayjs from 'dayjs'

const Timeline = () => {
    const { data: events, isLoading, error } = useEvents()

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div>
                    <h2 className="text-5xl font-black font-outfit tracking-tighter uppercase leading-none">ANNUAL<br /><span className="text-lavender">CHRONOLOGY</span></h2>
                    <p className="text-lavender font-bold tracking-[0.4em] uppercase mt-4 text-sm">Targeting Strategic Milestones</p>
                </div>
                <div className="flex bg-charcoal p-1 rounded-2xl border border-white/5">
                    <button className="px-6 py-2.5 bg-lavender text-white text-[10px] font-black tracking-widest uppercase rounded-xl shadow-lg shadow-lavender/20">Upcoming</button>
                    <button className="px-6 py-2.5 text-platinum/40 text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">Archived</button>
                </div>
            </div>

            <div className="space-y-8 max-w-5xl">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="text-lavender animate-spin" size={48} />
                        <p className="text-lavender font-black tracking-widest uppercase text-xs">Retrieving Chronology...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-charcoal/30 rounded-3xl border border-red-500/20">
                        <p className="text-red-400 font-bold">Temporal Sync Failure</p>
                        <p className="text-lavender/60 text-sm mt-2">Could not access the event stream.</p>
                    </div>
                ) : events?.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-lavender/60 font-medium italic">No upcoming milestones detected.</p>
                    </div>
                ) : (
                    events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex group"
                        >
                            {/* Vertical Time Indicator */}
                            <div className="w-32 flex flex-col items-center justify-start pt-10 border-r border-white/5 relative">
                                <div className="absolute top-0 right-[-5px] w-[9px] h-[9px] bg-lavender rounded-full shadow-[0_0_10px_#5E5373]"></div>
                                <p className="text-2xl font-black font-outfit uppercase">{dayjs(event.date).format('MMM')}</p>
                                <p className="text-[10px] font-black text-lavender tracking-widest uppercase">{dayjs(event.date).format('DD')}</p>
                            </div>

                            {/* Event Content */}
                            <div className="flex-1 pl-12 pb-12">
                                <div className="sculpted-card p-10 flex flex-col md:flex-row items-center gap-10 group-hover:border-lavender/30 transition-all shadow-2xl">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="px-3 py-1 bg-raisin text-[10px] font-black tracking-widest text-lavender uppercase border border-lavender/20">{event.category || 'EVENT'}</span>
                                        </div>
                                        <h3 className="text-3xl font-black font-outfit leading-tight group-hover:text-lavender transition-colors uppercase">{event.title}</h3>
                                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-platinum/40 uppercase tracking-widest">
                                            <span className="flex items-center"><MapPin size={14} className="mr-2 text-lavender" /> {event.location || 'SECURE LAB'}</span>
                                            <span className="flex items-center"><Users size={14} className="mr-2 text-lavender" /> SYNCED SIGNAL</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-lavender tracking-[0.2em] uppercase mb-1">IMPACT</p>
                                            <p className="text-3xl font-black font-outfit tracking-tighter">9.{index + 1}</p>
                                        </div>
                                        <button className="w-16 h-16 bg-lavender text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl shadow-lavender/10" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                                            <ChevronRight size={28} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <div className="sculpted-card p-12 bg-charcoal/30 flex flex-col md:flex-row items-center justify-between border-dashed border-white/10 mt-20">
                <div className="flex items-center space-x-10 mb-8 md:mb-0">
                    <div className="w-20 h-20 bg-lavender/10 rounded-full flex items-center justify-center text-lavender border border-lavender/20">
                        <Target size={36} />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black font-outfit uppercase tracking-tighter">SUGGEST A FREQUENCY</h4>
                        <p className="text-sm font-medium text-platinum/40">Have a technical event idea? Propose it to the Innovation Council.</p>
                    </div>
                </div>
                <button className="sculpted-button">INITIATE PROPOSAL</button>
            </div>
            <div className="h-20"></div>
        </div>
    )
}

export default Timeline
