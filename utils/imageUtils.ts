// Let's define image sources statically
export const imageMapping = {
  'benchPressImage.png.jpeg': require('@/assets/images/benchPressImage.png.jpeg'),
  'squatImage.jpeg': require('@/assets/images/squatImage.jpeg'),
  'PlankImage.jpeg': require('@/assets/images/PlankImage.jpeg'),
  'pullUpImage.jpeg': require('@/assets/images/pullUpImage.jpeg'),
  'deadliftImage.jpeg': require('@/assets/images/deadliftImage.jpeg'),
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