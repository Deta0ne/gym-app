export const imageMapping = {
  'benchPressImage.png.jpeg': require('@/assets/images/benchPressImage.png.jpeg'),
  'squatImage.jpeg': require('@/assets/images/squatImage.jpeg'),
  'PlankImage.jpeg': require('@/assets/images/PlankImage.jpeg'),
  'pullUpImage.jpeg': require('@/assets/images/pullUpImage.jpeg'),
  'deadliftImage.jpeg': require('@/assets/images/deadliftImage.jpeg'),
  'Push Up.webp': require('@/assets/images/Push Up.webp'),
  'Dumbbell Shoulder Press.jpeg': require('@/assets/images/Dumbbell Shoulder Press.jpeg'),
  'Dumbbell Bicep Curl.jpeg': require('@/assets/images/Dumbbell Bicep Curl.jpeg'),
  'Russian Twist.jpeg': require('@/assets/images/Russian Twist.jpeg'),
  'Dumbbell Lunges.jpeg': require('@/assets/images/Dumbbell Lunges.jpeg'),
  'Lat Pulldown.jpeg': require('@/assets/images/Lat Pulldown.jpeg'),
  'Cable Tricep Pushdown.jpeg': require('@/assets/images/Cable Tricep Pushdown.jpeg'),
  'Leg Press.jpeg': require('@/assets/images/Leg Press.jpeg'),
  'Mountain Climbers.jpeg': require('@/assets/images/Mountain Climbers.jpeg'),
  'Dumbbell Row.jpg': require('@/assets/images/Dumbbell Row.jpg'),
  'Jumping Jacks.jpeg': require('@/assets/images/Jumping Jacks.jpeg'),
  'Burpees.jpeg': require('@/assets/images/Burpees.jpeg'),
  'High Knees.jpeg': require('@/assets/images/High Knees.jpeg'),
  'Butterfly Stretch.webp': require('@/assets/images/Butterfly Stretch.webp'),
  'Child\'s Pose.jpeg': require('@/assets/images/Child\'s Pose.jpeg'),
  'Single Leg Balance.jpeg': require('@/assets/images/Single Leg Balance.jpeg'),
  'Yoga Tree Pose.jpeg': require('@/assets/images/Yoga Tree Pose.jpeg'),
  'Bosu Ball Squat.jpeg': require('@/assets/images/Bosu Ball Squat.jpeg'),
  'Jumping Rope.jpeg': require('@/assets/images/Jumping Rope.jpeg'),
  'Crunches.jpeg': require('@/assets/images/Crunches.jpeg'),
  'Leg Raises.jpeg': require('@/assets/images/Leg Raises.jpeg'),
  'Bicycle Crunches.jpeg': require('@/assets/images/Bicycle Crunches.jpeg'),
  'Hanging Leg Raise.png': require('@/assets/images/Hanging Leg Raise.png'),
  'Flutter Kicks.jpeg': require('@/assets/images/Flutter Kicks.jpeg')
};

/**
 * Get image source
 * @param imageUrl Image URL or file name
 * @returns Image source
 */
export const getImageSource = (imageUrl: string) => {
  if (imageUrl.startsWith('http')) {
    return { uri: imageUrl };
  } else if (imageMapping[imageUrl as keyof typeof imageMapping]) {
    return imageMapping[imageUrl as keyof typeof imageMapping];
  } else {
    return null;
  }
}; 

export const gifMapping = {
    'benchGif.gif': require('@/assets/images/benchGif.gif'),
    'squatGif.gif': require('@/assets/images/squatGif.gif'),
  'PlankImage.jpeg': require('@/assets/images/PlankImage.jpeg'),
  'pullUpGif.gif': require('@/assets/images/pullUpGif.gif'),
    'deadliftGif.gif': require('@/assets/images/deadliftGif.gif'),
    'Push Up.webp': require('@/assets/images/Push Up.webp'),
    'Dumbbell Shoulder Press.jpeg': require('@/assets/images/Dumbbell Shoulder Press.jpeg'),
    'Dumbbell Bicep Curl.jpeg': require('@/assets/images/Dumbbell Bicep Curl.jpeg'),
    'Russian Twist.jpeg': require('@/assets/images/Russian Twist.jpeg'),
    'Dumbbell Lunges.jpeg': require('@/assets/images/Dumbbell Lunges.jpeg'),
    'Lat Pulldown.jpeg': require('@/assets/images/Lat Pulldown.jpeg'),
    'Cable Tricep Pushdown.jpeg': require('@/assets/images/Cable Tricep Pushdown.jpeg'),
    'Leg Press.jpeg': require('@/assets/images/Leg Press.jpeg'),
    'Mountain Climbers.jpeg': require('@/assets/images/Mountain Climbers.jpeg'),
    'Dumbbell Row.jpg': require('@/assets/images/Dumbbell Row.jpg'),
    'Jumping Jacks.jpeg': require('@/assets/images/Jumping Jacks.jpeg'),
    'Burpees.jpeg': require('@/assets/images/Burpees.jpeg'),
    'High Knees.jpeg': require('@/assets/images/High Knees.jpeg'),
    'Butterfly Stretch.webp': require('@/assets/images/Butterfly Stretch.webp'),
    'Child\'s Pose.jpeg': require('@/assets/images/Child\'s Pose.jpeg'),
    'Single Leg Balance.jpeg': require('@/assets/images/Single Leg Balance.jpeg'),
    'Yoga Tree Pose.jpeg': require('@/assets/images/Yoga Tree Pose.jpeg'),
    'Bosu Ball Squat.jpeg': require('@/assets/images/Bosu Ball Squat.jpeg'),
    'Jumping Rope.jpeg': require('@/assets/images/Jumping Rope.jpeg'),
    'Crunches.jpeg': require('@/assets/images/Crunches.jpeg'),
    'Leg Raises.jpeg': require('@/assets/images/Leg Raises.jpeg'),
    'Bicycle Crunches.jpeg': require('@/assets/images/Bicycle Crunches.jpeg'),
    'Hanging Leg Raise.png': require('@/assets/images/Hanging Leg Raise.png'),
    'Flutter Kicks.jpeg': require('@/assets/images/Flutter Kicks.jpeg')
};
  
  /**
   * Get image source
   * @param imageUrl Image URL or file name
   * @returns Image source
   */
  export const getGifSource = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) {
      return { uri: imageUrl };
    } else if (gifMapping[imageUrl as keyof typeof gifMapping]) {
      return gifMapping[imageUrl as keyof typeof gifMapping];
    } else {
      return null;
    }
  }; 