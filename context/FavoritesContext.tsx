import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = 'gym_app_favorites';

interface FavoritesContextType {
    favorites: string[];
    isFavorite: (exerciseId: string) => boolean;
    toggleFavorite: (exerciseId: string) => Promise<boolean>;
    refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isInitializing, setIsInitializing] = useState(true);

    // Load favorites from storage
    const loadFavorites = async () => {
        try {
            const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            const storedFavorites = favoritesJson ? JSON.parse(favoritesJson) : [];
            setFavorites(storedFavorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsInitializing(false);
        }
    };

    // Save favorites to storage
    const saveFavorites = async (newFavorites: string[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    // Load favorites on initial mount
    useEffect(() => {
        loadFavorites();
    }, []);

    // Check if an exercise is favorited
    const isFavorite = (exerciseId: string) => {
        return favorites.includes(exerciseId);
    };

    // Toggle favorite status
    const toggleFavorite = async (exerciseId: string) => {
        try {
            // First update UI (optimistic update)
            let newFavorites: string[];

            if (isFavorite(exerciseId)) {
                // Remove from favorites
                newFavorites = favorites.filter((id) => id !== exerciseId);
            } else {
                // Add to favorites
                newFavorites = [...favorites, exerciseId];
            }

            // Immediately update state (user sees feedback immediately)
            setFavorites(newFavorites);

            // Then save asynchronously
            await saveFavorites(newFavorites);

            return true;
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // If error, revert to original list
            await loadFavorites();
            return false;
        }
    };

    // Refresh favorites from storage
    const refreshFavorites = async () => {
        await loadFavorites();
    };

    const value = {
        favorites,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
    };

    // If initialization is complete, return the provider
    if (isInitializing) {
        return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
