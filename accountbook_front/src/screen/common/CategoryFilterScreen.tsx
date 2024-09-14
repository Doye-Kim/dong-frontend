import CategoryItem from '@/components/common/CategoryItem';
import Toggle from '@/components/common/Toggle';
import {colors} from '@/constants';
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';

const CategoryFilterScreen = () => {
  const [isHide, setIsHide] = useState(true);
  const [hideList, setHideList] = useState([]);
  const toggleSwitch = () => setIsHide((previousState: any) => !previousState);
  useEffect(() => {
    console.log(hideList);
  }, [hideList]);
  const data = {
    size: '3',
    categories: [
      {
        category_id: 1,
        category_name: '택시',
        image_number: 1,
        default: true,
      },
      {
        category_id: 2,
        category_name: '커피',
        image_number: '9',
        default: true,
      },
      {
        category_id: 51,
        category_name: '야호',
        image_number: 56,
        default: false,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hideListContainer}>
        <Text style={styles.text}>숨겨진 내역 표시</Text>
        <View style={styles.toggleContainer}>
          <Toggle isEnabled={isHide} toggleSwitch={toggleSwitch} />
        </View>
      </View>
      <View style={styles.checkListContainer}>
        <SectionList
          sections={[{title: '카테고리', data: data.categories}]}
          keyExtractor={(item, index) => item.category_id + index}
          renderItem={({item}) => (
            <CategoryItem
              name={item.category_name}
              categoryId={item.category_id}
              setHideList={setHideList}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
  },
  hideListContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3, // 구분선의 두께
    borderBottomColor: colors.GRAY_300, // 구분선의 색상
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  toggleContainer: {
    position: 'absolute',
    right: 10,
  },
  checkListContainer: {},
});

export default CategoryFilterScreen;
