import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView as SAV } from 'react-native-safe-area-context';
import { Home, Search, MessageSquare, Calendar, User } from 'lucide-react-native';
import { MotiView } from 'moti';
import { THEME, BEZIER_CURVES } from './src/utils/Theme';
import SculptedView from './src/components/SculptedView';

const { width } = Dimensions.get('window');

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        {activeTab === 'Home' && <HomeScreen />}
        {activeTab === 'Search' && <SearchScreen />}
        {activeTab === 'Forum' && <ForumScreen />}
        {activeTab === 'Events' && <EventsScreen />}
        {activeTab === 'Profile' && <ProfileScreen />}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SAV style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={THEME.colors.bg} />

        {/* Cinematic Top Navbar */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.topNav}
        >
          <View>
            <Text style={styles.logo}>Kings SkillNet</Text>
            <Text style={styles.collegeName}>SECURE COLLABORATION</Text>
          </View>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => setActiveTab('Profile')}
          >
            <View style={[styles.avatarMini, BEZIER_CURVES.soft]} />
          </TouchableOpacity>
        </MotiView>

        {/* Main Content Area */}
        <MotiView
          key={activeTab}
          from={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{ flex: 1 }}
        >
          {renderScreen()}
        </MotiView>

        {/* Fluid Bottom Navigation */}
        <SAV edges={['bottom']} style={{ backgroundColor: THEME.colors.surface, ...BEZIER_CURVES.soft, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
          <View style={styles.bottomNav}>
            <TabItem label="Home" icon={Home} active={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
            <TabItem label="Search" icon={Search} active={activeTab === 'Search'} onPress={() => setActiveTab('Search')} />
            <View style={styles.centerSpace} />
            <TabItem label="Forum" icon={MessageSquare} active={activeTab === 'Forum'} onPress={() => setActiveTab('Forum')} />
            <TabItem label="Events" icon={Calendar} active={activeTab === 'Events'} onPress={() => setActiveTab('Events')} />
          </View>
          <TouchableOpacity style={styles.profileFab} onPress={() => setActiveTab('Profile')}>
            <MotiView
              animate={{ scale: activeTab === 'Profile' ? 1.2 : 1 }}
              style={[styles.fabBody, BEZIER_CURVES.organic]}
            >
              <User size={28} color={activeTab === 'Profile' ? THEME.colors.text : THEME.colors.accent} />
            </MotiView>
          </TouchableOpacity>
        </SAV>
      </SAV>
    </SafeAreaProvider>
  );
};

const TabItem = ({ label, icon: Icon, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <Icon size={24} color={active ? THEME.colors.text : THEME.colors.accent} strokeWidth={active ? 2.5 : 2} />
    {active && (
      <MotiView
        from={{ height: 0 }}
        animate={{ height: 4 }}
        style={styles.activeIndicator}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.bg },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 80,
    backgroundColor: THEME.colors.bg
  },
  logo: { fontSize: 26, fontWeight: '900', color: THEME.colors.text, letterSpacing: -1.5 },
  collegeName: { fontSize: 10, color: THEME.colors.accent, fontWeight: '900', letterSpacing: 3, marginTop: -4 },
  profileContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMini: {
    width: 40,
    height: 40,
    backgroundColor: THEME.colors.surface,
    borderWidth: 2,
    borderColor: THEME.colors.accent
  },
  bottomNav: {
    flexDirection: 'row',
    height: 75,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  activeIndicator: { width: 4, backgroundColor: THEME.colors.text, borderRadius: 2, marginTop: 4 },
  centerSpace: { width: 60 },
  profileFab: {
    position: 'absolute',
    top: -25,
    left: width / 2 - 35,
  },
  fabBody: {
    width: 70,
    height: 70,
    backgroundColor: THEME.colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: THEME.colors.surface,
  }
});

export default App;
