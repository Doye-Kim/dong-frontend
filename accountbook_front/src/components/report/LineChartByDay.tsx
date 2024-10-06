import {colors} from '@/constants';
import hexToRgba from '@/utils/hexToRgba';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: colors.WHITE,
  backgroundGradientFrom: colors.WHITE,
  backgroundGradientTo: colors.WHITE,
  color: () => hexToRgba(colors.BLACK),
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    maxWidth: 20,
    padding: 0,
  },
  propsForBackgroundLines: {
    stroke: colors.WHITE,
  },
  propsForDots: {
    r: 0,
  },
};

const formatYLabel = (value: number) => {
  return (Math.ceil(value / 10000) * 10000).toLocaleString();
};

const LineChartByDay = ({chartData}: {chartData: Object}) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.label}>(만원)</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('screen').width - 40}
        height={200}
        withVerticalLabels={false}
        chartConfig={chartConfig}
        style={styles.graphStyle}
        fromZero={true}
        withShadow={false}
        segments={2}
        formatYLabel={formatYLabel}
        bezier
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
    marginTop: 23,
    ...chartConfig.style,
  },
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    position: 'absolute',
    left: 28,
    top: 0,
    zIndex: 10,
  },
});

export default LineChartByDay;
