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

export const gifMapping = {
    'benchGif.gif': require('@/assets/images/benchGif.gif'),
    'squatGif.gif': require('@/assets/images/squatGif.gif'),
  'PlankImage.jpeg': require('@/assets/images/PlankImage.jpeg'),
  'pullUpGif.gif': require('@/assets/images/pullUpGif.gif'),
    'deadliftGif.gif': require('@/assets/images/deadliftGif.gif'),
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