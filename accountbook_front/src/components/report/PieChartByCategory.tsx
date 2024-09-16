import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import CategorySpendingInfo from './CategorySpendingInfo';

interface ChartData {
  category: string;
  color: string;
  spending: number;
}

interface ProcessedData {
  name: string;
  color: string;
  spending: number;
  percentage: number;
}

interface PieChartByCategoryProps {
  chartData: ChartData[];
}

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false,
};

const PieChartByCategory: React.FC<PieChartByCategoryProps> = ({chartData}) => {
  // 전체 spending의 합 구하기
  const totalSpending = chartData.reduce((sum, data) => sum + data.spending, 0);

  // 각 카테고리별 퍼센티지 계산하고 5% 미만 항목을 '그외'로 합치기
  const processedData = chartData.reduce(
    (acc: {filteredData: ProcessedData[]; etc: ProcessedData}, data) => {
      const percentage = Math.round((data.spending / totalSpending) * 100);

      if (percentage < 5) {
        acc.etc.spending += data.spending;
      } else {
        // 5% 이상인 항목만 추가
        acc.filteredData.push({
          name: data.category,
          color: data.color,
          spending: data.spending,
          percentage,
        });
      }
      return acc;
    },
    {
      filteredData: [],
      etc: {name: '그외', color: '#B0BEC5', spending: 0, percentage: 0}, // '기타' 항목
    },
  );

  // '그외' 항목이 있으면 포함
  if (processedData.etc.spending > 0) {
    processedData.etc.percentage = Math.round(
      (processedData.etc.spending / totalSpending) * 100,
    );
    processedData.filteredData.push(processedData.etc);
  }

  // '그외'를 제외한 데이터 퍼센티지로 내림차순 정렬
  const sortedData = processedData.filteredData
    .filter(data => data.name !== '그외')
    .sort((a, b) => b.percentage - a.percentage);

  // '그외' 항목이 있으면 가장 마지막에 추가
  if (processedData.etc.spending > 0) {
    sortedData.push(processedData.etc);
  }

  // PieChart에서 필요한 데이터 형식으로 변환
  const finalChartData = sortedData.map(data => ({
    name: data.name,
    color: data.color,
    spending: data.spending,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={finalChartData}
        width={220}
        height={220}
        chartConfig={chartConfig}
        accessor={'spending'}
        backgroundColor={'transparent'}
        center={[50, 10]}
        paddingLeft="0"
        style={styles.pieStyle}
        hasLegend={false}
      />
      <View style={styles.infoContainer}>
        {sortedData.map(data => (
          <CategorySpendingInfo
            key={data.name}
            name={data.name}
            color={data.color}
            percentage={data.percentage}
            spending={data.spending}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
});

export default PieChartByCategory;
