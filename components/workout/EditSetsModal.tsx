import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { WorkoutExercise, WorkoutSet } from '@/context/WorkoutContext';
import { EXERCISES } from '@/constants/ExerciseData';

interface EditSetsModalProps {
    visible: boolean;
    selectedExercise: WorkoutExercise | null;
    sets: WorkoutSet[];
    onClose: () => void;
    onSave: () => void;
    addSet: () => void;
    removeSet: (index: number) => void;
    updateSet: (index: number, field: keyof WorkoutSet, value: number) => void;
}

export const EditSetsModal: React.FC<EditSetsModalProps> = ({
    visible,
    selectedExercise,
    sets,
    onClose,
    onSave,
    addSet,
    removeSet,
    updateSet,
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
                    <View style={styles.modalHeader}>
                        <ThemedText type="subtitle">Setleri Düzenle</ThemedText>
                        <TouchableOpacity onPress={onClose}>
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
                                    Her set için tekrar sayısı ve ağırlık bilgilerini aşağıda düzenleyebilirsiniz.
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
                                            style={[styles.setFieldInput, { color: colors.text, borderColor: '#ccc' }]}
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
                                            style={[styles.setFieldInput, { color: colors.text, borderColor: '#ccc' }]}
                                            value={set.weight?.toString() || ''}
                                            onChangeText={(value) => updateSet(index, 'weight', parseInt(value) || 0)}
                                            keyboardType="number-pad"
                                            placeholder="Opsiyonel"
                                            placeholderTextColor={colors.text + '80'}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => removeSet(index)} style={styles.removeSetButton}>
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
                            onPress={onSave}
                        >
                            <ThemedText style={styles.saveButtonText}>Kaydet</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    setsEditorContainer: {
        padding: 16,
        maxHeight: 400,
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
});
