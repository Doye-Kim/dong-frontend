import {CategoryCheckEmptyIcon, CategoryCheckFillIcon} from '@/assets/icons';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CategoryItem = ({
  name,
  categoryId,
  setHideList,
}: {
  name: string;
  categoryId: number;
  setHideList: (hideList: number[]) => void;
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const onPress = () => {
    // console.log('onPress', isChecked);
    setIsChecked(prev => !prev);
  };

  useEffect(() => {
    // console.log('useEffect', isChecked);
    if (isChecked) setHideList(prev => [...prev, categoryId]);
    else setHideList(prev => prev.filter(id => id !== categoryId));
  }, [isChecked]);
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
