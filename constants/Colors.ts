/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Color theme for the gym app
 */

const tintColorLight = '#FF5722'; // Orange - energy and motivation
const tintColorDark = '#FF7043'; // Dark orange

export const Colors = {
  light: {
    text: '#333333',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#757575',
    tabIconDefault: '#BDBDBD',
    tabIconSelected: tintColorLight,
    primary: '#FF5722', // Primary color - orange
    secondary: '#2196F3', // Secondary color - blue
    accent: '#4CAF50', // Accent color - green
    cardBackground: '#F5F5F5', // Card background color
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    icon: '#E0E0E0',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: tintColorDark,
    primary: '#FF7043', // Primary color - dark orange
    secondary: '#42A5F5', // Secondary color - light blue
    accent: '#66BB6A', // Accent color - light green
    cardBackground: '#1E1E1E', // Card background color
  },
};
