import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search as SearchIcon, Filter, Zap } from 'lucide-react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import SculptedView from '../components/SculptedView';
import { MotiView } from 'moti';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const filters = ['WEB', 'MOBILE', 'AI', 'MECH', 'ECE', 'CSE'];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MotiView
                    from={{ opacity: 0, translateY: -15 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    style={[styles.searchBar, BEZIER_CURVES.soft]}
                >
                    <SearchIcon size={24} color={THEME.colors.accent} />
                    <TextInput
                        placeholder="DISCOVER PROTOCOLS..."
                        placeholderTextColor={THEME.colors.accent}
                        style={styles.input}
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Filter size={22} color={THEME.colors.text} />
                    </TouchableOpacity>
                </MotiView>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filters.map((f, i) => (
                        <MotiView
                            key={f}
                            from={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 60 }}
                        >
                            <TouchableOpacity style={[styles.chip, BEZIER_CURVES.soft]}>
                                <Text style={styles.chipText}>{f}</Text>
                            </TouchableOpacity>
                        </MotiView>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.resultsLabel}>TOP NODES</Text>

                {[1, 2, 3].map((item, index) => (
                    <MotiView
                        key={item}
                        from={{ opacity: 0, translateX: 30 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: index * 100 }}
                    >
                        <SculptedView style={styles.resultCard} type={index % 2 === 0 ? 'soft' : 'organic'}>
                            <View style={[styles.avatar, BEZIER_CURVES.soft]} />
                            <View style={styles.info}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.name}>ARJUN KUMAR</Text>
                                    <Zap size={16} color={THEME.colors.accent} style={{ marginLeft: 8 }} />
                                </View>
                                <Text style={styles.dept}>COMPUTER SCIENCE • 3RD YEAR</Text>
                                <View style={styles.skillRow}>
                                    {['REACT', 'DESIGN'].map(s => (
                                        <View key={s} style={[styles.minitag, BEZIER_CURVES.soft]}><Text style={styles.minitagText}>{s}</Text></View>
                                    ))}
                                </View>
                            </View>
                        </SculptedView>
                    </MotiView>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.bg },
    header: { padding: 24, paddingBottom: 0 },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.surface,
        paddingHorizontal: 22,
        paddingVertical: 18,
        borderWidth: 2,
        borderColor: 'rgba(94, 83, 115, 0.1)'
    },
    input: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '900', color: THEME.colors.text, letterSpacing: 2 },
    filterBtn: { padding: 5 },
    filterContainer: { marginTop: 30, paddingLeft: 24 },
    chip: { paddingHorizontal: 22, paddingVertical: 14, backgroundColor: THEME.colors.surface, marginRight: 15 },
    chipText: { color: THEME.colors.accent, fontWeight: '900', fontSize: 13, letterSpacing: 2 },
    scroll: { padding: 24 },
    resultsLabel: { fontSize: 12, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 6, marginBottom: 30 },
    resultCard: { flexDirection: 'row', marginBottom: 25, borderRightWidth: 8, borderRightColor: THEME.colors.accent },
    avatar: { width: 68, height: 68, backgroundColor: THEME.colors.bg, borderWidth: 3, borderColor: THEME.colors.accent },
    info: { marginLeft: 20, flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 20, fontWeight: '900', color: THEME.colors.text, letterSpacing: -1 },
    dept: { fontSize: 11, color: THEME.colors.accent, fontWeight: '900', marginTop: 6, letterSpacing: 1 },
    skillRow: { flexDirection: 'row', marginTop: 12 },
    minitag: { backgroundColor: THEME.colors.bg, paddingHorizontal: 12, paddingVertical: 6, marginRight: 10 },
    minitagText: { color: THEME.colors.text, fontSize: 10, fontWeight: '900', letterSpacing: 1 }
});

export default SearchScreen;
