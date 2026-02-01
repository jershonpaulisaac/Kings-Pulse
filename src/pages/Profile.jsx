import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Code, Camera, CheckCircle, TrendingUp, Edit3, Save, Loader2, FileText, Plus, X, UploadCloud, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'

const Profile = () => {
    const { user } = useAuth()
    const { data: profile, isLoading } = useProfile(user?.id)
    const updateProfile = useUpdateProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    // Local State for Edit Mode
    const [skills, setSkills] = useState([])
    const [certificates, setCertificates] = useState([])
    const [newSkill, setNewSkill] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)

    // File Input Refs
    const photoInputRef = useRef(null)
    const certInputRef = useRef(null)

    // Sync state when entering edit mode or when profile loads
    useEffect(() => {
        if (profile) {
            setSkills(profile.skills || [])
            setCertificates(profile.certificates || [])
            setProfilePhoto(profile.profile_photo_url)
        }
    }, [profile, isEditing])

    const handleAddSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill])
            setNewSkill('')
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove))
    }

    const uploadFile = async (file) => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('uploads').getPublicUrl(filePath)
            return data.publicUrl
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload file. Please try again.')
            return null
        }
    }

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsUploading(true)
        const publicUrl = await uploadFile(file)
        if (publicUrl) {
            setProfilePhoto(publicUrl)
        }
        setIsUploading(false)
    }

    const handleCertificateUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsUploading(true)
        const publicUrl = await uploadFile(file)
        if (publicUrl) {
            const newCert = {
                name: file.name,
                url: publicUrl,
                date: new Date().toLocaleDateString(),
                id: Date.now()
            }
            setCertificates([...certificates, newCert])
        }
        setIsUploading(false)
    }

    const handleRemoveCertificate = (id) => {
        setCertificates(certificates.filter(c => c.id !== id))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const updates = {
            full_name: formData.get('fullName'),
            department: formData.get('department'),
            year: parseInt(formData.get('year')) || 1,
            email: formData.get('email'),
            skills: skills,
            certificates: certificates,
            profile_photo_url: profilePhoto
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
                            disabled={isUploading}
                            onClick={isEditing ? undefined : () => setIsEditing(true)}
                            className={`flex items-center space-x-3 px-6 py-3 text-xs font-black tracking-widest transition-all ${isEditing ? 'bg-lavender text-white shadow-xl shadow-lavender/30' : 'bg-charcoal text-lavender hover:bg-lavender/10'
                                }`}
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            {updateProfile.isLoading || isUploading ? <Loader2 size={16} className="animate-spin" /> : (isEditing ? <><Save size={16} /> <span>SAVE PROFILE</span></> : <><Edit3 size={16} /> <span>EDIT PROFILE</span></>)}
                        </button>
                    </div>
                </div>

                {/* Profile Header Block */}
                <div className="px-12 pb-12 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-10">
                    <div className="w-44 h-44 bg-charcoal border-8 border-raisin sculpted-card !p-0 flex items-center justify-center overflow-hidden group relative">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={80} className="text-lavender" />
                        )}
                        {isEditing && (
                            <div
                                onClick={() => photoInputRef.current?.click()}
                                className="absolute inset-0 bg-lavender/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            >
                                <Camera className="text-white" size={32} />
                                <span className="absolute bottom-2 text-[10px] font-bold text-white">CHANGE</span>
                                <input
                                    ref={photoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 pb-4">
                        {isEditing ? (
                            <input
                                name="fullName"
                                defaultValue={profile?.full_name}
                                className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2 bg-transparent border-b border-lavender/30 focus:outline-none focus:border-lavender w-full text-white"
                            />
                        ) : (
                            <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter mb-2 text-white">{profile?.full_name || 'Anonymous User'}</h2>
                        )}
                        <div className="flex items-center gap-6 text-lavender font-bold tracking-[0.1em] text-sm uppercase">
                            {isEditing ? (
                                <input
                                    name="department"
                                    defaultValue={profile?.department}
                                    placeholder="DEPARTMENT"
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
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Skill List */}
                            {(isEditing ? skills : profile?.skills)?.map((skill, index) => (
                                <div key={skill + index} className="px-6 py-3 bg-charcoal border border-white/5 sculpted-card !p-0 flex items-center gap-2 group">
                                    <span className="text-sm font-bold tracking-tight uppercase text-platinum/80">{skill}</span>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-rose-400 opacity-50 group-hover:opacity-100 hover:text-rose-300"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {isEditing && (
                                <div className="flex items-center gap-2">
                                    <input
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                        placeholder="Type skill..."
                                        className="px-4 py-3 bg-lavender/5 border border-lavender/20 rounded-xl text-sm text-white focus:outline-none focus:border-lavender w-32"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="p-3 bg-lavender/10 border border-lavender/20 text-lavender rounded-xl hover:bg-lavender hover:text-white transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            )}

                            {(!profile?.skills?.length && !isEditing) && (
                                <p className="text-lavender/40 text-sm font-bold italic">No skills added yet.</p>
                            )}
                        </div>
                    </Section>

                    <Section label="Certificates & Documents">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Certificate List */}
                            {(isEditing ? certificates : profile?.certificates)?.map((cert, index) => (
                                <a
                                    key={cert.id || index}
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 bg-[#2D2B3F] border border-white/5 rounded-xl group relative hover:border-lavender/30 transition-colors block"
                                >
                                    <FileText className="text-lavender mb-4" size={32} />
                                    <h4 className="text-white font-bold truncate">{cert.name || 'Certificate'}</h4>
                                    <p className="text-xs text-platinum/50 mt-1">Added: {cert.date || 'Unknown'}</p>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleRemoveCertificate(cert.id)
                                            }}
                                            className="absolute top-4 right-4 text-rose-400 opacity-100 hover:text-rose-300 p-2 bg-black/20 rounded-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </a>
                            ))}

                            {isEditing && (
                                <div
                                    onClick={() => certInputRef.current?.click()}
                                    className="p-6 bg-transparent border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors min-h-[140px]"
                                >
                                    {isUploading ? <Loader2 className="animate-spin text-lavender mb-3" size={32} /> : <UploadCloud className="text-platinum/40 mb-3" size={32} />}
                                    <span className="text-xs font-bold text-platinum/60">{isUploading ? 'Uploading...' : 'Upload Certificate'}</span>
                                    <input
                                        ref={certInputRef}
                                        type="file"
                                        accept=".pdf,.png,.jpg"
                                        className="hidden"
                                        onChange={handleCertificateUpload}
                                    />
                                </div>
                            )}

                            {(!profile?.certificates?.length && !isEditing) && (
                                <p className="col-span-full text-lavender/40 text-sm font-bold italic">No certificates uploaded.</p>
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
