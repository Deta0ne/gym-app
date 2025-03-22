import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ExerciseItem } from './ExerciseItem';
import { WorkoutExercise } from '@/context/WorkoutContext';
import { Exercise } from '@/constants/ExerciseData';

interface ExerciseListProps {
    workoutExercisesWithData: (WorkoutExercise & { exerciseData?: Exercise })[];
    openActionMenuId: string | null;
    toggleActionMenu: (exerciseId: string) => void;
    navigateToExerciseDetail: (exerciseId: string) => void;
    handleEditSets: (workoutExercise: WorkoutExercise) => void;
    confirmRemoveExercise: (exercise: Exercise) => void;
    setAddExerciseModalVisible: (visible: boolean) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
    workoutExercisesWithData,
    openActionMenuId,
    toggleActionMenu,
    navigateToExerciseDetail,
    handleEditSets,
    confirmRemoveExercise,
    setAddExerciseModalVisible,
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
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
                    <IconSymbol name="dumbbell.fill" size={48} color={colors.text} style={{ opacity: 0.3 }} />
                    <ThemedText style={styles.emptyExercisesText}>
                        Bu antrenman listesine henüz egzersiz eklenmemiş
                    </ThemedText>
                    <ThemedText style={styles.emptyExercisesSubtext}>
                        "Egzersiz Ekle" butonuna tıklayarak antrenman programınızı oluşturmaya başlayın
                    </ThemedText>
                </View>
            ) : (
                workoutExercisesWithData.map((workoutExercise, index) => (
                    <ExerciseItem
                        key={workoutExercise.exerciseId}
                        index={index}
                        workoutExercise={workoutExercise}
                        toggleActionMenu={toggleActionMenu}
                        openActionMenuId={openActionMenuId}
                        navigateToExerciseDetail={navigateToExerciseDetail}
                        handleEditSets={handleEditSets}
                        confirmRemoveExercise={confirmRemoveExercise}
                    />
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
});
