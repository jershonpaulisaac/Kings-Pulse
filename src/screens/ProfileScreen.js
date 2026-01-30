import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { User, Mail, Phone, Code, Camera as CameraIcon, CheckCircle, TrendingUp } from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import SculptedView from '../components/SculptedView';
import SculptedButton from '../components/SculptedButton';
import SculptedInput from '../components/SculptedInput';

const ProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [profile, setProfile] = useState({
        name: 'ARJUN KUMAR',
        dept: 'COMPUTER SCIENCE',
        year: '3RD YEAR',
        email: 'arjun.kec@gmail.com',
        phone: '9876543210',
        skills: ['REACT NATIVE', 'SUPABASE', 'UI DESIGN']
    });

    const handleSave = () => {
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.header}
            >
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, BEZIER_CURVES.organic]}>
                        <User size={60} color={THEME.colors.accent} />
                    </View>
                    <TouchableOpacity style={[styles.cameraIcon, BEZIER_CURVES.soft]}>
                        <CameraIcon size={18} color={THEME.colors.text} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.subText}>{profile.dept} • {profile.year}</Text>

                <SculptedButton
                    label={isEditing ? 'COMMIT IDENTITY' : 'EVOLVE PROFILE'}
                    onPress={isEditing ? handleSave : () => setIsEditing(true)}
                    style={{ marginTop: 25 }}
                />
            </MotiView>

            <AnimatePresence>
                {showSuccess && (
                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        style={[styles.successBadge, BEZIER_CURVES.soft]}
                    >
                        <CheckCircle size={16} color={THEME.colors.bg} />
                        <Text style={styles.successText}> SYNC_SUCCESS</Text>
                    </MotiView>
                )}
            </AnimatePresence>

            <View style={styles.content}>
                <MotiView transition={{ delay: 200 }} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }}>
                    <SculptedView style={styles.statCard} type="organic">
                        <View style={styles.statHeader}>
                            <TrendingUp size={20} color={THEME.colors.accent} />
                            <Text style={styles.statTitle}>GROWTH_MATRIX</Text>
                        </View>
                        <Text style={styles.statCount}>4,92.0</Text>
                        <Text style={styles.statLabel}>Collaboration Credits</Text>
                    </SculptedView>
                </MotiView>

                <MotiView transition={{ delay: 300 }} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }}>
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>SECURE NODES</Text>
                        {isEditing ? (
                            <>
                                <SculptedInput label="SECURE_EMAIL" value={profile.email} />
                                <SculptedInput label="COMMS_HUB" value={profile.phone} />
                            </>
                        ) : (
                            <>
                                <DetailItem label="SECURE_EMAIL" value={profile.email} />
                                <DetailItem label="COMMS_HUB" value={profile.phone} />
                            </>
                        )}
                    </View>
                </MotiView>

                <MotiView transition={{ delay: 400 }} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }}>
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>CAPABILITIES</Text>
                        <View style={styles.tagRow}>
                            {profile.skills.map(s => (
                                <View key={s} style={[styles.tag, BEZIER_CURVES.soft]}>
                                    <Text style={styles.tagText}>{s}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </MotiView>
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const DetailItem = ({ label, value }) => (
    <View style={[styles.detailItem, BEZIER_CURVES.soft]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.bg },
    header: { alignItems: 'center', padding: 40, backgroundColor: THEME.colors.surface, ...BEZIER_CURVES.organic, borderTopLeftRadius: 0, borderTopRightRadius: 0 },
    avatarContainer: { position: 'relative', marginBottom: 20 },
    avatar: { width: 130, height: 130, backgroundColor: THEME.colors.bg, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: THEME.colors.accent },
    cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: THEME.colors.accent, padding: 12, borderWidth: 4, borderColor: THEME.colors.surface },
    name: { fontSize: 32, fontWeight: '900', color: THEME.colors.text, letterSpacing: -2 },
    subText: { fontSize: 13, color: THEME.colors.accent, marginTop: 4, fontWeight: '900', letterSpacing: 2 },
    successBadge: { position: 'absolute', top: 20, right: 20, backgroundColor: THEME.colors.text, paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', zIndex: 100 },
    successText: { color: THEME.colors.bg, fontWeight: '900', fontSize: 12, letterSpacing: 1 },
    content: { padding: 24 },
    statCard: { marginBottom: 35, borderRightWidth: 8, borderRightColor: THEME.colors.accent },
    statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    statTitle: { color: THEME.colors.accent, fontSize: 12, fontWeight: '900', marginLeft: 8, letterSpacing: 2 },
    statCount: { fontSize: 48, fontWeight: '900', color: THEME.colors.text, letterSpacing: -2 },
    statLabel: { color: THEME.colors.textMuted, fontWeight: '800', marginTop: 4, letterSpacing: 1 },
    section: { marginBottom: 40 },
    sectionLabel: { fontSize: 13, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 4, marginBottom: 25 },
    detailItem: { marginBottom: 20, backgroundColor: THEME.colors.surface, padding: 22, borderLeftWidth: 4, borderLeftColor: THEME.colors.accent },
    detailLabel: { fontSize: 10, color: THEME.colors.accent, fontWeight: '900', marginBottom: 6, letterSpacing: 2 },
    detailValue: { fontSize: 18, color: THEME.colors.text, fontWeight: '800', letterSpacing: 0.5 },
    tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
    tag: { paddingHorizontal: 18, paddingVertical: 12, backgroundColor: THEME.colors.surface, marginRight: 12, marginBottom: 12 },
    tagText: { color: THEME.colors.text, fontWeight: '900', fontSize: 12, letterSpacing: 1 }
});

export default ProfileScreen;
