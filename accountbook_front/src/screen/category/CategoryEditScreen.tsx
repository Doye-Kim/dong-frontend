import {getCategories} from '@/api/category';
import CategoryList from '@/components/accountBook/category/CategoryList';
import useCategoryStore from '@/store/useCategoryStore';
import {useEffect} from 'react';
import {Dimensions, SafeAreaView, View, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

const CategoryEditScreen = () => {
  const {setCategories} = useCategoryStore();
  const getCategory = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      console.log(data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '데이터를 불러오는 데 실패했습니다. 다시 시도해주세요',
      });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <CategoryList />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  listContainer: {
    height: Dimensions.get('screen').height - 250,
  },
});
export default CategoryEditScreen;
