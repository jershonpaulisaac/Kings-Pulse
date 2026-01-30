import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { ArrowUp, Plus, Info } from 'lucide-react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import SculptedView from '../components/SculptedView';

const ForumScreen = () => {
    const posts = [
        { id: '1', title: 'OPTIMIZING HETEROGENEOUS NETWORKS IN CAMPUS', author: 'ARJUN K', votes: 12, category: 'ENGINEERING' },
        { id: '2', title: 'SIH 2026: INNOVATION STREAM GUIDELINES', author: 'SARA S', votes: 45, category: 'EVENTS' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ flex: 1 }}>
                    <Text style={styles.title}>COMMUNITY</Text>
                    <Text style={styles.subtitle}>SHARED INTELLIGENCE</Text>
                </MotiView>
                <TouchableOpacity style={[styles.addBtn, BEZIER_CURVES.soft]}>
                    <Plus size={26} color={THEME.colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {posts.map((post, index) => (
                    <MotiView
                        key={post.id}
                        from={{ opacity: 0, translateY: 30 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: index * 120 }}
                    >
                        <SculptedView style={styles.postCard} type={index % 2 === 0 ? 'soft' : 'organic'}>
                            <View style={styles.voteColumn}>
                                <TouchableOpacity style={[styles.voteBtn, BEZIER_CURVES.soft]}>
                                    <ArrowUp size={26} color={THEME.colors.accent} strokeWidth={4} />
                                </TouchableOpacity>
                                <Text style={styles.voteCount}>{post.votes}</Text>
                            </View>
                            <View style={styles.postInfo}>
                                <View style={[styles.catBadge, BEZIER_CURVES.soft]}><Text style={styles.catText}>{post.category}</Text></View>
                                <Text style={styles.postTitle}>{post.title}</Text>
                                <Text style={styles.postMeta}>INITIATED BY {post.author}</Text>
                            </View>
                        </SculptedView>
                    </MotiView>
                ))}

                <SculptedView style={styles.tipCard} type="organic">
                    <View style={styles.tipTitleRow}>
                        <Info size={20} color={THEME.colors.text} />
                        <Text style={styles.tipTitle}>PROTOCOL TIP</Text>
                    </View>
                    <Text style={styles.tipText}>VOTE ON TECHNICAL CONTRIBUTIONS TO ACCELERATE CAMPUS KNOWLEDGE FLOW.</Text>
                </SculptedView>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.bg },
    header: { padding: 24, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 36, fontWeight: '900', color: THEME.colors.text, letterSpacing: -2.5 },
    subtitle: { fontSize: 12, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 4, marginTop: -6 },
    addBtn: { backgroundColor: THEME.colors.accent, padding: 18, elevation: 15, shadowColor: THEME.colors.accent, shadowOpacity: 0.3, shadowRadius: 15 },
    scroll: { padding: 24 },
    postCard: { flexDirection: 'row', marginBottom: 25, borderBottomWidth: 8, borderBottomColor: THEME.colors.bg },
    voteColumn: { alignItems: 'center', marginRight: 24, justifyContent: 'center' },
    voteBtn: { backgroundColor: THEME.colors.bg, padding: 14, borderWidth: 1.5, borderColor: 'rgba(94, 83, 115, 0.2)' },
    voteCount: { fontSize: 22, fontWeight: '900', color: THEME.colors.text, marginTop: 8, letterSpacing: -1 },
    postInfo: { flex: 1 },
    catBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, backgroundColor: THEME.colors.bg, marginBottom: 15 },
    catText: { fontSize: 10, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 2 },
    postTitle: { fontSize: 20, fontWeight: '900', color: THEME.colors.text, lineHeight: 26, letterSpacing: -0.5 },
    postMeta: { fontSize: 11, color: THEME.colors.textMuted, marginTop: 12, fontWeight: '900', letterSpacing: 1 },
    tipCard: { marginTop: 30, backgroundColor: THEME.colors.accent },
    tipTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    tipTitle: { color: THEME.colors.text, fontSize: 12, fontWeight: '900', marginLeft: 10, letterSpacing: 2 },
    tipText: { color: THEME.colors.text, fontSize: 13, fontWeight: '700', lineHeight: 20, letterSpacing: 0.5 }
});

export default ForumScreen;
