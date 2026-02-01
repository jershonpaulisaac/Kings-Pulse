import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Code, Camera, CheckCircle, TrendingUp, Edit3, Save, Loader2, FileText, Plus, X, UploadCloud } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateProfile } from '../hooks/useProfile'

const Profile = () => {
    const { user } = useAuth()
    const { data: profile, isLoading } = useProfile(user?.id)
    const updateProfile = useUpdateProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updates = {
            full_name: formData.get('fullName'),
            department: formData.get('department'),
            year: parseInt(formData.get('year')) || 1,
            email: formData.get('email'),
        }

        try {
            await updateProfile.mutateAsync({ userId: user.id, updates })
            setIsEditing(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)
        } catch (error) {
            console.error('Save failed:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="text-lavender animate-spin" size={48} />
            </div>
        )
    }

    return (
        <form onSubmit={handleSave} className="max-w-7xl mx-auto space-y-12 text-platinum">
            <div className="sculpted-card !bg-charcoal/30 overflow-hidden relative shadow-2xl border border-white/5">
                <div className="h-48 bg-lavender/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-raisin"></div>
                    <div className="absolute top-8 right-8">
                        <button
                            type={isEditing ? "submit" : "button"}
                            onClick={isEditing ? undefined : () => setIsEditing(true)}
                            className={`flex items-center space-x-3 px-6 py-3 text-xs font-black tracking-widest transition-all ${isEditing ? 'bg-lavender text-white shadow-xl shadow-lavender/30' : 'bg-charcoal text-lavender hover:bg-lavender/10'
                                }`}
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            {updateProfile.isLoading ? <Loader2 size={16} className="animate-spin" /> : (isEditing ? <><Save size={16} /> <span>SAVE PROFILE</span></> : <><Edit3 size={16} /> <span>EDIT PROFILE</span></>)}
                        </button>
                    </div>
                </div>

                <div className="px-12 pb-12 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-10">
                    <div className="w-44 h-44 bg-charcoal border-8 border-raisin sculpted-card !p-0 flex items-center justify-center overflow-hidden group relative">
                        {profile?.profile_photo_url ? (
                            <img src={profile.profile_photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={80} className="text-lavender" />
                        )}
                        {isEditing && (
                            <div className="absolute inset-0 bg-lavender/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                <Camera className="text-white" size={32} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 pb-4">
                        {isEditing ? (
                            <input
                                name="fullName"
                                defaultValue={profile?.full_name}
                                className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2 bg-transparent border-b border-lavender/30 focus:outline-none focus:border-lavender w-full"
                            />
                        ) : (
                            <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2 text-white">{profile?.full_name || 'Anonymous User'}</h2>
                        )}
                        <div className="flex items-center gap-6 text-lavender font-bold tracking-[0.1em] text-sm uppercase">
                            {isEditing ? (
                                <input
                                    name="department"
                                    defaultValue={profile?.department}
                                    className="bg-transparent border-b border-lavender/30 focus:outline-none focus:border-lavender text-lavender font-bold tracking-[0.1em] text-sm uppercase"
                                />
                            ) : (
                                <span className="flex items-center"><Code size={16} className="mr-2" /> {profile?.department || 'Department Unknown'}</span>
                            )}
                        </div>
                    </div>
                </div>

                {showSuccess && (
                    <motion.div
                        className="absolute top-10 left-1/2 -translate-x-1/2 bg-platinum text-raisin px-8 py-4 flex items-center space-x-4 z-50 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    >
                        <CheckCircle className="text-lavender" />
                        <span className="text-xs font-black tracking-widest">SAVED SUCCESSFULLY</span>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    <Section label="Academic Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InfoField name="email" label="Contact Email" value={profile?.email || 'N/A'} isEditing={isEditing} icon={Mail} />
                            <InfoField name="year" label="Year of Study" value={`${profile?.year || '1'}`} isEditing={isEditing} icon={CheckCircle} />
                        </div>
                    </Section>

                    <Section label="Skills & Expertise">
                        <div className="flex flex-wrap gap-4">
                            {(profile?.skills && profile.skills.length > 0) ? (
                                profile.skills.map(skill => (
                                    <div key={skill} className="px-6 py-3 bg-charcoal border border-white/5 sculpted-card !p-0">
                                        <span className="px-6 py-3 block text-sm font-bold tracking-tight uppercase">{skill}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lavender/40 text-sm font-bold italic">No skills added yet.</p>
                            )}
                            {isEditing && (
                                <button type="button" className="px-6 py-3 bg-lavender/10 border border-lavender/20 text-lavender rounded-xl text-xs font-black tracking-widest hover:bg-lavender hover:text-white transition-all flex items-center">
                                    <Plus size={14} className="mr-2" /> ADD SKILL
                                </button>
                            )}
                        </div>
                    </Section>

                    <Section label="Certificates & Documents">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Mock Certificates for UI demo */}
                            <div className="p-6 bg-[#2D2B3F] border border-white/5 rounded-xl group relative">
                                <FileText className="text-lavender mb-4" size={32} />
                                <h4 className="text-white font-bold">AWS Certified Cloud Practitioner</h4>
                                <p className="text-xs text-platinum/50 mt-1">Uploaded 2 months ago</p>
                                {isEditing && (
                                    <button type="button" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {isEditing && (
                                <div className="p-6 bg-transparent border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors min-h-[140px]">
                                    <UploadCloud className="text-platinum/40 mb-3" size={32} />
                                    <span className="text-xs font-bold text-platinum/60">Upload Certificate (PDF)</span>
                                </div>
                            )}
                        </div>
                    </Section>
                </div>
            </div>
            <div className="h-20"></div>
        </form>
    )
}

const Section = ({ label, children }) => (
    <div className="space-y-6">
        <h3 className="text-sm font-black tracking-[0.2em] text-lavender uppercase border-l-4 border-lavender pl-4">{label}</h3>
        {children}
    </div>
)

const InfoField = ({ name, label, value, isEditing, icon: Icon }) => (
    <div className="space-y-2">
        <div className="flex items-center space-x-2 text-lavender/40">
            <Icon size={14} />
            <label className="text-[10px] font-black uppercase tracking-widest">{label}</label>
        </div>
        {isEditing ? (
            <input name={name} type="text" defaultValue={value} className="bg-[#1E1D2B] border border-white/10 rounded-lg px-4 py-3 text-white w-full focus:outline-none focus:border-lavender" />
        ) : (
            <p className="text-lg font-bold text-platinum/80">{value}</p>
        )}
    </div>
)

export default Profile
