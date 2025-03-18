import React, { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Alert, Modal, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useWorkouts, Workout } from '@/context/WorkoutContext';

export default function WorkoutsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { workouts, addWorkout, deleteWorkout } = useWorkouts();

    const [modalVisible, setModalVisible] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');

    // Navigate to workout detail
    const handleWorkoutPress = (workoutId: string) => {
        router.push(`/workout/${workoutId}`);
    };

    // Add new workout
    const handleAddWorkout = async () => {
        if (!workoutName.trim()) {
            Alert.alert('Error', 'Workout name cannot be empty');
            return;
        }

        try {
            const success = await addWorkout({
                name: workoutName.trim(),
                description: workoutDescription.trim() || undefined,
                exercises: [],
            });

            if (success) {
                setModalVisible(false);
                setWorkoutName('');
                setWorkoutDescription('');
            } else {
                Alert.alert('Error', 'An error occurred while creating the workout');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while creating the workout');
        }
    };

    // Confirm workout deletion
    const confirmDeleteWorkout = (workoutId: string, workoutName: string) => {
        Alert.alert('Delete Workout', `Are you sure you want to delete the "${workoutName}" workout?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => handleDeleteWorkout(workoutId),
            },
        ]);
    };

    // Delete workout
    const handleDeleteWorkout = async (workoutId: string) => {
        try {
            const success = await deleteWorkout(workoutId);
            if (!success) {
                Alert.alert('Error', 'An error occurred while deleting the workout');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while deleting the workout');
        }
    };

    // Render workout item
    const renderWorkoutItem = ({ item }: { item: Workout }) => {
        // Calculate the number of exercises
        const exerciseCount = item.exercises.length;

        return (
            <TouchableOpacity
                style={[
                    styles.workoutCard,
                    {
                        backgroundColor: colors.cardBackground,
                        borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                    },
                ]}
                onPress={() => handleWorkoutPress(item.id)}
                activeOpacity={0.7}
            >
                <View style={styles.workoutContent}>
                    <ThemedText type="subtitle" style={styles.workoutName}>
                        {item.name}
                    </ThemedText>

                    {item.description ? (
                        <ThemedText style={styles.workoutDescription} numberOfLines={2}>
                            {item.description}
                        </ThemedText>
                    ) : null}

                    <View style={styles.workoutMetadata}>
                        <View style={styles.metadataItem}>
                            <IconSymbol name="dumbbell.fill" size={16} color={colors.text} />
                            <ThemedText style={styles.metadataText}>{exerciseCount} exercises</ThemedText>
                        </View>

                        <View style={styles.metadataItem}>
                            <IconSymbol name="calendar" size={16} color={colors.text} />
                            <ThemedText style={styles.metadataText}>
                                {new Date(item.updatedAt).toLocaleDateString('en-US')}
                            </ThemedText>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: '#ffeeee' }]}
                    onPress={() => confirmDeleteWorkout(item.id, item.name)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <IconSymbol name="trash" size={18} color="#ff3b30" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        My Workouts
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>Manage your personal workout programs</ThemedText>
                </View>

                {workouts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <IconSymbol name="list.clipboard" size={64} color={colors.text} style={{ opacity: 0.5 }} />
                        <ThemedText style={styles.emptyText}>You don't have any workout lists yet</ThemedText>
                        <ThemedText style={[styles.emptySubtext, { marginBottom: 20 }]}>
                            Click the button below to create your first workout list
                        </ThemedText>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.primary }]}
                            onPress={() => setModalVisible(true)}
                        >
                            <IconSymbol name="plus" size={20} color="white" />
                            <ThemedText style={styles.addButtonText}>Create Workout List</ThemedText>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={workouts}
                            keyExtractor={(item) => item.id}
                            renderItem={renderWorkoutItem}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />

                        <TouchableOpacity
                            style={[styles.floatingButton, { backgroundColor: colors.primary }]}
                            onPress={() => setModalVisible(true)}
                        >
                            <IconSymbol name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </>
                )}

                {/* Add Workout Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
                            <View style={styles.modalHeader}>
                                <ThemedText type="subtitle" style={styles.modalTitle}>
                                    Create New Workout
                                </ThemedText>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.closeButton}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <IconSymbol name="xmark" size={22} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalBody}>
                                <ThemedText style={styles.inputLabel}>Workout Name *</ThemedText>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            color: colors.text,
                                            borderColor:
                                                colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                        },
                                    ]}
                                    placeholder="E.g., Upper Body Workout"
                                    placeholderTextColor={colors.text + '60'}
                                    value={workoutName}
                                    onChangeText={setWorkoutName}
                                />

                                <ThemedText style={styles.inputLabel}>Description (Optional)</ThemedText>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.textArea,
                                        {
                                            color: colors.text,
                                            borderColor:
                                                colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                        },
                                    ]}
                                    placeholder="A brief description about the workout"
                                    placeholderTextColor={colors.text + '60'}
                                    value={workoutDescription}
                                    onChangeText={setWorkoutDescription}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />

                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: colors.primary }]}
                                    onPress={handleAddWorkout}
                                >
                                    <ThemedText style={styles.modalButtonText}>Create Workout</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 16,
        marginBottom: 24,
        paddingTop: 8,
    },
    title: {
        fontSize: 28,
        marginBottom: 6,
        fontWeight: 'bold',
    },
    subtitle: {
        opacity: 0.7,
        textAlign: 'left',
        fontSize: 15,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    workoutCard: {
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    workoutContent: {
        flex: 1,
        paddingRight: 8,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    workoutDescription: {
        opacity: 0.7,
        marginBottom: 12,
        fontSize: 14,
        lineHeight: 20,
    },
    workoutMetadata: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 4,
    },
    metadataText: {
        marginLeft: 6,
        fontSize: 13,
        opacity: 0.7,
    },
    deleteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    emptySubtext: {
        opacity: 0.7,
        textAlign: 'center',
        marginTop: 8,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        textAlign: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        padding: 20,
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
    modalButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
