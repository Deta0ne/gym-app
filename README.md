# GymApp - Fitness Exercise Tracker

A mobile fitness application built with React Native and Expo that helps users track their workouts and exercise routines.

## Features

-   **Exercise Library**: Browse through a comprehensive collection of exercises categorized by muscle groups.
-   **Workout Management**: Create, edit, and save personalized workout routines.
-   **Exercise Details**: View detailed information, proper form instructions, and visual guidance for each exercise.
-   **Favorites System**: Mark your favorite exercises for quick access.
-   **Multi-language Support**: Currently available in Turkish, with plans for additional languages.

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Expo Go app (for mobile testing)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd gym-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npx expo start
    ```

4. Run on a device:
    - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
    - Connect your device via USB and run:
        ```bash
        adb reverse tcp:8081 tcp:8081
        npx expo start --localhost
        ```
    - Open Expo Go on your device and select the project

## Project Structure

-   `app/` - Main application screens and navigation
-   `components/` - Reusable UI components
-   `constants/` - Application constants and exercise data
-   `context/` - React context providers including WorkoutContext
-   `utils/` - Utility functions
-   `assets/` - Images, icons, and other static assets

## Technologies Used

-   React Native
-   Expo Router
-   AsyncStorage for local data persistence
-   React Navigation

## Upcoming Features

-   Exercise progress tracking
-   Custom exercise creation
-   Workout scheduling and reminders
-   Performance statistics and charts
-   English language support

## License

This project is licensed under the MIT License.
