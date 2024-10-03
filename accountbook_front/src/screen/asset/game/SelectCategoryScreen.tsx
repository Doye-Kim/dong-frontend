import {ResponseCategory, getCategories} from '@/api/category';
import CategoryItem from './GameCategoryItem';
import CustomButton from '@/components/common/CustomButton';
import {colors, gameNavigations} from '@/constants';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import useGameCreateStore from '@/store/useGameCreateStore';
import {putCategory} from '@/api/game';

const SelectCategoryScreen = ({route, navigation}) => {
  const [categories, setCategories] = useState<ResponseCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    route?.params?.category
      ? route?.params?.category.map(category => category.categoryId)
      : [],
  );
  const participantId = route?.params?.participantId
    ? route?.params?.participantId
    : null;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: '카테고리를 불러오는 데 문제가 발생했습니다',
        });
      }
    };
    getData();
  }, []);
  const {setCustomCategoryIds} = useGameCreateStore();

  const editCategory = async () => {
    console.log('edit', {
      participantId,
      customCategoryIds: selectedCategories,
    });
    try {
      const data = await putCategory({
        participantId,
        customCategoryIds: selectedCategories,
      });
      console.log(data);
      navigation.navigate(gameNavigations.PREPARE, {
        participantId: participantId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnPress = () => {
    if (selectedCategories.length === 0) {
      Toast.show({
        type: 'error',
        text1: '카테고리를 한 개 이상 선택해 주세요',
      });
    } else {
      setCustomCategoryIds(selectedCategories);
      if (route?.params?.category) {
        editCategory();
      } else navigation.navigate(gameNavigations.ACCOUNT, {pageNumber: 3});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>내기 횟수에 포함할</Text>
      <Text style={styles.text}>카테고리를 선택해 주세요.</Text>
      <ScrollView style={styles.listContainer}>
        {categories.map(item => (
          <CategoryItem
            item={item}
            key={item.categoryId}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        ))}
      </ScrollView>
      <View>
        <CustomButton text="확인" onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {
    height: Dimensions.get('window').height - 170,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
});
export default SelectCategoryScreen;
