import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark' | 'system';
type ColorSchemeType = 'light' | 'dark';

const THEME_STORAGE_KEY = 'gym_app_theme';

interface ThemeContextType {
    theme: ThemeType;
    colorScheme: ColorSchemeType;
    setTheme: (theme: ThemeType) => Promise<void>;
    isDarkMode: boolean;
    toggleDarkMode: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// This is a replacement for the built-in useColorScheme hook
export function useColorScheme(): ColorSchemeType {
    const { colorScheme } = useTheme();
    return colorScheme;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const deviceColorScheme = (useDeviceColorScheme() as ColorSchemeType) || 'light';
    const [theme, setThemeState] = useState<ThemeType>('system');
    const [colorScheme, setColorScheme] = useState<ColorSchemeType>(deviceColorScheme);

    // Load saved theme preference
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme) {
                    setThemeState(savedTheme as ThemeType);
                }
            } catch (error) {
                console.error('Error loading theme preference:', error);
            }
        };

        loadTheme();
    }, []);

    // Update color scheme based on theme and device settings
    useEffect(() => {
        if (theme === 'system') {
            setColorScheme(deviceColorScheme);
        } else {
            setColorScheme(theme as ColorSchemeType);
        }
    }, [theme, deviceColorScheme]);

    // Save theme preference
    const setTheme = async (newTheme: ThemeType) => {
        setThemeState(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    // Toggle between light and dark
    const toggleDarkMode = async () => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        await setTheme(newTheme);
    };

    const isDarkMode = colorScheme === 'dark';

    const value = {
        theme,
        colorScheme,
        setTheme,
        isDarkMode,
        toggleDarkMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
