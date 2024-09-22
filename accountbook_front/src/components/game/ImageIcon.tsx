import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

const imageKeys = [1, 2, 3, 4, 8];
const images: Record<number, any> = {
  1: require('@/assets/icons/3d-coffee.png'),
  2: require('@/assets/icons/3d-food.png'),
  3: require('@/assets/icons/3d-store.png'),
  4: require('@/assets/icons/3d-drink.png'),
  8: require('@/assets/icons/3d-taxi.png'),
};

const ImageIcon = ({imageNumber}: {imageNumber: number}) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [rotatingImageIndex, setRotatingImageIndex] = useState(1);

  useEffect(() => {
    let intervalId: number | null = null;

    if (imageNumber === null || imageNumber === 0) {
      intervalId = setInterval(() => {
        setRotatingImageIndex(prevIndex => (prevIndex + 1) % imageKeys.length);
      }, 200);
    } else {
      setCurrentImage(imageNumber);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [imageNumber]);

  const imageSource =
    currentImage !== null
      ? images[currentImage]
      : images[imageKeys[rotatingImageIndex]];

  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageIcon;
