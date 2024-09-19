import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  data: [];
}

interface CategoryItemProps {
  item: {
    category_id: number;
    category_name: string;
    image_number: number;
    default: boolean;
  };
}

const CategoryList = ({data}: CategoryListProps) => {
  const renderItem = ({item}: CategoryItemProps) => (
    <CategoryItem item={item} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.category_id.toString()}
      numColumns={4}
    />
  );
};

export default CategoryList;
