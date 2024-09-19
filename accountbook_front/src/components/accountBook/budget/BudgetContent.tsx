import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants';
import {EditIcon} from '@/assets/icons';
import {ProgressBar} from 'react-native-paper';
import BudgetItemList from './BudgetItemList';

type Category = {
  categoryId: number;
  name: string;
  budget: number;
  use: number;
  categoryImage?: number;
};

interface BudgetContentProps {
  categories: Category[];
  totalBudget: number;
}

const BudgetContent = ({categories, totalBudget}: BudgetContentProps) => {
  const totalUse = categories.reduce((sum, category) => sum + category.use, 0);
  const usagePercentage = totalUse / totalBudget;
  const remainingAmount = totalBudget - totalUse;
  const categories_temp = [
    { categoryId: 1, name: '식비', budget: 200000, use: 184000 },
    { categoryId: 2, name: '카페', budget: 50000, use: 13000 },
    { categoryId: 3, name: '배달음식', budget: 50000, use: 53000 }, // 초과 예시
  ];

  return (
    <ScrollView style={styles.detailContainer}>
      <View style={styles.totalBudgetContainer}>
        <Text style={styles.totalBudgetLabel}>예산</Text>
        <View style={styles.budgetHeaderContainer}>
          <Text style={styles.totalBudgetAmount}>
            {totalBudget.toLocaleString()}원
          </Text>
          <EditIcon style={styles.editIcon} />
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
      <BudgetItemList categories={categories_temp}/>
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
  },
  totalBudgetLabel: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginRight: 10,
  },
  editIcon: {
    width: 15,
    height: 'auto',
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
});

export default BudgetContent;
