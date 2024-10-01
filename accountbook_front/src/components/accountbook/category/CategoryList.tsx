import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ResponseCategory} from '@/api/category';
import useCategoryStore from '@/store/useCategoryStore';
import CategoryItem from './CategoryItem';

type CategoryListProps = {
  onCategorySelect?: (categoryId: number, categoryName: string) => void;
  renderAddButton?: boolean;
};

const CategoryList: React.FC<CategoryListProps> = ({
  onCategorySelect,
  renderAddButton = true,
}) => {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const [data, setData] = useState<ResponseCategory[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    setData(
      renderAddButton
        ? [
            ...categories,
            {
              categoryId: -1,
              name: '추가',
              categoryType: 'ADD',
              imageNumber: -1,
            },
          ]
        : [...categories],
    );
  }, [categories]);

  const renderItem = ({item}: {item: ResponseCategory}) => (
    <CategoryItem item={item} onCategorySelect={onCategorySelect} />
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
