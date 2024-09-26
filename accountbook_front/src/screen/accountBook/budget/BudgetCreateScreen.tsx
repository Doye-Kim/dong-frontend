import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {accountBookNavigations, accountBookTabNavigations, colors} from '@/constants';
import BudgetCreateItem from '@/components/accountBook/budget/BudgetCreateItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountBookStackParamList } from '@/navigations/stack/accountBook/AccountBookStackNavigator';

type BudgetCategory = {
  id: string;
  name: string;
  icon: string;
  budget?: number;
};

const BudgetCreateScreen = () => {
  const [spentAmount, setSpentAmount] = useState(950000);
  const [totalBudget, setTotalBudget] = useState(1200000);

  const [categories, setCategories] = useState<BudgetCategory[]>([
    {id: '1', name: '식비', icon: 'silverware-fork-knife', budget: 200000},
    {id: '2', name: '카페', icon: 'coffee', budget: 50000},
    {id: '3', name: '배달음식', icon: 'food-delivery'},
    {id: '4', name: '편의점', icon: 'store'},
    {id: '5', name: '술/유흥', icon: 'glass-cocktail'},
    {id: '6', name: '생활', icon: 'home'},
    {id: '7', name: '패션/미용', icon: 'tshirt-crew'},
  ]);

  const onUpdateCategory = (id: string, amount: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === id ? {...category, budget: amount} : category,
      ),
    );
  };

  const navigation = useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.totalBudgetText}>이번 달 총 예산</Text>
      <Text style={styles.totalBudgetAmount}>
        {totalBudget.toLocaleString()} 원
      </Text>

      <View style={styles.spentAmountContainer}>
        <Text style={styles.spentAmountText}>
          {spentAmount.toLocaleString()}원
          <Text style={styles.totalBudgetText}>
            {' '}
            / {totalBudget.toLocaleString()}원
          </Text>
        </Text>
      </View>

      <Text style={styles.categoryTitle}>카테고리별 예산</Text>
      <ScrollView style={styles.scrollContainer}>
        {categories.map(category => (
          <BudgetCreateItem
            key={category.id}
            category={category}
            onUpdateCategory={onUpdateCategory}
          />
        ))}
        <TouchableOpacity style={styles.completeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
    marginTop: 40,
  },
  totalBudgetText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  totalBudgetAmount: {
    fontSize: 35,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginBottom: 15,
  },
  spentAmountContainer: {
    backgroundColor: colors.ORANGE_200,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 10,
  },
  spentAmountText: {
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'right',
    color: colors.ORANGE_600,
  },
  categoryTitle: {
    fontSize: 17,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
    marginVertical: 10,
  },
  completeButton: {
    backgroundColor: colors.ORANGE_600,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: 'Pretendard-Bold'
  },
});

export default BudgetCreateScreen;
