import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Shield, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const accessKey = formData.get('accessKey');

        try {
            // Using the Access Key provided by Admin as the password in Supabase Auth
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password: accessKey,
            });

            if (authError) {
                // User-friendly error for the "Key" context
                if (authError.message.includes("Invalid login credentials")) {
                    throw new Error("INVALID EMAIL OR PORTAL ACCESS KEY");
                }
                throw authError;
            }

            navigate('/dashboard');
        } catch (err) {
            console.error('Auth Protocol Failed:', err.message);
            setError(err.message.toUpperCase());
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-raisin text-platinum">
            {/* Left: Branding & Visual */}
            <div className="hidden lg:flex flex-col justify-between p-20 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-lavender/20 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-raisin rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10">
                    <Link to="/" className="text-4xl font-black font-outfit tracking-tighter hover:text-lavender transition-colors">
                        KINGS <span className="text-lavender">PULSE</span>
                    </Link>
                    <p className="text-[11px] text-lavender font-black tracking-[0.4em] uppercase mt-2">Experimental Node Access</p>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="w-20 h-2 bg-lavender mb-10 shadow-[0_0_15px_rgba(94,83,115,0.6)]"></div>
                    <h2 className="text-6xl font-black font-outfit uppercase leading-[0.9] tracking-tighter mb-6">
                        PORTAL<br />
                        <span className="text-lavender">PROTECTED</span>.
                    </h2>
                    <p className="text-platinum/50 font-medium leading-relaxed">
                        Authorized personnel only. Access is provisioned by the Administrative Protocol Office. Use your assigned credentials to establish a link.
                    </p>
                </div>

                <div className="relative z-10 flex items-center space-x-6">
                    <div className="w-12 h-px bg-white/10"></div>
                    <p className="text-[10px] font-black text-lavender tracking-[0.6em] uppercase">Status: Secure</p>
                </div>
            </div>

            {/* Right: Interaction Form */}
            <div className="flex flex-col items-center justify-center p-8 md:p-20 relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="grid grid-cols-10 h-full">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="border border-white/10 aspect-square"></div>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-sm space-y-12 relative z-10">
                    <div className="text-center space-y-2 mb-10">
                        <h2 className="text-sm font-black tracking-[0.6em] text-lavender uppercase">Establish Link</h2>
                        <p className="text-2xl font-black font-outfit tracking-tight text-white uppercase">Identity Verification</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-10">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-8">
                            <AuthField icon={Mail} label="Secure Email" placeholder="USER@KEC.EDU" type="email" name="email" />
                            <AuthField
                                icon={Shield}
                                label="Portal Access Key"
                                placeholder="PROVISIONED KEY REQUIRED"
                                type="password"
                                name="accessKey"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="sculpted-button w-full !py-6 group flex items-center justify-center !text-lg !rounded-none disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : (
                                <>
                                    UNLOCK PORTAL
                                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-10 space-y-4">
                        <p className="text-center text-[10px] font-black text-platinum/20 tracking-[0.4em] uppercase">
                            New Innovators: Approach Admin for Key Assignment
                        </p>
                        <div className="flex justify-center">
                            <Link to="/" className="text-[10px] font-black text-lavender hover:text-white transition-colors tracking-widest uppercase flex items-center">
                                <ArrowRight size={10} className="mr-2 rotate-180" /> Back to Explainer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AuthField = ({ icon: Icon, label, placeholder, type = "text", name }) => (
    <div className="space-y-3 group">
        <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black text-lavender/60 tracking-[0.2em] uppercase group-focus-within:text-lavender transition-colors">{label}</label>
            <Icon size={14} className="text-lavender/30 group-focus-within:text-lavender transition-colors" />
        </div>
        <div className="relative">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required
                className="sculpted-input !bg-charcoal/50 border-white/5 placeholder:text-platinum/20 font-bold tracking-widest text-sm focus:border-lavender/50 focus:bg-charcoal/80 transition-all shadow-inner-soft w-full"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lavender/20 group-focus-within:text-lavender transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            </div>
        </div>
    </div>
)

export default Auth
