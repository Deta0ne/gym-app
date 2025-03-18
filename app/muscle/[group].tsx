import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExerciseCard } from '@/components/ExerciseCard';
import { EXERCISES, Exercise, MuscleGroup } from '@/constants/ExerciseData';
import { useRouter } from 'expo-router';

export default function MuscleGroupScreen() {
    const router = useRouter();
    const { group } = useLocalSearchParams();

    // Format muscle group from URL
    const formattedGroup = decodeURIComponent(group as string);

    // Filter exercises by selected muscle group
    const muscleGroup = formattedGroup.toLowerCase() as MuscleGroup;
    const exercises = EXERCISES.filter((exercise) => exercise.targetMuscles.includes(muscleGroup));

    // Navigate to exercise detail
    const handleExercisePress = (exercise: Exercise) => {
        router.push(`/exercise/${exercise.id}`);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: formattedGroup,
                    headerBackTitle: 'Geri',
                }}
            />
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        {formattedGroup} Egzersizleri
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>{exercises.length} egzersiz bulundu</ThemedText>
                </View>

                {exercises.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <ThemedText style={styles.emptyText}>Bu kas grubu için egzersiz bulunamadı.</ThemedText>
                    </View>
                ) : (
                    <FlatList
                        data={exercises}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard exercise={item} onPress={() => handleExercisePress(item)} />
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </ThemedView>
        </>
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
