import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.message.includes("Invalid login credentials")) {
                setError("Account not found or password incorrect.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-lavender/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2">
                        KINGS <span className="text-lavender">PULSE</span>
                    </h1>
                    <p className="text-[10px] text-lavender font-bold tracking-[0.4em] uppercase">Secure Access Node</p>
                </div>

                <div className="sculpted-card p-10 relative bg-charcoal/80">
                    <h2 className="text-2xl font-black text-white uppercase mb-8 flex items-center">
                        <span className="w-1 h-8 bg-lavender mr-4"></span>
                        Identify
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 p-4 mb-6 flex items-start space-x-3 rounded-lg"
                        >
                            <AlertCircle className="text-red-500 mt-0.5" size={16} />
                            <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Email Coordinates</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input type="email" name="email" required placeholder="name@kec.edu" className="sculpted-input pl-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Passcode</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input type="password" name="password" required placeholder="••••••••" className="sculpted-input pl-12" />
                            </div>
                        </div>

                        <button disabled={loading} className="sculpted-button w-full flex items-center justify-center group mt-4">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    ENTER PORTAL <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-xs text-platinum/40 font-medium mb-4">First time here?</p>
                        <Link to="/register" className="text-xs font-black text-lavender hover:text-white uppercase tracking-widest transition-colors border-b border-lavender/30 pb-0.5">
                            Initiate Registration Protocol
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
