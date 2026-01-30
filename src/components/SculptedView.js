import React from 'react';
import { StyleSheet, View } from 'react-native';
import { THEME, BEZIER_CURVES } from '../utils/Theme';

const SculptedView = ({ children, style, type = 'soft', elevated = false, variant = 'surface', inset = false }) => {
    return (
        <View style={[
            styles.base,
            { backgroundColor: variant === 'bg' ? THEME.colors.bg : THEME.colors.surface },
            BEZIER_CURVES[type],
            elevated && THEME.shadows.dropSoft,
            inset && styles.insetShadowApproximation,
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        padding: 20,
        overflow: 'hidden',
    },
    insetShadowApproximation: {
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    }
});

export default SculptedView;
