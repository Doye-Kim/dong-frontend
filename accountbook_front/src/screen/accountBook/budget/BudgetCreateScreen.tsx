import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Animated,
} from 'react-native';
import {
  accountBookNavigations,
  accountBookTabNavigations,
  colors,
} from '@/constants';
import BudgetCreateItem from '@/components/accountBook/budget/BudgetCreateItem';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import {AddRoundButton, EditIcon} from '@/assets/icons';
import CategoryList from '@/components/accountBook/category/CategoryList';
import axiosInstance from '@/api/axios';
import useDateStore from '@/store/useDateStore';
import {getYearMonth, getYearMonthLocalFormat} from '@/utils';
import Toast from 'react-native-toast-message';
import {AccountBookTabParamList} from '@/navigations/tab/AccountBookTabNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import useThemeStore from '@/store/useThemeStore';

type CategoryBudgetCreate = {
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  budget: number;
  use?: number;
};

type BudgetCreateScreenRouteProp = RouteProp<
  AccountBookStackParamList,
  'BudgetCreate'
>;

type AccountBookNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountBookStackParamList>,
  BottomTabNavigationProp<AccountBookTabParamList>
>;

const BudgetCreateScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const route = useRoute<BudgetCreateScreenRouteProp>();
  const date = useDateStore(state => state.date);
  const setDate = useDateStore(state => state.setDate);
  const [budgetId, setBudgetId] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(
    route.params.totalBudget,
  );
  const [inputBudgetValue, setInputBudgetValue] = useState<string>('');
  const [totalBudgetEditStatus, setTotalBudgetEditStatus] =
    useState<boolean>(false);
  const [spentAmount, setSpentAmount] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryBudgetCreate[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const initialCategories = route.params.categories;
    console.log(route.params.budgetId);
    if (initialCategories !== undefined) {
      setCategories(initialCategories);
      setBudgetId(route.params.budgetId);
    }
  }, []);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, categories.length);
  }, [categories]);

  const handleSubmitEditing = (index: number) => {
    if (index < categories.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBlur = () => {
    const newBudget = parseInt(inputBudgetValue, 10);
    if (isNaN(newBudget) || newBudget < 1) {
      Toast.show({
        type: 'error',
        text1: '예산을 제대로 입력해주세요',
        text2: '1 이상의 숫자만 가능합니다',
      });
      setInputBudgetValue('0');
    } else {
      setTotalBudget(newBudget);
      setTotalBudgetEditStatus(false);
    }
  };

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setInputBudgetValue(numericValue);
  };

  useMemo(() => {
    const totalBudget = categories.reduce(
      (sum, category) => sum + (category.budget || 0),
      0,
    );
    setSpentAmount(totalBudget);
  }, [categories]);

  const onUpdateCategory = (id: number, amount: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.categoryId === id ? {...category, budget: amount} : category,
      ),
    );
  };

  const navigation = useNavigation<AccountBookNavigationProp>();

  const handleCategorySelect = (
    categoryId: number,
    categoryName: string,
    categoryImageNumber?: number,
  ) => {
    setCategories(prevCategories => {
      // 이미 존재하는지 검사
      const isExisting = prevCategories.some(
        cat => cat.categoryId === categoryId,
      );
      if (isExisting) {
        return prevCategories;
      } else {
        const newCategory: CategoryBudgetCreate = {
          categoryId,
          categoryName,
          categoryImageNumber: categoryImageNumber ?? 0,
          budget: 0,
        };
        setSelectedCategoryIds(prev => [...prev, categoryId]);
        return [...prevCategories, newCategory];
      }
    });
  };

  const handleCategoryDelete = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.categoryId !== categoryId));
    setSelectedCategoryIds(prev => prev.filter(id => id !== categoryId));
  };

  const toggleModalVisible = () => {
    if (!isModalVisible) {
      setIsModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsModalVisible(false);
      });
    }
  };

  const handleSaveBudget = async (categories: CategoryBudgetCreate[]) => {
    if (totalBudget !== spentAmount) {
      Toast.show({
        type: 'error',
        text1: '예산을 제대로 입력해주세요',
        text2: '카테고리 예산의 총 합과 총 예산은 같아야합니다.',
      });
      return;
    }
    try {
      const inputCategories = categories.map(category => ({
        newCategoryId: category.categoryId,
        newBudget: category.budget,
      }));
      if (route.params.categories === undefined) {
        const response = await axiosInstance.post('/budget', {
          total: totalBudget,
          month: getYearMonth(date),
          categories: inputCategories,
        });
        console.log(response.data);
      } else {
        const response = await axiosInstance.put(`/budget/${budgetId}`, {
          total: totalBudget,
          month: getYearMonth(date),
          categories: inputCategories,
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error((error as any).response?.data);
    }
    navigation.navigate(accountBookNavigations.TABBAR, {
      screen: accountBookTabNavigations.BUDGET,
    });
    setDate(date);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // iOS에서 추가 오프셋
      >
        <Text style={styles.totalBudgetText}>
          {getYearMonthLocalFormat(date)} 총 예산
        </Text>
        {totalBudgetEditStatus ? (
          <View style={styles.totalBudgetContainer}>
            <TextInput
              placeholder="총 예산을 입력하세요"
              placeholderTextColor={colors[theme].GRAY_600}
              style={styles.totalBudgetAmount}
              value={inputBudgetValue}
              onChangeText={handleChangeText}
              onBlur={handleBlur}
              keyboardType="numeric"
              autoFocus
            />
          </View>
        ) : (
          <View style={styles.totalBudgetContainer}>
            <Text style={styles.totalBudgetAmount}>
              {totalBudget.toLocaleString()} 원
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setTotalBudgetEditStatus(true)}>
              <EditIcon />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.spentAmountContainer}>
          <Text style={styles.spentAmountText}>
            {spentAmount.toLocaleString()}원
            <Text style={styles.totalBudgetText}>
              {' '}
              / {totalBudget.toLocaleString()}원
            </Text>
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.categoryTitle}>카테고리별 예산</Text>
          <View style={styles.categoryListContainer}>
            {categories.map((category, index) => (
              <BudgetCreateItem
                key={category.categoryId}
                category={category}
                onUpdateCategory={onUpdateCategory}
                onDeleteCategory={handleCategoryDelete}
                onSubmitEditing={() => handleSubmitEditing(index)}
                inputRef={el => (inputRefs.current[index] = el)}
              />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={toggleModalVisible}>
              <AddRoundButton />
              <Text style={styles.addButtonText}> 카테고리 추가</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <CustomButton
          text={'완료'}
          onPress={() => handleSaveBudget(categories)}
        />
      </KeyboardAvoidingView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModalVisible}>
        <TouchableWithoutFeedback onPress={toggleModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.bottomModalContainer}>
              <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                <Animated.View
                  style={[
                    styles.bottomModalContent,
                    {transform: [{translateY: slideAnim}]}, // 슬라이드 애니메이션 적용
                  ]}>
                  <Text style={styles.modalTitle}>카테고리 선택</Text>
                  <CategoryList
                    onCategorySelect={handleCategorySelect}
                    renderAddButton={false}
                    selectedCategoryIds={selectedCategoryIds}
                  />
                  <TouchableOpacity
                    onPress={toggleModalVisible}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
      padding: 20,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    categoryListContainer: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    totalBudgetContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
    },
    totalBudgetText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
      color: colors['light'].BLACK,
    },
    totalBudgetAmount: {
      fontSize: 35,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    editButton: {
      padding: 5,
    },
    spentAmountContainer: {
      backgroundColor: colors[theme].ORANGE_200,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginVertical: 10,
    },
    spentAmountText: {
      fontSize: 17,
      fontFamily: 'Pretendard-Bold',
      textAlign: 'right',
      color: colors[theme].ORANGE_600,
    },
    categoryTitle: {
      fontSize: 17,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
      marginVertical: 10,
    },
    addButton: {
      flexDirection: 'row',
      backgroundColor: colors[theme].ORANGE_300,
      width: Dimensions.get('window').width - 40,
      height: 60,
      borderRadius: 20,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].PRIMARY,
      marginBottom: 2,
    },
    bottomModalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomModalContent: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      maxHeight: '50%',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Pretendard-Bold',
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: colors[theme].PRIMARY,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    closeButtonText: {
      color: colors[theme].WHITE,
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default BudgetCreateScreen;
