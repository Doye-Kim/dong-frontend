import {colors} from '@/constants';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const CategorySpendingInfo = ({
  name,
  color,
  percentage,
  spending,
}: {
  name: string;
  color: string;
  percentage: number;
  spending: number;
}) => {
  // console.log(name, percentage, spending);
  return (
    <View
      style={[
        styles.container,
        {
          width: Dimensions.get('screen').width - 80,
          justifyContent: 'space-between',
        },
      ]}>
      <View style={styles.container}>
        <View style={[styles.categoryColor, {backgroundColor: color}]} />
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
      <Text style={styles.spendingText}>{spending.toLocaleString()}원</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    margin: 5,
  },
  nameText: {
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    fontSize: 16,
  },
  percentageText: {
    fontFamily: 'Pretendard-SemiBold',
    color: colors.GRAY_600,
    fontSize: 16,
    margin: 5,
  },
  spendingText: {
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    fontSize: 20,
  },
});
export default CategorySpendingInfo;
