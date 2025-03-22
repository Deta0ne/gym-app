import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/constants/ExerciseData';

const WORKOUTS_STORAGE_KEY = 'gym_app_workouts';

// Type for an exercise within a workout
export interface WorkoutExercise {
    exerciseId: string;
    sets: WorkoutSet[];
}

// Type definition for set information
export interface WorkoutSet {
    repetitions: number; // Number of repetitions
    weight?: number; // Weight (optional)
    duration?: number; // Duration (in seconds, optional)
    restTime?: number; // Rest time (in seconds, optional)
}

// Type definition for a workout list
export interface Workout {
    id: string;
    name: string;
    description?: string;
    exercises: WorkoutExercise[];
    createdAt: number; // Creation time (timestamp)
    updatedAt: number; // Last update time (timestamp)
}

interface WorkoutContextType {
    workouts: Workout[];
    getWorkout: (workoutId: string) => Workout | undefined;
    addWorkout: (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Workout>;
    updateWorkout: (workout: Workout) => Promise<boolean>;
    deleteWorkout: (workoutId: string) => Promise<boolean>;
    addExerciseToWorkout: (workoutId: string, exerciseId: string) => Promise<boolean>;
    removeExerciseFromWorkout: (workoutId: string, exerciseId: string) => Promise<boolean>;
    updateExerciseSets: (workoutId: string, exerciseId: string, sets: WorkoutSet[]) => Promise<boolean>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function useWorkouts() {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
}

interface WorkoutProviderProps {
    children: ReactNode;
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isInitializing, setIsInitializing] = useState(true);

    // Load workouts from storage
    const loadWorkouts = async () => {
        try {
            const workoutsJson = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
            const storedWorkouts = workoutsJson ? JSON.parse(workoutsJson) : [];
            setWorkouts(storedWorkouts);
        } catch (error) {
            console.error('Error loading workouts:', error);
        } finally {
            setIsInitializing(false);
        }
    };

    // Save workouts to storage
    const saveWorkouts = async (newWorkouts: Workout[]) => {
        try {
            await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(newWorkouts));
        } catch (error) {
            console.error('Error saving workouts:', error);
        }
    };

    // Load workouts on initial mount
    useEffect(() => {
        loadWorkouts();
    }, []);

    // Get a specific workout by ID
    const getWorkout = (workoutId: string) => {
        return workouts.find((workout) => workout.id === workoutId);
    };

    // Add a new workout
    const addWorkout = async (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const now = Date.now();
            const newWorkout: Workout = {
                ...workout,
                id: `workout_${now}_${Math.random().toString(36).substr(2, 9)}`,
                createdAt: now,
                updatedAt: now,
            };

            const newWorkouts = [...workouts, newWorkout];
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return newWorkout;
        } catch (error) {
            console.error('Error adding workout:', error);
            throw error;
        }
    };

    // Update an existing workout
    const updateWorkout = async (workout: Workout) => {
        try {
            const updatedWorkout = {
                ...workout,
                updatedAt: Date.now(),
            };

            const newWorkouts = workouts.map((w) => (w.id === workout.id ? updatedWorkout : w));
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return true;
        } catch (error) {
            console.error('Error updating workout:', error);
            return false;
        }
    };

    // Delete a workout
    const deleteWorkout = async (workoutId: string) => {
        try {
            const newWorkouts = workouts.filter((workout) => workout.id !== workoutId);
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return true;
        } catch (error) {
            console.error('Error deleting workout:', error);
            return false;
        }
    };

    // Add an exercise to a workout
    const addExerciseToWorkout = async (workoutId: string, exerciseId: string) => {
        try {
            const workout = getWorkout(workoutId);
            if (!workout) return false;

            // Check if exercise already exists in the workout
            const exerciseExists = workout.exercises.some((e) => e.exerciseId === exerciseId);
            if (exerciseExists) return true;

            const updatedWorkout = {
                ...workout,
                exercises: [
                    ...workout.exercises,
                    {
                        exerciseId,
                        sets: [], // Start with empty set list, user will add their own
                    },
                ],
                updatedAt: Date.now(),
            };

            const newWorkouts = workouts.map((w) => (w.id === workoutId ? updatedWorkout : w));
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return true;
        } catch (error) {
            console.error('Error adding exercise to workout:', error);
            return false;
        }
    };

    // Remove an exercise from a workout
    const removeExerciseFromWorkout = async (workoutId: string, exerciseId: string) => {
        try {
            const workout = getWorkout(workoutId);
            if (!workout) return false;

            const updatedWorkout = {
                ...workout,
                exercises: workout.exercises.filter((e) => e.exerciseId !== exerciseId),
                updatedAt: Date.now(),
            };

            const newWorkouts = workouts.map((w) => (w.id === workoutId ? updatedWorkout : w));
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return true;
        } catch (error) {
            console.error('Error removing exercise from workout:', error);
            return false;
        }
    };

    // Update sets for an exercise in a workout
    const updateExerciseSets = async (workoutId: string, exerciseId: string, sets: WorkoutSet[]) => {
        try {
            const workout = getWorkout(workoutId);
            if (!workout) return false;

            const updatedWorkout = {
                ...workout,
                exercises: workout.exercises.map((e) => {
                    if (e.exerciseId === exerciseId) {
                        return {
                            ...e,
                            sets,
                        };
                    }
                    return e;
                }),
                updatedAt: Date.now(),
            };

            const newWorkouts = workouts.map((w) => (w.id === workoutId ? updatedWorkout : w));
            setWorkouts(newWorkouts);
            await saveWorkouts(newWorkouts);
            return true;
        } catch (error) {
            console.error('Error updating exercise sets:', error);
            return false;
        }
    };

    const value = {
        workouts,
        getWorkout,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
        updateExerciseSets,
    };

    return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}
