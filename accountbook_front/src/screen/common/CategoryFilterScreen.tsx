import CategoryItem from '@/components/common/CategoryItem';
import Toggle from '@/components/common/Toggle';
import { colors } from '@/constants';
import useCategoryStore from '@/store/useCategoryStore';
import { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useHideStatusStore from '@/store/useHideStatusStore';

const CategoryFilterScreen: React.FC = () => {
  // 카테고리 상태와 함수 가져오기
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const setSelectedCategories = useCategoryStore((state) => state.setSelectedCategories);

  // 숨김내역 보기 관련 상태
  const {isHideVisible, toggleIsHideVisible} = useHideStatusStore();

  const navigation = useNavigation();

  // 임시로 선택된 카테고리 상태를 관리합니다.
  const [tempSelectedCategories, setTempSelectedCategories] = useState<number[]>(selectedCategories);

  // 모든 카테고리가 선택되었는지 여부 확인
  const isAllSelected = categories.length > 0 && tempSelectedCategories.length === categories.length;

  // 카테고리 선택/해제 로직
  const handleCategorySelect = (categoryId: number) => {
    setTempSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        // 이미 선택된 카테고리이면 제거
        return prev.filter((id) => id !== categoryId);
      } else {
        // 선택되지 않은 카테고리이면 추가
        return [...prev, categoryId];
      }
    });
  };

  // 모두 선택/해제 버튼 로직
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // 모두 해제
      setTempSelectedCategories([]);
    } else {
      // 모두 선택
      setTempSelectedCategories(categories.map((category) => category.categoryId));
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // '완료' 버튼을 눌렀을 때 선택된 카테고리를 적용합니다.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setSelectedCategories(tempSelectedCategories);
            navigation.goBack(); // 화면을 닫고 이전 화면으로 이동
          }}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.headerRightText}>완료</Text>
        </Pressable>
      ),
    });
  }, [navigation, tempSelectedCategories, setSelectedCategories]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hideListContainer}>
        <Text style={styles.text}>숨겨진 내역 표시</Text>
        <View style={styles.toggleContainer}>
          <Toggle isEnabled={isHideVisible} toggleSwitch={toggleIsHideVisible} />
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable onPress={handleToggleSelectAll} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {isAllSelected ? '모두해제' : '모두선택'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.checkListContainer}>
        <SectionList
          sections={[{ title: '카테고리', data: categories }]}
          keyExtractor={(item) => item.categoryId.toString()}
          renderItem={({ item }) => (
            <CategoryItem
              name={item.name}
              categoryId={item.categoryId}
              onPress={() => handleCategorySelect(item.categoryId)}
              isChecked={tempSelectedCategories.includes(item.categoryId)}
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
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  hideListContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.GRAY_300,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  toggleContainer: {
    position: 'absolute',
    right: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.GRAY_700,
    borderRadius: 8,
  },
  actionButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  checkListContainer: {
    paddingBottom: 100,
  },
  headerRightText: {
    fontSize: 16,
    color: colors.BLACK,
    marginRight: 15,
    fontFamily: 'Pretendard-Bold',
  },
});

export default CategoryFilterScreen;
