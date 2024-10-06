import {colors} from '@/constants';
import useDateStore from '@/store/useDateStore';
import {getMonthYearDetails, getYearMonth} from '@/utils';
import {Image, StyleSheet, Text, View} from 'react-native';

interface CategoryComparisonHeaderProps {
  totalBalances: Record<string, number>
}

const CategoryComparisonHeader = ({totalBalances}: CategoryComparisonHeaderProps) => {
  const date = useDateStore(state => state.date);
  const {year, month} = getMonthYearDetails(date);
  const lastMonthDate = new Date(year, month - 2);
  const lastYearMonth = getYearMonth(lastMonthDate);
  const thisYearMonth = getYearMonth(date);
  const usedGap = totalBalances[lastYearMonth] - totalBalances[thisYearMonth];
  
  return (
    <View style={styles.headerContainer}>
      <Image source={require('@/assets/bell.png')} style={styles.image} />
      <Text style={styles.text}>
        저번달보다
        {usedGap > 0 ? (
          <Text style={styles.accentText}> {Math.abs(usedGap).toLocaleString()}원 덜 </Text>
        ) : (
          <Text style={styles.accentText}> {Math.abs(usedGap).toLocaleString()}원 더 </Text>
        )}
        썼어요{' '}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  text: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.BLACK,
    marginVertical: 10,
  },
  accentText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.RED_500,
  },
});
export default CategoryComparisonHeader;
