import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);

        try {
            await register(
                formData.get('email'),
                formData.get('password'),
                {
                    full_name: formData.get('fullName'),
                    department: formData.get('department')
                }
            );
            // Supabase auto-login behaviour depends on config, but usually safe to redirect
            // Or if email confirmation is on, show message. assuming auto-confirm for now or simple flow.
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-lavender/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2">
                        KINGS <span className="text-lavender">PULSE</span>
                    </h1>
                    <p className="text-[10px] text-lavender font-bold tracking-[0.4em] uppercase">New Member Protocol</p>
                </div>

                <div className="sculpted-card p-10 relative bg-charcoal/80">
                    <h2 className="text-2xl font-black text-white uppercase mb-8 flex items-center">
                        <span className="w-1 h-8 bg-lavender mr-4"></span>
                        Register
                    </h2>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-6 flex items-start space-x-3 rounded-lg">
                            <AlertCircle className="text-red-500 mt-0.5" size={16} />
                            <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input name="fullName" required placeholder="John Doe" className="sculpted-input pl-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Department</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <select name="department" className="sculpted-input pl-12 appearance-none text-platinum/80">
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="AI&DS">AI & DS</option>
                                    <option value="MECH">MECH</option>
                                    <option value="ECE">ECE</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input type="email" name="email" required placeholder="name@kec.edu" className="sculpted-input pl-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-lavender/60 uppercase tracking-widest pl-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input type="password" name="password" required minLength={6} placeholder="••••••••" className="sculpted-input pl-12" />
                            </div>
                        </div>

                        <button disabled={loading} className="sculpted-button w-full flex items-center justify-center group mt-6">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    CREATE ACCOUNT <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-xs text-platinum/40 font-medium mb-4">Already authenticated?</p>
                        <Link to="/login" className="text-xs font-black text-lavender hover:text-white uppercase tracking-widest transition-colors border-b border-lavender/30 pb-0.5">
                            Return to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
