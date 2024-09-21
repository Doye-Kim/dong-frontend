import {PaymentAdd} from '@/assets/icons';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {colors} from '@/constants';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

interface PaymentMainScreenProps {}

const PaymentMainScreen = ({}: PaymentMainScreenProps) => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const paymentList = [
    {
      payments_id: '1',
      merchantName: '우버택시',
      categoryName: '쇼핑',
      balance: -10000,
      cardName: '프렌즈 체크카드',
      memo: '메모 벅벅',
      createdDate: '2021-11-08T11:44:30.327959',
    },
    {
      payments_id: '2',
      merchantName: '송도언',
      categoryName: '계좌송금',
      balance: -20000,
      cardName: '카카오 페이 머니',
      memo: '메모 벅벅',
      createdDate: '2021-11-04T11:44:30.327959',
    },
    {
      payments_id: '3',
      merchantName: '송도언',
      categoryName: '계좌송금',
      balance: -20000,
      cardName: '카카오 페이 머니',
      memo: '메모 벅벅',
      createdDate: '2021-11-04T11:44:30.327959',
    },
  ];
  const balance = 1919929219;
  const income = 99999999;

  return (
    <View style={styles.container}>
      <AccountBookHeader
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
      />
      <View style={styles.balanceRow}>
        <View style={styles.textContainer}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>총 지출</Text>
            <Text style={styles.balanceAmount}>
              {balance.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>총 수입</Text>
            <Text style={styles.balanceAmount}>
              {income.toLocaleString()}원
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <PaymentAdd style={styles.addButton} />
        </TouchableOpacity>
      </View>
      <PaymentItemList payments={paymentList}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    width: '80%',
    marginLeft: 20,
    borderColor: colors.PRIMARY,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.PRIMARY,
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.PRIMARY,
  },
  addButton: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default PaymentMainScreen;
