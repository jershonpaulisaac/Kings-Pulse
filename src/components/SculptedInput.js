import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';

const SculptedInput = ({ label, value, onChangeText, placeholder, multiline, style, ...props }) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputWrapper,
                BEZIER_CURVES.soft,
                { height: multiline ? 120 : 60 }
            ]}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={THEME.colors.accent}
                    multiline={multiline}
                    style={styles.input}
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 10,
        color: THEME.colors.accent,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 10,
        marginLeft: 10,
    },
    inputWrapper: {
        backgroundColor: THEME.colors.bg,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(94, 83, 115, 0.2)', // Accent with low opacity
    },
    input: {
        color: THEME.colors.text,
        fontSize: 16,
        fontWeight: '700',
        paddingVertical: 10,
    }
});

export default SculptedInput;
