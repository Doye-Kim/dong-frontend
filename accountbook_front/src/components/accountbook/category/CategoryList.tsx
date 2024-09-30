import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ResponseCategory} from '@/api/category';
import useCategoryStore from '@/store/useCategoryStore';

type CategoryListProps = {
  onCategorySelect?: (categoryId: number, categoryName: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({onCategorySelect}) => {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const [data, setData] = useState<ResponseCategory[]>([]);

  useEffect(() => {
    if(categories.length === 0) {
      fetchCategories();
    }
    setData([
      ...categories,
      {
        categoryId: -1,
        name: '추가',
        categoryType: 'ADD',
        imageNumber: -1,
      },
    ]);
  }, [categories]);

  const handleCategoryPress = (item: ResponseCategory) => {
    if (item.categoryId !== -1 && onCategorySelect !== undefined) {
      onCategorySelect(item.categoryId, item.name);
    }
  };

  const renderItem = ({item}: {item: ResponseCategory}) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      style={styles.categoryItem}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.categoryId.toString()}
      numColumns={4}
      style={{height: '100%'}}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

export default CategoryList;
