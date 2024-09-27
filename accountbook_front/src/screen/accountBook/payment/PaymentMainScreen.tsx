import {PaymentAdd} from '@/assets/icons';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {accountBookNavigations, colors} from '@/constants';
import {Payment} from '@/types/domain';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PaymentDummyData from '@/assets/tempData/Asset/PaymentDummyData.json';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AccountBookStackParamList } from '@/navigations/stack/accountBook/AccountBookStackNavigator';

interface PaymentMainScreenProps {}

type PaymentListData = Payment[];

type PaymentMainScreenNavigationProp = NavigationProp<AccountBookStackParamList>;

const PaymentMainScreen = ({}: PaymentMainScreenProps) => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [paymentListData, setPaymentListData] = useState<PaymentListData>([]);

  const navigation = useNavigation<PaymentMainScreenNavigationProp>();

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  useEffect(() => {
    setPaymentListData(PaymentDummyData.paymentResponse);
  });

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(accountBookNavigations.PAYMENTDETAIL, {paymentId});
  }

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
        <TouchableOpacity onPress={() => navigation.navigate(accountBookNavigations.PAYMENTADD)}>
          <PaymentAdd style={styles.addButton} />
        </TouchableOpacity>
      </View>
      <PaymentItemList payments={paymentListData} onPaymentPress={handlePaymentPress}/>
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
