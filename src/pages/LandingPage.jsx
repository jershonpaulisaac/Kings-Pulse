import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Shield, ChevronRight, Users, Cpu, Code, Globe, Layout, Layers, Database } from 'lucide-react'

const LandingPage = () => {
    return (
        <div className="relative overflow-hidden selection:bg-lavender selection:text-white bg-raisin text-platinum min-h-screen">
            {/* Dynamic Background Noise/Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-lavender/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lavender/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Navigation - Simplified to prevent glitches */}
            <nav className="relative z-50 h-24 px-8 md:px-16 flex items-center justify-between backdrop-blur-md bg-raisin/50 sticky top-0 border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-black font-outfit tracking-tighter">KINGS <span className="text-lavender">PULSE</span></h1>
                </div>
                <Link to="/login" className="sculpted-button !px-8 !text-xs tracking-[0.2em]">ACCESS PORTAL</Link>
            </nav>

            <main className="relative z-10 px-8 md:px-16 pt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Hero Content */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-xs font-black tracking-[0.6em] text-lavender uppercase mb-6">Kings Engineering College</h2>
                            <h3 className="text-7xl md:text-9xl font-black font-outfit leading-[0.8] tracking-tighter mb-4">
                                SECURE<br />
                                <span className="text-lavender">PULSE</span><br />
                                SYNC.
                            </h3>
                            <p className="text-lg md:text-xl font-medium text-platinum/60 max-w-lg mt-10 leading-relaxed font-inter">
                                The flagship collaboration protocol for KEC innovators. Share signals, discover talent, and synchronize your mission in high-fidelity.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center gap-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link to="/login" className="sculpted-button group flex items-center !text-lg !px-10 !py-5">
                                IDENTITY SYNC <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Visual Hero Element */}
                    <div className="relative group perspective-1000 hidden lg:block">
                        <motion.div
                            initial={{ rotateY: -20, rotateX: 10, scale: 0.8, opacity: 0 }}
                            animate={{ rotateY: 5, rotateX: -5, scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 w-full aspect-square sculpted-card !p-0 overflow-hidden transform-style-3d group-hover:scale-[1.02] transition-transform duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] !bg-charcoal/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-lavender/40 via-transparent to-black/60 z-20 pointer-events-none"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lavender/10 z-0">
                                <Zap size={600} strokeWidth={0.5} />
                            </div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-20 z-30">
                                <div className="w-full h-px bg-white/10 mb-8 self-start"></div>
                                <h4 className="text-4xl font-black font-outfit uppercase tracking-tighter leading-none mb-4 self-start">BUILD THE FUTURE.<br />START YOUR <span className="text-lavender">PULSE.</span></h4>
                                <div className="w-24 h-2 bg-lavender self-start shadow-[0_0_20px_rgba(94,83,115,0.8)]"></div>
                            </div>

                            <div className="absolute bottom-10 right-10 z-40">
                                <div className="sculpted-card !bg-raisin/90 flex items-center space-x-4 px-6 py-4 border-lavender/30">
                                    <Target className="text-lavender" />
                                    <div>
                                        <p className="text-[10px] font-black text-lavender tracking-widest uppercase">Innovation Pulse</p>
                                        <p className="text-sm font-bold">JOIN THE MATRIX</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Pictorial Protocol Flow Diagram */}
                <section className="mt-60 mb-40">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-black tracking-[0.8em] text-lavender uppercase mb-4">The KEC Protocol</h2>
                        <h3 className="text-5xl font-black font-outfit tracking-tighter uppercase">Mission <span className="text-lavender">Workflow</span></h3>
                    </div>

                    <div className="max-w-6xl mx-auto relative px-10">
                        {/* Connecting Lines (SVG) - Re-aligned and creative Pulse Trace */}
                        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute top-12 left-0 w-full h-32 hidden md:block" style={{ pointerEvents: 'none' }}>
                            <defs>
                                <linearGradient id="signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="20%" stopColor="rgba(94, 83, 115, 0.4)" />
                                    <stop offset="80%" stopColor="rgba(94, 83, 115, 0.4)" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>

                            {/* Subtle Background Trace */}
                            <motion.path
                                d="M 0,50 L 1000,50"
                                stroke="url(#signal-grad)"
                                strokeWidth="1"
                                strokeDasharray="6 6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            />

                            {/* The "Pulse" Path - creative highs at each node center */}
                            <motion.path
                                d="M 0,50 
                                   L 150,50 C 160,50 160,20 166,20 C 172,20 172,50 182,50 
                                   L 484,50 C 494,50 494,10 500,10 C 506,10 506,50 516,50 
                                   L 817,50 C 827,50 827,0 833,0 C 839,0 839,50 849,50 
                                   L 1000,50"
                                stroke="#5E5373"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                            />

                            {/* Moving Energy Signal */}
                            <motion.circle
                                r="4"
                                fill="#5E5373"
                                style={{ filter: 'drop-shadow(0 0 10px #5E5373)' }}
                            >
                                <animateMotion
                                    path="M 0,50 L 150,50 C 160,50 160,20 166,20 C 172,20 172,50 182,50 L 484,50 C 494,50 494,10 500,10 C 506,10 506,50 516,50 L 817,50 C 827,50 827,0 833,0 C 839,0 839,50 849,50 L 1000,50"
                                    dur="5s"
                                    repeatCount="indefinite"
                                />
                            </motion.circle>
                        </svg>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative z-10">
                            <NodeBlock
                                icon={Users}
                                title="Identity Matrix"
                                desc="Innovators establish their technical profile within the college intranet. This is your digital DNA."
                                step="01"
                            />
                            <NodeBlock
                                icon={Zap}
                                title="Signal Broadcast"
                                desc="Broadcasting ideas and projects as high-frequency 'Signals'. These are the pulses of innovation."
                                step="02"
                            />
                            <NodeBlock
                                icon={Target}
                                title="Project Sync"
                                desc="Collaborators align with signals to form high-impact development nodes. Real-time mission execution."
                                step="03"
                            />
                        </div>
                    </div>
                </section>

                {/* Concept Deep-Dives */}
                <div className="py-40 grid grid-cols-1 md:grid-cols-2 gap-32 max-w-7xl mx-auto">
                    <div className="space-y-10">
                        <div className="w-20 h-20 sculpted-card !bg-lavender/10 flex items-center justify-center border-lavender/30">
                            <Shield size={32} className="text-lavender" />
                        </div>
                        <h4 className="text-4xl font-black font-outfit uppercase tracking-tighter">Secure <span className="text-lavender">Nodes</span></h4>
                        <p className="text-lg text-platinum/50 leading-relaxed font-inter">
                            Every collaboration on Kings Pulse occurs within a 'Secure Node'. Our intranet protocol ensures that sensitive research data and experimental code remain within the KEC network boundary. By utilizing administrative access keys, we prevent unauthorized external interference, ensuring your technical signals are synchronized only with verified college innovators.
                        </p>
                    </div>

                    <div className="space-y-10">
                        <div className="w-20 h-20 sculpted-card !bg-lavender/10 flex items-center justify-center border-lavender/30">
                            <Cpu size={32} className="text-lavender" />
                        </div>
                        <h4 className="text-4xl font-black font-outfit uppercase tracking-tighter">Talent <span className="text-lavender">Matrix</span></h4>
                        <p className="text-lg text-platinum/50 leading-relaxed font-inter">
                            The Talent Matrix is an advanced peer-discovery algorithm. It cross-references your 'Capabilities' across different sectors (CSE, ECE, MECH) to find the perfect technical alignment for your project. Instead of traditional lists, it visualizes innovator relationships based on skill-proximity, enabling instant formation of multidisciplinary technical teams.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 p-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-platinum/30 text-[10px] font-black tracking-[0.5em] uppercase">
                <p>&copy; 2026 KINGS ENGINEERING COLLEGE</p>
                <div className="flex space-x-12 mt-10 md:mt-0">
                    <a href="#" className="hover:text-lavender transition-colors">Twitter</a>
                    <a href="#" className="hover:text-lavender transition-colors">Discord</a>
                    <a href="#" className="hover:text-lavender transition-colors">GitHub</a>
                </div>
            </footer>
        </div>
    )
}

const NodeBlock = ({ icon: Icon, title, desc, step }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center space-y-8"
    >
        <div className="relative">
            <div className="w-24 h-24 rounded-full bg-charcoal flex items-center justify-center border-4 border-lavender/20 shadow-2xl relative z-10 transition-colors hover:border-lavender">
                <Icon size={32} className="text-lavender" />
            </div>
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-lavender text-white font-black flex items-center justify-center rounded-full text-xs tracking-tighter z-20 shadow-xl">
                {step}
            </div>
        </div>
        <div>
            <h4 className="text-xl font-black font-outfit uppercase tracking-tighter mb-4">{title}</h4>
            <p className="text-sm text-platinum/40 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </div>
    </motion.div>
)

export default LandingPage
