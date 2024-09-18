import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';

interface IconListProps {
  onPress: (iconId: number) => void;
}
const data = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

const IconList = ({onPress}: IconListProps) => {
  const renderItem = ({item}: {item: number}) => (
    <TouchableOpacity style={{margin: 4}} onPress={() => onPress(item)}>
      <CategoryIcon categoryNumber={item} size={30} />
    </TouchableOpacity>
  );
  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>아이콘 선택</Text>
    </View>
  );
  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
      numColumns={7}
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  header: {},
  headerText: {
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_500,
    fontSize: 15,
  },
  flatListContainer: {
    flex: 1,
  },
});

export default IconList;
