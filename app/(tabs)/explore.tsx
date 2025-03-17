import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchBar } from '@/components/SearchBar';
import { ExerciseCard } from '@/components/ExerciseCard';
import { EXERCISES, Exercise, ExerciseCategory, MuscleGroup } from '@/constants/ExerciseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExercisesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(EXERCISES);
    const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);

    // Search and filtering process
    useEffect(() => {
        let result = [...EXERCISES];

        // Filter by search query
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            result = result.filter(
                (exercise) =>
                    exercise.name.toLowerCase().includes(lowerCaseQuery) ||
                    exercise.description.toLowerCase().includes(lowerCaseQuery) ||
                    exercise.category.toLowerCase().includes(lowerCaseQuery) ||
                    exercise.targetMuscles.some((muscle) => muscle.toLowerCase().includes(lowerCaseQuery)),
            );
        }

        // Filter by category
        if (selectedCategory) {
            result = result.filter((exercise) => exercise.category === selectedCategory);
        }

        // Filter by muscle group
        if (selectedMuscle) {
            result = result.filter((exercise) => exercise.targetMuscles.includes(selectedMuscle));
        }

        setFilteredExercises(result);
    }, [searchQuery, selectedCategory, selectedMuscle]);

    // Clear search query
    const clearSearch = () => {
        setSearchQuery('');
    };

    // Navigate to exercise detail
    const handleExercisePress = (exercise: Exercise) => {
        router.push(`/exercise/${exercise.id}`);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Egzersizler
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                    İstediğiniz egzersizi arayın ve nasıl yapıldığını öğrenin
                </ThemedText>
            </View>

            <SearchBar value={searchQuery} onChangeText={setSearchQuery} onClear={clearSearch} />

            {filteredExercises.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>Aradığınız kriterlere uygun egzersiz bulunamadı.</ThemedText>
                </View>
            ) : (
                <FlatList
                    data={filteredExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ExerciseCard exercise={item} onPress={handleExercisePress} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
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
        marginBottom: 8,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        opacity: 0.7,
        marginBottom: 8,
    },
    listContent: {
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
        opacity: 0.7,
    },
});
