import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Default to light mode instead of following system preference
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // iOS Design Tokens - Human Interface Guidelines
  const theme = {
    isDarkMode,
    toggleTheme,
    
    // Typography System - iOS Standard Font Sizes and Weights
    typography: {
      // Large Title - 34pt, Bold
      largeTitle: {
        fontSize: 34,
        fontWeight: '700',
        lineHeight: 41,
        letterSpacing: 0.37,
      },
      // Title 1 - 28pt, Bold
      title1: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
        letterSpacing: 0.36,
      },
      // Title 2 - 22pt, Bold
      title2: {
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 28,
        letterSpacing: 0.35,
      },
      // Title 3 - 20pt, Semibold
      title3: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.38,
      },
      // Headline - 17pt, Semibold
      headline: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.41,
      },
      // Body - 17pt, Regular
      body: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.41,
      },
      // Callout - 16pt, Regular
      callout: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: -0.32,
      },
      // Subheadline - 15pt, Regular
      subheadline: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: -0.24,
      },
      // Footnote - 13pt, Regular
      footnote: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: -0.08,
      },
      // Caption 1 - 12pt, Regular
      caption1: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0,
      },
      // Caption 2 - 11pt, Regular
      caption2: {
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 13,
        letterSpacing: 0.07,
      },
    },

    // Spacing System - iOS Standard Spacing
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },

    // Border Radius System
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
      full: 9999,
    },

    // System Colors
    systemColors: {
      systemBlue: '#007AFF',
      systemGreen: '#34C759',
      systemIndigo: '#5856D6',
      systemOrange: '#FF9500',
      systemPink: '#FF2D92',
      systemPurple: '#AF52DE',
      systemRed: '#FF3B30',
      systemTeal: '#5AC8FA',
      systemYellow: '#FFCC02',
    },

    // Light Mode Colors
    lightColors: {
      // Background Colors
      systemBackground: '#FFFFFF',
      secondarySystemBackground: '#F2F2F7',
      tertiarySystemBackground: '#FFFFFF',
      
      // Grouped Background Colors
      systemGroupedBackground: '#F2F2F7',
      secondarySystemGroupedBackground: '#FFFFFF',
      tertiarySystemGroupedBackground: '#F2F2F7',
      
      // Label Colors
      label: '#000000',
      secondaryLabel: '#3C3C43',
      tertiaryLabel: '#3C3C43',
      quaternaryLabel: '#3C3C43',
      
      // Separator Colors
      separator: '#C6C6C8',
      opaqueSeparator: '#C6C6C8',
      
      // Fill Colors
      systemFill: '#787880',
      secondarySystemFill: '#787880',
      tertiarySystemFill: '#787880',
      quaternarySystemFill: '#787880',
    },
    
    // Dark Mode Colors
    darkColors: {
      // Background Colors
      systemBackground: '#000000',
      secondarySystemBackground: '#1C1C1E',
      tertiarySystemBackground: '#2C2C2E',
      
      // Grouped Background Colors
      systemGroupedBackground: '#000000',
      secondarySystemGroupedBackground: '#1C1C1E',
      tertiarySystemGroupedBackground: '#2C2C2E',
      
      // Label Colors
      label: '#FFFFFF',
      secondaryLabel: '#EBEBF5',
      tertiaryLabel: '#EBEBF5',
      quaternaryLabel: '#EBEBF5',
      
      // Separator Colors
      separator: '#38383A',
      opaqueSeparator: '#38383A',
      
      // Fill Colors
      systemFill: '#787880',
      secondarySystemFill: '#787880',
      tertiarySystemFill: '#787880',
      quaternarySystemFill: '#787880',
    },

    // Shadows - iOS Standard Shadows
    shadows: {
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },
      xl: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
      },
    },
  };

  // Get current theme colors based on dark mode
  const currentColors = isDarkMode ? theme.darkColors : theme.lightColors;

  // Combine system colors with current theme colors
  const colors = {
    ...theme.systemColors,
    ...currentColors,
  };

  // Add semantic color getters
  const colorsWithSemantics = {
    ...colors,
    primary: colors.systemBlue,
    success: colors.systemGreen,
    warning: colors.systemOrange,
    error: colors.systemRed,
    info: colors.systemBlue,
  };

  const finalTheme = {
    ...theme,
    colors: colorsWithSemantics,
  };

  return (
    <ThemeContext.Provider value={finalTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
