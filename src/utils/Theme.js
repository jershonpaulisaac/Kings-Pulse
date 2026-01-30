export const THEME = {
    colors: {
        bg: '#2A2539',         // Deep Raisin
        surface: '#353044',    // Dark Charcoal Purple
        accent: '#5E5373',     // Muted Lavender
        text: '#DBD8E3',       // Platinum White
        textMuted: '#9B98A3',  // Derived from Platinum
        overlay: 'rgba(53, 48, 68, 0.7)',
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '800',
            letterSpacing: -1,
        },
        h2: {
            fontSize: 24,
            fontWeight: '700',
            letterSpacing: -0.5,
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
        }
    },
    shadows: {
        dropSoft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 5,
        },
        dropMedium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.25,
            shadowRadius: 25,
            elevation: 10,
        },
        inner: {
            // In React Native, inner shadows are simulated with borders or specific SVG implementations
            // But we can approximate with shadowOffset and opacity
            shadowColor: '#1A1626',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
        }
    }
};

export const BEZIER_CURVES = {
    soft: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 40,
    },
    organic: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 55,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 30,
    }
};
