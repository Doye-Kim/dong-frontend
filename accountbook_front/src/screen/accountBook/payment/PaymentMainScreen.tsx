import {PaymentAdd} from '@/assets/icons';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {accountBookNavigations, colors} from '@/constants';
import {Payment} from '@/types/domain';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useDateStore from '@/store/useDateStore';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import { getDateWithSeparator } from '@/utils';

interface PaymentMainScreenProps {
  paymentList: Payment[];
}

type PaymentMainScreenNavigationProp =
  NavigationProp<AccountBookStackParamList>;

const PaymentMainScreen = ({paymentList}: PaymentMainScreenProps) => {
  const date = useDateStore(state => state.date);
  const {fetchPaymentData} = usePaymentDataStore();
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);

  const navigation = useNavigation<PaymentMainScreenNavigationProp>();

  const {totalBalance, totalIncome} = useMemo(() => {
    const filteredData = paymentList.filter(
      item => item.paymentState === 'INCLUDE',
    );

    const totalBalance = filteredData
      .filter(item => item.paymentType === 'EXPENSE')
      .reduce((sum, item) => sum + item.balance, 0);

    const totalIncome = filteredData
      .filter(item => item.paymentType === 'INCOME')
      .reduce((sum, item) => sum + item.balance, 0);

    return {totalBalance, totalIncome};
  }, [paymentList]);

  useEffect(() => {
    setBalance(totalBalance);
    setIncome(totalIncome);
  }, [totalBalance, totalIncome]);

  useFocusEffect(
    useCallback(() => {
      fetchPaymentData(getDateWithSeparator(date, "-"));
    }, [date])
  )

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(accountBookNavigations.PAYMENTDETAIL, {paymentId});
  };

  return (
    <View style={styles.container}>
      <AccountBookHeader />
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(accountBookNavigations.PAYMENTADD)
          }>
          <PaymentAdd style={styles.addButton} />
        </TouchableOpacity>
      </View>
      <PaymentItemList
        payments={paymentList}
        onPaymentPress={handlePaymentPress}
      />
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
