import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {StyleSheet, Text, View} from 'react-native';

interface SeedInfoProps {
  depositAccount: string;
  withdrawAccount: string;
  endDate: string;
  dueDate: string;
  perPaymentDeposit: number;
}
const SeedInfo = ({
  depositAccount,
  withdrawAccount,
  endDate,
  dueDate,
  perPaymentDeposit,
}: SeedInfoProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.title}>기한</Text>
        <Text style={styles.content}>{endDate}</Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.title}>출금 예정일</Text>
        <Text style={styles.content}>{dueDate}</Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.title}>출금 계좌</Text>
        <Text style={styles.content}>{withdrawAccount}</Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.title}>입금 계좌</Text>
        <Text style={styles.content}>{depositAccount}</Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.title}>회당 저금액</Text>
        <Text style={styles.content}>
          {perPaymentDeposit.toLocaleString()}원
        </Text>
      </View>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      marginTop: 50,
      backgroundColor: colors[theme].GRAY_300,
      borderRadius: 20,
      padding: 10,
    },
    lineContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: 15,
    },
    title: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 18,
      color: colors[theme].BLACK,
    },
    content: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 20,
      color: colors[theme].BLACK,
    },
  });

export default SeedInfo;
