import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  data: object;
}

const CategoryList = ({data}: CategoryListProps) => {
  const renderItem = ({item}: {object}) => <CategoryItem item={item} />;

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
