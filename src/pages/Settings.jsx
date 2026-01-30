import { Shield, Bell, Lock, Globe, Database, User, LogOut, ChevronRight, Loader2, Save } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfile, useUpdateSettings } from '../hooks/useProfile'

const Settings = () => {
    const { user } = useAuth()
    const { data: profile, isLoading } = useProfile(user?.id)
    const updateSettingsMutation = useUpdateSettings()
    const [localSettings, setLocalSettings] = useState(null)

    React.useEffect(() => {
        if (profile?.settings) {
            setLocalSettings(profile.settings)
        } else {
            setLocalSettings({
                publicSignal: true,
                directSync: true,
                collaboratorHistory: false,
                notifications: true
            })
        }
    }, [profile])

    const handleToggle = (key) => {
        setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleDeploy = async () => {
        await updateSettingsMutation.mutateAsync({
            userId: user.id,
            settings: localSettings
        })
    }

    if (isLoading || !localSettings) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="text-lavender animate-spin" size={48} />
                <p className="text-lavender font-black tracking-widest uppercase text-xs">Accessing System Protocols...</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 text-platinum">
            <div className="border-b border-white/5 pb-10">
                <h2 className="text-5xl font-black font-outfit tracking-tighter uppercase leading-none text-white">SYSTEM<br /><span className="text-lavender">PROTOCOLS</span></h2>
                <p className="text-lavender font-bold tracking-[0.4em] uppercase mt-4 text-sm">Configuring Personal Operating Range</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Navigation */}
                <aside className="md:col-span-4 space-y-4">
                    <SettingTab icon={User} label="Identity Profile" active />
                    <SettingTab icon={Shield} label="Security Levels" />
                    <SettingTab icon={Bell} label="Signal Notifications" />
                    <SettingTab icon={Globe} label="Network Visibility" />
                    <SettingTab icon={Database} label="Identity Backups" />
                    <div className="pt-8 opacity-20">
                        <button className="flex items-center text-xs font-black tracking-widest text-red-500 hover:opacity-100 transition-opacity p-4 w-full border border-red-500/20 rounded-xl">
                            <LogOut size={16} className="mr-3" /> TERMINATE ACCOUNT
                        </button>
                    </div>
                </aside>

                {/* Settings Content */}
                <div className="md:col-span-8 space-y-10">
                    <SettingSection title="Global Access" desc="Manage how nodes interface with your identity.">
                        <ToggleItem
                            label="Public Signal"
                            desc="Allow all innovators to discover your node profile."
                            active={localSettings.publicSignal}
                            onToggle={() => handleToggle('publicSignal')}
                        />
                        <ToggleItem
                            label="Direct Sync"
                            desc="Enable direct messaging protocols."
                            active={localSettings.directSync}
                            onToggle={() => handleToggle('directSync')}
                        />
                        <ToggleItem
                            label="Collaborator History"
                            desc="Show internal project contributions to public pulse."
                            active={localSettings.collaboratorHistory}
                            onToggle={() => handleToggle('collaboratorHistory')}
                        />
                    </SettingSection>

                    <SettingSection title="Security Protocol" desc="Configure encryption and authentication thresholds.">
                        <div className="space-y-6">
                            <button className="w-full h-20 sculpted-card !bg-raisin flex items-center justify-between px-8 group transition-all hover:border-lavender/40">
                                <div className="flex items-center">
                                    <Lock size={20} className="text-lavender mr-6" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-lavender tracking-widest uppercase">Encryption Key</p>
                                        <p className="text-sm font-bold text-platinum/80">Update Access Key Matrix</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-lavender transition-transform group-hover:translate-x-2" />
                            </button>

                            <button className="w-full h-20 sculpted-card !bg-raisin flex items-center justify-between px-8 group transition-all hover:border-white/20">
                                <div className="flex items-center">
                                    <Shield size={20} className="text-platinum/20 mr-6 group-hover:text-lavender transition-colors" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-platinum/20 tracking-widest uppercase group-hover:text-lavender/40">Verification</p>
                                        <p className="text-sm font-bold text-platinum/40 group-hover:text-platinum/80">Initiate Level 02 Sync</p>
                                    </div>
                                </div>
                                <div className="px-4 py-1 bg-raisin text-[8px] font-black tracking-widest text-lavender border border-lavender/20 rounded-md">REQUIRED</div>
                            </button>
                        </div>
                    </SettingSection>

                    <div className="flex justify-end pt-10">
                        <button
                            onClick={handleDeploy}
                            disabled={updateSettingsMutation.isLoading}
                            className="sculpted-button !px-12 !py-4 shadow-[0_20px_40px_rgba(94,83,115,0.4)] flex items-center"
                        >
                            {updateSettingsMutation.isLoading ? <Loader2 size={18} className="animate-spin mr-3" /> : <Save size={18} className="mr-3" />}
                            DEPLOY CHANGES
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-20"></div>
        </div>
    )
}

const SettingTab = ({ icon: Icon, label, active }) => (
    <button className={`w-full flex items-center p-5 rounded-2xl transition-all font-bold text-sm ${active
        ? 'bg-lavender text-white shadow-xl shadow-lavender/20'
        : 'text-platinum/40 hover:text-white hover:bg-white/5'
        }`}>
        <Icon size={18} className="mr-4" />
        {label}
    </button>
)

const SettingSection = ({ title, desc, children }) => (
    <div className="space-y-6">
        <div className="space-y-1">
            <h4 className="text-xl font-black font-outfit uppercase tracking-tighter">{title}</h4>
            <p className="text-xs font-medium text-platinum/40 leading-relaxed">{desc}</p>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
)

const ToggleItem = ({ label, desc, active, onToggle }) => {
    return (
        <div className="sculpted-card !bg-raisin p-8 flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm font-bold text-platinum group-hover:text-lavender transition-colors">{label}</p>
                <p className="text-[10px] font-medium text-platinum/30 uppercase tracking-widest">{desc}</p>
            </div>
            <button
                onClick={onToggle}
                className={`w-14 h-8 rounded-full relative transition-all duration-500 border-2 ${active ? 'bg-lavender border-lavender' : 'bg-raisin border-white/5'}`}
            >
                <motion.div
                    animate={{ x: active ? 24 : 4 }}
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${active ? 'bg-white' : 'bg-platinum/20'}`}
                />
            </button>
        </div>
    )
}

export default Settings
