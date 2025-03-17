import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { EXERCISES, MuscleGroup } from '@/constants/ExerciseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGifSource } from '@/utils/imageUtils';
import { Image } from 'expo-image';

export default function ExerciseDetailScreen() {
    const { id } = useLocalSearchParams();
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
});
