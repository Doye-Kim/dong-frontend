import {ResponseCategory} from '@/api/category';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import useGameCreateStore from '@/store/useGameCreateStore';
import {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CategoryItem = ({
  item,
  selectedCategories,
  setSelectedCategories,
}: {
  item: ResponseCategory;
  selectedCategories: number[];
  setSelectedCategories: (selectedCategories: number[]) => void;
}) => {
  const [checked, setChecked] = useState(
    selectedCategories.includes(item.categoryId),
  );

  const handleOnPress = () => {
    setChecked(prevChecked => {
      if (!prevChecked) {
        setSelectedCategories([...selectedCategories, item.categoryId]);
      } else {
        setSelectedCategories(
          selectedCategories.filter(id => id !== item.categoryId),
        );
      }
      return !prevChecked;
    });
  };

  return (
    <TouchableOpacity
      key={item.categoryId}
      style={[
        styles.categoryContainer,
        checked && {backgroundColor: colors.ORANGE_200},
      ]}
      onPress={handleOnPress}>
      <CategoryIcon categoryNumber={item.imageNumber} size={40} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    padding: 10,
  },
  categoryName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
    marginHorizontal: 15,
  },
});
export default CategoryItem;
