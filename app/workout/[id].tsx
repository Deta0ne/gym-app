import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, TextInput, Modal, FlatList, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useWorkouts, Workout, WorkoutExercise, WorkoutSet } from '@/context/WorkoutContext';
import { EXERCISES, Exercise } from '@/constants/ExerciseData';
import { ExerciseCard } from '@/components/ExerciseCard';
import { getImageSource } from '@/utils/imageUtils';
import { MaterialIcons } from '@expo/vector-icons';

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
                    {/* Workout Details Section */}
                    <View style={styles.detailsSection}>
                        {editingName ? (
                            <View style={styles.editNameContainer}>
                                <ThemedText style={styles.inputLabel}>Antrenman Adı</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: colors.text, borderColor: '#ccc' }]}
                                    value={workoutName}
                                    onChangeText={setWorkoutName}
                                    placeholder="Antrenman adı"
                                    placeholderTextColor={colors.text + '80'}
                                    autoFocus
                                />

                                <ThemedText style={styles.inputLabel}>Açıklama (Opsiyonel)</ThemedText>
                                <TextInput
                                    style={[styles.input, styles.textArea, { color: colors.text, borderColor: '#ccc' }]}
                                    value={workoutDescription}
                                    onChangeText={setWorkoutDescription}
                                    placeholder="Antrenman açıklaması"
                                    placeholderTextColor={colors.text + '80'}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />

                                <View style={styles.editButtonsContainer}>
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#ccc' }]}
                                        onPress={() => {
                                            setEditingName(false);
                                            setWorkoutName(workout?.name || '');
                                            setWorkoutDescription(workout?.description || '');
                                        }}
                                    >
                                        <ThemedText style={styles.editButtonText}>İptal</ThemedText>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: colors.primary }]}
                                        onPress={handleSaveWorkoutDetails}
                                    >
                                        <ThemedText style={styles.editButtonText}>Kaydet</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.workoutHeader}>
                                <View>
                                    <ThemedText type="title" style={styles.workoutName}>
                                        {workout?.name}
                                    </ThemedText>

                                    {workout?.description ? (
                                        <ThemedText style={styles.workoutDescription}>{workout.description}</ThemedText>
                                    ) : null}
                                </View>

                                <TouchableOpacity
                                    onPress={() => setEditingName(true)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    style={styles.actionButton}
                                >
                                    <IconSymbol name="pencil" size={20} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Exercises Section */}
                    <View style={styles.exercisesSection}>
                        <View style={styles.sectionHeader}>
                            <ThemedText type="subtitle" style={styles.sectionTitle}>
                                Egzersizler
                            </ThemedText>

                            <TouchableOpacity
                                onPress={() => setAddExerciseModalVisible(true)}
                                style={[styles.addExerciseButton, { backgroundColor: colors.primary }]}
                            >
                                <IconSymbol name="plus" size={16} color="white" />
                                <ThemedText style={styles.addExerciseButtonText}>Egzersiz Ekle</ThemedText>
                            </TouchableOpacity>
                        </View>

                        {workoutExercisesWithData.length === 0 ? (
                            <View style={styles.emptyExercisesContainer}>
                                <IconSymbol
                                    name="dumbbell.fill"
                                    size={48}
                                    color={colors.text}
                                    style={{ opacity: 0.3 }}
                                />
                                <ThemedText style={styles.emptyExercisesText}>
                                    Bu antrenman listesine henüz egzersiz eklenmemiş
                                </ThemedText>
                                <ThemedText style={styles.emptyExercisesSubtext}>
                                    "Egzersiz Ekle" butonuna tıklayarak antrenman programınızı oluşturmaya başlayın
                                </ThemedText>
                            </View>
                        ) : (
                            workoutExercisesWithData.map((workoutExercise, index) => {
                                if (!workoutExercise.exerciseData) return null;

                                const hasSets = workoutExercise.sets.length > 0;
                                const exerciseData = workoutExercise.exerciseData;
                                const imageSource = getImageSource(exerciseData.imageUrl);

                                return (
                                    <View
                                        key={workoutExercise.exerciseId}
                                        style={[
                                            styles.exerciseItem,
                                            {
                                                backgroundColor: colors.cardBackground,
                                                borderColor:
                                                    colorScheme === 'dark'
                                                        ? 'rgba(255,255,255,0.1)'
                                                        : 'rgba(0,0,0,0.1)',
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            style={styles.exerciseHeader}
                                            onPress={() => navigateToExerciseDetail(exerciseData.id)}
                                            activeOpacity={0.7}
                                        >
                                            {/* Egzersiz Resmi */}
                                            <View style={styles.exerciseImageContainer}>
                                                {imageSource ? (
                                                    <Image
                                                        source={imageSource}
                                                        style={styles.exerciseImage}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <View
                                                        style={[
                                                            styles.noImageContainer,
                                                            { backgroundColor: colors.primary + '20' },
                                                        ]}
                                                    >
                                                        <IconSymbol
                                                            name="dumbbell.fill"
                                                            size={24}
                                                            color={colors.primary}
                                                        />
                                                    </View>
                                                )}
                                            </View>

                                            {/* Egzersiz Bilgisi */}
                                            <View style={styles.exerciseInfo}>
                                                <ThemedText type="subtitle" style={styles.exerciseTitle}>
                                                    {index + 1}. {exerciseData.name}
                                                </ThemedText>

                                                <ThemedText style={styles.exerciseMuscleGroup} numberOfLines={1}>
                                                    {exerciseData.targetMuscles?.join(', ')}
                                                </ThemedText>

                                                <View style={styles.exerciseTags}>
                                                    <View
                                                        style={[
                                                            styles.exerciseTag,
                                                            { backgroundColor: colors.primary + '20' },
                                                        ]}
                                                    >
                                                        <ThemedText
                                                            style={[styles.exerciseTagText, { color: colors.primary }]}
                                                        >
                                                            {exerciseData.category}
                                                        </ThemedText>
                                                    </View>

                                                    <View
                                                        style={[
                                                            styles.exerciseTag,
                                                            { backgroundColor: 'rgba(0,0,0,0.05)' },
                                                        ]}
                                                    >
                                                        <ThemedText style={styles.exerciseTagText}>
                                                            {exerciseData.difficulty}
                                                        </ThemedText>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* Action Button (3 dots menu) */}
                                            <TouchableOpacity
                                                style={[
                                                    styles.actionMenuButton,
                                                    {
                                                        backgroundColor: colors.primary + '20',
                                                    },
                                                ]}
                                                onPress={(e) => {
                                                    e.stopPropagation();
                                                    toggleActionMenu(exerciseData.id);
                                                }}
                                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                            >
                                                <MaterialIcons name="more-vert" size={22} color={colors.primary} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>

                                        {/* Action Menu Dropdown */}
                                        {openActionMenuId === exerciseData.id && (
                                            <View
                                                style={[
                                                    styles.actionMenuDropdown,
                                                    {
                                                        backgroundColor: colors.cardBackground,
                                                        borderColor:
                                                            colorScheme === 'dark'
                                                                ? 'rgba(255,255,255,0.1)'
                                                                : 'rgba(0,0,0,0.05)',
                                                    },
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    style={styles.actionMenuItem}
                                                    onPress={() => {
                                                        handleEditSets(workoutExercise);
                                                        setOpenActionMenuId(null);
                                                    }}
                                                >
                                                    <IconSymbol name="pencil" size={16} color={colors.primary} />
                                                    <ThemedText style={styles.actionMenuItemText}>
                                                        Setleri Düzenle
                                                    </ThemedText>
                                                </TouchableOpacity>

                                                <View
                                                    style={[
                                                        styles.actionMenuDivider,
                                                        {
                                                            backgroundColor:
                                                                colorScheme === 'dark'
                                                                    ? 'rgba(255,255,255,0.1)'
                                                                    : 'rgba(0,0,0,0.05)',
                                                        },
                                                    ]}
                                                />

                                                <TouchableOpacity
                                                    style={styles.actionMenuItem}
                                                    onPress={() => {
                                                        confirmRemoveExercise(exerciseData);
                                                        setOpenActionMenuId(null);
                                                    }}
                                                >
                                                    <IconSymbol name="trash" size={16} color="#ff3b30" />
                                                    <ThemedText
                                                        style={[styles.actionMenuItemText, { color: '#ff3b30' }]}
                                                    >
                                                        Egzersizi Kaldır
                                                    </ThemedText>
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {/* Exercise Sets */}
                                        <View
                                            style={[
                                                styles.setsContainer,
                                                {
                                                    backgroundColor:
                                                        colorScheme === 'dark'
                                                            ? 'rgba(255,255,255,0.05)'
                                                            : 'rgba(0,0,0,0.02)',
                                                    borderColor:
                                                        colorScheme === 'dark'
                                                            ? 'rgba(255,255,255,0.1)'
                                                            : 'rgba(0,0,0,0.1)',
                                                },
                                            ]}
                                        >
                                            {!hasSets ? (
                                                <TouchableOpacity
                                                    style={[styles.addSetWarning, { borderColor: colors.primary }]}
                                                    onPress={() => handleEditSets(workoutExercise)}
                                                >
                                                    <IconSymbol
                                                        name="exclamationmark.triangle"
                                                        size={16}
                                                        color={colors.primary}
                                                    />
                                                    <ThemedText
                                                        style={[styles.addSetWarningText, { color: colors.primary }]}
                                                    >
                                                        Enter set information for this exercise
                                                    </ThemedText>
                                                </TouchableOpacity>
                                            ) : (
                                                <>
                                                    <View
                                                        style={[
                                                            styles.setHeader,
                                                            {
                                                                borderBottomColor:
                                                                    colorScheme === 'dark'
                                                                        ? 'rgba(255,255,255,0.1)'
                                                                        : 'rgba(0,0,0,0.1)',
                                                            },
                                                        ]}
                                                    >
                                                        <ThemedText style={[styles.setHeaderText, { flex: 0.3 }]}>
                                                            Set
                                                        </ThemedText>
                                                        <ThemedText style={[styles.setHeaderText, { flex: 0.4 }]}>
                                                            Reps
                                                        </ThemedText>
                                                        <ThemedText style={[styles.setHeaderText, { flex: 0.3 }]}>
                                                            Weight
                                                        </ThemedText>
                                                    </View>

                                                    {workoutExercise.sets.map((set, setIndex) => (
                                                        <View
                                                            key={setIndex}
                                                            style={[
                                                                styles.setRow,
                                                                {
                                                                    borderBottomColor:
                                                                        colorScheme === 'dark'
                                                                            ? 'rgba(255,255,255,0.1)'
                                                                            : 'rgba(0,0,0,0.1)',
                                                                },
                                                            ]}
                                                        >
                                                            <ThemedText style={[styles.setText, { flex: 0.3 }]}>
                                                                {setIndex + 1}
                                                            </ThemedText>
                                                            <ThemedText style={[styles.setText, { flex: 0.4 }]}>
                                                                {set.repetitions} x
                                                            </ThemedText>
                                                            <ThemedText style={[styles.setText, { flex: 0.3 }]}>
                                                                {set.weight ? `${set.weight} kg` : '-'}
                                                            </ThemedText>
                                                        </View>
                                                    ))}
                                                </>
                                            )}
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </View>
                </ScrollView>

                {/* Add Exercise Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addExerciseModalVisible}
                    onRequestClose={() => setAddExerciseModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
                            <View style={styles.modalHeader}>
                                <ThemedText type="subtitle">Egzersiz Ekle</ThemedText>
                                <TouchableOpacity onPress={() => setAddExerciseModalVisible(false)}>
                                    <IconSymbol name="xmark" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.searchContainer}>
                                <IconSymbol
                                    name="magnifyingglass"
                                    size={18}
                                    color={colors.text}
                                    style={styles.searchIcon}
                                />
                                <TextInput
                                    style={[styles.searchInput, { color: colors.text }]}
                                    placeholder="Egzersiz ara..."
                                    placeholderTextColor={colors.text + '80'}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                                {searchQuery ? (
                                    <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                                        <IconSymbol name="xmark.circle.fill" size={18} color={colors.text} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <FlatList
                                data={filteredExercises}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.exerciseListItem}
                                        onPress={() => handleAddExercise(item.id)}
                                    >
                                        <ThemedText style={styles.exerciseListItemText}>{item.name}</ThemedText>
                                        <IconSymbol name="plus.circle" size={20} color={colors.primary} />
                                    </TouchableOpacity>
                                )}
                                contentContainerStyle={styles.exerciseList}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Edit Sets Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editSetModalVisible}
                    onRequestClose={() => setEditSetModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
                            <View style={styles.modalHeader}>
                                <ThemedText type="subtitle">Setleri Düzenle</ThemedText>
                                <TouchableOpacity onPress={() => setEditSetModalVisible(false)}>
                                    <IconSymbol name="xmark" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.setsEditorContainer}>
                                {selectedExercise && (
                                    <View style={styles.selectedExerciseHeader}>
                                        <ThemedText style={styles.selectedExerciseTitle}>
                                            {EXERCISES.find((e) => e.id === selectedExercise.exerciseId)?.name}
                                        </ThemedText>
                                        <ThemedText style={styles.setInstructions}>
                                            Her set için tekrar sayısı ve ağırlık bilgilerini aşağıda
                                            düzenleyebilirsiniz.
                                        </ThemedText>
                                    </View>
                                )}

                                {sets.map((set, index) => (
                                    <View key={index} style={styles.setEditorRow}>
                                        <View style={styles.setNumber}>
                                            <ThemedText style={styles.setNumberText}>{index + 1}</ThemedText>
                                        </View>

                                        <View style={styles.setFields}>
                                            <View style={styles.setField}>
                                                <ThemedText style={styles.setFieldLabel}>Tekrar</ThemedText>
                                                <TextInput
                                                    style={[
                                                        styles.setFieldInput,
                                                        { color: colors.text, borderColor: '#ccc' },
                                                    ]}
                                                    value={set.repetitions.toString()}
                                                    onChangeText={(value) =>
                                                        updateSet(index, 'repetitions', parseInt(value) || 0)
                                                    }
                                                    keyboardType="number-pad"
                                                />
                                            </View>

                                            <View style={styles.setField}>
                                                <ThemedText style={styles.setFieldLabel}>Ağırlık (kg)</ThemedText>
                                                <TextInput
                                                    style={[
                                                        styles.setFieldInput,
                                                        { color: colors.text, borderColor: '#ccc' },
                                                    ]}
                                                    value={set.weight?.toString() || ''}
                                                    onChangeText={(value) =>
                                                        updateSet(index, 'weight', parseInt(value) || 0)
                                                    }
                                                    keyboardType="number-pad"
                                                    placeholder="Opsiyonel"
                                                    placeholderTextColor={colors.text + '80'}
                                                />
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => removeSet(index)}
                                            style={styles.removeSetButton}
                                        >
                                            <IconSymbol name="trash" size={18} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                ))}

                                <TouchableOpacity
                                    style={[styles.addSetButton, { borderColor: colors.primary }]}
                                    onPress={addSet}
                                >
                                    <IconSymbol name="plus" size={16} color={colors.primary} />
                                    <ThemedText style={[styles.addSetButtonText, { color: colors.primary }]}>
                                        Set Ekle
                                    </ThemedText>
                                </TouchableOpacity>
                            </ScrollView>

                            <View style={styles.modalFooter}>
                                <TouchableOpacity
                                    style={[styles.saveButton, { backgroundColor: colors.primary }]}
                                    onPress={handleSaveSets}
                                >
                                    <ThemedText style={styles.saveButtonText}>Kaydet</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    detailsSection: {
        padding: 16,
        marginTop: 8,
        borderRadius: 8,
    },
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    workoutName: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    workoutDescription: {
        opacity: 0.7,
    },
    editNameContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    textArea: {
        height: 100,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    editButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    editButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exercisesSection: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addExerciseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    addExerciseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 4,
        textAlign: 'center',
    },
    emptyExercisesContainer: {
        alignItems: 'center',
        padding: 24,
        marginTop: 8,
    },
    emptyExercisesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    emptyExercisesSubtext: {
        opacity: 0.7,
        textAlign: 'center',
        marginTop: 8,
    },
    exerciseItem: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2.5,
        elevation: 2,
    },
    exerciseHeader: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    exerciseImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    exerciseImage: {
        width: '100%',
        height: '100%',
    },
    noImageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseInfo: {
        flex: 1,
        marginRight: 8,
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    exerciseMuscleGroup: {
        fontSize: 13,
        opacity: 0.7,
        marginBottom: 4,
    },
    exerciseTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    exerciseTag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
    },
    exerciseTagText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    exerciseActions: {
        display: 'none',
    },
    exerciseTitleRow: {
        display: 'none',
    },
    setsContainer: {
        marginTop: 4,
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
    },
    setHeader: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: 1,
    },
    setHeaderText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    setRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
    },
    setText: {
        fontSize: 14,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '80%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    clearButton: {
        padding: 4,
    },
    exerciseList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    exerciseListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    exerciseListItemText: {
        fontSize: 16,
    },
    setsEditorContainer: {
        padding: 16,
        maxHeight: 400,
    },
    setEditorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    setNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    setNumberText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    setFields: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    setField: {
        flex: 1,
    },
    setFieldLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    setFieldInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    removeSetButton: {
        padding: 8,
        marginLeft: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,0,0,0.1)',
    },
    addSetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    addSetButtonText: {
        marginLeft: 4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    saveButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    addSetWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        marginTop: 8,
    },
    addSetWarningText: {
        marginLeft: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedExerciseHeader: {
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    selectedExerciseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    setInstructions: {
        fontSize: 13,
        opacity: 0.7,
        textAlign: 'center',
    },
    actionButton: {
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: 36,
        height: 36,
    },
    actionMenuButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    actionMenuDropdown: {
        position: 'absolute',
        top: 50,
        right: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        zIndex: 100,
        width: 150,
    },
    actionMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    actionMenuItemText: {
        marginLeft: 8,
        fontSize: 14,
    },
    actionMenuDivider: {
        height: 1,
    },
});
