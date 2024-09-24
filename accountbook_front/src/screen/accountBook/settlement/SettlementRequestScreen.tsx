import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const data = {
  settlementId: 5,
  accountId: 3,
  username: '김도예',
  date: '2024.08.29.목',
  settlementPaymentList: [
    {
      settlementPaymentsId: 12,
      paymentId: 157,
      balance: 15000,
      merchantName: '우버택시',
      categoryId: 6,
      categoryName: '택시',
      amount: 7500,
    },
    {
      settlementPaymentId: 11,
      paymentId: 160,
      balance: 5700,
      merchantName: 'CU 강서신호점',
      categoryId: 13,
      categoryName: '유흥',
      amount: 3700,
    },
  ],
  cost: 11200,
};
const SettlementRequestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{data.username} 님의 정산 요청</Text>
      <Text style={styles.dateText}>{data.date}</Text>
      {data.settlementPaymentList.map(item => (
        <View style={styles.infoContainer}>
          <Text style={styles.merchantNameText}>{item.merchantName}</Text>
          <Text style={styles.balanceText}>
            {item.balance.toLocaleString()}원 /{' '}
            <Text style={styles.amountText}>
              {item.amount.toLocaleString()}원
            </Text>
          </Text>
        </View>
      ))}
      <View style={styles.costContainer}>
        <Text style={styles.costText}>총 {data.cost.toLocaleString()}원</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="송금하기" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: colors.WHITE,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  dateText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: colors.GRAY_600,
    marginTop: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: colors.ORANGE_200,
    borderRadius: 20,
    marginVertical: 5,
  },
  merchantNameText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
  balanceText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 18,
    color: colors.GRAY_800,
  },
  amountText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 22,
    color: colors.PRIMARY,
  },
  costContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 20,
  },
  costText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default SettlementRequestScreen;
