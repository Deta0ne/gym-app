import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Workout } from '@/context/WorkoutContext';

interface WorkoutHeaderProps {
    workout: Workout;
    editingName: boolean;
    workoutName: string;
    workoutDescription: string;
    setEditingName: (editing: boolean) => void;
    setWorkoutName: (name: string) => void;
    setWorkoutDescription: (description: string) => void;
    handleSaveWorkoutDetails: () => void;
}

export const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
    workout,
    editingName,
    workoutName,
    workoutDescription,
    setEditingName,
    setWorkoutName,
    setWorkoutDescription,
    handleSaveWorkoutDetails,
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
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
    );
};

const styles = StyleSheet.create({
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
    actionButton: {
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: 36,
        height: 36,
    },
});
