import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider, useColorScheme } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { WorkoutProvider } from '@/context/WorkoutContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <RootLayoutNav />
        </ThemeProvider>
    );
}

// Separate component to use the theme context
function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <FavoritesProvider>
                <WorkoutProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="exercise/[id]" options={{ headerTitle: 'Egzersiz Detayı' }} />
                        <Stack.Screen name="workout/[id]" options={{ headerTitle: 'Antrenman Detayı' }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                </WorkoutProvider>
            </FavoritesProvider>
        </NavigationThemeProvider>
    );
}
