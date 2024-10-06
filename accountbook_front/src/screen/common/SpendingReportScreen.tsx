import {FilterButton} from '@/assets/icons';
import Divider from '@/components/common/Divider';
import LineChartByDay from '@/components/report/LineChartByDay';
import MonthlyComparison from '@/components/report/MonthlyComparison';
import PieChartByCategory from '@/components/report/PieChartByCategory';
import {accountBookHeaderNavigations, colors} from '@/constants';
import { AccountBookHeaderParamList } from '@/navigations/stack/accountBook/AccountBookHeaderNavigator';
import useCategoryStore from '@/store/useCategoryStore';
import useDateStore from '@/store/useDateStore';
import useHideStatusStore from '@/store/useHideStatusStore';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import {getDateWithSeparator, getMonthYearDetails, getYearMonth} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SpendingReportScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AccountBookHeaderParamList>>();
  const categories = useCategoryStore(state => state.categories);
  const selectedCategories = useCategoryStore(state => state.selectedCategories);
  const isHideVisible = useHideStatusStore(state => state.isHideVisible);
  const date = useDateStore(state => state.date);
  const {year, month} = getMonthYearDetails(date);
  const paymentList = usePaymentDataStore(state => state.paymentData);
  const fetchPaymentData = usePaymentDataStore(state => state.fetchPaymentData);
  const totalBalances: Record<string, number> = {};

  const generateDailyData = () => {
    const labels = [''];
    const daysInMonth = new Date(year, month, 0).getDate();
    const data = Array(daysInMonth).fill(0);
  
    const currentMonthKey = getYearMonth(date);
    const currentMonthPayments = paymentList[currentMonthKey] || [];
  
    currentMonthPayments.forEach(payment => {
      const day = new Date(payment.paymentTime).getDate() - 1; // 날짜는 1부터 시작하므로 -1 처리
  
      // 필터 조건: 선택된 카테고리와 숨김 처리 여부에 따른 필터링 적용
      if (
        selectedCategories.includes(payment.categoryId) &&
        (isHideVisible || payment.paymentState === 'INCLUDE')
      ) {
        data[day] += payment.balance;
      }
    });
  
    // 라벨 설정
    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(`${i}`);
    }
    labels.push('');
  
    return {
      labels,
      datasets: [
        {
          data,
          color: () => `rgba(255, 160, 0, 1)`,
          strokeWidth: 3, // 선 두께
        },
      ],
    };
  };
  const dayChartData = generateDailyData();

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      const targetDate = new Date(year, month - 1 - i);
      const targetDateString = getDateWithSeparator(targetDate, '-');
      const targetYearMonth = targetDateString.slice(0, 7);
      if (!paymentList[targetYearMonth]) {
        fetchPaymentData(targetDateString);
      }
    }
  }, []);

  Object.entries(paymentList).forEach(([key, payments]) => {
    totalBalances[key] = payments
      .filter(payment => {
        if (isHideVisible) {
          // isHideVisible이 true인 경우 카테고리 필터링만 적용
          return selectedCategories.includes(payment.categoryId);
        } else {
          // isHideVisible이 false인 경우 paymentState가 'INCLUDE'인 것만
          return payment.paymentState === 'INCLUDE' && selectedCategories.includes(payment.categoryId);
        }
      })
      .reduce((accumulator, payment) => accumulator + payment.balance, 0);
  });

  // 카테고리 차트 데이터 생성
  const generateCategoryChartData = () => {
    const currentMonthKey = getYearMonth(date);
    const currentMonthPayments = paymentList[currentMonthKey] || [];
    
    const categorySpendings: Record<number, number> = {};
  
    // 카테고리별로 소비 금액 합산
    currentMonthPayments.forEach(payment => {
      if (
        selectedCategories.includes(payment.categoryId) &&
        (isHideVisible || payment.paymentState === 'INCLUDE')
      ) {
        if (!categorySpendings[payment.categoryId]) {
          categorySpendings[payment.categoryId] = 0;
        }
        categorySpendings[payment.categoryId] += payment.balance;
      }
    });
  
    // 카테고리별 차트 데이터 생성
    return categories
      .filter(category => categorySpendings[category.categoryId])
      .map(category => ({
        category: category.name,
        color: colors[`CATEGORY_${category.imageNumber}` as keyof typeof colors],
        spending: categorySpendings[category.categoryId],
      }));
  };
  const categoryChartData = generateCategoryChartData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.dateText}>
            {year}년 {month}월 분석
          </Text>
          <Text style={styles.spendingMoney}>
            {totalBalances[getYearMonth(date)].toLocaleString()}원
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <MonthlyComparison
            totalBalances={totalBalances}
            paymentList={paymentList}
          />
        </View>
        <Divider />
        <View style={styles.contentContainer}>
          <View style={styles.dayHeaderContainer}>
            <Text style={styles.dayTitle}>일일 추이</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(accountBookHeaderNavigations.FILTER)
              }>
              <FilterButton />
            </TouchableOpacity>
          </View>
          <LineChartByDay chartData={dayChartData} />
        </View>
        <Divider />
        <View style={styles.contentContainer}>
          <View style={styles.dayHeaderContainer}>
            <Text style={styles.dayTitle}>카테고리별 지출</Text>
          </View>
          <PieChartByCategory chartData={categoryChartData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
  },
  scrollContainer: {
    // backgroundColor: 'pink',
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 10,
  },
  spendingMoney: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 28,
    color: colors.BLACK,
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
});
export default SpendingReportScreen;
