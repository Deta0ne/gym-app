import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedSwitch } from '@/components/ui/AnimatedSwitch';

// Mock user data - in a real app, this would come from a database or API
const USER_DATA = {
    name: 'Mert Yıldız ',
    email: 'cmertyldz@gmail.com',
    joinDate: '2025',
    avatarUrl: null, // Default avatar will be shown
};

export default function ProfileScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { favorites } = useFavorites();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [notifications, setNotifications] = useState(true);

    // Toggle notifications setting
    const toggleNotifications = () => {
        setNotifications(!notifications);
    };

    // Navigate to favorites screen
    const navigateToFavorites = () => {
        router.push('/(tabs)/favorites');
    };

    // Handle logout
    const handleLogout = async () => {
        Alert.alert('Çıkış Yap', 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?', [
            {
                text: 'İptal',
                style: 'cancel',
            },
            {
                text: 'Çıkış Yap',
                style: 'destructive',
                onPress: async () => {
                    // In a real app, you would clear auth tokens here
                    try {
                        // For demo purposes, we'll just show an alert
                        Alert.alert('Çıkış yapıldı', 'Başarıyla çıkış yaptınız.');
                    } catch (error) {
                        console.error('Error during logout:', error);
                    }
                },
            },
        ]);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Profil
                </ThemedText>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* User Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        {USER_DATA.avatarUrl ? (
                            <Image source={{ uri: USER_DATA.avatarUrl }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
                                <ThemedText style={styles.avatarText}>
                                    {USER_DATA.name.trim().charAt(0).toUpperCase()}
                                </ThemedText>
                            </View>
                        )}
                    </View>
                    <ThemedText style={styles.userName}>{USER_DATA.name}</ThemedText>
                    <ThemedText style={styles.userEmail}>{USER_DATA.email}</ThemedText>
                    <ThemedText style={styles.joinDate}>{`${USER_DATA.joinDate} yılından beri üye`}</ThemedText>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <IconSymbol name="star.fill" size={24} color={colors.primary} />
                        <ThemedText style={styles.statValue}>{favorites.length}</ThemedText>
                        <ThemedText style={styles.statLabel}>Favori</ThemedText>
                    </View>

                    <View style={styles.statItem}>
                        <IconSymbol name="figure.walk" size={24} color={colors.primary} />
                        <ThemedText style={styles.statValue}>0</ThemedText>
                        <ThemedText style={styles.statLabel}>Antrenman</ThemedText>
                    </View>

                    <View style={styles.statItem}>
                        <IconSymbol name="dumbbell.fill" size={24} color={colors.primary} />
                        <ThemedText style={styles.statValue}>0</ThemedText>
                        <ThemedText style={styles.statLabel}>Egzersiz</ThemedText>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.settingsSection}>
                    <ThemedText style={styles.sectionTitle}>Ayarlar</ThemedText>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <IconSymbol name="bell.fill" size={20} color={colors.text} />
                            <ThemedText style={styles.settingLabel}>Bildirimler</ThemedText>
                        </View>
                        <AnimatedSwitch
                            value={notifications}
                            onValueChange={toggleNotifications}
                            activeColor={colors.primary}
                            inactiveColor="#767577"
                            thumbColor="#f4f3f4"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <IconSymbol name="moon.fill" size={20} color={colors.text} />
                            <ThemedText style={styles.settingLabel}>Karanlık Mod</ThemedText>
                        </View>
                        <AnimatedSwitch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            activeColor={colors.primary}
                            inactiveColor="#767577"
                            thumbColor="#f4f3f4"
                        />
                    </View>
                </View>

                {/* Actions Section */}
                <View style={styles.actionsSection}>
                    <ThemedText style={styles.sectionTitle}>Hızlı Erişim</ThemedText>

                    <TouchableOpacity style={styles.actionButton} onPress={navigateToFavorites}>
                        <View style={styles.actionInfo}>
                            <IconSymbol name="star.fill" size={20} color={colors.text} />
                            <ThemedText style={styles.actionLabel}>Favorilerim</ThemedText>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                        <View style={styles.actionInfo}>
                            <IconSymbol name="gear" size={20} color={colors.text} />
                            <ThemedText style={styles.actionLabel}>Uygulama Ayarları</ThemedText>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                        <View style={styles.actionInfo}>
                            <IconSymbol name="door.left.hand.open" size={20} color="#F44336" />
                            <ThemedText style={styles.logoutText}>Çıkış Yap</ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* App Info */}
                <View style={styles.appInfo}>
                    <ThemedText style={styles.versionText}>Gym App v1.0.0</ThemedText>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    title: {
        marginBottom: 4,
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 24,
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 100,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        opacity: 0.7,
        marginBottom: 4,
    },
    joinDate: {
        fontSize: 14,
        opacity: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        marginBottom: 24,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 14,
        opacity: 0.7,
    },
    settingsSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        marginLeft: 12,
        fontSize: 16,
    },
    actionsSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    actionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionLabel: {
        marginLeft: 12,
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 16,
        borderBottomWidth: 0,
    },
    logoutText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#F44336',
        fontWeight: '500',
    },
    appInfo: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    versionText: {
        fontSize: 14,
        opacity: 0.5,
    },
});
