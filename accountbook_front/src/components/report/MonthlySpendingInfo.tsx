import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {View, Text, StyleSheet} from 'react-native';

const MonthlySpendingInfo = ({
  month,
  spending,
}: {
  month: number;
  spending: number;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.spendingInfoContainer}>
      <Text style={styles.text}>{month}월 소비</Text>
      <Text style={styles.text}>{spending.toLocaleString()}원</Text>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    spendingInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 5,
    },
    text: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 15,
      color: colors[theme].BLACK,
    },
  });
export default MonthlySpendingInfo;
