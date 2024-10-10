import {CategoryCheckEmptyIcon, CategoryCheckFillIcon} from '@/assets/icons';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CategoryItemProps {
  name: string;
  categoryId: number;
  isChecked: boolean;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  isChecked,
  onPress,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        {isChecked ? <CategoryCheckFillIcon /> : <CategoryCheckEmptyIcon />}
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    text: {
      color: colors[theme].BLACK,
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      marginHorizontal: 10,
    },
  });

export default CategoryItem;
