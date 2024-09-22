const getGameImage = (imageNumber: number) => {
  switch (imageNumber) {
    case 1:
      return require('@/assets/icons/3d-coffee.png');
    case 2:
      return require('@/assets/icons/3d-food.png');
    case 3:
      return require('@/assets/icons/3d-store.png');
    case 4:
      return require('@/assets/icons/3d-drink.png');
    case 8:
      return require('@/assets/icons/3d-taxi.png');
  }
};

export default getGameImage;
