import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Exercise, MuscleGroup } from '@/constants/ExerciseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from './ui/IconSymbol';
import { getImageSource } from '@/utils/imageUtils';

interface ExerciseCardProps {
    exercise: Exercise;
    onPress: (exercise: Exercise) => void;
    isFavorite?: boolean;
}

export function ExerciseCard({ exercise, onPress, isFavorite = false }: ExerciseCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

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

    // Format muscle groups
    const formatMuscleGroups = (muscles: MuscleGroup[]) => {
        return muscles
            .map((muscle) => {
                // Capitalize first letter
                return muscle.charAt(0).toUpperCase() + muscle.slice(1);
            })
            .join(', ');
    };

    return (
        <TouchableOpacity onPress={() => onPress(exercise)}>
            <ThemedView style={styles.card}>
                <View style={styles.imageContainer}>
                    {getImageSource(exercise.imageUrl) ? (
                        <Image source={getImageSource(exercise.imageUrl)} style={styles.image} resizeMode="cover" />
                    ) : (
                        <View style={[styles.placeholderImage, { backgroundColor: colors.cardBackground }]}>
                            <IconSymbol name="dumbbell.fill" size={40} color={colors.icon} />
                        </View>
                    )}
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
                        <ThemedText style={styles.difficultyText}>
                            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                        </ThemedText>
                    </View>

                    {isFavorite && (
                        <View style={styles.favoriteBadge}>
                            <IconSymbol name="star.fill" size={16} color="#FFD700" />
                        </View>
                    )}
                </View>

                <View style={styles.contentContainer}>
                    <ThemedText type="subtitle" style={styles.title}>
                        {exercise.name}
                    </ThemedText>

                    <View style={styles.detailRow}>
                        <IconSymbol name="figure.strengthtraining.traditional" size={16} color={colors.icon} />
                        <ThemedText style={styles.categoryText}>
                            {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                        </ThemedText>
                    </View>

                    <View style={styles.detailRow}>
                        <IconSymbol name="figure.walk" size={16} color={colors.icon} />
                        <ThemedText style={styles.muscleText} numberOfLines={1}>
                            {formatMuscleGroups(exercise.targetMuscles)}
                        </ThemedText>
                    </View>

                    <ThemedText numberOfLines={2} style={styles.description}>
                        {exercise.description}
                    </ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
        height: 150,
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
    difficultyBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    difficultyText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
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
    contentContainer: {
        padding: 16,
    },
    title: {
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryText: {
        marginLeft: 6,
        fontSize: 14,
    },
    muscleText: {
        marginLeft: 6,
        fontSize: 14,
    },
    description: {
        marginTop: 8,
        fontSize: 14,
        opacity: 0.8,
    },
});
