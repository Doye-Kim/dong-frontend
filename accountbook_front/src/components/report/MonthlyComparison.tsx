import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Category from './Category';
import {useEffect, useState} from 'react';
import LineChartByCategory from './LineChartByCategory';
import CategoryComparisonHeader from './CategoryComparisonHeader';
import MonthlySpendingInfo from './MonthlySpendingInfo';
import {Payment} from '@/types/domain';
import useCategoryStore from '@/store/useCategoryStore';
import useDateStore from '@/store/useDateStore';
import {getMonthYearDetails, getYearMonth} from '@/utils';
import useHideStatusStore from '@/store/useHideStatusStore';

interface MonthlyComparisonProps {
  totalBalances: Record<string, number>;
  paymentList: Record<string, Payment[]>;
}

const MonthlyComparison = ({
  totalBalances,
  paymentList,
}: MonthlyComparisonProps) => {
  const date = useDateStore(state => state.date);
  const {year, month} = getMonthYearDetails(date);
  const categories = useCategoryStore(state => state.categories);
  const isHideVisible = useHideStatusStore(state => state.isHideVisible);
  const extendedCategories = [
    {
      categoryId: 1,
      name: '전체',
      categoryType: 'DEFAULT',
      imageNumber: 0,
    },
    ...categories,
  ];
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [chartData, setChartData] = useState({
    labels: ['', '', ''],
    datasets: [
      {
        data: [null, 0, 0],
        color: () => `rgba(255, 160, 0, 1)`,
        strokeWidth: 4,
      },
    ],
  });

// 선택된 category에 대해 합계 계산
const calcCategorySum = (categoryId: number) => {
  const months = [];
  const labels = ['']; // 첫 번째 라벨은 공백

  for (let i = 1; i >= 0; i--) {
    const targetDate = new Date(year, month - i - 1); // 지난달과 이번달
    months.push(getYearMonth(targetDate));
    labels.push(`${targetDate.getMonth() + 1}월`);
  }

  // 합계 계산
  const sums = months.map(monthKey => {
    const payments = paymentList[monthKey] || [];
    return payments
      .filter(payment => {
        if (isHideVisible) {
          // isHideVisible이 true인 경우 모든 payment를 포함 (카테고리만 필터링)
          return categoryId === 1 || payment.categoryId === categoryId;
        } else {
          // isHideVisible이 false인 경우 paymentState가 'INCLUDE'인 것만 포함
          return (
            payment.paymentState === 'INCLUDE' &&
            (categoryId === 1 || payment.categoryId === categoryId)
          );
        }
      })
      .reduce((acc, payment) => acc + payment.balance, 0);
  });

  return {sums, labels};
};

  useEffect(() => {
    const {sums, labels} = calcCategorySum(selectedCategoryId);
    setChartData(prev => ({
      ...prev,
      labels,
      datasets: [
        {
          ...prev.datasets[0],
          data: [null, ...sums],
        },
      ],
    }));
  }, [selectedCategoryId, paymentList, date]);

// 이번 달과 지난달의 총 소비량 계산
const pastTwoMonths = [];
for (let i = 1; i >= 0; i--) {
  const targetDate = new Date(year, month - i - 1); // 지난달과 이번달
  const monthKey = getYearMonth(targetDate);
  const payments = paymentList[monthKey] || [];

  // 선택한 카테고리에 따른 총 소비량 계산
  const totalSpending = payments
    .filter(payment => {
      if (isHideVisible) {
        // isHideVisible이 true인 경우 모든 payment를 포함 (카테고리만 필터링)
        return selectedCategoryId === 1 || payment.categoryId === selectedCategoryId;
      } else {
        // isHideVisible이 false인 경우 paymentState가 'INCLUDE'인 것만 포함
        return (
          payment.paymentState === 'INCLUDE' &&
          (selectedCategoryId === 1 || payment.categoryId === selectedCategoryId)
        );
      }
    })
    .reduce((acc, payment) => acc + payment.balance, 0);

  pastTwoMonths.push({
    month: targetDate.getMonth() + 1,
    spending: totalSpending,
  });
}
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CategoryComparisonHeader totalBalances={totalBalances} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {extendedCategories.map(item => (
            <Category
              key={item.categoryId}
              name={item.name}
              categoryId={item.categoryId}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          ))}
        </View>
      </ScrollView>
      <LineChartByCategory chartData={chartData} />
      <View style={styles.spendingInfoContainer}>
        {pastTwoMonths.map(monthInfo => (
          <MonthlySpendingInfo
            key={monthInfo.month}
            month={monthInfo.month}
            spending={monthInfo.spending}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  spendingInfoContainer: {
    width: Dimensions.get('screen').width - 80,
    justifyContent: 'center',
  },
});

export default MonthlyComparison;
