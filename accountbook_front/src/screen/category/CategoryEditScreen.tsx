import CategoryList from '@/components/accountbook/category/CategoryList';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

const data = {
  size: '10',
  categories: [
    {category_id: 0, category_name: '식비', image_number: 0, default: true},
    {category_id: 1, category_name: '카페', image_number: 1, default: true},
    {category_id: 2, category_name: '배달음식', image_number: 2, default: true},
    {category_id: 3, category_name: '편의점', image_number: 3, default: false},
    {category_id: 4, category_name: '술/유흥', image_number: 4, default: false},
    {category_id: 5, category_name: '생활', image_number: 5, default: true},
    {
      category_id: 6,
      category_name: '패션/미용',
      image_number: 6,
      default: false,
    },
    {
      category_id: 7,
      category_name: '대중교통',
      image_number: 7,
      default: false,
    },
    {
      category_id: 8,
      category_name: '택시',
      image_number: 8,
      default: false,
    },
    {category_id: 9, category_name: '자동차', image_number: 9, default: true},
    {category_id: -1, category_name: '추가', image_number: -1, default: false},
  ],
};

const CategoryEditScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <CategoryList data={data.categories} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 50,
    alignItems: 'center',
  },
  scroll: {
    height: Dimensions.get('screen').height - 100,
  },
});
export default CategoryEditScreen;
