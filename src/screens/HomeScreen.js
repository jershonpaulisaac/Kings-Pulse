import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';
import { Plus, X, Upload, ChevronRight, Bookmark } from 'lucide-react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import SculptedView from '../components/SculptedView';
import SculptedButton from '../components/SculptedButton';
import SculptedInput from '../components/SculptedInput';

const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [recentProjects, setRecentProjects] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const mockData = [
            { id: '1', title: 'Solar Tracking Robot', users: { full_name: 'Rahul S' }, description: 'Improving solar panel efficiency by 40% with dual-axis tracking logic.' },
            { id: '2', title: 'AR Campus Portal', users: { full_name: 'Priya K' }, description: 'A futuristic inter-campus student guide with augmented reality technology.' }
        ];
        setRecentProjects(mockData);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MotiView
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    style={styles.heroSection}
                >
                    <Text style={styles.greeting}>CAMPUS PULSE</Text>
                    <Text style={styles.subGreeting}>EXPERIMENTAL SHOWCASE</Text>
                </MotiView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {['AI/ML', 'ROBOTICS', 'IoT', 'HCI'].map((skill, i) => (
                        <TouchableOpacity key={skill}>
                            <MotiView
                                from={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 80 }}
                                style={[styles.categoryChip, BEZIER_CURVES.soft]}
                            >
                                <Text style={styles.categoryText}>{skill}</Text>
                            </MotiView>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.feedSection}>
                    <Text style={styles.sectionTitle}>LIVE FLOW</Text>

                    {loading ? (
                        <ActivityIndicator color={THEME.colors.accent} size="large" />
                    ) : (
                        recentProjects.map((project, index) => (
                            <MotiView
                                key={project.id}
                                from={{ opacity: 0, translateY: 20 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ delay: index * 100 }}
                            >
                                <SculptedView style={styles.projectCard} elevated={true} type={index % 2 === 0 ? 'soft' : 'organic'}>
                                    <View style={styles.projectHeader}>
                                        <View style={[styles.avatarMini, BEZIER_CURVES.soft]} />
                                        <View>
                                            <Text style={styles.projectAuthor}>{project.users?.full_name}</Text>
                                            <Text style={styles.deptTime}>CSE • SECURE</Text>
                                        </View>
                                        <TouchableOpacity style={styles.bookmark}>
                                            <Bookmark size={20} color={THEME.colors.accent} />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.projectTitle}>{project.title}</Text>
                                    <Text style={styles.projectDesc} numberOfLines={2}>{project.description}</Text>

                                    <View style={styles.footer}>
                                        <View style={styles.tag}><Text style={styles.tagText}>RESEARCH</Text></View>
                                        <TouchableOpacity style={[styles.viewBtn, BEZIER_CURVES.soft]}>
                                            <ChevronRight size={20} color={THEME.colors.text} />
                                        </TouchableOpacity>
                                    </View>
                                </SculptedView>
                            </MotiView>
                        ))
                    )}
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Futuristic FAB */}
            <MotiView
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={styles.fabContainer}
            >
                <TouchableOpacity style={[styles.fab, BEZIER_CURVES.organic]} onPress={() => setModalVisible(true)}>
                    <Plus size={32} color={THEME.colors.text} />
                </TouchableOpacity>
            </MotiView>

            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.modalOverlay}>
                    <SculptedView style={styles.modalContent} type="organic">
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>INITIATE SHOWCASE</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color={THEME.colors.text} /></TouchableOpacity>
                        </View>

                        <SculptedInput label="PROJECT TITLE" placeholder="ENTER TITLE..." />
                        <SculptedInput label="NARRATIVE" placeholder="EXPLAIN THE MISSION..." multiline />

                        <TouchableOpacity style={[styles.uploadBtn, BEZIER_CURVES.soft]}>
                            <Upload size={20} color={THEME.colors.accent} />
                            <Text style={styles.uploadText}>ATTACH ASSETS</Text>
                        </TouchableOpacity>

                        <SculptedButton label="PUBLISH TO PULSE" onPress={() => setModalVisible(false)} />
                    </SculptedView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.bg },
    heroSection: { padding: 24 },
    greeting: { fontSize: 38, fontWeight: '800', color: THEME.colors.text, letterSpacing: -2.5 },
    subGreeting: { fontSize: 13, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 4, marginTop: -4 },
    horizontalScroll: { paddingLeft: 24, marginTop: 15 },
    categoryChip: { paddingHorizontal: 22, paddingVertical: 14, backgroundColor: THEME.colors.surface, marginRight: 12 },
    categoryText: { color: THEME.colors.accent, fontWeight: '900', fontSize: 12, letterSpacing: 1 },
    feedSection: { paddingHorizontal: 24, marginTop: 30 },
    sectionTitle: { fontSize: 13, fontWeight: '900', color: THEME.colors.accent, letterSpacing: 5, marginBottom: 25 },
    projectCard: { marginBottom: 30, borderLeftWidth: 6, borderLeftColor: THEME.colors.accent },
    projectHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    avatarMini: { width: 38, height: 38, backgroundColor: THEME.colors.bg, borderWidth: 2, borderColor: THEME.colors.accent },
    projectAuthor: { color: THEME.colors.text, fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
    deptTime: { color: THEME.colors.accent, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    bookmark: { marginLeft: 'auto' },
    projectTitle: { fontSize: 24, fontWeight: '900', color: THEME.colors.text, letterSpacing: -0.8 },
    projectDesc: { fontSize: 15, color: THEME.colors.textMuted, marginTop: 10, lineHeight: 22, fontWeight: '500' },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 },
    tag: { backgroundColor: THEME.colors.bg, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
    tagText: { color: THEME.colors.accent, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    viewBtn: { backgroundColor: THEME.colors.accent, padding: 12 },
    fabContainer: { position: 'absolute', bottom: 30, right: 30 },
    fab: {
        backgroundColor: THEME.colors.accent,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
        shadowColor: THEME.colors.accent,
        shadowOpacity: 0.4,
        shadowRadius: 20
    },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(26, 22, 38, 0.9)', justifyContent: 'center', padding: 24 },
    modalContent: { minHeight: '60%', borderLeftWidth: 8, borderLeftColor: THEME.colors.accent },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 },
    modalTitle: { fontSize: 26, fontWeight: '900', color: THEME.colors.text, letterSpacing: -1 },
    uploadBtn: { padding: 30, borderWidth: 2, borderStyle: 'dashed', borderColor: THEME.colors.accent, alignItems: 'center', marginBottom: 30 },
    uploadText: { marginTop: 12, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 1.5, fontSize: 11 }
});

export default HomeScreen;
