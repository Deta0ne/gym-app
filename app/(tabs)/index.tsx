import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { EXERCISES, ExerciseCategory, MuscleGroup } from '@/constants/ExerciseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getImageSource } from '@/utils/imageUtils';
import { useFavorites } from '@/context/FavoritesContext';

export default function HomeScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { isFavorite } = useFavorites();

    // Group exercises by category
    const strengthExercises = EXERCISES.filter((ex) => ex.category === ExerciseCategory.Strength);
    const cardioExercises = EXERCISES.filter((ex) => ex.category === ExerciseCategory.Cardio);

    // Group exercises by muscle groups
    const chestExercises = EXERCISES.filter((ex) => ex.targetMuscles.includes(MuscleGroup.Chest));
    const legExercises = EXERCISES.filter((ex) => ex.targetMuscles.includes(MuscleGroup.Legs));
    const backExercises = EXERCISES.filter((ex) => ex.targetMuscles.includes(MuscleGroup.Back));
    const absExercises = EXERCISES.filter((ex) => ex.targetMuscles.includes(MuscleGroup.Abs));

    // Navigate to exercise detail
    const navigateToExercise = (id: string) => {
        router.push(`/exercise/${id}`);
    };

    // Navigate to all exercises
    const navigateToAllExercises = () => {
        router.push('/(tabs)/explore');
    };

    // Navigate to favorites
    const navigateToFavorites = () => {
        router.push('/(tabs)/favorites');
    };

    // Navigate to muscle group
    const navigateToMuscleGroup = (group: MuscleGroup) => {
        router.push(`/muscle/${encodeURIComponent(group)}`);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Gym App
                </ThemedText>
                <ThemedText style={styles.subtitle}>Egzersiz hareketlerini keşfedin ve öğrenin</ThemedText>
            </View>

            {/* Quick Access Cards */}
            <View style={styles.quickAccessContainer}>
                <TouchableOpacity
                    style={[styles.quickAccessCard, { backgroundColor: colors.primary }]}
                    onPress={navigateToAllExercises}
                >
                    <IconSymbol name="dumbbell.fill" size={24} color="white" />
                    <ThemedText style={styles.quickAccessText}>Tüm Egzersizler</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.quickAccessCard, { backgroundColor: colors.secondary }]}
                    onPress={navigateToFavorites}
                >
                    <IconSymbol name="star.fill" size={24} color="white" />
                    <ThemedText style={styles.quickAccessText}>Favoriler</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.quickAccessCard, { backgroundColor: colors.accent }]}
                    onPress={() => {}}
                >
                    <IconSymbol name="figure.walk" size={24} color="white" />
                    <ThemedText style={styles.quickAccessText}>Antrenmanlar</ThemedText>
                </TouchableOpacity>
            </View>

            {/* Popular Exercises */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Popüler Egzersizler</ThemedText>
                    <TouchableOpacity onPress={navigateToAllExercises}>
                        <ThemedText style={{ color: colors.primary }}>Tümünü Gör</ThemedText>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                    {strengthExercises.slice(0, 3).map((exercise) => (
                        <TouchableOpacity
                            key={exercise.id}
                            style={styles.exerciseCard}
                            onPress={() => navigateToExercise(exercise.id)}
                        >
                            <View style={styles.exerciseImageContainer}>
                                {getImageSource(exercise.imageUrl) ? (
                                    <Image
                                        source={getImageSource(exercise.imageUrl)}
                                        style={styles.exerciseImage}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={[styles.placeholderImage, { backgroundColor: colors.cardBackground }]}>
                                        <IconSymbol name="dumbbell.fill" size={30} color={colors.icon} />
                                    </View>
                                )}
                                {isFavorite(exercise.id) && (
                                    <View style={styles.favoriteBadge}>
                                        <IconSymbol name="star.fill" size={16} color="#FFD700" />
                                    </View>
                                )}
                            </View>
                            <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Muscle Groups */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Kas Grupları</ThemedText>
                    <TouchableOpacity onPress={navigateToAllExercises}>
                        <ThemedText style={{ color: colors.primary }}>Tümünü Gör</ThemedText>
                    </TouchableOpacity>
                </View>

                <View style={styles.muscleGroupsContainer}>
                    <TouchableOpacity
                        style={[styles.muscleGroupCard, { backgroundColor: '#FF5722' }]}
                        onPress={() => navigateToMuscleGroup(MuscleGroup.Chest)}
                    >
                        <ThemedText style={styles.muscleGroupText}>Göğüs</ThemedText>
                        <ThemedText style={styles.muscleGroupCount}>{chestExercises.length} egzersiz</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.muscleGroupCard, { backgroundColor: '#2196F3' }]}
                        onPress={() => navigateToMuscleGroup(MuscleGroup.Legs)}
                    >
                        <ThemedText style={styles.muscleGroupText}>Bacak</ThemedText>
                        <ThemedText style={styles.muscleGroupCount}>{legExercises.length} egzersiz</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.muscleGroupCard, { backgroundColor: '#4CAF50' }]}
                        onPress={() => navigateToMuscleGroup(MuscleGroup.Back)}
                    >
                        <ThemedText style={styles.muscleGroupText}>Sırt</ThemedText>
                        <ThemedText style={styles.muscleGroupCount}>{backExercises.length} egzersiz</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.muscleGroupCard, { backgroundColor: '#9C27B0' }]}
                        onPress={() => navigateToMuscleGroup(MuscleGroup.Abs)}
                    >
                        <ThemedText style={styles.muscleGroupText}>Karın</ThemedText>
                        <ThemedText style={styles.muscleGroupCount}>{absExercises.length} egzersiz</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        opacity: 0.7,
    },
    quickAccessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    quickAccessCard: {
        width: '30%',
        height: 80,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    quickAccessText: {
        color: 'white',
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    horizontalList: {
        paddingLeft: 16,
    },
    exerciseCard: {
        width: 140,
        marginRight: 12,
    },
    exerciseImageContainer: {
        width: 140,
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
    },
    exerciseImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    muscleGroupsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    muscleGroupCard: {
        width: cardWidth,
        height: 100,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    muscleGroupText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    muscleGroupCount: {
        color: 'white',
        opacity: 0.8,
    },
});
