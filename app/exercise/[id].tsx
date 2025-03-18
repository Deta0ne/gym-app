import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { EXERCISES, MuscleGroup, Exercise } from '@/constants/ExerciseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGifSource, getImageSource } from '@/utils/imageUtils';
import { Image } from 'expo-image';

export default function ExerciseDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    // Find exercise by ID
    const exercise = EXERCISES.find((ex) => ex.id === id);

    if (!exercise) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Egzersiz bulunamadı.</ThemedText>
            </ThemedView>
        );
    }

    // Format muscle groups
    const formatMuscleGroups = (muscles: MuscleGroup[]) => {
        return muscles
            .map((muscle) => {
                return muscle.charAt(0).toUpperCase() + muscle.slice(1);
            })
            .join(', ');
    };

    // Get color based on difficulty level
    const getDifficultyColor = () => {
        switch (exercise.difficulty) {
            case 'beginner':
                return '#4CAF50'; // Green
            case 'intermediate':
                return '#FFC107'; // Yellow
            case 'advanced':
                return '#F44336'; // Red
            default:
                return colors.text;
        }
    };

    // Find similar exercises
    const getSimilarExercises = () => {
        return EXERCISES.filter(
            (ex) =>
                // Different exercise but has at least one matching muscle group
                ex.id !== exercise.id && ex.targetMuscles.some((muscle) => exercise.targetMuscles.includes(muscle)),
        ).slice(0, 4); // Limit to 4 similar exercises
    };

    const similarExercises = getSimilarExercises();

    // Navigate to another exercise
    const navigateToExercise = (exerciseId: string) => {
        router.push(`/exercise/${exerciseId}`);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: exercise.name,
                    headerBackTitle: 'Geri',
                }}
            />
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    {getGifSource(exercise.gifUrl) ? (
                        <Image
                            source={getGifSource(exercise.gifUrl)}
                            style={styles.image}
                            autoplay
                            contentFit="contain"
                        />
                    ) : (
                        <View style={[styles.placeholderImage, { backgroundColor: colors.cardBackground }]}>
                            <IconSymbol name="dumbbell.fill" size={80} color={colors.icon} />
                        </View>
                    )}
                </View>

                <ThemedView style={styles.contentContainer}>
                    <ThemedText type="title" style={styles.title}>
                        {exercise.name}
                    </ThemedText>

                    <View style={styles.badgeContainer}>
                        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                            <ThemedText style={styles.badgeText}>
                                {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                            </ThemedText>
                        </View>

                        <View style={[styles.badge, { backgroundColor: getDifficultyColor() }]}>
                            <ThemedText style={styles.badgeText}>
                                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                            </ThemedText>
                        </View>
                    </View>

                    <ThemedView style={styles.sectionContainer}>
                        <ThemedText type="subtitle">Hedef Kaslar</ThemedText>
                        <ThemedText>{formatMuscleGroups(exercise.targetMuscles)}</ThemedText>
                    </ThemedView>

                    {exercise.equipment && exercise.equipment.length > 0 && (
                        <ThemedView style={styles.sectionContainer}>
                            <ThemedText type="subtitle">Gerekli Ekipman</ThemedText>
                            <ThemedText>{exercise.equipment.join(', ')}</ThemedText>
                        </ThemedView>
                    )}

                    <ThemedView style={styles.sectionContainer}>
                        <ThemedText type="subtitle">Açıklama</ThemedText>
                        <ThemedText>{exercise.description}</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.sectionContainer}>
                        <ThemedText type="subtitle">Nasıl Yapılır</ThemedText>
                        {exercise.instructions.map((instruction, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <ThemedView style={styles.instructionNumber}>
                                    <ThemedText style={styles.instructionNumberText}>{index + 1}</ThemedText>
                                </ThemedView>
                                <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
                            </View>
                        ))}
                    </ThemedView>

                    {/* Similar Exercises Section */}
                    {similarExercises.length > 0 && (
                        <ThemedView style={styles.sectionContainer}>
                            <ThemedText type="subtitle" style={styles.similarTitle}>
                                Benzer Egzersizler
                            </ThemedText>
                            <ThemedText style={styles.similarSubtitle}>
                                Aynı kas gruplarını çalıştıran diğer hareketler
                            </ThemedText>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarList}>
                                {similarExercises.map((similar) => (
                                    <TouchableOpacity
                                        key={similar.id}
                                        style={styles.similarCard}
                                        onPress={() => navigateToExercise(similar.id)}
                                    >
                                        <View style={styles.similarImageContainer}>
                                            {getImageSource(similar.imageUrl) ? (
                                                <Image
                                                    source={getImageSource(similar.imageUrl)}
                                                    style={styles.similarImage}
                                                    contentFit="cover"
                                                />
                                            ) : (
                                                <View
                                                    style={[
                                                        styles.similarPlaceholder,
                                                        { backgroundColor: colors.cardBackground },
                                                    ]}
                                                >
                                                    <IconSymbol name="dumbbell.fill" size={28} color={colors.icon} />
                                                </View>
                                            )}
                                        </View>
                                        <ThemedText style={styles.similarName}>{similar.name}</ThemedText>
                                        <ThemedText style={styles.similarMuscles}>
                                            {formatMuscleGroups(
                                                similar.targetMuscles.filter((muscle) =>
                                                    exercise.targetMuscles.includes(muscle),
                                                ),
                                            )}
                                        </ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </ThemedView>
                    )}
                </ThemedView>
            </ScrollView>
        </>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: width,
        height: width * 0.75,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    title: {
        marginBottom: 12,
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    instructionNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF5722',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    instructionNumberText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    instructionText: {
        flex: 1,
        lineHeight: 22,
    },
    similarTitle: {
        marginBottom: 4,
    },
    similarSubtitle: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 12,
    },
    similarList: {
        marginLeft: -8,
        paddingLeft: 8,
    },
    similarCard: {
        width: 130,
        marginRight: 16,
    },
    similarImageContainer: {
        width: 130,
        height: 130,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 8,
    },
    similarImage: {
        width: '100%',
        height: '100%',
    },
    similarPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    similarName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    similarMuscles: {
        fontSize: 12,
        opacity: 0.7,
    },
});
