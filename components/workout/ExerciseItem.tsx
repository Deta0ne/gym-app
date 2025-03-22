import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { WorkoutExercise, WorkoutSet } from '@/context/WorkoutContext';
import { Exercise } from '@/constants/ExerciseData';
import { MaterialIcons } from '@expo/vector-icons';
import { getImageSource } from '@/utils/imageUtils';

interface ExerciseItemProps {
    index: number;
    workoutExercise: WorkoutExercise & { exerciseData?: Exercise };
    toggleActionMenu: (exerciseId: string) => void;
    openActionMenuId: string | null;
    navigateToExerciseDetail: (exerciseId: string) => void;
    handleEditSets: (workoutExercise: WorkoutExercise) => void;
    confirmRemoveExercise: (exercise: Exercise) => void;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
    index,
    workoutExercise,
    toggleActionMenu,
    openActionMenuId,
    navigateToExerciseDetail,
    handleEditSets,
    confirmRemoveExercise,
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    if (!workoutExercise.exerciseData) return null;

    const hasSets = workoutExercise.sets.length > 0;
    const exerciseData = workoutExercise.exerciseData;
    const imageSource = getImageSource(exerciseData.imageUrl);

    return (
        <View
            style={[
                styles.exerciseItem,
                {
                    backgroundColor: colors.cardBackground,
                    borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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
                        <Image source={imageSource} style={styles.exerciseImage} resizeMode="cover" />
                    ) : (
                        <View style={[styles.noImageContainer, { backgroundColor: colors.primary + '20' }]}>
                            <IconSymbol name="dumbbell.fill" size={24} color={colors.primary} />
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
                        <View style={[styles.exerciseTag, { backgroundColor: colors.primary + '20' }]}>
                            <ThemedText style={[styles.exerciseTagText, { color: colors.primary }]}>
                                {exerciseData.category}
                            </ThemedText>
                        </View>

                        <View style={[styles.exerciseTag, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                            <ThemedText style={styles.exerciseTagText}>{exerciseData.difficulty}</ThemedText>
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
                            borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.actionMenuItem}
                        onPress={() => {
                            handleEditSets(workoutExercise);
                            toggleActionMenu(exerciseData.id);
                        }}
                    >
                        <IconSymbol name="pencil" size={16} color={colors.primary} />
                        <ThemedText style={styles.actionMenuItemText}>Setleri Düzenle</ThemedText>
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.actionMenuDivider,
                            {
                                backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            },
                        ]}
                    />

                    <TouchableOpacity
                        style={styles.actionMenuItem}
                        onPress={() => {
                            confirmRemoveExercise(exerciseData);
                            toggleActionMenu(exerciseData.id);
                        }}
                    >
                        <IconSymbol name="trash" size={16} color="#ff3b30" />
                        <ThemedText style={[styles.actionMenuItemText, { color: '#ff3b30' }]}>
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
                        backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                ]}
            >
                {!hasSets ? (
                    <TouchableOpacity
                        style={[styles.addSetWarning, { borderColor: colors.primary }]}
                        onPress={() => handleEditSets(workoutExercise)}
                    >
                        <IconSymbol name="exclamationmark.triangle" size={16} color={colors.primary} />
                        <ThemedText style={[styles.addSetWarningText, { color: colors.primary }]}>
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
                                        colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                },
                            ]}
                        >
                            <ThemedText style={[styles.setHeaderText, { flex: 0.3 }]}>Set</ThemedText>
                            <ThemedText style={[styles.setHeaderText, { flex: 0.4 }]}>Reps</ThemedText>
                            <ThemedText style={[styles.setHeaderText, { flex: 0.3 }]}>Weight</ThemedText>
                        </View>

                        {workoutExercise.sets.map((set, setIndex) => (
                            <View
                                key={setIndex}
                                style={[
                                    styles.setRow,
                                    {
                                        borderBottomColor:
                                            colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                    },
                                ]}
                            >
                                <ThemedText style={[styles.setText, { flex: 0.3 }]}>{setIndex + 1}</ThemedText>
                                <ThemedText style={[styles.setText, { flex: 0.4 }]}>{set.repetitions} x</ThemedText>
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
};

const styles = StyleSheet.create({
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
