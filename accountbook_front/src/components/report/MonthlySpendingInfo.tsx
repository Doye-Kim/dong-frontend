import {colors} from '@/constants';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const MonthlySpendingInfo = ({
  month,
  spending,
}: {
  month: number;
  spending: number;
}) => {
  return (
    <View style={styles.spendingInfoContainer}>
      <Text style={styles.text}>{month}월 소비</Text>
      <Text style={styles.text}>{spending.toLocaleString()}원</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spendingInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    color: colors.BLACK,
  },
});
export default MonthlySpendingInfo;
