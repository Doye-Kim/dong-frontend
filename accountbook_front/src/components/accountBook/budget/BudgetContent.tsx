import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {accountBookNavigations, colors} from '@/constants';
import {ProgressBar} from 'react-native-paper';
import BudgetItemList from './BudgetItemList';
import {getDateWithSeparator, getYearMonth} from '@/utils';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import useDateStore from '@/store/useDateStore';
import {useNavigation} from '@react-navigation/native';
import {Category} from '@/types/domain';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountBookStackParamList } from '@/navigations/stack/accountBook/AccountBookStackNavigator';

interface BudgetContentProps {
  categories: Category[];
  totalBudget: number;
  budgetId: number;
  isPastMonth: boolean;
}

const BudgetContent = ({
  categories: initialCategories,
  totalBudget,
  budgetId,
  isPastMonth,
}: BudgetContentProps) => {
  const paymentList = usePaymentDataStore(state => state.paymentData);
  const date = useDateStore(state => state.date);
  const yearMonth = getYearMonth(date);

  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const totalUse = categories.reduce((sum, category) => sum + category.use, 0);
  const usagePercentage = totalUse / totalBudget;
  const remainingAmount = totalBudget - totalUse;

  const navigation = useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  useEffect(() => {
    const yearMonth = getDateWithSeparator(date, '-').slice(0, 7);
    const updatedCategories = initialCategories.map(category => {
      const paymentsForCategory = paymentList[yearMonth]?.filter(
        payment => payment.categoryId === category.categoryId,
      );
  
      const totalUse = paymentsForCategory
        ? paymentsForCategory.reduce((sum, payment) => sum + payment.balance, 0)
        : 0;
  
      return {
        ...category,
        use: totalUse,
      };
    });
    setCategories(updatedCategories);
  }, [paymentList, date, initialCategories]);

  const handleEditPressed = (categories: Category[], totalBudget: number) => {
    navigation.navigate(accountBookNavigations.BUDGETCREATE, {
      categories: categories,
      totalBudget: totalBudget,
      budgetId: budgetId,
    });
  };

  return (
    <ScrollView style={styles.detailContainer}>
      <View style={styles.totalBudgetContainer}>
        <Text style={styles.totalBudgetLabel}>예산</Text>
        <View style={styles.budgetHeaderContainer}>
          <Text style={styles.totalBudgetAmount}>
            {totalBudget.toLocaleString()}원
          </Text>
          {isPastMonth ? (
            <></>
          ) : (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleEditPressed(categories, totalBudget)}>
              <Text style={styles.buttonText}>수정</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            progress={usagePercentage}
            color={colors.ORANGE_600}
            style={styles.progressBar}
          />
        </View>

        <View style={styles.legendContainer}>
          {/* 지출 */}
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, {backgroundColor: colors.ORANGE_600}]}
            />
            <Text style={styles.legendLabel}>지출</Text>
            <Text style={styles.legendAmount}>
              {totalUse.toLocaleString()}원
            </Text>
          </View>
          {/* 남은 돈 */}
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, {backgroundColor: colors.GRAY_300}]}
            />
            <Text style={styles.legendLabel}>
              {remainingAmount >= 0 ? '남은 돈' : '초과한 금액'}
            </Text>
            <Text style={styles.legendAmount}>
              {Math.abs(remainingAmount).toLocaleString()}원
            </Text>
          </View>
        </View>
      </View>
      <BudgetItemList categories={categories} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
    marginTop: 20,
  },
  totalBudgetContainer: {
    marginBottom: 20,
  },
  budgetHeaderContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBarWrapper: {
    height: 45,
    backgroundColor: colors.GRAY_200,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.GRAY_300,
  },
  totalBudgetLabel: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginRight: 10,
  },
  totalBudgetAmount: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginVertical: 10,
  },
  legendContainer: {
    justifyContent: 'space-between',
    marginTop: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4, // To make the dot circular
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
    color: colors.GRAY_500,
    marginRight: 5,
  },
  legendAmount: {
    fontSize: 14,
    color: colors.BLACK,
  },
  buttonContainer: {
    backgroundColor: colors.GRAY_400,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.GRAY_700,
  },
});

export default BudgetContent;
