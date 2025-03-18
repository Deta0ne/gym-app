import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = 'gym_app_favorites';

// Get favorite exercises
export const getFavorites = async (): Promise<string[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

// Check if exercise is favorite
export const isFavorite = async (exerciseId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.includes(exerciseId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Toggle favorite (add/remove)
export const toggleFavorite = async (exerciseId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const isFav = favorites.includes(exerciseId);
    
    let newFavorites;
    if (isFav) {
      // Remove from favorites
      newFavorites = favorites.filter(id => id !== exerciseId);
    } else {
      // Add to favorites
      newFavorites = [...favorites, exerciseId];
    }
    
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    return !isFav; // Return new status
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}; 