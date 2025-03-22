import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExerciseCard } from '@/components/ExerciseCard';
import { EXERCISES, Exercise } from '@/constants/ExerciseData';
import { useFavorites } from '@/context/FavoritesContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FavoritesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    // Use favorites context
    const { favorites, refreshFavorites } = useFavorites();

    // Track refreshing state
    const [refreshing, setRefreshing] = useState(false);

    // Get favorite exercises
    const favoriteExercises = EXERCISES.filter((exercise) => favorites.includes(exercise.id));

    // Navigate to exercise detail
    const handleExercisePress = (exercise: Exercise) => {
        router.push(`/exercise/${exercise.id}`);
    };

    // Refresh favorites
    const onRefresh = async () => {
        setRefreshing(true);
        await refreshFavorites();
        setRefreshing(false);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Favoriler
                </ThemedText>
                <ThemedText style={styles.subtitle}>Kaydettiğiniz egzersizleri burada bulabilirsiniz</ThemedText>
            </View>

            {favoriteExercises.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <>
                        <IconSymbol name="star.fill" size={60} color={colors.icon} />
                        <ThemedText style={styles.emptyText}>Henüz favori eklemediniz.</ThemedText>
                        <ThemedText style={styles.emptySubText}>
                            Egzersiz detay sayfasında yıldıza tıklayarak favori ekleyebilirsiniz.
                        </ThemedText>
                    </>
                </View>
            ) : (
                <FlatList
                    data={favoriteExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ExerciseCard exercise={item} onPress={() => handleExercisePress(item)} isFavorite={true} />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.text}
                        />
                    }
                />
            )}
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
        marginBottom: 16,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        opacity: 0.7,
        marginBottom: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubText: {
        textAlign: 'center',
        opacity: 0.7,
        paddingHorizontal: 40,
    },
});
