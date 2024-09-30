import {CategoryCheckEmptyIcon, CategoryCheckFillIcon} from '@/assets/icons';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CategoryItemProps {
  name: string;
  categoryId: number;
  isChecked: boolean;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, categoryId, isChecked, onPress }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        {isChecked ? <CategoryCheckFillIcon /> : <CategoryCheckEmptyIcon />}
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default CategoryItem;
