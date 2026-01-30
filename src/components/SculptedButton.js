import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { THEME, BEZIER_CURVES } from '../utils/Theme';
import * as Haptics from 'expo-haptics';

const SculptedButton = ({ label, onPress, type = 'soft', style, labelStyle, icon: Icon }) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress && onPress();
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={style}>
            <MotiView
                from={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ type: 'timing', duration: 200 }}
                style={[
                    styles.button,
                    BEZIER_CURVES[type],
                    THEME.shadows.dropSoft
                ]}
            >
                {Icon && <Icon size={20} color={THEME.colors.text} style={{ marginRight: 10 }} />}
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            </MotiView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: THEME.colors.accent,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(219, 216, 227, 0.1)',
    },
    label: {
        color: THEME.colors.text,
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    }
});

export default SculptedButton;
