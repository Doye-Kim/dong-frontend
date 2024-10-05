import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {colors} from '@/constants';
import CategoryIcon from '@/components/common/CategoryIcon';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import {getYearMonth} from '@/utils';
import useDateStore from '@/store/useDateStore';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  budget: number;
  use: number;
}

interface BudgetItemListProps {
  categories: Category[];
}

function BudgetItemList({categories}: BudgetItemListProps) {
  return (
    <ScrollView style={styles.listContainer}>
      {categories.map(item => {
        const remainingAmount = item.budget - item.use;
        const usagePercentage = item.use / item.budget;

        return (
          <View key={item.categoryId} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLabel}>
                <CategoryIcon
                  categoryNumber={item.categoryImageNumber}
                  size={40}
                />
                <Text style={styles.categoryName}>{item.categoryName}</Text>
                <Text>{(usagePercentage * 100).toFixed(2)}%</Text>
              </View>
              <Text style={styles.remainingAmount}>
                {remainingAmount >= 0
                  ? `${remainingAmount.toLocaleString()}원 남음`
                  : `초과 ${Math.abs(remainingAmount).toLocaleString()}원`}
              </Text>
            </View>

            <ProgressBar
              progress={usagePercentage}
              color={colors[`CATEGORY_${item.categoryImageNumber}` as keyof typeof colors]}
              style={styles.progressBar}
            />

            <View style={styles.categoryFooter}>
              <Text style={styles.categoryUsageAmount}>
                예산 {item.budget.toLocaleString()}원
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    marginBottom: 100,
  },
  categoryContainer: {
    padding: 15,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
  },
  categoryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryName: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginRight: 5,
    marginLeft: 10,
  },
  remainingAmount: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.GRAY_200,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryUsageAmount: {
    fontSize: 14,
    width: '100%',
    textAlign: 'right',
    fontFamily: 'Pretendard-Regular',
    color: colors.GRAY_500,
  },
});

export default BudgetItemList;
