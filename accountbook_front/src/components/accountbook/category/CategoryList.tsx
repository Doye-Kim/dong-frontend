import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import CategoryItem from './CategoryItem';
import {ResponseCategory} from '@/api/category';
import useCategoryStore from '@/store/useCategoryStore';

const CategoryList = () => {
  const categories = useCategoryStore(state => state.categories);
  const [data, setData] = useState<ResponseCategory[]>([]);

  useEffect(() => {
    setData([
      ...categories,
      {
        categoryId: -1,
        name: '추가',
        categoryType: 'ADD',
        imageNumber: -1,
      },
    ]);
  }, [categories]); // categories가 변경될 때마다 data 업데이트

  const renderItem = ({item}: {item: ResponseCategory}) => (
    <CategoryItem item={item} />
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

export default CategoryList;
