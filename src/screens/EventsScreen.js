import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { MapPin, ChevronRight, Zap } from 'lucide-react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import SculptedView from '../components/SculptedView';

const EventsScreen = () => {
    const events = [
        { id: '1', title: 'TECHQUEST HACKATHON 2026', date: 'FEB 15', loc: 'MAIN AUDITORIUM', type: 'MEGA EVENT' },
        { id: '2', title: 'NVIDIA GENAI WORKSHOP', date: 'FEB 20', loc: 'CLOUD LAB', type: 'SKILL UP' },
        { id: '3', title: 'GLOBAL CAREER SUMMIT', date: 'MAR 01', loc: 'SEMINAR HALL', type: 'PLACEMENT' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} style={styles.header}>
                <Text style={styles.title}>CHRONOLOGY</Text>
                <Text style={styles.subtitle}>ANNUAL TIMELINE</Text>
            </MotiView>

            <View style={styles.feed}>
                {events.map((event, index) => (
                    <MotiView
                        key={event.id}
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 150 }}
                    >
                        <SculptedView style={styles.eventCard} type={index % 2 === 0 ? 'soft' : 'organic'}>
                            <View style={styles.eventLeft}>
                                <Text style={styles.dateDay}>{event.date.split(' ')[1]}</Text>
                                <Text style={styles.dateMonth}>{event.date.split(' ')[0]}</Text>
                            </View>
                            <View style={styles.eventRight}>
                                <View style={[styles.typeBadge, BEZIER_CURVES.soft]}><Text style={styles.typeText}>{event.type}</Text></View>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <View style={styles.locRow}>
                                    <MapPin size={16} color={THEME.colors.accent} />
                                    <Text style={styles.locText}>{event.loc}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.regBtn, BEZIER_CURVES.soft]}>
                                <ChevronRight size={24} color={THEME.colors.text} strokeWidth={3} />
                            </TouchableOpacity>
                        </SculptedView>
                    </MotiView>
                ))}

                <SculptedView style={styles.statsCard} type="organic">
                    <Text style={styles.statsLabel}>TOTAL ENGAGEMENT</Text>
                    <View style={styles.statsRow}>
                        <Zap size={24} color={THEME.colors.text} />
                        <Text style={styles.statsValue}>12,500+</Text>
                    </View>
                    <Text style={styles.statsSub}>Interactions Logged this Semester</Text>
                </SculptedView>
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.bg },
    header: { padding: 24, marginBottom: 15 },
    title: { fontSize: 36, fontWeight: '900', color: THEME.colors.text, letterSpacing: -2.5 },
    subtitle: { fontSize: 12, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 5, marginTop: -6 },
    feed: { padding: 24, paddingTop: 0 },
    eventCard: { flexDirection: 'row', marginBottom: 25, borderRightWidth: 8, borderRightColor: THEME.colors.accent, alignItems: 'center' },
    eventLeft: { alignItems: 'center', paddingRight: 25, borderRightWidth: 1.5, borderRightColor: THEME.colors.bg },
    dateDay: { fontSize: 26, fontWeight: '900', color: THEME.colors.text, letterSpacing: -1 },
    dateMonth: { fontSize: 13, fontWeight: '900', color: THEME.colors.accent, letterSpacing: 1 },
    eventRight: { flex: 1, paddingLeft: 25 },
    typeBadge: { alignSelf: 'flex-start', backgroundColor: THEME.colors.bg, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 12 },
    typeText: { fontSize: 9, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 2 },
    eventTitle: { fontSize: 19, fontWeight: '900', color: THEME.colors.text, letterSpacing: -0.5, marginBottom: 10, lineHeight: 24 },
    locRow: { flexDirection: 'row', alignItems: 'center' },
    locText: { marginLeft: 8, fontSize: 12, color: THEME.colors.textMuted, fontWeight: '900', letterSpacing: 1 },
    regBtn: { backgroundColor: THEME.colors.accent, padding: 14, marginLeft: 10 },
    statsCard: { marginTop: 40, backgroundColor: THEME.colors.accent, alignItems: 'center', padding: 35 },
    statsLabel: { color: THEME.colors.text, fontSize: 11, fontWeight: '900', letterSpacing: 3, marginBottom: 15 },
    statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statsValue: { fontSize: 42, fontWeight: '900', color: THEME.colors.text, marginLeft: 15, letterSpacing: -1 },
    statsSub: { color: THEME.colors.text, fontSize: 12, fontWeight: '700', letterSpacing: 0.5, opacity: 0.8 }
});

export default EventsScreen;
