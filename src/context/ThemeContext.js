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
    
    // Typography System - Quizlet Style Font Sizes and Weights
    typography: {
      // Page Title - 24pt, Bold
      pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 32,
        letterSpacing: -0.2,
      },
      // Section Title - 20pt, Semibold
      sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: -0.1,
      },
      // Card Title - 18pt, Semibold
      cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: -0.1,
      },
      // Body Large - 16pt, Regular
      bodyLarge: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: -0.1,
      },
      // Body - 14pt, Regular
      body: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: -0.1,
      },
      // Body Small - 13pt, Regular
      bodySmall: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: -0.1,
      },
      // Caption - 12pt, Regular
      caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.1,
      },
      // Button Text - 14pt, Semibold
      buttonText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        letterSpacing: -0.1,
      },
      // Tab Label - 12pt, Medium
      tabLabel: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: -0.1,
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

    // Vibrant System Colors
    systemColors: {
      systemBlue: '#007AFF',
      systemGreen: '#34C759',
      systemIndigo: '#5856D6',
      systemOrange: '#FF9500',
      systemPink: '#FF2D92',
      systemPurple: '#8B5CF6',
      systemRed: '#FF3B30',
      systemTeal: '#5AC8FA',
      systemYellow: '#FFCC02',
      // Additional vibrant colors
      systemCyan: '#32ADE6',
      systemMint: '#00C7BE',
      systemBrown: '#A2845E',
      systemGray: '#8E8E93',
    },

    // Enhanced Light Mode Colors with gradients
    lightColors: {
      // Background Colors
      systemBackground: '#FFFFFF',
      secondarySystemBackground: '#F8F9FA',
      tertiarySystemBackground: '#FFFFFF',
      
      // Grouped Background Colors
      systemGroupedBackground: '#F2F2F7',
      secondarySystemGroupedBackground: '#FFFFFF',
      tertiarySystemGroupedBackground: '#F8F9FA',
      
      // Label Colors
      label: '#1C1C1E',
      secondaryLabel: '#3C3C43',
      tertiaryLabel: '#48484A',
      quaternaryLabel: '#6D6D70',
      
      // Separator Colors
      separator: '#C6C6C8',
      opaqueSeparator: '#C6C6C8',
      
      // Fill Colors
      systemFill: '#787880',
      secondarySystemFill: '#787880',
      tertiarySystemFill: '#787880',
      quaternarySystemFill: '#787880',

      // Enhanced accent colors
      primary: '#007AFF',
      primaryLight: '#4DA3FF',
      primaryDark: '#0056CC',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5AC8FA',
      
      // Gradient colors
      gradientStart: '#8B5CF6',
      gradientEnd: '#A855F7',
      gradientSecondary: '#C084FC',
      gradientSecondaryEnd: '#D946EF',
    },
    
    // Enhanced Dark Mode Colors
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

      // Enhanced accent colors
      primary: '#0A84FF',
      primaryLight: '#4DA3FF',
      primaryDark: '#0056CC',
      success: '#30D158',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#64D2FF',
      
      // Gradient colors
      gradientStart: '#667eea',
      gradientEnd: '#764ba2',
      gradientSecondary: '#f093fb',
      gradientSecondaryEnd: '#f5576c',
    },

    // Enhanced Shadows with better depth
    shadows: {
      xs: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
      },
      xl: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 12,
      },
    },

    // Animation durations
    animations: {
      fast: 200,
      normal: 300,
      slow: 500,
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
