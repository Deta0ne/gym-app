import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Exercise } from '@/constants/ExerciseData';

interface AddExerciseModalProps {
    visible: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredExercises: Exercise[];
    onClose: () => void;
    onAddExercise: (exerciseId: string) => void;
}

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
    visible,
    searchQuery,
    setSearchQuery,
    filteredExercises,
    onClose,
    onAddExercise,
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
                    <View style={styles.modalHeader}>
                        <ThemedText type="subtitle">Egzersiz Ekle</ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <IconSymbol name="xmark" size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <IconSymbol name="magnifyingglass" size={18} color={colors.text} style={styles.searchIcon} />
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
                            <TouchableOpacity style={styles.exerciseListItem} onPress={() => onAddExercise(item.id)}>
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
});
