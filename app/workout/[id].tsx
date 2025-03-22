import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useWorkouts, Workout, WorkoutExercise, WorkoutSet } from '@/context/WorkoutContext';
import { EXERCISES, Exercise } from '@/constants/ExerciseData';
import { WorkoutHeader } from '@/components/workout/WorkoutHeader';
import { ExerciseList } from '@/components/workout/ExerciseList';
import { AddExerciseModal } from '@/components/workout/AddExerciseModal';
import { EditSetsModal } from '@/components/workout/EditSetsModal';

export default function WorkoutDetailScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getWorkout, updateWorkout, addExerciseToWorkout, removeExerciseFromWorkout, updateExerciseSets } =
        useWorkouts();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [editingName, setEditingName] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editSetModalVisible, setEditSetModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise | null>(null);
    const [sets, setSets] = useState<WorkoutSet[]>([]);
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

    useEffect(() => {
        loadWorkout();
    }, [id]);

    const loadWorkout = () => {
        if (!id) return;

        const loadedWorkout = getWorkout(id);
        if (loadedWorkout) {
            setWorkout(loadedWorkout);
            setWorkoutName(loadedWorkout.name);
            setWorkoutDescription(loadedWorkout.description || '');
        } else {
            // Workout not found, navigate back
            Alert.alert('Hata', 'Antrenman bulunamadı');
            router.back();
        }
    };

    const handleSaveWorkoutDetails = async () => {
        if (!workout) return;

        if (!workoutName.trim()) {
            Alert.alert('Hata', 'Antrenman adı boş olamaz');
            return;
        }

        try {
            const updatedWorkout = {
                ...workout,
                name: workoutName.trim(),
                description: workoutDescription.trim() || undefined,
                updatedAt: Date.now(),
            };

            setWorkout(updatedWorkout);
            setEditingName(false);

            const success = await updateWorkout(updatedWorkout);

            if (!success) {
                Alert.alert('Hata', 'Antrenman detayları güncellenirken bir hata oluştu');
                loadWorkout();
            }
        } catch (error) {
            Alert.alert('Hata', 'Antrenman detayları güncellenirken bir hata oluştu');
            loadWorkout();
        }
    };

    const handleAddExercise = async (exerciseId: string) => {
        if (!workout) return;

        try {
            const exerciseData = EXERCISES.find((e) => e.id === exerciseId);
            if (!exerciseData) {
                Alert.alert('Hata', 'Egzersiz bulunamadı');
                return;
            }

            const exerciseExists = workout.exercises.some((e) => e.exerciseId === exerciseId);
            if (exerciseExists) {
                Alert.alert('Uyarı', `"${exerciseData.name}" egzersizi bu antrenmana zaten eklenmiş.`, [
                    { text: 'Tamam', style: 'default' },
                ]);
                return;
            }

            const initialSets = [{ repetitions: 12, weight: 10 }];

            const updatedWorkout = {
                ...workout,
                exercises: [
                    ...workout.exercises,
                    {
                        exerciseId: exerciseId,
                        sets: initialSets,
                    },
                ],
            };
            setWorkout(updatedWorkout);

            setAddExerciseModalVisible(false);

            setSelectedExercise({
                exerciseId: exerciseId,
                sets: initialSets,
            });
            setSets(initialSets);

            Alert.alert(
                'Egzersiz Eklendi',
                `"${exerciseData.name}" egzersizi eklendi. Şimdi set bilgilerini düzenleyebilirsiniz.`,
                [
                    {
                        text: 'Setleri Düzenle',
                        onPress: () => setEditSetModalVisible(true),
                    },
                ],
            );

            const success = await addExerciseToWorkout(workout.id, exerciseId);
            if (!success) {
                Alert.alert('Hata', 'Egzersiz eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
                loadWorkout();
            }
        } catch (error) {
            Alert.alert('Hata', 'Egzersiz eklenirken bir hata oluştu');
            loadWorkout();
        }
    };

    const confirmRemoveExercise = (exercise: Exercise) => {
        Alert.alert(
            'Egzersizi Kaldır',
            `"${exercise.name}" egzersizini antrenman listesinden kaldırmak istediğinize emin misiniz?`,
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
                {
                    text: 'Kaldır',
                    style: 'destructive',
                    onPress: () => handleRemoveExercise(exercise.id),
                },
            ],
        );
    };

    const handleRemoveExercise = async (exerciseId: string) => {
        if (!workout) return;

        try {
            const updatedWorkout = {
                ...workout,
                exercises: workout.exercises.filter((e) => e.exerciseId !== exerciseId),
            };
            setWorkout(updatedWorkout);

            const success = await removeExerciseFromWorkout(workout.id, exerciseId);
            if (!success) {
                Alert.alert('Hata', 'Egzersiz kaldırılırken bir hata oluştu');
                loadWorkout();
            }
        } catch (error) {
            Alert.alert('Hata', 'Egzersiz kaldırılırken bir hata oluştu');
            loadWorkout();
        }
    };

    const handleEditSets = (workoutExercise: WorkoutExercise) => {
        setSelectedExercise(workoutExercise);
        const workoutSets = [...workoutExercise.sets];

        if (workoutSets.length === 0) {
            workoutSets.push({ repetitions: 10 });
        }

        setSets(workoutSets);
        setEditSetModalVisible(true);
    };

    const addSet = () => {
        setSets([...sets, { repetitions: 10 }]);
    };

    const removeSet = (index: number) => {
        const newSets = [...sets];
        newSets.splice(index, 1);
        setSets(newSets);
    };

    const updateSet = (index: number, field: keyof WorkoutSet, value: number) => {
        const newSets = [...sets];
        newSets[index] = {
            ...newSets[index],
            [field]: value,
        };
        setSets(newSets);
    };

    const handleSaveSets = async () => {
        if (!workout || !selectedExercise) return;

        if (sets.length === 0) {
            Alert.alert('Hata', 'En az bir set eklemelisiniz.');
            return;
        }

        const invalidSet = sets.find((set) => !set.repetitions || set.repetitions <= 0);
        if (invalidSet) {
            Alert.alert('Hata', 'Tekrar sayısı boş veya sıfır olamaz.');
            return;
        }

        try {
            const updatedWorkout = {
                ...workout,
                exercises: workout.exercises.map((e) => {
                    if (e.exerciseId === selectedExercise.exerciseId) {
                        return {
                            ...e,
                            sets: [...sets],
                        };
                    }
                    return e;
                }),
            };
            setWorkout(updatedWorkout);
            setEditSetModalVisible(false);

            const success = await updateExerciseSets(workout.id, selectedExercise.exerciseId, sets);
            if (!success) {
                Alert.alert('Hata', 'Setler güncellenirken bir hata oluştu');
                loadWorkout();
            }
        } catch (error) {
            Alert.alert('Hata', 'Setler güncellenirken bir hata oluştu');
            loadWorkout();
        } finally {
            setSelectedExercise(null);
        }
    };

    const filteredExercises = EXERCISES.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const navigateToExerciseDetail = (exerciseId: string) => {
        router.push(`/exercise/${exerciseId}`);
    };

    const toggleActionMenu = (exerciseId: string) => {
        setOpenActionMenuId(openActionMenuId === exerciseId ? null : exerciseId);
    };

    if (!workout) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ThemedText>Yükleniyor...</ThemedText>
            </ThemedView>
        );
    }

    const workoutExercisesWithData =
        workout?.exercises.map((workoutExercise) => {
            const exerciseData = EXERCISES.find((e) => e.id === workoutExercise.exerciseId);
            return {
                ...workoutExercise,
                exerciseData,
            };
        }) || [];

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: editingName ? 'Edit Workout' : workout?.name || 'Workout Details',
                    headerBackTitle: 'Back',
                }}
            />
            <ThemedView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Workout Header */}
                    <WorkoutHeader
                        workout={workout}
                        editingName={editingName}
                        workoutName={workoutName}
                        workoutDescription={workoutDescription}
                        setEditingName={setEditingName}
                        setWorkoutName={setWorkoutName}
                        setWorkoutDescription={setWorkoutDescription}
                        handleSaveWorkoutDetails={handleSaveWorkoutDetails}
                    />

                    {/* Exercise List */}
                    <ExerciseList
                        workoutExercisesWithData={workoutExercisesWithData}
                        openActionMenuId={openActionMenuId}
                        toggleActionMenu={toggleActionMenu}
                        navigateToExerciseDetail={navigateToExerciseDetail}
                        handleEditSets={handleEditSets}
                        confirmRemoveExercise={confirmRemoveExercise}
                        setAddExerciseModalVisible={setAddExerciseModalVisible}
                    />
                </ScrollView>

                {/* Add Exercise Modal */}
                <AddExerciseModal
                    visible={addExerciseModalVisible}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredExercises={filteredExercises}
                    onClose={() => setAddExerciseModalVisible(false)}
                    onAddExercise={handleAddExercise}
                />

                {/* Edit Sets Modal */}
                <EditSetsModal
                    visible={editSetModalVisible}
                    selectedExercise={selectedExercise}
                    sets={sets}
                    onClose={() => setEditSetModalVisible(false)}
                    onSave={handleSaveSets}
                    addSet={addSet}
                    removeSet={removeSet}
                    updateSet={updateSet}
                />
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
