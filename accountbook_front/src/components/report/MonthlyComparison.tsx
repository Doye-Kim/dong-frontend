import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Category from './Category';
import {useState} from 'react';
import LineChartByCategory from './LineChartByCategory';
import CategoryComparisonHeader from './CategoryComparisonHeader';
import MonthlySpendingInfo from './MonthlySpendingInfo';

const data = {
  size: '10',
  categories: [
    {
      category_id: 1,
      category_name: '식사',
      image_number: 1,
      default: true,
    },
    {
      category_id: 2,
      category_name: '교통',
      image_number: 2,
      default: true,
    },
    {
      category_id: 3,
      category_name: '커피',
      image_number: 3,
      default: true,
    },
    {
      category_id: 4,
      category_name: '영화',
      image_number: 4,
      default: false,
    },
    {
      category_id: 5,
      category_name: '편의점',
      image_number: 5,
      default: true,
    },
    {
      category_id: 6,
      category_name: '의류',
      image_number: 6,
      default: false,
    },
    {
      category_id: 7,
      category_name: '헬스',
      image_number: 7,
      default: false,
    },
    {
      category_id: 8,
      category_name: '전자기기',
      image_number: 8,
      default: false,
    },
    {
      category_id: 9,
      category_name: '주거비',
      image_number: 9,
      default: true,
    },
    {
      category_id: 10,
      category_name: '기타',
      image_number: 10,
      default: false,
    },
  ],
};
const chartData = {
  labels: ['', '7월', '8월'],
  datasets: [
    {
      data: [null, 120450, 325920],
      color: () => `rgba(255, 160, 0, 1)`,
      strokeWidth: 4, // 선 두께
    },
  ],
};

const MonthlyComparison = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CategoryComparisonHeader />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {data.categories.map(item => (
            <Category
              key={item.category_id}
              name={item.category_name}
              categoryId={item.category_id}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          ))}
        </View>
      </ScrollView>
      <LineChartByCategory chartData={chartData} />
      <View style={styles.spendingInfoContainer}>
        <MonthlySpendingInfo month={7} spending={120450} />
        <MonthlySpendingInfo month={8} spending={325920} />
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
