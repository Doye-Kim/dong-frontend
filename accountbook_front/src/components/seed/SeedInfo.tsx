import {colors} from '@/constants';
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
        <Text style={styles.content}>{perPaymentDeposit}원</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: colors.GRAY_300,
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
    color: colors.BLACK,
  },
  content: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 20,
    color: colors.BLACK,
  },
});

export default SeedInfo;
