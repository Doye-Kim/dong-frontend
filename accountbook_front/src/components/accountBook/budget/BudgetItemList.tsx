import React from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {colors} from '@/constants';

interface Category {
  categoryId: number;
  name: string;
  budget: number;
  use: number;
}

interface BudgetItemListProps {
  categories: Category[];
}

function BudgetItemList({categories}: BudgetItemListProps) {
  const renderItem = ({item}: {item: Category}) => {
    const remainingAmount = item.budget - item.use;
    const usagePercentage = item.use / item.budget;

    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryLabel}>
            <Image
              source={require('../../../assets/accountIcon.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text>{usagePercentage * 100}%</Text>
          </View>
          <Text style={styles.remainingAmount}>
            {remainingAmount >= 0
              ? `${remainingAmount.toLocaleString()}원 남음`
              : `초과 ${Math.abs(remainingAmount).toLocaleString()}원`}
          </Text>
        </View>

        <ProgressBar progress={usagePercentage} style={styles.progressBar} />

        <View style={styles.categoryFooter}>
          <Text style={styles.categoryUsageAmount}>
            예산 {item.budget.toLocaleString()}원
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => item.categoryId.toString()}
      style={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
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
