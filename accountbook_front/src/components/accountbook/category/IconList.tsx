import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';

interface IconListProps {
  onPress: (iconId: number) => void;
}
const data = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

const IconList = ({onPress}: IconListProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const renderItem = ({item}: {item: number}) => (
    <TouchableOpacity style={{margin: 4}} onPress={() => onPress(item)}>
      <CategoryIcon categoryNumber={item} size={40} />
    </TouchableOpacity>
  );
  return (
    <View>
      <Text style={styles.headerText}>아이콘 선택</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        numColumns={6}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    header: {
      marginBottom: 5,
    },
    headerText: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].GRAY_500,
      fontSize: 15,
      marginBottom: 5,
    },
    flatListContainer: {
      // flexGrow: 1,
    },
  });

export default IconList;
