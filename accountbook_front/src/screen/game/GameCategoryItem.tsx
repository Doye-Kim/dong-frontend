import {ResponseCategory} from '@/api/category';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {useState} from 'react';
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
  const {theme} = useThemeStore();
  const styles = styling(theme);
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
        checked && {backgroundColor: colors[theme].ORANGE_200},
      ]}
      onPress={handleOnPress}>
      <CategoryIcon categoryNumber={item.imageNumber} size={40} />
      <Text
        style={[
          styles.categoryName,
          checked && {color: colors['light'].BLACK},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
      marginHorizontal: 15,
    },
  });
export default CategoryItem;
