import {FilterButton} from '@/assets/icons';
import Divider from '@/components/common/Divider';
import LineChartByDay from '@/components/report/LineChartByDay';
import MonthlyComparison from '@/components/report/MonthlyComparison';
import PieChartByCategory from '@/components/report/PieChartByCategory';
import {colors} from '@/constants';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
const generateDummyData = () => {
  // 라벨 생성: 1부터 31까지
  const labels = [
    '',
    ...Array.from({length: 31}, (_, i) => (i + 1).toString()),
    '',
  ];

  // 데이터 생성: 0원부터 320,000원까지 랜덤 데이터, 만원 단위
  const data = [
    ...Array.from({length: 31}, () => Math.floor(Math.random() * 33)),
  ];
  // console.log(data);
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

// 더미 데이터 생성
const dayChartData = generateDummyData();
const categoryChartData = [
  {category: '식비', color: colors.CATEGORY_1, spending: 320000},
  {category: '카페', color: colors.CATEGORY_2, spending: 50000},
  {category: '배달음식', color: colors.CATEGORY_3, spending: 250000},
  {category: '편의점', color: colors.CATEGORY_4, spending: 20000},
  {category: '술/유흥', color: colors.CATEGORY_5, spending: 200000},
  {category: '생활', color: colors.CATEGORY_6, spending: 50000},
  {category: '패션/미용', color: colors.CATEGORY_7, spending: 180000},
  {category: '대중교통', color: colors.CATEGORY_8, spending: 60000},
  {category: '택시', color: colors.CATEGORY_9, spending: 50000},
  {category: '자동차', color: colors.CATEGORY_10, spending: 0},
  {category: '주거/통신', color: colors.CATEGORY_11, spending: 550000},
  {category: '의료/건강', color: colors.CATEGORY_12, spending: 3000},
  {category: '금융', color: colors.CATEGORY_13, spending: 0},
  {category: '문화/여가', color: colors.CATEGORY_14, spending: 0},
  {category: '여행/숙박', color: colors.CATEGORY_15, spending: 0},
  {category: '교육/학습', color: colors.CATEGORY_16, spending: 0},
  {category: '경조/선물', color: colors.CATEGORY_17, spending: 20000},
  {category: '기타', color: colors.CATEGORY_18, spending: 60000},
];
const SpendingReportScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.dateText}>24년 8월 지출</Text>
          <Text style={styles.spendingMoney}>
            {(1205680).toLocaleString()}원
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <MonthlyComparison />
        </View>
        <Divider />
        <View style={styles.contentContainer}>
          <View style={styles.dayHeaderContainer}>
            <Text style={styles.dayTitle}>일일 추이</Text>
            <FilterButton />
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
