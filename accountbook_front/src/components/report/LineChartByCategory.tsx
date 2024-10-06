import {colors} from '@/constants';
import hexToRgba from '@/utils/hexToRgba';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

const chartConfig = {
  backgroundColor: colors.WHITE,
  backgroundGradientFrom: colors.WHITE,
  backgroundGradientTo: colors.WHITE,
  color: () => {
    hexToRgba(colors.BLACK);
  },
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  propsForBackgroundLines: {
    stroke: colors.GRAY_400,
  },
};
const LineChartByCategory = ({chartData}: {chartData: LineChartData}) => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={chartData}
        width={320}
        height={170}
        withHorizontalLabels={false}
        chartConfig={chartConfig}
        style={styles.graphStyle}
        fromZero={true}
        withShadow={false}
        segments={2}
        getDotProps={(value, index) => {
          return {
            r: value === null ? 0 : '5', // 데이터가 null이면 점 크기를 0으로 설정
            strokeWidth: '2',
            stroke: colors.PRIMARY,
          };
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  graphStyle: {
    marginVertical: 8,
    paddingLeft: 20,
    paddingRight: 20,
    ...chartConfig.style,
  },
});

export default LineChartByCategory;
